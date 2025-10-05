import {
  Piece,
  Square,
  PieceSymbol,
  Color,
  Ox88,
  algebraic,
  ATTACKS,
  RAYS,
  PIECE_MASKS,
  WHITE,
  BLACK,
  PAWN,
  EMPTY,
  swapColor,
  rank,
  file,
  BISHOP,
  KNIGHT,
  InternalMove,
  BITS,
  PAWN_OFFSETS,
  PIECE_OFFSETS,
  SECOND_RANK,
  KING,
  addMove,
  ROOK,
  QUEEN,
} from './types'

export class Game {
  _board = new Array<Piece>(128)
  _turn: Color = WHITE
  _kings: Record<Color, number> = { w: EMPTY, b: EMPTY }
  _halfMoves = 0
  _hash = 0n
  _positionCount = new Map<bigint, number>()
  _epSquare = -1
  _castling: Record<Color, number> = { w: 0, b: 0 }

  get(square: Square): Piece | undefined {
    return this._board[Ox88[square]]
  }

  findPiece(piece: Piece): Square[] {
    const squares: Square[] = []
    for (let i = Ox88.a8; i <= Ox88.h1; i++) {
      // did we run off the end of the board
      if (i & 0x88) {
        i += 7
        continue
      }

      // if empty square or wrong color
      if (!this._board[i] || this._board[i]?.color !== piece.color) {
        continue
      }

      // check if square contains the requested piece
      if (
        this._board[i].color === piece.color &&
        this._board[i].type === piece.type
      ) {
        squares.push(algebraic(i))
      }
    }

    return squares
  }

  _attacked(color: Color, square: number): boolean
  _attacked(color: Color, square: number, verbose: false): boolean
  _attacked(color: Color, square: number, verbose: true): Square[]
  _attacked(color: Color, square: number, verbose?: boolean) {
    const attackers: Square[] = []
    for (let i = Ox88.a8; i <= Ox88.h1; i++) {
      // did we run off the end of the board
      if (i & 0x88) {
        i += 7
        continue
      }

      // if empty square or wrong color
      if (this._board[i] === undefined || this._board[i].color !== color) {
        continue
      }

      const piece = this._board[i]
      const difference = i - square

      // skip - to/from square are the same
      if (difference === 0) {
        continue
      }

      const index = difference + 119

      if (ATTACKS[index] & PIECE_MASKS[piece.type]) {
        if (piece.type === PAWN) {
          if (
            (difference > 0 && piece.color === WHITE) ||
            (difference <= 0 && piece.color === BLACK)
          ) {
            if (!verbose) {
              return true
            } else {
              attackers.push(algebraic(i))
            }
          }
          continue
        }

        // if the piece is a knight or a king
        if (piece.type === 'n' || piece.type === 'k') {
          if (!verbose) {
            return true
          } else {
            attackers.push(algebraic(i))
            continue
          }
        }

        const offset = RAYS[index]
        let j = i + offset

        let blocked = false
        while (j !== square) {
          if (this._board[j] != null) {
            blocked = true
            break
          }
          j += offset
        }

        if (!blocked) {
          if (!verbose) {
            return true
          } else {
            attackers.push(algebraic(i))
            continue
          }
        }
      }
    }

    if (verbose) {
      return attackers
    } else {
      return false
    }
  }

  attackers(square: Square, attackedBy?: Color): Square[] {
    if (!attackedBy) {
      return this._attacked(this._turn, Ox88[square], true)
    } else {
      return this._attacked(attackedBy, Ox88[square], true)
    }
  }

  isAttacked(square: Square, attackedBy: Color): boolean {
    return this._attacked(attackedBy, Ox88[square])
  }

  _isKingAttacked(color: Color): boolean {
    const square = this._kings[color]
    return square === -1 ? false : this._attacked(swapColor(color), square)
  }

  isCheck(): boolean {
    return this._isKingAttacked(this._turn)
  }

