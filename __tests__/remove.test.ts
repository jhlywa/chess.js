import { Chess, Square, QUEEN, WHITE } from '../src/chess'

test('remove - returns piece', () => {
  const chess = new Chess()
  expect(chess.remove('d1')).toEqual({ type: QUEEN, color: WHITE })
  expect(chess.get('d1')).toEqual(false)
})

test('remove - returns false for empty square', () => {
  const chess = new Chess()
  expect(chess.remove('e4')).toEqual(false)
})

test('remove - returns false for invalid square', () => {
  const chess = new Chess()
  expect(chess.remove('bad_square' as Square)).toEqual(false)
})

test('remove - removing white kingside rook loses castling right', () => {
  const chess = new Chess("r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1")

  chess.remove('h1')
  expect(chess.moves()).not.toContain('O-O')
});

test('remove - removing white queenside rook loses castling right', () => {
  const chess = new Chess("r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1")

  chess.remove('a1')
  expect(chess.moves()).not.toContain('O-O-O')
});

test('remove - removing white king loses castling rights', () => {
  const chess = new Chess("r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1")

  chess.remove('e1')
  expect(chess.moves()).not.toContain('O-O')
  expect(chess.moves()).not.toContain('O-O-O')
});

test('remove - removing black kingside rook loses castling right', () => {
  const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R b KQkq - 0 1')

  chess.remove('h8')
  expect(chess.moves()).not.toContain('O-O')
});

test('remove - removing black queenside rook loses castling right', () => {
  const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R b KQkq - 0 1')

  chess.remove('a8')
  expect(chess.moves()).not.toContain('O-O-O')
});

test('remove - removing black king loses castling rights', () => {
  const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R b KQkq - 0 1')

  chess.remove( 'e8')
  expect(chess.moves()).not.toContain('O-O')
  expect(chess.moves()).not.toContain('O-O-O')
});
