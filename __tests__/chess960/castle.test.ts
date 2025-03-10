import { Chess } from '../../src/chess'

// -------------------------------------------------------------
// Validate whether moving the king onto a rook results in castling.
// Every possible combination is tested (for a king and one rook).

// Tests are arranged by:
//  1. successful castle moves, then rejected castle moves
//  2. then alphabetically by the color of the king
//  3. then alphabetically by kingside or queenside
//  4. then alphabetically by their algebraic move.

// When no castling-right exists and the king attempts to castle by moving onto
// the rook, an error should be thrown. When testing this behaviour, it is easy
// to write an incorrect test that will pass because if the king is moved more
// than one space but does not land on the rook, an error will be thrown anyway.
// -------------------------------------------------------------

// Black king castling kingside.

test.each([
  { fen: '1kr5/8/8/8/8/8/8/1K6 b k - 0 1', move: 'b8c8' },
  { fen: '1k1r4/8/8/8/8/8/8/1K6 b k - 0 1', move: 'b8d8' },
  { fen: '1k2r3/8/8/8/8/8/8/1K6 b k - 0 1', move: 'b8e8' },
  { fen: '1k3r2/8/8/8/8/8/8/1K6 b k - 0 1', move: 'b8f8' },
  { fen: '1k4r1/8/8/8/8/8/8/1K6 b k - 0 1', move: 'b8g8' },
  { fen: '1k5r/8/8/8/8/8/8/1K6 b k - 0 1', move: 'b8h8' },
])(
  'moving black king from b8 onto rook with kingside castling-right will castle kingside',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move(dat.move)
    expect(chess.fen()).toEqual('5rk1/8/8/8/8/8/8/1K6 w - - 1 2')
  },
)

test.each([
  { fen: '2kr4/8/8/8/8/8/8/2K5 b k - 0 1', move: 'c8d8' },
  { fen: '2k1r3/8/8/8/8/8/8/2K5 b k - 0 1', move: 'c8e8' },
  { fen: '2k2r2/8/8/8/8/8/8/2K5 b k - 0 1', move: 'c8f8' },
  { fen: '2k3r1/8/8/8/8/8/8/2K5 b k - 0 1', move: 'c8g8' },
  { fen: '2k4r/8/8/8/8/8/8/2K5 b k - 0 1', move: 'c8h8' },
])(
  'moving black king from c8 onto rook with kingside castling-right will castle kingside',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move(dat.move)
    expect(chess.fen()).toEqual('5rk1/8/8/8/8/8/8/2K5 w - - 1 2')
  },
)

test.each([
  { fen: '3kr3/8/8/8/8/8/8/3K4 b k - 0 1', move: 'd8e8' },
  { fen: '3k1r2/8/8/8/8/8/8/3K4 b k - 0 1', move: 'd8f8' },
  { fen: '3k2r1/8/8/8/8/8/8/3K4 b k - 0 1', move: 'd8g8' },
  { fen: '3k3r/8/8/8/8/8/8/3K4 b k - 0 1', move: 'd8h8' },
])(
  'moving black king from d8 onto rook with kingside castling-right will castle kingside',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move(dat.move)
    expect(chess.fen()).toEqual('5rk1/8/8/8/8/8/8/3K4 w - - 1 2')
  },
)

test.each([
  { fen: '4kr2/8/8/8/8/8/8/4K3 b k - 0 1', move: 'e8f8' },
  { fen: '4k1r1/8/8/8/8/8/8/4K3 b k - 0 1', move: 'e8g8' },
  { fen: '4k2r/8/8/8/8/8/8/4K3 b k - 0 1', move: 'e8h8' },
])(
  'moving black king from e8 onto rook with kingside castling-right will castle kingside',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move(dat.move)
    expect(chess.fen()).toEqual('5rk1/8/8/8/8/8/8/4K3 w - - 1 2')
  },
)

test.each([
  { fen: '5kr1/8/8/8/8/8/8/5K2 b k - 0 1', move: 'f8g8' },
  { fen: '5k1r/8/8/8/8/8/8/5K2 b k - 0 1', move: 'f8h8' },
])(
  'moving black king from f8 onto rook with kingside castling-right will castle kingside',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move(dat.move)
    expect(chess.fen()).toEqual('5rk1/8/8/8/8/8/8/5K2 w - - 1 2')
  },
)