  inCheck(): boolean {
    return this.isCheck()
  }

  ascii(): string {
    let s = '   +------------------------+\n'
    for (let i = Ox88.a8; i <= Ox88.h1; i++) {
      // display the rank
      if (file(i) === 0) {
        s += ' ' + '87654321'[rank(i)] + ' |'
      }

      if (this._board[i]) {
        const piece = this._board[i].type
        const color = this._board[i].color
        const symbol =
          color === WHITE ? piece.toUpperCase() : piece.toLowerCase()
        s += ' ' + symbol + ' '
      } else {
        s += ' . '
      }

      if ((i + 1) & 0x88) {
        s += '|\n'
        i += 8
      }
    }
    s += '   +------------------------+\n'
    s += '     a  b  c  d  e  f  g  h'

    return s
  }

  private _getPositionCount(hash: bigint): number {
    return this._positionCount.get(hash) ?? 0
  }

  isInsufficientMaterial(): boolean {
    /*
     * k.b. vs k.b. (of opposite colors) with mate in 1:
     * 8/8/8/8/1b6/8/B1k5/K7 b - - 0 1
     *
     * k.b. vs k.n. with mate in 1:
     * 8/8/8/8/1n6/8/B7/K1k5 b - - 2 1
     */
    const pieces: Record<PieceSymbol, number> = {
      b: 0,
      n: 0,
      r: 0,
      q: 0,
      k: 0,
      p: 0,
    }
    const bishops = []
    let numPieces = 0
    let squareColor = 0

    for (let i = Ox88.a8; i <= Ox88.h1; i++) {
      squareColor = (squareColor + 1) % 2
      if (i & 0x88) {
        i += 7
        continue
      }

      const piece = this._board[i]
      if (piece) {
        pieces[piece.type] = piece.type in pieces ? pieces[piece.type] + 1 : 1
        if (piece.type === BISHOP) {
          bishops.push(squareColor)
        }
        numPieces++
      }
    }

    // k vs. k
    if (numPieces === 2) {
      return true
    } else if (
      // k vs. kn .... or .... k vs. kb
      numPieces === 3 &&
      (pieces[BISHOP] === 1 || pieces[KNIGHT] === 1)
    ) {
      return true
    } else if (numPieces === pieces[BISHOP] + 2) {
      // kb vs. kb where any number of bishops are all on the same color
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

  isThreefoldRepetition(): boolean {
    return this._getPositionCount(this._hash) >= 3
  }

  isDrawByFiftyMoves(): boolean {
    return this._halfMoves >= 100 // 50 moves per side = 100 half moves
  }

  _moves({
    legal = true,
    piece = undefined,
    square = undefined,
  }: {
    legal?: boolean
    piece?: PieceSymbol
    square?: Square
  } = {}): InternalMove[] {
    const forSquare = square ? (square.toLowerCase() as Square) : undefined
    const forPiece = piece?.toLowerCase()

    const moves: InternalMove[] = []
    const us = this._turn
    const them = swapColor(us)

    let firstSquare = Ox88.a8
    let lastSquare = Ox88.h1
    let singleSquare = false

    // are we generating moves for a single square?
    if (forSquare) {
      // illegal square, return empty moves
      if (!(forSquare in Ox88)) {
        return []
      } else {
        firstSquare = lastSquare = Ox88[forSquare]
        singleSquare = true
      }
    }

    for (let from = firstSquare; from <= lastSquare; from++) {
      // did we run off the end of the board
      if (from & 0x88) {
        from += 7
        continue
      }

      // empty square or opponent, skip
      if (!this._board[from] || this._board[from].color === them) {
        continue
      }
      const { type } = this._board[from]

      let to: number
      if (type === PAWN) {
        if (forPiece && forPiece !== type) continue

        // single square, non-capturing
        to = from + PAWN_OFFSETS[us][0]
        if (!this._board[to]) {
          addMove(moves, us, from, to, PAWN)

          // double square
          to = from + PAWN_OFFSETS[us][1]
          if (SECOND_RANK[us] === rank(from) && !this._board[to]) {
            addMove(moves, us, from, to, PAWN, undefined, BITS.BIG_PAWN)
          }
        }

        // pawn captures
        for (let j = 2; j < 4; j++) {
          to = from + PAWN_OFFSETS[us][j]
          if (to & 0x88) continue

          if (this._board[to]?.color === them) {
            addMove(
              moves,
              us,
              from,
              to,
              PAWN,
              this._board[to].type,
              BITS.CAPTURE,
            )
          } else if (to === this._epSquare) {
            addMove(moves, us, from, to, PAWN, PAWN, BITS.EP_CAPTURE)
          }
        }
      } else {
        if (forPiece && forPiece !== type) continue

        for (let j = 0, len = PIECE_OFFSETS[type].length; j < len; j++) {
          const offset = PIECE_OFFSETS[type][j]
          to = from

          while (true) {
            to += offset
            if (to & 0x88) break

            if (!this._board[to]) {
              addMove(moves, us, from, to, type)
            } else {
              // own color, stop loop
              if (this._board[to].color === us) break

              addMove(
                moves,
                us,
                from,
                to,
                type,
                this._board[to].type,
                BITS.CAPTURE,
              )
              break
            }

            /* break, if knight or king */
            if (type === KNIGHT || type === KING) break
          }
        }
      }
    }

    /*
     * check for castling if we're:
     *   a) generating all moves, or
     *   b) doing single square move generation on the king's square
     */

    if (forPiece === undefined || forPiece === KING) {
      if (!singleSquare || lastSquare === this._kings[us]) {
        // king-side castling
        if (this._castling[us] & BITS.KSIDE_CASTLE) {
          const castlingFrom = this._kings[us]
          const castlingTo = castlingFrom + 2

          if (
            !this._board[castlingFrom + 1] &&
            !this._board[castlingTo] &&
            !this._attacked(them, this._kings[us]) &&
            !this._attacked(them, castlingFrom + 1) &&
            !this._attacked(them, castlingTo)
          ) {
            addMove(
              moves,
              us,
              this._kings[us],
              castlingTo,
              KING,
              undefined,
              BITS.KSIDE_CASTLE,
            )
          }
        }

        // queen-side castling
        if (this._castling[us] & BITS.QSIDE_CASTLE) {
          const castlingFrom = this._kings[us]
          const castlingTo = castlingFrom - 2

          if (
            !this._board[castlingFrom - 1] &&
            !this._board[castlingFrom - 2] &&
            !this._board[castlingFrom - 3] &&
            !this._attacked(them, this._kings[us]) &&
            !this._attacked(them, castlingFrom - 1) &&
            !this._attacked(them, castlingTo)
          ) {
            addMove(
              moves,
              us,
              this._kings[us],
              castlingTo,
              KING,
              undefined,
              BITS.QSIDE_CASTLE,
            )
          }
        }
      }
    }

    /*
     * return all pseudo-legal moves (this includes moves that allow the king
     * to be captured)
     */
    if (!legal || this._kings[us] === -1) {
      return moves
    }

    /*
     * filter out illegal moves
     * NOTE: This requires _makeMove and _undoMove which are still in Chess
     * For now, we'll return pseudo-legal moves and let Chess do the filtering
     */
    return moves
  }

  board(): ({ square: Square; type: PieceSymbol; color: Color } | null)[][] {
    const output = []
    let row = []

    for (let i = Ox88.a8; i <= Ox88.h1; i++) {
      if (this._board[i] == null) {
        row.push(null)
      } else {
        row.push({
          square: algebraic(i),
          type: this._board[i].type,
          color: this._board[i].color,
        })
      }
      if ((i + 1) & 0x88) {
        output.push(row)
        row = []
        i += 8
      }
    }

    return output
  }
}