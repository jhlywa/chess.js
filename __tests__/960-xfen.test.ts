import { Chess } from '../src/chess'
import 'jest-extended'

describe('X-FEN 960 Tests', () => {
  it('X-FEN O-O 960 01', () => {
    const chess = new Chess(
      'nrqnbkrb/pppppppp/8/8/8/8/PPPPPPPP/NRQNBKRB w GBgb - 0 1',
    )
    chess.move({ from: 'f1', to: 'g1' })
    expect(chess.fen()).toEqual(
      'nrqnbkrb/pppppppp/8/8/8/8/PPPPPPPP/NRQNBRKB b gb - 1 1',
    )
  })

  it('X-FEN O-O 960 02', () => {
    const chess = new Chess(
      'nrqnbkrb/pppppppp/8/8/8/8/PPPPPPPP/NRQNBKRB w GBgb - 0 1',
    )
    chess.move({ from: 'f1', to: 'g1' })
    chess.undo()
    expect(chess.fen()).toEqual(
      'nrqnbkrb/pppppppp/8/8/8/8/PPPPPPPP/NRQNBKRB w GBgb - 0 1',
    )
  })

  it('X-FEN O-O-O 960 03', () => {
    const chess = new Chess(
      'qnrkbrnb/pppppppp/8/8/8/8/PPPPPPPP/QNRKBRNB w FCfc - 0 1',
    )
    chess.move({ from: 'd1', to: 'c1' })
    expect(chess.fen()).toEqual(
      'qnrkbrnb/pppppppp/8/8/8/8/PPPPPPPP/QNKRBRNB b fc - 1 1',
    )
  })

  it('X-FEN O-O-O 960 04', () => {
    const chess = new Chess(
      'qnrkbrnb/pppppppp/8/8/8/8/PPPPPPPP/QNRKBRNB w FCfc - 0 1',
    )
    chess.move({ from: 'd1', to: 'c1' })
    chess.undo()
    expect(chess.fen()).toEqual(
      'qnrkbrnb/pppppppp/8/8/8/8/PPPPPPPP/QNRKBRNB w FCfc - 0 1',
    )
  })

  it('X-FEN O-O 960 05', () => {
    const chess = new Chess(
      'nbbqrkrn/pppppppp/8/8/8/8/PPPPPPPP/NBBQRKRN w GEe - 0 1',
    )
    chess.move({ from: 'f1', to: 'g1' })
    expect(chess.fen()).toEqual(
      'nbbqrkrn/pppppppp/8/8/8/8/PPPPPPPP/NBBQRRKN b e - 1 1',
    )
  })

  it('X-FEN O-O-O 960 06', () => {
    const chess = new Chess(
      'nbrknrbq/pppppppp/8/8/8/8/PPPPPPPP/NBRKNRBQ w FCfc - 0 1',
    )
    chess.move({ from: 'd1', to: 'c1' })
    expect(chess.fen()).toEqual(
      'nbrknrbq/pppppppp/8/8/8/8/PPPPPPPP/NBKRNRBQ b fc - 1 1',
    )
  })

  it('X-FEN O-O 960 07', () => {
    const chess = new Chess(
      'r1b1k1r1/1pppqppp/p1nbpn2/8/3PP3/2NBBN2/PPP1QPPP/R3K2R w GAga - 0 8',
    )
    chess.move({ from: 'e1', to: 'g1' })
    expect(chess.fen()).toEqual(
      'r1b1k1r1/1pppqppp/p1nbpn2/8/3PP3/2NBBN2/PPP1QPPP/R4RK1 b ga - 1 8',
    )
  })

  it('X-FEN O-O-O 960 08', () => {
    const chess = new Chess(
      'r1b1k1r1/1pppqppp/p1nbpn2/8/3PP3/2NBBN2/PPP1QPPP/R3K2R w GAga - 0 8',
    )
    chess.move({ from: 'e1', to: 'c1' })
    expect(chess.fen()).toEqual(
      'r1b1k1r1/1pppqppp/p1nbpn2/8/3PP3/2NBBN2/PPP1QPPP/2KR3R b ga - 1 8',
    )
  })

  it('X-FEN O-O 960 09', () => {
    const chess = new Chess(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w HAha - 0 1',
    )
    chess.loadPgn(
      '1. Nf3 Nf6 2. Nc3 Nc6 3. d4 e6 4. e4 Bd6 5. Be3 Rg8 6. Bd3 Qe7 7. Qe2 a6',
    )
    chess.move({ from: 'e1', to: 'g1' })
    expect(chess.fen()).toEqual(
      'r1b1k1r1/1pppqppp/p1nbpn2/8/3PP3/2NBBN2/PPP1QPPP/R4RK1 b a - 1 8',
    )
  })

  it('X-FEN O-O-O 960 10', () => {
    const chess = new Chess(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w HAha - 0 1',
    )
    chess.loadPgn(
      '1. Nf3 Nf6 2. Nc3 Nc6 3. d4 e6 4. e4 Bd6 5. Be3 Rg8 6. Bd3 Qe7 7. Qe2 a6',
    )
    chess.move({ from: 'e1', to: 'c1' })
    expect(chess.fen()).toEqual(
      'r1b1k1r1/1pppqppp/p1nbpn2/8/3PP3/2NBBN2/PPP1QPPP/2KR3R b a - 1 8',
    )
  })

  it('X-FEN O-O 960 11', () => {
    const chess = new Chess(
      'rqk3br/ppbppp1p/2pnn1p1/8/3PP3/5N2/PPPNBPPP/RQK3BR w FAfa - 0 6',
    )
    chess.move({ from: 'h2', to: 'h3' })
    expect(chess.fen()).toEqual(
      'rqk3br/ppbppp1p/2pnn1p1/8/3PP3/5N1P/PPPNBPP1/RQK3BR b FAfa - 0 6',
    )
  })

  it('X-FEN O-O-O 960 12', () => {
    const chess = new Chess(
      'b1nrkrqb/pppppppp/2n5/8/8/3N4/PPPPPPPP/BN1RKRQB w FDfd - 2 2',
    )
    chess.move({ from: 'e1', to: 'c1' })
    expect(chess.fen()).toEqual(
      'b1nrkrqb/pppppppp/2n5/8/8/3N4/PPPPPPPP/BNKR1RQB b fd - 3 2',
    )
  })

  it('X-FEN O-O 960 13', () => {
    const chess = new Chess(
      'nnrkbbrq/pp4pp/8/2pppp2/8/4PP2/PPPPBBPP/NNRK2RQ w GCgc - 0 5',
    )
    chess.move({ from: 'd1', to: 'g1' })
    expect(chess.fen()).toEqual(
      'nnrkbbrq/pp4pp/8/2pppp2/8/4PP2/PPPPBBPP/NNR2RKQ b gc - 1 5',
    )
  })

  it('X-FEN O-O-O 960 14', () => {
    const chess = new Chess(
      'nbrnkrbq/pppp1ppp/4p3/8/8/2N5/PPPPPPPP/NBR1KRBQ w FCfc - 0 2',
    )
    chess.move({ from: 'e1', to: 'c1' })
    expect(chess.fen()).toEqual(
      'nbrnkrbq/pppp1ppp/4p3/8/8/2N5/PPPPPPPP/NBKR1RBQ b fc - 1 2',
    )
  })

  it('X-FEN O-O 960 15', () => {
    const chess = new Chess(
      'qnbnr1kr/ppp1b1pp/4p3/3p1p2/8/2NPP3/PPP1BPPP/QNB1R1KR w Hh - 1 9',
    )
    chess.move({ from: 'h1', to: 'f1' })
    expect(chess.fen()).toEqual(
      'qnbnr1kr/ppp1b1pp/4p3/3p1p2/8/2NPP3/PPP1BPPP/QNB1RRK1 b h - 2 9',
    )
  })

  it('X-FEN O-O 960 16', () => {
    const chess = new Chess(
      'nqn2krb/p1prpppp/1pbp4/7P/5P2/6P1/PPPPPK2/NQNRB1RB b g - 0 9',
    )
    chess.move({ from: 'f8', to: 'g8' })
    expect(chess.fen()).toEqual(
      'nqn2rkb/p1prpppp/1pbp4/7P/5P2/6P1/PPPPPK2/NQNRB1RB w - - 1 10',
    )
  })

  it('X-FEN O-O 960 17', () => {
    const chess = new Chess(
      'bbq1rkr1/1ppppppp/p1n2n2/8/2P2P2/1P4P1/PQ1PP2P/BB1NRKNR b HEhe - 0 9',
    )
    chess.move({ from: 'f8', to: 'g8' })
    expect(chess.fen()).toEqual(
      'bbq1rrk1/1ppppppp/p1n2n2/8/2P2P2/1P4P1/PQ1PP2P/BB1NRKNR w HE - 1 10',
    )
  })
})
