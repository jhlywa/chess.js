import { BLACK, Chess, KING_SIDE, QUEEN_SIDE, WHITE } from '../src/chess'

test('setCastlingRights - clear white kingside', () => {
  const chess = new Chess()

  expect(chess.setCastlingRight(WHITE, KING_SIDE, false)).toEqual(true)
  expect(chess.getCastlingRight(WHITE, KING_SIDE)).toEqual(false)
})

test('setCastlingRights - clear white queenside', () => {
  const chess = new Chess()

  expect(chess.setCastlingRight(WHITE, QUEEN_SIDE, false)).toEqual(true)
  expect(chess.getCastlingRight(WHITE, QUEEN_SIDE)).toEqual(false)
})

test('setCastlingRights - clear black kingside', () => {
  const chess = new Chess()

  expect(chess.setCastlingRight(BLACK, KING_SIDE, false)).toEqual(true)
  expect(chess.getCastlingRight(BLACK, KING_SIDE)).toEqual(false)
})

test('setCastlingRights - clear black queenside', () => {
  const chess = new Chess()

  expect(chess.setCastlingRight(BLACK, QUEEN_SIDE, false)).toEqual(true)
  expect(chess.getCastlingRight(BLACK, QUEEN_SIDE)).toEqual(false)
})

test('setCastlingRights - set white kingside', () => {
  const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R w - - 0 1')

  expect(chess.setCastlingRight(WHITE, KING_SIDE, true)).toEqual(true)
  expect(chess.getCastlingRight(WHITE, KING_SIDE)).toEqual(true)
})

test('setCastlingRights - set white queenside', () => {
  const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R w - - 0 1')

  expect(chess.setCastlingRight(WHITE, QUEEN_SIDE, true)).toEqual(true)
  expect(chess.getCastlingRight(WHITE, QUEEN_SIDE)).toEqual(true)
})

test('setCastlingRights - set black kingside', () => {
  const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R w - - 0 1')

  expect(chess.setCastlingRight(BLACK, KING_SIDE, true)).toEqual(true)
  expect(chess.getCastlingRight(BLACK, KING_SIDE)).toEqual(true)
})

test('setCastlingRights - set black queenside', () => {
  const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R w - - 0 1')

  expect(chess.setCastlingRight(BLACK, QUEEN_SIDE, true)).toEqual(true)
  expect(chess.getCastlingRight(BLACK, QUEEN_SIDE)).toEqual(true)
})

test('setCastlingRights - fail to set white kingside', () => {
  const chess = new Chess()
  chess.clear()

  expect(chess.setCastlingRight(WHITE, KING_SIDE, true)).toEqual(false)
  expect(chess.getCastlingRight(WHITE, KING_SIDE)).toEqual(false)
})

test('setCastlingRights - fail to set white queenside', () => {
  const chess = new Chess()
  chess.clear()

  expect(chess.setCastlingRight(WHITE, QUEEN_SIDE, true)).toEqual(false)
  expect(chess.getCastlingRight(WHITE, QUEEN_SIDE)).toEqual(false)
})

test('setCastlingRights - fail to set black kingside', () => {
  const chess = new Chess()
  chess.clear()

  expect(chess.setCastlingRight(BLACK, KING_SIDE, true)).toEqual(false)
  expect(chess.getCastlingRight(BLACK, KING_SIDE)).toEqual(false)
})

test('setCastlingRights - fail to set black queenside', () => {
  const chess = new Chess()
  chess.clear()

  expect(chess.setCastlingRight(BLACK, QUEEN_SIDE, true)).toEqual(false)
  expect(chess.getCastlingRight(BLACK, QUEEN_SIDE)).toEqual(false)
})
