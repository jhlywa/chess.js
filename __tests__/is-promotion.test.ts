import { Chess } from '../src/chess'
import { expect, test } from 'vitest'

test('isPromotion - true for promotion', () => {
  const chess = new Chess('8/1PQ2pk1/3p2p1/3qp3/8/4P3/7p/2K5 w - - 0 56')
  expect(chess.isPromotion({ from: 'b7', to: 'b8' })).toBe(true)
})

test('isPromotion - false for illegal move', () => {
  const chess = new Chess('8/1PQ2pk1/3p2p1/3qp3/8/4P3/7p/2K5 w - - 0 56')
  expect(chess.isPromotion({ from: 'b7', to: 'c8' })).toBe(false)
})

test('isPromotion - false for normal pawn move', () => {
  const chess = new Chess(
    'r2qk2r/pR1nppbp/3p1np1/1BpP4/4PPb1/2N2N2/P1PB2PP/3QK2R w Kkq - 2 12',
  )
  expect(chess.isPromotion({ from: 'e4', to: 'e5' })).toBe(false)
})

test('isPromotion - false for non pawn move to eighth rank', () => {
  const chess = new Chess(
    '2r1k3/4bp2/p2p2p1/1p2p1P1/3qB3/5Q2/PPP2P2/1K5R w - - 0 25',
  )
  expect(chess.isPromotion({ from: 'h1', to: 'h8' })).toBe(false)
})
