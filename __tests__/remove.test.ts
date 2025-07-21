import {
  Chess,
  Square,
  QUEEN,
  WHITE,
  KNIGHT,
  BISHOP,
  BLACK,
} from '../src/chess'
import { expect, test } from 'vitest'

test('remove - returns piece', () => {
  const chess = new Chess()
  expect(chess.remove('d1')).toEqual({ type: QUEEN, color: WHITE })
  expect(chess.get('d1')).toEqual(undefined)

  expect(chess.hash()).toEqual(new Chess(chess.fen()).hash())
})

test('remove - returns undefined for empty square', () => {
  const chess = new Chess()
  expect(chess.remove('e4')).toEqual(undefined)

  expect(chess.hash()).toEqual(new Chess(chess.fen()).hash())
})

test('remove - returns undefined for invalid square', () => {
  const chess = new Chess()
  expect(chess.remove('bad_square' as Square)).toEqual(undefined)

  expect(chess.hash()).toEqual(new Chess(chess.fen()).hash())
})

test('remove - removing white kingside rook loses castling right', () => {
  const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1')

  chess.remove('h1')
  expect(chess.moves()).not.toContain('O-O')

  expect(chess.hash()).toEqual(new Chess(chess.fen()).hash())
})

test('remove - removing white queenside rook loses castling right', () => {
  const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1')

  chess.remove('a1')
  expect(chess.moves()).not.toContain('O-O-O')

  expect(chess.hash()).toEqual(new Chess(chess.fen()).hash())
})

test('remove - removing white king loses castling rights', () => {
  const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1')

  chess.remove('e1')
  expect(chess.moves()).not.toContain('O-O')
  expect(chess.moves()).not.toContain('O-O-O')

  expect(chess.hash()).toEqual(
    new Chess(chess.fen(), { skipValidation: true }).hash(),
  )
})

test('remove - removing black kingside rook loses castling right', () => {
  const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R b KQkq - 0 1')

  chess.remove('h8')
  expect(chess.moves()).not.toContain('O-O')

  expect(chess.hash()).toEqual(new Chess(chess.fen()).hash())
})

test('remove - removing black queenside rook loses castling right', () => {
  const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R b KQkq - 0 1')

  chess.remove('a8')
  expect(chess.moves()).not.toContain('O-O-O')

  expect(chess.hash()).toEqual(new Chess(chess.fen()).hash())
})

test('remove - removing black king loses castling rights', () => {
  const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K2R b KQkq - 0 1')

  chess.remove('e8')
  expect(chess.moves()).not.toContain('O-O')
  expect(chess.moves()).not.toContain('O-O-O')

  expect(chess.hash()).toEqual(
    new Chess(chess.fen(), { skipValidation: true }).hash(),
  )
})

test('remove - removing white pawn clears en passant square', () => {
  const chess = new Chess(
    'rnbqkbnr/pppppp1p/8/8/3PPPp1/8/PPP3PP/RNBQKBNR b KQkq f3 0 3',
  )

  chess.remove('f4')
  expect(chess.moves()).not.toContain('gxf3')

  expect(chess.hash()).toEqual(new Chess(chess.fen()).hash())
})

test('remove - removing black pawn clears white en passant square 1', () => {
  const chess = new Chess(
    'rnbqkbnr/pppppp1p/8/8/3PPPp1/8/PPP3PP/RNBQKBNR b KQkq f3 0 3',
  )

  chess.remove('g4')
  expect(chess.moves()).not.toContain('gxf3')

  expect(chess.hash()).toEqual(new Chess(chess.fen()).hash())
})

test('remove - removing black pawn clears white en passant square 2', () => {
  const chess = new Chess(
    'rnbqkbnr/p1pppppp/8/8/1pPPP3/8/PP3PPP/RNBQKBNR b KQkq c3 0 3',
  )

  chess.remove('b4')
  expect(chess.moves()).not.toContain('bxc3')

  expect(chess.hash()).toEqual(new Chess(chess.fen()).hash())
})

test('remove - removing black pawn clears en passant square', () => {
  const chess = new Chess(
    'rnbqkbnr/pppp2pp/8/4ppP1/8/8/PPPPPP1P/RNBQKBNR w KQkq f6 0 3',
  )

  chess.remove('f5')
  expect(chess.moves()).not.toContain('gxf6')

  expect(chess.hash()).toEqual(new Chess(chess.fen()).hash())
})

test('remove - removing white pawn clears black en passant square 1', () => {
  const chess = new Chess(
    'rnbqkbnr/pppp2pp/8/4ppP1/8/8/PPPPPP1P/RNBQKBNR w KQkq f6 0 3',
  )

  chess.remove('g5')
  expect(chess.moves()).not.toContain('gxf6')

  expect(chess.hash()).toEqual(new Chess(chess.fen()).hash())
})

test('remove - removing white pawn clears black en passant square 2', () => {
  const chess = new Chess(
    'rnbqkbnr/pp2pppp/8/1Ppp4/8/8/P1PPPPPP/RNBQKBNR w KQkq c6 0 3',
  )

  chess.remove('b5')
  expect(chess.moves()).not.toContain('bxc6')

  expect(chess.hash()).toEqual(new Chess(chess.fen()).hash())
})

test('remove - reaching initial position deletes setup headers', () => {
  const chess = new Chess()
  chess.loadPgn(`[SetUp "1"]
    [FEN "rnbqkbnr/pppppppp/p7/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"]

*`)

  chess.remove('a6')

  const headers = chess.getHeaders()
  expect(headers['Setup']).toBeUndefined()
  expect(headers['FEN']).toBeUndefined()

  expect(chess.hash()).toEqual(new Chess(chess.fen()).hash())
})

test('remove - if a move has been made, reaching initial position does not delete setup headers', () => {
  const chess = new Chess()
  chess.loadPgn(`[SetUp "1"]
    [FEN "rnbqkbnr/pppppppp/p7/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"]

*`)

  // Shuffle the knights
  chess.move('Nf3')
  chess.move('Nf6')
  chess.move('Ng1')
  chess.move('Ng8')

  // Reach the initial position.
  chess.remove('a6')

  /**
   * The FEN header should not have been deleted despite reach
   * initial position. However, Setup header may have been deleted
   * unrelatedly.
   */
  const headers = chess.getHeaders()
  expect(headers['FEN']).toBeDefined()

  expect(chess.hash()).toEqual(new Chess(chess.fen()).hash())
})
