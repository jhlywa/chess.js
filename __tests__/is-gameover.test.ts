import { Chess } from '../src/chess'
import { expect, test } from 'vitest'

test('isGameOver - works - stalemate', () => {
  const chess = new Chess('8/8/5k2/p4p1p/P4K1P/1r6/8/8 w - - 0 2')
  expect(chess.isGameOver()).toBe(true)
})

test('isGameOver - works - checkmate', () => {
  const chess = new Chess('8/5r2/4K1q1/4p3/3k4/8/8/8 w - - 0 7')
  expect(chess.isGameOver()).toBe(true)
})

test('isGameOver - works - insufficient material', () => {
  const chess = new Chess('k7/8/8/8/8/8/8/7K w - - 0 1')
  expect(chess.isGameOver()).toBe(true)
})
