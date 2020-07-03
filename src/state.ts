import {
  ATTACKS,
  BISHOP,
  BITS,
  BLACK,
  EMPTY,
  FLAGS,
  KING,
  KNIGHT,
  PAWN,
  PAWN_OFFSETS,
  PIECE_OFFSETS,
  POSSIBLE_RESULTS,
  QUEEN,
  RANK_1,
  RANK_2,
  RANK_7,
  RANK_8,
  RANKS,
  RAYS,
  ROOK,
  ROOKS,
  SHIFTS,
  SQUARES,
  WHITE,
  DEFAULT_POSITION,
} from "./constants"
import {
  algebraic,
  file,
  isColor,
  isDigit,
  isFlagKey,
  isPieceSymbol,
  isSquare,
  rank,
  strippedSan,
  swapColor,
  symbol,
  validateFen,
} from "./utils"

export function defaultState(): State {
  return {
    board: new Array(128),
    kings: { w: EMPTY, b: EMPTY },
    turn: WHITE,
    castling: { w: 0, b: 0 },
    ep_square: EMPTY,
    half_moves: 0,
    move_number: 1
  }
}

/* this function is used to uniquely identify ambiguous moves */
export function getDisambiguator(state: State, move: Move, sloppy: boolean): string {
  const moves = generateMoves(state, { legal: !sloppy })

  const from = move.from
  const to = move.to
  const piece = move.piece

  let ambiguities = 0
  let same_rank = 0
  let same_file = 0

  for (let i = 0, len = moves.length; i < len; i++) {
    const ambig_from = moves[i].from
    const ambig_to = moves[i].to
    const ambig_piece = moves[i].piece

    /* if a move of the same piece type ends on the same to square, we'll
     * need to add a disambiguator to the algebraic notation
     */
    if (piece === ambig_piece && from !== ambig_from && to === ambig_to) {
      ambiguities++

      if (rank(from) === rank(ambig_from)) {
        same_rank++
      }

      if (file(from) === file(ambig_from)) {
        same_file++
      }
    }
  }

  if (ambiguities > 0) {
    /* if there exists a similar moving piece on the same rank and file as
     * the move in question, use the square as the disambiguator
     */
    if (same_rank > 0 && same_file > 0) {
      return algebraic(from)
    } else if (same_file > 0) {
      /* if the moving piece rests on the same file, use the rank symbol as the
       * disambiguator
       */
      return algebraic(from).charAt(1)
    } else {
      /* else use the file symbol */
      return algebraic(from).charAt(0)
    }
  }

  return ''
}

export function getFen(state: State): string {
  let empty = 0
  let fen = ''

  for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
    const piece = state.board[i]
    if (!piece) {
      empty++
    } else {
      if (empty > 0) {
        fen += empty
        empty = 0
      }
      const color = piece.color
      const piece_type = piece.type

      fen += color === WHITE ? piece_type.toUpperCase() : piece_type.toLowerCase()
    }

    if ((i + 1) & 0x88) {
      if (empty > 0) {
        fen += empty
      }

      if (i !== SQUARES.h1) {
        fen += '/'
      }

      empty = 0
      i += 8
    }
  }

  let cflags = ''
  if (state.castling[WHITE] & BITS.KSIDE_CASTLE) {
    cflags += 'K'
  }
  if (state.castling[WHITE] & BITS.QSIDE_CASTLE) {
    cflags += 'Q'
  }
  if (state.castling[BLACK] & BITS.KSIDE_CASTLE) {
    cflags += 'k'
  }
  if (state.castling[BLACK] & BITS.QSIDE_CASTLE) {
    cflags += 'q'
  }

  /* do we have an empty castling flag? */
  cflags = cflags || '-'
  const epflags = state.ep_square === EMPTY ? '-' : algebraic(state.ep_square)

  return [fen, state.turn, cflags, epflags, state.half_moves, state.move_number].join(' ')
}

