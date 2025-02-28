import { WHITE, BLACK, Chess, QUEEN, KING } from '../../src/chess'

function checkSquares(
  blackKingSq: string,
  blackQueenSq: string,
  whiteKingSq: string,
  whiteQueenSq: string,
  fen: string,
): void {
  const chess = new Chess(fen, { enable960: true })
  expect(chess.getCastlingSquares(BLACK)[KING]).toEqual(blackKingSq)
  expect(chess.getCastlingSquares(BLACK)[QUEEN]).toEqual(blackQueenSq)
  expect(chess.getCastlingSquares(WHITE)[KING]).toEqual(whiteKingSq)
  expect(chess.getCastlingSquares(WHITE)[QUEEN]).toEqual(whiteQueenSq)
}

// Outer rooks
test('black kingside c8 outer rook', () => {
  checkSquares('c8', '', '', '', '1kr5/8/8/8/8/8/8/1K6 w k - 0 1')
})
test('black kingside d8 outer rook', () => {
  checkSquares('d8', '', '', '', '1k1r4/8/8/8/8/8/8/1K6 w k - 0 1')
})
test('black kingside e8 outer rook', () => {
  checkSquares('e8', '', '', '', '1k2r3/8/8/8/8/8/8/1K6 w k - 0 1')
})
test('black kingside f8 outer rook', () => {
  checkSquares('f8', '', '', '', '1k3r2/8/8/8/8/8/8/1K6 w k - 0 1')
})
test('black kingside g8 outer rook', () => {
  checkSquares('g8', '', '', '', '1k4r1/8/8/8/8/8/8/1K6 w k - 0 1')
})
test('black kingside h8 outer rook', () => {
  checkSquares('h8', '', '', '', '1k5r/8/8/8/8/8/8/1K6 w k - 0 1')
})

test('black queenside a8 outer rook', () => {
  checkSquares('', 'a8', '', '', 'r5k1/8/8/8/8/8/8/6K1 w q - 0 1')
})
test('black queenside b8 outer rook', () => {
  checkSquares('', 'b8', '', '', '1r4k1/8/8/8/8/8/8/6K1 w q - 0 1')
})
test('black queenside c8 outer rook', () => {
  checkSquares('', 'c8', '', '', '2r3k1/8/8/8/8/8/8/6K1 w q - 0 1')
})
test('black queenside d8 outer rook', () => {
  checkSquares('', 'd8', '', '', '3r2k1/8/8/8/8/8/8/6K1 w q - 0 1')
})
test('black queenside e8 outer rook', () => {
  checkSquares('', 'e8', '', '', '4r1k1/8/8/8/8/8/8/6K1 w q - 0 1')
})
test('black queenside f8 outer rook', () => {
  checkSquares('', 'f8', '', '', '5rk1/8/8/8/8/8/8/6K1 w q - 0 1')
})

test('white kingside c1 outer rook', () => {
  checkSquares('', '', 'c1', '', '1k6/8/8/8/8/8/8/1KR5 w K - 0 1')
})
test('white kingside d1 outer rook', () => {
  checkSquares('', '', 'd1', '', '1k6/8/8/8/8/8/8/1K1R4 w K - 0 1')
})
test('white kingside e1 outer rook', () => {
  checkSquares('', '', 'e1', '', '1k6/8/8/8/8/8/8/1K2R3 w K - 0 1')
})
test('white kingside f1 outer rook', () => {
  checkSquares('', '', 'f1', '', '1k6/8/8/8/8/8/8/1K3R2 w K - 0 1')
})
test('white kingside g1 outer rook', () => {
  checkSquares('', '', 'g1', '', '1k6/8/8/8/8/8/8/1K4R1 w K - 0 1')
})
test('white kingside h1 outer rook', () => {
  checkSquares('', '', 'h1', '', '1k6/8/8/8/8/8/8/1K5R w K - 0 1')
})

test('white queenside a1 outer rook', () => {
  checkSquares('', '', '', 'a1', '6k1/8/8/8/8/8/8/R5K1 w Q - 0 1')
})
test('white queenside b1 outer rook', () => {
  checkSquares('', '', '', 'b1', '6k1/8/8/8/8/8/8/1R4K1 w Q - 0 1')
})
test('white queenside c1 outer rook', () => {
  checkSquares('', '', '', 'c1', '6k1/8/8/8/8/8/8/2R3K1 w Q - 0 1')
})
test('white queenside d1 outer rook', () => {
  checkSquares('', '', '', 'd1', '6k1/8/8/8/8/8/8/3R2K1 w Q - 0 1')
})
test('white queenside e1 outer rook', () => {
  checkSquares('', '', '', 'e1', '6k1/8/8/8/8/8/8/4R1K1 w Q - 0 1')
})
test('white queenside f1 outer rook', () => {
  checkSquares('', '', '', 'f1', '6k1/8/8/8/8/8/8/5RK1 w Q - 0 1')
})

