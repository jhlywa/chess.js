import { Chess } from '../src/chess'

test('isCheck - no, starting position', () => {
  const chess = new Chess()
  expect(chess.isCheck()).toBe(false)
})

test('isCheck - yes, black giving check', () => {
  const chess = new Chess(
    'rnb1kbnr/pppp1ppp/8/8/4Pp1q/2N5/PPPP2PP/R1BQKBNR w KQkq - 2 4'
  )
  expect(chess.isCheck()).toBe(true)
})

test('isCheck - yes, checkmate is also check', () => {
  const chess = new Chess('R3k3/8/4K3/8/8/8/8/8 b - - 0 1')
  expect(chess.isCheck()).toBe(true)
})

test('isCheck - no, stalemate is not check', () => {
  const chess = new Chess('4k3/4P3/4K3/8/8/8/8/8 b - - 0 1')
  expect(chess.isCheck()).toBe(false)
})
