import { Chess } from '../src/chess'
import { test, expect } from 'vitest'

test('setTurn for current color returns false', () => {
  const fen = '2r5/1p2k3/2n1p2p/2P1B1p1/1P2K3/3R1PP1/7P/8 w - - 1 39'
  const chess = new Chess(fen)

  expect(chess.setTurn('w')).toBe(false)
  expect(chess.turn()).toBe('w')
})

test('setTurn for opposite color returns true', () => {
  const fen = '2r5/1p2k3/2n1p2p/2P1B1p1/1P2K3/3R1PP1/7P/8 w - - 1 39'
  const chess = new Chess(fen)

  expect(chess.setTurn('b')).toBe(true)
  expect(chess.turn()).toBe('b')
})

test('setTurn throws if attempting to change color when in check', () => {
  const fn = () => {
    const fen = '2r5/1p2k3/2nBp2p/2P3p1/1P2K3/3R1PP1/7P/8 b - - 2 39'
    const chess = new Chess(fen)

    chess.setTurn('w')
  }
  expect(fn).toThrow('Null move not allowed when in check')
})
