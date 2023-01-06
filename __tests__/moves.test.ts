import { Chess, Square } from '../src/chess'
import { split } from './utils'
import 'jest-extended'

test('moves', () => {
  const chess = new Chess()
  const moves = `a3 a4 b3 b4 c3 c4 d3 d4 e3 e4 f3 f4 g3 g4 h3 h4 Na3 Nc3 Nf3
                 Nh3`
  expect(chess.moves()).toIncludeSameMembers(split(moves))
})

test('moves - single square', () => {
  const chess = new Chess()
  const moves = 'e3 e4'
  expect(chess.moves({ square: 'e2' })).toIncludeSameMembers(split(moves))
})

test('moves - single square - invalid square', () => {
  const chess = new Chess()
  const moves: string[] = []
  expect(chess.moves({ square: 'e9' as Square })).toEqual(moves)
})

test('moves - single square - pinned piece', () => {
  const chess = new Chess(
    'rnbqk1nr/pppp1ppp/4p3/8/1b1P4/2N5/PPP1PPPP/R1BQKBNR w KQkq - 2 3'
  )
  const moves: string[] = []
  expect(chess.moves({ square: 'c3' })).toEqual(moves)
})

test('moves - single square - promotion', () => {
  const chess = new Chess('8/k7/8/8/8/8/7p/K7 b - - 0 1')
  const moves = 'h1=N h1=B h1=R+ h1=Q+'
  expect(chess.moves({ square: 'h2' })).toIncludeSameMembers(split(moves))
})

test('moves - single square - castling', () => {
  const chess = new Chess(
    'r1bq1rk1/1pp2ppp/p1np1n2/2b1p3/2B1P3/2NP1N2/PPPBQPPP/R3K2R w KQ - 0 8'
  )
  const moves = 'Kf1 Kd1 O-O O-O-O'
  expect(chess.moves({ square: 'e1' })).toIncludeSameMembers(split(moves))
})

test('moves - single square - no castling', () => {
  const chess = new Chess(
    'r1bq1rk1/1pp2ppp/p1np1n2/2b1p3/2B1P3/2NP1N2/PPPBQPPP/R3K2R w - - 0 8'
  )
  const moves = 'Kf1 Kd1'
  expect(chess.moves({ square: 'e1' })).toIncludeSameMembers(split(moves))
})

test('moves - single square - trapped king', () => {
  const chess = new Chess('8/7K/8/8/1R6/k7/1R1p4/8 b - - 0 1')
  const moves: string[] = []
  expect(chess.moves({ square: 'a3' })).toEqual(moves)
})

test('moves - single square - verbose', () => {
  const chess = new Chess('8/7K/8/8/1R6/k7/1R1p4/8 b - - 0 1')
  const moves = [
    {
      color: 'b',
      from: 'd2',
      to: 'd1',
      flags: 'np',
      piece: 'p',
      promotion: 'q',
      san: 'd1=Q',
    },
    {
      color: 'b',
      from: 'd2',
      to: 'd1',
      flags: 'np',
      piece: 'p',
      promotion: 'r',
      san: 'd1=R',
    },
    {
      color: 'b',
      from: 'd2',
      to: 'd1',
      flags: 'np',
      piece: 'p',
      promotion: 'b',
      san: 'd1=B',
    },
    {
      color: 'b',
      from: 'd2',
      to: 'd1',
      flags: 'np',
      piece: 'p',
      promotion: 'n',
      san: 'd1=N',
    },
  ]
  expect(chess.moves({ square: 'd2', verbose: true })).toIncludeSameMembers(
    moves
  )
})
