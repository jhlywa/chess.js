import { Chess, STANDARD_POSITION } from '../../src/chess'
import { expect, test } from 'vitest'

test('initial game variant should be standard', () => {
  const chess = new Chess()
  expect(chess.isChess960()).toEqual(false)
})

test('should be able to set chess960 game variant as true', () => {
  const chess = new Chess(STANDARD_POSITION, { chess960: true })
  expect(chess.isChess960()).toEqual(true)
})

test('should be able to set chess960 game variant as false', () => {
  const chess = new Chess(STANDARD_POSITION, { chess960: false })
  expect(chess.isChess960()).toEqual(false)
})
