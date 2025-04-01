import { Chess } from '../src/chess'
import 'jest-extended'

describe('960 Tests', () => {
  it('O-O 960 01', () => {
    const chess = new Chess(
      'nrqnbkrb/pppppppp/8/8/8/8/PPPPPPPP/NRQNBKRB w KQkq - 0 1',
    )
    chess.move({ from: 'f1', to: 'g1' })
    expect(chess.fen()).toEqual(
      'nrqnbkrb/pppppppp/8/8/8/8/PPPPPPPP/NRQNBRKB b kq - 1 1',
    )
  })

  it('O-O 960 02', () => {
    const chess = new Chess(
      'nrqnbkrb/pppppppp/8/8/8/8/PPPPPPPP/NRQNBKRB w KQkq - 0 1',
    )
    chess.move({ from: 'f1', to: 'g1' })
    chess.undo()
    expect(chess.fen()).toEqual(
      'nrqnbkrb/pppppppp/8/8/8/8/PPPPPPPP/NRQNBKRB w KQkq - 0 1',
    )
  })

  it('O-O-O 960 03', () => {
    const chess = new Chess(
      'qnrkbrnb/pppppppp/8/8/8/8/PPPPPPPP/QNRKBRNB w KQkq - 0 1',
    )
    chess.move({ from: 'd1', to: 'c1' })
    expect(chess.fen()).toEqual(
      'qnrkbrnb/pppppppp/8/8/8/8/PPPPPPPP/QNKRBRNB b kq - 1 1',
    )
  })

  it('O-O-O 960 04', () => {
    const chess = new Chess(
      'qnrkbrnb/pppppppp/8/8/8/8/PPPPPPPP/QNRKBRNB w KQkq - 0 1',
    )
    chess.move({ from: 'd1', to: 'c1' })
    chess.undo()
    expect(chess.fen()).toEqual(
      'qnrkbrnb/pppppppp/8/8/8/8/PPPPPPPP/QNRKBRNB w KQkq - 0 1',
    )
  })

  it('O-O 960 05', () => {
    const chess = new Chess(
      'nbbqrkrn/pppppppp/8/8/8/8/PPPPPPPP/NBBQRKRN w Kk - 0 1',
    )
    chess.move({ from: 'f1', to: 'g1' })
    expect(chess.fen()).toEqual(
      'nbbqrkrn/pppppppp/8/8/8/8/PPPPPPPP/NBBQRRKN b k - 1 1',
    )
  })

  it('O-O-O 960 06', () => {
    const chess = new Chess(
      'nbrknrbq/pppppppp/8/8/8/8/PPPPPPPP/NBRKNRBQ w KQkq - 0 1',
    )
    chess.move({ from: 'd1', to: 'c1' })
    expect(chess.fen()).toEqual(
      'nbrknrbq/pppppppp/8/8/8/8/PPPPPPPP/NBKRNRBQ b kq - 1 1',
    )
  })

  it('O-O 960 07', () => {
    const chess = new Chess(
      'r1b1k1r1/1pppqppp/p1nbpn2/8/3PP3/2NBBN2/PPP1QPPP/R3K2R w KQq - 0 8',
    )
    chess.move({ from: 'e1', to: 'g1' })
    expect(chess.fen()).toEqual(
      'r1b1k1r1/1pppqppp/p1nbpn2/8/3PP3/2NBBN2/PPP1QPPP/R4RK1 b q - 1 8',
    )
  })

  it('O-O-O 960 08', () => {
    const chess = new Chess(
      'r1b1k1r1/1pppqppp/p1nbpn2/8/3PP3/2NBBN2/PPP1QPPP/R3K2R w KQq - 0 8',
    )
    chess.move({ from: 'e1', to: 'c1' })
    expect(chess.fen()).toEqual(
      'r1b1k1r1/1pppqppp/p1nbpn2/8/3PP3/2NBBN2/PPP1QPPP/2KR3R b q - 1 8',
    )
  })

  it('O-O 960 09', () => {
    const chess = new Chess(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    )
    chess.loadPgn(
      '1. Nf3 Nf6 2. Nc3 Nc6 3. d4 e6 4. e4 Bd6 5. Be3 Rg8 6. Bd3 Qe7 7. Qe2 a6',
    )
    chess.move({ from: 'e1', to: 'g1' })
    expect(chess.fen()).toEqual(
      'r1b1k1r1/1pppqppp/p1nbpn2/8/3PP3/2NBBN2/PPP1QPPP/R4RK1 b q - 1 8',
    )
  })

  it('O-O-O 960 10', () => {
    const chess = new Chess(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    )
    chess.loadPgn(
      '1. Nf3 Nf6 2. Nc3 Nc6 3. d4 e6 4. e4 Bd6 5. Be3 Rg8 6. Bd3 Qe7 7. Qe2 a6',
    )
    chess.move({ from: 'e1', to: 'c1' })
    expect(chess.fen()).toEqual(
      'r1b1k1r1/1pppqppp/p1nbpn2/8/3PP3/2NBBN2/PPP1QPPP/2KR3R b q - 1 8',
    )
  })

  it('O-O 960 11', () => {
    const chess = new Chess(
      'rqk3br/ppbppp1p/2pnn1p1/8/3PP3/5N2/PPPNBPPP/RQK3BR w KQkq - 0 6',
    )
    chess.move({ from: 'h2', to: 'h3' })
    expect(chess.fen()).toEqual(
      'rqk3br/ppbppp1p/2pnn1p1/8/3PP3/5N1P/PPPNBPP1/RQK3BR b KQkq - 0 6',
    )
  })

  it('O-O-O 960 12', () => {
    const chess = new Chess(
      'b1nrkrqb/pppppppp/2n5/8/8/3N4/PPPPPPPP/BN1RKRQB w KQkq - 2 2',
    )
    chess.move({ from: 'e1', to: 'c1' })
    expect(chess.fen()).toEqual(
      'b1nrkrqb/pppppppp/2n5/8/8/3N4/PPPPPPPP/BNKR1RQB b kq - 3 2',
    )
  })

  it('O-O 960 13', () => {
    const chess = new Chess(
      'nnrkbbrq/pp4pp/8/2pppp2/8/4PP2/PPPPBBPP/NNRK2RQ w KQkq - 0 5',
    )
    chess.move({ from: 'd1', to: 'g1' })
    expect(chess.fen()).toEqual(
      'nnrkbbrq/pp4pp/8/2pppp2/8/4PP2/PPPPBBPP/NNR2RKQ b kq - 1 5',
    )
  })

  it('O-O-O 960 14', () => {
    const chess = new Chess(
      'nbrnkrbq/pppp1ppp/4p3/8/8/2N5/PPPPPPPP/NBR1KRBQ w KQkq - 0 2',
    )
    chess.move({ from: 'e1', to: 'c1' })
    expect(chess.fen()).toEqual(
      'nbrnkrbq/pppp1ppp/4p3/8/8/2N5/PPPPPPPP/NBKR1RBQ b kq - 1 2',
    )
  })
})
