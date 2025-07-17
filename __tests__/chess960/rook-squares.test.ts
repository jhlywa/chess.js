import { WHITE, BLACK, Chess, QUEEN, KING } from '../../src/chess'
import { expect, test } from 'vitest'

// Basic tests to ensure that the castling field in the FEN is interpreted correctly.

function checkSquares(
  blackKingSq: string,
  blackQueenSq: string,
  whiteKingSq: string,
  whiteQueenSq: string,
  fen: string,
): void {
  const chess = new Chess(fen, { chess960: true })
  expect(chess.getCastlingRights(BLACK)[KING]).toEqual(blackKingSq)
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toEqual(blackQueenSq)
  expect(chess.getCastlingRights(WHITE)[KING]).toEqual(whiteKingSq)
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toEqual(whiteQueenSq)
}

const UNDEF = undefined

// Ensure castling-flags 'KQkq' correspond to outer rooks
test('black kingside c outer rook', () => {
  checkSquares('c', UNDEF, UNDEF, UNDEF, '1kr5/8/8/8/8/8/8/1K6 w k - 0 1')
})
test('black kingside d outer rook', () => {
  checkSquares('d', UNDEF, UNDEF, UNDEF, '1k1r4/8/8/8/8/8/8/1K6 w k - 0 1')
})
test('black kingside e outer rook', () => {
  checkSquares('e', UNDEF, UNDEF, UNDEF, '1k2r3/8/8/8/8/8/8/1K6 w k - 0 1')
})
test('black kingside f outer rook', () => {
  checkSquares('f', UNDEF, UNDEF, UNDEF, '1k3r2/8/8/8/8/8/8/1K6 w k - 0 1')
})
test('black kingside g outer rook', () => {
  checkSquares('g', UNDEF, UNDEF, UNDEF, '1k4r1/8/8/8/8/8/8/1K6 w k - 0 1')
})
test('black kingside h outer rook', () => {
  checkSquares('h', UNDEF, UNDEF, UNDEF, '1k5r/8/8/8/8/8/8/1K6 w k - 0 1')
})

test('black queenside a outer rook', () => {
  checkSquares(UNDEF, 'a', UNDEF, UNDEF, 'r5k1/8/8/8/8/8/8/6K1 w q - 0 1')
})
test('black queenside b outer rook', () => {
  checkSquares(UNDEF, 'b', UNDEF, UNDEF, '1r4k1/8/8/8/8/8/8/6K1 w q - 0 1')
})
test('black queenside c outer rook', () => {
  checkSquares(UNDEF, 'c', UNDEF, UNDEF, '2r3k1/8/8/8/8/8/8/6K1 w q - 0 1')
})
test('black queenside d outer rook', () => {
  checkSquares(UNDEF, 'd', UNDEF, UNDEF, '3r2k1/8/8/8/8/8/8/6K1 w q - 0 1')
})
test('black queenside e outer rook', () => {
  checkSquares(UNDEF, 'e', UNDEF, UNDEF, '4r1k1/8/8/8/8/8/8/6K1 w q - 0 1')
})
test('black queenside f outer rook', () => {
  checkSquares(UNDEF, 'f', UNDEF, UNDEF, '5rk1/8/8/8/8/8/8/6K1 w q - 0 1')
})

test('white kingside c outer rook', () => {
  checkSquares(UNDEF, UNDEF, 'c', UNDEF, '1k6/8/8/8/8/8/8/1KR5 w K - 0 1')
})
test('white kingside d outer rook', () => {
  checkSquares(UNDEF, UNDEF, 'd', UNDEF, '1k6/8/8/8/8/8/8/1K1R4 w K - 0 1')
})
test('white kingside e outer rook', () => {
  checkSquares(UNDEF, UNDEF, 'e', UNDEF, '1k6/8/8/8/8/8/8/1K2R3 w K - 0 1')
})
test('white kingside f outer rook', () => {
  checkSquares(UNDEF, UNDEF, 'f', UNDEF, '1k6/8/8/8/8/8/8/1K3R2 w K - 0 1')
})
test('white kingside g outer rook', () => {
  checkSquares(UNDEF, UNDEF, 'g', UNDEF, '1k6/8/8/8/8/8/8/1K4R1 w K - 0 1')
})
test('white kingside h outer rook', () => {
  checkSquares(UNDEF, UNDEF, 'h', UNDEF, '1k6/8/8/8/8/8/8/1K5R w K - 0 1')
})

test('white queenside a outer rook', () => {
  checkSquares(UNDEF, UNDEF, UNDEF, 'a', '6k1/8/8/8/8/8/8/R5K1 w Q - 0 1')
})
test('white queenside b outer rook', () => {
  checkSquares(UNDEF, UNDEF, UNDEF, 'b', '6k1/8/8/8/8/8/8/1R4K1 w Q - 0 1')
})
test('white queenside c outer rook', () => {
  checkSquares(UNDEF, UNDEF, UNDEF, 'c', '6k1/8/8/8/8/8/8/2R3K1 w Q - 0 1')
})
test('white queenside d outer rook', () => {
  checkSquares(UNDEF, UNDEF, UNDEF, 'd', '6k1/8/8/8/8/8/8/3R2K1 w Q - 0 1')
})
test('white queenside e outer rook', () => {
  checkSquares(UNDEF, UNDEF, UNDEF, 'e', '6k1/8/8/8/8/8/8/4R1K1 w Q - 0 1')
})
test('white queenside f outer rook', () => {
  checkSquares(UNDEF, UNDEF, UNDEF, 'f', '6k1/8/8/8/8/8/8/5RK1 w Q - 0 1')
})

