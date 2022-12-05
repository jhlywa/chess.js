import { Chess } from '../src/chess'

describe('.load() / .fen() should be symmetric', () => {
  const validPositions = [
    'k7/8/8/8/8/8/8/7K w - - 0 1',
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    '1nbqkbn1/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/1NBQKBN1 b - - 1 2',
  ]

  const chess = new Chess()

  validPositions.forEach((fen) => {
    it('fen symmetry - ' + fen, () => {
      expect(() => chess.load(fen)).not.toThrow()
      expect(chess.fen()).toEqual(fen)
    })
  })
})
