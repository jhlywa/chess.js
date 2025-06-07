import { Chess } from '../src/chess'
import { test, expect } from 'vitest'

test('null move at start', () => {
  const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  const next = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 1 1'
  const chess = new Chess(fen)
  chess.move('--')
  expect(chess.fen()).toBe(next)
})

test('making null move by passing null object', () => {
  const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  const next = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 1 1'
  const chess = new Chess(fen)
  chess.move(null)
  expect(chess.fen()).toBe(next)
})

test('null move is correctly displayed in pgn', () => {
  const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  const chess = new Chess(fen)
  chess.move('e4')
  chess.move('e5')
  chess.move('--')
  chess.move('Nf6')
  chess.move('--')
  chess.move('--')
  chess.move('Nf3')

  expect(chess.pgn()).toBe(
    '[Event "?"]\n[Site "?"]\n[Date "????.??.??"]\n[Round "?"]\n[White "?"]\n[Black "?"]\n[Result "*"]\n\n1. e4 e5 2. -- Nf6 3. -- -- 4. Nf3 *',
  )
})

test('null move while in check is not allowed', () => {
  const fn = () => {
    const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

    const chess = new Chess(fen)
    chess.move('e4')
    chess.move('e5')
    chess.move('Nf3')
    chess.move('d6')
    chess.move('Bb5+')
    chess.move('--')
  }
  expect(fn).toThrow('Null move not allowed when in check')
})

//tests describing current behaviour and should be discussed if this behaviour is desired or if other null move logic is better

test('6 null moves in a row result in a draw', () => {
  const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  const chess = new Chess(fen)
  chess.move('--')
  chess.move('--')
  chess.move('--')
  chess.move(null)
  chess.move(null)
  chess.move(null)

  expect(chess.isDraw()).toBe(true)
})
