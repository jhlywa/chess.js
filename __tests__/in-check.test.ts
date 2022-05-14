import { Chess } from '../src/chess'

test('in_check - no, starting position', () => {
  const chess = new Chess()
  expect(chess.in_check()).toBe(false)
})

test('in_check - yes, black giving check', () => {
  const chess = new Chess(
    'rnb1kbnr/pppp1ppp/8/8/4Pp1q/2N5/PPPP2PP/R1BQKBNR w KQkq - 2 4'
  )
  expect(chess.in_check()).toBe(true)
})

test('in_check - yes, checkmate is also check', () => {
  const chess = new Chess('R3k3/8/4K3/8/8/8/8/8 b - - 0 1')
  expect(chess.in_check()).toBe(true)
})

test('in_check - no, stalemate is not check', () => {
  const chess = new Chess('4k3/4P3/4K3/8/8/8/8/8 b - - 0 1')
  expect(chess.in_check()).toBe(false)
})