test.each([{ fen: '6kr/8/8/8/8/8/8/6K1 b k - 0 1', move: 'g8h8' }])(
  'moving black king from g8 onto rook with kingside castling-right will castle kingside',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move(dat.move)
    expect(chess.fen()).toEqual('5rk1/8/8/8/8/8/8/6K1 w - - 1 2')
  },
)

// Black king castling queenside.

test.each([{ fen: 'rk6/8/8/8/8/8/8/1K6 b q - 0 1', move: 'b8a8' }])(
  'moving black king from b8 onto rook with queenside castling-right will castle queenside',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move(dat.move)
    expect(chess.fen()).toEqual('2kr4/8/8/8/8/8/8/1K6 w - - 1 2')
  },
)

test.each([
  { fen: 'r1k5/8/8/8/8/8/8/2K5 b q - 0 1', move: 'c8a8' },
  { fen: '1rk5/8/8/8/8/8/8/2K5 b q - 0 1', move: 'c8b8' },
])(
  'moving black king from c8 onto rook with queenside castling-right will castle queenside',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move(dat.move)
    expect(chess.fen()).toEqual('2kr4/8/8/8/8/8/8/2K5 w - - 1 2')
  },
)

test.each([
  { fen: 'r2k4/8/8/8/8/8/8/3K4 b q - 0 1', move: 'd8a8' },
  { fen: '1r1k4/8/8/8/8/8/8/3K4 b q - 0 1', move: 'd8b8' },
  { fen: '2rk4/8/8/8/8/8/8/3K4 b q - 0 1', move: 'd8c8' },
])(
  'moving black king from d8 onto rook with queenside castling-right will castle queenside',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move(dat.move)
    expect(chess.fen()).toEqual('2kr4/8/8/8/8/8/8/3K4 w - - 1 2')
  },
)

test.each([
  { fen: 'r3k3/8/8/8/8/8/8/4K3 b q - 0 1', move: 'e8a8' },
  { fen: '1r2k3/8/8/8/8/8/8/4K3 b q - 0 1', move: 'e8b8' },
  { fen: '2r1k3/8/8/8/8/8/8/4K3 b q - 0 1', move: 'e8c8' },
  { fen: '3rk3/8/8/8/8/8/8/4K3 b q - 0 1', move: 'e8d8' },
])(
  'moving black king from e8 onto rook with queenside castling-right will castle queenside',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move(dat.move)
    expect(chess.fen()).toEqual('2kr4/8/8/8/8/8/8/4K3 w - - 1 2')
  },
)

test.each([
  { fen: 'r4k2/8/8/8/8/8/8/5K2 b q - 0 1', move: 'f8a8' },
  { fen: '1r3k2/8/8/8/8/8/8/5K2 b q - 0 1', move: 'f8b8' },
  { fen: '2r2k2/8/8/8/8/8/8/5K2 b q - 0 1', move: 'f8c8' },
  { fen: '3r1k2/8/8/8/8/8/8/5K2 b q - 0 1', move: 'f8d8' },
  { fen: '4rk2/8/8/8/8/8/8/5K2 b q - 0 1', move: 'f8e8' },
])(
  'moving black king from f8 onto rook with queenside castling-right will castle queenside',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move(dat.move)
    expect(chess.fen()).toEqual('2kr4/8/8/8/8/8/8/5K2 w - - 1 2')
  },
)

test.each([
  { fen: 'r5k1/8/8/8/8/8/8/6K1 b q - 0 1', move: 'g8a8' },
  { fen: '1r4k1/8/8/8/8/8/8/6K1 b q - 0 1', move: 'g8b8' },
  { fen: '2r3k1/8/8/8/8/8/8/6K1 b q - 0 1', move: 'g8c8' },
  { fen: '3r2k1/8/8/8/8/8/8/6K1 b q - 0 1', move: 'g8d8' },
  { fen: '4r1k1/8/8/8/8/8/8/6K1 b q - 0 1', move: 'g8e8' },
  { fen: '5rk1/8/8/8/8/8/8/6K1 b q - 0 1', move: 'g8f8' },
])(
  'moving black king from g8 onto rook with queenside castling-right will castle queenside',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move(dat.move)
    expect(chess.fen()).toEqual('2kr4/8/8/8/8/8/8/6K1 w - - 1 2')
  },
)

// White king castling queenside.