export function loadFen(fen: string): State | null {
  const tokens = fen.split(/\s+/)
  const position = tokens[0]
  let square = 0

  if (!validateFen(fen).valid) {
    return null
  }

  let state = defaultState()

  for (let i = 0; i < position.length; i++) {
    const piece = position.charAt(i)

    if (piece === '/') {
      square += 8
    } else if (isDigit(piece)) {
      square += parseInt(piece, 10)
    } else {
      const color = piece < 'a' ? WHITE : BLACK
      const newState = putPiece(
        state,
        { type: piece.toLowerCase(), color: color },
        algebraic(square)
      )
      if (!newState) {
        return null
      }
      state = newState
      square++
    }
  }

  state.turn = tokens[1] === BLACK ? BLACK : WHITE

  if (tokens[2].indexOf('K') > -1) {
    state.castling.w |= BITS.KSIDE_CASTLE
  }
  if (tokens[2].indexOf('Q') > -1) {
    state.castling.w |= BITS.QSIDE_CASTLE
  }
  if (tokens[2].indexOf('k') > -1) {
    state.castling.b |= BITS.KSIDE_CASTLE
  }
  if (tokens[2].indexOf('q') > -1) {
    state.castling.b |= BITS.QSIDE_CASTLE
  }

  state.ep_square = tokens[3] === '-' ? EMPTY : SQUARES[tokens[3] as Square]
  state.half_moves = parseInt(tokens[4], 10)
  state.move_number = parseInt(tokens[5], 10)

  return state
}

export function getPgn(
  state: State,
  header: Header,
  comments: Comments,
  history: GameHistory[],
  options: { newline_char?: string, max_width?: number } = {}
): string {
  /* using the specification from http://www.chessclub.com/help/PGN-spec
   * example for html usage: .pgn({ max_width: 72, newline_char: "<br />" })
   */
  const {
    newline_char: newline = '\n',
    max_width = 0
  } = options

  const result: string[] = []
  let header_exists = false

  /* add the PGN header headerrmation */
  for (const i in header) {
    /* TODO: order of enumerated properties in header object is not
     * guaranteed, see ECMA-262 spec (section 12.6.4)
     */
    result.push('[' + i + ' "' + header[i] + '"]' + newline)
    header_exists = true
  }

  if (header_exists && history.length) {
    result.push(newline)
  }

  const appendComment = (moveStr: string): string => {
    const comment = comments[getFen(state)]
    if (typeof comment !== 'undefined') {
      const delimiter = moveStr.length > 0 ? ' ' : '';
      moveStr = `${moveStr}${delimiter}{${comment}}`
    }
    return moveStr
  }

  // Set initial state
  if (history[0]) {
    state = history[0].state
  }

  const moves = []
  let moveStr = ''

  /* special case of a commented starting position with no moves */
  if (history.length === 0) {
    moves.push(appendComment(''))
  }

  /* build the list of moves.  a move_string looks like: "3. e3 e6" */
  history.forEach((historyState, i) => {
    const move = historyState.move

    moveStr = appendComment(moveStr)

    /* if the position started with black to move, start PGN with 1. ... */
    if (i === 0 && move.color === BLACK) {
      moveStr = state.move_number + '. ...'
    } else if (move.color === WHITE) {
      /* store the previous generated move_string if we have one */
      if (moveStr.length) {
        moves.push(moveStr)
      }
      moveStr = state.move_number + '.'
    }

    moveStr = moveStr + ' ' + moveToSan(state, move, false)
    state = makeMove(state, move)
  })

  // Append leftover moves
  if (moveStr.length) {
    moves.push(appendComment(moveStr))
  }

  /* is there a result? */
  if (typeof header.Result !== 'undefined') {
    moves.push(header.Result)
  }

  /* history should be back to what it was before we started generating PGN,
   * so join together moves
   */
  if (max_width === 0) {
    return result.join('') + moves.join(' ')
  }

  const strip = function() {
    if (result.length > 0 && result[result.length - 1] === ' ') {
      result.pop();
      return true;
    }
    return false;
  };

  /* NB: this does not preserve comment whitespace. */
  const wrapComment = (width: number, move: string): number => {
    for (const token of move.split(' ')) {
      if (!token) {
        continue;
      }
      if (width + token.length > max_width) {
        while (strip()) {
          width--;
        }
        result.push(newline);
        width = 0;
      }
      result.push(token);
      width += token.length;
      result.push(' ');
      width++;
    }
    if (strip()) {
      width--;
    }
    return width;
  };

  /* wrap the PGN output at max_width */
  let currentWidth = 0
  for (let i = 0; i < moves.length; i++) {
    if (currentWidth + moves[i].length > max_width) {
      if (moves[i].includes('{')) {
        currentWidth = wrapComment(currentWidth, moves[i]);
        continue;
      }
    }
    /* if the current move will push past max_width */
    if (currentWidth + moves[i].length > max_width && i !== 0) {
      /* don't end the line with whitespace */
      if (result[result.length - 1] === ' ') {
        result.pop()
      }

      result.push(newline)
      currentWidth = 0
    } else if (i !== 0) {
      result.push(' ')
      currentWidth++
    }
    result.push(moves[i])
    currentWidth += moves[i].length
  }

  return result.join('')
}

