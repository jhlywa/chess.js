import { Chess } from '../src/chess'

test('null move', () => {
  const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  const next = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1'
  const chess = new Chess(fen)
  chess.move('--')
  expect(chess.fen()).toBe(next)
})
