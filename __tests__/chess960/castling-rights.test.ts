import { BLACK, Chess, KING, QUEEN, WHITE } from '../../src/chess'
import { expect, test } from 'vitest'

// Tests whether castling-rights are set correctly based on the castling flags
// in the FEN and the king and rook(s) on the board.
// Also checks setting castling-rights programmatically.

test.each([
  'rkr5/8/8/8/8/8/8/RKR5 w KQkq - 0 1',
  'rk1r4/8/8/8/8/8/8/RK1R4 w KQkq - 0 1',
  'rk2r3/8/8/8/8/8/8/RK2R3 w KQkq - 0 1',
  'rk3r2/8/8/8/8/8/8/RK3R2 w KQkq - 0 1',
  'rk4r1/8/8/8/8/8/8/RK4R1 w KQkq - 0 1',
  'rk5r/8/8/8/8/8/8/RK5R w KQkq - 0 1',

  'r1kr4/8/8/8/8/8/8/R1KR4 w KQkq - 0 1',
  'r1k1r3/8/8/8/8/8/8/R1K1R3 w KQkq - 0 1',
  'r1k2r2/8/8/8/8/8/8/R1K2R2 w KQkq - 0 1',
  'r1k3r1/8/8/8/8/8/8/R1K3R1 w KQkq - 0 1',
  'r1k4r/8/8/8/8/8/8/R1K4R w KQkq - 0 1',

  'r2kr3/8/8/8/8/8/8/R2KR3 w KQkq - 0 1',
  'r2k1r2/8/8/8/8/8/8/R2K1R2 w KQkq - 0 1',
  'r2k2r1/8/8/8/8/8/8/R2K2R1 w KQkq - 0 1',
  'r2k3r/8/8/8/8/8/8/R2K3R w KQkq - 0 1',

  'r3kr2/8/8/8/8/8/8/R3KR2 w KQkq - 0 1',
  'r3k1r1/8/8/8/8/8/8/R3K1R1 w KQkq - 0 1',
  'r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1',

  'r4kr1/8/8/8/8/8/8/R4KR1 w KQkq - 0 1',
  'r4k1r/8/8/8/8/8/8/R4K1R w KQkq - 0 1',

  'r5kr/8/8/8/8/8/8/R5KR w KQkq - 0 1',

  '1rkr4/8/8/8/8/8/8/1RKR4 w KQkq - 0 1',
  '1rk1r3/8/8/8/8/8/8/1RK1R3 w KQkq - 0 1',
  '1rk2r2/8/8/8/8/8/8/1RK2R2 w KQkq - 0 1',
  '1rk3r1/8/8/8/8/8/8/1RK3R1 w KQkq - 0 1',
  '1rk4r/8/8/8/8/8/8/1RK4R w KQkq - 0 1',

  '1r1kr3/8/8/8/8/8/8/1R1KR3 w KQkq - 0 1',
  '1r1k1r2/8/8/8/8/8/8/1R1K1R2 w KQkq - 0 1',
  '1r1k2r1/8/8/8/8/8/8/1R1K2R1 w KQkq - 0 1',
  '1r1k3r/8/8/8/8/8/8/1R1K3R w KQkq - 0 1',

  '1r2kr2/8/8/8/8/8/8/1R2KR2 w KQkq - 0 1',
  '1r2k1r1/8/8/8/8/8/8/1R2K1R1 w KQkq - 0 1',
  '1r2k2r/8/8/8/8/8/8/1R2K2R w KQkq - 0 1',

  '1r3kr1/8/8/8/8/8/8/1R3KR1 w KQkq - 0 1',
  '1r3k1r/8/8/8/8/8/8/1R3K1R w KQkq - 0 1',

  '1r4kr/8/8/8/8/8/8/1R4KR w KQkq - 0 1',

  '2rkr3/8/8/8/8/8/8/2RKR3 w KQkq - 0 1',
  '2rk1r2/8/8/8/8/8/8/2RK1R2 w KQkq - 0 1',
  '2rk2r1/8/8/8/8/8/8/2RK2R1 w KQkq - 0 1',
  '2rk3r/8/8/8/8/8/8/2RK3R w KQkq - 0 1',

  '2r1kr2/8/8/8/8/8/8/2R1KR2 w KQkq - 0 1',
  '2r1k1r1/8/8/8/8/8/8/2R1K1R1 w KQkq - 0 1',
  '2r1k2r/8/8/8/8/8/8/2R1K2R w KQkq - 0 1',

  '2r2kr1/8/8/8/8/8/8/2R2KR1 w KQkq - 0 1',
  '2r2k1r/8/8/8/8/8/8/2R2K1R w KQkq - 0 1',

  '2r2k1r/8/8/8/8/8/8/2R2K1R w KQkq - 0 1',

  '3rkr2/8/8/8/8/8/8/3RKR2 w KQkq - 0 1',
  '3rk1r1/8/8/8/8/8/8/3RK1R1 w KQkq - 0 1',
  '3rk2r/8/8/8/8/8/8/3RK2R w KQkq - 0 1',

  '3r1kr1/8/8/8/8/8/8/3R1KR1 w KQkq - 0 1',
  '3r1k1r/8/8/8/8/8/8/3R1K1R w KQkq - 0 1',

  '3r2kr/8/8/8/8/8/8/3R2KR w KQkq - 0 1',

  '4rkr1/8/8/8/8/8/8/4RKR1 w KQkq - 0 1',
  '4rk1r/8/8/8/8/8/8/4RK1R w KQkq - 0 1',

  '4r1kr/8/8/8/8/8/8/4R1KR w KQkq - 0 1',

  '5rkr/8/8/8/8/8/8/5RKR w KQkq - 0 1',
])(
  'should enable all castling rights when kings and rooks are aligned (every combination)',
  (fen) => {
    const chess = new Chess(fen, { chess960: true })
    expect(chess.getCastlingRights(BLACK)[KING]).toBeTruthy()
    expect(chess.getCastlingRights(BLACK)[QUEEN]).toBeTruthy()
    expect(chess.getCastlingRights(WHITE)[KING]).toBeTruthy()
    expect(chess.getCastlingRights(WHITE)[QUEEN]).toBeTruthy()
  },
)

test.each([
  '5rk1/8/8/8/8/8/8/6K1 w q - 0 1',
  '4r1k1/8/8/8/8/8/8/6K1 w q - 0 1',
  '3r2k1/8/8/8/8/8/8/6K1 w q - 0 1',
  '2r3k1/8/8/8/8/8/8/6K1 w q - 0 1',
  '1r4k1/8/8/8/8/8/8/6K1 w q - 0 1',
  'r5k1/8/8/8/8/8/8/6K1 w q - 0 1',

  '4rk2/8/8/8/8/8/8/5K2 w q - 0 1',
  '3r1k2/8/8/8/8/8/8/5K2 w q - 0 1',
  '2r2k2/8/8/8/8/8/8/5K2 w q - 0 1',
  '1r3k2/8/8/8/8/8/8/5K2 w q - 0 1',
  'r4k2/8/8/8/8/8/8/5K2 w q - 0 1',

  '3rk3/8/8/8/8/8/8/4K3 w q - 0 1',
  '2r1k3/8/8/8/8/8/8/4K3 w q - 0 1',
  '1r2k3/8/8/8/8/8/8/4K3 w q - 0 1',
  'r3k3/8/8/8/8/8/8/4K3 w q - 0 1',

  '2rk4/8/8/8/8/8/8/3K4 w q - 0 1',
  '1r1k4/8/8/8/8/8/8/3K4 w q - 0 1',
  'r2k4/8/8/8/8/8/8/3K4 w q - 0 1',

  '1rk5/8/8/8/8/8/8/2K5 w q - 0 1',
  'r1k5/8/8/8/8/8/8/2K5 w q - 0 1',

  'rk6/8/8/8/8/8/8/1K6 w q - 0 1',
])(
  'should enable black queenside castling-right when black rook is on queenside (every combination)',
  (fen) => {
    const chess = new Chess(fen, { chess960: true })
    expect(chess.getCastlingRights(BLACK)[QUEEN]).toBeTruthy()
    expect(chess.getCastlingRights(BLACK)[KING]).toBeFalsy()
    expect(chess.getCastlingRights(WHITE)[QUEEN]).toBeFalsy()
    expect(chess.getCastlingRights(WHITE)[KING]).toBeFalsy()
  },
)