export function loadPgn(
  pgn: string,
  options: { newline_char?: string, sloppy?: boolean } = {}
): [State, Header, Comments, GameHistory[]] | null {
  const {
    newline_char = '\r?\n',
    // allow the user to specify the sloppy move parser to work around over
    // disambiguation bugs in Fritz and Chessbase
    sloppy = false
  } = options

  const mask = (str: string): string => {
    return str.replace(/\\/g, '\\')
  }

  const hasKeys = (object: Record<string, unknown>): boolean => {
    for (const key in object) {
      return true
    }
    return false
  }

  const parse_pgn_header = (
    header: string,
    options: { newline_char: string, sloppy: boolean }
  ): Header => {
    const newline_char = options.newline_char
    const header_obj: { [key: string]: string } = {}
    const headers = header.split(new RegExp(mask(newline_char)))
    let key = ''
    let value = ''

    for (let i = 0; i < headers.length; i++) {
      key = headers[i].replace(/^\[([A-Z][A-Za-z]*)\s.*\]$/, '$1')
      value = headers[i].replace(/^\[[A-Za-z]+\s"(.*)" *\]$/, '$1')
      if (key.trim().length > 0) {
        header_obj[key.trim()] = value
      }
    }

    return header_obj
  }

  // RegExp to split header. Takes advantage of the fact that header and movetext
  // will always have a blank line between them (ie, two newline_char's).
  // With default newline_char, will equal: /^(\[((?:\r?\n)|.)*\])(?:\r?\n){2}/
  const header_regex = new RegExp(
    '^(\\[((?:' +
      mask(newline_char) +
      ')|.)*\\])' +
      '(?:' +
      mask(newline_char) +
      '){2}'
  )

  // If no header given, begin with moves.
  const header_string = header_regex.test(pgn) ? (header_regex.exec(pgn) as string[])[1] : ''

  // Put the board in the starting position
  let state = loadFen(DEFAULT_POSITION) as State

  /* parse PGN header */
  const header = parse_pgn_header(header_string, { newline_char, sloppy })

  /* load the starting position indicated by [Setup '1'] and
   * [FEN position] */
  if (header['SetUp'] === '1') {
    if ('FEN' in header) {
      const newState = loadFen(header['FEN'] as string)
      if (!newState) {
        return null
      }
      state = newState
    }
  }

  /* NB: the regexes below that delete move numbers, recursive
   * annotations, and numeric annotation glyphs may also match
   * text in comments. To prevent this, we transform comments
   * by hex-encoding them in place and decoding them again after
   * the other tokens have been deleted.
   *
   * While the spec states that PGN files should be ASCII encoded,
   * we use {en,de}codeURIComponent here to support arbitrary UTF8
   * as a convenience for modern users */

  const toHex = (str: string): string => {
    return Array
      .from(str)
      .map(function(c) {
        /* encodeURI doesn't transform most ASCII characters,
         * so we handle these ourselves */
        return c.charCodeAt(0) < 128
          ? c.charCodeAt(0).toString(16)
          : encodeURIComponent(c).replace(/%/g, '').toLowerCase()
      })
      .join('')
  }

  const fromHex = (str: string): string => {
    return str.length == 0
      ? ''
      : decodeURIComponent('%' + str?.match(/.{1,2}/g)?.join('%'))
  }

  const encodeComment = function(str: string) {
    str = str.replace(new RegExp(mask(newline_char), 'g'), ' ')
    return `{${toHex(str.slice(1, str.length - 1))}}`
  }

  const decodeComment = function(str: string) {
    if (str.startsWith('{') && str.endsWith('}')) {
      return fromHex(str.slice(1, str.length - 1))
    }
  }

  /* delete header to get the moves */
  let ms = pgn
    .replace(header_string, '')
    .replace(
      /* encode comments so they don't get deleted below */
      new RegExp(`({[^}]*})+?|;([^${mask(newline_char)}]*)`, 'g'),
      (match, bracket, semicolon) => {
        return bracket !== undefined
          ? encodeComment(bracket)
          : ' ' + encodeComment(`{${semicolon.slice(1)}}`)
      }
    )
    .replace(new RegExp(mask(newline_char), 'g'), ' ')

  /* delete recursive annotation variations */
  const rav_regex = /(\([^()]+\))+?/g
  while (rav_regex.test(ms)) {
    ms = ms.replace(rav_regex, '')
  }

  /* delete move numbers */
  ms = ms.replace(/\d+\.(\.\.)?/g, '')

  /* delete ... indicating black to move */
  ms = ms.replace(/\.\.\./g, '')

  /* delete numeric annotation glyphs */
  ms = ms.replace(/\$\d+/g, '')

  /* trim and get array of moves/comments */
  const tokens = ms
    .trim()
    .split(new RegExp(/\s+/))
    .join(',')
    .replace(/,,+/g, ',')
    .split(',')

  const comments: Comments = {}
  const history: GameHistory[] = []

  for (let half_move = 0; half_move < tokens.length; half_move++) {
    const token = tokens[half_move]
    const comment = decodeComment(token)
    if (comment !== undefined) {
      comments[getFen(state)] = comment
      continue
    }

    if (half_move === tokens.length - 1 && POSSIBLE_RESULTS.indexOf(token) !== -1) {
      if (hasKeys(header) && typeof header.Result === 'undefined') {
        header['Result'] = token
      }
      continue
    }

    const move = sanToMove(state, tokens[half_move], sloppy)
    if (move === null) {
      return null
    } else {
      history.push({ move, state })
      const newState = makeMove(state, move)
      if (!newState) {
        return null
      }
      state = newState
    }
  }

  return [state, header, comments, history]
}