test.each([{ fen: '1k6/8/8/8/8/8/8/RK6 w Q - 0 1', move: 'b1a1' }])(
  'moving white king from c1 onto rook with queenside castling-right will castle queenside',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move(dat.move)
    expect(chess.fen()).toEqual('1k6/8/8/8/8/8/8/2KR4 b - - 1 1')
  },
)

test.each([
  { fen: '2k5/8/8/8/8/8/8/R1K5 w Q - 0 1', move: 'c1a1' },
  { fen: '2k5/8/8/8/8/8/8/1RK5 w Q - 0 1', move: 'c1b1' },
])(
  'moving white king from c1 onto rook with queenside castling-right will castle queenside',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move(dat.move)
    expect(chess.fen()).toEqual('2k5/8/8/8/8/8/8/2KR4 b - - 1 1')
  },
)

test.each([
  { fen: '3k4/8/8/8/8/8/8/R2K4 w Q - 0 1', move: 'd1a1' },
  { fen: '3k4/8/8/8/8/8/8/1R1K4 w Q - 0 1', move: 'd1b1' },
  { fen: '3k4/8/8/8/8/8/8/2RK4 w Q - 0 1', move: 'd1c1' },
])(
  'moving white king from d1 onto rook with queenside castling-right will castle queenside',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move(dat.move)
    expect(chess.fen()).toEqual('3k4/8/8/8/8/8/8/2KR4 b - - 1 1')
  },
)

test.each([
  { fen: '4k3/8/8/8/8/8/8/R3K3 w Q - 0 1', move: 'e1a1' },
  { fen: '4k3/8/8/8/8/8/8/1R2K3 w Q - 0 1', move: 'e1b1' },
  { fen: '4k3/8/8/8/8/8/8/2R1K3 w Q - 0 1', move: 'e1c1' },
  { fen: '4k3/8/8/8/8/8/8/3RK3 w Q - 0 1', move: 'e1d1' },
])(
  'moving white king from e1 onto rook with queenside castling-right will castle queenside',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move(dat.move)
    expect(chess.fen()).toEqual('4k3/8/8/8/8/8/8/2KR4 b - - 1 1')
  },
)

test.each([
  { fen: '5k2/8/8/8/8/8/8/R4K2 w Q - 0 1', move: 'f1a1' },
  { fen: '5k2/8/8/8/8/8/8/1R3K2 w Q - 0 1', move: 'f1b1' },
  { fen: '5k2/8/8/8/8/8/8/2R2K2 w Q - 0 1', move: 'f1c1' },
  { fen: '5k2/8/8/8/8/8/8/3R1K2 w Q - 0 1', move: 'f1d1' },
  { fen: '5k2/8/8/8/8/8/8/4RK2 w Q - 0 1', move: 'f1e1' },
])(
  'moving white king from f1 onto rook with queenside castling-right will castle queenside',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move(dat.move)
    expect(chess.fen()).toEqual('5k2/8/8/8/8/8/8/2KR4 b - - 1 1')
  },
)

test.each([
  { fen: '6k1/8/8/8/8/8/8/R5K1 w Q - 0 1', move: 'g1a1' },
  { fen: '6k1/8/8/8/8/8/8/1R4K1 w Q - 0 1', move: 'g1b1' },
  { fen: '6k1/8/8/8/8/8/8/2R3K1 w Q - 0 1', move: 'g1c1' },
  { fen: '6k1/8/8/8/8/8/8/3R2K1 w Q - 0 1', move: 'g1d1' },
  { fen: '6k1/8/8/8/8/8/8/4R1K1 w Q - 0 1', move: 'g1e1' },
  { fen: '6k1/8/8/8/8/8/8/5RK1 w Q - 0 1', move: 'g1f1' },
])(
  'moving white king from g1 onto rook with queenside castling-right will castle queenside',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move(dat.move)
    expect(chess.fen()).toEqual('6k1/8/8/8/8/8/8/2KR4 b - - 1 1')
  },
)

// White king castling kingside.

