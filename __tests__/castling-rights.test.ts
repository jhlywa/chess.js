import { BLACK, Chess, KING, QUEEN, WHITE } from '../src/chess'

test('setCastlingRights - clear white kingside', () => {
  const chess = new Chess()

  expect(chess.setCastlingRights(WHITE, { [KING]: false })).toEqual(true)
  expect(chess.getCastlingRights(WHITE)[KING]).toEqual(false)
})

test('setCastlingRights - clear white queenside', () => {
  const chess = new Chess()

  expect(chess.setCastlingRights(WHITE, { [QUEEN]: false })).toEqual(true)
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toEqual(false)
})

test('setCastlingRights - clear black kingside', () => {
  const chess = new Chess()

  expect(chess.setCastlingRights(BLACK, { [KING]: false })).toEqual(true)
  expect(chess.getCastlingRights(BLACK)[KING]).toEqual(false)
})

test('setCastlingRights - clear black queenside', () => {
  const chess = new Chess()

  expect(chess.setCastlingRights(BLACK, { [QUEEN]: false })).toEqual(true)
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toEqual(false)
})

test('setCastlingRights - set white kingside', () => {
  const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R w - - 0 1')

  expect(chess.setCastlingRights(WHITE, { [KING]: true })).toEqual(true)
  expect(chess.getCastlingRights(WHITE)[KING]).toEqual(true)
})

test('setCastlingRights - set white queenside', () => {
  const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R w - - 0 1')

  expect(chess.setCastlingRights(WHITE, { [QUEEN]: true })).toEqual(true)
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toEqual(true)
})

test('setCastlingRights - set black kingside', () => {
  const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R w - - 0 1')

  expect(chess.setCastlingRights(BLACK, { [KING]: true })).toEqual(true)
  expect(chess.getCastlingRights(BLACK)[KING]).toEqual(true)
})

test('setCastlingRights - set black queenside', () => {
  const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R w - - 0 1')

  expect(chess.setCastlingRights(BLACK, { [QUEEN]: true })).toEqual(true)
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toEqual(true)
})

test('setCastlingRights - fail to set white kingside', () => {
  const chess = new Chess()
  chess.clear()

  expect(chess.setCastlingRights(WHITE, { [KING]: true })).toEqual(false)
  expect(chess.getCastlingRights(WHITE)[KING]).toEqual(false)
})

test('setCastlingRights - fail to set white queenside', () => {
  const chess = new Chess()
  chess.clear()

  expect(chess.setCastlingRights(WHITE, { [QUEEN]: true })).toEqual(false)
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toEqual(false)
})

test('setCastlingRights - fail to set black kingside', () => {
  const chess = new Chess()
  chess.clear()

  expect(chess.setCastlingRights(BLACK, { [KING]: true })).toEqual(false)
  expect(chess.getCastlingRights(BLACK)[KING]).toEqual(false)
})

test('setCastlingRights - fail to set black queenside', () => {
  const chess = new Chess()
  chess.clear()

  expect(chess.setCastlingRights(BLACK, { [QUEEN]: true })).toEqual(false)
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toEqual(false)
})