test.each([
  '1kr5/8/8/8/8/8/8/1K6 w k - 0 1',
  '1k1r4/8/8/8/8/8/8/1K6 w k - 0 1',
  '1k2r3/8/8/8/8/8/8/1K6 w k - 0 1',
  '1k3r2/8/8/8/8/8/8/1K6 w k - 0 1',
  '1k4r1/8/8/8/8/8/8/1K6 w k - 0 1',
  '1k5r/8/8/8/8/8/8/1K6 w k - 0 1',

  '2kr4/8/8/8/8/8/8/2K5 w k - 0 1',
  '2k1r3/8/8/8/8/8/8/2K5 w k - 0 1',
  '2k2r2/8/8/8/8/8/8/2K5 w k - 0 1',
  '2k3r1/8/8/8/8/8/8/2K5 w k - 0 1',
  '2k4r/8/8/8/8/8/8/2K5 w k - 0 1',

  '3kr3/8/8/8/8/8/8/3K4 w k - 0 1',
  '3k1r2/8/8/8/8/8/8/3K4 w k - 0 1',
  '3k2r1/8/8/8/8/8/8/3K4 w k - 0 1',
  '3k3r/8/8/8/8/8/8/3K4 w k - 0 1',

  '4kr2/8/8/8/8/8/8/4K3 w k - 0 1',
  '4k1r1/8/8/8/8/8/8/4K3 w k - 0 1',
  '4k2r/8/8/8/8/8/8/4K3 w k - 0 1',

  '5kr1/8/8/8/8/8/8/5K2 w k - 0 1',
  '5k1r/8/8/8/8/8/8/5K2 w k - 0 1',

  '6kr/8/8/8/8/8/8/6K1 w k - 0 1',
])(
  'should enable black kingside castling-right when black rook is on kingside (every combination)',
  (fen) => {
    const chess = new Chess(fen, { chess960: true })
    expect(chess.getCastlingRights(BLACK)[QUEEN]).toBeFalsy()
    expect(chess.getCastlingRights(BLACK)[KING]).toBeTruthy()
    expect(chess.getCastlingRights(WHITE)[QUEEN]).toBeFalsy()
    expect(chess.getCastlingRights(WHITE)[KING]).toBeFalsy()
  },
)

test.each([
  '6k1/8/8/8/8/8/8/5RK1 w Q - 0 1',
  '6k1/8/8/8/8/8/8/4R1K1 w Q - 0 1',
  '6k1/8/8/8/8/8/8/3R2K1 w Q - 0 1',
  '6k1/8/8/8/8/8/8/2R3K1 w Q - 0 1',
  '6k1/8/8/8/8/8/8/1R4K1 w Q - 0 1',
  '6k1/8/8/8/8/8/8/R5K1 w Q - 0 1',

  '5k2/8/8/8/8/8/8/4RK2 w Q - 0 1',
  '5k2/8/8/8/8/8/8/3R1K2 w Q - 0 1',
  '5k2/8/8/8/8/8/8/2R2K2 w Q - 0 1',
  '5k2/8/8/8/8/8/8/1R3K2 w Q - 0 1',
  '5k2/8/8/8/8/8/8/R4K2 w Q - 0 1',

  '4k3/8/8/8/8/8/8/2R1K3 w Q - 0 1',
  '4k3/8/8/8/8/8/8/3RK3 w Q - 0 1',
  '4k3/8/8/8/8/8/8/1R2K3 w Q - 0 1',
  '4k3/8/8/8/8/8/8/R3K3 w Q - 0 1',

  '3k4/8/8/8/8/8/8/2RK4 w Q - 0 1',
  '3k4/8/8/8/8/8/8/1R1K4 w Q - 0 1',
  '3k4/8/8/8/8/8/8/R2K4 w Q - 0 1',

  '2k5/8/8/8/8/8/8/1RK5 w Q - 0 1',
  '2k5/8/8/8/8/8/8/R1K5 w Q - 0 1',

  '1k6/8/8/8/8/8/8/RK6 w Q - 0 1',
])(
  'should enable white queenside castling-right when white rook is on queenside (every combination)',
  (fen) => {
    const chess = new Chess(fen, { chess960: true })
    expect(chess.getCastlingRights(BLACK)[QUEEN]).toBeFalsy()
    expect(chess.getCastlingRights(BLACK)[KING]).toBeFalsy()
    expect(chess.getCastlingRights(WHITE)[QUEEN]).toBeTruthy()
    expect(chess.getCastlingRights(WHITE)[KING]).toBeFalsy()
  },
)

test.each([
  '1k6/8/8/8/8/8/8/1KR5 w K - 0 1',
  '1k6/8/8/8/8/8/8/1K1R4 w K - 0 1',
  '1k6/8/8/8/8/8/8/1K2R3 w K - 0 1',
  '1k6/8/8/8/8/8/8/1K3R2 w K - 0 1',
  '1k6/8/8/8/8/8/8/1K4R1 w K - 0 1',
  '1k6/8/8/8/8/8/8/1K5R w K - 0 1',

  '2k5/8/8/8/8/8/8/2KR4 w K - 0 1',
  '2k5/8/8/8/8/8/8/2K1R3 w K - 0 1',
  '2k5/8/8/8/8/8/8/2K2R2 w K - 0 1',
  '2k5/8/8/8/8/8/8/2K3R1 w K - 0 1',
  '2k5/8/8/8/8/8/8/2K4R w K - 0 1',

  '3k4/8/8/8/8/8/8/3KR3 w K - 0 1',
  '3k4/8/8/8/8/8/8/3K1R2 w K - 0 1',
  '3k4/8/8/8/8/8/8/3K2R1 w K - 0 1',
  '3k4/8/8/8/8/8/8/3K3R w K - 0 1',

  '4k3/8/8/8/8/8/8/4KR2 w K - 0 1',
  '4k3/8/8/8/8/8/8/4K1R1 w K - 0 1',
  '4k3/8/8/8/8/8/8/4K2R w K - 0 1',

  '5k2/8/8/8/8/8/8/5KR1 w K - 0 1',
  '5k2/8/8/8/8/8/8/5K1R w K - 0 1',

  '6k1/8/8/8/8/8/8/6KR w K - 0 1',
])(
  'should enable white kingside castling-right when white rook is on kingside (every combination)',
  (fen) => {
    const chess = new Chess(fen, { chess960: true })
    expect(chess.getCastlingRights(BLACK)[QUEEN]).toBeFalsy()
    expect(chess.getCastlingRights(BLACK)[KING]).toBeFalsy()
    expect(chess.getCastlingRights(WHITE)[QUEEN]).toBeFalsy()
    expect(chess.getCastlingRights(WHITE)[KING]).toBeTruthy()
  },
)

test.each([
  'r6k/8/8/8/8/8/8/7K w q - 0 1',
  '1r5k/8/8/8/8/8/8/7K w q - 0 1',
  '2r4k/8/8/8/8/8/8/7K w q - 0 1',
  '3r3k/8/8/8/8/8/8/7K w q - 0 1',
  '4r2k/8/8/8/8/8/8/7K w q - 0 1',
  '5r1k/8/8/8/8/8/8/7K w q - 0 1',
  '6rk/8/8/8/8/8/8/7K w q - 0 1',
])(
  'should disable black queenside castling-right when black king is on h-column',
  (fen) => {
    const chess = new Chess(fen, { chess960: true })
    expect(chess.getCastlingRights(BLACK)[QUEEN]).toBeFalsy()
  },
)

