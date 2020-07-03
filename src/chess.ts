import {
  defaultState,
  generateMoves,
  getFen,
  isAttacked,
  makeMove,
  moveToSan,
  putPiece,
  sanToMove,
  loadFen,
  makePretty,
  getPiece,
  removePiece,
  inCheck,
  inCheckmate,
  inStalemate,
  insufficientMaterial,
  loadPgn,
  getPgn,
  ascii,
  getBoard,
  validateMove,
} from './state'
import {
  Color,
  Comments,
  GameHistory,
  Header,
  HexMove,
  Move,
  PgnComment,
  Piece,
  State,
} from './types'
import {
  file,
  isSquare,
  rank,
  swapColor,
} from './utils';
import {
  DEFAULT_POSITION,
  SQUARES,
} from './constants';

export class Chess {
  protected _state: State;
  protected _history: GameHistory[];
  protected _header: Header;
  protected _comments: Comments;

  constructor(fen: string = DEFAULT_POSITION) {
    this._state = defaultState()
    this._history = []
    this._header = {}
    this._comments = {}

    if (!this.load(fen)) {
      throw new Error('Error loading fen')
    }
  }

  /**
   * Clears the board and loads the Forsyth–Edwards Notation (FEN) string.
   *
   * @param fen
   * @param keep_headers Flag to keep headers
   * @return True if the position was successfully loaded, otherwise false.
   */
  public load(fen: string, keep_headers = false): boolean {
    const state = loadFen(fen)
    if (!state) {
      return false
    }
    this._state = state
    this._history = []
    if (!keep_headers) this._header = {}
    this._comments = {}
    this.updateSetup(getFen(this._state))
    return true
  }

  /**
   * Clears the board
   *
   * @param keep_headers Flag to keep headers
   */
  public clear(keep_headers = false): void {
    this._state = defaultState()
    this._history = []
    if (!keep_headers) this._header = {}
    this._comments = {}
    this.updateSetup(getFen(this._state))
  }

  /**
   * Reset the board to the initial starting position.
   */
  public reset(): void {
    this.load(DEFAULT_POSITION)
  }

  /**
   * Returns the piece on the square.
   *
   * @param square e.g. 'e4'
   * @return Copy of the piece or null
   */
  public get(square?: string): Piece | null {
    return getPiece(this._state, square)
  }

  /**
   * Place a piece on a square. Fails when passed an invalid piece or square,
   * or when two or more kings of the same color are placed.
   *
   * @param piece Object of the form { type: ..., color: ... }
   * @param square e.g. 'e4'
   * @return True if placed successfully, otherwise false
   */
  public put(piece: { type?: string, color?: string }, square?: string): boolean {
    const newState = putPiece(this._state, piece, square)
    if (newState) {
      this._state = newState
      this.updateSetup(getFen(this._state))
      return true
    }
    return false
  }

  /**
   * Removes and returns the piece on a square.
   *
   * @param square e.g. 'e4'
   * @return Piece or null
   */
  public remove(square?: string): Piece | null {
    const piece = getPiece(this._state, square)
    if (!piece) {
      return null
    }

    const newState = removePiece(this._state, square)
    if (!newState) {
      return null
    }
    this._state = newState
    return piece
  }

  /**
   * Returns a list of legal moves from the current position.
   *
   * @param square e.g. 'e4'
   * @return Piece or null
   */
  public moves(options: { square?: string, verbose?: boolean} = {}): (string | Move)[] {
    // The internal representation of a chess move is in 0x88 format, and
    // not meant to be human-readable.  The code below converts the 0x88
    // square coordinates to algebraic coordinates.  It also prunes an
    // unnecessary move keys resulting from a verbose call.
    const { square, verbose = false } = options
    const ugly_moves = generateMoves(this._state, { square })
    const moves = []

    for (let i = 0, len = ugly_moves.length; i < len; i++) {
      if (verbose) {
        moves.push(makePretty(this._state, ugly_moves[i]))
      } else {
        moves.push(moveToSan(this._state, ugly_moves[i], false))
      }
    }

    return moves
  }

  /**
   * Returns the FEN string for the current position.
   */
  public fen(): string {
    return getFen(this._state)
  }

  /**
   * Returns true or false if the side to move is in check.
   */
  public inCheck(): boolean {
    return inCheck(this._state)
  }