test.each([
  { fen: '1k6/8/8/8/8/8/8/1KR5 w K - 0 1', move: 'b1c1' },
  { fen: '1k6/8/8/8/8/8/8/1K1R4 w K - 0 1', move: 'b1d1' },
  { fen: '1k6/8/8/8/8/8/8/1K2R3 w K - 0 1', move: 'b1e1' },
  { fen: '1k6/8/8/8/8/8/8/1K3R2 w K - 0 1', move: 'b1f1' },
  { fen: '1k6/8/8/8/8/8/8/1K4R1 w K - 0 1', move: 'b1g1' },
  { fen: '1k6/8/8/8/8/8/8/1K5R w K - 0 1', move: 'b1h1' },
])(
  'moving white king from b1 onto rook with kingside castling-right will castle kingside',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move(dat.move)
    expect(chess.fen()).toEqual('1k6/8/8/8/8/8/8/5RK1 b - - 1 1')
  },
)

test.each([
  { fen: '2k5/8/8/8/8/8/8/2KR4 w K - 0 1', move: 'c1d1' },
  { fen: '2k5/8/8/8/8/8/8/2K1R3 w K - 0 1', move: 'c1e1' },
  { fen: '2k5/8/8/8/8/8/8/2K2R2 w K - 0 1', move: 'c1f1' },
  { fen: '2k5/8/8/8/8/8/8/2K3R1 w K - 0 1', move: 'c1g1' },
  { fen: '2k5/8/8/8/8/8/8/2K4R w K - 0 1', move: 'c1h1' },
])(
  'moving white king from c1 onto rook with kingside castling-right will castle kingside',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move(dat.move)
    expect(chess.fen()).toEqual('2k5/8/8/8/8/8/8/5RK1 b - - 1 1')
  },
)

test.each([
  { fen: '3k4/8/8/8/8/8/8/3KR3 w K - 0 1', move: 'd1e1' },
  { fen: '3k4/8/8/8/8/8/8/3K1R2 w K - 0 1', move: 'd1f1' },
  { fen: '3k4/8/8/8/8/8/8/3K2R1 w K - 0 1', move: 'd1g1' },
  { fen: '3k4/8/8/8/8/8/8/3K3R w K - 0 1', move: 'd1h1' },
])(
  'moving white king from d1 onto rook with kingside castling-right will castle kingside',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move(dat.move)
    expect(chess.fen()).toEqual('3k4/8/8/8/8/8/8/5RK1 b - - 1 1')
  },
)

test.each([
  { fen: '4k3/8/8/8/8/8/8/4KR2 w K - 0 1', move: 'e1f1' },
  { fen: '4k3/8/8/8/8/8/8/4K1R1 w K - 0 1', move: 'e1g1' },
  { fen: '4k3/8/8/8/8/8/8/4K2R w K - 0 1', move: 'e1h1' },
])(
  'moving white king from e1 onto rook with kingside castling-right will castle kingside',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move(dat.move)
    expect(chess.fen()).toEqual('4k3/8/8/8/8/8/8/5RK1 b - - 1 1')
  },
)

test.each([
  { fen: '5k2/8/8/8/8/8/8/5KR1 w K - 0 1', move: 'f1g1' },
  { fen: '5k2/8/8/8/8/8/8/5K1R w K - 0 1', move: 'f1h1' },
])(
  'moving white king from f1 onto rook with kingside castling-right will castle kingside',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move(dat.move)
    expect(chess.fen()).toEqual('5k2/8/8/8/8/8/8/5RK1 b - - 1 1')
  },
)

test.each([{ fen: '6k1/8/8/8/8/8/8/6KR w K - 0 1', move: 'g1h1' }])(
  'moving white king from g1 onto rook with kingside castling-right will castle kingside',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    chess.move(dat.move)
    expect(chess.fen()).toEqual('6k1/8/8/8/8/8/8/5RK1 b - - 1 1')
  },
)

