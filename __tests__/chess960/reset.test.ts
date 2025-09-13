import { Chess, getRandom960Position, DEFAULT_POSITION } from '../../src/chess'
import { expect, test } from 'vitest'

/**
 * These tests generate a random starting position. If a test fails, you must
 * record the FEN that caused the failure (for debugging purposes) because
 * re-running the tests is very unlikely to reproduce the same FEN.
 */

test('reset() should restore to the FEN supplied in constructor', () => {
  const chess960Fen = getRandom960Position()
  const chess = new Chess(chess960Fen, { chess960: true })
  chess.move('a2a3')
  chess.move('a7a6')
  chess.reset()
  expect(chess.fen()).toEqual(chess960Fen)
})

test('reset() should restore to the FEN supplied in load()', () => {
  const chess960Fen = getRandom960Position()
  const chess = new Chess()
  chess.load(chess960Fen, { chess960: true })
  chess.move('a2a3')
  chess.move('a7a6')
  chess.reset()
  expect(chess.fen()).toEqual(chess960Fen)
})