export function getPiece(state: State, square?: string): Piece | null {
  if (!square) return null
  square = square.toLowerCase()
  if (!isSquare(square)) return null

  const sq = SQUARES[square]
  const piece = state.board[sq]
  if (piece) {
    return clonePiece(piece)
  }
  return null
}

export function cloneState(state: State): State {
  return {
    kings: {
      w: state.kings.w,
      b: state.kings.b,
    },
    turn: state.turn,
    castling: {
      w: state.castling.w,
      b: state.castling.b,
    },
    ep_square: state.ep_square,
    half_moves: state.half_moves,
    move_number: state.move_number,
    board: state.board.slice(),
  }
}

export function cloneMove(move: Move): Move {
  return {
    to: move.to,
    from: move.from,
    color: move.color,
    flags: move.flags,
    piece: move.piece,
    captured: move.captured,
    promotion: move.promotion,
    san: move.san,
  }
}

export function clonePiece(piece: Piece): Piece {
  return {
    color: piece.color,
    type: piece.type,
  }
}

export function putPiece(
  prevState: State,
  piece: { type?: string, color?: string }, square?: string
): State | null {
  let { type, color } = piece

  /* check for presence */
  if (!type || !color || !square) {
    return null
  }

  type = type.toLowerCase()
  color = color.toLowerCase()
  square = square.toLowerCase()

  /* check for valid params */
  if (!isPieceSymbol(type) || !isColor(color) || !isSquare(square)) {
    return null
  }

  const state = cloneState(prevState)
  /* don't let the user place more than one king */
  const sq = SQUARES[square]
  if (type === KING &&
    state.kings[color] !== EMPTY &&
    state.kings[color] !== sq) {
    return null
  }

  state.board[sq] = { type, color }
  if (type === KING) {
    state.kings[color] = sq
  }

  return state
}