// Ensure castling flags 'A-Ha-h' correspond to inner rooks
test('black kingside c inner rook', () => {
  checkSquares('c', UNDEF, UNDEF, UNDEF, '1kr4r/8/8/8/8/8/8/1K6 w c - 0 1')
})
test('black kingside d inner rook', () => {
  checkSquares('d', UNDEF, UNDEF, UNDEF, '1k1r3r/8/8/8/8/8/8/1K6 w d - 0 1')
})
test('black kingside e inner rook', () => {
  checkSquares('e', UNDEF, UNDEF, UNDEF, '1k2r2r/8/8/8/8/8/8/1K6 w e - 0 1')
})
test('black kingside f inner rook', () => {
  checkSquares('f', UNDEF, UNDEF, UNDEF, '1k3r1r/8/8/8/8/8/8/1K6 w f - 0 1')
})
test('black kingside g inner rook', () => {
  checkSquares('g', UNDEF, UNDEF, UNDEF, '1k4rr/8/8/8/8/8/8/1K6 w g - 0 1')
})

test('black queenside b inner rook', () => {
  checkSquares(UNDEF, 'b', UNDEF, UNDEF, 'rr4k1/8/8/8/8/8/8/6K1 w b - 0 1')
})
test('black queenside c inner rook', () => {
  checkSquares(UNDEF, 'c', UNDEF, UNDEF, 'r1r3k1/8/8/8/8/8/8/6K1 w c - 0 1')
})
test('black queenside d inner rook', () => {
  checkSquares(UNDEF, 'd', UNDEF, UNDEF, 'r2r2k1/8/8/8/8/8/8/6K1 w d - 0 1')
})
test('black queenside e inner rook', () => {
  checkSquares(UNDEF, 'e', UNDEF, UNDEF, 'r3r1k1/8/8/8/8/8/8/6K1 w e - 0 1')
})
test('black queenside f inner rook', () => {
  checkSquares(UNDEF, 'f', UNDEF, UNDEF, 'r4rk1/8/8/8/8/8/8/6K1 w f - 0 1')
})

test('white kingside c inner rook', () => {
  checkSquares(UNDEF, UNDEF, 'c', UNDEF, '1k6/8/8/8/8/8/8/1KR4R w C - 0 1')
})
test('white kingside d inner rook', () => {
  checkSquares(UNDEF, UNDEF, 'd', UNDEF, '1k6/8/8/8/8/8/8/1K1R3R w D - 0 1')
})
test('white kingside e inner rook', () => {
  checkSquares(UNDEF, UNDEF, 'e', UNDEF, '1k6/8/8/8/8/8/8/1K2R2R w E - 0 1')
})
test('white kingside f inner rook', () => {
  checkSquares(UNDEF, UNDEF, 'f', UNDEF, '1k6/8/8/8/8/8/8/1K3R1R w F - 0 1')
})
test('white kingside g inner rook', () => {
  checkSquares(UNDEF, UNDEF, 'g', UNDEF, '1k6/8/8/8/8/8/8/1K4RR w G - 0 1')
})

test('white queenside b inner rook', () => {
  checkSquares(UNDEF, UNDEF, UNDEF, 'b', '6k1/8/8/8/8/8/8/RR4K1 w B - 0 1')
})
test('white queenside c inner rook', () => {
  checkSquares(UNDEF, UNDEF, UNDEF, 'c', '6k1/8/8/8/8/8/8/R1R3K1 w C - 0 1')
})
test('white queenside d inner rook', () => {
  checkSquares(UNDEF, UNDEF, UNDEF, 'd', '6k1/8/8/8/8/8/8/R2R2K1 w D - 0 1')
})
test('white queenside e inner rook', () => {
  checkSquares(UNDEF, UNDEF, UNDEF, 'e', '6k1/8/8/8/8/8/8/R3R1K1 w E - 0 1')
})
test('white queenside f inner rook', () => {
  checkSquares(UNDEF, UNDEF, UNDEF, 'f', '6k1/8/8/8/8/8/8/R4RK1 w F - 0 1')
})

// All tests above had a single character in the castling field.
// The following tests are spot-checks to ensure that a multi-character
// castling field is interpreted correctly.
test('black kingside and queenside outer rook flags', () => {
  checkSquares('g', 'b', UNDEF, UNDEF, '1r3kr1/8/8/8/8/8/8/5K2 w kq - 0 1')
})

test('black kingside and queenside inner rook flags', () => {
  checkSquares('g', 'b', UNDEF, UNDEF, '1r3kr1/8/8/8/8/8/8/5K2 w bg - 0 1')
})

test('white kingside and queenside outer rook flags', () => {
  checkSquares(UNDEF, UNDEF, 'g', 'b', '5k2/8/8/8/8/8/8/1R3KR1 w KQ - 0 1')
})

test('white kingside and queenside inner rook flags', () => {
  checkSquares(UNDEF, UNDEF, 'g', 'b', '5k2/8/8/8/8/8/8/1R3KR1 w BG - 0 1')
})

test('black and white kingside and queenside outer rook flags', () => {
  checkSquares('g', 'b', 'g', 'b', '1r2k1r1/8/8/8/8/8/8/1R2K1R1 w KQkq - 0 1')
})

test('black and white kingside and queenside inner rook flags', () => {
  checkSquares('g', 'b', 'g', 'b', '1r2k1r1/8/8/8/8/8/8/1R2K1R1 w BGbg - 0 1')
})
