import {
  Chess,
  Piece,
  PieceSymbol,
  Square,
  WHITE,
  BLACK,
  PAWN,
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
    chess.put({ type: 'bad-piece' as PieceSymbol, color: WHITE }, 'a7')
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