export function removePiece(prevState: State, square?: string): State | null {
  if (!square) return null

  square = square.toLowerCase()
  if (!isSquare(square)) return null

  const sq = SQUARES[square]
  const piece = prevState.board[sq]
  if (!piece) return null

  const state = cloneState(prevState)
  const { type, color } = piece
  if (type === KING) {
    state.kings[color] = EMPTY
  }
  delete state.board[sq]
  return state
}

export function generateMoves(
  state: State,
  options: { legal?: boolean, square?: string } = {}
): Move[] {
  const { legal = true } = options
  const add_move = (board: Board, moves: Move[], from: number, to: number, flags: number) => {
    /* if pawn promotion */
    const piece = board[from]
    if (
      piece &&
        piece.type === PAWN &&
        (rank(to) === RANK_8 || rank(to) === RANK_1)
    ) {
      const pieces = [QUEEN, ROOK, BISHOP, KNIGHT]
      for (let i = 0, len = pieces.length; i < len; i++) {
        moves.push(buildMove(state, from, to, flags, pieces[i]))
      }
    } else {
      moves.push(buildMove(state, from, to, flags))
    }
  }

  const moves: Move[] = []
  const us = state.turn
  const them = swapColor(us)
  const second_rank: { [key: string]: number } = { b: RANK_7, w: RANK_2 }

  let first_sq = SQUARES.a8
  let last_sq = SQUARES.h1
  let single_square = false

  /* are we generating moves for a single square? */
  let { square } = options
  if (square) {
    square = square.toLowerCase()
    if (isSquare(square)) {
      first_sq = last_sq = SQUARES[square]
      single_square = true
    } else {
      /* invalid square */
      return []
    }
  }

  for (let i = first_sq; i <= last_sq; i++) {
    /* did we run off the end of the board */
    if (i & 0x88) {
      i += 7
      continue
    }

    const piece = state.board[i]
    if (!piece || piece.color !== us) {
      continue
    }

    if (piece.type === PAWN) {
      /* single square, non-capturing */
      const square1 = i + PAWN_OFFSETS[us][0]
      if (!state.board[square1]) {
        add_move(state.board, moves, i, square1, BITS.NORMAL)

        /* double square */
        const square2 = i + PAWN_OFFSETS[us][1]
        if (second_rank[us] === rank(i) && !state.board[square2]) {
          add_move(state.board, moves, i, square2, BITS.BIG_PAWN)
        }
      }

      /* pawn captures */
      for (let j = 2; j < 4; j++) {
        const square = i + PAWN_OFFSETS[us][j]
        if (square & 0x88) continue

        if (state.board[square] && state.board[square]?.color === them) {
          add_move(state.board, moves, i, square, BITS.CAPTURE)
        } else if (square === state.ep_square) {
          add_move(state.board, moves, i, state.ep_square, BITS.EP_CAPTURE)
        }
      }
    } else {
      for (let j = 0, len = PIECE_OFFSETS[piece.type].length; j < len; j++) {
        const offset = PIECE_OFFSETS[piece.type][j]
        let square = i

        while (true) {
          square += offset
          if (square & 0x88) break

          if (!state.board[square]) {
            add_move(state.board, moves, i, square, BITS.NORMAL)
          } else {
            if (state.board[square]?.color === us) break
            add_move(state.board, moves, i, square, BITS.CAPTURE)
            break
          }

          /* break, if knight or king */
          if (piece.type === 'n' || piece.type === 'k') break
        }
      }
    }
  }

  /* check for castling if: a) we're generating all moves, or b) we're doing
   * single square move generation on the king's square
   */
  if (!single_square || last_sq === state.kings[us]) {
    /* king-side castling */
    if (state.castling[us] & BITS.KSIDE_CASTLE) {
      const castling_from = state.kings[us]
      const castling_to = castling_from + 2

      if (
        !state.board[castling_from + 1] &&
          !state.board[castling_to] &&
          !isAttacked(state, them, state.kings[us]) &&
          !isAttacked(state, them, castling_from + 1) &&
          !isAttacked(state, them, castling_to)
      ) {
        add_move(state.board, moves, state.kings[us], castling_to, BITS.KSIDE_CASTLE)
      }
    }

    /* queen-side castling */
    if (state.castling[us] & BITS.QSIDE_CASTLE) {
      const castling_from = state.kings[us]
      const castling_to = castling_from - 2

      if (
        !state.board[castling_from - 1] &&
          !state.board[castling_from - 2] &&
          !state.board[castling_from - 3] &&
          !isAttacked(state, them, state.kings[us]) &&
          !isAttacked(state, them, castling_from - 1) &&
          !isAttacked(state, them, castling_to)
      ) {
        add_move(state.board, moves, state.kings[us], castling_to, BITS.QSIDE_CASTLE)
      }
    }
  }

  /* return all pseudo-legal moves (this includes moves that allow the king
   * to be captured)
   */
  if (!legal) {
    return moves
  }

  /* filter out illegal moves */
  const legal_moves = []
  for (let i = 0, len = moves.length; i < len; i++) {
    const newState = makeMove(state, moves[i])
    if (!isKingAttacked(newState, us)) {
      legal_moves.push(moves[i])
    }
  }

  return legal_moves
}

