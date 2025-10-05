/**
 * @license
 * Copyright (c) 2025, Jeff Hlywa (jhlywa@gmail.com)
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
 */

import { Game } from './Game'
import { Move } from './Move'
import { parse } from './pgn'
import {
  WHITE,
  BLACK,
  PAWN,
  KNIGHT,
  BISHOP,
  ROOK,
  QUEEN,
  KING,
  Color,
  PieceSymbol,
  Square,
  Piece,
  InternalMove,
  BITS,
  rank,
  file,
  algebraic,
  Ox88,
  swapColor,
  History,
} from './types'

// Re-export types and constants from types.ts for backward compatibility
export {
  WHITE,
  BLACK,
  PAWN,
  KNIGHT,
  BISHOP,
  ROOK,
  QUEEN,
  KING,
  Color,
  PieceSymbol,
  Square,
  Piece,
  InternalMove,
  FLAGS,
  BITS,
} from './types'
export { Move } from './Move'
export { xoroshiro128 } from './types'

export const SUFFIX_LIST = ['!', '?', '!!', '!?', '?!', '??'] as const

export type Suffix = (typeof SUFFIX_LIST)[number]

export const DEFAULT_POSITION =
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

const EMPTY = -1

// prettier-ignore
export const SQUARES: Square[] = [
  'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
  'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
  'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
  'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
  'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
  'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
  'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
  'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'
]

/* eslint-disable @typescript-eslint/naming-convention */

// these are required, according to spec
export const SEVEN_TAG_ROSTER: Record<string, string> = {
  Event: '?',
  Site: '?',
  Date: '????.??.??',
  Round: '?',
  White: '?',
  Black: '?',
  Result: '*',
}

/**
 * These nulls are placeholders to fix the order of tags (as they appear in PGN spec); null values will be
 * eliminated in getHeaders()
 */
const SUPLEMENTAL_TAGS: Record<string, string | null> = {
  WhiteTitle: null,
  BlackTitle: null,
  WhiteElo: null,
  BlackElo: null,
  WhiteUSCF: null,
  BlackUSCF: null,
  WhiteNA: null,
  BlackNA: null,
  WhiteType: null,
  BlackType: null,
  EventDate: null,
  EventSponsor: null,
  Section: null,
  Stage: null,
  Board: null,
  Opening: null,
  Variation: null,
  SubVariation: null,
  ECO: null,
  NIC: null,
  Time: null,
  UTCTime: null,
  UTCDate: null,
  TimeControl: null,
  SetUp: null,
  FEN: null,
  Termination: null,
  Annotator: null,
  Mode: null,
  PlyCount: null,
}

const HEADER_TEMPLATE = {
  ...SEVEN_TAG_ROSTER,
  ...SUPLEMENTAL_TAGS,
}
/* eslint-enable @typescript-eslint/naming-convention */

/*
 * NOTES ABOUT 0x88 MOVE GENERATION ALGORITHM
 * ----------------------------------------------------------------------------
 * From https://github.com/jhlywa/chess.js/issues/230
 *
 * A lot of people are confused when they first see the internal representation
 * of chess.js. It uses the 0x88 Move Generation Algorithm which internally
 * stores the board as an 8x16 array. This is purely for efficiency but has a
 * couple of interesting benefits:
 *
 * 1. 0x88 offers a very inexpensive "off the board" check. Bitwise AND (&) any
 *    square with 0x88, if the result is non-zero then the square is off the
 *    board. For example, assuming a knight square A8 (0 in 0x88 notation),
 *    there are 8 possible directions in which the knight can move. These
 *    directions are relative to the 8x16 board and are stored in the
 *    PIECE_OFFSETS map. One possible move is A8 - 18 (up one square, and two
 *    squares to the left - which is off the board). 0 - 18 = -18 & 0x88 = 0x88
 *    (because of two-complement representation of -18). The non-zero result
 *    means the square is off the board and the move is illegal. Take the
 *    opposite move (from A8 to C7), 0 + 18 = 18 & 0x88 = 0. A result of zero
 *    means the square is on the board.
 *
 * 2. The relative distance (or difference) between two squares on a 8x16 board
 *    is unique and can be used to inexpensively determine if a piece on a
 *    square can attack any other arbitrary square. For example, let's see if a
 *    pawn on E7 can attack E2. The difference between E7 (20) - E2 (100) is
 *    -80. We add 119 to make the ATTACKS array index non-negative (because the
 *    worst case difference is A8 - H1 = -119). The ATTACKS array contains a
 *    bitmask of pieces that can attack from that distance and direction.
 *    ATTACKS[-80 + 119=39] gives us 24 or 0b11000 in binary. Look at the
 *    PIECE_MASKS map to determine the mask for a given piece type. In our pawn
 *    example, we would check to see if 24 & 0x1 is non-zero, which it is
 *    not. So, naturally, a pawn on E7 can't attack a piece on E2. However, a
 *    rook can since 24 & 0x8 is non-zero. The only thing left to check is that
 *    there are no blocking pieces between E7 and E2. That's where the RAYS
 *    array comes in. It provides an offset (in this case 16) to add to E7 (20)
 *    to check for blocking pieces. E7 (20) + 16 = E6 (36) + 16 = E5 (52) etc.
 */

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

const PIECE_MASKS = { p: 0x1, n: 0x2, b: 0x4, r: 0x8, q: 0x10, k: 0x20 }

const SYMBOLS = 'pnbrqkPNBRQK'

const SIDES = {
  [KING]: BITS.KSIDE_CASTLE,
  [QUEEN]: BITS.QSIDE_CASTLE,
}

const SAN_NULLMOVE = '--'

function isDigit(c: string): boolean {
  return '0123456789'.indexOf(c) !== -1
}

