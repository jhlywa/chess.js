import { Chess } from '../src/chess'

test('undo - works', () => {
  const chess = new Chess()

  chess.move('e4')
  chess.move('e5')
  expect(chess.undo()?.san).toEqual('e5')
  expect(chess.undo()?.san).toEqual('e4')
  expect(chess.undo()).toBeNull()

  chess.undo()
})

test('undo - works - nothing to undo', () => {
  const chess = new Chess()

  chess.undo()
})