/* convert a move from 0x88 coordinates to Standard Algebraic Notation
 * (SAN)
 *
 * @param {boolean} sloppy Use the sloppy SAN generator to work around over
 * disambiguation bugs in Fritz and Chessbase.  See below:
 *
 * r1bqkbnr/ppp2ppp/2n5/1B1pP3/4P3/8/PPPP2PP/RNBQK1NR b KQkq - 2 4
 * 4. ... Nge7 is overly disambiguated because the knight on c6 is pinned
 * 4. ... Ne7 is technically the valid SAN
 */
export function moveToSan(state: State, move: Move, sloppy = false): string {
  let output = ''

  if (move.flags & BITS.KSIDE_CASTLE) {
    output = 'O-O'
  } else if (move.flags & BITS.QSIDE_CASTLE) {
    output = 'O-O-O'
  } else {
    const disambiguator = getDisambiguator(state, move, sloppy)

    if (move.piece !== PAWN) {
      output += move.piece.toUpperCase() + disambiguator
    }

    if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
      if (move.piece === PAWN) {
        output += algebraic(move.from)[0]
      }
      output += 'x'
    }

    output += algebraic(move.to)

    if (move.flags & BITS.PROMOTION) {
      output += '=' + move.promotion?.toUpperCase()
    }
  }

  const newState = makeMove(state, move)
  if (inCheck(newState)) {
    if (inCheckmate(newState)) {
      output += '#'
    } else {
      output += '+'
    }
  }

  return output
}