  /**
   * Returns true or false if the side to move has been checkmated.
   */
  public inCheckmate(): boolean {
    return inCheckmate(this._state)
  }

  /**
   * Returns true or false if the side to move has been stalemated.
   */
  public inStalemate(): boolean {
    return inStalemate(this._state)
  }

  /**
   * Returns true if the game is drawn due to insufficient material, i.e.
   * K vs. K, K vs. KB, or K vs. KN.
   */
  public insufficientMaterial(): boolean {
    return insufficientMaterial(this._state)
  }

  /**
   * Returns true or false if the current board position has occurred three or
   * more times.
   */
  public inThreefoldRepetition(): boolean {
    /* TODO: while this function is fine for casual use, a better
     * implementation would use a Zobrist key (instead of FEN). the
     * Zobrist key would be maintained in the make_move/undo_move functions,
     * avoiding the costly that we do below.
     */
    const moves: HexMove[] = []
    const positions: { [key: string]: number } = {}
    let repetition = false

    while (true) {
      const move = this.undoMove()
      if (!move) break
      moves.push(move)
    }

    while (true) {
      /* remove the last two fields in the FEN string, they're not needed
       * when checking for draw by rep */
      const fen = this.fen()
        .split(' ')
        .slice(0, 4)
        .join(' ')

      /* has the position occurred three or move times */
      positions[fen] = fen in positions ? positions[fen] + 1 : 1
      if (positions[fen] >= 3) {
        repetition = true
      }

      if (!moves.length) {
        break
      }
      this.makeMove(moves.pop() as HexMove)
    }

    return repetition
  }

  /**
   * Returns true or false if the game is drawn, checking the 50-move rule and
   * insufficient material.
   */
  public inDraw(): boolean {
    return (
      this._state.half_moves >= 100 ||
        this.inStalemate() ||
        this.insufficientMaterial() ||
        this.inThreefoldRepetition()
    )
  }

  /**
   * Returns true if the game has ended via checkmate, stalemate, draw,
   * threefold repetition, or insufficient material.
   */
  public gameOver(): boolean {
    return this.inCheckmate() || this.inDraw()
  }

  /**
   * Returns an 2D array representation of the current position. Empty squares
   * are represented by null.
   */
  public board(): (Piece | null)[][] {
    return getBoard(this._state.board)
  }

  /**
   * Returns the game in PGN format
   * @param options.newline_char
   * @param options.max_width
   * @return PGN
   */
  public pgn(options: { newline_char?: string, max_width?: number } = {}): string {
    return getPgn(this._state, this._header, this._comments, this._history, options)
  }

  /**
   * Load the moves of a game stored in Portable Game Notation (PGN).
   *
   * @param options.newline_char String representation of a valid RegExp fragment
   * @param options.sloppy Flag to allow parsing non-standard notations
   * @return PGN
   */
  public loadPgn(
    pgn: string,
    options: { newline_char?: string, sloppy?: boolean } = {}
  ): boolean {
    const res = loadPgn(pgn, options)
    if (!res) {
      return false
    }

    const [ state, header, comments, history ] = res
    this._state = state
    this._header = header
    this._comments = comments
    this._history = history
    return true
  }

  /**
   * Adds header information to the PGN output. Calling without any arguments
   * returns the header information as an object.
   *
   * @param args List of strings
   * @return Key/value pairs
   */
  public header(args: string[] = []): Header {
    for (let i = 0; i < args.length; i += 2) {
      if (typeof args[i] === 'string' && typeof args[i + 1] === 'string') {
        this._header[args[i]] = args[i + 1]
      }
    }
    return this._header
  }

  public ascii(eol = '\n'): string {
    return ascii(this._state.board, eol)
  }

  public turn(): Color {
    return this._state.turn
  }

  /**
   * Make a move on the board.
   *
   * @param move Case-sensitive SAN string or object, e.g. `'Nxb7'` or
   * `{ from: 'h7', to: 'h8', promotion: 'q' }`
   * @param options.sloppy? Flag to enable parsing of a variety of non-standard
   * move notations
   */
  public move(
    move: string | Move,
    options: { sloppy?: boolean }
  ): Move | null {
    const validMove = validateMove(this._state, move, options)

    if (!validMove) {
      return null
    }

    // Create pretty move before updating the state
    const prettyMove = makePretty(this._state, validMove)
    this.makeMove(validMove)
    return prettyMove
  }

