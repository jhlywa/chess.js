import { Chess } from '../../src/chess'

test('initial game variant should be standard', () => {
  const chess = new Chess()
  expect(chess.isVariantChess960()).toEqual(false)
})

test('should be able to set chess960 game variant', () => {
  const chess = new Chess()
  chess.setVariantChess960()
  expect(chess.isVariantChess960()).toEqual(true)
})