export function sanToMove(state: State, move: string, sloppy: boolean): Move | null {
  // strip off any move decorations: e.g Nf3+?!
  const clean_move = strippedSan(move)

  let matches, piece, from, to, promotion;

  // if we're using the sloppy parser run a regex to grab piece, to, and from
  // this should parse invalid SAN like: Pe2-e4, Rc1c4, Qf3xf7
  if (sloppy) {
    matches = clean_move.match(
      /([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/
    )
    if (matches) {
      piece = matches[1]
      from = matches[2]
      to = matches[3]
      promotion = matches[4]
    }
  }

  const moves = generateMoves(state)
  for (let i = 0, len = moves.length; i < len; i++) {
    // try the strict parser first, then the sloppy parser if requested
    // by the user
    const san = moveToSan(state, moves[i])
    if (clean_move === strippedSan(san) ||
      (sloppy && clean_move === strippedSan(moveToSan(state, moves[i], true)))) {
      return moves[i]
    }
    if (
      from &&
        to &&
        isSquare(from) &&
        isSquare(to) &&
        matches &&
        (!piece || piece.toLowerCase() == moves[i].piece) &&
        SQUARES[from] == moves[i].from &&
        SQUARES[to] == moves[i].to &&
        (!promotion || promotion.toLowerCase() == moves[i].promotion)
    ) {
      return moves[i]
    }
  }

  return null
}

export function makePretty(state: State, ugly_move: Move): PrettyMove {
  const move: Move = cloneMove(ugly_move)

  let flags = ''
  for (const flag in BITS) {
    if (isFlagKey(flag) && BITS[flag] & move.flags) {
      flags += FLAGS[flag]
    }
  }

  return {
    to: algebraic(move.to),
    from: algebraic(move.from),
    color: move.color,
    flags,
    piece: move.piece,
    san: moveToSan(state, move, false),
    captured: move.captured,
    promotion: move.promotion,
  }
}

export function isAttacked(state: State, color: string, square: number): boolean {
  for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
    /* did we run off the end of the board */
    if (i & 0x88) {
      i += 7
      continue
    }

    /* if empty square or wrong color */
    if (state.board[i] == null || state.board[i]?.color !== color) continue

    const piece = state.board[i]
    const difference = i - square
    const index = difference + 119

    if (piece && ATTACKS[index] & (1 << SHIFTS[piece.type])) {
      if (piece.type === PAWN) {
        if (difference > 0) {
          if (piece.color === WHITE) return true
        } else {
          if (piece.color === BLACK) return true
        }
        continue
      }

      /* if the piece is a knight or a king */
      if (piece.type === 'n' || piece.type === 'k') return true

      const offset = RAYS[index]
      let j = i + offset

      let blocked = false
      while (j !== square) {
        if (state.board[j]) {
          blocked = true
          break
        }
        j += offset
      }

      if (!blocked) return true
    }
  }

  return false
}

export function isKingAttacked(state: State, color: Color): boolean {
  return isAttacked(state, swapColor(color), state.kings[color])
}

export function inCheck(state: State): boolean {
  return isKingAttacked(state, state.turn)
}

export function inCheckmate(state: State): boolean {
  return inCheck(state) && generateMoves(state).length === 0
}

export function inStalemate(state: State): boolean {
  return !inCheck(state) && generateMoves(state).length === 0
}

export function insufficientMaterial(state: State): boolean {
  const pieces: {[key: string]: number} = {}
  const bishops = []
  let num_pieces = 0
  let sq_color = 0

  for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
    sq_color = (sq_color + 1) % 2
    if (i & 0x88) {
      i += 7
      continue
    }

    const piece = state.board[i]
    if (piece) {
      pieces[piece.type] = piece.type in pieces ? pieces[piece.type] + 1 : 1
      if (piece.type === BISHOP) {
        bishops.push(sq_color)
      }
      num_pieces++
    }
  }

  /* k vs. k */
  if (num_pieces === 2) {
    return true
  } else if (
    /* k vs. kn .... or .... k vs. kb */
    num_pieces === 3 &&
      (pieces[BISHOP] === 1 || pieces[KNIGHT] === 1)
  ) {
    return true
  } else if (num_pieces === pieces[BISHOP] + 2) {
    /* kb vs. kb where any number of bishops are all on the same color */
    let sum = 0
    const len = bishops.length
    for (let i = 0; i < len; i++) {
      sum += bishops[i]
    }
    if (sum === 0 || sum === len) {
      return true
    }
  }

  return false
}

