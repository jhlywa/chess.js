/*
 * Copyright (c) 2022, Jeff Hlywa (jhlywa@gmail.com)
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 *----------------------------------------------------------------------------*/
export const WHITE = 'w'
export const BLACK = 'b'

export const PAWN = 'p'
export const KNIGHT = 'n'
export const BISHOP = 'b'
export const ROOK = 'r'
export const QUEEN = 'q'
export const KING = 'k'

export type Color = 'w' | 'b'
export type PieceSymbol = 'p' | 'n' | 'b' | 'r' | 'q' | 'k'

// prettier-ignore
export type Square = 
    'a8' | 'b8' | 'c8' | 'd8' | 'e8' | 'f8' | 'g8' | 'h8' |
    'a7' | 'b7' | 'c7' | 'd7' | 'e7' | 'f7' | 'g7' | 'h7' |
    'a6' | 'b6' | 'c6' | 'd6' | 'e6' | 'f6' | 'g6' | 'h6' |
    'a5' | 'b5' | 'c5' | 'd5' | 'e5' | 'f5' | 'g5' | 'h5' |
    'a4' | 'b4' | 'c4' | 'd4' | 'e4' | 'f4' | 'g4' | 'h4' |
    'a3' | 'b3' | 'c3' | 'd3' | 'e3' | 'f3' | 'g3' | 'h3' |
    'a2' | 'b2' | 'c2' | 'd2' | 'e2' | 'f2' | 'g2' | 'h2' |
    'a1' | 'b1' | 'c1' | 'd1' | 'e1' | 'f1' | 'g1' | 'h1'

export const DEFAULT_POSITION =
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

export type Piece = {
  color: Color
  type: PieceSymbol
}

type InternalMove = {
  color: Color
  from: number
  to: number
  piece: PieceSymbol
  captured?: PieceSymbol
  promotion?: PieceSymbol
  flags: number
}

interface History {
  move: InternalMove
  kings: Record<Color, number>
  turn: Color
  castling: Record<Color, number>
  ep_square: number
  half_moves: number
  move_number: number
}

export type Move = {
  color: Color
  from: string
  to: string
  piece: PieceSymbol
  captured?: PieceSymbol
  promotion?: PieceSymbol
  flags: string
  san: string
}

const EMPTY = -1

const FLAGS: Record<string, string> = {
  NORMAL: 'n',
  CAPTURE: 'c',
  BIG_PAWN: 'b',
  EP_CAPTURE: 'e',
  PROMOTION: 'p',
  KSIDE_CASTLE: 'k',
  QSIDE_CASTLE: 'q',
}

// prettier-ignore
const SQUARES: Record<Square, number> = {
  a8:   0, b8:   1, c8:   2, d8:   3, e8:   4, f8:   5, g8:   6, h8:   7,
  a7:  16, b7:  17, c7:  18, d7:  19, e7:  20, f7:  21, g7:  22, h7:  23,
  a6:  32, b6:  33, c6:  34, d6:  35, e6:  36, f6:  37, g6:  38, h6:  39,
  a5:  48, b5:  49, c5:  50, d5:  51, e5:  52, f5:  53, g5:  54, h5:  55,
  a4:  64, b4:  65, c4:  66, d4:  67, e4:  68, f4:  69, g4:  70, h4:  71,
  a3:  80, b3:  81, c3:  82, d3:  83, e3:  84, f3:  85, g3:  86, h3:  87,
  a2:  96, b2:  97, c2:  98, d2:  99, e2: 100, f2: 101, g2: 102, h2: 103,
  a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119
}

const BITS: Record<string, number> = {
  NORMAL: 1,
  CAPTURE: 2,
  BIG_PAWN: 4,
  EP_CAPTURE: 8,
  PROMOTION: 16,
  KSIDE_CASTLE: 32,
  QSIDE_CASTLE: 64,
}

const PAWN_OFFSETS = {
  b: [16, 32, 17, 15],
  w: [-16, -32, -17, -15],
}

const PIECE_OFFSETS = {
  n: [-18, -33, -31, -14, 18, 33, 31, 14],
  b: [-17, -15, 17, 15],
  r: [-16, 1, 16, -1],
  q: [-17, -16, -15, 1, 17, 16, 15, -1],
  k: [-17, -16, -15, 1, 17, 16, 15, -1],
}

// prettier-ignore
const ATTACKS = [
  20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20, 0,
   0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
   0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
   0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
   0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
   0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
  24,24,24,24,24,24,56,  0, 56,24,24,24,24,24,24, 0,
   0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
   0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
   0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
   0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
  20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20
];

// prettier-ignore
const RAYS = [
   17,  0,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0,  0, 15, 0,
    0, 17,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0, 15,  0, 0,
    0,  0, 17,  0,  0,  0,  0, 16,  0,  0,  0,  0, 15,  0,  0, 0,
    0,  0,  0, 17,  0,  0,  0, 16,  0,  0,  0, 15,  0,  0,  0, 0,
    0,  0,  0,  0, 17,  0,  0, 16,  0,  0, 15,  0,  0,  0,  0, 0,
    0,  0,  0,  0,  0, 17,  0, 16,  0, 15,  0,  0,  0,  0,  0, 0,
    0,  0,  0,  0,  0,  0, 17, 16, 15,  0,  0,  0,  0,  0,  0, 0,
    1,  1,  1,  1,  1,  1,  1,  0, -1, -1,  -1,-1, -1, -1, -1, 0,
    0,  0,  0,  0,  0,  0,-15,-16,-17,  0,  0,  0,  0,  0,  0, 0,
    0,  0,  0,  0,  0,-15,  0,-16,  0,-17,  0,  0,  0,  0,  0, 0,
    0,  0,  0,  0,-15,  0,  0,-16,  0,  0,-17,  0,  0,  0,  0, 0,
    0,  0,  0,-15,  0,  0,  0,-16,  0,  0,  0,-17,  0,  0,  0, 0,
    0,  0,-15,  0,  0,  0,  0,-16,  0,  0,  0,  0,-17,  0,  0, 0,
    0,-15,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,-17,  0, 0,
  -15,  0,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,  0,-17
];

const SHIFTS = { p: 0, n: 1, b: 2, r: 3, q: 4, k: 5 }