test.each([
  'kr6/8/8/8/8/8/8/K7 w k - 0 1',
  'k1r5/8/8/8/8/8/8/K7 w k - 0 1',
  'k2r4/8/8/8/8/8/8/K7 w k - 0 1',
  'k3r3/8/8/8/8/8/8/K7 w k - 0 1',
  'k4r2/8/8/8/8/8/8/K7 w k - 0 1',
  'k5r1/8/8/8/8/8/8/K7 w k - 0 1',
  'k6r/8/8/8/8/8/8/K7 w k - 0 1',
])(
  'should disable black kingside castling-right when black king is on a-column',
  (fen) => {
    const chess = new Chess(fen, { chess960: true })
    expect(chess.getCastlingRights(BLACK)[KING]).toBeFalsy()
  },
)

test.each([
  '7k/8/8/8/8/8/8/R6K w Q - 0 1',
  '7k/8/8/8/8/8/8/1R5K w Q - 0 1',
  '7k/8/8/8/8/8/8/2R4K w Q - 0 1',
  '7k/8/8/8/8/8/8/3R3K w Q - 0 1',
  '7k/8/8/8/8/8/8/4R2K w Q - 0 1',
  '7k/8/8/8/8/8/8/5R1K w Q - 0 1',
  '7k/8/8/8/8/8/8/6RK w Q - 0 1',
])(
  'should disable white queenside castling-right when white king is in h-column',
  (fen) => {
    const chess = new Chess(fen, { chess960: true })
    expect(chess.getCastlingRights(WHITE)[QUEEN]).toBeFalsy()
  },
)

test.each([
  'k7/p7/8/8/8/8/8/KR6 w K - 0 1',
  'k7/p7/8/8/8/8/8/K1R5 w K - 0 1',
  'k7/p7/8/8/8/8/8/K2R4 w K - 0 1',
  'k7/p7/8/8/8/8/8/K3R3 w K - 0 1',
  'k7/p7/8/8/8/8/8/K4R2 w K - 0 1',
  'k7/p7/8/8/8/8/8/K5R1 w K - 0 1',
  'k7/p7/8/8/8/8/8/K6R w K - 0 1',
])(
  'should disable white kingside castling-right when white king is in a-column',
  (fen) => {
    const chess = new Chess(fen, { chess960: true })
    expect(chess.getCastlingRights(WHITE)[KING]).toBeFalsy()
  },
)

test.each([
  'r3k2r/8/8/8/8/8/8/R3K2R w KK - 0 1',
  'r3k2r/8/8/8/8/8/8/R3K2R w QQ - 0 1',
  'r3k2r/8/8/8/8/8/8/R3K2R w kk - 0 1',
  'r3k2r/8/8/8/8/8/8/R3K2R w qq - 0 1',

  'r3k2r/8/8/8/8/8/8/R3K2R w AA - 0 1',
  'r3k2r/8/8/8/8/8/8/R3K2R w BB - 0 1',
  'r3k2r/8/8/8/8/8/8/R3K2R w CC - 0 1',
  'r3k2r/8/8/8/8/8/8/R3K2R w DD - 0 1',
  'r3k2r/8/8/8/8/8/8/R3K2R w EE - 0 1',
  'r3k2r/8/8/8/8/8/8/R3K2R w FF - 0 1',
  'r3k2r/8/8/8/8/8/8/R3K2R w GG - 0 1',
  'r3k2r/8/8/8/8/8/8/R3K2R w HH - 0 1',

  'r3k2r/8/8/8/8/8/8/R3K2R w aa - 0 1',
  'r3k2r/8/8/8/8/8/8/R3K2R w bb - 0 1',
  'r3k2r/8/8/8/8/8/8/R3K2R w cc - 0 1',
  'r3k2r/8/8/8/8/8/8/R3K2R w dd - 0 1',
  'r3k2r/8/8/8/8/8/8/R3K2R w ee - 0 1',
  'r3k2r/8/8/8/8/8/8/R3K2R w ff - 0 1',
  'r3k2r/8/8/8/8/8/8/R3K2R w gg - 0 1',
  'r3k2r/8/8/8/8/8/8/R3K2R w hh - 0 1',
])(
  'should disable all castling rights when castle flags are repeated',
  (fen) => {
    const chess = new Chess(fen, { chess960: true })
    expect(chess.getCastlingRights(BLACK)[QUEEN]).toBeFalsy()
    expect(chess.getCastlingRights(BLACK)[KING]).toBeFalsy()
    expect(chess.getCastlingRights(WHITE)[QUEEN]).toBeFalsy()
    expect(chess.getCastlingRights(WHITE)[KING]).toBeFalsy()
  },
)

test.each([
  'r6r/p5kp/8/8/8/8/8/K7 w kq - 0 1',
  'r6r/p6p/6k1/8/8/8/8/K7 w kq - 0 1',
  'r6r/p6p/8/6k1/8/8/8/K7 w kq - 0 1',
  'r6r/p6p/8/8/6k1/8/8/K7 w kq - 0 1',
  'r6r/p6p/8/8/8/6k1/8/K7 w kq - 0 1',
  'r6r/p6p/8/8/8/8/6k1/K7 w kq - 0 1',
  'r6r/p6p/8/8/8/8/8/K5k1 w kq - 0 1',
])(
  'should disable black castling-rights when black king is not on row 8',
  (fen) => {
    const chess = new Chess(fen, { chess960: true })
    expect(chess.getCastlingRights(BLACK)[KING]).toBeFalsy()
    expect(chess.getCastlingRights(BLACK)[QUEEN]).toBeFalsy()
  },
)

test.each([
  'k7/8/8/8/8/8/P5KP/R6R w KQ - 0 1',
  'k7/8/8/8/8/6K1/P6P/R6R w KQ - 0 1',
  'k7/8/8/8/6K1/8/P6P/R6R w KQ - 0 1',
  'k7/8/8/6K1/8/8/P6P/R6R w KQ - 0 1',
  'k7/8/6K1/8/8/8/P6P/R6R w KQ - 0 1',
  'k7/p5Kp/8/8/8/8/P6P/R6R w KQ - 0 1',
  'k5K1/8/8/8/8/8/P6P/R6R w KQ - 0 1',
])(
  'should disable white castling-rights when white king is not on row 1',
  (fen) => {
    const chess = new Chess(fen, { chess960: true })
    expect(chess.getCastlingRights(WHITE)[KING]).toBeFalsy()
    expect(chess.getCastlingRights(WHITE)[QUEEN]).toBeFalsy()
  },
)

test('should disable black queenside castling-right when black queenside rook is missing', () => {
  const chess = new Chess()
  chess.load('5k1r/8/8/8/8/8/8/1R3K1R w KQkq - 0 1', { chess960: true })
  expect(chess.getCastlingRights(BLACK)[KING]).toBeTruthy()
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toBeFalsy()
  expect(chess.getCastlingRights(WHITE)[KING]).toBeTruthy()
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toBeTruthy()
})

test('should disable black kingside castling-right when black kingside rook is missing', () => {
  const chess = new Chess()
  chess.load('1r3k2/8/8/8/8/8/8/1R3K1R w KQkq - 0 1', { chess960: true })
  expect(chess.getCastlingRights(BLACK)[KING]).toBeFalsy()
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toBeTruthy()
  expect(chess.getCastlingRights(WHITE)[KING]).toBeTruthy()
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toBeTruthy()
})

test('should disable white queenside castling-right when white queenside rook is missing', () => {
  const chess = new Chess()
  chess.load('1r3k1r/8/8/8/8/8/8/5K1R w KQkq - 0 1', { chess960: true })
  expect(chess.getCastlingRights(BLACK)[KING]).toBeTruthy()
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toBeTruthy()
  expect(chess.getCastlingRights(WHITE)[KING]).toBeTruthy()
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toBeFalsy()
})

test('should disable white kingside castling-right when white kingside rook is missing', () => {
  const chess = new Chess()
  chess.load('1r3k1r/8/8/8/8/8/8/1R3K2 w KQkq - 0 1', { chess960: true })
  expect(chess.getCastlingRights(BLACK)[KING]).toBeTruthy()
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toBeTruthy()
  expect(chess.getCastlingRights(WHITE)[KING]).toBeFalsy()
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toBeTruthy()
})

