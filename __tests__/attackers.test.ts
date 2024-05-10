import { Chess, Color, SQUARES, WHITE, BLACK } from '../src/chess'
import 'jest-extended'

function getAttackerCount(chess: Chess, color: Color) {
  return Array.from(
    { length: 64 },
    (_, i) => chess.attackers(SQUARES[i], color).length,
  )
}

test('attackers - attacker count in default position', () => {
  const chess = new Chess()

  // prettier-ignore
  const expectedWhiteAttackerCount = [
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    2, 2, 3, 2, 2, 3, 2, 2,
    1, 1, 1, 4, 4, 1, 1, 1,
    0, 1, 1, 1, 1, 1, 1, 0,
  ]
  expect(getAttackerCount(chess, WHITE)).toEqual(expectedWhiteAttackerCount)

  // prettier-ignore
  const expectedBlackAttackerCount = [
    0, 1, 1, 1, 1, 1, 1, 0,
    1, 1, 1, 4, 4, 1, 1, 1,
    2, 2, 3, 2, 2, 3, 2, 2,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
  ]
  expect(getAttackerCount(chess, BLACK)).toEqual(expectedBlackAttackerCount)
})

test('attackers - attacker count in middlegame position', () => {
  const chess = new Chess(
    'r3kb1r/1b3ppp/pqnppn2/1p6/4PBP1/PNN5/1PPQBP1P/2KR3R b kq - 0 1',
  ) // Gujrathi–Firouzja, round 6

  // prettier-ignore
  const expectedWhiteAttackerCount = [
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 2, 0, 0, 0, 1,
    1, 2, 1, 3, 1, 2, 1, 1,
    1, 1, 1, 2, 1, 1, 1, 0,
    1, 1, 2, 3, 3, 1, 3, 0,
    1, 1, 2, 4, 2, 0, 0, 2,
    1, 2, 3, 5, 3, 3, 2, 1,
  ]
  expect(getAttackerCount(chess, WHITE)).toEqual(expectedWhiteAttackerCount)

  // prettier-ignore
  const expectedBlackAttackerCount = [
    1, 2, 2, 4, 2, 2, 2, 0,
    3, 1, 1, 2, 3, 1, 1, 2,
    3, 0, 2, 1, 1, 1, 2, 1,
    2, 2, 2, 2, 2, 1, 0, 1,
    1, 1, 1, 2, 1, 0, 1, 0,
    0, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
  ]
  expect(getAttackerCount(chess, BLACK)).toEqual(expectedBlackAttackerCount)
})

test('attackers - attacker count when all but one square is covered', () => {
  const chess = new Chess('Q4K1k/1Q5p/2Q5/3Q4/4Q3/5Q2/6Q1/7Q w - - 0 1')

  // prettier-ignore
  const expectedWhiteAttackerCount = [
    1, 2, 3, 2, 4, 2, 3, 0,
    2, 2, 2, 3, 3, 4, 3, 3,
    3, 2, 2, 2, 3, 2, 3, 2,
    2, 3, 2, 2, 2, 3, 2, 3,
    3, 2, 3, 2, 2, 2, 3, 2,
    2, 3, 2, 3, 2, 2, 2, 3,
    3, 2, 3, 2, 3, 2, 2, 2,
    2, 3, 2, 3, 2, 3, 2, 1,
  ]
  expect(getAttackerCount(chess, WHITE)).toEqual(expectedWhiteAttackerCount)

  // prettier-ignore
  const expectedBlackAttackerCount = [
    0, 0, 0, 0, 0, 0, 1, 0,
    0, 0, 0, 0, 0, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
  ]
  expect(getAttackerCount(chess, BLACK)).toEqual(expectedBlackAttackerCount)
})