// Inner rooks
test('black kingside c8 inner rook', () => {
  checkSquares('c8', '', '', '', '1kr4r/8/8/8/8/8/8/1K6 w c - 0 1')
})
test('black kingside d8 inner rook', () => {
  checkSquares('d8', '', '', '', '1k1r3r/8/8/8/8/8/8/1K6 w d - 0 1')
})
test('black kingside e8 inner rook', () => {
  checkSquares('e8', '', '', '', '1k2r2r/8/8/8/8/8/8/1K6 w e - 0 1')
})
test('black kingside f8 inner rook', () => {
  checkSquares('f8', '', '', '', '1k3r1r/8/8/8/8/8/8/1K6 w f - 0 1')
})
test('black kingside g8 inner rook', () => {
  checkSquares('g8', '', '', '', '1k4rr/8/8/8/8/8/8/1K6 w g - 0 1')
})

test('black queenside b8 inner rook', () => {
  checkSquares('', 'b8', '', '', 'rr4k1/8/8/8/8/8/8/6K1 w b - 0 1')
})
test('black queenside c8 inner rook', () => {
  checkSquares('', 'c8', '', '', 'r1r3k1/8/8/8/8/8/8/6K1 w c - 0 1')
})
test('black queenside d8 inner rook', () => {
  checkSquares('', 'd8', '', '', 'r2r2k1/8/8/8/8/8/8/6K1 w d - 0 1')
})
test('black queenside e8 inner rook', () => {
  checkSquares('', 'e8', '', '', 'r3r1k1/8/8/8/8/8/8/6K1 w e - 0 1')
})
test('black queenside f8 inner rook', () => {
  checkSquares('', 'f8', '', '', 'r4rk1/8/8/8/8/8/8/6K1 w f - 0 1')
})

test('white kingside c1 inner rook', () => {
  checkSquares('', '', 'c1', '', '1k6/8/8/8/8/8/8/1KR4R w C - 0 1')
})
test('white kingside d1 inner rook', () => {
  checkSquares('', '', 'd1', '', '1k6/8/8/8/8/8/8/1K1R3R w D - 0 1')
})
test('white kingside e1 inner rook', () => {
  checkSquares('', '', 'e1', '', '1k6/8/8/8/8/8/8/1K2R2R w E - 0 1')
})
test('white kingside f1 inner rook', () => {
  checkSquares('', '', 'f1', '', '1k6/8/8/8/8/8/8/1K3R1R w F - 0 1')
})
test('white kingside g1 inner rook', () => {
  checkSquares('', '', 'g1', '', '1k6/8/8/8/8/8/8/1K4RR w G - 0 1')
})

test('white queenside b1 inner rook', () => {
  checkSquares('', '', '', 'b1', '6k1/8/8/8/8/8/8/RR4K1 w B - 0 1')
})
test('white queenside c1 inner rook', () => {
  checkSquares('', '', '', 'c1', '6k1/8/8/8/8/8/8/R1R3K1 w C - 0 1')
})
test('white queenside d1 inner rook', () => {
  checkSquares('', '', '', 'd1', '6k1/8/8/8/8/8/8/R2R2K1 w D - 0 1')
})
test('white queenside e1 inner rook', () => {
  checkSquares('', '', '', 'e1', '6k1/8/8/8/8/8/8/R3R1K1 w E - 0 1')
})
test('white queenside f1 inner rook', () => {
  checkSquares('', '', '', 'f1', '6k1/8/8/8/8/8/8/R4RK1 w F - 0 1')
})

// Inner and outer rooks
test('black kingside and queenside outer rook flags', () => {
  checkSquares('g8', 'b8', '', '', '1r3kr1/8/8/8/8/8/8/5K2 w kq - 0 1')
})
test('black kingside and queenside inner rook flags', () => {
  checkSquares('g8', 'b8', '', '', '1r3kr1/8/8/8/8/8/8/5K2 w bg - 0 1')
})

test('white kingside and queenside outer rook flags', () => {
  checkSquares('', '', 'g1', 'b1', '5k2/8/8/8/8/8/8/1R3KR1 w KQ - 0 1')
})
test('white kingside and queenside inner rook flags', () => {
  checkSquares('', '', 'g1', 'b1', '5k2/8/8/8/8/8/8/1R3KR1 w BG - 0 1')
})

test('black and white kingside and queenside outer rook flags', () => {
  checkSquares(
    'g8',
    'b8',
    'g1',
    'b1',
    '1r2k1r1/8/8/8/8/8/8/1R2K1R1 w KQkq - 0 1',
  )
})
test('black and white kingside and queenside inner rook flags', () => {
  checkSquares(
    'g8',
    'b8',
    'g1',
    'b1',
    '1r2k1r1/8/8/8/8/8/8/1R2K1R1 w BGbg - 0 1',
  )
})
