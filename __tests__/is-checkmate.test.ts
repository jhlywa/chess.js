import { Chess, DEFAULT_POSITION } from '../src/chess'

const checkmates = [
  '8/5r2/4K1q1/4p3/3k4/8/8/8 w - - 0 7',
  '4r2r/p6p/1pnN2p1/kQp5/3pPq2/3P4/PPP3PP/R5K1 b - - 0 2',
  'r3k2r/ppp2p1p/2n1p1p1/8/2B2P1q/2NPb1n1/PP4PP/R2Q3K w kq - 0 8',
  '8/6R1/pp1r3p/6p1/P3R1Pk/1P4P1/7K/8 b - - 0 4',
]

checkmates.forEach((fen, i) => {
  test(`isCheckmate - position ${i}`, () => {
    const chess = new Chess(fen)
    expect(chess.isCheckmate()).toBe(true)
    expect(chess.isDraw()).toBe(false)
  })
})

const notCheckmates = [
  DEFAULT_POSITION,
  '1R6/8/8/8/8/8/7R/k6K b - - 0 1', // stalemate,
]

notCheckmates.forEach((fen, i) => {
  test(`isCheckmate - position ${i} - not checkmate`, () => {
    const chess = new Chess(fen)
    expect(chess.isCheckmate()).toBe(false)
  })
})
