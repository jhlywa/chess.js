import { BLACK, Chess, KING, QUEEN, WHITE } from '../src/chess'
import { expect, test } from 'vitest'

test('setCastlingRights - clear white kingside', () => {
  const chess = new Chess()

  expect(chess.setCastlingRights(WHITE, { [KING]: false })).toBeTruthy()
  expect(chess.getCastlingRights(WHITE)[KING]).toBeFalsy()
})

test('setCastlingRights - clear white queenside', () => {
  const chess = new Chess()

  expect(chess.setCastlingRights(WHITE, { [QUEEN]: false })).toBeTruthy()
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toBeFalsy()
})

test('setCastlingRights - clear black kingside', () => {
  const chess = new Chess()

  expect(chess.setCastlingRights(BLACK, { [KING]: false })).toBeTruthy()
  expect(chess.getCastlingRights(BLACK)[KING]).toBeFalsy()
})

test('setCastlingRights - clear black queenside', () => {
  const chess = new Chess()

  expect(chess.setCastlingRights(BLACK, { [QUEEN]: false })).toBeTruthy()
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toBeFalsy()
})

test('setCastlingRights - set white kingside', () => {
  const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R w - - 0 1')

  expect(chess.setCastlingRights(WHITE, { [KING]: true })).toBeTruthy()
  expect(chess.getCastlingRights(WHITE)[KING]).toBeTruthy()
})

test('setCastlingRights - set white queenside', () => {
  const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R w - - 0 1')

  expect(chess.setCastlingRights(WHITE, { [QUEEN]: true })).toBeTruthy()
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toBeTruthy()
})

test('setCastlingRights - set black kingside', () => {
  const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R w - - 0 1')

  expect(chess.setCastlingRights(BLACK, { [KING]: true })).toBeTruthy()
  expect(chess.getCastlingRights(BLACK)[KING]).toBeTruthy()
})

test('setCastlingRights - set black queenside', () => {
  const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R w - - 0 1')
  expect(chess.setCastlingRights(BLACK, { [QUEEN]: true })).toBeTruthy()
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toBeTruthy()
})

test('setCastlingRights - fail to set white kingside', () => {
  const chess = new Chess()
  chess.clear()

  expect(chess.setCastlingRights(WHITE, { [KING]: true })).toBeFalsy()
  expect(chess.getCastlingRights(WHITE)[KING]).toBeFalsy()
})

test('setCastlingRights - fail to set white queenside', () => {
  const chess = new Chess()
  chess.clear()

  expect(chess.setCastlingRights(WHITE, { [QUEEN]: true })).toBeFalsy()
  expect(chess.getCastlingRights(WHITE)[QUEEN]).toBeFalsy()
})

test('setCastlingRights - fail to set black kingside', () => {
  const chess = new Chess()
  chess.clear()

  expect(chess.setCastlingRights(BLACK, { [KING]: true })).toBeFalsy()
  expect(chess.getCastlingRights(BLACK)[KING]).toBeFalsy()
})

test('setCastlingRights - fail to set black queenside', () => {
  const chess = new Chess()
  chess.clear()

  expect(chess.setCastlingRights(BLACK, { [QUEEN]: true })).toBeFalsy()
  expect(chess.getCastlingRights(BLACK)[QUEEN]).toBeFalsy()
})
