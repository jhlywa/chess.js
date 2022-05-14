import { Chess } from '../src/chess'

test('perft - position 1', () => {
  const chess = new Chess()
  expect(chess.perft(4)).toBe(197281)
})

test('perft - position 2', () => {
  const chess = new Chess(
    'r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1'
  )
  expect(chess.perft(3)).toBe(97862)
})

test('perft - position 3', () => {
  const chess = new Chess('8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1')
  expect(chess.perft(4)).toBe(43238)
})

test('perft - position 4', () => {
  const chess = new Chess(
    'r2q1rk1/pP1p2pp/Q4n2/bbp1p3/Np6/1B3NBn/pPPP1PPP/R3K2R b KQ - 0 1'
  )
  expect(chess.perft(4)).toBe(422333)
})

test('perft - position 5', () => {
  const chess = new Chess(
    'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 1 8'
  )
  expect(chess.perft(3)).toBe(62379)
})

test('perft - position 6', () => {
  const chess = new Chess(
    'r4rk1/1pp1qppp/p1np1n2/2b1p1B1/2B1P1b1/P1NP1N2/1PP1QPPP/R4RK1 w - - 0 10'
  )
  expect(chess.perft(3)).toBe(89890)
})

test('perft - position 7', () => {
  const chess = new Chess(
    'rnbqkbnr/p3pppp/2p5/1pPp4/3P4/8/PP2PPPP/RNBQKBNR w KQkq b6 0 4'
  )
  expect(chess.perft(3)).toBe(23509)
})
