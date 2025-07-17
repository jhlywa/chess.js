import { Chess } from '../../src/chess'
import { expect, test } from 'vitest'

test('should enable Chess960 when Chess960 Variant header exists', () => {
  const pgn = `
[Variant "Chess960"]

1. c4
`

  const chess = new Chess()
  chess.loadPgn(pgn)
  expect(chess.isChess960()).toBeTruthy()
})

test('should enable Chess960 when Fischerandom Variant header exists', () => {
  const pgn = `
[Variant "Fischerandom"]

1. c4
`

  const chess = new Chess()
  chess.loadPgn(pgn)
  expect(chess.isChess960()).toBeTruthy()
})

test('should output Variant header when Chess960 is enabled via constructor', () => {
  const pgnOut = `
[Event "?"]
[Site "?"]
[Date "????.??.??"]
[Round "?"]
[White "?"]
[Black "?"]
[Result "*"]
[SetUp "1"]
[FEN "k7/8/8/8/8/8/8/K7 w - - 0 1"]
[Variant "Chess960"]
 *
`

  const chess = new Chess('k7/8/8/8/8/8/8/K7 w - - 0 1', { chess960: true })
  expect(chess.isChess960()).toBeTruthy()
  expect(chess.pgn().trim()).toEqual(pgnOut.trim())
})

test('should not output Variant header when Variant header exists', () => {
  const pgn = `
[Event "?"]
[Site "?"]
[Date "????.??.??"]
[Round "?"]
[White "?"]
[Black "?"]
[Result "*"]
[Variant "Sometext"]

1. c4 *
`
  const chess = new Chess()
  chess.loadPgn(pgn)
  expect(chess.isChess960()).toBeFalsy()
  expect(chess.getHeaders()['Variant']).toEqual('Sometext')
  expect(chess.pgn().trim()).toEqual(pgn.trim())
})

test('should accept Chess960 castling rights in FEN header of PGN', () => {
  const pgnIn = `
[SetUp "1"]
[FEN "r3k2r/8/8/8/8/8/8/R3K2R w HAha - 0 1"]
[Variant "Chess960"]
`
  const chess = new Chess()
  chess.loadPgn(pgnIn)
  expect(chess.isChess960()).toBeTruthy()
})
