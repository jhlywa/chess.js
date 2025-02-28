import { Chess } from '../../src/chess'

test.each([
  { fen: '1kr4r/8/8/8/8/8/8/1K6 b c - 0 1', move: 'b8c8' },
  { fen: '1k1r3r/8/8/8/8/8/8/1K6 b d - 0 1', move: 'b8d8' },
  { fen: '1k2r2r/8/8/8/8/8/8/1K6 b e - 0 1', move: 'b8e8' },
  { fen: '1k3r1r/8/8/8/8/8/8/1K6 b f - 0 1', move: 'b8f8' },
  { fen: '1k4rr/8/8/8/8/8/8/1K6 b g - 0 1', move: 'b8g8' },
])(
  'black king can castle kingside with inner rook, but not outer rook',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move('h8h7') // move outer rook
    chess.move('b1a1') // opponent move
    chess.move(dat.move) // castle
    expect(chess.fen()).toEqual('5rk1/7r/8/8/8/8/8/K7 w - - 3 3')
  },
)

test.each([
  { fen: '1krr4/8/8/8/8/8/8/1K6 b k - 0 1', move: 'b8d8' },
  { fen: '1kr1r3/8/8/8/8/8/8/1K6 b k - 0 1', move: 'b8e8' },
  { fen: '1kr2r2/8/8/8/8/8/8/1K6 b k - 0 1', move: 'b8f8' },
  { fen: '1kr3r1/8/8/8/8/8/8/1K6 b k - 0 1', move: 'b8g8' },
  { fen: '1kr4r/8/8/8/8/8/8/1K6 b k - 0 1', move: 'b8h8' },
])(
  'black king can castle kingside with outer rook, but not inner rook',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    expect(() => {
      chess.move('b8c8')
    }).toThrow('Invalid move:')
    chess.move('c8c7') // move inner rook
    chess.move('b1a1') // opponent move
    chess.move(dat.move) // castle
    expect(chess.fen()).toEqual('5rk1/2r5/8/8/8/8/8/K7 w - - 3 3')
  },
)

test.each([
  { fen: 'r4rk1/8/8/8/8/8/8/6K1 b q - 0 1', move: 'g8a8' },
  { fen: '1r3rk1/8/8/8/8/8/8/6K1 b q - 0 1', move: 'g8b8' },
  { fen: '2r2rk1/8/8/8/8/8/8/6K1 b q - 0 1', move: 'g8c8' },
  { fen: '3r1rk1/8/8/8/8/8/8/6K1 b q - 0 1', move: 'g8d8' },
  { fen: '4rrk1/8/8/8/8/8/8/6K1 b q - 0 1', move: 'g8e8' },
])(
  'black king can castle queenside with outer rook, but not inner rook',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move('f8f7') // move inner rook
    chess.move('g1h1') // opponent move
    chess.move(dat.move) // castle
    expect(chess.fen()).toEqual('2kr4/5r2/8/8/8/8/8/7K w - - 3 3')
  },
)

test.each([
  { fen: 'rr4k1/8/8/8/8/8/8/6K1 b b - 0 1', move: 'g8b8' },
  { fen: 'r1r3k1/8/8/8/8/8/8/6K1 b c - 0 1', move: 'g8c8' },
  { fen: 'r2r2k1/8/8/8/8/8/8/6K1 b d - 0 1', move: 'g8d8' },
  { fen: 'r3r1k1/8/8/8/8/8/8/6K1 b e - 0 1', move: 'g8e8' },
  { fen: 'r4rk1/8/8/8/8/8/8/6K1 b f - 0 1', move: 'g8f8' },
])(
  'black king can castle queenside with inner rook, but not outer rook',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move('a8a7') // move outer rook
    chess.move('g1h1') // opponent move
    chess.move(dat.move) // castle
    expect(chess.fen()).toEqual('2kr4/r7/8/8/8/8/8/7K w - - 3 3')
  },
)

test.each([
  { fen: '1k6/8/8/8/8/8/8/1KR4R w C - 0 1', move: 'b1c1' },
  { fen: '1k6/8/8/8/8/8/8/1K1R3R w D - 0 1', move: 'b1d1' },
  { fen: '1k6/8/8/8/8/8/8/1K2R2R w E - 0 1', move: 'b1e1' },
  { fen: '1k6/8/8/8/8/8/8/1K3R1R w F - 0 1', move: 'b1f1' },
  { fen: '1k6/8/8/8/8/8/8/1K4RR w G - 0 1', move: 'b1g1' },
])(
  'white king can castle kingside with inner rook, but not outer rook',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move('h1h2') // move outer rook
    chess.move('b8a8') // opponent move
    chess.move(dat.move) // castle
    expect(chess.fen()).toEqual('k7/8/8/8/8/8/7R/5RK1 b - - 3 2')
  },
)

test.each([
  { fen: '1k6/8/8/8/8/8/8/1KRR4 w K - 0 1', move: 'b1d1' },
  { fen: '1k6/8/8/8/8/8/8/1KR1R3 w K - 0 1', move: 'b1e1' },
  { fen: '1k6/8/8/8/8/8/8/1KR2R2 w K - 0 1', move: 'b1f1' },
  { fen: '1k6/8/8/8/8/8/8/1KR3R1 w K - 0 1', move: 'b1g1' },
  { fen: '1k6/8/8/8/8/8/8/1KR4R w K - 0 1', move: 'b1h1' },
])(
  'white king can castle kingside with outer rook, but not inner rook',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    expect(() => {
      chess.move('b1c1')
    }).toThrow('Invalid move:')
    chess.move('c1c2') // move inner rook
    chess.move('b8a8') // opponent move
    chess.move(dat.move) // castle
    expect(chess.fen()).toEqual('k7/8/8/8/8/8/2R5/5RK1 b - - 3 2')
  },
)

test.each([
  { fen: '6k1/8/8/8/8/8/8/R4RK1 w Q - 0 1', move: 'g1a1' },
  { fen: '6k1/8/8/8/8/8/8/1R3RK1 w Q - 0 1', move: 'g1b1' },
  { fen: '6k1/8/8/8/8/8/8/2R2RK1 w Q - 0 1', move: 'g1c1' },
  { fen: '6k1/8/8/8/8/8/8/3R1RK1 w Q - 0 1', move: 'g1d1' },
  { fen: '6k1/8/8/8/8/8/8/4RRK1 w Q - 0 1', move: 'g1e1' },
])(
  'white king can castle queenside with outer rook, but not inner rook',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move('f1f2') // move inner rook
    chess.move('g8h8') // opponent move
    chess.move(dat.move) // castle
    expect(chess.fen()).toEqual('7k/8/8/8/8/8/5R2/2KR4 b - - 3 2')
  },
)

test.each([
  { fen: '6k1/8/8/8/8/8/8/RR4K1 w B - 0 1', move: 'g1b1' },
  { fen: '6k1/8/8/8/8/8/8/R1R3K1 w C - 0 1', move: 'g1c1' },
  { fen: '6k1/8/8/8/8/8/8/R2R2K1 w D - 0 1', move: 'g1d1' },
  { fen: '6k1/8/8/8/8/8/8/R3R1K1 w E - 0 1', move: 'g1e1' },
  { fen: '6k1/8/8/8/8/8/8/R4RK1 w F - 0 1', move: 'g1f1' },
])(
  'white king can castle queenside with inner rook, but not outer rook',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move('a1a2') // move outer rook
    chess.move('g8h8') // opponent move
    chess.move(dat.move) // castle
    expect(chess.fen()).toEqual('7k/8/8/8/8/8/R7/2KR4 b - - 3 2')
  },
)
