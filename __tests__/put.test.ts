import {
  Chess,
  Piece,
  PieceSymbol,
  Square,
  WHITE,
  BLACK,
  PAWN,
  KNIGHT,
  BISHOP,
  ROOK,
  KING,
} from '../src/chess'

test('put', () => {
  const chess = new Chess()
  chess.clear()

  const piece: Piece = {
    type: ROOK,
    color: BLACK,
  }
  expect(chess.put(piece, 'a1')).toEqual(true)
  expect(chess.get('a1')).toEqual(piece)
})

//test('put - capitalized square', () => {
//  const chess = new Chess()
//  chess.clear()
//
//  const piece = { type: ROOK, color: BLACK }
//  expect(chess.put(piece, 'A1')).toEqual(true)
//  expect(chess.get('a1')).toEqual(piece)
//})

test('put - bad piece', () => {
  const chess = new Chess()
  expect(
    chess.put({ type: 'bad-piece' as PieceSymbol, color: WHITE }, 'a7'),
  ).toEqual(false)
})

test('put - bad square', () => {
  const chess = new Chess()
  expect(chess.put({ type: PAWN, color: WHITE }, 'a9' as Square)).toEqual(false)
})

test('put - disallow two white kings', () => {
  const chess = new Chess()
  chess.clear()
  const piece: Piece = { type: KING, color: WHITE }
  expect(chess.put(piece, 'a2')).toEqual(true)
  expect(chess.put(piece, 'a3')).toEqual(false)
})

test('put - disallow two black kings', () => {
  const chess = new Chess()
  chess.clear()
  const piece: Piece = { type: KING, color: BLACK }
  expect(chess.put(piece, 'e8')).toEqual(true)
  expect(chess.put(piece, 'd8')).toEqual(false)
})

test('put - allow two kings if overwriting the same square', () => {
  const chess = new Chess()
  chess.clear()
  const piece: Piece = { type: KING, color: WHITE }
  expect(chess.put(piece, 'a2')).toEqual(true)
  expect(chess.put(piece, 'a2')).toEqual(true)
})

test('put - replacing white kingside rook loses castling right', () => {
  const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1')

  chess.put({ type: KNIGHT, color: WHITE }, 'h1')
  expect(chess.moves()).not.toContain('O-O')
})

test('put - replacing white queenside rook loses castling right', () => {
  const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1')

  chess.put({ type: KNIGHT, color: WHITE }, 'a1')
  expect(chess.moves()).not.toContain('O-O-O')
})

test('put - replacing white king loses castling rights', () => {
  const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1')

  chess.put({ type: KNIGHT, color: WHITE }, 'e1')
  expect(chess.moves()).not.toContain('O-O')
  expect(chess.moves()).not.toContain('O-O-O')
})

test('put - replacing black kingside rook loses castling right', () => {
  const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R b KQkq - 0 1')

  chess.put({ type: KNIGHT, color: BLACK }, 'h8')
  expect(chess.moves()).not.toContain('O-O')
})

test('put - replacing black queenside rook loses castling right', () => {
  const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R b KQkq - 0 1')

  chess.put({ type: KNIGHT, color: BLACK }, 'a8')
  expect(chess.moves()).not.toContain('O-O-O')
})

test('put - replacing black king loses castling rights', () => {
  const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R b KQkq - 0 1')

  chess.put({ type: KNIGHT, color: BLACK }, 'e8')
  expect(chess.moves()).not.toContain('O-O')
  expect(chess.moves()).not.toContain('O-O-O')
})

test('put - replacing white pawn clears en passant square', () => {
  const chess = new Chess(
    'rnbqkbnr/pppppp1p/8/8/3PPPp1/8/PPP3PP/RNBQKBNR b KQkq f3 0 3',
  )

  chess.put({ type: KNIGHT, color: WHITE }, 'f4')
  expect(chess.moves()).not.toContain('gxf3')
})

test('put - occupying white en passant square clears it', () => {
  const chess = new Chess(
    'rnbqkbnr/pppppp1p/8/8/3PPPp1/8/PPP3PP/RNBQKBNR b KQkq f3 0 3',
  )

  chess.put({ type: KNIGHT, color: BLACK }, 'f3')
  expect(chess.moves()).not.toContain('gxf3')
})

test('put - occupying white starting square clears en passant square', () => {
  const chess = new Chess(
    'rnbqkbnr/pppppp1p/8/8/3PPPp1/8/PPP3PP/RNBQKBNR b KQkq f3 0 3',
  )

  chess.put({ type: KNIGHT, color: WHITE }, 'f2')
  expect(chess.moves()).not.toContain('gxf3')
})

test('put - replacing black pawn clears white en passant square 1', () => {
  const chess = new Chess(
    'rnbqkbnr/pppppp1p/8/8/3PPPp1/8/PPP3PP/RNBQKBNR b KQkq f3 0 3',
  )

  chess.put({ type: BISHOP, color: BLACK }, 'g4')
  expect(chess.moves()).not.toContain('gxf3')
})

test('put - replacing black pawn clears white en passant square 2', () => {
  const chess = new Chess(
    'rnbqkbnr/p1pppppp/8/8/1pPPP3/8/PP3PPP/RNBQKBNR b KQkq c3 0 3',
  )

  chess.put({ type: BISHOP, color: BLACK }, 'b4')
  expect(chess.moves()).not.toContain('bxc3')
})

test('put - replacing black pawn clears en passant square', () => {
  const chess = new Chess(
    'rnbqkbnr/pppp2pp/8/4ppP1/8/8/PPPPPP1P/RNBQKBNR w KQkq f6 0 3',
  )

  chess.put({ type: KNIGHT, color: BLACK }, 'f5')
  expect(chess.moves()).not.toContain('gxf6')
})

test('put - occupying black en passant square clears it', () => {
  const chess = new Chess(
    'rnbqkbnr/pppp2pp/8/4ppP1/8/8/PPPPPP1P/RNBQKBNR w KQkq f6 0 3',
  )

  chess.put({ type: KNIGHT, color: WHITE }, 'f6')
  expect(chess.moves()).not.toContain('gxf6')
})

test('put - occupying black starting square clears en passant square', () => {
  const chess = new Chess(
    'rnbqkbnr/pppp2pp/8/4ppP1/8/8/PPPPPP1P/RNBQKBNR w KQkq f6 0 3',
  )

  chess.put({ type: KNIGHT, color: BLACK }, 'f7')
  expect(chess.moves()).not.toContain('gxf6')
})

test('put - replacing white pawn clears black en passant square 1', () => {
  const chess = new Chess(
    'rnbqkbnr/pppp2pp/8/4ppP1/8/8/PPPPPP1P/RNBQKBNR w KQkq f6 0 3',
  )

  chess.put({ type: BISHOP, color: WHITE }, 'g5')
  expect(chess.moves()).not.toContain('gxf6')
})

test('put - replacing white pawn clears black en passant square 2', () => {
  const chess = new Chess(
    'rnbqkbnr/pp2pppp/8/1Ppp4/8/8/P1PPPPPP/RNBQKBNR w KQkq c6 0 3',
  )

  chess.put({ type: BISHOP, color: WHITE }, 'b5')
  expect(chess.moves()).not.toContain('bxc6')
})
