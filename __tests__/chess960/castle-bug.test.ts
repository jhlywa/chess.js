import { Chess } from '../../src/chess'
import { expect, test } from 'vitest'

// These tests capture a bug where castling moves were returned as legal, when a
// non-castling move was made.
//
// Triggering the bug requires:
//   1. The game must be Chess960.
//   2. The king must have the right to castle.
//   3. The king must move.
//   4. The king must not make a castling move (otherwise the king will simply
//      castle).
//   5. The king must not make a legal non-castling move (otherwise the king
//      will simply move to the new location).
// The four tests below cover the only conditions where this is possible.
//
// Currently, the chess code internals return non-castling moves before
// castling moves. If, instead, castling moves were returned before
// non-castling moves, this bug would be much easier to trigger.

test('kingside castling should not occur when the black king does not move', () => {
  const fen = 'r1k5/8/8/8/8/8/8/1K6 b a - 0 1'
  const chess = new Chess(fen, { chess960: true })
  expect(() => {
    chess.move('c8c8')
  }).toThrow('Invalid move:')
})

test('kingside castling should not occur when the white king does not move', () => {
  const fen = '1k6/8/8/8/8/8/8/6KR w H - 0 1'
  const chess = new Chess(fen, { chess960: true })
  expect(() => {
    chess.move('g1g1')
  }).toThrow('Invalid move:')
})

test('queenside castling should not occur when the black king does not move', () => {
  const fen = '6kr/8/8/8/8/8/8/1K6 b h - 0 1'
  const chess = new Chess(fen, { chess960: true })
  expect(() => {
    chess.move('g8g8')
  }).toThrow('Invalid move:')
})

test('queenside castling should not occur when the white king does not move', () => {
  const fen = '1k6/8/8/8/8/8/8/R1K5 w A - 0 1'
  const chess = new Chess(fen, { chess960: true })
  expect(() => {
    chess.move('c1c1')
  }).toThrow('Invalid move:')
})
