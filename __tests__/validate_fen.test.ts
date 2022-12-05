import { validateFen } from '../src/chess'

test.each([
  {
    // no kings
    fen: '8/8/8/8/8/8/8/8 w - - 0 1',
    ok: false,
  },
  {
    // missing white king
    fen: 'k7/8/8/8/8/8/8/8 w - - 0 1',
    ok: false,
  },
  {
    // missing black king
    fen: '8/8/8/8/8/8/8/7K w - - 0 1',
    ok: false,
  },
  {
    // too many white kings
    fen: 'k7/8/8/8/8/8/8/6KK w - - 0 1',
    ok: false,
  },
  {
    // too many black kings
    fen: 'kk6/8/8/8/8/8/8/7K w - - 0 1',
    ok: false,
  },
  {
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNRw KQkq - 0 1',
    ok: false,
  },
  {
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 x',
    ok: false,
  },
  {
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 ',
    ok: false,
  },
  {
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0',
    ok: false,
  },
  {
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 -1',
    ok: false,
  },
  {
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - x 1',
    ok: false,
  },
  {
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - -1 1',
    ok: false,
  },
  {
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq e2 0 1',
    ok: false,
  },
  {
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq e7 0 1',
    ok: false,
  },
  {
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq x 0 1',
    ok: false,
  },
  {
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQxkq - 0 1',
    ok: false,
  },
  {
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w kqKQ - 0 1',
    ok: true,
  },
  {
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR ? KQkq - 0 1',
    ok: false,
  },
  { fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP w KQkq - 0 1', ok: false },
  {
    fen: 'rnbqkbnr/pppppppp/17/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    ok: false,
  },
  {
    fen: 'rnbqk?nr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    ok: false,
  },
  {
    fen: 'rnbqkbnr/pppppppp/7/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    ok: false,
  },
  {
    fen: 'rnbqkbnr/p1p1p1p1p/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    ok: false,
  },
  {
    fen: 'r1bqkbnr/2pppppp/n7/1p6/8/4P3/PPPP1PPP/RNBQK1NR b KQkq b6 0 4',
    ok: false,
  },
  {
    fen: 'rnbqkbnr/1p1ppppp/B1p5/8/6P1/4P3/PPPP1P1P/RNBQK1NR w KQkq g3 0 3',
    ok: false,
  },
  {
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    ok: true,
  },
  {
    fen: 'rnbqkbnr/pppp1ppp/8/4p3/2P5/8/PP1PPPPP/RNBQKBNR w KQkq e6 0 2',
    ok: true,
  },
  {
    fen: '3r2k1/p1q2pp1/2nr1n1p/2p1p3/4P2B/P1P2Q1P/B4PP1/1R2R1K1 b - - 3 20',
    ok: true,
  },
  {
    fen: 'r2q1rk1/3bbppp/p3pn2/1p1pB3/3P4/1QNBP3/PP3PPP/R4RK1 w - - 4 13',
    ok: true,
  },
  {
    fen: 'rnbqk2r/ppp1bppp/4pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 1 5',
    ok: true,
  },
  {
    fen: '1k1rr3/1p5p/p1Pp2q1/3nppp1/PB6/3P4/3Q1PPP/1R3RK1 b - - 0 28',
    ok: true,
  },
  {
    fen: 'r3r1k1/3n1pp1/2q1p2p/2p5/p1p2P2/P3P2P/1PQ2BP1/1R2R1K1 w - - 0 27',
    ok: true,
  },
  {
    fen: 'r3rbk1/1R3p1p/3Pq1p1/6B1/p6P/5Q2/5PP1/3R2K1 b - - 3 26',
    ok: true,
  },
  {
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
    ok: true,
  },
  {
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
    ok: true,
  },
  {
    fen: 'r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 5',
    ok: true,
  },
  {
    fen: 'r1b2rk1/4bppp/p1np4/q3p1P1/1p2P2P/4BP2/PPP1N1Q1/1K1R1B1R w - - 0 17',
    ok: true,
  },
  {
    fen: 'r2q1rk1/ppp1bppp/2np1nb1/4p3/P1B1P1P1/3P1N1P/1PP2P2/RNBQR1K1 w - - 1 10',
    ok: true,
  },
  {
    fen: 'r2qkb1r/pb1n1p2/4pP2/1ppP2B1/2p5/2N3P1/PP3P1P/R2QKB1R b KQkq - 0 13',
    ok: true,
  },
  {
    fen: '3k1b1r/p2n1p2/5P2/2pN4/P1p2B2/1p3qP1/1P2KP2/3R4 w - - 0 29',
    ok: true,
  },
  {
    fen: 'rnbq1rk1/1pp1ppbp/p2p1np1/8/2PPP3/2N1BP2/PP2N1PP/R2QKB1R b KQ - 1 7',
    ok: true,
  },
  {
    fen: 'rn1qkb1r/pb1p1ppp/1p2pn2/4P3/2Pp4/5NP1/PP1N1PBP/R1BQK2R b KQkq - 0 8',
    ok: true,
  },
  {
    fen: 'rnbqkbnr/pp1p1ppp/4p3/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3',
    ok: true,
  },
  {
    fen: 'r1bq1rk1/pp2ppbp/3p1np1/8/3pPP2/3B4/PPPPN1PP/R1BQ1RK1 w - - 4 10',
    ok: true,
  },
  {
    fen: 'r1b3k1/5pbp/2N1p1p1/p6q/2p2P2/2P1B3/PPQ3PP/3R2K1 b - - 0 22',
    ok: true,
  },
  {
    fen: 'rnbqkb1r/ppp1pppp/3p1n2/8/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 1 3',
    ok: true,
  },
  {
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2PP4/2N2N2/PP2PPPP/R1BQKB1R b KQkq d3 0 4',
    ok: true,
  },
  {
    fen: 'r1bqk2r/ppp1bppp/2n5/3p4/3Pn3/3B1N2/PPP2PPP/RNBQ1RK1 w kq - 4 8',
    ok: true,
  },
  {
    fen: '4kb1r/1p3pp1/p3p3/4P1BN/1n1p1PPP/PR6/1P4r1/1KR5 b k - 0 24',
    ok: true,
  },
  {
    fen: 'r3kb1r/pbpp1ppp/1qp1n3/4P3/2P5/1N2Q3/PP1B1PPP/R3KB1R w KQkq - 7 13',
    ok: true,
  },
  {
    fen: 'r1b1r1k1/p4p1p/2pb2p1/3pn3/N7/4BP2/PPP2KPP/3RRB2 b - - 3 18',
    ok: true,
  },
  {
    fen: 'r1b2rk1/p2nqp1p/3P2p1/2p2p2/2B5/1PB3N1/P4PPP/R2Q2K1 b - - 0 18',
    ok: true,
  },
  {
    fen: 'rnb1k2r/1p3ppp/p3Pn2/8/3N2P1/2q1B3/P1P1BP1P/R2Q1K1R b kq - 1 12',
    ok: true,
  },
  {
    fen: 'rnb1k2r/1pq1bppp/p2ppn2/8/3NPP2/2N1B3/PPP1B1PP/R2QK2R w KQkq - 1 9',
    ok: true,
  },
  {
    fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    ok: true,
  },
  {
    fen: '4r3/1pr3pk/p2p2q1/3Pppbp/8/1NPQ1PP1/PP2R2P/1K1R4 w - - 8 28',
    ok: true,
  },
  {
    fen: 'b2r3r/4kp2/p3p1p1/1p2P3/1P1n1P2/P1NB4/KP4P1/3R2R1 b - - 2 26',
    ok: true,
  },
  {
    fen: 'rnbqk2r/ppppppbp/5np1/8/2PPP3/2N5/PP3PPP/R1BQKBNR b KQkq e3 0 4',
    ok: true,
  },
  {
    fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2',
    ok: true,
  },
  {
    fen: 'rn1q1rk1/pbp2pp1/1p3b1p/3p4/3P4/2NBPN2/PP3PPP/2RQK2R b K - 1 11',
    ok: true,
  },
  {
    fen: '2rq1rk1/pp1bppbp/3p1np1/8/2BNP3/2N1BP2/PPPQ2PP/1K1R3R b - - 0 13',
    ok: true,
  },
  {
    fen: 'r2qkb1r/1p1bpppp/p1np4/6B1/B3P1n1/2PQ1N2/PP3PPP/RN2R1K1 b kq - 0 10',
    ok: true,
  },
  {
    fen: 'r1bq1rk1/1p2npb1/p6p/3p2p1/3P3B/2N5/PP2BPPP/R2QR1K1 w - - 0 15',
    ok: true,
  },
  {
    fen: 'r3r1k1/pbq1bppp/4pnn1/2p1B1N1/2P2P2/1P1B2N1/P3Q1PP/4RRK1 b - - 4 17',
    ok: true,
  },
  {
    fen: '4k3/5p2/p1q1pbp1/1pr1P3/3n1P2/1B2B2Q/PP3P2/3R3K w - - 1 28',
    ok: true,
  },
  {
    fen: '2k4r/pp1r1p1p/8/2Pq1p2/1Pn2P2/PQ3NP1/3p1NKP/R7 b - - 0 28',
    ok: true,
  },
  {
    fen: 'rnbqkb1r/ppp2ppp/3p1n2/4N3/4P3/8/PPPP1PPP/RNBQKB1R w KQkq - 0 4',
    ok: true,
  },
  {
    fen: '3r1rk1/Qpp2p1p/7q/1P2P1p1/2B1Rn2/6NP/P4P1P/5RK1 b - - 0 22',
    ok: true,
  },
  {
    fen: 'rn2kb1r/2qp1ppp/b3pn2/2pP2B1/1pN1P3/5P2/PP4PP/R2QKBNR w KQkq - 4 11',
    ok: true,
  },
  {
    fen: 'r3k2r/pp1nbp1p/2p2pb1/3p4/3P3N/2N1P3/PP3PPP/R3KB1R w KQkq - 4 12',
    ok: true,
  },
  {
    fen: 'rn1qr1k1/pbppbppp/1p3n2/3P4/8/P1N1P1P1/1P2NPBP/R1BQK2R b KQ - 2 10',
    ok: true,
  },
  {
    fen: 'r1bqk2r/pp1nbppp/2p2n2/3p2B1/3P4/2N1PN2/PP3PPP/R2QKB1R w KQkq - 1 8',
    ok: true,
  },
  {
    fen: 'r1bqk2r/pppp1pp1/2n2n1p/8/1bPN3B/2N5/PP2PPPP/R2QKB1R b KQkq - 1 7',
    ok: true,
  },
  {
    fen: 'r1bqk2r/1pppbppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 4 6',
    ok: true,
  },
  {
    fen: 'r1b1kb1r/p2p1ppp/1qp1p3/3nP3/2P1NP2/8/PP4PP/R1BQKB1R b KQkq c3 0 10',
    ok: true,
  },
  { fen: '8/R7/2b5/3k2K1/P1p1r3/2B5/1P6/8 b - - 8 74', ok: true },
  {
    fen: '2q5/5pk1/5p1p/4b3/1p1pP3/7P/1Pr3P1/R2Q1RK1 w - - 14 37',
    ok: true,
  },
  {
    fen: 'r4rk1/1bqnbppp/p2p4/1p2p3/3BPP2/P1NB4/1PP3PP/3RQR1K w - - 0 16',
    ok: true,
  },
  {
    fen: 'r1bqk2r/pp1n1ppp/2pbpn2/6N1/3P4/3B1N2/PPP2PPP/R1BQK2R w KQkq - 2 8',
    ok: true,
  },
  {
    fen: 'r1b1kb1r/pp3ppp/1qnppn2/8/2B1PB2/1NN5/PPP2PPP/R2QK2R b KQkq - 1 8',
    ok: true,
  },
  {
    fen: '1r3r1k/2q1n1pb/pn5p/1p2pP2/6B1/PPNRQ2P/2P1N1P1/3R3K b - - 0 28',
    ok: true,
  },
  {
    fen: 'rnbqk2r/ppp1bppp/4pn2/3p2B1/2PP4/2N2N2/PP2PPPP/R2QKB1R b KQkq - 3 5',
    ok: true,
  },
  {
    fen: '2r3k1/5pp1/p2p3p/1p1Pp2P/5b2/8/qP1K2P1/3QRB1R w - - 0 26',
    ok: true,
  },
  {
    fen: '6k1/1Q3p2/2p1r3/B1Pn2p1/3P1b1p/5P1P/5P2/5K2 w - - 6 47',
    ok: true,
  },
  { fen: '8/k7/Pr2R3/7p/8/4n1P1/1r2p1P1/4R1K1 w - - 0 59', ok: true },
  {
    fen: '8/3k4/1nbPp2p/1pK2np1/p7/PP1R1P2/2P4P/4R3 b - - 7 34',
    ok: true,
  },
  {
    fen: '4rbk1/rnR2p1p/pp2pnp1/3p4/3P4/1P2PB1P/P2BNPP1/R5K1 b - - 0 20',
    ok: true,
  },
  { fen: '5r2/6pk/8/p3P1p1/1R6/7Q/1Pr2P1K/2q5 b - - 2 48', ok: true },
  {
    fen: '1br2rk1/2q2pp1/p3bnp1/1p1p4/8/1PN1PBPP/PB1Q1P2/R2R2K1 b - - 0 19',
    ok: true,
  },
  {
    fen: '4r1k1/b4p2/p4pp1/1p6/3p1N1P/1P2P1P1/P4P2/3R2K1 w - - 0 30',
    ok: true,
  },
  {
    fen: '3rk3/1Q4p1/p3p3/4RPqp/4p2P/P7/KPP5/8 b - h3 0 33',
    ok: true,
  },
  {
    fen: '6k1/1p1r1pp1/5qp1/p1pBP3/Pb3n2/1Q1RB2P/1P3PP1/6K1 b - - 0 28',
    ok: true,
  },
  {
    fen: '3r2k1/pp2bp2/1q4p1/3p1b1p/4PB1P/2P2PQ1/P2R2P1/3R2K1 w - - 1 28',
    ok: true,
  },
  {
    fen: '3r4/p1qn1pk1/1p1R3p/2P1pQpP/8/4B3/5PP1/6K1 w - - 0 35',
    ok: true,
  },
  {
    fen: 'rnb1k1nr/pp2q1pp/2pp4/4pp2/2PPP3/8/PP2NPPP/R1BQKB1R w KQkq f6 0 8',
    ok: true,
  },
  {
    fen: 'rnbqkbnr/pp1ppppp/2p5/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq d3 0 2',
    ok: true,
  },
  {
    fen: '4q1k1/6p1/p2rnpPp/1p2p3/7P/1BP5/PP3Q2/1K3R2 w - - 0 34',
    ok: true,
  },
  {
    fen: '3r2k1/p1q2pp1/1n2rn1p/1B2p3/P1p1P3/2P3BP/4QPP1/1R2R1K1 b - - 1 25',
    ok: true,
  },
  { fen: '8/p7/1b2BkR1/5P2/4K3/7r/P7/8 b - - 9 52', ok: true },
  {
    fen: '2rq2k1/p4p1p/1p1prp2/1Ppb4/8/P1QPP1P1/1B3P1P/R3R1K1 w - - 2 20',
    ok: true,
  },
  {
    fen: '8/1pQ3bk/p2p1qp1/P2Pp2p/NP6/7P/5PP1/6K1 w - - 1 36',
    ok: true,
  },
  {
    fen: '8/1pQ3bk/p2p2p1/P2Pp2p/1P5P/2N3P1/2q2PK1/8 b - - 0 39',
    ok: true,
  },
  {
    fen: 'r1bq1rk1/pp2n1bp/2pp1np1/3PppN1/1PP1P3/2N2B2/P4PPP/R1BQR1K1 w - - 0 13',
    ok: true,
  },
  {
    fen: '1r4k1/5p2/3P2pp/p3Pp2/5q2/2Q2P1P/5P2/4R1K1 w - - 0 29',
    ok: true,
  },
  {
    fen: 'rnbqkbnr/pp2pppp/3p4/8/3pP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 4',
    ok: true,
  },
  {
    fen: 'R2qk2r/2p2ppp/1bnp1n2/1p2p3/3PP1b1/1BP2N2/1P3PPP/1NBQ1RK1 b k - 0 11',
    ok: true,
  },
  {
    fen: '6k1/4qp2/3p2p1/3Pp2p/7P/4Q1P1/5PBK/8 b - - 20 57',
    ok: true,
  },
  { fen: '3k4/r3q3/3p1p2/2pB4/P7/7P/6P1/1Q4K1 b - - 6 43', ok: true },
  {
    fen: '5k2/1n4p1/2p2p2/p2q1B1P/P4PK1/6P1/1Q6/8 b - - 4 46',
    ok: true,
  },
  {
    fen: '6k1/pr2pb2/5pp1/1B1p4/P7/4QP2/1PP3Pq/2KR4 w - - 1 27',
    ok: true,
  },
  {
    fen: '1rbqk2r/2pp1ppp/2n2n2/1pb1p3/4P3/1BP2N2/1P1P1PPP/RNBQ1RK1 b k - 0 9',
    ok: true,
  },
  {
    fen: '6r1/2p5/pbpp1k1r/5b2/3P1N1p/1PP2N1P/P4R2/2K1R3 w - - 4 33',
    ok: true,
  },
  {
    fen: 'rnbqkb1r/pppppppp/5n2/8/3P4/5N2/PPP1PPPP/RNBQKB1R b KQkq - 2 2',
    ok: true,
  },
  {
    fen: 'rnbqkb1r/pppppppp/5n2/8/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3 0 2',
    ok: true,
  },
  {
    fen: '4b3/5p1k/r7/p3BNQp/4P1pP/1r1n4/1P3P1N/7K b - - 2 40',
    ok: true,
  },
  {
    fen: 'r2q1rk1/pb1p2pp/1p1bpnn1/5p2/2PP4/PPN1BP1P/2B1N1P1/1R1Q1R1K b - - 2 16',
    ok: true,
  },
  {
    fen: 'rnbqkbnr/ppp1pppp/8/8/2pP4/5N2/PP2PPPP/RNBQKB1R b KQkq - 1 3',
    ok: true,
  },
  {
    fen: '4rrk1/8/p1pR4/1p6/1PPKNq2/3P1p2/PB5n/R2Q4 b - - 6 40',
    ok: true,
  },
  {
    fen: 'r1bqk1nr/1p2bppp/p1np4/4p3/2P1P3/N1N5/PP3PPP/R1BQKB1R b KQkq - 1 8',
    ok: true,
  },
  {
    fen: 'r1bqk2r/pp2bppp/2n1p3/3n4/3P4/2NB1N2/PP3PPP/R1BQ1RK1 b kq - 3 9',
    ok: true,
  },
  {
    fen: 'r1bqkbnr/pppp2pp/2n5/1B2p3/3Pp3/5N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
    ok: true,
  },
  {
    fen: '2n1r3/p1k2pp1/B1p3b1/P7/5bP1/2N1B3/1P2KP2/2R5 b - - 4 25',
    ok: true,
  },
  {
    fen: 'r4rk1/2q3pp/4p3/p1Pn1p2/1p1P4/4PP2/1B1Q2PP/R3R1K1 w - - 0 22',
    ok: true,
  },
  { fen: '8/8/1p6/3b4/1P1k1p2/8/3KBP2/8 w - - 2 68', ok: true },
  {
    fen: '2b2k2/1p5p/2p5/p1p1q3/2PbN3/1P5P/P5B1/3RR2K w - - 4 33',
    ok: true,
  },
  {
    fen: '1b6/5kp1/5p2/1b1p4/1P6/4PPq1/2Q2RNp/7K b - - 2 41',
    ok: true,
  },
  {
    fen: 'r3r1k1/p2nqpp1/bpp2n1p/3p4/B2P4/P1Q1PP2/1P2NBPP/R3K2R w KQ - 6 16',
    ok: true,
  },
  {
    fen: 'r3k2r/8/p4p2/3p2p1/4b3/2R2PP1/P6P/4R1K1 b kq - 0 27',
    ok: true,
  },
  {
    fen: 'r1rb2k1/5ppp/pqp5/3pPb2/QB1P4/2R2N2/P4PPP/2R3K1 b - - 7 23',
    ok: true,
  },
  {
    fen: '3r1r2/3P2pk/1p1R3p/1Bp2p2/6q1/4Q3/PP3P1P/7K w - - 4 30',
    ok: true,
  },
])("validateFen $# '$fen' (expected: '$ok')", ({ fen, ok }) => {
  const result = validateFen(fen)
  if (ok != result.ok) {
    console.log(result)
  }
  expect(validateFen(fen)).toMatchObject({ ok })
})