export function validateFen(fen: string): { ok: boolean; error?: string } {
  // 1st criterion: 6 space-seperated fields?
  const tokens = fen.split(/\s+/)
  if (tokens.length !== 6) {
    return {
      ok: false,
      error: 'Invalid FEN: must contain six space-delimited fields',
    }
  }

  // 2nd criterion: move number field is a integer value > 0?
  const moveNumber = parseInt(tokens[5], 10)
  if (isNaN(moveNumber) || moveNumber <= 0) {
    return {
      ok: false,
      error: 'Invalid FEN: move number must be a positive integer',
    }
  }

  // 3rd criterion: half move counter is an integer >= 0?
  const halfMoves = parseInt(tokens[4], 10)
  if (isNaN(halfMoves) || halfMoves < 0) {
    return {
      ok: false,
      error:
        'Invalid FEN: half move counter number must be a non-negative integer',
    }
  }

  // 4th criterion: 4th field is a valid e.p.-string?
  if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
    return { ok: false, error: 'Invalid FEN: en-passant square is invalid' }
  }

  // 5th criterion: 3th field is a valid castle-string?
  if (/[^kKqQ-]/.test(tokens[2])) {
    return { ok: false, error: 'Invalid FEN: castling availability is invalid' }
  }

  // 6th criterion: 2nd field is "w" (white) or "b" (black)?
  if (!/^(w|b)$/.test(tokens[1])) {
    return { ok: false, error: 'Invalid FEN: side-to-move is invalid' }
  }

  // 7th criterion: 1st field contains 8 rows?
  const rows = tokens[0].split('/')
  if (rows.length !== 8) {
    return {
      ok: false,
      error: "Invalid FEN: piece data does not contain 8 '/'-delimited rows",
    }
  }

  // 8th criterion: every row is valid?
  for (let i = 0; i < rows.length; i++) {
    // check for right sum of fields AND not two numbers in succession
    let sumFields = 0
    let previousWasNumber = false

    for (let k = 0; k < rows[i].length; k++) {
      if (isDigit(rows[i][k])) {
        if (previousWasNumber) {
          return {
            ok: false,
            error: 'Invalid FEN: piece data is invalid (consecutive number)',
          }
        }
        sumFields += parseInt(rows[i][k], 10)
        previousWasNumber = true
      } else {
        if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
          return {
            ok: false,
            error: 'Invalid FEN: piece data is invalid (invalid piece)',
          }
        }
        sumFields += 1
        previousWasNumber = false
      }
    }
    if (sumFields !== 8) {
      return {
        ok: false,
        error: 'Invalid FEN: piece data is invalid (too many squares in rank)',
      }
    }
  }

  // 9th criterion: is en-passant square legal?
  if (
    (tokens[3][1] == '3' && tokens[1] == 'w') ||
    (tokens[3][1] == '6' && tokens[1] == 'b')
  ) {
    return { ok: false, error: 'Invalid FEN: illegal en-passant square' }
  }

  // 10th criterion: does chess position contain exact two kings?
  const kings = [
    { color: 'white', regex: /K/g },
    { color: 'black', regex: /k/g },
  ]

  for (const { color, regex } of kings) {
    if (!regex.test(tokens[0])) {
      return { ok: false, error: `Invalid FEN: missing ${color} king` }
    }

    if ((tokens[0].match(regex) || []).length > 1) {
      return { ok: false, error: `Invalid FEN: too many ${color} kings` }
    }
  }

  // 11th criterion: are any pawns on the first or eighth rows?
  if (
    Array.from(rows[0] + rows[7]).some((char) => char.toUpperCase() === 'P')
  ) {
    return {
      ok: false,
      error: 'Invalid FEN: some pawns are on the edge rows',
    }
  }

  return { ok: true }
}

// this function is used to uniquely identify ambiguous moves
function getDisambiguator(move: InternalMove, moves: InternalMove[]): string {
  const from = move.from
  const to = move.to
  const piece = move.piece

  let ambiguities = 0
  let sameRank = 0
  let sameFile = 0

  for (let i = 0, len = moves.length; i < len; i++) {
    const ambigFrom = moves[i].from
    const ambigTo = moves[i].to
    const ambigPiece = moves[i].piece

    /*
     * if a move of the same piece type ends on the same to square, we'll need
     * to add a disambiguator to the algebraic notation
     */
    if (piece === ambigPiece && from !== ambigFrom && to === ambigTo) {
      ambiguities++

      if (rank(from) === rank(ambigFrom)) {
        sameRank++
      }

      if (file(from) === file(ambigFrom)) {
        sameFile++
      }
    }
  }

  if (ambiguities > 0) {
    if (sameRank > 0 && sameFile > 0) {
      /*
       * if there exists a similar moving piece on the same rank and file as
       * the move in question, use the square as the disambiguator
       */
      return algebraic(from)
    } else if (sameFile > 0) {
      /*
       * if the moving piece rests on the same file, use the rank symbol as the
       * disambiguator
       */
      return algebraic(from).charAt(1)
    } else {
      // else use the file symbol
      return algebraic(from).charAt(0)
    }
  }

  return ''
}

function inferPieceType(san: string): PieceSymbol | undefined {
  let pieceType = san.charAt(0)
  if (pieceType >= 'a' && pieceType <= 'h') {
    const matches = san.match(/[a-h]\d.*[a-h]\d/)
    if (matches) {
      return undefined
    }
    return PAWN
  }
  pieceType = pieceType.toLowerCase()
  if (pieceType === 'o') {
    return KING
  }
  return pieceType as PieceSymbol
}

