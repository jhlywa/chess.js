import { Chess, Square, Move } from '../src/chess'
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
      lan: 'd2d1q',
      before: '8/7K/8/8/1R6/k7/1R1p4/8 b - - 0 1',
      after: '8/7K/8/8/1R6/k7/1R6/3q4 w - - 0 2',
    },
    {
      color: 'b',
      from: 'd2',
      to: 'd1',
      flags: 'np',
      piece: 'p',
      promotion: 'r',
      san: 'd1=R',
      lan: 'd2d1r',
      before: '8/7K/8/8/1R6/k7/1R1p4/8 b - - 0 1',
      after: '8/7K/8/8/1R6/k7/1R6/3r4 w - - 0 2',
    },
    {
      color: 'b',
      from: 'd2',
      to: 'd1',
      flags: 'np',
      piece: 'p',
      promotion: 'b',
      san: 'd1=B',
      lan: 'd2d1b',
      before: '8/7K/8/8/1R6/k7/1R1p4/8 b - - 0 1',
      after: '8/7K/8/8/1R6/k7/1R6/3b4 w - - 0 2',
    },
    {
      color: 'b',
      from: 'd2',
      to: 'd1',
      flags: 'np',
      piece: 'p',
      promotion: 'n',
      san: 'd1=N',
      lan: 'd2d1n',
      before: '8/7K/8/8/1R6/k7/1R1p4/8 b - - 0 1',
      after: '8/7K/8/8/1R6/k7/1R6/3n4 w - - 0 2',
    },
  ]
  expect(chess.moves({ square: 'd2', verbose: true })).toIncludeSameMembers(
    moves
  )
})

test('moves - piece', () => {
  const chess = new Chess()
  const moves = 'Na3 Nc3 Nf3 Nh3'
  expect(chess.moves({ piece: 'n' })).toIncludeSameMembers(split(moves))
})

test('moves - piece - en passante', () => {
  const chess = new Chess(
    'rnbq1rk1/4bpp1/p2p1n1p/Ppp1p3/2B1P3/2NP1N1P/1PP2PP1/R1BQ1RK1 w - b6 0 10'
  )
  const moves = 'axb6 b3 b4 d4 g3 g4 h4'
  expect(chess.moves({ piece: 'p' })).toIncludeSameMembers(split(moves))
})