const SYMBOLS = 'pnbrqkPNBRQK'

const PROMOTIONS: PieceSymbol[] = [KNIGHT, BISHOP, ROOK, QUEEN]

const RANK_1 = 7
const RANK_2 = 6
// const RANK_3 = 5
// const RANK_4 = 4
// const RANK_5 = 3
// const RANK_6 = 2
const RANK_7 = 1
const RANK_8 = 0

const ROOKS = {
  w: [
    { square: SQUARES.a1, flag: BITS.QSIDE_CASTLE },
    { square: SQUARES.h1, flag: BITS.KSIDE_CASTLE },
  ],
  b: [
    { square: SQUARES.a8, flag: BITS.QSIDE_CASTLE },
    { square: SQUARES.h8, flag: BITS.KSIDE_CASTLE },
  ],
}

const second_rank = { b: RANK_7, w: RANK_2 }

const TERMINATION_MARKERS = ['1-0', '0-1', '1/2-1/2', '*']

/**
 * Extracts the zero-based rank of an 0x88 square.
 */
function rank(square: number): number {
  return square >> 4
}

/**
 * Extracts the zero-based file of an 0x88 square.
 */
function file(square: number): number {
  return square & 0xf
}

function is_digit(c: string): boolean {
  return '0123456789'.indexOf(c) !== -1
}

/**
 * Converts a 0x88 square to algebraic notation.
 */
function algebraic(square: number): Square {
  const f = file(square)
  const r = rank(square)
  return ('abcdefgh'.substring(f, f + 1) +
    '87654321'.substring(r, r + 1)) as Square
}

function swap_color(color: Color): Color {
  return color === WHITE ? BLACK : WHITE
}

/* TODO: this function is pretty much crap - it validates structure but
    * completely ignores content (e.g. doesn't verify that each side has a
    king)
    * ... we should rewrite this, and ditch the silly error_number field
    while
    * we're at it
    */
export function validate_fen(fen: string) {
  const errors = {
    0: 'No errors.',
    1: 'FEN string must contain six space-delimited fields.',
    2: '6th field (move number) must be a positive integer.',
    3: '5th field (half move counter) must be a non-negative integer.',
    4: '4th field (en-passant square) is invalid.',
    5: '3rd field (castling availability) is invalid.',
    6: '2nd field (side to move) is invalid.',
    7: "1st field (piece positions) does not contain 8 '/'-delimited rows.",
    8: '1st field (piece positions) is invalid [consecutive numbers].',
    9: '1st field (piece positions) is invalid [invalid piece].',
    10: '1st field (piece positions) is invalid [row too large].',
    11: 'Illegal en-passant square',
  }

  /* 1st criterion: 6 space-seperated fields? */
  const tokens = fen.split(/\s+/)
  if (tokens.length !== 6) {
    return { valid: false, error_number: 1, error: errors[1] }
  }

  /* 2nd criterion: move number field is a integer value > 0? */
  const move_number = parseInt(tokens[5], 10)
  if (isNaN(move_number) || move_number <= 0) {
    return { valid: false, error_number: 2, error: errors[2] }
  }

  /* 3rd criterion: half move counter is an integer >= 0? */
  const half_moves = parseInt(tokens[4], 10)
  if (isNaN(half_moves) || half_moves < 0) {
    return { valid: false, error_number: 3, error: errors[3] }
  }

  /* 4th criterion: 4th field is a valid e.p.-string? */
  if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
    return { valid: false, error_number: 4, error: errors[4] }
  }

  /* 5th criterion: 3th field is a valid castle-string? */
  if (!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(tokens[2])) {
    return { valid: false, error_number: 5, error: errors[5] }
  }

  /* 6th criterion: 2nd field is "w" (white) or "b" (black)? */
  if (!/^(w|b)$/.test(tokens[1])) {
    return { valid: false, error_number: 6, error: errors[6] }
  }

  /* 7th criterion: 1st field contains 8 rows? */
  const rows = tokens[0].split('/')
  if (rows.length !== 8) {
    return { valid: false, error_number: 7, error: errors[7] }
  }

  /* 8th criterion: every row is valid? */
  for (let i = 0; i < rows.length; i++) {
    /* check for right sum of fields AND not two numbers in succession */
    let sum_fields = 0
    let previous_was_number = false

    for (let k = 0; k < rows[i].length; k++) {
      if (is_digit(rows[i][k])) {
        if (previous_was_number) {
          return { valid: false, error_number: 8, error: errors[8] }
        }
        sum_fields += parseInt(rows[i][k], 10)
        previous_was_number = true
      } else {
        if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
          return { valid: false, error_number: 9, error: errors[9] }
        }
        sum_fields += 1
        previous_was_number = false
      }
    }
    if (sum_fields !== 8) {
      return { valid: false, error_number: 10, error: errors[10] }
    }
  }

  if (
    (tokens[3][1] == '3' && tokens[1] == 'w') ||
    (tokens[3][1] == '6' && tokens[1] == 'b')
  ) {
    return { valid: false, error_number: 11, error: errors[11] }
  }

  /* everything's okay! */
  return { valid: true, error_number: 0, error: errors[0] }
}

/* this function is used to uniquely identify ambiguous moves */
function get_disambiguator(move: InternalMove, moves: InternalMove[]) {
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
    /* if there exists a similar moving piece on the same rank and file
       as the move in question, use the square as the disambiguator
    */

    if (same_rank > 0 && same_file > 0) {
      return algebraic(from)
    } else if (same_file > 0) {
      /* if the moving piece rests on the same file, use the rank symbol
         as the disambiguator
       */
      return algebraic(from).charAt(1)
    } else {
      /* else use the file symbol */
      return algebraic(from).charAt(0)
    }
  }

  return ''
}

function add_move(
  moves: InternalMove[],
  color: Color,
  from: number,
  to: number,
  piece: PieceSymbol,
  captured: PieceSymbol | undefined = undefined,
  flags: number = BITS.NORMAL
) {
  const r = rank(to)

  if (piece === PAWN && (r === RANK_1 || r === RANK_8)) {
    for (let i = 0; i < PROMOTIONS.length; i++) {
      const promotion = PROMOTIONS[i]
      moves.push({
        color,
        from,
        to,
        piece,
        captured,
        promotion,
        flags: flags | BITS.PROMOTION,
      })
    }
  } else {
    moves.push({
      color,
      from,
      to,
      piece,
      captured,
      promotion: undefined,
      flags,
    })
  }
}

