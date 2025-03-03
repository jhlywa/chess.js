import { Chess } from '../../src/chess'

test('should enable Chess960 when Chess960 Variant header exists', () => {
  const pgn = `
[Variant "Chess960"]

1. c4
`

  const chess = new Chess()
  chess.loadPgn(pgn)
  expect(chess.isVariantChess960()).toBeTruthy()
})

test('should enable Chess960 when Fischerandom Variant header exists', () => {
  const pgn = `
[Variant "Fischerandom"]

1. c4
`

  const chess = new Chess()
  chess.loadPgn(pgn)
  expect(chess.isVariantChess960()).toBeTruthy()
})

test('should output Variant header when Chess960 is enabled via method', () => {
  const pgnIn = `
1. c4
`
  const pgnOut = `
[Variant "Chess960"]

1. c4
`

  const chess = new Chess()
  chess.loadPgn(pgnIn)
  chess.setVariantChess960()
  expect(chess.isVariantChess960()).toBeTruthy()
  expect(chess.pgn().trim()).toEqual(pgnOut.trim())
})

test('should output Variant header when Chess960 is enabled via constructor', () => {
  const pgnOut = `
[SetUp "1"]
[FEN "k7/8/8/8/8/8/8/K7 w - - 0 1"]
[Variant "Chess960"]
`

  const chess = new Chess('k7/8/8/8/8/8/8/K7 w - - 0 1', { enable960: true })
  expect(chess.isVariantChess960()).toBeTruthy()
  expect(chess.pgn().trim()).toEqual(pgnOut.trim())
})

test('should not output Variant header when Variant header exists', () => {
  const pgn = `
[Variant "Sometext"]

1. c4
`
  const chess = new Chess()
  chess.loadPgn(pgn)
  expect(chess.isVariantChess960()).toBeFalsy()
  expect(chess.getHeaders()['Variant']).toEqual('Sometext')
  expect(chess.pgn().trim()).toEqual(pgn.trim())
})
