import { Chess } from '../src/chess'

describe('Board Tests', () => {
  const tests = [
    {
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      board: [
        [
          { square: 'a8', type: 'r', color: 'b' },
          { square: 'b8', type: 'n', color: 'b' },
          { square: 'c8', type: 'b', color: 'b' },
          { square: 'd8', type: 'q', color: 'b' },
          { square: 'e8', type: 'k', color: 'b' },
          { square: 'f8', type: 'b', color: 'b' },
          { square: 'g8', type: 'n', color: 'b' },
          { square: 'h8', type: 'r', color: 'b' },
        ],
        [
          { square: 'a7', type: 'p', color: 'b' },
          { square: 'b7', type: 'p', color: 'b' },
          { square: 'c7', type: 'p', color: 'b' },
          { square: 'd7', type: 'p', color: 'b' },
          { square: 'e7', type: 'p', color: 'b' },
          { square: 'f7', type: 'p', color: 'b' },
          { square: 'g7', type: 'p', color: 'b' },
          { square: 'h7', type: 'p', color: 'b' },
        ],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [
          { square: 'a2', type: 'p', color: 'w' },
          { square: 'b2', type: 'p', color: 'w' },
          { square: 'c2', type: 'p', color: 'w' },
          { square: 'd2', type: 'p', color: 'w' },
          { square: 'e2', type: 'p', color: 'w' },
          { square: 'f2', type: 'p', color: 'w' },
          { square: 'g2', type: 'p', color: 'w' },
          { square: 'h2', type: 'p', color: 'w' },
        ],
        [
          { square: 'a1', type: 'r', color: 'w' },
          { square: 'b1', type: 'n', color: 'w' },
          { square: 'c1', type: 'b', color: 'w' },
          { square: 'd1', type: 'q', color: 'w' },
          { square: 'e1', type: 'k', color: 'w' },
          { square: 'f1', type: 'b', color: 'w' },
          { square: 'g1', type: 'n', color: 'w' },
          { square: 'h1', type: 'r', color: 'w' },
        ],
      ],
    },
    // checkmate
    {
      fen: 'r3k2r/ppp2p1p/2n1p1p1/8/2B2P1q/2NPb1n1/PP4PP/R2Q3K w kq - 0 8',
      board: [
        [
          { square: 'a8', type: 'r', color: 'b' },
          null,
          null,
          null,
          { square: 'e8', type: 'k', color: 'b' },
          null,
          null,
          { square: 'h8', type: 'r', color: 'b' },
        ],
        [
          { square: 'a7', type: 'p', color: 'b' },
          { square: 'b7', type: 'p', color: 'b' },
          { square: 'c7', type: 'p', color: 'b' },
          null,
          null,
          { square: 'f7', type: 'p', color: 'b' },
          null,
          { square: 'h7', type: 'p', color: 'b' },
        ],
        [
          null,
          null,
          { square: 'c6', type: 'n', color: 'b' },
          null,
          { square: 'e6', type: 'p', color: 'b' },
          null,
          { square: 'g6', type: 'p', color: 'b' },
          null,
        ],
        [null, null, null, null, null, null, null, null],
        [
          null,
          null,
          { square: 'c4', type: 'b', color: 'w' },
          null,
          null,
          { square: 'f4', type: 'p', color: 'w' },
          null,
          { square: 'h4', type: 'q', color: 'b' },
        ],
        [
          null,
          null,
          { square: 'c3', type: 'n', color: 'w' },
          { square: 'd3', type: 'p', color: 'w' },
          { square: 'e3', type: 'b', color: 'b' },
          null,
          { square: 'g3', type: 'n', color: 'b' },
          null,
        ],
        [
          { square: 'a2', type: 'p', color: 'w' },
          { square: 'b2', type: 'p', color: 'w' },
          null,
          null,
          null,
          null,
          { square: 'g2', type: 'p', color: 'w' },
          { square: 'h2', type: 'p', color: 'w' },
        ],
        [
          { square: 'a1', type: 'r', color: 'w' },
          null,
          null,
          { square: 'd1', type: 'q', color: 'w' },
          null,
          null,
          null,
          { square: 'h1', type: 'k', color: 'w' },
        ],
      ],
    },
  ]

  tests.forEach(({ fen, board }) => {
    it('Board - ' + fen, () => {
      const chess = new Chess(fen)
      expect(chess.board()).toEqual(board)
    })
  })
})
