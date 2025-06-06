import { Chess } from '../src/chess'
import { expect, test } from 'vitest'

test('undo - works', () => {
  const chess = new Chess()

  chess.move('e4')
  chess.move('e5')
  expect(chess.undo()?.san).toEqual('e5')
  expect(chess.undo()?.san).toEqual('e4')
  expect(chess.undo()).toBeNull()

  chess.undo()
})
