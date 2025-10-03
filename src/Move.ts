import {
  Color,
  Square,
  PieceSymbol,
  InternalMove,
  algebraic,
  BITS,
  FLAGS,
} from './types'

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
   * `isEnPassant`, `isKingsideCastle`, `isQueensideCastle`, `isCastle`, and
   * `isBigPawn`
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
}