test('attackers - return value depends on side to move', () => {
  const chess = new Chess()
  expect(chess.attackers('c3')).toIncludeSameMembers(['b1', 'b2', 'd2'])
  expect(chess.attackers('c6')).toEqual([])

  chess.move('e4')
  expect(chess.attackers('c3')).toEqual([])
  expect(chess.attackers('c6')).toIncludeSameMembers(['b7', 'b8', 'd7'])

  chess.move('e5')
  expect(chess.attackers('c3')).toIncludeSameMembers(['b1', 'b2', 'd2'])
  expect(chess.attackers('c6')).toEqual([])
})

test('attackers - every piece attacking empty square', () => {
  const chess = new Chess('2b5/4kp2/2r5/3q2n1/8/8/4P3/4K3 w - - 0 1')
  expect(chess.attackers('e6', BLACK)).toIncludeSameMembers([
    'c6',
    'c8',
    'd5',
    'e7',
    'f7',
    'g5',
  ])
})

test('attackers - every piece attacking another piece', () => {
  const chess = new Chess('4k3/8/8/8/5Q2/5p1R/4PK2/4N2B w - - 0 1')
  expect(chess.attackers('f3')).toIncludeSameMembers([
    'e1',
    'e2',
    'f2',
    'f4',
    'h1',
    'h3',
  ])
})

test('attackers - every piece defending empty square', () => {
  const chess = new Chess('B3k3/8/8/2K4R/3QPN2/8/8/8 w - - 0 1')
  expect(chess.attackers('d5', WHITE)).toIncludeSameMembers([
    'a8',
    'c5',
    'd4',
    'e4',
    'f4',
    'h5',
  ])
})

test('attackers - every piece defending another piece', () => {
  const chess = new Chess('2r5/1b1p4/1kp1q3/4n3/8/8/8/4K3 b - - 0 1')
  expect(chess.attackers('c6')).toIncludeSameMembers([
    'b6',
    'b7',
    'c8',
    'd7',
    'e5',
    'e6',
  ])
})

test('attackers - pinned pieces still attack and defend', () => {
  // knight on c3 is pinned, but it is still attacking d4 and defending e5
  const chess = new Chess(
    'r1bqkbnr/ppp2ppp/2np4/1B2p3/3PP3/5N2/PPP2PPP/RNBQK2R b KQkq - 0 4',
  )
  expect(chess.attackers('d4', BLACK)).toIncludeSameMembers(['c6', 'e5'])
  expect(chess.attackers('e5', BLACK)).toIncludeSameMembers(['c6', 'd6'])
})

test('attackers - king can "attack" defended piece', () => {
  const chess = new Chess('3k4/8/8/8/3b4/3R4/4Pq2/4K3 w - - 0 1')
  expect(chess.attackers('f2', WHITE)).toIncludeSameMembers(['e1'])
})

test('attackers - a lot of attackers', () => {
  const chess = new Chess(
    '5k2/8/3N1N2/2NBQQN1/3R1R2/2NPRPN1/3N1N2/4K3 w - - 0 1',
  )
  expect(chess.attackers('e4', WHITE)).toIncludeSameMembers([
    'c3',
    'c5',
    'd2',
    'd3',
    'd4',
    'd5',
    'd6',
    'e3',
    'e5',
    'f2',
    'f3',
    'f4',
    'f5',
    'f6',
    'g3',
    'g5',
  ])
})

test('attackers - no attackers', () => {
  const chess = new Chess()
  expect(chess.attackers('e4', WHITE)).toEqual([])
})

test('attackers - readme tests', () => {
  const chess = new Chess()
  expect(chess.attackers('f3')).toEqual(['e2', 'g2', 'g1'])
  expect(chess.attackers('e2')).toEqual(['d1', 'e1', 'f1', 'g1'])
  expect(chess.attackers('f6')).toEqual([])
  chess.move('e4')
  expect(chess.attackers('f6')).toEqual(['g8', 'e7', 'g7'])
  expect(chess.attackers('f3', WHITE)).toEqual(['g2', 'd1', 'g1'])
  chess.load('4k3/4n3/8/8/8/8/4R3/4K3 w - - 0 1')
  expect(chess.attackers('c6', BLACK)).toEqual(['e7'])
})
