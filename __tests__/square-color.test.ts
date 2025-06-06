import { Chess, type Square } from '../src/chess'
import { expect, test } from 'vitest'

test('squareColor should return light for light squares', () => {
  const chess = new Chess()
  expect(chess.squareColor('a8')).toBe('light')
  expect(chess.squareColor('h1')).toBe('light')
  expect(chess.squareColor('e4')).toBe('light')
})

test('squareColor should return dark for dark squares', () => {
  const chess = new Chess()
  expect(chess.squareColor('a1')).toBe('dark')
  expect(chess.squareColor('h8')).toBe('dark')
  expect(chess.squareColor('d4')).toBe('dark')
})

test('squareColor should return null for out of bounds squares', () => {
  const chess = new Chess()
  expect(chess.squareColor('h9' as Square)).toBeNull()
})
