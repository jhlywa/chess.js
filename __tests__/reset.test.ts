import { Chess, DEFAULT_POSITION } from '../src/chess'
import { expect, test } from 'vitest'

test('reset', () => {
  const chess = new Chess()
  chess.clear()
  chess.reset()
  expect(chess.fen()).toEqual(DEFAULT_POSITION)
})