test('moves - piece - no such piece', () => {
  const chess = new Chess(
    'r1bq1rk1/1pp2ppp/p1np1n2/2b1p3/4P3/2NP1N2/PPP1QPPP/R3K2R w KQ - 0 8'
  )
  const moves: string[] = []
  expect(chess.moves({ piece: 'b' })).toEqual(moves)
})
test('moves - piece - verbose', () => {
  const chess = new Chess(
    'r4rk1/1p4p1/p1n1p2p/2p1p1q1/4P1N1/P1pP3P/1P2QPP1/R1R3K1 w - - 0 19'
  )
  const moves: Move[] = [
    {
      after:
        'r4rk1/1p4p1/p1n1p2p/2p1p1q1/4P1N1/P1pP3P/RP2QPP1/2R3K1 b - - 1 19',
      before:
        'r4rk1/1p4p1/p1n1p2p/2p1p1q1/4P1N1/P1pP3P/1P2QPP1/R1R3K1 w - - 0 19',
      color: 'w',
      flags: 'n',
      from: 'a1',
      lan: 'a1a2',
      piece: 'r',
      san: 'Ra2',
      to: 'a2',
    },
    {
      after:
        'r4rk1/1p4p1/p1n1p2p/2p1p1q1/4P1N1/P1pP3P/1P2QPP1/1RR3K1 b - - 1 19',
      before:
        'r4rk1/1p4p1/p1n1p2p/2p1p1q1/4P1N1/P1pP3P/1P2QPP1/R1R3K1 w - - 0 19',
      color: 'w',
      flags: 'n',
      from: 'a1',
      lan: 'a1b1',
      piece: 'r',
      san: 'Rab1',
      to: 'b1',
    },
    {
      after:
        'r4rk1/1p4p1/p1n1p2p/2p1p1q1/4P1N1/P1pP3P/1PR1QPP1/R5K1 b - - 1 19',
      before:
        'r4rk1/1p4p1/p1n1p2p/2p1p1q1/4P1N1/P1pP3P/1P2QPP1/R1R3K1 w - - 0 19',
      color: 'w',
      flags: 'n',
      from: 'c1',
      lan: 'c1c2',
      piece: 'r',
      san: 'Rc2',
      to: 'c2',
    },
    {
      after: 'r4rk1/1p4p1/p1n1p2p/2p1p1q1/4P1N1/P1RP3P/1P2QPP1/R5K1 b - - 0 19',
      before:
        'r4rk1/1p4p1/p1n1p2p/2p1p1q1/4P1N1/P1pP3P/1P2QPP1/R1R3K1 w - - 0 19',
      captured: 'p',
      color: 'w',
      flags: 'c',
      from: 'c1',
      lan: 'c1c3',
      piece: 'r',
      san: 'Rxc3',
      to: 'c3',
    },
    {
      after:
        'r4rk1/1p4p1/p1n1p2p/2p1p1q1/4P1N1/P1pP3P/1P2QPP1/R2R2K1 b - - 1 19',
      before:
        'r4rk1/1p4p1/p1n1p2p/2p1p1q1/4P1N1/P1pP3P/1P2QPP1/R1R3K1 w - - 0 19',
      color: 'w',
      flags: 'n',
      from: 'c1',
      lan: 'c1d1',
      piece: 'r',
      san: 'Rd1',
      to: 'd1',
    },
    {
      after:
        'r4rk1/1p4p1/p1n1p2p/2p1p1q1/4P1N1/P1pP3P/1P2QPP1/R3R1K1 b - - 1 19',
      before:
        'r4rk1/1p4p1/p1n1p2p/2p1p1q1/4P1N1/P1pP3P/1P2QPP1/R1R3K1 w - - 0 19',
      color: 'w',
      flags: 'n',
      from: 'c1',
      lan: 'c1e1',
      piece: 'r',
      san: 'Re1',
      to: 'e1',
    },
    {
      after:
        'r4rk1/1p4p1/p1n1p2p/2p1p1q1/4P1N1/P1pP3P/1P2QPP1/R4RK1 b - - 1 19',
      before:
        'r4rk1/1p4p1/p1n1p2p/2p1p1q1/4P1N1/P1pP3P/1P2QPP1/R1R3K1 w - - 0 19',
      color: 'w',
      flags: 'n',
      from: 'c1',
      lan: 'c1f1',
      piece: 'r',
      san: 'Rf1',
      to: 'f1',
    },
    {
      after:
        'r4rk1/1p4p1/p1n1p2p/2p1p1q1/4P1N1/P1pP3P/1P2QPP1/RR4K1 b - - 1 19',
      before:
        'r4rk1/1p4p1/p1n1p2p/2p1p1q1/4P1N1/P1pP3P/1P2QPP1/R1R3K1 w - - 0 19',
      color: 'w',
      flags: 'n',
      from: 'c1',
      lan: 'c1b1',
      piece: 'r',
      san: 'Rcb1',
      to: 'b1',
    },
  ]

  expect(chess.moves({ piece: 'r', verbose: true })).toIncludeSameMembers(moves)
})

test('moves - square and piece', () => {
  const chess = new Chess(
    '5rk1/1p3rp1/p1n1p3/2p1p2p/2PpP1qP/P2P2P1/1P2QP1K/3R1R2 w - - 0 23'
  )
  const moves = 'Qd2 Qc2 Qe1 Qe3 Qf3 Qxg4'
  expect(chess.moves({ square: 'e2', piece: 'q' })).toIncludeSameMembers(
    split(moves)
  )
})