test.each([
  { fen: '1kr5/8/8/8/8/8/8/1K6 b - - 0 1', move: 'b8c8' },
  { fen: '1k1r4/8/8/8/8/8/8/1K6 b - - 0 1', move: 'b8d8' },
  { fen: '1k2r3/8/8/8/8/8/8/1K6 b - - 0 1', move: 'b8e8' },
  { fen: '1k3r2/8/8/8/8/8/8/1K6 b - - 0 1', move: 'b8f8' },
  { fen: '1k4r1/8/8/8/8/8/8/1K6 b - - 0 1', move: 'b8g8' },
  { fen: '1k5r/8/8/8/8/8/8/1K6 b - - 0 1', move: 'b8h8' },

  { fen: '2kr4/8/8/8/8/8/8/2K5 b - - 0 1', move: 'c8d8' },
  { fen: '2k1r3/8/8/8/8/8/8/2K5 b - - 0 1', move: 'c8e8' },
  { fen: '2k2r2/8/8/8/8/8/8/2K5 b - - 0 1', move: 'c8f8' },
  { fen: '2k3r1/8/8/8/8/8/8/2K5 b - - 0 1', move: 'c8g8' },
  { fen: '2k4r/8/8/8/8/8/8/2K5 b - - 0 1', move: 'c8h8' },

  { fen: '3kr3/8/8/8/8/8/8/3K4 b - - 0 1', move: 'd8e8' },
  { fen: '3k1r2/8/8/8/8/8/8/3K4 b - - 0 1', move: 'd8f8' },
  { fen: '3k2r1/8/8/8/8/8/8/3K4 b - - 0 1', move: 'd8g8' },
  { fen: '3k3r/8/8/8/8/8/8/3K4 b - - 0 1', move: 'd8h8' },

  { fen: '4kr2/8/8/8/8/8/8/4K3 b - - 0 1', move: 'e8f8' },
  { fen: '4k1r1/8/8/8/8/8/8/4K3 b - - 0 1', move: 'e8g8' },
  { fen: '4k2r/8/8/8/8/8/8/4K3 b - - 0 1', move: 'e8h8' },

  { fen: '5kr1/8/8/8/8/8/8/5K2 b - - 0 1', move: 'f8g8' },
  { fen: '5k1r/8/8/8/8/8/8/5K2 b - - 0 1', move: 'f8h8' },

  { fen: '6kr/8/8/8/8/8/8/6K1 b - - 0 1', move: 'g8h8' },
])(
  'moving black king onto kingside rook without castling-right will throw error',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    expect(() => {
      chess.move(dat.move)
    }).toThrow('Invalid move:')
  },
)

test.each([
  { fen: 'rk6/8/8/8/8/8/8/1K6 b - - 0 1', move: 'b8a8' },

  { fen: 'r1k5/8/8/8/8/8/8/2K5 b - - 0 1', move: 'c8a8' },
  { fen: '1rk5/8/8/8/8/8/8/2K5 b - - 0 1', move: 'c8b8' },

  { fen: 'r2k4/8/8/8/8/8/8/3K4 b - - 0 1', move: 'd8a8' },
  { fen: '1r1k4/8/8/8/8/8/8/3K4 b - - 0 1', move: 'd8b8' },
  { fen: '2rk4/8/8/8/8/8/8/3K4 b - - 0 1', move: 'd8c8' },

  { fen: 'r3k3/8/8/8/8/8/8/4K3 b - - 0 1', move: 'e8a8' },
  { fen: '1r2k3/8/8/8/8/8/8/4K3 b - - 0 1', move: 'e8b8' },
  { fen: '2r1k3/8/8/8/8/8/8/4K3 b - - 0 1', move: 'e8c8' },
  { fen: '3rk3/8/8/8/8/8/8/4K3 b - - 0 1', move: 'e8d8' },

  { fen: 'r4k2/8/8/8/8/8/8/5K2 b - - 0 1', move: 'f8a8' },
  { fen: '1r3k2/8/8/8/8/8/8/5K2 b - - 0 1', move: 'f8b8' },
  { fen: '2r2k2/8/8/8/8/8/8/5K2 b - - 0 1', move: 'f8c8' },
  { fen: '3r1k2/8/8/8/8/8/8/5K2 b - - 0 1', move: 'f8d8' },
  { fen: '4rk2/8/8/8/8/8/8/5K2 b - - 0 1', move: 'f8e8' },

  { fen: 'r5k1/8/8/8/8/8/8/6K1 b - - 0 1', move: 'g8a8' },
  { fen: '1r4k1/8/8/8/8/8/8/6K1 b - - 0 1', move: 'g8b8' },
  { fen: '2r3k1/8/8/8/8/8/8/6K1 b - - 0 1', move: 'g8c8' },
  { fen: '3r2k1/8/8/8/8/8/8/6K1 b - - 0 1', move: 'g8d8' },
  { fen: '4r1k1/8/8/8/8/8/8/6K1 b - - 0 1', move: 'g8e8' },
  { fen: '5rk1/8/8/8/8/8/8/6K1 b - - 0 1', move: 'g8f8' },
])(
  'moving black king onto queenside rook without castling-right will throw error',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    expect(() => {
      chess.move(dat.move)
    }).toThrow('Invalid move:')
  },
)