test.each([
  'rr4k1/8/8/8/8/8/8/6K1 w qb - 0 1',
  'r1r3k1/8/8/8/8/8/8/6K1 w qc - 0 1',
  'r2r2k1/8/8/8/8/8/8/6K1 w qd - 0 1',
  'r3r1k1/8/8/8/8/8/8/6K1 w qe - 0 1',
  'r4rk1/8/8/8/8/8/8/6K1 w qf - 0 1',
])(
  'should disable black queenside castling-rights when more than one black queenside rook is specified',
  (fen) => {
    const chess = new Chess(fen, { chess960: true })
    expect(chess.getCastlingRights(BLACK)[QUEEN]).toBeFalsy()
  },
)

test.each([
  '1kr4r/8/8/8/8/8/8/1K6 w kc - 0 1',
  '1k1r3r/8/8/8/8/8/8/1K6 w kd - 0 1',
  '1k2r2r/8/8/8/8/8/8/1K6 w ke - 0 1',
  '1k3r1r/8/8/8/8/8/8/1K6 w kf - 0 1',
  '1k4rr/8/8/8/8/8/8/1K6 w kg - 0 1',
])(
  'should disable black kingside castling rights when more than one black kingside rook is specified',
  (fen) => {
    const chess = new Chess(fen, { chess960: true })
    expect(chess.getCastlingRights(BLACK)[KING]).toBeFalsy()
  },
)

test.each([
  '6k1/8/8/8/8/8/8/RR4K1 w QB - 0 1',
  '6k1/8/8/8/8/8/8/R1R3K1 w QC - 0 1',
  '6k1/8/8/8/8/8/8/R2R2K1 w QD - 0 1',
  '6k1/8/8/8/8/8/8/R3R1K1 w QE - 0 1',
  '6k1/8/8/8/8/8/8/R4RK1 w QF - 0 1',
])(
  'should disable white queenside castling-rights when more than one white queenside rook is specified',
  (fen) => {
    const chess = new Chess(fen, { chess960: true })
    expect(chess.getCastlingRights(WHITE)[QUEEN]).toBeFalsy()
  },
)

test.each([
  '1k6/8/8/8/8/8/8/1KR4R w KC - 0 1',
  '1k6/8/8/8/8/8/8/1K1r3R w KD - 0 1',
  '1k6/8/8/8/8/8/8/1K2r2R w KE - 0 1',
  '1k6/8/8/8/8/8/8/1K3r1R w KF - 0 1',
  '1k6/8/8/8/8/8/8/1K4RR w KG - 0 1',
])(
  'should disable black kingside castling rights when more than one white kingside rook is specified',
  (fen) => {
    const chess = new Chess(fen, { chess960: true })
    expect(chess.getCastlingRights(BLACK)[KING]).toBeFalsy()
  },
)

test.each([
  '6k1/8/8/8/8/8/8/RR4K1 w B - 0 1',
  '6k1/8/8/8/8/8/8/R1R3K1 w C - 0 1',
  '6k1/8/8/8/8/8/8/R2R2K1 w D - 0 1',
  '6k1/8/8/8/8/8/8/R3R1K1 w E - 0 1',
  '6k1/8/8/8/8/8/8/R4RK1 w F - 0 1',
])(
  'should enable white queenside castling-rights when white inner queenside rook is specified',
  (fen) => {
    const chess = new Chess(fen, { chess960: true })
    expect(chess.getCastlingRights(WHITE)[QUEEN]).toBeTruthy()
  },
)

test.each([
  '1k6/8/8/8/8/8/8/1KR4R w C - 0 1',
  '1k6/8/8/8/8/8/8/1K1R3R w D - 0 1',
  '1k6/8/8/8/8/8/8/1K2R2R w E - 0 1',
  '1k6/8/8/8/8/8/8/1K3R1R w F - 0 1',
  '1k6/8/8/8/8/8/8/1K4RR w G - 0 1',
])(
  'should enable white kingside castling-rights when white inner kingside rook is specified',
  (fen) => {
    const chess = new Chess(fen, { chess960: true })
    expect(chess.getCastlingRights(WHITE)[KING]).toBeTruthy()
  },
)

test.each([
  'rr4k1/8/8/8/8/8/8/6K1 w b - 0 1',
  'r1r3k1/8/8/8/8/8/8/6K1 w c - 0 1',
  'r2r2k1/8/8/8/8/8/8/6K1 w d - 0 1',
  'r3r1k1/8/8/8/8/8/8/6K1 w e - 0 1',
  'r4rk1/8/8/8/8/8/8/6K1 w f - 0 1',
])(
  'should enable black queenside castling-right when black inner queenside rook is specified',
  (fen) => {
    const chess = new Chess(fen, { chess960: true })
    expect(chess.getCastlingRights(BLACK)[QUEEN]).toBeTruthy()
  },
)

test.each([
  '1krr4/8/8/8/8/8/8/1K6 w c - 0 1',
  '1kr1r3/8/8/8/8/8/8/1K6 w c - 0 1',
  '1kr2r2/8/8/8/8/8/8/1K6 w c - 0 1',
  '1kr3r1/8/8/8/8/8/8/1K6 w c - 0 1',
  '1kr4r/8/8/8/8/8/8/1K6 w c - 0 1',

  '1k1rr3/8/8/8/8/8/8/1K6 w d - 0 1',
  '1k1r1r2/8/8/8/8/8/8/1K6 w d - 0 1',
  '1k1r2r1/8/8/8/8/8/8/1K6 w d - 0 1',
  '1k1r3r/8/8/8/8/8/8/1K6 w d - 0 1',

  '1k2rr2/8/8/8/8/8/8/1K6 w e - 0 1',
  '1k2r1r1/8/8/8/8/8/8/1K6 w e - 0 1',
  '1k2r2r/8/8/8/8/8/8/1K6 w e - 0 1',

  '1k3rr1/8/8/8/8/8/8/1K6 w f - 0 1',
  '1k3r1r/8/8/8/8/8/8/1K6 w f - 0 1',

  '1k4rr/8/8/8/8/8/8/1K6 w g - 0 1',

  '2krr3/8/8/8/8/8/8/2K5 w d - 0 1',
  '2kr1r2/8/8/8/8/8/8/2K5 w d - 0 1',
  '2kr2r1/8/8/8/8/8/8/2K5 w d - 0 1',
  '2kr3r/8/8/8/8/8/8/2K5 w d - 0 1',

  '2k1rr2/8/8/8/8/8/8/2K5 w e - 0 1',
  '2k1r1r1/8/8/8/8/8/8/2K5 w e - 0 1',
  '2k1r2r/8/8/8/8/8/8/2K5 w e - 0 1',

  '2k2rr1/8/8/8/8/8/8/2K5 w f - 0 1',
  '2k2r1r/8/8/8/8/8/8/2K5 w f - 0 1',

  '2k3rr/8/8/8/8/8/8/2K5 w g - 0 1',

  '3krr2/8/8/8/8/8/8/3K4 w e - 0 1',
  '3kr1r1/8/8/8/8/8/8/3K4 w e - 0 1',
  '3kr2r/8/8/8/8/8/8/3K4 w e - 0 1',

  '3k1rr1/8/8/8/8/8/8/3K4 w f - 0 1',
  '3k1r1r/8/8/8/8/8/8/3K4 w f - 0 1',

  '3k2rr/8/8/8/8/8/8/3K4 w g - 0 1',

  '4krr1/8/8/8/8/8/8/4K3 w f - 0 1',
  '4kr1r/8/8/8/8/8/8/4K3 w f - 0 1',

  '4k1rr/8/8/8/8/8/8/4K3 w g - 0 1',

  '5krr/8/8/8/8/8/8/5K2 w g - 0 1',
])(
  'should enable black kingside castling-right when black inner kingside rook and flag are present',
  (fen) => {
    const chess = new Chess(fen, { chess960: true })
    expect(chess.getCastlingRights(BLACK)[KING]).toBeTruthy()
  },
)

