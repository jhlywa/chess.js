import { Chess } from '../src/chess'

describe('Make Move', () => {
  const positions = [
    {
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      legal: true,
      move: 'e4',
      next: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    },
    {
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      legal: false,
      move: 'e5',
    },
    {
      fen: '7k/3R4/3p2Q1/6Q1/2N1N3/8/8/3R3K w - - 0 1',
      legal: true,
      move: 'Rd8#',
      next: '3R3k/8/3p2Q1/6Q1/2N1N3/8/8/3R3K b - - 1 1',
    },
    {
      fen: 'rnbqkbnr/pp3ppp/2pp4/4pP2/4P3/8/PPPP2PP/RNBQKBNR w KQkq e6 0 1',
      legal: true,
      move: 'fxe6',
      next: 'rnbqkbnr/pp3ppp/2ppP3/8/4P3/8/PPPP2PP/RNBQKBNR b KQkq - 0 1',
      captured: 'p',
    },
    {
      fen: 'rnbqkbnr/pppp2pp/8/4p3/4Pp2/2PP4/PP3PPP/RNBQKBNR b KQkq e3 0 1',
      legal: true,
      move: 'fxe3',
      next: 'rnbqkbnr/pppp2pp/8/4p3/8/2PPp3/PP3PPP/RNBQKBNR w KQkq - 0 2',
      captured: 'p',
    },

    // strict move parser
    {
      fen: 'r2qkbnr/ppp2ppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R b KQkq - 3 7',
      legal: true,
      next: 'r2qkb1r/ppp1nppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R w KQkq - 4 8',
      move: 'Ne7',
    },

    // strict move parser should reject over disambiguation
    {
      fen: 'r2qkbnr/ppp2ppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R b KQkq - 3 7',
      legal: false,
      move: 'Nge7',
    },

    // sloppy move parser
    {
      fen: 'r2qkbnr/ppp2ppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R b KQkq - 3 7',
      legal: true,
      sloppy: true,
      move: 'Nge7',
      next: 'r2qkb1r/ppp1nppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R w KQkq - 4 8',
    },

    // the sloppy parser should still accept correctly disambiguated moves
    {
      fen: 'r2qkbnr/ppp2ppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R b KQkq - 3 7',
      legal: true,
      sloppy: true,
      move: 'Ne7',
      next: 'r2qkb1r/ppp1nppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R w KQkq - 4 8',
    },
  ]

  positions.forEach((position) => {
    const chess = new Chess()
    chess.load(position.fen)
    it(position.fen + ' (' + position.move + ' ' + position.legal + ')', () => {
      const sloppy = position.sloppy || false
      const result = chess.move(position.move, { sloppy: sloppy })
      if (position.legal) {
        expect(
          result &&
            chess.fen() == position.next &&
            result.captured == position.captured
        ).toBe(true)
      } else {
        expect(result).toBeNull()
      }
    })
  })
})