  public undo(): Move | null {
    const move = this.undoMove()
    return move ? makePretty(this._state, move) : null
  }

  public squareColor(square: string): string | null {
    if (isSquare(square)) {
      const sq_0x88 = SQUARES[square]
      return (rank(sq_0x88) + file(sq_0x88)) % 2 === 0 ? 'light' : 'dark'
    }

    return null
  }

  public history(options: { verbose?: boolean } = {}): (string | Move)[] {
    const moveHistory: Array<string | Move> = []
    const { verbose = false } = options;

    if (!this._history.length) {
      return []
    }

    let state
    this._history.forEach((gameHistory) => {
      const move = gameHistory.move
      state = gameHistory.state

      if (verbose) {
        moveHistory.push(makePretty(state, move))
      } else {
        moveHistory.push(moveToSan(state, move))
      }
      state = makeMove(state, move)
    })

    return moveHistory
  }

  public getComment(): string {
    return this._comments[this.fen()];
  }

  public setComment(comment: string): void {
    this._comments[this.fen()] = comment.replace('{', '[').replace('}', ']');
  }

  public deleteComment(): string {
    const comment = this._comments[this.fen()];
    delete this._comments[this.fen()];
    return comment;
  }

  public getComments(): PgnComment[] {
    this.pruneComments();
    return Object.keys(this._comments).map((fen) => {
      return {fen: fen, comment: this._comments[fen]};
    });
  }

  public deleteComments(): PgnComment[] {
    this.pruneComments();
    return Object.keys(this._comments)
      .map((fen) => {
        const comment = this._comments[fen];
        delete this._comments[fen];
        return {fen: fen, comment: comment};
      });
  }

  public perft(depth: number): number {
    const moves = generateMoves(this._state, { legal: false })
    let nodes = 0
    const color = this._state.turn

    for (let i = 0, len = moves.length; i < len; i++) {
      this.makeMove(moves[i])
      if (!this.kingAttacked(color)) {
        if (depth - 1 > 0) {
          const child_nodes = this.perft(depth - 1)
          nodes += child_nodes
        } else {
          nodes++
        }
      }
      this.undoMove()
    }

    return nodes
  }

  /* called when the initial board setup is changed with put() or remove().
   * modifies the SetUp and FEN properties of the header object.  if the FEN is
   * equal to the default position, the SetUp and FEN are deleted
   * the setup is only updated if history.length is zero, ie moves haven't been
   * made.
   */
  protected updateSetup(fen: string): void {
    if (this._history.length > 0) return

    if (fen !== DEFAULT_POSITION) {
      this._header['SetUp'] = '1'
      this._header['FEN'] = fen
    } else {
      delete this._header['SetUp']
      delete this._header['FEN']
    }
  }

  protected pruneComments(): void {
    const reversed_history: HexMove[] = [];
    const current_comments: Comments = {};
    const copy_comment = (fen: string) => {
      if (fen in this._comments) {
        current_comments[fen] = this._comments[fen];
      }
    };
    while (this._history.length > 0) {
      reversed_history.push(this.undoMove() as HexMove);
    }
    copy_comment(this.fen());
    while (reversed_history.length > 0) {
      this.makeMove(reversed_history.pop() as HexMove);
      copy_comment(this.fen());
    }
    this._comments = current_comments;
  }

  // parses all of the decorators out of a SAN string
  protected strippedSan(move: string): string {
    return move.replace(/=/, '').replace(/[+#]?[?!]*$/, '')
  }

  protected attacked(color: string, square: number): boolean {
    return isAttacked(this._state, color, square)
  }

  protected kingAttacked(color: Color): boolean {
    return this.attacked(swapColor(color), this._state.kings[color])
  }

  protected makeMove(move: HexMove): void {
    this._history.push({
      move: move,
      state: this._state,
    })
    this._state = makeMove(this._state, move)
  }

  protected undoMove(): HexMove | null {
    const prev = this._history.pop()
    if (prev == null) {
      return null
    }
    this._state = prev.state
    return prev.move
  }

  // convert a move from Standard Algebraic Notation (SAN) to 0x88 coordinates
  protected sanToMove(move: string, sloppy: boolean): HexMove | null {
    return sanToMove(this._state, move, sloppy)
  }
}