test.each([
  '1k6/8/8/8/8/8/8/1KRR4 w C - 0 1',
  '1k6/8/8/8/8/8/8/1KR1R3 w C - 0 1',
  '1k6/8/8/8/8/8/8/1KR2R2 w C - 0 1',
  '1k6/8/8/8/8/8/8/1KR3R1 w C - 0 1',
  '1k6/8/8/8/8/8/8/1KR4R w C - 0 1',

  '1k6/8/8/8/8/8/8/1K1RR3 w D - 0 1',
  '1k6/8/8/8/8/8/8/1K1R1R2 w D - 0 1',
  '1k6/8/8/8/8/8/8/1K1R2R1 w D - 0 1',
  '1k6/8/8/8/8/8/8/1K1R3R w D - 0 1',

  '1k6/8/8/8/8/8/8/1K2RR2 w E - 0 1',
  '1k6/8/8/8/8/8/8/1K2R1R1 w E - 0 1',
  '1k6/8/8/8/8/8/8/1K2R2R w E - 0 1',

  '1k6/8/8/8/8/8/8/1K3RR1 w F - 0 1',
  '1k6/8/8/8/8/8/8/1K3R1R w F - 0 1',

  '1k6/8/8/8/8/8/8/1K4RR w G - 0 1',

  '2k5/8/8/8/8/8/8/2KRR3 w D - 0 1',
  '2k5/8/8/8/8/8/8/2KR1R2 w D - 0 1',
  '2k5/8/8/8/8/8/8/2KR2R1 w D - 0 1',
  '2k5/8/8/8/8/8/8/2KR3R w D - 0 1',

  '2k5/8/8/8/8/8/8/2K1RR2 w E - 0 1',
  '2k5/8/8/8/8/8/8/2K1R1R1 w E - 0 1',
  '2k5/8/8/8/8/8/8/2K1R2R w E - 0 1',

  '2k5/8/8/8/8/8/8/2K2RR1 w F - 0 1',
  '2k5/8/8/8/8/8/8/2K2R1R w F - 0 1',

  '2k5/8/8/8/8/8/8/2K3RR w G - 0 1',

  '3k4/8/8/8/8/8/8/3KRR2 w E - 0 1',
  '3k4/8/8/8/8/8/8/3KR1R1 w E - 0 1',
  '3k4/8/8/8/8/8/8/3KR2R w E - 0 1',

  '3k4/8/8/8/8/8/8/3K1RR1 w F - 0 1',
  '3k4/8/8/8/8/8/8/3K1R1R w F - 0 1',

  '3k4/8/8/8/8/8/8/3K2RR w G - 0 1',

  '4k3/8/8/8/8/8/8/4KRR1 w F - 0 1',
  '4k3/8/8/8/8/8/8/4KR1R w F - 0 1',

  '4k3/8/8/8/8/8/8/4K1RR w G - 0 1',

  '5k2/8/8/8/8/8/8/5KRR w G - 0 1',
])(
  'should enable white kingside castling-right when white inner kingside rook and flag are present',
  (fen) => {
    const chess = new Chess(fen, { chess960: true })
    expect(chess.getCastlingRights(WHITE)[KING]).toBeTruthy()
  },
)

test.each([
  '6k1/8/8/8/8/8/8/4RRK1 w F - 0 1',
  '6k1/8/8/8/8/8/8/3R1RK1 w F - 0 1',
  '6k1/8/8/8/8/8/8/2R2RK1 w F - 0 1',
  '6k1/8/8/8/8/8/8/1R3RK1 w F - 0 1',
  '6k1/8/8/8/8/8/8/R4RK1 w F - 0 1',

  '6k1/8/8/8/8/8/8/3RR1K1 w E - 0 1',
  '6k1/8/8/8/8/8/8/2R1R1K1 w E - 0 1',
  '6k1/8/8/8/8/8/8/1R2R1K1 w E - 0 1',
  '6k1/8/8/8/8/8/8/R3R1K1 w E - 0 1',

  '6k1/8/8/8/8/8/8/2RR2K1 w D - 0 1',
  '6k1/8/8/8/8/8/8/1R1R2K1 w D - 0 1',
  '6k1/8/8/8/8/8/8/R2R2K1 w D - 0 1',

  '6k1/8/8/8/8/8/8/1RR3K1 w C - 0 1',
  '6k1/8/8/8/8/8/8/R1R3K1 w C - 0 1',

  '6k1/8/8/8/8/8/8/RR4K1 w B - 0 1',

  '5k2/8/8/8/8/8/8/3RRK2 w E - 0 1',
  '5k2/8/8/8/8/8/8/2R1RK2 w E - 0 1',
  '5k2/8/8/8/8/8/8/1R2RK2 w E - 0 1',
  '5k2/8/8/8/8/8/8/R3RK2 w E - 0 1',

  '5k2/8/8/8/8/8/8/2RR1K2 w D - 0 1',
  '5k2/8/8/8/8/8/8/1R1R1K2 w D - 0 1',
  '5k2/8/8/8/8/8/8/R2R1K2 w D - 0 1',

  '5k2/8/8/8/8/8/8/1RR2K2 w C - 0 1',
  '5k2/8/8/8/8/8/8/R1R2K2 w C - 0 1',

  '5k2/8/8/8/8/8/8/RR3K2 w B - 0 1',

  '4k3/8/8/8/8/8/8/2RRK3 w D - 0 1',
  '4k3/8/8/8/8/8/8/1R1RK3 w D - 0 1',
  '4k3/8/8/8/8/8/8/R2RK3 w D - 0 1',

  '4k3/8/8/8/8/8/8/1RR1K3 w C - 0 1',
  '4k3/8/8/8/8/8/8/R1R1K3 w C - 0 1',

  '4k3/8/8/8/8/8/8/RR2K3 w B - 0 1',

  '3k4/8/8/8/8/8/8/1RRK4 w C - 0 1',
  '3k4/8/8/8/8/8/8/R1RK4 w C - 0 1',

  '3k4/8/8/8/8/8/8/RR1K4 w B - 0 1',

  '2k5/8/8/8/8/8/8/RRK5 w B - 0 1',
])(
  'should enable white queenside castling-right when white inner queenside rook and flag are present',
  (fen) => {
    const chess = new Chess(fen, { chess960: true })
    expect(chess.getCastlingRights(WHITE)[QUEEN]).toBeTruthy()
  },
)

test.each([
  '4rrk1/8/8/8/8/8/8/6K1 w f - 0 1',
  '3r1rk1/8/8/8/8/8/8/6K1 w f - 0 1',
  '2r2rk1/8/8/8/8/8/8/6K1 w f - 0 1',
  '1r3rk1/8/8/8/8/8/8/6K1 w f - 0 1',
  'r4rk1/8/8/8/8/8/8/6K1 w f - 0 1',

  '3rr1k1/8/8/8/8/8/8/6K1 w e - 0 1',
  '2r1r1k1/8/8/8/8/8/8/6K1 w e - 0 1',
  '1r2r1k1/8/8/8/8/8/8/6K1 w e - 0 1',
  'r3r1k1/8/8/8/8/8/8/6K1 w e - 0 1',

  '2rr2k1/8/8/8/8/8/8/6K1 w d - 0 1',
  '1r1r2k1/8/8/8/8/8/8/6K1 w d - 0 1',
  'r2r2k1/8/8/8/8/8/8/6K1 w d - 0 1',

  '1rr3k1/8/8/8/8/8/8/6K1 w c - 0 1',
  'r1r3k1/8/8/8/8/8/8/6K1 w c - 0 1',

  'rr4k1/8/8/8/8/8/8/6K1 w b - 0 1',

  '3rrk2/8/8/8/8/8/8/5K2 w e - 0 1',
  '2r1rk2/8/8/8/8/8/8/5K2 w e - 0 1',
  '1r2rk2/8/8/8/8/8/8/5K2 w e - 0 1',
  'r3rk2/8/8/8/8/8/8/5K2 w e - 0 1',

  '2rr1k2/8/8/8/8/8/8/5K2 w d - 0 1',
  '1r1r1k2/8/8/8/8/8/8/5K2 w d - 0 1',
  'r2r1k2/8/8/8/8/8/8/5K2 w d - 0 1',

  '1rr2k2/8/8/8/8/8/8/5K2 w c - 0 1',
  'r1r2k2/8/8/8/8/8/8/5K2 w c - 0 1',

  'rr3k2/8/8/8/8/8/8/5K2 w b - 0 1',

  '2rrk3/8/8/8/8/8/8/4K3 w d - 0 1',
  '1r1rk3/8/8/8/8/8/8/4K3 w d - 0 1',
  'r2rk3/8/8/8/8/8/8/4K3 w d - 0 1',

  '1rr1k3/8/8/8/8/8/8/4K3 w c - 0 1',
  'r1r1k3/8/8/8/8/8/8/4K3 w c - 0 1',

  'rr2k3/8/8/8/8/8/8/4K3 w b - 0 1',

  '1rrk4/8/8/8/8/8/8/3K4 w c - 0 1',
  'r1rk4/8/8/8/8/8/8/3K4 w c - 0 1',

  'rr1k4/8/8/8/8/8/8/3K4 w b - 0 1',

  'rrk5/8/8/8/8/8/8/2K5 w b - 0 1',
])(
  'should enable black queenside castling-right when black inner queenside rook and flag are present',
  (fen) => {
    const chess = new Chess(fen, { chess960: true })
    expect(chess.getCastlingRights(BLACK)[QUEEN]).toBeTruthy()
  },
)