test.each([
  { fen: '1k6/8/8/8/8/8/8/1KR5 w - - 0 1', move: 'b1c1' },
  { fen: '1k6/8/8/8/8/8/8/1K1R4 w - - 0 1', move: 'b1d1' },
  { fen: '1k6/8/8/8/8/8/8/1K2R3 w - - 0 1', move: 'b1e1' },
  { fen: '1k6/8/8/8/8/8/8/1K3R2 w - - 0 1', move: 'b1f1' },
  { fen: '1k6/8/8/8/8/8/8/1K4R1 w - - 0 1', move: 'b1g1' },
  { fen: '1k6/8/8/8/8/8/8/1K5R w - - 0 1', move: 'b1h1' },

  { fen: '2k5/8/8/8/8/8/8/2KR4 w - - 0 1', move: 'c1d1' },
  { fen: '2k5/8/8/8/8/8/8/2K1R3 w - - 0 1', move: 'c1e1' },
  { fen: '2k5/8/8/8/8/8/8/2K2R2 w - - 0 1', move: 'c1f1' },
  { fen: '2k5/8/8/8/8/8/8/2K3R1 w - - 0 1', move: 'c1g1' },
  { fen: '2k5/8/8/8/8/8/8/2K4R w - - 0 1', move: 'c1h1' },

  { fen: '3k4/8/8/8/8/8/8/3KR3 w - - 0 1', move: 'd1e1' },
  { fen: '3k4/8/8/8/8/8/8/3K1R2 w - - 0 1', move: 'd1f1' },
  { fen: '3k4/8/8/8/8/8/8/3K2R1 w - - 0 1', move: 'd1g1' },
  { fen: '3k4/8/8/8/8/8/8/3K3R w - - 0 1', move: 'd1h1' },

  { fen: '4k3/8/8/8/8/8/8/4KR2 w - - 0 1', move: 'e1f1' },
  { fen: '4k3/8/8/8/8/8/8/4K1R1 w - - 0 1', move: 'e1g1' },
  { fen: '4k3/8/8/8/8/8/8/4K2R w - - 0 1', move: 'e1h1' },

  { fen: '5k2/8/8/8/8/8/8/5KR1 w - - 0 1', move: 'f1g1' },
  { fen: '5k2/8/8/8/8/8/8/5K1R w - - 0 1', move: 'f1h1' },

  { fen: '6k1/8/8/8/8/8/8/6KR w - - 0 1', move: 'g1h1' },
])(
  'moving white king onto kingside rook without castling-right will throw error',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    expect(() => {
      chess.move(dat.move)
    }).toThrow('Invalid move:')
  },
)

test.each([
  { fen: '1k6/8/8/8/8/8/8/RK6 w - - 0 1', move: 'b1a1' },

  { fen: '2k5/8/8/8/8/8/8/R1K5 w - - 0 1', move: 'c1a1' },
  { fen: '2k5/8/8/8/8/8/8/1RK5 w - - 0 1', move: 'c1b1' },

  { fen: '3k4/8/8/8/8/8/8/R2K4 w - - 0 1', move: 'd1a1' },
  { fen: '3k4/8/8/8/8/8/8/1R1K4 w - - 0 1', move: 'd1b1' },
  { fen: '3k4/8/8/8/8/8/8/2RK4 w - - 0 1', move: 'd1c1' },

  { fen: '4k3/8/8/8/8/8/8/R3K3 w - - 0 1', move: 'e1a1' },
  { fen: '4k3/8/8/8/8/8/8/1R2K3 w - - 0 1', move: 'e1b1' },
  { fen: '4k3/8/8/8/8/8/8/2R1K3 w - - 0 1', move: 'e1c1' },
  { fen: '4k3/8/8/8/8/8/8/3RK3 w - - 0 1', move: 'e1d1' },

  { fen: '5k2/8/8/8/8/8/8/R4K2 w - - 0 1', move: 'f1a1' },
  { fen: '5k2/8/8/8/8/8/8/1R3K2 w - - 0 1', move: 'f1b1' },
  { fen: '5k2/8/8/8/8/8/8/2R2K2 w - - 0 1', move: 'f1c1' },
  { fen: '5k2/8/8/8/8/8/8/3R1K2 w - - 0 1', move: 'f1d1' },
  { fen: '5k2/8/8/8/8/8/8/4RK2 w - - 0 1', move: 'f1e1' },

  { fen: '6k1/8/8/8/8/8/8/R5K1 w - - 0 1', move: 'g1a1' },
  { fen: '6k1/8/8/8/8/8/8/1R4K1 w - - 0 1', move: 'g1b1' },
  { fen: '6k1/8/8/8/8/8/8/2R3K1 w - - 0 1', move: 'g1c1' },
  { fen: '6k1/8/8/8/8/8/8/3R2K1 w - - 0 1', move: 'g1d1' },
  { fen: '6k1/8/8/8/8/8/8/4R1K1 w - - 0 1', move: 'g1e1' },
  { fen: '6k1/8/8/8/8/8/8/5RK1 w - - 0 1', move: 'g1f1' },
])(
  'moving white king onto queenside rook without castling-right will throw error',
  (dat) => {
    const chess = new Chess(dat.fen, { enable960: true })
    expect(() => {
      chess.move(dat.move)
    }).toThrow('Invalid move:')
  },
)

