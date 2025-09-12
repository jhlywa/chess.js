import { Chess, Square } from '../src/chess'
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
      'r1b1k1r1/1pppqppp/p1nbpn2/8/3PP3/2NBBN2/PPP1QPPP/R3K2R w HA - 0 8',
    )
    chess.move({ from: 'e1', to: 'h1' })
    expect(chess.fen()).toEqual(
      'r1b1k1r1/1pppqppp/p1nbpn2/8/3PP3/2NBBN2/PPP1QPPP/R4RK1 b - - 1 8',
    )
  })

  it('X-FEN O-O-O 960 08', () => {
    const chess = new Chess(
      'r1b1k1r1/1pppqppp/p1nbpn2/8/3PP3/2NBBN2/PPP1QPPP/R3K2R w GAga - 0 8',
    )
    chess.move({ from: 'e1', to: 'a1' })
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
    chess.move({ from: 'e1', to: 'h1' })
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
    chess.move({ from: 'e1', to: 'h1' })
    expect(chess.fen()).toEqual(
      'r1b1k1r1/1pppqppp/p1nbpn2/8/3PP3/2NBBN2/PPP1QPPP/R4RK1 b a - 1 8',
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
    chess.move({ from: 'e1', to: 'd1' })
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
    chess.move({ from: 'g1', to: 'h1' })
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

  it('X-FEN O-O-O 960 18', () => {
    const chess = new Chess(
      'rnknbbrq/pp1p1ppp/2p1p3/8/8/2N1N3/PPPPPPPP/R1K1BBRQ w Aa - 0 3',
    )
    chess.move({ from: 'c1', to: 'a1' })
    expect(chess.fen()).toEqual(
      'rnknbbrq/pp1p1ppp/2p1p3/8/8/2N1N3/PPPPPPPP/2KRBBRQ b a - 1 3',
    )
  })

  it('X-FEN O-O-O 960 19', () => {
    const chess = new Chess(
      'rbbkrn1q/pp2pppp/8/2pp4/4n3/1PP5/PBBPPPPP/R2KRNNQ w Aa - 2 5',
    )
    chess.move({ from: 'd1', to: 'a1' })
    expect(chess.fen()).toEqual(
      'rbbkrn1q/pp2pppp/8/2pp4/4n3/1PP5/PBBPPPPP/2KRRNNQ b a - 3 5',
    )
  })

  it('X-FEN O-O-O 960 20', () => {
    const chess = new Chess(
      'nrk2bbr/ppp1pppp/3pq3/8/1P3nP1/2NP4/P1P1PP1P/NRK1QBBR w HBhb - 3 10',
    )
    chess.move({ from: 'c1', to: 'b1' })
    chess.undo()
    expect(chess.fen()).toEqual(
      'nrk2bbr/ppp1pppp/3pq3/8/1P3nP1/2NP4/P1P1PP1P/NRK1QBBR w HBhb - 3 10',
    )
  })

  it('X-FEN O-O-O 960 21', () => {
    const chess = new Chess(
      'nnrkbbrq/pppppppp/8/8/8/8/PPPPPPPP/NNRKBBRQ w GCgc - 0 1',
    )
    const moves = chess.moves({ square: 'd1', verbose: true })
    expect(moves.length).toEqual(1)
    expect(chess.fen()).toEqual(
      'nnrkbbrq/pppppppp/8/8/8/8/PPPPPPPP/NNRKBBRQ w GCgc - 0 1',
    )
  })

  it('X-FEN O-O 960 22', () => {
    const chess = new Chess(
      'rkn1bqrb/pnp1p2p/3p1pp1/8/Pp6/1N2NPB1/1PPPPQPP/RK4RB w GAga - 0 11',
    )
    chess.move({ from: 'b1', to: 'g1' })
    chess.undo()
    expect(chess.fen()).toEqual(
      'rkn1bqrb/pnp1p2p/3p1pp1/8/Pp6/1N2NPB1/1PPPPQPP/RK4RB w GAga - 0 11',
    )
  })

  it('X-FEN O-O 960 23', () => {
    const chess = new Chess(
      'rkn1bqrb/pnp1p2p/3p1pp1/8/Pp6/1N2NPB1/1PPPPQPP/RK4RB w GAga - 0 11',
    )
    chess.move({ from: 'b1', to: 'g1' })
    expect(chess.fen()).toEqual(
      'rkn1bqrb/pnp1p2p/3p1pp1/8/Pp6/1N2NPB1/1PPPPQPP/R4RKB b ga - 1 11',
    )
  })

  it('X-FEN O-O-O 960 24', () => {
    const chess = new Chess(
      'rkn1bqrb/pnp1p2p/3p1pp1/8/Pp6/1N2NPB1/1PPPPQPP/RK4RB w GAga - 0 11',
    )
    chess.move({ from: 'b1', to: 'g1' })
    expect(chess.fen()).toEqual(
      'rkn1bqrb/pnp1p2p/3p1pp1/8/Pp6/1N2NPB1/1PPPPQPP/R4RKB b ga - 1 11',
    )
  })

  it('X-FEN O-O 960 25', () => {
    const chess = new Chess(
      'rkn1bqrb/pnp1p2p/3p1pp1/8/Pp6/1N2NPB1/1PPPPQPP/RK4RB w GAga - 0 11',
    )
    chess.move({ from: 'b1', to: 'g1' })
    expect(chess.fen()).toEqual(
      'rkn1bqrb/pnp1p2p/3p1pp1/8/Pp6/1N2NPB1/1PPPPQPP/R4RKB b ga - 1 11',
    )
  })

  it('X-FEN O-O-O 960 26', () => {
    const chess = new Chess(
      'rk2bnqb/pprpppp1/4n2p/2p5/P7/3PN1NP/1PP1PPP1/RKR1B1QB b CAa - 2 9',
    )
    chess.move({ from: 'b8', to: 'c8' })
    expect(chess.fen()).toEqual(
      'r1k1bnqb/pprpppp1/4n2p/2p5/P7/3PN1NP/1PP1PPP1/RKR1B1QB w CA - 3 10',
    )
  })

  it('X-FEN O-O 960 27', () => {
    const chess = new Chess(
      'qnbrnbkr/pppppppp/8/8/8/8/PPPPPPPP/QNBRNBKR w HDhd - 0 1',
    )
    chess.loadPgn('1. e3 a6 2. Be2 f6 3. d3 Kf7 4. Nf3 c6')
    chess.move({ from: 'g1', to: 'h1' })
    expect(chess.fen()).toEqual(
      'qnbrn2r/1p1ppkpp/p1p2p2/8/8/3PPN2/PPP1BPPP/QNBR1RK1 b - - 1 5',
    )
  })

  it('X-FEN O-O 960 28', () => {
    const chess = new Chess(
      'rnbkrbqn/p1pp1ppp/4p3/1p6/8/BPN3P1/P1PPPP1P/R2KRBQN w AEae - 2 9',
    )
    chess.loadPgn('9. Bh3 c6 10. Qg2 g6')
    chess.move({ from: 'd1', to: 'e1' })
    expect(chess.fen()).toEqual(
      'rnbkrbqn/p2p1p1p/2p1p1p1/1p6/8/BPN3PB/P1PPPPQP/R4RKN b ea - 1 11',
    )
  })

  it('X-FEN O-O 960 29', () => {
    const chess = new Chess(
      'rnbkrbqn/p1pp1ppp/4p3/1p6/8/BPN3P1/P1PPPP1P/R2KRBQN w AEae - 2 9',
    )
    chess.loadPgn('9. Bh3 c6 10. Qg2 g6')
    expect(chess.moves().length).toBe(36)
    chess.move({ from: 'd1', to: 'e1' })
    expect(chess.fen()).toEqual(
      'rnbkrbqn/p2p1p1p/2p1p1p1/1p6/8/BPN3PB/P1PPPPQP/R4RKN b ea - 1 11',
    )
  })

  it('X-FEN O-O 960 30', () => {
    const chess = new Chess(
      'rnbkrbqn/p2p1p1p/2p1p1p1/1p6/8/BPN3PB/P1PPPPQP/R2KR2N w EAea - 0 11',
    )
    chess.move({ from: 'd1', to: 'e1' })
    expect(chess.fen()).toEqual(
      'rnbkrbqn/p2p1p1p/2p1p1p1/1p6/8/BPN3PB/P1PPPPQP/R4RKN b ea - 1 11',
    )
  })

  it('X-FEN O-O 960 31', () => {
    const chess = new Chess(
      'rnbkrbqn/p2p1p1p/2p1p1p1/1p6/8/BPN3PB/P1PPPPQP/R2KR2N w EAea - 0 11',
    )
    const moves = chess.moves({ square: 'a1', piece: 'r' })
    expect(moves.length).toBe(4)
  })

  it('X-FEN O-O 960 32', () => {
    const chess = new Chess(
      'rnbkrbqn/p2p1p1p/2p1p1p1/1p6/8/BPN3PB/P1PPPPQP/R2KR2N w EAea - 0 11',
    )
    const moves = chess.moves({ square: 'a1' })
    expect(moves.length).toBe(4)
  })

  it('X-FEN O-O 960 33', () => {
    const chess = new Chess(
      'rnbkrbqn/p2p1p1p/2p1p1p1/1p6/8/BPN3PB/P1PPPPQP/R2KR2N w EAea - 0 11',
    )
    const moves = chess.moves({ square: 'd1' })
    expect(moves.length).toBe(3)
  })

  it('X-FEN O-O 960 34', () => {
    const chess = new Chess(
      'rnbkrbqn/p2p1p1p/2p1p1p1/1p6/8/BPN3PB/P1PPPPQP/R2KR2N w EAea - 0 11',
    )
    const moves = chess.moves({ square: 'e1' })
    expect(moves.length).toBe(4)
  })

  it('X-FEN O-O-0 960 35', () => {
    const chess = new Chess(
      'bqnb1rkr/pp3ppp/3ppn2/2p5/5P2/P2P4/NPP1P1PP/BQ1BNRKR w HFhf - 2 9',
    )
    const moves = chess.moves({ square: 'g1' })
    expect(moves.length).toBe(2)
  })

  it('X-FEN O-O 960 36', () => {
    const chess = new Chess(
      'b1q1rrkb/pppppppp/3nn3/8/P7/1PPP4/4PPPP/BQNNRKRB w GE - 1 9',
    )
    const moves = chess.moves({ square: 'g1' })
    expect(moves.length).toBe(1)
  })

  it('X-FEN O-O 960 37', () => {
    const chess = new Chess(
      'qnbnr1kr/ppp1b1pp/4p3/3p1p2/8/2NPP3/PPP1BPPP/QNB1R1KR w HEhe - 1 9',
    )
    const moves = chess.moves()
    expect(moves.length).toBe(29)
  })

  it('X-FEN O-O 960 38', () => {
    const chess = new Chess(
      'qnbnr1kr/ppp1b1pp/4p3/3p1p2/8/2NPP3/PPP1BPPP/QNB1R1KR w HEhe - 1 9',
    )
    const moves = chess.moves({ square: 'g1' })
    expect(moves.length).toBe(2)
  })
})
