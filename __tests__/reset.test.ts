import { Chess, DEFAULT_POSITION } from '../src/chess'

test('reset', () => {
  const chess = new Chess()
  chess.clear()
  chess.reset()
  expect(chess.fen()).toEqual(DEFAULT_POSITION)
})