test.each([
  { fen: '1krN4/8/8/8/8/8/8/1K6 b k - 0 1', move: 'b8c8' },
  { fen: '1kBr4/8/8/8/8/8/8/1K6 b k - 0 1', move: 'b8d8' },
  { fen: '1k1Rr3/8/8/8/8/8/8/1K6 b k - 0 1', move: 'b8e8' },
  { fen: '1k2Qr2/8/8/8/8/8/8/1K6 b k - 0 1', move: 'b8f8' },
  { fen: '1k3Kr1/8/8/8/8/8/8/8 b k - 0 1', move: 'b8g8' },
  { fen: '1k4br/8/8/8/8/8/8/1K6 b k - 0 1', move: 'b8h8' },
])('black castle kingside will fail if piece is on castle path', (dat) => {
  const chess = new Chess(dat.fen, { enable960: true })
  expect(() => chess.move(dat.move)).toThrow('Invalid move:')
})

test.each([
  { fen: 'rB4k1/8/8/8/8/8/8/6K1 b q - 0 1', move: 'g8a8' },
  { fen: '1rN3k1/8/8/8/8/8/8/6K1 b q - 0 1', move: 'g8b8' },
  { fen: '2rQ2k1/8/8/8/8/8/8/6K1 b q - 0 1', move: 'g8c8' },
  { fen: '3rR1k1/8/8/8/8/8/8/6K1 b q - 0 1', move: 'g8d8' },
  { fen: '4rKk1/8/8/8/8/8/8/8 b q - 0 1', move: 'g8e8' },
  { fen: '4brk1/8/8/8/8/8/8/6K1 b q - 0 1', move: 'g8f8' },
])('black castle queenside will fail if piece is on castle path', (dat) => {
  const chess = new Chess(dat.fen, { enable960: true })
  expect(() => chess.move(dat.move)).toThrow('Invalid move:')
})

test.each([
  { fen: '6k1/8/8/8/8/8/8/R4nK1 w Q - 0 1', move: 'g1a1' },
  { fen: '6k1/8/8/8/8/8/8/1R3qK1 w Q - 0 1', move: 'g1b1' },
  { fen: '6k1/8/8/8/8/8/8/2R2bK1 w Q - 0 1', move: 'g1c1' },
  { fen: '6k1/8/8/8/8/8/8/3R1rK1 w Q - 0 1', move: 'g1d1' },
  { fen: '8/8/8/8/8/8/8/4RkK1 w Q - 0 1', move: 'g1e1' },
  { fen: '6k1/8/8/8/8/8/8/4NRK1 w Q - 0 1', move: 'g1f1' },
])('white castle queenside will fail if piece is on castle path', (dat) => {
  const chess = new Chess(dat.fen, { enable960: true })
  expect(() => chess.move(dat.move)).toThrow('Invalid move:')
})