test('set white queenside', () => {
  const chess = new Chess('r4k1r/8/8/8/8/8/8/1R3RKR w - - 0 1', {
    chess960: true,
  })

  expect(chess.getCastlingRights(WHITE)[QUEEN]).toBeFalsy()
  expect(chess.setCastlingRights(WHITE, { [QUEEN]: true })).toBeTruthy()
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toEqual('b')
})

test('set white kingside', () => {
  const chess = new Chess('r4k1r/8/8/8/8/8/8/RKR3R1 w - - 0 1', {
    chess960: true,
  })

  expect(chess.getCastlingRights(WHITE)[KING]).toBeFalsy()
  expect(chess.setCastlingRights(WHITE, { [KING]: true })).toBeTruthy()
  expect(chess.getCastlingRights(WHITE)[KING]).toEqual('g')
})

test('set black queenside', () => {
  const chess = new Chess('1r3rkr/8/8/8/8/8/8/RK6 w - - 0 1', {
    chess960: true,
  })

  expect(chess.getCastlingRights(BLACK)[QUEEN]).toBeFalsy()
  expect(chess.setCastlingRights(BLACK, { [QUEEN]: true })).toBeTruthy()
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toEqual('b')
})

test('set black kingside', () => {
  const chess = new Chess('rkr3r1/8/8/8/8/8/8/RK6 w - - 0 1', {
    chess960: true,
  })

  expect(chess.getCastlingRights(BLACK)[KING]).toBeFalsy()
  expect(chess.setCastlingRights(BLACK, { [KING]: true })).toBeTruthy()
  expect(chess.getCastlingRights(BLACK)[KING]).toEqual('g')
})

test('set white queenside should fail if king is on a-file', () => {
  const chess = new Chess('r4k1r/8/8/8/8/8/8/K6R w - - 0 1', { chess960: true })
  expect(chess.setCastlingRights(WHITE, { [QUEEN]: true })).toBeFalsy()
})

test('set white queenside should fail if king is on h-file', () => {
  const chess = new Chess('r4k1r/8/8/8/8/8/8/R6K w - - 0 1', { chess960: true })
  expect(chess.setCastlingRights(WHITE, { [QUEEN]: true })).toBeFalsy()
})

test('set white queenside should fail if no rooks are on left of king', () => {
  const chess = new Chess('r4k1r/8/8/8/8/8/8/6KR w - - 0 1', { chess960: true })
  expect(chess.setCastlingRights(WHITE, { [QUEEN]: true })).toBeFalsy()
})

test('set white kingside should fail if king is on a-file', () => {
  const chess = new Chess('r4k1r/8/8/8/8/8/8/K6R w - - 0 1', { chess960: true })
  expect(chess.setCastlingRights(WHITE, { [KING]: true })).toBeFalsy()
})

test('set white kingside should fail if king is on h-file', () => {
  const chess = new Chess('r4k1r/8/8/8/8/8/8/R6K w - - 0 1', { chess960: true })
  expect(chess.setCastlingRights(WHITE, { [KING]: true })).toBeFalsy()
})

test('set white kingside should fail if no rooks are on right of king', () => {
  const chess = new Chess('r4k1r/8/8/8/8/8/8/RK6 w - - 0 1', { chess960: true })
  expect(chess.setCastlingRights(WHITE, { [KING]: true })).toBeFalsy()
})

test('set black queenside should fail if king is on a-file', () => {
  const chess = new Chess('k6r/8/8/8/8/8/8/R4K2 w - - 0 1', { chess960: true })
  expect(chess.setCastlingRights(BLACK, { [QUEEN]: true })).toBeFalsy()
})

test('set black queenside should fail if king is on h-file', () => {
  const chess = new Chess('r6k/8/8/8/8/8/8/R4K2 w - - 0 1', { chess960: true })
  expect(chess.setCastlingRights(BLACK, { [QUEEN]: true })).toBeFalsy()
})

test('set black queenside should fail if no rooks are on left of king', () => {
  const chess = new Chess('6kr/8/8/8/8/8/8/R4K2 w - - 0 1', { chess960: true })
  expect(chess.setCastlingRights(BLACK, { [QUEEN]: true })).toBeFalsy()
})

test('set black kingside should fail if king is on a-file', () => {
  const chess = new Chess('k6r/8/8/8/8/8/8/R4K2 w - - 0 1', { chess960: true })
  expect(chess.setCastlingRights(BLACK, { [KING]: true })).toBeFalsy()
})

test('set black kingside should fail if king is on h-file', () => {
  const chess = new Chess('r6k/8/8/8/8/8/8/R4K2 w - - 0 1', { chess960: true })
  expect(chess.setCastlingRights(BLACK, { [KING]: true })).toBeFalsy()
})

test('set black kingside should fail if no rooks are on right of king', () => {
  const chess = new Chess('rk6/8/8/8/8/8/8/R4K2 w - - 0 1', { chess960: true })
  expect(chess.setCastlingRights(BLACK, { [KING]: true })).toBeFalsy()
})

test('set black kingside should fail if no rooks are on right of king', () => {
  const chess = new Chess('rk6/8/8/8/8/8/8/R4K2 w - - 0 1', { chess960: true })
  expect(chess.setCastlingRights(BLACK, { [KING]: 'c' })).toBeFalsy()
})

test('set castling right of black kingside inner rook', () => {
  const chess = new Chess('rk4rr/8/8/8/8/8/8/5K2 w - - 0 1', { chess960: true })
  expect(chess.getCastlingRights(BLACK)[KING]).toBeFalsy()
  expect(chess.setCastlingRights(BLACK, { [KING]: 'g' })).toBeTruthy()
  expect(chess.getCastlingRights(BLACK)[KING]).toEqual('g')
})

test('black kingside should set castling rights on inner rook with multiple rooks', (fen, col) => {
  const chess = new Chess('rrkrrrrr/8/8/8/8/8/8/5K2 w - - 0 1', {
    chess960: true,
  })
  expect(chess.getCastlingRights(BLACK)[KING]).toBeFalsy()
  expect(chess.setCastlingRights(BLACK, { [KING]: 'd' })).toBeTruthy()
  expect(chess.getCastlingRights(BLACK)[KING]).toEqual('d')
})

test('black queenside should set castling rights on inner rook with multiple rooks', (fen, col) => {
  const chess = new Chess('rrrrrkrr/8/8/8/8/8/8/5K2 w - - 0 1', {
    chess960: true,
  })
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toBeFalsy()
  expect(chess.setCastlingRights(BLACK, { [QUEEN]: 'c' })).toBeTruthy()
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toEqual('c')
})

test('white kingside should set castling rights on inner rook with multiple rooks', (fen, col) => {
  const chess = new Chess('5k2/8/8/8/8/8/8/RRKRRRRR w - - 0 1', {
    chess960: true,
  })
  expect(chess.getCastlingRights(WHITE)[KING]).toBeFalsy()
  expect(chess.setCastlingRights(WHITE, { [KING]: 'd' })).toBeTruthy()
  expect(chess.getCastlingRights(WHITE)[KING]).toEqual('d')
})