function infer_piece_type(san: string) {
  let piece_type = san.charAt(0)
  if (piece_type >= 'a' && piece_type <= 'h') {
    const matches = san.match(/[a-h]\d.*[a-h]\d/)
    if (matches) {
      return undefined
    }
    return PAWN
  }
  piece_type = piece_type.toLowerCase()
  if (piece_type === 'o') {
    return KING
  }
  return piece_type as PieceSymbol
}

// parses all of the decorators out of a SAN string
function stripped_san(move: string) {
  return move.replace(/=/, '').replace(/[+#]?[?!]*$/, '')
}

export class Chess {
  private _board = new Array<Piece>(128)
  private _turn: Color = WHITE
  private _header: Record<string, string> = {}
  private _kings: Record<Color, number> = { w: EMPTY, b: EMPTY }
  private _ep_square = -1
  private _half_moves = 0
  private _move_number = 0
  private _history: History[] = []
  private _comments: Record<string, string> = {}
  private _castling: Record<Color, number> = { w: 0, b: 0 }

  constructor(fen = DEFAULT_POSITION) {
    this.load(fen)
  }

  clear(keep_headers = false) {
    this._board = new Array<Piece>(128)
    this._kings = { w: EMPTY, b: EMPTY }
    this._turn = WHITE
    this._castling = { w: 0, b: 0 }
    this._ep_square = EMPTY
    this._half_moves = 0
    this._move_number = 1
    this._history = []
    this._comments = {}
    this._header = keep_headers ? this._header : {}
    this._update_setup(this.fen())
  }

  load(fen: string, keep_headers = false) {
    const tokens = fen.split(/\s+/)
    const position = tokens[0]
    let square = 0

    if (!validate_fen(fen).valid) {
      return false
    }

    this.clear(keep_headers)

    for (let i = 0; i < position.length; i++) {
      const piece = position.charAt(i)

      if (piece === '/') {
        square += 8
      } else if (is_digit(piece)) {
        square += parseInt(piece, 10)
      } else {
        const color = piece < 'a' ? WHITE : BLACK
        this.put(
          { type: piece.toLowerCase() as PieceSymbol, color },
          algebraic(square)
        )
        square++
      }
    }

    this._turn = tokens[1] as Color

    if (tokens[2].indexOf('K') > -1) {
      this._castling.w |= BITS.KSIDE_CASTLE
    }
    if (tokens[2].indexOf('Q') > -1) {
      this._castling.w |= BITS.QSIDE_CASTLE
    }
    if (tokens[2].indexOf('k') > -1) {
      this._castling.b |= BITS.KSIDE_CASTLE
    }
    if (tokens[2].indexOf('q') > -1) {
      this._castling.b |= BITS.QSIDE_CASTLE
    }

    this._ep_square = tokens[3] === '-' ? EMPTY : SQUARES[tokens[3] as Square]
    this._half_moves = parseInt(tokens[4], 10)
    this._move_number = parseInt(tokens[5], 10)

    this._update_setup(this.fen())

    return true
  }

  fen() {
    let empty = 0
    let fen = ''

    for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
      if (this._board[i]) {
        if (empty > 0) {
          fen += empty
          empty = 0
        }
        const { color, type: piece } = this._board[i]

        fen += color === WHITE ? piece.toUpperCase() : piece.toLowerCase()
      } else {
        empty++
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
    if (this._castling[WHITE] & BITS.KSIDE_CASTLE) {
      cflags += 'K'
    }
    if (this._castling[WHITE] & BITS.QSIDE_CASTLE) {
      cflags += 'Q'
    }
    if (this._castling[BLACK] & BITS.KSIDE_CASTLE) {
      cflags += 'k'
    }
    if (this._castling[BLACK] & BITS.QSIDE_CASTLE) {
      cflags += 'q'
    }

    /* do we have an empty castling flag? */
    cflags = cflags || '-'

    const epflags = this._ep_square === EMPTY ? '-' : algebraic(this._ep_square)

    return [
      fen,
      this._turn,
      cflags,
      epflags,
      this._half_moves,
      this._move_number,
    ].join(' ')
  }

  /* Called when the initial board setup is changed with put() or remove().
   * modifies the SetUp and FEN properties of the header object.  if the FEN
   * is equal to the default position, the SetUp and FEN are deleted the setup
   * is only updated if history.length is zero, ie moves haven't been  made.
   */
  private _update_setup(fen: string) {
    if (this._history.length > 0) return

    if (fen !== DEFAULT_POSITION) {
      this._header['SetUp'] = '1'
      this._header['FEN'] = fen
    } else {
      delete this._header['SetUp']
      delete this._header['FEN']
    }
  }

  reset() {
    this.load(DEFAULT_POSITION)
  }

  get(square: Square) {
    return this._board[SQUARES[square]] || false
  }

  put({ type, color }: { type: PieceSymbol; color: Color }, square: Square) {
    /* check for piece */
    if (SYMBOLS.indexOf(type.toLowerCase()) === -1) {
      return false
    }

    /* check for valid square */
    if (!(square in SQUARES)) {
      return false
    }

    const sq = SQUARES[square]

    /* don't let the user place more than one king */
    if (
      type == KING &&
      !(this._kings[color] == EMPTY || this._kings[color] == sq)
    ) {
      return false
    }

    this._board[sq] = { type: type as PieceSymbol, color: color as Color }

    if (type === KING) {
      this._kings[color] = sq
    }

    this._update_setup(this.fen())

    return true
  }

  remove(square: Square) {
    const piece = this.get(square)
    delete this._board[SQUARES[square]]
    if (piece && piece.type === KING) {
      this._kings[piece.color] = EMPTY
    }

    this._update_setup(this.fen())

    return piece
  }

  _attacked(color: Color, square: number) {
    for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
      /* did we run off the end of the board */
      if (i & 0x88) {
        i += 7
        continue
      }

      /* if empty square or wrong color */
      if (this._board[i] === undefined || this._board[i].color !== color) {
        continue
      }

      const piece = this._board[i]
      const difference = i - square
      const index = difference + 119

      if (ATTACKS[index] & (1 << SHIFTS[piece.type])) {
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
          if (this._board[j] != null) {
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

  _king_attacked(color: Color) {
    return this._attacked(swap_color(color), this._kings[color])
  }

  in_check() {
    return this._king_attacked(this._turn)
  }

  in_checkmate() {
    return this.in_check() && this._moves().length === 0
  }

  in_stalemate() {
    return !this.in_check() && this._moves().length === 0
  }

  insufficient_material() {
    // k.b. vs k.b. (of opposite colors) with mate in 1:
    // 8/8/8/8/1b6/8/B1k5/K7 b - - 0 1
    //
    // k.b. vs k.n. with mate in 1:
    // 8/8/8/8/1n6/8/B7/K1k5 b - - 2 1
    const pieces: Record<PieceSymbol, number> = {
      b: 0,
      n: 0,
      r: 0,
      q: 0,
      k: 0,
      p: 0,
    }
    const bishops = []
    let num_pieces = 0
    let square_color = 0

    for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
      square_color = (square_color + 1) % 2
      if (i & 0x88) {
        i += 7
        continue
      }

      const piece = this._board[i]
      if (piece) {
        pieces[piece.type] = piece.type in pieces ? pieces[piece.type] + 1 : 1
        if (piece.type === BISHOP) {
          bishops.push(square_color)
        }
        num_pieces++
      }
    }

    // k vs. k
    if (num_pieces === 2) {
      return true
    } else if (
      // k vs. kn .... or .... k vs. kb
      num_pieces === 3 &&
      (pieces[BISHOP] === 1 || pieces[KNIGHT] === 1)
    ) {
      return true
    } else if (num_pieces === pieces[BISHOP] + 2) {
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

  in_threefold_repetition() {
    /* TODO: while this function is fine for casual use, a better
      * implementation would use a Zobrist key (instead of FEN). the
      * Zobrist key would be maintained in the make_move/undo_move
      functions,
      * avoiding the costly that we do below.
      */
    const moves = []
    const positions: Record<string, number> = {}
    let repetition = false

    while (true) {
      const move = this._undo_move()
      if (!move) break
      moves.push(move)
    }

    while (true) {
      /* remove the last two fields in the FEN string, they're not needed
       * when checking for draw by rep */
      const fen = this.fen().split(' ').slice(0, 4).join(' ')

      /* has the position occurred three or move times */
      positions[fen] = fen in positions ? positions[fen] + 1 : 1
      if (positions[fen] >= 3) {
        repetition = true
      }

      const move = moves.pop()

      if (!move) {
        break
      } else {
        this._make_move(move)
      }
    }

    return repetition
  }

  in_draw() {
    return (
      this._half_moves >= 100 || // 50 moves per side = 100 half moves
      this.in_stalemate() ||
      this.insufficient_material() ||
      this.in_threefold_repetition()
    )
  }

  game_over() {
    return this.in_checkmate() || this.in_stalemate() || this.in_draw()
  }

  moves({
    verbose = false,
    square = undefined,
  }: { verbose?: boolean; square?: Square } = {}) {
    const moves = this._moves({ square })

    if (verbose) {
      return moves.map((move) => this._make_pretty(move))
    } else {
      return moves.map((move) => this._move_to_san(move, moves))
    }
  }

  _moves({
    legal = true,
    piece = undefined,
    square = undefined,
  }: {
    legal?: boolean
    piece?: PieceSymbol
    square?: Square
  } = {}) {
    const forSquare = square ? (square.toLowerCase() as Square) : undefined
    const forPiece = piece?.toLowerCase()

    const moves: InternalMove[] = []
    const us = this._turn
    const them = swap_color(us)

    let first_sq = SQUARES.a8
    let last_sq = SQUARES.h1
    let single_square = false

    /* are we generating moves for a single square? */
    if (forSquare) {
      // illegal square, return empty moves
      if (!(forSquare in SQUARES)) {
        return []
      } else {
        first_sq = last_sq = SQUARES[forSquare]
        single_square = true
      }
    }

    for (let from = first_sq; from <= last_sq; from++) {
      /* did we run off the end of the board */
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

        /* single square, non-capturing */
        to = from + PAWN_OFFSETS[us][0]
        if (!this._board[to]) {
          add_move(moves, us, from, to, PAWN)

          /* double square */
          to = from + PAWN_OFFSETS[us][1]
          if (second_rank[us] === rank(from) && !this._board[to]) {
            add_move(moves, us, from, to, PAWN, undefined, BITS.BIG_PAWN)
          }
        }

        /* pawn captures */
        for (let j = 2; j < 4; j++) {
          to = from + PAWN_OFFSETS[us][j]
          if (to & 0x88) continue

          if (this._board[to]?.color === them) {
            add_move(
              moves,
              us,
              from,
              to,
              PAWN,
              this._board[to].type,
              BITS.CAPTURE
            )
          } else if (to === this._ep_square) {
            add_move(moves, us, from, to, PAWN, PAWN, BITS.EP_CAPTURE)
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
              add_move(moves, us, from, to, type)
            } else {
              // own color, stop loop
              if (this._board[to].color === us) break

              add_move(
                moves,
                us,
                from,
                to,
                type,
                this._board[to].type,
                BITS.CAPTURE
              )
              break
            }

            /* break, if knight or king */
            if (type === KNIGHT || type === KING) break
          }
        }
      }
    }

    /* check for castling if:
     * a) we're generating all moves, or
     * b) we're doing single square move generation on the king's square
     */
    if (forPiece === undefined || forPiece === KING) {
      if (!single_square || last_sq === this._kings[us]) {
        /* king-side castling */
        if (this._castling[us] & BITS.KSIDE_CASTLE) {
          const castling_from = this._kings[us]
          const castling_to = castling_from + 2

          if (
            !this._board[castling_from + 1] &&
            !this._board[castling_to] &&
            !this._attacked(them, this._kings[us]) &&
            !this._attacked(them, castling_from + 1) &&
            !this._attacked(them, castling_to)
          ) {
            add_move(
              moves,
              us,
              this._kings[us],
              castling_to,
              KING,
              undefined,
              BITS.KSIDE_CASTLE
            )
          }
        }
        /* queen-side castling */
        if (this._castling[us] & BITS.QSIDE_CASTLE) {
          const castling_from = this._kings[us]
          const castling_to = castling_from - 2

          if (
            !this._board[castling_from - 1] &&
            !this._board[castling_from - 2] &&
            !this._board[castling_from - 3] &&
            !this._attacked(them, this._kings[us]) &&
            !this._attacked(them, castling_from - 1) &&
            !this._attacked(them, castling_to)
          ) {
            add_move(
              moves,
              us,
              this._kings[us],
              castling_to,
              KING,
              undefined,
              BITS.QSIDE_CASTLE
            )
          }
        }
      }
    }

    /* return all pseudo-legal moves (this includes moves that allow the king
     * to be captured) */
    if (!legal) {
      return moves
    }

    /* filter out illegal moves */
    const legal_moves = []

    for (let i = 0, len = moves.length; i < len; i++) {
      this._make_move(moves[i])
      if (!this._king_attacked(us)) {
        legal_moves.push(moves[i])
      }
      this._undo_move()
    }

    return legal_moves
  }

  move(
    move: string | { from: string; to: string; promotion?: string },
    { sloppy = false }: { sloppy?: boolean } = {}
  ) {
    /* The move function can be called with in the following parameters:
        *
        * .move('Nxb7')      <- where 'move' is a case-sensitive SAN string
        *
        * .move({ from: 'h7', <- where the 'move' is a move object
        (additional
        *         to :'h8',      fields are ignored)
        *         promotion: 'q',
        *      })
        */

    // sloppy parser allows the move parser to work around over disambiguation
    // bugs in Fritz and Chessbase

    let move_obj = null

    if (typeof move === 'string') {
      move_obj = this._move_from_san(move, sloppy)
    } else if (typeof move === 'object') {
      const moves = this._moves()

      /* convert the pretty move object to an ugly move object */
      for (let i = 0, len = moves.length; i < len; i++) {
        if (
          move.from === algebraic(moves[i].from) &&
          move.to === algebraic(moves[i].to) &&
          (!('promotion' in moves[i]) || move.promotion === moves[i].promotion)
        ) {
          move_obj = moves[i]
          break
        }
      }
    }

    /* failed to find move */
    if (!move_obj) {
      return null
    }

    /* need to make a copy of move because we can't generate SAN after
       the move is made */
    const pretty_move = this._make_pretty(move_obj)

    this._make_move(move_obj)

    return pretty_move
  }

  _push(move: InternalMove) {
    this._history.push({
      move,
      kings: { b: this._kings.b, w: this._kings.w },
      turn: this._turn,
      castling: { b: this._castling.b, w: this._castling.w },
      ep_square: this._ep_square,
      half_moves: this._half_moves,
      move_number: this._move_number,
    })
  }

  _make_move(move: InternalMove) {
    const us = this._turn
    const them = swap_color(us)
    this._push(move)

    this._board[move.to] = this._board[move.from]
    delete this._board[move.from]

    /* if ep capture, remove the captured pawn */
    if (move.flags & BITS.EP_CAPTURE) {
      if (this._turn === BLACK) {
        delete this._board[move.to - 16]
      } else {
        delete this._board[move.to + 16]
      }
    }

    /* if pawn promotion, replace with new piece */
    if (move.promotion) {
      this._board[move.to] = { type: move.promotion, color: us }
    }

    /* if we moved the king */
    if (this._board[move.to].type === KING) {
      this._kings[us] = move.to

      /* if we castled, move the rook next to the king */
      if (move.flags & BITS.KSIDE_CASTLE) {
        const castling_to = move.to - 1
        const castling_from = move.to + 1
        this._board[castling_to] = this._board[castling_from]
        delete this._board[castling_from]
      } else if (move.flags & BITS.QSIDE_CASTLE) {
        const castling_to = move.to + 1
        const castling_from = move.to - 2
        this._board[castling_to] = this._board[castling_from]
        delete this._board[castling_from]
      }

      /* turn off castling */
      this._castling[us] = 0
    }

    /* turn off castling if we move a rook */
    if (this._castling[us]) {
      for (let i = 0, len = ROOKS[us].length; i < len; i++) {
        if (
          move.from === ROOKS[us][i].square &&
          this._castling[us] & ROOKS[us][i].flag
        ) {
          this._castling[us] ^= ROOKS[us][i].flag
          break
        }
      }
    }

    /* turn off castling if we capture a rook */
    if (this._castling[them]) {
      for (let i = 0, len = ROOKS[them].length; i < len; i++) {
        if (
          move.to === ROOKS[them][i].square &&
          this._castling[them] & ROOKS[them][i].flag
        ) {
          this._castling[them] ^= ROOKS[them][i].flag
          break
        }
      }
    }

    /* if big pawn move, update the en passant square */
    if (move.flags & BITS.BIG_PAWN) {
      if (us === BLACK) {
        this._ep_square = move.to - 16
      } else {
        this._ep_square = move.to + 16
      }
    } else {
      this._ep_square = EMPTY
    }

    /* reset the 50 move counter if a pawn is moved or a piece is captured */
    if (move.piece === PAWN) {
      this._half_moves = 0
    } else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
      this._half_moves = 0
    } else {
      this._half_moves++
    }

    if (us === BLACK) {
      this._move_number++
    }

    this._turn = them
  }

  undo() {
    const move = this._undo_move()
    return move ? this._make_pretty(move) : null
  }

  _undo_move() {
    const old = this._history.pop()
    if (old === undefined) {
      return null
    }

    const move = old.move

    this._kings = old.kings
    this._turn = old.turn
    this._castling = old.castling
    this._ep_square = old.ep_square
    this._half_moves = old.half_moves
    this._move_number = old.move_number

    const us = this._turn
    const them = swap_color(us)

    this._board[move.from] = this._board[move.to]
    this._board[move.from].type = move.piece // to undo any promotions
    delete this._board[move.to]

    if (move.captured) {
      if (move.flags & BITS.EP_CAPTURE) {
        // en passant capture
        let index: number
        if (us === BLACK) {
          index = move.to - 16
        } else {
          index = move.to + 16
        }
        this._board[index] = { type: PAWN, color: them }
      } else {
        // regular capture
        this._board[move.to] = { type: move.captured, color: them }
      }
    }

    if (move.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
      let castling_to: number, castling_from: number
      if (move.flags & BITS.KSIDE_CASTLE) {
        castling_to = move.to + 1
        castling_from = move.to - 1
      } else {
        castling_to = move.to - 2
        castling_from = move.to + 1
      }

      this._board[castling_to] = this._board[castling_from]
      delete this._board[castling_from]
    }

    return move
  }

  pgn({
    newline = '\n',
    max_width = 0,
  }: { newline?: string; max_width?: number } = {}) {
    /* using the specification from http://www.chessclub.com/help/PGN-spec
     * example for html usage: .pgn({ max_width: 72, newline_char: "<br />" })
     */
    const result: string[] = []
    let header_exists = false

    /* add the PGN header headerrmation */
    for (const i in this._header) {
      /* TODO: order of enumerated properties in header object is not
       * guaranteed, see ECMA-262 spec (section 12.6.4)
       */
      result.push('[' + i + ' "' + this._header[i] + '"]' + newline)
      header_exists = true
    }

    if (header_exists && this._history.length) {
      result.push(newline)
    }

    const append_comment = (move_string: string) => {
      const comment = this._comments[this.fen()]
      if (typeof comment !== 'undefined') {
        const delimiter = move_string.length > 0 ? ' ' : ''
        move_string = `${move_string}${delimiter}{${comment}}`
      }
      return move_string
    }

    /* pop all of history onto reversed_history */
    const reversed_history = []
    while (this._history.length > 0) {
      reversed_history.push(this._undo_move())
    }

    const moves = []
    let move_string = ''

    /* special case of a commented starting position with no moves */
    if (reversed_history.length === 0) {
      moves.push(append_comment(''))
    }

    /* build the list of moves.  a move_string looks like: "3. e3 e6" */
    while (reversed_history.length > 0) {
      move_string = append_comment(move_string)
      const move = reversed_history.pop()

      // make TypeScript stop complaining about move being undefined
      if (!move) {
        break
      }

      /* if the position started with black to move, start PGN with 1. ... */
      if (!this._history.length && move.color === 'b') {
        move_string = this._move_number + '. ...'
      } else if (move.color === 'w') {
        /* store the previous generated move_string if we have one */
        if (move_string.length) {
          moves.push(move_string)
        }
        move_string = this._move_number + '.'
      }

      move_string =
        move_string +
        ' ' +
        this._move_to_san(move, this._moves({ legal: true }))
      this._make_move(move)
    }

    /* are there any other leftover moves? */
    if (move_string.length) {
      moves.push(append_comment(move_string))
    }

    /* is there a result? */
    if (typeof this._header.Result !== 'undefined') {
      moves.push(this._header.Result)
    }

    /* history should be back to what it was before we started generating PGN,
     * so join together moves
     */
    if (max_width === 0) {
      return result.join('') + moves.join(' ')
    }

    // JAH: huh?
    const strip = function () {
      if (result.length > 0 && result[result.length - 1] === ' ') {
        result.pop()
        return true
      }
      return false
    }

    /* NB: this does not preserve comment whitespace. */
    const wrap_comment = function (width: number, move: string) {
      for (const token of move.split(' ')) {
        if (!token) {
          continue
        }
        if (width + token.length > max_width) {
          while (strip()) {
            width--
          }
          result.push(newline)
          width = 0
        }
        result.push(token)
        width += token.length
        result.push(' ')
        width++
      }
      if (strip()) {
        width--
      }
      return width
    }

    /* wrap the PGN output at max_width */
    let current_width = 0
    for (let i = 0; i < moves.length; i++) {
      if (current_width + moves[i].length > max_width) {
        if (moves[i].includes('{')) {
          current_width = wrap_comment(current_width, moves[i])
          continue
        }
      }
      /* if the current move will push past max_width */
      if (current_width + moves[i].length > max_width && i !== 0) {
        /* don't end the line with whitespace */
        if (result[result.length - 1] === ' ') {
          result.pop()
        }

        result.push(newline)
        current_width = 0
      } else if (i !== 0) {
        result.push(' ')
        current_width++
      }
      result.push(moves[i])
      current_width += moves[i].length
    }

    return result.join('')
  }

  header(...args: string[]) {
    for (let i = 0; i < args.length; i += 2) {
      if (typeof args[i] === 'string' && typeof args[i + 1] === 'string') {
        this._header[args[i]] = args[i + 1]
      }
    }
    return this._header
  }

  load_pgn(
    pgn: string,
    {
      sloppy = false,
      newline_char = '\r?\n',
    }: { sloppy?: boolean; newline_char?: string } = {}
  ) {
    // option sloppy=true
    // allow the user to specify the sloppy move parser to work around over
    // disambiguation bugs in Fritz and Chessbase

    function mask(str: string): string {
      return str.replace(/\\/g, '\\')
    }

    function parse_pgn_header(header: string): { [key: string]: string } {
      const header_obj: Record<string, string> = {}
      const headers = header.split(new RegExp(mask(newline_char)))
      let key = ''
      let value = ''

      for (let i = 0; i < headers.length; i++) {
        const regex = /^\s*\[([A-Za-z]+)\s*"(.*)"\s*\]\s*$/
        key = headers[i].replace(regex, '$1')
        value = headers[i].replace(regex, '$2')
        if (key.trim().length > 0) {
          header_obj[key] = value
        }
      }

      return header_obj
    }

    // strip whitespace from head/tail of PGN block
    pgn = pgn.trim()

    // RegExp to split header. Takes advantage of the fact that header and movetext
    // will always have a blank line between them (ie, two newline_char's).
    // With default newline_char, will equal: /^(\[((?:\r?\n)|.)*\])(?:\s*\r?\n){2}/
    const header_regex = new RegExp(
      '^(\\[((?:' +
        mask(newline_char) +
        ')|.)*\\])' +
        '(?:\\s*' +
        mask(newline_char) +
        '){2}'
    )

    // If no header given, begin with moves.
    const header_regex_results = header_regex.exec(pgn)
    const header_string = header_regex_results
      ? header_regex_results.length >= 2
        ? header_regex_results[1]
        : ''
      : ''

    // Put the board in the starting position
    this.reset()

    /* parse PGN header */
    const headers = parse_pgn_header(header_string)
    let fen = ''

    for (const key in headers) {
      // check to see user is including fen (possibly with wrong tag case)
      if (key.toLowerCase() === 'fen') {
        fen = headers[key]
      }

      this.header(key, headers[key])
    }

    /* sloppy parser should attempt to load a fen tag, even if it's
     * the wrong case and doesn't include a corresponding [SetUp "1"] tag */
    if (sloppy) {
      if (fen) {
        if (!this.load(fen, true)) {
          return false
        }
      }
    } else {
      /* strict parser - load the starting position indicated by [Setup '1']
       * and [FEN position] */
      if (headers['SetUp'] === '1') {
        if (!('FEN' in headers && this.load(headers['FEN'], true))) {
          // second argument to load: don't clear the headers
          return false
        }
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

    function to_hex(s: string): string {
      return Array.from(s)
        .map(function (c) {
          /* encodeURI doesn't transform most ASCII characters,
           * so we handle these ourselves */
          return c.charCodeAt(0) < 128
            ? c.charCodeAt(0).toString(16)
            : encodeURIComponent(c).replace(/%/g, '').toLowerCase()
        })
        .join('')
    }

    function from_hex(s: string): string {
      return s.length == 0
        ? ''
        : decodeURIComponent('%' + (s.match(/.{1,2}/g) || []).join('%'))
    }

    const encode_comment = function (s: string) {
      s = s.replace(new RegExp(mask(newline_char), 'g'), ' ')
      return `{${to_hex(s.slice(1, s.length - 1))}}`
    }

    const decode_comment = function (s: string) {
      if (s.startsWith('{') && s.endsWith('}')) {
        return from_hex(s.slice(1, s.length - 1))
      }
    }

    /* delete header to get the moves */
    let ms = pgn
      .replace(header_string, '')
      .replace(
        /* encode comments so they don't get deleted below */
        new RegExp(`({[^}]*})+?|;([^${mask(newline_char)}]*)`, 'g'),
        function (_match, bracket, semicolon) {
          return bracket !== undefined
            ? encode_comment(bracket)
            : ' ' + encode_comment(`{${semicolon.slice(1)}}`)
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

    /* trim and get array of moves */
    let moves = ms.trim().split(new RegExp(/\s+/))

    /* delete empty entries */
    moves = moves.join(',').replace(/,,+/g, ',').split(',')

    let result = ''

    for (let half_move = 0; half_move < moves.length; half_move++) {
      const comment = decode_comment(moves[half_move])
      if (comment !== undefined) {
        this._comments[this.fen()] = comment
        continue
      }

      const move = this._move_from_san(moves[half_move], sloppy)

      /* invalid move */
      if (move == null) {
        /* was the move an end of game marker */
        if (TERMINATION_MARKERS.indexOf(moves[half_move]) > -1) {
          result = moves[half_move]
        } else {
          return false
        }
      } else {
        /* reset the end of game marker if making a valid move */
        result = ''
        this._make_move(move)
      }
    }

    /* Per section 8.2.6 of the PGN spec, the Result tag pair must match
* match the termination marker. Only do this when headers are
        present,
        * but the result tag is missing
        */
    if (result && Object.keys(this._header).length && !this._header['Result']) {
      this.header('Result', result)
    }

    return true
  }

  /* convert a move from 0x88 coordinates to Standard Algebraic Notation
    * (SAN)
    *
    * @param {boolean} sloppy Use the sloppy SAN generator to work around
    over
    * disambiguation bugs in Fritz and Chessbase.  See below:
    *
    * r1bqkbnr/ppp2ppp/2n5/1B1pP3/4P3/8/PPPP2PP/RNBQK1NR b KQkq - 2 4
    * 4. ... Nge7 is overly disambiguated because the knight on c6 is pinned
    * 4. ... Ne7 is technically the valid SAN
    */
  _move_to_san(move: InternalMove, moves: InternalMove[]) {
    let output = ''

    if (move.flags & BITS.KSIDE_CASTLE) {
      output = 'O-O'
    } else if (move.flags & BITS.QSIDE_CASTLE) {
      output = 'O-O-O'
    } else {
      if (move.piece !== PAWN) {
        const disambiguator = get_disambiguator(move, moves)
        output += move.piece.toUpperCase() + disambiguator
      }

      if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
        if (move.piece === PAWN) {
          output += algebraic(move.from)[0]
        }
        output += 'x'
      }

      output += algebraic(move.to)

      if (move.promotion) {
        output += '=' + move.promotion.toUpperCase()
      }
    }

    this._make_move(move)
    if (this.in_check()) {
      if (this.in_checkmate()) {
        output += '#'
      } else {
        output += '+'
      }
    }
    this._undo_move()

    return output
  }

  // convert a move from Standard Algebraic Notation (SAN) to 0x88
  // coordinates
  _move_from_san(move: string, sloppy = false): InternalMove | null {
    // strip off any move decorations: e.g Nf3+?! becomes Nf3
    const clean_move = stripped_san(move)

    let piece_type = infer_piece_type(clean_move)
    let moves = this._moves({ legal: true, piece: piece_type })

    // strict parser
    for (let i = 0, len = moves.length; i < len; i++) {
      if (clean_move === stripped_san(this._move_to_san(moves[i], moves))) {
        return moves[i]
      }
    }

    // strict parser failed and the sloppy parser wasn't used, return null
    if (!sloppy) {
      return null
    }

    let piece = undefined
    let matches = undefined
    let from = undefined
    let to = undefined
    let promotion = undefined

    // The sloppy parser allows the user to parse non-standard chess
    // notations. This parser is opt-in (by specifying the
    // '{ sloppy: true }' setting) and is only run after the Standard
    // Algebraic Notation (SAN) parser has failed.
    //
    // When running the sloppy parser, we'll run a regex to grab the piece,
    // the to/from square, and an optional promotion piece. This regex will
    // parse common non-standard notation like: Pe2-e4, Rc1c4, Qf3xf7,
    // f7f8q, b1c3

    // NOTE: Some positions and moves may be ambiguous when using the
    // sloppy parser. For example, in this position:
    // 6k1/8/8/B7/8/8/8/BN4K1 w - - 0 1, the move b1c3 may be interpreted
    // as Nc3 or B1c3 (a disambiguated bishop move). In these cases, the
    // sloppy parser will default to the most most basic interpretation
    // (which is b1c3 parsing to Nc3).

    // FIXME: these var's are hoisted into function scope, this will need
    // to change when switching to const/let

    let overly_disambiguated = false

    matches = clean_move.match(
      /([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/
      //     piece         from              to       promotion
    )

    if (matches) {
      piece = matches[1]
      from = matches[2] as Square
      to = matches[3] as Square
      promotion = matches[4]

      if (from.length == 1) {
        overly_disambiguated = true
      }
    } else {
      // The [a-h]?[1-8]? portion of the regex below handles moves that may
      // be overly disambiguated (e.g. Nge7 is unnecessary and non-standard
      // when there is one legal knight move to e7). In this case, the value
      // of 'from' variable will be a rank or file, not a square.
      matches = clean_move.match(
        /([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/
      )

      if (matches) {
        piece = matches[1]
        from = matches[2] as Square
        to = matches[3] as Square
        promotion = matches[4]

        if (from.length == 1) {
          overly_disambiguated = true
        }
      }
    }

    piece_type = infer_piece_type(clean_move)
    moves = this._moves({
      legal: true,
      piece: piece ? (piece as PieceSymbol) : piece_type,
    })

    for (let i = 0, len = moves.length; i < len; i++) {
      if (from && to) {
        // hand-compare move properties with the results from our sloppy
        // regex
        if (
          (!piece || piece.toLowerCase() == moves[i].piece) &&
          SQUARES[from] == moves[i].from &&
          SQUARES[to] == moves[i].to &&
          (!promotion || promotion.toLowerCase() == moves[i].promotion)
        ) {
          return moves[i]
        } else if (overly_disambiguated) {
          // SPECIAL CASE: we parsed a move string that may have an
          // unneeded rank/file disambiguator (e.g. Nge7).  The 'from'
          // variable will

          const square = algebraic(moves[i].from)
          if (
            (!piece || piece.toLowerCase() == moves[i].piece) &&
            SQUARES[to] == moves[i].to &&
            (from == square[0] || from == square[1]) &&
            (!promotion || promotion.toLowerCase() == moves[i].promotion)
          ) {
            return moves[i]
          }
        }
      }
    }

    return null
  }

  ascii() {
    let s = '   +------------------------+\n'
    for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
      /* display the rank */
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

  perft(depth: number) {
    const moves = this._moves({ legal: false })
    let nodes = 0
    const color = this._turn

    for (let i = 0, len = moves.length; i < len; i++) {
      this._make_move(moves[i])
      if (!this._king_attacked(color)) {
        if (depth - 1 > 0) {
          nodes += this.perft(depth - 1)
        } else {
          nodes++
        }
      }
      this._undo_move()
    }

    return nodes
  }

  /* pretty = external move object */
  _make_pretty(ugly_move: InternalMove): Move {
    const { color, piece, from, to, flags, captured, promotion } = ugly_move

    let prettyFlags = ''

    for (const flag in BITS) {
      if (BITS[flag] & flags) {
        prettyFlags += FLAGS[flag]
      }
    }

    const move: Move = {
      color,
      piece,
      from: algebraic(from),
      to: algebraic(to),
      san: this._move_to_san(ugly_move, this._moves({ legal: true })),
      flags: prettyFlags,
    }

    if (captured) {
      move.captured = captured
    }
    if (promotion) {
      move.promotion = promotion
    }

    return move
  }

  turn() {
    return this._turn
  }

  board() {
    const output = []
    let row = []

    for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
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

  square_color(square: Square) {
    if (square in SQUARES) {
      const sq = SQUARES[square]
      return (rank(sq) + file(sq)) % 2 === 0 ? 'light' : 'dark'
    }

    return null
  }

  history({ verbose = false }: { verbose?: boolean } = {}) {
    const reversed_history = []
    const move_history = []

    while (this._history.length > 0) {
      reversed_history.push(this._undo_move())
    }

    while (true) {
      const move = reversed_history.pop()
      if (!move) {
        break
      }

      if (verbose) {
        move_history.push(this._make_pretty(move))
      } else {
        move_history.push(this._move_to_san(move, this._moves()))
      }
      this._make_move(move)
    }

    return move_history
  }

  _prune_comments() {
    const reversed_history = []
    const current_comments: Record<string, string> = {}

    const copy_comment = (fen: string) => {
      if (fen in this._comments) {
        current_comments[fen] = this._comments[fen]
      }
    }

    while (this._history.length > 0) {
      reversed_history.push(this._undo_move())
    }

    copy_comment(this.fen())

    while (true) {
      const move = reversed_history.pop()
      if (!move) {
        break
      }
      this._make_move(move)
      copy_comment(this.fen())
    }
    this._comments = current_comments
  }

  get_comment() {
    return this._comments[this.fen()]
  }

  set_comment(comment: string) {
    this._comments[this.fen()] = comment.replace('{', '[').replace('}', ']')
  }

  delete_comment() {
    const comment = this._comments[this.fen()]
    delete this._comments[this.fen()]
    return comment
  }

  get_comments() {
    this._prune_comments()
    return Object.keys(this._comments).map((fen: string) => {
      return { fen: fen, comment: this._comments[fen] }
    })
  }

  delete_comments() {
    this._prune_comments()
    return Object.keys(this._comments).map((fen) => {
      const comment = this._comments[fen]
      delete this._comments[fen]
      return { fen: fen, comment: comment }
    })
  }
}

//   return {
//     /***************************************************************************
//      * PUBLIC CONSTANTS (is there a better way to do this?)
//      **************************************************************************/
//     SQUARES: (function () {
//       /* from the ECMA-262 spec (section 12.6.4):
//        * "The mechanics of enumerating the properties ... is
//        * implementation dependent"
//        * so: for (var sq in SQUARES) { keys.push(sq); } might not be
//        * ordered correctly
//        */
//       var keys = []
//       for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
//         if (i & 0x88) {
//           i += 7
//           continue
//         }
//         keys.push(algebraic(i))
//       }
//       return keys
//     })(),
//     FLAGS: FLAGS,
// }
