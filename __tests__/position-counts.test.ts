import { Chess as ChessClass, DEFAULT_POSITION } from '../src/chess'
import { expect, test } from 'vitest'

// We need to use `Chess as any` to access private property
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/naming-convention
const Chess = ChessClass as any
const defaultHash = BigInt('0x' + new Chess(DEFAULT_POSITION).hash())
const e4Fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1'
const e4Hash = BigInt('0x' + new Chess(e4Fen).hash())

test('positionCount - counts repeated positions', () => {
  const chess = new Chess()
  expect(chess._getPositionCount(defaultHash)).toBe(1)

  const hashes: bigint[] = [defaultHash]
  const moves: string[] = ['Nf3', 'Nf6', 'Ng1', 'Ng8']
  for (const move of moves) {
    for (const hash of hashes) {
      expect(chess._getPositionCount(hash)).toBe(1)
    }
    chess.move(move)
    hashes.push(BigInt('0x' + chess.hash()))
  }
  expect(chess._getPositionCount(defaultHash)).toBe(2)
  expect(chess._positionCount.size).toBe(4)
})

test('positionCount - removes when undo', () => {
  const chess = new Chess()
  expect(chess._getPositionCount(defaultHash)).toBe(1)
  expect(chess._getPositionCount(e4Hash)).toBe(0)
  chess.move('e4')
  expect(chess._getPositionCount(defaultHash)).toBe(1)
  expect(chess.fen()).toBe(e4Fen)
  expect(chess._getPositionCount(e4Hash)).toBe(1)

  chess.undo()
  expect(chess._getPositionCount(defaultHash)).toBe(1)
  expect(chess._getPositionCount(e4Hash)).toBe(0)
  expect(chess._positionCount.size).toBe(1)
})

test('positionCount - resets when cleared', () => {
  const chess = new Chess()

  chess.move('e4')
  chess.clear()
  expect(chess._getPositionCount(defaultHash)).toBe(0)
  expect(chess._positionCount.size).toBe(0)
})

test('positionCount - resets when loading FEN', () => {
  const chess = new Chess()
  expect(chess._getPositionCount(defaultHash)).toBe(1)
  chess.move('e4')
  expect(chess._getPositionCount(defaultHash)).toBe(1)
  expect(chess._getPositionCount(e4Hash)).toBe(1)

  const newFen =
    'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2'
  chess.load(newFen)
  const newHash = BigInt('0x' + chess.hash())

  expect(chess._getPositionCount(defaultHash)).toBe(0)
  expect(chess._getPositionCount(e4Hash)).toBe(0)
  expect(chess._getPositionCount(newHash)).toBe(1)
  expect(chess._positionCount.size).toBe(1)
})

test('positionCount - resets when loading PGN', () => {
  const chess = new Chess()
  chess.move('e4')

  chess.loadPgn('1. d4 d5')
  expect(chess._getPositionCount(defaultHash)).toBe(1)
  expect(chess._getPositionCount(e4Hash)).toBe(0)
  expect(
    chess._getPositionCount(
      BigInt(
        '0x' +
          new Chess(
            'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1',
          ).hash(),
      ),
    ),
  ).toBe(1)
  expect(
    chess._getPositionCount(
      BigInt(
        '0x' +
          new Chess(
            'rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2',
          ).hash(),
      ),
    ),
  ).toBe(1)
  expect(chess._positionCount.size).toBe(3)
})