test('white queenside should set castling rights on inner rook with multiple rooks', (fen, col) => {
  const chess = new Chess('5k2/8/8/8/8/8/8/RRRRRKRR w - - 0 1', {
    chess960: true,
  })
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toBeFalsy()
  expect(chess.setCastlingRights(WHITE, { [QUEEN]: 'c' })).toBeTruthy()
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toEqual('c')
})

test.each([
  ['rkr4r/8/8/8/8/8/8/5K2 w - - 0 1', 'c'],
  ['rk1r3r/8/8/8/8/8/8/5K2 w - - 0 1', 'd'],
  ['rk2r2r/8/8/8/8/8/8/5K2 w - - 0 1', 'e'],
  ['rk3r1r/8/8/8/8/8/8/5K2 w - - 0 1', 'f'],
  ['rk4rr/8/8/8/8/8/8/5K2 w - - 0 1', 'g'],
])('black kingside should set castling rights on inner rook', (fen, arg) => {
  const chess = new Chess(fen, { chess960: true })
  expect(chess.getCastlingRights(BLACK)[KING]).toBeFalsy()
  expect(chess.setCastlingRights(BLACK, { [KING]: arg })).toBeTruthy()
  expect(chess.getCastlingRights(BLACK)[KING]).toEqual(arg)
})

test.each([
  ['rr4kr/8/8/8/8/8/8/5K2 w - - 0 1', 'b'],
  ['r1r3kr/8/8/8/8/8/8/5K2 w - - 0 1', 'c'],
  ['r2r2kr/8/8/8/8/8/8/5K2 w - - 0 1', 'd'],
  ['r3r1kr/8/8/8/8/8/8/5K2 w - - 0 1', 'e'],
  ['r4rkr/8/8/8/8/8/8/5K2 w - - 0 1', 'f'],
])('black queenside should set castling rights on inner rook', (fen, arg) => {
  const chess = new Chess(fen, { chess960: true })
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toBeFalsy()
  expect(chess.setCastlingRights(BLACK, { [QUEEN]: arg })).toBeTruthy()
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toEqual(arg)
})

test.each([
  ['5k2/8/8/8/8/8/8/RKR4R w - - 0 1', 'c'],
  ['5k2/8/8/8/8/8/8/RK1R3R w - - 0 1', 'd'],
  ['5k2/8/8/8/8/8/8/RK2R2R w - - 0 1', 'e'],
  ['5k2/8/8/8/8/8/8/RK3R1R w - - 0 1', 'f'],
  ['5k2/8/8/8/8/8/8/RK4RR w - - 0 1', 'g'],
])('white kingside should set castling rights on inner rook', (fen, arg) => {
  const chess = new Chess(fen, { chess960: true })
  expect(chess.getCastlingRights(WHITE)[KING]).toBeFalsy()
  expect(chess.setCastlingRights(WHITE, { [KING]: arg })).toBeTruthy()
  expect(chess.getCastlingRights(WHITE)[KING]).toEqual(arg)
})

test.each([
  ['5k2/8/8/8/8/8/8/RR4KR w - - 0 1', 'b'],
  ['5k2/8/8/8/8/8/8/R1R3KR w - - 0 1', 'c'],
  ['5k2/8/8/8/8/8/8/R2R2KR w - - 0 1', 'd'],
  ['5k2/8/8/8/8/8/8/R3R1KR w - - 0 1', 'e'],
  ['5k2/8/8/8/8/8/8/R4RKR w - - 0 1', 'f'],
])('white queenside should set castling rights on inner rook', (fen, arg) => {
  const chess = new Chess(fen, { chess960: true })
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toBeFalsy()
  expect(chess.setCastlingRights(WHITE, { [QUEEN]: arg })).toBeTruthy()
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toEqual(arg)
})

test('set castling right on inner rooks of black kingside and queenside', () => {
  const chess = new Chess('rrk3rr/8/8/8/8/8/8/5K2 w - - 0 1', {
    chess960: true,
  })
  expect(chess.getCastlingRights(BLACK)[KING]).toBeFalsy()
  expect(
    chess.setCastlingRights(BLACK, { [KING]: 'b', [QUEEN]: 'g' }),
  ).toBeTruthy()
  expect(chess.getCastlingRights(BLACK)[KING]).toEqual('b')
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toEqual('g')
})

test('set castling right on inner rooks of white kingside and queenside', () => {
  const chess = new Chess('5k2/8/8/8/8/8/8/RRK3RR w - - 0 1', {
    chess960: true,
  })
  expect(chess.getCastlingRights(WHITE)[KING]).toBeFalsy()
  expect(
    chess.setCastlingRights(WHITE, { [KING]: 'b', [QUEEN]: 'g' }),
  ).toBeTruthy()
  expect(chess.getCastlingRights(WHITE)[KING]).toEqual('b')
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toEqual('g')
})

test('blank or empty string should not clear castling right of black kingside', () => {
  const chess = new Chess('rrk3rr/8/8/8/8/8/8/5K2 w g - 0 1', {
    chess960: true,
  })
  expect(chess.getCastlingRights(BLACK)[KING]).toEqual('g')
  expect(chess.setCastlingRights(BLACK, { [KING]: '' })).toBeFalsy()
  expect(chess.getCastlingRights(BLACK)[KING]).toEqual('g')
  expect(chess.setCastlingRights(BLACK, { [KING]: ' ' })).toBeFalsy()
  expect(chess.getCastlingRights(BLACK)[KING]).toEqual('g')
})

test('blank or empty string should not clear castling right of black queenside', () => {
  const chess = new Chess('rrk3rr/8/8/8/8/8/8/5K2 w b - 0 1', {
    chess960: true,
  })
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toEqual('b')
  expect(chess.setCastlingRights(BLACK, { [QUEEN]: '' })).toBeFalsy()
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toEqual('b')
  expect(chess.setCastlingRights(BLACK, { [QUEEN]: ' ' })).toBeFalsy()
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toEqual('b')
})

test('blank or empty string should not clear castling right of white kingside', () => {
  const chess = new Chess('5k2/8/8/8/8/8/8/RRK3RR w G - 0 1', {
    chess960: true,
  })
  expect(chess.getCastlingRights(WHITE)[KING]).toEqual('g')
  expect(chess.setCastlingRights(WHITE, { [KING]: '' })).toBeFalsy()
  expect(chess.getCastlingRights(WHITE)[KING]).toEqual('g')
  expect(chess.setCastlingRights(WHITE, { [KING]: ' ' })).toBeFalsy()
  expect(chess.getCastlingRights(WHITE)[KING]).toEqual('g')
})

test('blank or empty string should not clear castling right of white queenside', () => {
  const chess = new Chess('5k2/8/8/8/8/8/8/RRK3RR w B - 0 1', {
    chess960: true,
  })
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toEqual('b')
  expect(chess.setCastlingRights(WHITE, { [QUEEN]: '' })).toBeFalsy()
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toEqual('b')
  expect(chess.setCastlingRights(WHITE, { [QUEEN]: ' ' })).toBeFalsy()
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toEqual('b')
})

test('boolean arg should operate on outside rook black kingside', () => {
  const chess = new Chess('rr3krr/8/8/8/8/8/8/5K2 w g - 0 1', {
    chess960: true,
  })
  expect(chess.getCastlingRights(BLACK)[KING]).toEqual('g')
  expect(chess.setCastlingRights(BLACK, { [KING]: true })).toBeTruthy()
  expect(chess.getCastlingRights(BLACK)[KING]).toEqual('h')
})

test('boolean arg should operate on outside rook black queenside', () => {
  const chess = new Chess('rr3krr/8/8/8/8/8/8/5K2 w b - 0 1', {
    chess960: true,
  })
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toEqual('b')
  expect(chess.setCastlingRights(BLACK, { [QUEEN]: true })).toBeTruthy()
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toEqual('a')
})