test.each([
  { fen: '1k6/8/8/8/8/8/8/1KRb4 w K - 0 1', move: 'b1c1' },
  { fen: '1k6/8/8/8/8/8/8/1KrR4 w K - 0 1', move: 'b1d1' },
  { fen: '1k6/8/8/8/8/8/8/1K1nR3 w K - 0 1', move: 'b1e1' },
  { fen: '1k6/8/8/8/8/8/8/1K2qR2 w K - 0 1', move: 'b1f1' },
  { fen: '8/8/8/8/8/8/8/1K3kR1 w K - 0 1', move: 'b1g1' },
  { fen: '1k6/8/8/8/8/8/8/1K2n2R w K - 0 1', move: 'b1h1' },
])('white castle kingside will fail if piece is on castle path', (dat) => {
  const chess = new Chess(dat.fen, { enable960: true })
  expect(() => chess.move(dat.move)).toThrow('Invalid move:')
})

test.each([
  { fen: '1kr5/8/8/8/8/1R6/8/1K6 b k - 0 1', move: 'b8c8' },
  { fen: '1k1r4/8/8/8/8/2R5/8/1K6 b k - 0 1', move: 'b8d8' },
  { fen: '1k2r3/8/8/8/8/3R4/8/1K6 b k - 0 1', move: 'b8e8' },
  { fen: '1k3r2/8/8/8/8/4R3/8/1K6 b k - 0 1', move: 'b8f8' },
  { fen: '1k4r1/8/8/8/8/5R2/8/1K6 b k - 0 1', move: 'b8g8' },
  { fen: '1k5r/8/8/8/8/6R1/8/1K6 b k - 0 1', move: 'b8h8' },
])('black kingside castle will fail if castle path is under attack', (dat) => {
  const chess = new Chess(dat.fen, { enable960: true })
  expect(() => chess.move(dat.move)).toThrow('Invalid move:')
})

test.each([
  { fen: 'r5k1/8/8/8/8/6R1/8/6K1 b q - 0 1', move: 'g8a8' },
  { fen: '1r4k1/8/8/8/8/5R2/8/6K1 b q - 0 1', move: 'g8b8' },
  { fen: '2r3k1/8/8/8/8/4R3/8/6K1 b q - 0 1', move: 'g8c8' },
  { fen: '3r2k1/8/8/8/8/3R4/8/6K1 b q - 0 1', move: 'g8d8' },
  { fen: '4r1k1/3K4/8/8/8/8/8/8 b q - 0 1', move: 'g8e8' },
  { fen: '5rk1/1P6/8/8/8/8/8/6K1 b q - 0 1', move: 'g8f8' },
])('black queenside castle will fail if castle path is under attack', (dat) => {
  const chess = new Chess(dat.fen, { enable960: true })
  expect(() => chess.move(dat.move)).toThrow('Invalid move:')
})

test.each([
  { fen: '6k1/8/6r1/8/8/8/8/R5K1 w Q - 0 1', move: 'g1a1' },
  { fen: '6k1/8/5r2/8/8/8/8/1R4K1 w Q - 0 1', move: 'g1b1' },
  { fen: '6k1/8/4r3/8/8/8/8/2R3K1 w Q - 0 1', move: 'g1c1' },
  { fen: '6k1/8/3r4/8/8/8/8/3R2K1 w Q - 0 1', move: 'g1d1' },
  { fen: '6k1/8/2r5/8/8/8/8/4R1K1 w Q - 0 1', move: 'g1e1' },
  { fen: '6k1/8/8/8/8/8/1p6/5RK1 w Q - 0 1', move: 'g1f1' },
])('white queenside castle will fail if castle path is under attack', (dat) => {
  const chess = new Chess(dat.fen, { enable960: true })
  expect(() => chess.move(dat.move)).toThrow('Invalid move:')
})

test.each([
  { fen: '1k6/8/1r6/8/8/8/8/1KR5 w K - 0 1', move: 'b1c1' },
  { fen: '1k6/8/2r5/8/8/8/8/1K1R4 w K - 0 1', move: 'b1d1' },
  { fen: '1k6/8/3r4/8/8/8/8/1K2R3 w K - 0 1', move: 'b1e1' },
  { fen: '1k6/8/4r3/8/8/8/8/1K3R2 w K - 0 1', move: 'b1f1' },
  { fen: '1k6/8/5r2/8/8/8/8/1K4R1 w K - 0 1', move: 'b1g1' },
  { fen: '1k6/8/8/8/8/8/7p/1K5R w K - 0 1', move: 'b1h1' },
])('white kingside castle will fail if castle path is under attack', (dat) => {
  const chess = new Chess(dat.fen, { enable960: true })
  expect(() => chess.move(dat.move)).toThrow('Invalid move:')
})
