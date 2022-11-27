import { Chess } from '../src/chess'

test('insufficient material - k vs k', () => {
  const chess = new Chess('8/8/8/8/8/8/8/k6K w - - 0 1')
  expect(chess.isInsufficientMaterial()).toBe(true)
})

test('insufficient material - kn vs k', () => {
  const chess = new Chess('8/2N5/8/8/8/8/8/k6K w - - 0 1')
  expect(chess.isInsufficientMaterial()).toBe(true)
})

test('insufficient material - kb vs k', () => {
  const chess = new Chess('8/2b5/8/8/8/8/8/k6K w - - 0 1')
  expect(chess.isInsufficientMaterial()).toBe(true)
})

test('insufficient material - kb vs kb (same color bishops)', () => {
  const chess = new Chess('8/b7/3B4/8/8/8/8/k6K w - - 0 1')
  expect(chess.isInsufficientMaterial()).toBe(true)
})

test('insufficient material - kb vs kb (many same color bishops)', () => {
  const chess = new Chess('8/b1B1b1B1/1b1B1b1B/8/8/8/8/1k5K w - - 0 1')
  expect(chess.isInsufficientMaterial()).toBe(true)
})

test('not insufficient material - starting position', () => {
  const chess = new Chess()
  expect(chess.isInsufficientMaterial()).toBe(false)
})

test('not insufficient material - kp v k', () => {
  const chess = new Chess('8/2p5/8/8/8/8/8/k6K w - - 0 1')
  expect(chess.isInsufficientMaterial()).toBe(false)
})

test('not insufficient material - kb v kb (opposite color bishops)', () => {
  const chess = new Chess('5k1K/7B/8/6b1/8/8/8/8 b - - 0 1')
  expect(chess.isInsufficientMaterial()).toBe(false)
})

test('not insufficient material - kn v kb', () => {
  const chess = new Chess('7K/5k1N/8/6b1/8/8/8/8 b - - 0 1')
  expect(chess.isInsufficientMaterial()).toBe(false)
})

test('not insufficient material - kn v kn', () => {
  const chess = new Chess('7K/5k1N/8/4n3/8/8/8/8 b - - 0 1')
  expect(chess.isInsufficientMaterial()).toBe(false)
})