test('boolean arg should operate on outside rook white kingside', () => {
  const chess = new Chess('5k2/8/8/8/8/8/8/RR3KRR w G - 0 1', {
    chess960: true,
  })
  expect(chess.getCastlingRights(WHITE)[KING]).toEqual('g')
  expect(chess.setCastlingRights(WHITE, { [KING]: true })).toBeTruthy()
  expect(chess.getCastlingRights(WHITE)[KING]).toEqual('h')
})

test('boolean arg should operate on outside rook white queenside', () => {
  const chess = new Chess('5k2/8/8/8/8/8/8/RR3KRR w B - 0 1', {
    chess960: true,
  })
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toEqual('b')
  expect(chess.setCastlingRights(WHITE, { [QUEEN]: true })).toBeTruthy()
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toEqual('a')
})

test('bad black kingside arg should not alter castling state', () => {
  const chess = new Chess('rr3krr/8/8/8/8/8/8/5K2 w g - 0 1', {
    chess960: true,
  })
  const sq = 'g'
  expect(chess.getCastlingRights(BLACK)[KING]).toEqual(sq)
  expect(chess.setCastlingRights(BLACK, { [KING]: 'badval' })).toBeFalsy()
  expect(chess.getCastlingRights(BLACK)[KING]).toEqual(sq)
})

test('bad black queenside arg should not alter castling state', () => {
  const chess = new Chess('rr3krr/8/8/8/8/8/8/5K2 w b - 0 1', {
    chess960: true,
  })
  const sq = 'b'
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toEqual(sq)
  expect(chess.setCastlingRights(BLACK, { [QUEEN]: 'badval' })).toBeFalsy()
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toEqual(sq)
})

test('bad white kingside arg should not alter castling state', () => {
  const chess = new Chess('5k2/8/8/8/8/8/8/RR3KRR w G - 0 1', {
    chess960: true,
  })
  const sq = 'g'
  expect(chess.getCastlingRights(WHITE)[KING]).toEqual(sq)
  expect(chess.setCastlingRights(WHITE, { [KING]: 'badval' })).toBeFalsy()
  expect(chess.getCastlingRights(WHITE)[KING]).toEqual(sq)
})

test('bad white queenside arg should not alter castling state', () => {
  const chess = new Chess('5k2/8/8/8/8/8/8/RR3KRR w B - 0 1', {
    chess960: true,
  })
  const sq = 'b'
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toEqual(sq)
  expect(chess.setCastlingRights(WHITE, { [QUEEN]: 'badval' })).toBeFalsy()
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toEqual(sq)
})

test('black good kingside and bad queenside should not alter castling state', () => {
  const chess = new Chess('rr3krr/8/8/8/8/8/8/5K2 w bg - 0 1', {
    chess960: true,
  })
  const ksideSq = 'g'
  const qsideSq = 'b'
  expect(chess.getCastlingRights(BLACK)[KING]).toEqual(ksideSq)
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toEqual(qsideSq)
  expect(
    chess.setCastlingRights(BLACK, { [KING]: 'a', [QUEEN]: 'badval' }),
  ).toBeFalsy()
  expect(chess.getCastlingRights(BLACK)[KING]).toEqual(ksideSq)
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toEqual(qsideSq)
})

test('black good queenside and bad kingside should not alter castling state', () => {
  const chess = new Chess('rr3krr/8/8/8/8/8/8/5K2 w bg - 0 1', {
    chess960: true,
  })
  const ksideSq = 'g'
  const qsideSq = 'b'
  expect(chess.getCastlingRights(BLACK)[KING]).toEqual(ksideSq)
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toEqual(qsideSq)
  expect(
    chess.setCastlingRights(BLACK, { [KING]: 'badval', [QUEEN]: 'h' }),
  ).toBeFalsy()
  expect(chess.getCastlingRights(BLACK)[KING]).toEqual(ksideSq)
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toEqual(qsideSq)
})

test('white good kingside and bad queenside should not alter castling state', () => {
  const chess = new Chess('5k2/8/8/8/8/8/8/RR3KRR w BG - 0 1', {
    chess960: true,
  })
  const ksideSq = 'g'
  const qsideSq = 'b'
  expect(chess.getCastlingRights(WHITE)[KING]).toEqual(ksideSq)
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toEqual(qsideSq)
  expect(
    chess.setCastlingRights(WHITE, { [KING]: 'a', [QUEEN]: 'badval' }),
  ).toBeFalsy()
  expect(chess.getCastlingRights(WHITE)[KING]).toEqual(ksideSq)
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toEqual(qsideSq)
})

test('white good queenside and bad kingside should not alter castling state', () => {
  const chess = new Chess('5k2/8/8/8/8/8/8/RR3KRR w BG - 0 1', {
    chess960: true,
  })
  const ksideSq = 'g'
  const qsideSq = 'b'
  expect(chess.getCastlingRights(WHITE)[KING]).toEqual(ksideSq)
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toEqual(qsideSq)
  expect(
    chess.setCastlingRights(WHITE, { [KING]: 'badval', [QUEEN]: 'h' }),
  ).toBeFalsy()
  expect(chess.getCastlingRights(WHITE)[KING]).toEqual(ksideSq)
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toEqual(qsideSq)
})

test('specifying a square with no rook should not alter castling state', () => {
  const chess = new Chess('brnqknrb/8/8/8/8/8/8/BRNQKNRB w BGbg - 0 1', {
    chess960: true,
  })

  expect(chess.setCastlingRights(BLACK, { [KING]: 'a' })).toBeFalsy()
  expect(chess.setCastlingRights(BLACK, { [KING]: 'c' })).toBeFalsy()
  expect(chess.setCastlingRights(BLACK, { [KING]: 'd' })).toBeFalsy()

  expect(chess.setCastlingRights(BLACK, { [QUEEN]: 'f' })).toBeFalsy()
  expect(chess.setCastlingRights(BLACK, { [QUEEN]: 'h' })).toBeFalsy()

  expect(chess.setCastlingRights(WHITE, { [KING]: 'a' })).toBeFalsy()
  expect(chess.setCastlingRights(WHITE, { [KING]: 'c' })).toBeFalsy()
  expect(chess.setCastlingRights(WHITE, { [KING]: 'd' })).toBeFalsy()

  expect(chess.setCastlingRights(WHITE, { [QUEEN]: 'f' })).toBeFalsy()
  expect(chess.setCastlingRights(WHITE, { [QUEEN]: 'h' })).toBeFalsy()

  expect(chess.getCastlingRights(BLACK)[KING]).toEqual('g')
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toEqual('b')
  expect(chess.getCastlingRights(WHITE)[KING]).toEqual('g')
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toEqual('b')
})

test('specifying an empty square should not alter castling state', () => {
  const chess = new Chess('1r2k1r1/8/8/8/8/8/8/1R2K1R1 w BGbg - 0 1', {
    chess960: true,
  })

  expect(chess.setCastlingRights(BLACK, { [KING]: 'a' })).toBeFalsy()
  expect(chess.setCastlingRights(BLACK, { [KING]: 'c' })).toBeFalsy()
  expect(chess.setCastlingRights(BLACK, { [KING]: 'd' })).toBeFalsy()

  expect(chess.setCastlingRights(BLACK, { [QUEEN]: 'f' })).toBeFalsy()
  expect(chess.setCastlingRights(BLACK, { [QUEEN]: 'h' })).toBeFalsy()

  expect(chess.setCastlingRights(WHITE, { [KING]: 'a' })).toBeFalsy()
  expect(chess.setCastlingRights(WHITE, { [KING]: 'c' })).toBeFalsy()
  expect(chess.setCastlingRights(WHITE, { [KING]: 'd' })).toBeFalsy()

  expect(chess.setCastlingRights(WHITE, { [QUEEN]: 'f' })).toBeFalsy()
  expect(chess.setCastlingRights(WHITE, { [QUEEN]: 'h' })).toBeFalsy()

  expect(chess.getCastlingRights(BLACK)[KING]).toEqual('g')
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toEqual('b')
  expect(chess.getCastlingRights(WHITE)[KING]).toEqual('g')
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toEqual('b')
})