// parses all of the decorators out of a SAN string
function strippedSan(move: string): string {
  return move.replace(/=/, '').replace(/[+#]?[?!]*$/, '')
}

export class Chess {
  private _game!: Game
  private _header: Record<string, string | null> = {}
  private _comments: Record<string, string> = {}
  private _suffixes: Record<string, Suffix> = {}

  constructor(fen = DEFAULT_POSITION, { skipValidation = false } = {}) {
    this._game = new Game()
    this._comments = {}
    this._suffixes = {}
    this.load(fen, { skipValidation })
  }

  private get _board() {
    return this._game._board
  }

  private get _turn() {
    return this._game._turn
  }

  private set _turn(value: Color) {
    this._game._turn = value
  }

  private get _kings() {
    return this._game._kings
  }

  private set _kings(value: Record<Color, number>) {
    this._game._kings = value
  }

  private get _halfMoves() {
    return this._game._halfMoves
  }

  private set _halfMoves(value: number) {
    this._game._halfMoves = value
  }

  private get _hash() {
    return this._game._hash
  }

  private set _hash(value: bigint) {
    this._game._hash = value
  }

  private get _positionCount() {
    return this._game._positionCount
  }

  private set _positionCount(value: Map<bigint, number>) {
    this._game._positionCount = value
  }

  private get _epSquare() {
    return this._game._epSquare
  }

  private set _epSquare(value: number) {
    this._game._epSquare = value
  }

  private get _castling() {
    return this._game._castling
  }

  private set _castling(value: Record<Color, number>) {
    this._game._castling = value
  }

  private get _history() {
    return this._game._history
  }

  private set _history(value: History[]) {
    this._game._history = value
  }

  private get _fenEpSquare() {
    return this._game._fenEpSquare
  }

  private set _fenEpSquare(value: number) {
    this._game._fenEpSquare = value
  }

  private get _moveNumber() {
    return this._game._moveNumber
  }

  private set _moveNumber(value: number) {
    this._game._moveNumber = value
  }

  clear({ preserveHeaders = false } = {}) {
    this._game._board = new Array<Piece>(128)
    this._kings = { w: EMPTY, b: EMPTY }
    this._turn = WHITE
    this._castling = { w: 0, b: 0 }
    this._epSquare = EMPTY
    this._fenEpSquare = EMPTY
    this._halfMoves = 0
    this._moveNumber = 1
    this._history = []
    this._comments = {}
    this._header = preserveHeaders ? this._header : { ...HEADER_TEMPLATE }
    this._hash = this._computeHash()
    this._positionCount = new Map<bigint, number>()

    /*
     * Delete the SetUp and FEN headers (if preserved), the board is empty and
     * these headers don't make sense in this state. They'll get added later
     * via .load() or .put()
     */
    this._header['SetUp'] = null
    this._header['FEN'] = null
  }

  load(fen: string, { skipValidation = false, preserveHeaders = false } = {}) {
    let tokens = fen.split(/\s+/)

    // append commonly omitted fen tokens
    if (tokens.length >= 2 && tokens.length < 6) {
      const adjustments = ['-', '-', '0', '1']
      fen = tokens.concat(adjustments.slice(-(6 - tokens.length))).join(' ')
    }

    tokens = fen.split(/\s+/)

    if (!skipValidation) {
      const { ok, error } = validateFen(fen)
      if (!ok) {
        throw new Error(error)
      }
    }

    const position = tokens[0]
    let square = 0

    this.clear({ preserveHeaders })

    for (let i = 0; i < position.length; i++) {
      const piece = position.charAt(i)

      if (piece === '/') {
        square += 8
      } else if (isDigit(piece)) {
        square += parseInt(piece, 10)
      } else {
        const color = piece < 'a' ? WHITE : BLACK
        this._put(
          { type: piece.toLowerCase() as PieceSymbol, color },
          algebraic(square),
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

    this._updateCastlingRights()

    this._epSquare = tokens[3] === '-' ? EMPTY : Ox88[tokens[3] as Square]
    this._fenEpSquare = this._epSquare
    this._halfMoves = parseInt(tokens[4], 10)
    this._moveNumber = parseInt(tokens[5], 10)

    this._hash = this._computeHash()
    this._updateSetup(fen)
    this._incPositionCount()
  }

  fen({
    forceEnpassantSquare = false,
  }: { forceEnpassantSquare?: boolean } = {}) {
    let empty = 0
    let fen = ''

    for (let i = Ox88.a8; i <= Ox88.h1; i++) {
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

        if (i !== Ox88.h1) {
          fen += '/'
        }

        empty = 0
        i += 8
      }
    }

    let castling = ''
    if (this._castling[WHITE] & BITS.KSIDE_CASTLE) {
      castling += 'K'
    }
    if (this._castling[WHITE] & BITS.QSIDE_CASTLE) {
      castling += 'Q'
    }
    if (this._castling[BLACK] & BITS.KSIDE_CASTLE) {
      castling += 'k'
    }
    if (this._castling[BLACK] & BITS.QSIDE_CASTLE) {
      castling += 'q'
    }

    // do we have an empty castling flag?
    castling = castling || '-'

    let epSquare = '-'
    /*
     * only print the ep square if en passant is a valid move (pawn is present
     * and ep capture is not pinned)
     */
    if (this._fenEpSquare !== EMPTY) {
      if (forceEnpassantSquare) {
        epSquare = algebraic(this._fenEpSquare)
      } else if (this._epSquare !== EMPTY) {
        const bigPawnSquare = this._epSquare + (this._turn === WHITE ? 16 : -16)
        const squares = [bigPawnSquare + 1, bigPawnSquare - 1]

        for (const square of squares) {
          // is the square off the board?
          if (square & 0x88) {
            continue
          }

          const color = this._turn

          // is there a pawn that can capture the epSquare?
          if (
            this._board[square]?.color === color &&
            this._board[square]?.type === PAWN
          ) {
            // if the pawn makes an ep capture, does it leave its king in check?
            this._makeMove({
              color,
              from: square,
              to: this._epSquare,
              piece: PAWN,
              captured: PAWN,
              flags: BITS.EP_CAPTURE,
            })
            const isLegal = !this._isKingAttacked(color)
            this._undoMove()

            // if ep is legal, break and set the ep square in the FEN output
            if (isLegal) {
              epSquare = algebraic(this._epSquare)
              break
            }
          }
        }
      }
    }

    return [
      fen,
      this._turn,
      castling,
      epSquare,
      this._halfMoves,
      this._moveNumber,
    ].join(' ')
  }

  private _pieceKey(i: number) {
    return this._game._pieceKey(i)
  }

  private _epKey() {
    return this._game._epKey()
  }

  private _castlingKey() {
    return this._game._castlingKey()
  }

  private _computeHash() {
    return this._game._computeHash()
  }

  /*
   * Called when the initial board setup is changed with put() or remove().
   * modifies the SetUp and FEN properties of the header object. If the FEN
   * is equal to the default position, the SetUp and FEN are deleted the setup
   * is only updated if history.length is zero, ie moves haven't been made.
   */
  private _updateSetup(fen: string) {
    if (this._history.length > 0) return

    if (fen !== DEFAULT_POSITION) {
      this._header['SetUp'] = '1'
      this._header['FEN'] = fen
    } else {
      this._header['SetUp'] = null
      this._header['FEN'] = null
    }
  }

  reset() {
    this.load(DEFAULT_POSITION)
    this._comments = {}
    this._suffixes = {}
  }

  get(square: Square): Piece | undefined {
    return this._game.get(square)
  }

  findPiece(piece: Piece): Square[] {
    return this._game.findPiece(piece)
  }

  put(
    { type, color }: { type: PieceSymbol; color: Color },
    square: Square,
  ): boolean {
    if (this._put({ type, color }, square)) {
      this._updateCastlingRights()
      this._updateEnPassantSquare()
      this._updateSetup(this.fen())
      return true
    }
    return false
  }

  private _set(sq: number, piece: Piece) {
    this._game._set(sq, piece)
  }

  private _put(
    { type, color }: { type: PieceSymbol; color: Color },
    square: Square,
  ): boolean {
    // check for piece
    if (SYMBOLS.indexOf(type.toLowerCase()) === -1) {
      return false
    }

    // check for valid square
    if (!(square in Ox88)) {
      return false
    }

    const sq = Ox88[square]

    // don't let the user place more than one king
    if (
      type == KING &&
      !(this._kings[color] == EMPTY || this._kings[color] == sq)
    ) {
      return false
    }

    const currentPieceOnSquare = this._board[sq]

    // if one of the kings will be replaced by the piece from args, set the `_kings` respective entry to `EMPTY`
    if (currentPieceOnSquare && currentPieceOnSquare.type === KING) {
      this._kings[currentPieceOnSquare.color] = EMPTY
    }

    this._set(sq, { type: type as PieceSymbol, color: color as Color })

    if (type === KING) {
      this._kings[color] = sq
    }

    return true
  }

  private _clear(sq: number) {
    this._game._clear(sq)
  }

  remove(square: Square): Piece | undefined {
    const piece = this.get(square)
    this._clear(Ox88[square])
    if (piece && piece.type === KING) {
      this._kings[piece.color] = EMPTY
    }

    this._updateCastlingRights()
    this._updateEnPassantSquare()
    this._updateSetup(this.fen())

    return piece
  }

  private _updateCastlingRights() {
    this._hash ^= this._castlingKey()

    const whiteKingInPlace =
      this._board[Ox88.e1]?.type === KING &&
      this._board[Ox88.e1]?.color === WHITE
    const blackKingInPlace =
      this._board[Ox88.e8]?.type === KING &&
      this._board[Ox88.e8]?.color === BLACK

    if (
      !whiteKingInPlace ||
      this._board[Ox88.a1]?.type !== ROOK ||
      this._board[Ox88.a1]?.color !== WHITE
    ) {
      this._castling.w &= ~BITS.QSIDE_CASTLE
    }

    if (
      !whiteKingInPlace ||
      this._board[Ox88.h1]?.type !== ROOK ||
      this._board[Ox88.h1]?.color !== WHITE
    ) {
      this._castling.w &= ~BITS.KSIDE_CASTLE
    }

    if (
      !blackKingInPlace ||
      this._board[Ox88.a8]?.type !== ROOK ||
      this._board[Ox88.a8]?.color !== BLACK
    ) {
      this._castling.b &= ~BITS.QSIDE_CASTLE
    }

    if (
      !blackKingInPlace ||
      this._board[Ox88.h8]?.type !== ROOK ||
      this._board[Ox88.h8]?.color !== BLACK
    ) {
      this._castling.b &= ~BITS.KSIDE_CASTLE
    }

    this._hash ^= this._castlingKey()
  }

  private _updateEnPassantSquare() {
    if (this._epSquare === EMPTY) {
      return
    }

    const startSquare = this._epSquare + (this._turn === WHITE ? -16 : 16)
    const currentSquare = this._epSquare + (this._turn === WHITE ? 16 : -16)
    const attackers = [currentSquare + 1, currentSquare - 1]

    if (
      this._board[startSquare] !== null ||
      this._board[this._epSquare] !== null ||
      this._board[currentSquare]?.color !== swapColor(this._turn) ||
      this._board[currentSquare]?.type !== PAWN
    ) {
      this._hash ^= this._epKey()
      this._epSquare = EMPTY
      return
    }

    const canCapture = (square: number) =>
      !(square & 0x88) &&
      this._board[square]?.color === this._turn &&
      this._board[square]?.type === PAWN

    if (!attackers.some(canCapture)) {
      this._hash ^= this._epKey()
      this._epSquare = EMPTY
    }
  }

  private _attacked(color: Color, square: number): boolean
  private _attacked(color: Color, square: number, verbose: false): boolean
  private _attacked(color: Color, square: number, verbose: true): Square[]
  private _attacked(color: Color, square: number, verbose?: boolean) {
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
    return this._game.attackers(square, attackedBy)
  }

  private _isKingAttacked(color: Color): boolean {
    return this._game._isKingAttacked(color)
  }

  hash(): string {
    return this._hash.toString(16)
  }

  isAttacked(square: Square, attackedBy: Color): boolean {
    return this._game.isAttacked(square, attackedBy)
  }

  isCheck(): boolean {
    return this._game.isCheck()
  }

  inCheck(): boolean {
    return this._game.inCheck()
  }

  isCheckmate(): boolean {
    return this._game.isCheckmate(this._moves())
  }

  isStalemate(): boolean {
    return this._game.isStalemate(this._moves())
  }

  isInsufficientMaterial(): boolean {
    return this._game.isInsufficientMaterial()
  }

  isThreefoldRepetition(): boolean {
    return this._game.isThreefoldRepetition()
  }

  isDrawByFiftyMoves(): boolean {
    return this._game.isDrawByFiftyMoves()
  }

  isDraw(): boolean {
    return this._game.isDraw(this._moves())
  }

  isGameOver(): boolean {
    return this._game.isGameOver(this._moves())
  }

  isPromotion({ from, to }: { from: Square; to: Square }): boolean {
    return this._moves({ square: from, piece: 'p' }).some(
      (move) => move.to === Ox88[to] && move.promotion,
    )
  }

  private _createMove(internal: InternalMove) {
    const san = this._moveToSan(internal, this._moves({ legal: true }))
    const before = this.fen()

    this._makeMove(internal)
    const after = this.fen()
    this._undoMove()

    return new Move(internal, san, before, after)
  }

  moves(): string[]
  moves({ square }: { square: Square }): string[]
  moves({ piece }: { piece: PieceSymbol }): string[]

  moves({ square, piece }: { square: Square; piece: PieceSymbol }): string[]

  moves({ verbose, square }: { verbose: true; square?: Square }): Move[]
  moves({ verbose, square }: { verbose: false; square?: Square }): string[]
  moves({
    verbose,
    square,
  }: {
    verbose?: boolean
    square?: Square
  }): string[] | Move[]

  moves({ verbose, piece }: { verbose: true; piece?: PieceSymbol }): Move[]
  moves({ verbose, piece }: { verbose: false; piece?: PieceSymbol }): string[]
  moves({
    verbose,
    piece,
  }: {
    verbose?: boolean
    piece?: PieceSymbol
  }): string[] | Move[]

  moves({
    verbose,
    square,
    piece,
  }: {
    verbose: true
    square?: Square
    piece?: PieceSymbol
  }): Move[]
  moves({
    verbose,
    square,
    piece,
  }: {
    verbose: false
    square?: Square
    piece?: PieceSymbol
  }): string[]
  moves({
    verbose,
    square,
    piece,
  }: {
    verbose?: boolean
    square?: Square
    piece?: PieceSymbol
  }): string[] | Move[]

  moves({ square, piece }: { square?: Square; piece?: PieceSymbol }): Move[]

  moves({
    verbose = false,
    square = undefined,
    piece = undefined,
  }: { verbose?: boolean; square?: Square; piece?: PieceSymbol } = {}) {
    const moves = this._moves({ square, piece })

    if (verbose) {
      return moves.map((move) => this._createMove(move))
    } else {
      return moves.map((move) => this._moveToSan(move, moves))
    }
  }

  private _moves({
    legal = true,
    piece = undefined,
    square = undefined,
  }: {
    legal?: boolean
    piece?: PieceSymbol
    square?: Square
  } = {}): InternalMove[] {
    // Get pseudo-legal moves from Game
    const moves = this._game._moves({ legal: false, piece, square })

    // If legal filtering not required, return pseudo-legal moves
    if (!legal || this._kings[this._turn] === -1) {
      return moves
    }

    // Filter out illegal moves
    const legalMoves = []
    const us = this._turn

    for (let i = 0, len = moves.length; i < len; i++) {
      this._makeMove(moves[i])
      if (!this._isKingAttacked(us)) {
        legalMoves.push(moves[i])
      }
      this._undoMove()
    }

    return legalMoves
  }

  move(
    move: string | { from: string; to: string; promotion?: string } | null,
    { strict = false }: { strict?: boolean } = {},
  ): Move {
    /*
     * The move function can be called with in the following parameters:
     *
     * .move('Nxb7')       <- argument is a case-sensitive SAN string
     *
     * .move({ from: 'h7', <- argument is a move object
     *         to :'h8',
     *         promotion: 'q' })
     *
     *
     * An optional strict argument may be supplied to tell chess.js to
     * strictly follow the SAN specification.
     */

    let moveObj = null

    if (typeof move === 'string') {
      moveObj = this._moveFromSan(move, strict)
    } else if (move === null) {
      moveObj = this._moveFromSan(SAN_NULLMOVE, strict)
    } else if (typeof move === 'object') {
      const moves = this._moves()

      // convert the pretty move object to an ugly move object
      for (let i = 0, len = moves.length; i < len; i++) {
        if (
          move.from === algebraic(moves[i].from) &&
          move.to === algebraic(moves[i].to) &&
          (!('promotion' in moves[i]) || move.promotion === moves[i].promotion)
        ) {
          moveObj = moves[i]
          break
        }
      }
    }

    // failed to find move
    if (!moveObj) {
      if (typeof move === 'string') {
        throw new Error(`Invalid move: ${move}`)
      } else {
        throw new Error(`Invalid move: ${JSON.stringify(move)}`)
      }
    }

    //disallow null moves when in check
    if (this.isCheck() && moveObj.flags & BITS.NULL_MOVE) {
      throw new Error('Null move not allowed when in check')
    }

    /*
     * need to make a copy of move because we can't generate SAN after the move
     * is made
     */
    const prettyMove = this._createMove(moveObj)

    this._makeMove(moveObj)
    this._incPositionCount()
    return prettyMove
  }

  private _push(move: InternalMove) {
    this._game._push(move)
  }

  private _movePiece(from: number, to: number) {
    this._game._movePiece(from, to)
  }

  private _makeMove(move: InternalMove) {
    this._game._makeMove(move)
  }

  undo(): Move | null {
    const hash = this._hash
    const move = this._undoMove()
    if (move) {
      const prettyMove = this._createMove(move)
      this._decPositionCount(hash)
      return prettyMove
    }
    return null
  }

  private _undoMove(): InternalMove | null {
    return this._game._undoMove()
  }

  pgn({
    newline = '\n',
    maxWidth = 0,
  }: { newline?: string; maxWidth?: number } = {}): string {
    /*
     * using the specification from http://www.chessclub.com/help/PGN-spec
     * example for html usage: .pgn({ max_width: 72, newline_char: "<br />" })
     */

    const result: string[] = []
    let headerExists = false

    /* add the PGN header information */
    for (const i in this._header) {
      /*
       * TODO: order of enumerated properties in header object is not
       * guaranteed, see ECMA-262 spec (section 12.6.4)
       *
       * By using HEADER_TEMPLATE, the order of tags should be preserved; we
       * do have to check for null placeholders, though, and omit them
       */
      const headerTag = this._header[i]
      if (headerTag) result.push(`[${i} "${this._header[i]}"]` + newline)
      headerExists = true
    }

    if (headerExists && this._history.length) {
      result.push(newline)
    }

    const appendComment = (moveString: string) => {
      const comment = this._comments[this.fen()]
      if (typeof comment !== 'undefined') {
        const delimiter = moveString.length > 0 ? ' ' : ''
        moveString = `${moveString}${delimiter}{${comment}}`
      }
      return moveString
    }

    // pop all of history onto reversed_history
    const reversedHistory = []
    while (this._history.length > 0) {
      reversedHistory.push(this._undoMove())
    }

    const moves = []
    let moveString = ''

    // special case of a commented starting position with no moves
    if (reversedHistory.length === 0) {
      moves.push(appendComment(''))
    }

    // build the list of moves.  a move_string looks like: "3. e3 e6"
    while (reversedHistory.length > 0) {
      moveString = appendComment(moveString)
      const move = reversedHistory.pop()

      // make TypeScript stop complaining about move being undefined
      if (!move) {
        break
      }

      // if the position started with black to move, start PGN with #. ...
      if (!this._history.length && move.color === 'b') {
        const prefix = `${this._moveNumber}. ...`
        // is there a comment preceding the first move?
        moveString = moveString ? `${moveString} ${prefix}` : prefix
      } else if (move.color === 'w') {
        // store the previous generated move_string if we have one
        if (moveString.length) {
          moves.push(moveString)
        }
        moveString = this._moveNumber + '.'
      }

      moveString =
        moveString + ' ' + this._moveToSan(move, this._moves({ legal: true }))
      this._makeMove(move)
    }

    // are there any other leftover moves?
    if (moveString.length) {
      moves.push(appendComment(moveString))
    }

    // is there a result? (there ALWAYS has to be a result according to spec; see Seven Tag Roster)
    moves.push(this._header.Result || '*')

    /*
     * history should be back to what it was before we started generating PGN,
     * so join together moves
     */
    if (maxWidth === 0) {
      return result.join('') + moves.join(' ')
    }

    // TODO (jah): huh?
    const strip = function () {
      if (result.length > 0 && result[result.length - 1] === ' ') {
        result.pop()
        return true
      }
      return false
    }

    // NB: this does not preserve comment whitespace.
    const wrapComment = function (width: number, move: string) {
      for (const token of move.split(' ')) {
        if (!token) {
          continue
        }
        if (width + token.length > maxWidth) {
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

    // wrap the PGN output at max_width
    let currentWidth = 0
    for (let i = 0; i < moves.length; i++) {
      if (currentWidth + moves[i].length > maxWidth) {
        if (moves[i].includes('{')) {
          currentWidth = wrapComment(currentWidth, moves[i])
          continue
        }
      }
      // if the current move will push past max_width
      if (currentWidth + moves[i].length > maxWidth && i !== 0) {
        // don't end the line with whitespace
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

  /**
   * @deprecated Use `setHeader` and `getHeaders` instead. This method will return null header tags (which is not what you want)
   */
  header(...args: string[]): Record<string, string | null> {
    for (let i = 0; i < args.length; i += 2) {
      if (typeof args[i] === 'string' && typeof args[i + 1] === 'string') {
        this._header[args[i]] = args[i + 1]
      }
    }
    return this._header
  }

  // TODO: value validation per spec
  setHeader(key: string, value: string): Record<string, string> {
    this._header[key] = value ?? SEVEN_TAG_ROSTER[key] ?? null
    return this.getHeaders()
  }

  removeHeader(key: string): boolean {
    if (key in this._header) {
      this._header[key] = SEVEN_TAG_ROSTER[key] || null
      return true
    }
    return false
  }

  // return only non-null headers (omit placemarker nulls)
  getHeaders(): Record<string, string> {
    const nonNullHeaders: Record<string, string> = {}
    for (const [key, value] of Object.entries(this._header)) {
      if (value !== null) {
        nonNullHeaders[key] = value
      }
    }
    return nonNullHeaders
  }

  loadPgn(
    pgn: string,
    {
      strict = false,
      newlineChar = '\r?\n',
    }: { strict?: boolean; newlineChar?: string } = {},
  ) {
    // If newlineChar is not the default, replace all instances with \n
    if (newlineChar !== '\r?\n') {
      pgn = pgn.replace(new RegExp(newlineChar, 'g'), '\n')
    }

    const parsedPgn = parse(pgn)

    // Put the board in the starting position
    this.reset()

    // parse PGN header
    const headers = parsedPgn.headers
    let fen = ''

    for (const key in headers) {
      // check to see user is including fen (possibly with wrong tag case)
      if (key.toLowerCase() === 'fen') {
        fen = headers[key]
      }

      this.header(key, headers[key])
    }

    /*
     * the permissive parser should attempt to load a fen tag, even if it's the
     * wrong case and doesn't include a corresponding [SetUp "1"] tag
     */
    if (!strict) {
      if (fen) {
        this.load(fen, { preserveHeaders: true })
      }
    } else {
      /*
       * strict parser - load the starting position indicated by [Setup '1']
       * and [FEN position]
       */
      if (headers['SetUp'] === '1') {
        if (!('FEN' in headers)) {
          throw new Error(
            'Invalid PGN: FEN tag must be supplied with SetUp tag',
          )
        }
        // don't clear the headers when loading
        this.load(headers['FEN'], { preserveHeaders: true })
      }
    }

    let node = parsedPgn.root

    while (node) {
      if (node.move) {
        const suffixAnnotation = node.suffixAnnotation

        const move = this._moveFromSan(node.move, strict)
        if (!move) {
          throw new Error(`Invalid move in PGN: ${node.move}`)
        } else {
          this._makeMove(move)
          this._incPositionCount()

          if (suffixAnnotation) {
            this._suffixes[this.fen()] = suffixAnnotation as Suffix
          }
        }
      }

      if (node.comment !== undefined) {
        this._comments[this.fen()] = node.comment
      }

      node = node.variations[0]
    }

    /*
     * Per section 8.2.6 of the PGN spec, the Result tag pair must match match
     * the termination marker. Only do this when headers are present, but the
     * result tag is missing
     */

    const result = parsedPgn.result
    if (
      result &&
      Object.keys(this._header).length &&
      this._header['Result'] !== result
    ) {
      this.setHeader('Result', result)
    }
  }

  /*
   * Convert a move from 0x88 coordinates to Standard Algebraic Notation
   * (SAN)
   *
   * @param {boolean} strict Use the strict SAN parser. It will throw errors
   * on overly disambiguated moves (see below):
   *
   * r1bqkbnr/ppp2ppp/2n5/1B1pP3/4P3/8/PPPP2PP/RNBQK1NR b KQkq - 2 4
   * 4. ... Nge7 is overly disambiguated because the knight on c6 is pinned
   * 4. ... Ne7 is technically the valid SAN
   */

  private _moveToSan(move: InternalMove, moves: InternalMove[]): string {
    let output = ''

    if (move.flags & BITS.KSIDE_CASTLE) {
      output = 'O-O'
    } else if (move.flags & BITS.QSIDE_CASTLE) {
      output = 'O-O-O'
    } else if (move.flags & BITS.NULL_MOVE) {
      return SAN_NULLMOVE
    } else {
      if (move.piece !== PAWN) {
        const disambiguator = getDisambiguator(move, moves)
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

    this._makeMove(move)
    if (this.isCheck()) {
      if (this.isCheckmate()) {
        output += '#'
      } else {
        output += '+'
      }
    }
    this._undoMove()

    return output
  }

  // convert a move from Standard Algebraic Notation (SAN) to 0x88 coordinates
  private _moveFromSan(move: string, strict = false): InternalMove | null {
    // strip off any move decorations: e.g Nf3+?! becomes Nf3
    let cleanMove = strippedSan(move)

    if (!strict) {
      if (cleanMove === '0-0') {
        cleanMove = 'O-O'
      } else if (cleanMove === '0-0-0') {
        cleanMove = 'O-O-O'
      }
    }

    //first implementation of null with a dummy move (black king moves from a8 to a8), maybe this can be implemented better
    if (cleanMove == SAN_NULLMOVE) {
      const res: InternalMove = {
        color: this._turn,
        from: 0,
        to: 0,
        piece: 'k',
        flags: BITS.NULL_MOVE,
      }
      return res
    }

    let pieceType = inferPieceType(cleanMove)
    let moves = this._moves({ legal: true, piece: pieceType })

    // strict parser
    for (let i = 0, len = moves.length; i < len; i++) {
      if (cleanMove === strippedSan(this._moveToSan(moves[i], moves))) {
        return moves[i]
      }
    }

    // the strict parser failed
    if (strict) {
      return null
    }

    let piece = undefined
    let matches = undefined
    let from = undefined
    let to = undefined
    let promotion = undefined

    /*
     * The default permissive (non-strict) parser allows the user to parse
     * non-standard chess notations. This parser is only run after the strict
     * Standard Algebraic Notation (SAN) parser has failed.
     *
     * When running the permissive parser, we'll run a regex to grab the piece, the
     * to/from square, and an optional promotion piece. This regex will
     * parse common non-standard notation like: Pe2-e4, Rc1c4, Qf3xf7,
     * f7f8q, b1c3
     *
     * NOTE: Some positions and moves may be ambiguous when using the permissive
     * parser. For example, in this position: 6k1/8/8/B7/8/8/8/BN4K1 w - - 0 1,
     * the move b1c3 may be interpreted as Nc3 or B1c3 (a disambiguated bishop
     * move). In these cases, the permissive parser will default to the most
     * basic interpretation (which is b1c3 parsing to Nc3).
     */

    let overlyDisambiguated = false

    matches = cleanMove.match(
      /([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/,
      //     piece         from              to       promotion
    )

    if (matches) {
      piece = matches[1]
      from = matches[2] as Square
      to = matches[3] as Square
      promotion = matches[4]

      if (from.length == 1) {
        overlyDisambiguated = true
      }
    } else {
      /*
       * The [a-h]?[1-8]? portion of the regex below handles moves that may be
       * overly disambiguated (e.g. Nge7 is unnecessary and non-standard when
       * there is one legal knight move to e7). In this case, the value of
       * 'from' variable will be a rank or file, not a square.
       */

      matches = cleanMove.match(
        /([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/,
      )

      if (matches) {
        piece = matches[1]
        from = matches[2] as Square
        to = matches[3] as Square
        promotion = matches[4]

        if (from.length == 1) {
          overlyDisambiguated = true
        }
      }
    }

    pieceType = inferPieceType(cleanMove)
    moves = this._moves({
      legal: true,
      piece: piece ? (piece as PieceSymbol) : pieceType,
    })

    if (!to) {
      return null
    }

    for (let i = 0, len = moves.length; i < len; i++) {
      if (!from) {
        // if there is no from square, it could be just 'x' missing from a capture
        if (
          cleanMove ===
          strippedSan(this._moveToSan(moves[i], moves)).replace('x', '')
        ) {
          return moves[i]
        }
        // hand-compare move properties with the results from our permissive regex
      } else if (
        (!piece || piece.toLowerCase() == moves[i].piece) &&
        Ox88[from] == moves[i].from &&
        Ox88[to] == moves[i].to &&
        (!promotion || promotion.toLowerCase() == moves[i].promotion)
      ) {
        return moves[i]
      } else if (overlyDisambiguated) {
        /*
         * SPECIAL CASE: we parsed a move string that may have an unneeded
         * rank/file disambiguator (e.g. Nge7).  The 'from' variable will
         */

        const square = algebraic(moves[i].from)
        if (
          (!piece || piece.toLowerCase() == moves[i].piece) &&
          Ox88[to] == moves[i].to &&
          (from == square[0] || from == square[1]) &&
          (!promotion || promotion.toLowerCase() == moves[i].promotion)
        ) {
          return moves[i]
        }
      }
    }

    return null
  }

  ascii(): string {
    return this._game.ascii()
  }

  perft(depth: number): number {
    const moves = this._moves({ legal: false })
    let nodes = 0
    const color = this._turn

    for (let i = 0, len = moves.length; i < len; i++) {
      this._makeMove(moves[i])
      if (!this._isKingAttacked(color)) {
        if (depth - 1 > 0) {
          nodes += this.perft(depth - 1)
        } else {
          nodes++
        }
      }
      this._undoMove()
    }

    return nodes
  }

  setTurn(color: Color): boolean {
    if (this._turn == color) {
      return false
    }

    this.move('--')
    return true
  }

  turn(): Color {
    return this._turn
  }

  board(): ({ square: Square; type: PieceSymbol; color: Color } | null)[][] {
    return this._game.board()
  }

  squareColor(square: Square): 'light' | 'dark' | null {
    if (square in Ox88) {
      const sq = Ox88[square]
      return (rank(sq) + file(sq)) % 2 === 0 ? 'light' : 'dark'
    }

    return null
  }

  history(): string[]
  history({ verbose }: { verbose: true }): Move[]
  history({ verbose }: { verbose: false }): string[]
  history({ verbose }: { verbose: boolean }): string[] | Move[]
  history({ verbose = false }: { verbose?: boolean } = {}) {
    const reversedHistory = []
    const moveHistory = []

    while (this._history.length > 0) {
      reversedHistory.push(this._undoMove())
    }

    while (true) {
      const move = reversedHistory.pop()
      if (!move) {
        break
      }

      if (verbose) {
        moveHistory.push(this._createMove(move))
      } else {
        moveHistory.push(this._moveToSan(move, this._moves()))
      }
      this._makeMove(move)
    }

    return moveHistory
  }

  /*
   * Keeps track of position occurrence counts for the purpose of repetition
   * checking. Old positions are removed from the map if their counts are reduced to 0.
   */
  private _getPositionCount(hash: bigint): number {
    return this._positionCount.get(hash) ?? 0
  }

  private _incPositionCount() {
    this._positionCount.set(
      this._hash,
      (this._positionCount.get(this._hash) ?? 0) + 1,
    )
  }

  private _decPositionCount(hash: bigint) {
    const currentCount = this._positionCount.get(hash) ?? 0

    if (currentCount === 1) {
      this._positionCount.delete(hash)
    } else {
      this._positionCount.set(hash, currentCount - 1)
    }
  }

  private _pruneComments() {
    const reversedHistory = []
    const currentComments: Record<string, string> = {}

    const copyComment = (fen: string) => {
      if (fen in this._comments) {
        currentComments[fen] = this._comments[fen]
      }
    }

    while (this._history.length > 0) {
      reversedHistory.push(this._undoMove())
    }

    copyComment(this.fen())

    while (true) {
      const move = reversedHistory.pop()
      if (!move) {
        break
      }
      this._makeMove(move)
      copyComment(this.fen())
    }
    this._comments = currentComments
  }

  getComment(): string {
    return this._comments[this.fen()]
  }

  setComment(comment: string) {
    this._comments[this.fen()] = comment.replace('{', '[').replace('}', ']')
  }

  /**
   * @deprecated Renamed to `removeComment` for consistency
   */
  deleteComment(): string {
    return this.removeComment()
  }

  removeComment(): string {
    const comment = this._comments[this.fen()]
    delete this._comments[this.fen()]
    return comment
  }

  getComments(): {
    fen: string
    comment?: string
    suffixAnnotation?: string
  }[] {
    this._pruneComments()

    const allFenKeys = new Set<string>()
    Object.keys(this._comments).forEach((fen) => allFenKeys.add(fen))
    Object.keys(this._suffixes).forEach((fen) => allFenKeys.add(fen))

    const result: {
      fen: string
      comment?: string
      suffixAnnotation?: string
    }[] = []

    for (const fen of allFenKeys) {
      const commentContent = this._comments[fen]
      const suffixAnnotation = this._suffixes[fen]

      const entry: {
        fen: string
        comment?: string
        suffixAnnotation?: string
      } = {
        fen: fen,
      }

      if (commentContent !== undefined) {
        entry.comment = commentContent
      }

      if (suffixAnnotation !== undefined) {
        entry.suffixAnnotation = suffixAnnotation
      }

      result.push(entry)
    }

    return result
  }

  /**
   * Get the suffix annotation for the given position (or current one).
   */
  public getSuffixAnnotation(fen?: string): Suffix | undefined {
    const key = fen ?? this.fen()
    return this._suffixes[key]
  }

  /**
   * Set or overwrite the suffix annotation for the given position (or current).
   * Throws if the suffix isn't one of the allowed SUFFIX_LIST values.
   */
  public setSuffixAnnotation(suffix: Suffix, fen?: string): void {
    if (!SUFFIX_LIST.includes(suffix)) {
      throw new Error(`Invalid suffix: ${suffix}`)
    }
    this._suffixes[fen || this.fen()] = suffix
  }

  /**
   * Remove the suffix annotation for the given position (or current).
   */

  public removeSuffixAnnotation(fen?: string): Suffix | undefined {
    const key = fen || this.fen()
    const old = this._suffixes[key]
    delete this._suffixes[key]
    return old
  }

  /**
   * @deprecated Renamed to `removeComments` for consistency
   */
  deleteComments(): { fen: string; comment: string }[] {
    return this.removeComments()
  }

  removeComments(): { fen: string; comment: string }[] {
    this._pruneComments()
    return Object.keys(this._comments).map((fen) => {
      const comment = this._comments[fen]
      delete this._comments[fen]
      return { fen: fen, comment: comment }
    })
  }

  setCastlingRights(
    color: Color,
    rights: Partial<Record<typeof KING | typeof QUEEN, boolean>>,
  ): boolean {
    for (const side of [KING, QUEEN] as const) {
      if (rights[side] !== undefined) {
        if (rights[side]) {
          this._castling[color] |= SIDES[side]
        } else {
          this._castling[color] &= ~SIDES[side]
        }
      }
    }

    this._updateCastlingRights()
    const result = this.getCastlingRights(color)

    return (
      (rights[KING] === undefined || rights[KING] === result[KING]) &&
      (rights[QUEEN] === undefined || rights[QUEEN] === result[QUEEN])
    )
  }

  getCastlingRights(color: Color): { [KING]: boolean; [QUEEN]: boolean } {
    return {
      [KING]: (this._castling[color] & SIDES[KING]) !== 0,
      [QUEEN]: (this._castling[color] & SIDES[QUEEN]) !== 0,
    }
  }

  moveNumber(): number {
    return this._moveNumber
  }
}