export function makeMove(prevState: State, move: Move): State {
  const state = cloneState(prevState)
  const us = state.turn
  const them = swapColor(us)
  // this.push(move)

  state.board[move.to] = state.board[move.from]
  delete state.board[move.from]

  /* if ep capture, remove the captured pawn */
  if (move.flags & BITS.EP_CAPTURE) {
    if (state.turn === BLACK) {
      delete state.board[move.to - 16]
    } else {
      delete state.board[move.to + 16]
    }
  }

  /* if pawn promotion, replace with new piece */
  if (move.flags & BITS.PROMOTION && move.promotion && isPieceSymbol(move.promotion)) {
    state.board[move.to] = { type: move.promotion, color: us }
  }

  /* if we moved the king */
  const piece = state.board[move.to]
  if (piece && piece.type === KING) {
    state.kings[piece.color] = move.to

    /* if we castled, move the rook next to the king */
    if (move.flags & BITS.KSIDE_CASTLE) {
      const castling_to = move.to - 1
      const castling_from = move.to + 1
      state.board[castling_to] = state.board[castling_from]
      delete state.board[castling_from]
    } else if (move.flags & BITS.QSIDE_CASTLE) {
      const castling_to = move.to + 1
      const castling_from = move.to - 2
      state.board[castling_to] = state.board[castling_from]
      delete state.board[castling_from]
    }

    /* turn off castling */
    state.castling[us] = 0
  }

  /* turn off castling if we move a rook */
  if (state.castling[us]) {
    for (let i = 0, len = ROOKS[us].length; i < len; i++) {
      if (
        move.from === ROOKS[us][i].square &&
          state.castling[us] & ROOKS[us][i].flag
      ) {
        state.castling[us] ^= ROOKS[us][i].flag
        break
      }
    }
  }

  /* turn off castling if we capture a rook */
  if (state.castling[them]) {
    for (let i = 0, len = ROOKS[them].length; i < len; i++) {
      if (
        move.to === ROOKS[them][i].square &&
          state.castling[them] & ROOKS[them][i].flag
      ) {
        state.castling[them] ^= ROOKS[them][i].flag
        break
      }
    }
  }

  /* if big pawn move, update the en passant square */
  if (move.flags & BITS.BIG_PAWN) {
    if (state.turn === 'b') {
      state.ep_square = move.to - 16
    } else {
      state.ep_square = move.to + 16
    }
  } else {
    state.ep_square = EMPTY
  }

  /* reset the 50 move counter if a pawn is moved or a piece is captured */
  if (move.piece === PAWN) {
    state.half_moves = 0
  } else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
    state.half_moves = 0
  } else {
    state.half_moves++
  }

  if (state.turn === BLACK) {
    state.move_number++
  }
  state.turn = swapColor(state.turn)
  return state
}

export function buildMove(state: State, from: number, to: number, flags: number, promotion?: string): Move {
  const move: Move = {
    color: state.turn,
    from: from,
    to: to,
    flags: flags,
    piece: (state.board[from] as Piece).type
  }

  if (promotion && isPieceSymbol(promotion)) {
    move.flags |= BITS.PROMOTION
    move.promotion = promotion
  }

  if (state.board[to]) {
    move.captured = state.board[to]?.type
  } else if (flags & BITS.EP_CAPTURE) {
    move.captured = PAWN
  }
  return move
}

export function ascii(board: Board, eol = '\n'): string {
  const pieces = RANKS.map(rank => {
    const rankPieces = board
      .slice(rank * 16, rank * 16 + 8)
      .map(piece => {
        if (piece) {
          return ` ${symbol(piece)} `
        } else {
          return ' . '
        }
      })
      .join('')

    return '87654321'[rank] + ' |' + rankPieces + '|'
  })

  return [
    '  +------------------------+',
    pieces.join(eol),
    '  +------------------------+',
    '    a  b  c  d  e  f  g  h',
  ].join(eol)
}

export function getBoard(board: Board): (Piece | null)[][] {
  const output = []
  let row = []

  for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
    const piece = board[i]
    if (piece == null) {
      row.push(null)
    } else {
      row.push({ type: piece.type, color: piece.color })
    }
    if ((i + 1) & 0x88) {
      output.push(row)
      row = []
      i += 8
    }
  }

  return output
}

export function validateMove(
  state: State,
  move: string | PrettyMove,
  options: { sloppy?: boolean } = {}
): Move | null {
  // Allow the user to specify the sloppy move parser to work around over
  // disambiguation bugs in Fritz and Chessbase
  const { sloppy = false } = options

  if (typeof move === 'string') {
    return sanToMove(state, move, sloppy)
  } else if (typeof move === 'object') {
    const moves = generateMoves(state)
    // Find a matching move
    for (const moveObj of moves) {
      if (
        move.from === algebraic(moveObj.from) &&
          move.to === algebraic(moveObj.to) &&
          (!('promotion' in moveObj) ||
            move.promotion === moveObj.promotion)
      ) {
        return moveObj
      }
    }
  }

  return null
}
