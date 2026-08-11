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

import { parse } from './pgn'

const MASK64 = 0xffffffffffffffffn

function rotl(x: bigint, k: bigint): bigint {
  return ((x << k) | (x >> (64n - k))) & 0xffffffffffffffffn
}

function wrappingMul(x: bigint, y: bigint) {
  return (x * y) & MASK64
}

// xoroshiro128**
export function xoroshiro128(state: bigint) {
  return function () {
    let s0 = BigInt(state & MASK64)
    let s1 = BigInt((state >> 64n) & MASK64)

    const result = wrappingMul(rotl(wrappingMul(s0, 5n), 7n), 9n)

    s1 ^= s0
    s0 = (rotl(s0, 24n) ^ s1 ^ (s1 << 16n)) & MASK64
    s1 = rotl(s1, 37n)

    state = (s1 << 64n) | s0

    return result
  }
}

const rand = xoroshiro128(0xa187eb39cdcaed8f31c4b365b102e01en)

const PIECE_KEYS = Array.from({ length: 2 }, () =>
  Array.from({ length: 6 }, () => Array.from({ length: 128 }, () => rand())),
)

const EP_KEYS = Array.from({ length: 8 }, () => rand())

const CASTLING_KEYS = Array.from({ length: 16 }, () => rand())

const SIDE_KEY = rand()

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

export const SUFFIX_LIST = ['!', '?', '!!', '!?', '?!', '??'] as const

export type Suffix = (typeof SUFFIX_LIST)[number]

// NAG (Numeric Annotation Glyph) to symbol mapping
/* eslint-disable @typescript-eslint/naming-convention */
export const NAG_TO_SYMBOL = {
  7: '□', // Only move
  22: '⨀', // Zugzwang
  10: '=', // Equal position
  13: '∞', // Unclear position
  14: '⩲', // White is slightly better
  15: '⩱', // Black is slightly better
  16: '±', // White is better
  17: '∓', // Black is better
  18: '+−', // White is winning
  19: '-+', // Black is winning
  146: 'N', // Novelty
  32: '↑↑', // Development
  36: '↑', // Initiative
  40: '→', // Attack
  132: '⇆', // Counterplay
  138: '⊕', // Time trouble
  44: '=∞', // With compensation
  140: '∆', // With the idea
} as const
/* eslint-enable @typescript-eslint/naming-convention */

export type NAG = number

/**
 * Convert a NAG (Numeric Annotation Glyph) to its text symbol representation.
 * Returns undefined if the NAG has no corresponding symbol.
 */
export function nagToGlyph(nag: NAG): string | undefined {
  return NAG_TO_SYMBOL[nag as keyof typeof NAG_TO_SYMBOL]
}

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
  // Chess960 specific: save rook positions for castling undo
  rookFrom?: number
  rookTo?: number
}

interface History {
  move: InternalMove
  kings: Record<Color, number>
  turn: Color
  castling: Record<Color, number>
  epSquare: number
  fenEpSquare: number
  halfMoves: number
  moveNumber: number
}

export class Move {
  color: Color
  from: Square
  to: Square
  piece: PieceSymbol
  captured?: PieceSymbol
  promotion?: PieceSymbol

  /**
   * @deprecated This field is deprecated and will be removed in version 2.0.0.
   * Please use move descriptor functions instead: `isCapture`, `isPromotion`,
   * `isEnPassant`, `isKingsideCastle`, `isQueensideCastle`, `isCastle`,
   * `isBigPawn`, and `isCheck`
   */
  flags: string

  san: string
  lan: string
  before: string
  after: string

  constructor(
    internal: InternalMove,
    san: string,
    before: string,
    after: string,
  ) {
    const { color, piece, from, to, flags, captured, promotion } = internal

    const fromAlgebraic = algebraic(from)
    const toAlgebraic = algebraic(to)

    this.color = color
    this.piece = piece
    this.from = fromAlgebraic
    this.to = toAlgebraic

    this.san = san
    this.lan = fromAlgebraic + toAlgebraic
    this.before = before
    this.after = after

    // Build the text representation of the move flags
    this.flags = ''
    for (const flag in BITS) {
      if (BITS[flag] & flags) {
        this.flags += FLAGS[flag]
      }
    }

    if (captured) {
      this.captured = captured
    }

    if (promotion) {
      this.promotion = promotion
      this.lan += promotion
    }
  }

  isCapture() {
    return this.flags.indexOf(FLAGS['CAPTURE']) > -1
  }

  isPromotion() {
    return this.flags.indexOf(FLAGS['PROMOTION']) > -1
  }

  isEnPassant() {
    return this.flags.indexOf(FLAGS['EP_CAPTURE']) > -1
  }

  isKingsideCastle() {
    return this.flags.indexOf(FLAGS['KSIDE_CASTLE']) > -1
  }

  isQueensideCastle() {
    return this.flags.indexOf(FLAGS['QSIDE_CASTLE']) > -1
  }

  isBigPawn() {
    return this.flags.indexOf(FLAGS['BIG_PAWN']) > -1
  }

  isNullMove() {
    return this.flags.indexOf(FLAGS['NULL_MOVE']) > -1
  }

  isCheck() {
    return this.san.includes('+') || this.san.includes('#')
  }
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
  NULL_MOVE: '-',
}

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

