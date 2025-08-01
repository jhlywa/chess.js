import { Chess } from '../../src/chess'
import { expect, test } from 'vitest'

/**
  When Chess960 support is enabled, if a rook has a castling-right and the user
  attempts to castle, but is prevented due to castling through check or due to
  a piece being in the way, an error will be thrown. The error will display
  the move that was attempted (in object form).
 */

test('when castling through check, error message should be thrown', () => {
  const chess = new Chess('1k6/8/8/8/3r4/8/8/1K4R1 w K - 0 1', {
    chess960: true,
  })
  expect(() => chess.move('b1g1')).toThrow(
    'Invalid move: {"from":"b1","to":"g1"}',
  )
})

test('when castling path is obstructed, error message should be thrown', () => {
  const chess = new Chess('1k6/8/8/8/8/8/8/1K1N2R1 w K - 0 1', {
    chess960: true,
  })
  expect(() => chess.move('b1g1')).toThrow(
    'Invalid move: {"from":"b1","to":"g1"}',
  )
})