const BITS: Record<string, number> = {
  NORMAL: 1,
  CAPTURE: 2,
  BIG_PAWN: 4,
  EP_CAPTURE: 8,
  PROMOTION: 16,
  KSIDE_CASTLE: 32,
  QSIDE_CASTLE: 64,
  NULL_MOVE: 128,
}

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
// eslint-disable-next-line
const Ox88: Record<Square, number> = {
  a8:   0, b8:   1, c8:   2, d8:   3, e8:   4, f8:   5, g8:   6, h8:   7,
  a7:  16, b7:  17, c7:  18, d7:  19, e7:  20, f7:  21, g7:  22, h7:  23,
  a6:  32, b6:  33, c6:  34, d6:  35, e6:  36, f6:  37, g6:  38, h6:  39,
  a5:  48, b5:  49, c5:  50, d5:  51, e5:  52, f5:  53, g5:  54, h5:  55,
  a4:  64, b4:  65, c4:  66, d4:  67, e4:  68, f4:  69, g4:  70, h4:  71,
  a3:  80, b3:  81, c3:  82, d3:  83, e3:  84, f3:  85, g3:  86, h3:  87,
  a2:  96, b2:  97, c2:  98, d2:  99, e2: 100, f2: 101, g2: 102, h2: 103,
  a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119
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

const PIECE_MASKS = { p: 0x1, n: 0x2, b: 0x4, r: 0x8, q: 0x10, k: 0x20 }

const SYMBOLS = 'pnbrqkPNBRQK'

const PROMOTIONS: PieceSymbol[] = [KNIGHT, BISHOP, ROOK, QUEEN]

const RANK_1 = 7
const RANK_2 = 6
/*
 * const RANK_3 = 5
 * const RANK_4 = 4
 * const RANK_5 = 3
 * const RANK_6 = 2
 */
const RANK_7 = 1
const RANK_8 = 0

const SIDES = {
  [KING]: BITS.KSIDE_CASTLE,
  [QUEEN]: BITS.QSIDE_CASTLE,
}

const ROOKS = {
  w: [
    { square: Ox88.a1, flag: BITS.QSIDE_CASTLE },
    { square: Ox88.h1, flag: BITS.KSIDE_CASTLE },
  ],
  b: [
    { square: Ox88.a8, flag: BITS.QSIDE_CASTLE },
    { square: Ox88.h8, flag: BITS.KSIDE_CASTLE },
  ],
}

const SECOND_RANK = { b: RANK_7, w: RANK_2 }

const SAN_NULLMOVE = '--'

// Extracts the zero-based rank of an 0x88 square.
function rank(square: number): number {
  return square >> 4
}

// Extracts the zero-based file of an 0x88 square.
function file(square: number): number {
  return square & 0xf
}

function isDigit(c: string): boolean {
  return '0123456789'.indexOf(c) !== -1
}

// Converts a 0x88 square to algebraic notation.
function algebraic(square: number): Square {
  const f = file(square)
  const r = rank(square)
  return ('abcdefgh'.substring(f, f + 1) +
    '87654321'.substring(r, r + 1)) as Square
}

function swapColor(color: Color): Color {
  return color === WHITE ? BLACK : WHITE
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

function addMove(
  moves: InternalMove[],
  color: Color,
  from: number,
  to: number,
  piece: PieceSymbol,
  captured: PieceSymbol | undefined = undefined,
  flags: number = BITS.NORMAL,
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
      flags,
    })
  }
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
  protected _board = new Array<Piece>(128)
  protected _turn: Color = WHITE
  private _header: Record<string, string | null> = {}
  protected _kings: Record<Color, number> = { w: EMPTY, b: EMPTY }
  protected _epSquare = -1
  protected _fenEpSquare = -1
  protected _halfMoves = 0
  protected _moveNumber = 0
  protected _history: History[] = []
  private _comments: Record<string, string> = {}
  private _suffixes: Record<string, Suffix> = {}
  private _nags: Record<string, NAG[]> = {}
  protected _castling: Record<Color, number> = { w: 0, b: 0 }


  protected _hash = 0n

  // tracks number of times a position has been seen for repetition checking
  private _positionCount = new Map<bigint, number>()

  constructor(fen = DEFAULT_POSITION, { skipValidation = false } = {}) {
    this._comments = {}
    this._suffixes = {}
    this._nags = {}
    this.load(fen, { skipValidation })
  }

  clear({ preserveHeaders = false } = {}) {
    this._board = new Array<Piece>(128)
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

  protected _pieceKey(i: number) {
    if (!this._board[i]) {
      return 0n
    }

    const { color, type } = this._board[i]

    const colorIndex = {
      w: 0,
      b: 1,
    }[color]

    const typeIndex = {
      p: 0,
      n: 1,
      b: 2,
      r: 3,
      q: 4,
      k: 5,
    }[type]

    return PIECE_KEYS[colorIndex][typeIndex][i]
  }

  protected _epKey() {
    return this._epSquare === EMPTY ? 0n : EP_KEYS[this._epSquare & 7]
  }

  protected _castlingKey() {
    const index = (this._castling.w >> 5) | (this._castling.b >> 3)
    return CASTLING_KEYS[index]
  }

  private _computeHash() {
    let hash = 0n

    for (let i = Ox88.a8; i <= Ox88.h1; i++) {
      // did we run off the end of the board
      if (i & 0x88) {
        i += 7
        continue
      }

      if (this._board[i]) {
        hash ^= this._pieceKey(i)
      }
    }

    hash ^= this._epKey()
    hash ^= this._castlingKey()

    if (this._turn === 'b') {
      hash ^= SIDE_KEY
    }

    return hash
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
    this._nags = {}
  }

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

  protected _set(sq: number, piece: Piece) {
    this._hash ^= this._pieceKey(sq)
    this._board[sq] = piece
    this._hash ^= this._pieceKey(sq)
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

  protected _clear(sq: number) {
    this._hash ^= this._pieceKey(sq)
    delete this._board[sq]
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

  protected _updateCastlingRights() {
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

  protected _attacked(color: Color, square: number): boolean
  protected _attacked(color: Color, square: number, verbose: false): boolean
  protected _attacked(color: Color, square: number, verbose: true): Square[]
  protected _attacked(color: Color, square: number, verbose?: boolean) {
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

  private _isKingAttacked(color: Color): boolean {
    const square = this._kings[color]
    return square === -1 ? false : this._attacked(swapColor(color), square)
  }

  hash(): string {
    return this._hash.toString(16)
  }

  isAttacked(square: Square, attackedBy: Color): boolean {
    return this._attacked(attackedBy, Ox88[square])
  }

  isCheck(): boolean {
    return this._isKingAttacked(this._turn)
  }

  inCheck(): boolean {
    return this.isCheck()
  }

  isCheckmate(): boolean {
    return this.isCheck() && this._moves().length === 0
  }

  isStalemate(): boolean {
    return !this.isCheck() && this._moves().length === 0
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

  isDraw(): boolean {
    return (
      this.isDrawByFiftyMoves() ||
      this.isStalemate() ||
      this.isInsufficientMaterial() ||
      this.isThreefoldRepetition()
    )
  }

  isGameOver(): boolean {
    return this.isCheckmate() || this.isDraw()
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

  protected _moves({
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

    // filter out illegal moves
    const legalMoves = []

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

  protected _push(move: InternalMove) {
    this._history.push({
      move,
      kings: { b: this._kings.b, w: this._kings.w },
      turn: this._turn,
      castling: { b: this._castling.b, w: this._castling.w },
      epSquare: this._epSquare,
      fenEpSquare: this._fenEpSquare,
      halfMoves: this._halfMoves,
      moveNumber: this._moveNumber,
    })
  }

  protected _movePiece(from: number, to: number) {
    this._hash ^= this._pieceKey(from)

    this._board[to] = this._board[from]
    delete this._board[from]

    this._hash ^= this._pieceKey(to)
  }

  protected _makeMove(move: InternalMove) {
    const us = this._turn
    const them = swapColor(us)
    this._push(move)

    if (move.flags & BITS.NULL_MOVE) {
      if (us === BLACK) {
        this._moveNumber++
      }
      this._halfMoves++
      this._turn = them

      this._epSquare = EMPTY

      return
    }

    this._hash ^= this._epKey()
    this._hash ^= this._castlingKey()

    if (move.captured) {
      this._hash ^= this._pieceKey(move.to)
    }

    this._movePiece(move.from, move.to)

    // if ep capture, remove the captured pawn
    if (move.flags & BITS.EP_CAPTURE) {
      if (this._turn === BLACK) {
        this._clear(move.to - 16)
      } else {
        this._clear(move.to + 16)
      }
    }

    // if pawn promotion, replace with new piece
    if (move.promotion) {
      this._clear(move.to)
      this._set(move.to, { type: move.promotion, color: us })
    }

    // if we moved the king
    if (this._board[move.to].type === KING) {
      this._kings[us] = move.to

      // if we castled, move the rook next to the king
      if (move.flags & BITS.KSIDE_CASTLE) {
        const castlingTo = move.to - 1
        const castlingFrom = move.to + 1
        this._movePiece(castlingFrom, castlingTo)
      } else if (move.flags & BITS.QSIDE_CASTLE) {
        const castlingTo = move.to + 1
        const castlingFrom = move.to - 2
        this._movePiece(castlingFrom, castlingTo)
      }

      // turn off castling
      this._castling[us] = 0
    }

    // turn off castling if we move a rook
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

    // turn off castling if we capture a rook
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

    this._hash ^= this._castlingKey()

    // if big pawn move, update the en passant square
    if (move.flags & BITS.BIG_PAWN) {
      let epSquare

      if (us === BLACK) {
        epSquare = move.to - 16
      } else {
        epSquare = move.to + 16
      }

      this._fenEpSquare = epSquare

      if (
        (!((move.to - 1) & 0x88) &&
          this._board[move.to - 1]?.type === PAWN &&
          this._board[move.to - 1]?.color === them) ||
        (!((move.to + 1) & 0x88) &&
          this._board[move.to + 1]?.type === PAWN &&
          this._board[move.to + 1]?.color === them)
      ) {
        this._epSquare = epSquare
        this._hash ^= this._epKey()
      } else {
        this._epSquare = EMPTY
      }
    } else {
      this._epSquare = EMPTY
      this._fenEpSquare = EMPTY
    }

    // reset the 50 move counter if a pawn is moved or a piece is captured
    if (move.piece === PAWN) {
      this._halfMoves = 0
    } else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
      this._halfMoves = 0
    } else {
      this._halfMoves++
    }

    if (us === BLACK) {
      this._moveNumber++
    }

    this._turn = them
    this._hash ^= SIDE_KEY
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

  protected _undoMove(): InternalMove | null {
    const old = this._history.pop()
    if (old === undefined) {
      return null
    }

    this._hash ^= this._epKey()
    this._hash ^= this._castlingKey()

    const move = old.move

    this._kings = old.kings
    this._turn = old.turn
    this._castling = old.castling
    this._epSquare = old.epSquare
    this._fenEpSquare = old.fenEpSquare
    this._halfMoves = old.halfMoves
    this._moveNumber = old.moveNumber

    this._hash ^= this._epKey()
    this._hash ^= this._castlingKey()
    this._hash ^= SIDE_KEY

    const us = this._turn
    const them = swapColor(us)

    if (move.flags & BITS.NULL_MOVE) {
      return move
    }

    this._movePiece(move.to, move.from)

    // to undo any promotions
    if (move.piece) {
      this._clear(move.from)
      this._set(move.from, { type: move.piece, color: us })
    }

    if (move.captured) {
      if (move.flags & BITS.EP_CAPTURE) {
        // en passant capture
        let index: number
        if (us === BLACK) {
          index = move.to - 16
        } else {
          index = move.to + 16
        }
        this._set(index, { type: PAWN, color: them })
      } else {
        // regular capture
        this._set(move.to, { type: move.captured, color: them })
      }
    }

    if (move.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
      let castlingTo: number, castlingFrom: number
      if (move.flags & BITS.KSIDE_CASTLE) {
        castlingTo = move.to + 1
        castlingFrom = move.to - 1
      } else {
        castlingTo = move.to - 2
        castlingFrom = move.to + 1
      }
      this._movePiece(castlingFrom, castlingTo)
    }

    return move
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

          // Store NAGs
          if (node.nags && node.nags.length > 0) {
            this._nags[this.fen()] = node.nags
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
    nags: NAG[]
  }[] {
    this._pruneComments()

    const allFenKeys = new Set<string>()
    Object.keys(this._comments).forEach((fen) => allFenKeys.add(fen))
    Object.keys(this._suffixes).forEach((fen) => allFenKeys.add(fen))
    Object.keys(this._nags).forEach((fen) => allFenKeys.add(fen))

    const result: {
      fen: string
      comment?: string
      suffixAnnotation?: string
      nags: NAG[]
    }[] = []

    for (const fen of allFenKeys) {
      const commentContent = this._comments[fen]
      const suffixAnnotation = this._suffixes[fen]
      const nags = this._nags[fen]

      const entry: {
        fen: string
        comment?: string
        suffixAnnotation?: string
        nags: NAG[]
      } = {
        fen: fen,
        nags: nags ?? [],
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
   * Get the NAGs for the given position (or current one).
   */
  public getNags(fen?: string): NAG[] {
    const key = fen ?? this.fen()
    return this._nags[key] ?? []
  }

  /**
   * Add a NAG to the given position (or current).
   * Supports multiple NAGs per position.
   */
  public addNag(nag: NAG, fen?: string): void {
    const key = fen || this.fen()
    if (!this._nags[key]) {
      this._nags[key] = []
    }
    // Avoid duplicates
    if (!this._nags[key].includes(nag)) {
      this._nags[key].push(nag)
    }
  }

  /**
   * Set NAGs for the given position (or current), replacing any existing NAGs.
   */
  public setNags(nags: NAG[], fen?: string): void {
    const key = fen || this.fen()
    this._nags[key] = [...nags] // Create a copy
  }

  /**
   * Remove all NAGs for the given position (or current).
   * Returns the removed NAGs.
   */
  public removeNags(fen?: string): NAG[] {
    const key = fen || this.fen()
    const old = this._nags[key] ?? []
    delete this._nags[key]
    return old
  }

  /**
   * Remove a specific NAG from the given position (or current).
   * Returns true if the NAG was found and removed.
   */
  public removeNag(nag: NAG, fen?: string): boolean {
    const key = fen || this.fen()
    const nags = this._nags[key]
    if (!nags) return false

    const index = nags.indexOf(nag)
    if (index === -1) return false

    nags.splice(index, 1)
    // Clean up empty arrays
    if (nags.length === 0) {
      delete this._nags[key]
    }
    return true
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

/**
 * Chess960 (Fischer Random Chess) Implementation
 * 
 * Extends the base Chess class to support all 960 possible starting positions
 */
export class Chess960 extends Chess {
  private _rooks: Record<Color, Array<{ square: number; flag: number }>> = {
    w: [],
    b: [],
  }

  /**
   * Create a new Chess960 game
   * 
   * @param position - Position number (0-959), X-FEN string, or undefined for random
   * @param options - Configuration options
   * 
   * @example
   * // Create position 518 (standard chess starting position)
   * const chess = new Chess960(518)
   * 
   * @example
   * // Create from X-FEN string
   * const chess = new Chess960('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w HAha - 0 1')
   * 
   * @example
   * // Create random Chess960 position
   * const chess = new Chess960()
   */
  constructor(
    position?: number | string | { skipValidation?: boolean; random?: boolean },
    options?: { skipValidation?: boolean; random?: boolean }
  ) {
    let fen: string
    let opts = options || {}

    // Handle case where first argument is an options object
    if (typeof position === 'object' && position !== null) {
      opts = position
      position = undefined
    }

    if (position === undefined) {
      if (opts.random) {
        // Generate random position
        const randomPosition = Math.floor(Math.random() * 960)
        fen = Chess960.generatePositionFen(randomPosition)
      } else {
        // Default to standard chess position (518)
        fen = Chess960.generatePositionFen(518)
      }
    } else if (typeof position === 'number') {
      // Generate from position number
      if (position < 0 || position >= 960) {
        throw new Error('Position number must be between 0 and 959')
      }
      fen = Chess960.generatePositionFen(position)
    } else {
      // Use provided FEN string
      fen = position
    }
    super(fen, opts)
    this._initializeRooks()
  }

  /**
   * Initialize rook tracking from current board position
   */
  private _initializeRooks(): void {
    this._rooks = { w: [], b: [] }

    // Scan the back ranks for rooks
    // White's back rank (rank 1)
    for (let sq = Ox88.a1; sq <= Ox88.h1; sq++) {
      const piece = this.get(algebraic(sq))
      if (piece && piece.type === ROOK && piece.color === WHITE) {
        const kingSquare = this._getKingSquare(WHITE)
        const flag = sq > kingSquare ? BITS.KSIDE_CASTLE : BITS.QSIDE_CASTLE
        this._rooks.w.push({ square: sq, flag })
      }
    }

    // Black's back rank (rank 8)
    for (let sq = Ox88.a8; sq <= Ox88.h8; sq++) {
      const piece = this.get(algebraic(sq))
      if (piece && piece.type === ROOK && piece.color === BLACK) {
        const kingSquare = this._getKingSquare(BLACK)
        const flag = sq > kingSquare ? BITS.KSIDE_CASTLE : BITS.QSIDE_CASTLE
        this._rooks.b.push({ square: sq, flag })
      }
    }
  }

  /**
   * Get the king's square for a given color
   */
  private _getKingSquare(color: Color): number {
    const rankNum = color === WHITE ? 1 : 8
    for (let fileNum = 0; fileNum < 8; fileNum++) {
      const square = `${'abcdefgh'[fileNum]}${rankNum}` as Square
      const piece = this.get(square)
      if (piece && piece.type === KING && piece.color === color) {
        return Ox88[square]
      }
    }
    return -1
  }

  /**
   * Generate a Chess960 starting position FEN from a position number (0-959)
   * 
   * Algorithm based on the Scharnagl numbering system:
   * - Bishops must be on opposite colors
   * - King must be between the two rooks
   * 
   * @param n - Position number (0-959)
   * @returns FEN string for the starting position
   */
  static generatePositionFen(n: number): string {
    if (n < 0 || n >= 960) {
      throw new Error('Position number must be between 0 and 959')
    }

    const pieces = new Array(8).fill('')

    // Place bishops on opposite colored squares
    const lightSquares = [1, 3, 5, 7]
    const lightBishopIndex = n % 4
    pieces[lightSquares[lightBishopIndex]] = 'B'
    n = Math.floor(n / 4)

    const darkSquares = [0, 2, 4, 6]
    const darkBishopIndex = n % 4
    pieces[darkSquares[darkBishopIndex]] = 'B'
    n = Math.floor(n / 4)

    // Place queen
    const emptySquares = pieces
      .map((p, i) => (p === '' ? i : -1))
      .filter((i) => i !== -1)
    const queenIndex = n % 6
    pieces[emptySquares[queenIndex]] = 'Q'
    n = Math.floor(n / 6)

    // Place knights
    const knightPlacements = [
      [0, 1], [0, 2], [0, 3], [0, 4],
      [1, 2], [1, 3], [1, 4],
      [2, 3], [2, 4],
      [3, 4],
    ]
    const knightPlacement = knightPlacements[n]
    const remainingSquares = pieces
      .map((p, i) => (p === '' ? i : -1))
      .filter((i) => i !== -1)
    pieces[remainingSquares[knightPlacement[0]]] = 'N'
    pieces[remainingSquares[knightPlacement[1]]] = 'N'

    // Place rooks and king (R-K-R pattern)
    const finalSquares = pieces
      .map((p, i) => (p === '' ? i : -1))
      .filter((i) => i !== -1)
    pieces[finalSquares[0]] = 'R'
    pieces[finalSquares[1]] = 'K'
    pieces[finalSquares[2]] = 'R'

    // Build FEN string
    const backRank = pieces.join('').toLowerCase()
    const fen = `${backRank}/pppppppp/8/8/8/8/PPPPPPPP/${pieces.join('').toUpperCase()} w KQkq - 0 1`

    return fen
  }

  /**
   * Get the position number (0-959) for the current Chess960 position
   * Returns -1 if the position is not a valid Chess960 starting position
   */
  getPositionNumber(): number {
    // Implementation left for future enhancement
    return -1
  }

  /**
   * Check if current position is a valid Chess960 starting position
   */
  isValidChess960Position(): boolean {
    const fen = this.fen()
    const ranks = fen.split(' ')[0].split('/')
    
    // Must be move 1 (halfmove 0, fullmove 1)
    if (fen.split(' ')[4] !== '0' || fen.split(' ')[5] !== '1') {
      return false
    }
    
    // Check white's back rank (rank 8 in FEN, index 7)
    const whiteBackRank = ranks[7].toLowerCase()
    
    // Check black's back rank (rank 1 in FEN, index 0)
    const blackBackRank = ranks[0].toLowerCase()
    
    // Both back ranks should match (mirrored)
    if (whiteBackRank.toUpperCase() !== ranks[7] || blackBackRank !== ranks[0]) {
      return false
    }
    
    // Pawns must be on ranks 2 and 7
    if (ranks[6] !== 'PPPPPPPP' || ranks[1] !== 'pppppppp') {
      return false
    }
    
    // Middle ranks must be empty
    for (let i = 2; i <= 5; i++) {
      if (ranks[i] !== '8') {
        return false
      }
    }
    
    // Check piece count on white's back rank
    const pieces = whiteBackRank
    if (
      pieces.split('r').length - 1 !== 2 ||
      pieces.split('n').length - 1 !== 2 ||
      pieces.split('b').length - 1 !== 2 ||
      pieces.split('q').length - 1 !== 1 ||
      pieces.split('k').length - 1 !== 1
    ) {
      return false
    }

    // Check bishops on opposite colors
    const bishopIndices: number[] = []
    for (let i = 0; i < pieces.length; i++) {
      if (pieces[i] === 'b') {
        bishopIndices.push(i)
      }
    }
    if (bishopIndices.length !== 2) return false
    if (bishopIndices[0] % 2 === bishopIndices[1] % 2) return false

    // Check king between rooks
    const kingIndex = pieces.indexOf('k')
    const rook1Index = pieces.indexOf('r')
    const rook2Index = pieces.lastIndexOf('r')
    if (kingIndex < rook1Index || kingIndex > rook2Index) {
      return false
    }

    return true
  }

  /**
   * Override load to support X-FEN notation
   */
  override load(fen: string, options: { skipValidation?: boolean; preserveHeaders?: boolean } = {}) {
    // First, check if this is X-FEN (has file letters in castling)
    const tokens = fen.split(/\s+/)
    if (tokens.length >= 3) {
      const castlingPart = tokens[2]
      const hasXFEN = /[A-Ha-h]/.test(castlingPart)
      
      if (hasXFEN) {
        // Convert X-FEN to standard FEN for loading, then fix castling
        const standardFen = this._convertXFENToStandard(fen)
        super.load(standardFen, options)
        this._parseXFENCastling(castlingPart)
        this._initializeRooks()
        return
      }
    }
    
    // Standard FEN loading
    super.load(fen, options)
    this._initializeRooks()
  }

  /**
   * Convert X-FEN to standard FEN (temporarily use KQkq for loading)
   */
  private _convertXFENToStandard(xfen: string): string {
    const tokens = xfen.split(/\s+/)
    // Replace X-FEN castling with standard KQkq for initial load
    tokens[2] = 'KQkq'
    return tokens.join(' ')
  }

  /**
   * Parse X-FEN castling notation
   */
  private _parseXFENCastling(castlingString: string): void {
    // This will be called after the position is loaded
    // We'll update the castling rights based on X-FEN notation
    
    // Reset castling
    this._castling = { w: 0, b: 0 }
    this._rooks = { w: [], b: [] }

    // Parse white castling rights (uppercase letters)
    const whiteFiles = castlingString.match(/[A-H]/g)
    if (whiteFiles) {
      for (const fileLetter of whiteFiles) {
        const fileIndex = fileLetter.charCodeAt(0) - 'A'.charCodeAt(0)
        const sq = Ox88.a1 + fileIndex
        
        // Determine if kingside or queenside based on king position
        const kingSquare = this._getKingSquare(WHITE)
        const flag = sq > kingSquare ? BITS.KSIDE_CASTLE : BITS.QSIDE_CASTLE
        
        this._castling.w |= flag
        this._rooks.w.push({ square: sq, flag })
      }
    }

    // Parse black castling rights (lowercase letters)
    const blackFiles = castlingString.match(/[a-h]/g)
    if (blackFiles) {
      for (const fileLetter of blackFiles) {
        const fileIndex = fileLetter.charCodeAt(0) - 'a'.charCodeAt(0)
        const sq = Ox88.a8 + fileIndex
        
        const kingSquare = this._getKingSquare(BLACK)
        const flag = sq > kingSquare ? BITS.KSIDE_CASTLE : BITS.QSIDE_CASTLE
        
        this._castling.b |= flag
        this._rooks.b.push({ square: sq, flag })
      }
    }

    // Also handle standard notation mixed with X-FEN
    if (castlingString.includes('K')) {
      this._castling.w |= BITS.KSIDE_CASTLE
      // Find the kingside rook
      for (let sq = Ox88.h1; sq >= Ox88.c1; sq--) {
        const piece = this.get(algebraic(sq))
        if (piece && piece.type === ROOK && piece.color === WHITE) {
          if (!this._rooks.w.some(r => r.square === sq)) {
            this._rooks.w.push({ square: sq, flag: BITS.KSIDE_CASTLE })
          }
          break
        }
      }
    }
    
    if (castlingString.includes('Q')) {
      this._castling.w |= BITS.QSIDE_CASTLE
      for (let sq = Ox88.a1; sq <= Ox88.g1; sq++) {
        const piece = this.get(algebraic(sq))
        if (piece && piece.type === ROOK && piece.color === WHITE) {
          if (!this._rooks.w.some(r => r.square === sq)) {
            this._rooks.w.push({ square: sq, flag: BITS.QSIDE_CASTLE })
          }
          break
        }
      }
    }

    if (castlingString.includes('k')) {
      this._castling.b |= BITS.KSIDE_CASTLE
      for (let sq = Ox88.h8; sq >= Ox88.c8; sq--) {
        const piece = this.get(algebraic(sq))
        if (piece && piece.type === ROOK && piece.color === BLACK) {
          if (!this._rooks.b.some(r => r.square === sq)) {
            this._rooks.b.push({ square: sq, flag: BITS.KSIDE_CASTLE })
          }
          break
        }
      }
    }

    if (castlingString.includes('q')) {
      this._castling.b |= BITS.QSIDE_CASTLE
      for (let sq = Ox88.a8; sq <= Ox88.g8; sq++) {
        const piece = this.get(algebraic(sq))
        if (piece && piece.type === ROOK && piece.color === BLACK) {
          if (!this._rooks.b.some(r => r.square === sq)) {
            this._rooks.b.push({ square: sq, flag: BITS.QSIDE_CASTLE })
          }
          break
        }
      }
    }
  }

  /**
   * Override fen() to generate X-FEN notation
   */
  override fen(options: { forceEnpassantSquare?: boolean; useXFEN?: boolean } = {}): string {
    const standardFen = super.fen(options)
    
    // If useXFEN is explicitly false, return standard FEN
    if (options.useXFEN === false) {
      return standardFen
    }

    // Check if we need X-FEN (non-standard rook positions)
    const needsXFEN = this._needsXFEN()
    
    if (!needsXFEN) {
      return standardFen
    }

    // Generate X-FEN
    const tokens = standardFen.split(' ')
    tokens[2] = this._generateXFENCastling()
    
    return tokens.join(' ')
  }

  /**
   * Check if position needs X-FEN notation
   */
  private _needsXFEN(): boolean {
    // Check if any rook is not in standard position
    for (const rook of this._rooks.w) {
      if (rook.flag === BITS.KSIDE_CASTLE && rook.square !== Ox88.h1) {
        return true
      }
      if (rook.flag === BITS.QSIDE_CASTLE && rook.square !== Ox88.a1) {
        return true
      }
    }
    
    for (const rook of this._rooks.b) {
      if (rook.flag === BITS.KSIDE_CASTLE && rook.square !== Ox88.h8) {
        return true
      }
      if (rook.flag === BITS.QSIDE_CASTLE && rook.square !== Ox88.a8) {
        return true
      }
    }
    
    return false
  }

  /**
   * Generate X-FEN castling string
   */
  private _generateXFENCastling(): string {
    let castling = ''

    // White kingside
    if (this._castling.w & BITS.KSIDE_CASTLE) {
      const sq = this._searchRook(WHITE, BITS.KSIDE_CASTLE)
      if (sq !== -1) {
        if (this._isOutermostRook(WHITE, BITS.KSIDE_CASTLE, sq)) {
          castling += 'K'
        } else {
          castling += 'ABCDEFGH'[file(sq)]
        }
      }
    }

    // White queenside
    if (this._castling.w & BITS.QSIDE_CASTLE) {
      const sq = this._searchRook(WHITE, BITS.QSIDE_CASTLE)
      if (sq !== -1) {
        if (this._isOutermostRook(WHITE, BITS.QSIDE_CASTLE, sq)) {
          castling += 'Q'
        } else {
          castling += 'ABCDEFGH'[file(sq)]
        }
      }
    }

    // Black kingside
    if (this._castling.b & BITS.KSIDE_CASTLE) {
      const sq = this._searchRook(BLACK, BITS.KSIDE_CASTLE)
      if (sq !== -1) {
        if (this._isOutermostRook(BLACK, BITS.KSIDE_CASTLE, sq)) {
          castling += 'k'
        } else {
          castling += 'abcdefgh'[file(sq)]
        }
      }
    }

    // Black queenside
    if (this._castling.b & BITS.QSIDE_CASTLE) {
      const sq = this._searchRook(BLACK, BITS.QSIDE_CASTLE)
      if (sq !== -1) {
        if (this._isOutermostRook(BLACK, BITS.QSIDE_CASTLE, sq)) {
          castling += 'q'
        } else {
          castling += 'abcdefgh'[file(sq)]
        }
      }
    }

    return castling || '-'
  }

  /**
   * Search for a rook with specific castling flag
   */
  private _searchRook(color: Color, flag: number): number {
    for (const rook of this._rooks[color]) {
      if (flag & rook.flag) {
        return rook.square
      }
    }
    return -1
  }

  /**
   * Check if rook is the outermost rook (for K/Q vs file letter notation)
   */
  private _isOutermostRook(color: Color, flag: number, sq: number): boolean {
    if (flag === BITS.KSIDE_CASTLE) {
      // Check if this is the h-file rook
      const endSq = color === WHITE ? Ox88.h1 : Ox88.h8
      return sq === endSq
    } else {
      // Check if this is the a-file rook
      const endSq = color === WHITE ? Ox88.a1 : Ox88.a8
      return sq === endSq
    }
  }

  /**
   * Override move to handle King-to-Rook castling notation in Chess960
   */
  override move(
    move: string | { from: string; to: string; promotion?: string } | null,
    { strict = false }: { strict?: boolean } = {},
  ): Move {
    if (typeof move === 'object' && move !== null && 'from' in move && 'to' in move) {
      const fromOx88 = Ox88[move.from as Square]
      const toOx88 = Ox88[move.to as Square]
      
      if (fromOx88 !== undefined && toOx88 !== undefined) {
        const piece = this._board[fromOx88]
        const targetPiece = this._board[toOx88]
        
        // If king moves to its own rook, it's a castling attempt
        if (
          piece && piece.type === KING &&
          targetPiece && targetPiece.type === ROOK &&
          piece.color === targetPiece.color
        ) {
          const moves = this._moves()
          for (const m of moves) {
            if (m.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
               if (m.from === fromOx88 && m.rookFrom === toOx88) {
                  // Change 'to' to the king's actual destination
                  move = { ...move, to: algebraic(m.to) }
                  break
               }
            }
          }
        }
      }
    }
    
    return super.move(move, { strict })
  }

  /**
   * Override _moves to implement Chess960 castling logic
   * FIX: Temporarily disable castling rights to prevent base class from generating invalid castling moves
   */
  protected override _moves(options: {
    legal?: boolean
    piece?: PieceSymbol
    square?: Square
  } = {}): InternalMove[] {
    // CRITICAL FIX: Disable base castling generation by temporarily clearing castling rights
    const savedCastling = { w: this._castling.w, b: this._castling.b }
    this._castling.w = 0
    this._castling.b = 0

    // Get all non-castling moves from base class
    const moves = super._moves(options)

    // Restore castling rights
    this._castling.w = savedCastling.w
    this._castling.b = savedCastling.b

    const us = this._turn
    const them = swapColor(us)

    // only generate castling if king or no square filter
    if (!options.square || options.square === algebraic(this._kings[us])) {
      const kingFrom = this._kings[us]

      // kingside
      if (this._castling[us] & BITS.KSIDE_CASTLE) {
        const rookSq = this._searchRook(us, BITS.KSIDE_CASTLE)
        if (rookSq !== -1) {
          const kingTo = us === WHITE ? Ox88.g1 : Ox88.g8
          const rookTo = us === WHITE ? Ox88.f1 : Ox88.f8
          if (this._canCastle960(kingFrom, kingTo, rookSq, rookTo, them)) {
            moves.push({
              color: us,
              from: kingFrom,
              to: kingTo,
              piece: KING,
              flags: BITS.KSIDE_CASTLE,
              rookFrom: rookSq,
              rookTo: rookTo,
            })
          }
        }
      }

      // queenside
      if (this._castling[us] & BITS.QSIDE_CASTLE) {
        const rookSq = this._searchRook(us, BITS.QSIDE_CASTLE)
        if (rookSq !== -1) {
          const kingTo = us === WHITE ? Ox88.c1 : Ox88.c8
          const rookTo = us === WHITE ? Ox88.d1 : Ox88.d8
          if (this._canCastle960(kingFrom, kingTo, rookSq, rookTo, them)) {
            moves.push({
              color: us,
              from: kingFrom,
              to: kingTo,
              piece: KING,
              flags: BITS.QSIDE_CASTLE,
              rookFrom: rookSq,
              rookTo: rookTo,
            })
          }
        }
      }
    }

    return moves
  }

  /**
   * Override to prevent base class from corrupting Chess960 castling rights
   * Base class assumes king on e1/e8 and rooks on a/h files
   * In Chess960, these can be anywhere, so we manage castling rights explicitly
   */
  protected override _updateCastlingRights(): void {
    // DO NOTHING - castling rights are managed explicitly via _rooks array and X-FEN
    // Base class logic assumes standard chess positions and will incorrectly remove rights
  }

  /**
   * Check if Chess960 castling is legal
   */
  private _canCastle960(
    kingFrom: number,
    kingTo: number,
    rookFrom: number,
    rookTo: number,
    them: Color
  ): boolean {
    // King can't be in check at start
    if (this._attacked(them, kingFrom)) return false

    // 1️⃣ Get king path: actual squares the king passes through
    const kingPath: number[] = []
    const direction = kingTo > kingFrom ? 1 : -1
    let sq = kingFrom
    while (sq !== kingTo) {
      kingPath.push(sq)
      sq += direction
    }
    kingPath.push(kingTo)

    // 2️⃣ Check emptiness along king path (excluding starting square)
    for (let i = 1; i < kingPath.length; i++) {
      // skip rook if it sits in the path
      if (kingPath[i] === rookFrom) continue
      if (this._board[kingPath[i]]) return false
    }

    // 3️⃣ Check rook path emptiness (excluding starting square)
    const rookPath: number[] = []
    const rdir = rookTo > rookFrom ? 1 : -1
    let r = rookFrom
    while (r !== rookTo) {
      rookPath.push(r)
      r += rdir
    }
    rookPath.push(rookTo)

    for (let i = 1; i < rookPath.length; i++) {
      // Skip if king is on this square (king will move away)
      if (rookPath[i] === kingFrom) continue
      // The destination square must be empty or be where the king will vacate
      if (this._board[rookPath[i]]) return false
    }

    // 4️⃣ Attacked check only on king path squares (except starting square)
    for (let i = 1; i < kingPath.length; i++) {
      if (this._attacked(them, kingPath[i])) return false
    }

    return true
  }

  /**
   * Override _makeMove to handle Chess960 castling
   * Properly saves state and updates game state for castling moves
   */
  protected override _makeMove(move: InternalMove): void {
    const us = move.color
    const them = swapColor(us)

    // handle Chess960 castling
    if (move.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
      const isKS = (move.flags & BITS.KSIDE_CASTLE) !== 0
      const rookFrom = this._searchRook(us, isKS ? BITS.KSIDE_CASTLE : BITS.QSIDE_CASTLE)

      if (rookFrom !== -1) {
        const kingFrom = move.from
        const kingTo = move.to
        const rookTo = isKS
          ? (us === WHITE ? Ox88.f1 : Ox88.f8)
          : (us === WHITE ? Ox88.d1 : Ox88.d8)

        // CRITICAL: Save state to history BEFORE making the move
        this._push(move)

        // Update hash for castling and en passant
        this._hash ^= this._epKey()
        this._hash ^= this._castlingKey()

        // Update hash for king movement
        this._hash ^= this._pieceKey(kingFrom)
        
        // Capture pieces
        const kingPiece = this._board[kingFrom]!
        const rookPiece = this._board[rookFrom]!

        // Remove pieces from source
        delete this._board[kingFrom]
        // Only delete rookFrom if it's different from kingTo (already handled by overwrite?)
        // actually, safely deleting both is fine as long as we captured them.
        // But if rookFrom == kingFrom (impossible), or other overlaps?
        // In valid chess, kingFrom != rookFrom.
        // kingTo != rookTo.
        // But kingTo == rookFrom is possible (swap).
        // rookTo == kingFrom is possible (swap).
        
        if (kingFrom !== rookFrom) {
             delete this._board[rookFrom]
        }
        
        // Update hash for rook movement (if it moves)
        if (rookFrom !== rookTo) {
           this._hash ^= this._pieceKey(rookFrom)
        }

        // Place pieces at destination
        this._board[kingTo] = kingPiece
        this._kings[us] = kingTo
        if (rookFrom !== rookTo) {
             this._board[rookTo] = rookPiece
        } else {
             // If rook doesn't move, we must ensure it's still there or put back
             // If king moved to where rook was, rook is gone from board (deleted above).
             // But valid chess: if rookFrom == rookTo, then it's not a swap with King (King moves to G/C file).
             // If King checks, maybe King moves to G1, Rook stays at H1. OK.
             // If Rook stays, we shouldn't have deleted it if it wasn't necessary.
             // But my logic above deleted it.
             this._board[rookTo] = rookPiece
        }

        // Update hash for king at new position
        this._hash ^= this._pieceKey(kingTo)

        // Update hash for rook at new position
        if (rookFrom !== rookTo) {
          this._hash ^= this._pieceKey(rookTo)
        }

        // Clear castling rights for this color
        this._castling[us] = 0

        // Update hash for new castling state
        this._hash ^= this._castlingKey()

        // Clear en passant square
        this._epSquare = EMPTY
        this._fenEpSquare = EMPTY

        // Increment half moves (castling is not a pawn move or capture)
        this._halfMoves++

        // Increment move number if black just moved
        if (us === BLACK) {
          this._moveNumber++
        }

        // Switch turn
        this._turn = them
        this._hash ^= SIDE_KEY

        return
      }
    }

    // normal move - fully implemented here to handle Chess960 castling rights correctly
    this._push(move)

    if (move.flags & BITS.NULL_MOVE) {
      if (us === BLACK) {
        this._moveNumber++
      }
      this._halfMoves++
      this._turn = them

      this._epSquare = EMPTY

      return
    }

    this._hash ^= this._epKey()
    this._hash ^= this._castlingKey()

    if (move.captured) {
      this._hash ^= this._pieceKey(move.to)
    }

    this._movePiece(move.from, move.to)

    // if ep capture, remove the captured pawn
    if (move.flags & BITS.EP_CAPTURE) {
      if (this._turn === BLACK) {
        this._clear(move.to - 16)
      } else {
        this._clear(move.to + 16)
      }
    }

    // if pawn promotion, replace with new piece
    if (move.promotion) {
      this._clear(move.to)
      this._set(move.to, { type: move.promotion, color: us })
    }

    // if we moved the king
    if (this._board[move.to] && this._board[move.to].type === KING) {
      this._kings[us] = move.to

      // Not handling castling here because we handled it in the block above
      // But we must clear rights
      this._castling[us] = 0
    }

    // turn off castling if we move a rook (using dynamic _rooks)
    if (this._castling[us]) {
      for (const rook of this._rooks[us]) {
        if (
          move.from === rook.square &&
          this._castling[us] & rook.flag
        ) {
          this._castling[us] ^= rook.flag
          break
        }
      }
    }

    // turn off castling if we capture a rook (using dynamic _rooks)
    if (this._castling[them]) {
      for (const rook of this._rooks[them]) {
        if (
          move.to === rook.square &&
          this._castling[them] & rook.flag
        ) {
          this._castling[them] ^= rook.flag
          break
        }
      }
    }

    this._hash ^= this._castlingKey()

    // if big pawn move, update the en passant square
    if (move.flags & BITS.BIG_PAWN) {
      let epSquare

      if (us === BLACK) {
        epSquare = move.to - 16
      } else {
        epSquare = move.to + 16
      }

      this._fenEpSquare = epSquare

      if (
        (!((move.to - 1) & 0x88) &&
          this._board[move.to - 1]?.type === PAWN &&
          this._board[move.to - 1]?.color === them) ||
        (!((move.to + 1) & 0x88) &&
          this._board[move.to + 1]?.type === PAWN &&
          this._board[move.to + 1]?.color === them)
      ) {
        this._epSquare = epSquare
        this._hash ^= this._epKey()
      } else {
        this._epSquare = EMPTY
      }
    } else {
      this._epSquare = EMPTY
      this._fenEpSquare = EMPTY
    }

    // reset the 50 move counter if a pawn is moved or a piece is captured
    if (move.piece === PAWN) {
      this._halfMoves = 0
    } else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
      this._halfMoves = 0
    } else {
      this._halfMoves++
    }

    if (us === BLACK) {
      this._moveNumber++
    }

    this._turn = them
    this._hash ^= SIDE_KEY
  }

  /**
   * Override _undoMove to handle Chess960 castling properly
   * The base class assumes standard rook positions which breaks Chess960
   */
  protected override _undoMove(): InternalMove | null {
    const old = this._history.pop()
    if (old === undefined) {
      return null
    }

    this._hash ^= this._epKey()
    this._hash ^= this._castlingKey()

    const move = old.move

    // For castling moves, we need to handle Chess960 rook positions
    if (move.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
      const us = old.turn
      
      // Use the saved rook positions from the move object
      const rookOriginalPos = move.rookFrom ?? -1
      const rookCurrentPos = move.rookTo ?? -1

      // Restore state
      this._kings = old.kings
      this._turn = old.turn
      this._castling = old.castling
      this._epSquare = old.epSquare
      this._fenEpSquare = old.fenEpSquare
      this._halfMoves = old.halfMoves
      this._moveNumber = old.moveNumber

      this._hash ^= this._epKey()
      this._hash ^= this._castlingKey()
      this._hash ^= SIDE_KEY

      // Move king back (but only if it actually moved!)
      if (move.from !== move.to) {
        this._hash ^= this._pieceKey(move.to)
        this._hash ^= this._pieceKey(move.from)
      }

      // Move rook back (if it actually moved!)
      if (rookOriginalPos !== -1 && rookOriginalPos !== rookCurrentPos) {
        this._hash ^= this._pieceKey(rookCurrentPos)
        this._hash ^= this._pieceKey(rookOriginalPos)
      }

      // Restore pieces safely (handling swaps)
      const kingPiece = this._board[move.to]
      const rookPiece = this._board[rookCurrentPos]

      if (move.from !== move.to) {
          delete this._board[move.to]
      }
      
      if (rookOriginalPos !== -1 && rookOriginalPos !== rookCurrentPos) {
           delete this._board[rookCurrentPos]
      }

      // Place back at original positions
      if (kingPiece) {
          this._board[move.from] = kingPiece
      }
      
      if (rookPiece && rookOriginalPos !== -1) {
          this._board[rookOriginalPos] = rookPiece
      }

      return move
    }

    // For non-castling moves, use the base implementation
    // Restore state
    this._kings = old.kings
    this._turn = old.turn
    this._castling = old.castling
    this._epSquare = old.epSquare
    this._fenEpSquare = old.fenEpSquare
    this._halfMoves = old.halfMoves
    this._moveNumber = old.moveNumber

    this._hash ^= this._epKey()
    this._hash ^= this._castlingKey()
    this._hash ^= SIDE_KEY

    const us = this._turn
    const them = swapColor(us)

    if (move.flags & BITS.NULL_MOVE) {
      return move
    }

    this._movePiece(move.to, move.from)

    // to undo any promotions
    if (move.promotion) {
      this._clear(move.from)
      this._set(move.from, { type: move.piece, color: us })
    }

    if (move.captured) {
      if (move.flags & BITS.EP_CAPTURE) {
        // en passant capture
        let index: number
        if (us === BLACK) {
          index = move.to - 16
        } else {
          index = move.to + 16
        }
        this._set(index, { type: PAWN, color: them })
      } else {
        // regular capture
        this._set(move.to, { type: move.captured, color: them })
      }
    }

    return move
  }
}
