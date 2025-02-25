import { Chess } from '../src/chess'

test('perft - 960 - position 1', () => {
  const chess = new Chess(
    'bqnb1rkr/pp3ppp/3ppn2/2p5/5P2/P2P4/NPP1P1PP/BQ1BNRKR w HFhf - 2 9',
  )
  expect(chess.perft(3)).toBe(12189)
})
test('perft - 960 - position 2', () => {
  const chess = new Chess(
    '2nnrbkr/p1qppppp/8/1ppb4/6PP/3PP3/PPP2P2/BQNNRBKR w HEhe - 1 9',
  )
  expect(chess.perft(3)).toBe(18002)
})
test('perft - 960 - position 3', () => {
  const chess = new Chess(
    'b1q1rrkb/pppppppp/3nn3/8/P7/1PPP4/4PPPP/BQNNRKRB w GE - 1 9',
  )
  expect(chess.perft(3)).toBe(10471)
})
test('perft - 960 - position 4', () => {
  const chess = new Chess(
    'qbbnnrkr/2pp2pp/p7/1p2pp2/8/P3PP2/1PPP1KPP/QBBNNR1R w hf - 0 9',
  )
  expect(chess.perft(3)).toBe(13440)
})
test('perft - 960 - position 5', () => {
  const chess = new Chess(
    '1nbbnrkr/p1p1ppp1/3p4/1p3P1p/3Pq2P/8/PPP1P1P1/QNBBNRKR w HFhf - 0 9',
  )
  expect(chess.perft(3)).toBe(31058)
})
test('perft - 960 - position 6', () => {
  const chess = new Chess(
    'qnbnr1kr/ppp1b1pp/4p3/3p1p2/8/2NPP3/PPP1BPPP/QNB1R1KR w HEhe - 1 9',
  )
  expect(chess.perft(3)).toBe(26578)
})
test('perft - 960 - position 7', () => {
  const chess = new Chess(
    'q1bnrkr1/ppppp2p/2n2p2/4b1p1/2NP4/8/PPP1PPPP/QNB1RRKB w ge - 1 9',
  )
  expect(chess.perft(3)).toBe(24566)
})
test('perft - 960 - position 8', () => {
  const chess = new Chess(
    'qbn1brkr/ppp1p1p1/2n4p/3p1p2/P7/6PP/QPPPPP2/1BNNBRKR w HFhf - 0 9',
  )
  expect(chess.perft(3)).toBe(17054)
})
test('perft - 960 - position 9', () => {
  const chess = new Chess(
    'qnnbbrkr/1p2ppp1/2pp3p/p7/1P5P/2NP4/P1P1PPP1/Q1NBBRKR w HFhf - 0 9',
  )
  expect(chess.perft(3)).toBe(15243)
})
test('perft - 960 - position 10', () => {
  const chess = new Chess(
    'qn1rbbkr/ppp2p1p/1n1pp1p1/8/3P4/P6P/1PP1PPPK/QNNRBB1R w hd - 2 9',
  )
  expect(chess.perft(3)).toBe(23175)
})
test('perft - 960 - position 11', () => {
  const chess = new Chess(
    'qnr1bkrb/pppp2pp/3np3/5p2/8/P2P2P1/NPP1PP1P/QN1RBKRB w GDg - 3 9',
  )
  expect(chess.perft(3)).toBe(26895)
})
test('perft - 960 - position 12', () => {
  const chess = new Chess(
    'qb1nrkbr/1pppp1p1/1n3p2/p1B4p/8/3P1P1P/PPP1P1P1/QBNNRK1R w HEhe - 0 9',
  )
  expect(chess.perft(3)).toBe(25620)
})
test('perft - 960 - position 13', () => {
  const chess = new Chess(
    'qnnbrk1r/1p1ppbpp/2p5/p4p2/2NP3P/8/PPP1PPP1/Q1NBRKBR w HEhe - 0 9',
  )
  expect(chess.perft(3)).toBe(21238)
})
test('perft - 960 - position 14', () => {
  const chess = new Chess(
    '1qnrkbbr/1pppppp1/p1n4p/8/P7/1P1N1P2/2PPP1PP/QN1RKBBR w HDhd - 0 9',
  )
  expect(chess.perft(3)).toBe(32187)
})
test('perft - 960 - position 15', () => {
  const chess = new Chess(
    'qn1rkrbb/pp1p1ppp/2p1p3/3n4/4P2P/2NP4/PPP2PP1/Q1NRKRBB w FDfd - 1 9',
  )
  expect(chess.perft(3)).toBe(14769)
})
test('perft - 960 - position 16', () => {
  const chess = new Chess(
    'bb1qnrkr/pp1p1pp1/1np1p3/4N2p/8/1P4P1/P1PPPP1P/BBNQ1RKR w HFhf - 0 9',
  )
  expect(chess.perft(3)).toBe(25747)
})
test('perft - 960 - position 17', () => {
  const chess = new Chess(
    'bnqbnr1r/p1p1ppkp/3p4/1p4p1/P7/3NP2P/1PPP1PP1/BNQB1RKR w HF - 0 9',
  )
  expect(chess.perft(3)).toBe(24353)
})
test('perft - 960 - position 18', () => {
  const chess = new Chess(
    'bnqnrbkr/1pp2pp1/p7/3pP2p/4P1P1/8/PPPP3P/BNQNRBKR w HEhe d6 0 9',
  )
  expect(chess.perft(3)).toBe(28677)
})
test('perft - 960 - position 19', () => {
  const chess = new Chess(
    'b1qnrrkb/ppp1pp1p/n2p1Pp1/8/8/P7/1PPPP1PP/BNQNRKRB w GE - 0 9',
  )
  expect(chess.perft(3)).toBe(10532)
})
test('perft - 960 - position 20', () => {
  const chess = new Chess(
    'n1bqnrkr/pp1ppp1p/2p5/6p1/2P2b2/PN6/1PNPPPPP/1BBQ1RKR w HFhf - 2 9',
  )
  expect(chess.perft(3)).toBe(17746)
})
test('perft - 960 - position 21', () => {
  const chess = new Chess(
    'n1bb1rkr/qpnppppp/2p5/p7/P1P5/5P2/1P1PPRPP/NQBBN1KR w Hhf - 1 9',
  )
  expect(chess.perft(3)).toBe(18724)
})
test('perft - 960 - position 22', () => {
  const chess = new Chess(
    'nqb1rbkr/pppppp1p/4n3/6p1/4P3/1NP4P/PP1P1PP1/1QBNRBKR w HEhe - 1 9',
  )
  expect(chess.perft(3)).toBe(18811)
})
test('perft - 960 - position 23', () => {
  const chess = new Chess(
    'n1bnrrkb/pp1pp2p/2p2p2/6p1/5B2/3P4/PPP1PPPP/NQ1NRKRB w GE - 2 9',
  )
  expect(chess.perft(3)).toBe(16883)
})
test('perft - 960 - position 24', () => {
  const chess = new Chess(
    'nbqnbrkr/2ppp1p1/pp3p1p/8/4N2P/1N6/PPPPPPP1/1BQ1BRKR w HFhf - 0 9',
  )
  expect(chess.perft(3)).toBe(17268)
})
test('perft - 960 - position 25', () => {
  const chess = new Chess(
    'nq1bbrkr/pp2nppp/2pp4/4p3/1PP1P3/1B6/P2P1PPP/NQN1BRKR w HFhf - 2 9',
  )
  expect(chess.perft(3)).toBe(11812)
})
test('perft - 960 - position 26', () => {
  const chess = new Chess(
    'nqnrb1kr/2pp1ppp/1p1bp3/p1B5/5P2/3N4/PPPPP1PP/NQ1R1BKR w HDhd - 0 9',
  )
  expect(chess.perft(3)).toBe(19307)
})
test('perft - 960 - position 27', () => {
  const chess = new Chess(
    'nqn2krb/p1prpppp/1pbp4/7P/5P2/8/PPPPPKP1/NQNRB1RB w g - 3 9',
  )
  expect(chess.perft(3)).toBe(10608)
})
test('perft - 960 - position 28', () => {
  const chess = new Chess(
    'nb1n1kbr/ppp1rppp/3pq3/P3p3/8/4P3/1PPPRPPP/NBQN1KBR w Hh - 1 9',
  )
  expect(chess.perft(3)).toBe(11786)
})
test('perft - 960 - position 29', () => {
  const chess = new Chess(
    'nqnbrkbr/1ppppp1p/p7/6p1/6P1/P6P/1PPPPP2/NQNBRKBR w HEhe - 1 9',
  )
  expect(chess.perft(3)).toBe(8694)
})
test('perft - 960 - position 30', () => {
  const chess = new Chess(
    'nq1rkb1r/pp1pp1pp/1n2bp1B/2p5/8/5P1P/PPPPP1P1/NQNRKB1R w HDhd - 2 9',
  )
  expect(chess.perft(3)).toBe(20090)
})
test('perft - 960 - position 31', () => {
  const chess = new Chess(
    'nqnrkrb1/pppppp2/7p/4b1p1/8/PN1NP3/1PPP1PPP/1Q1RKRBB w FDfd - 1 9',
  )
  expect(chess.perft(3)).toBe(18102)
})
test('perft - 960 - position 32', () => {
  const chess = new Chess(
    'bb1nqrkr/1pp1ppp1/pn5p/3p4/8/P2NNP2/1PPPP1PP/BB2QRKR w HFhf - 0 9',
  )
  expect(chess.perft(3)).toBe(21193)
})
test('perft - 960 - position 33', () => {
  const chess = new Chess(
    'bnn1qrkr/pp1ppp1p/2p5/b3Q1p1/8/5P1P/PPPPP1P1/BNNB1RKR w HFhf - 2 9',
  )
  expect(chess.perft(3)).toBe(35830)
})
test('perft - 960 - position 34', () => {
  const chess = new Chess(
    'bnnqrbkr/pp1p2p1/2p1p2p/5p2/1P5P/1R6/P1PPPPP1/BNNQRBK1 w Ehe - 0 9',
  )
  expect(chess.perft(3)).toBe(32724)
})
test('perft - 960 - position 35', () => {
  const chess = new Chess(
    'b1nqrkrb/2pppppp/p7/1P6/1n6/P4P2/1P1PP1PP/BNNQRKRB w GEge - 0 9',
  )
  expect(chess.perft(3)).toBe(15744)
})
test('perft - 960 - position 36', () => {
  const chess = new Chess(
    'n1bnqrkr/3ppppp/1p6/pNp1b3/2P3P1/8/PP1PPP1P/NBB1QRKR w HFhf - 1 9',
  )
  expect(chess.perft(3)).toBe(20768)
})
test('perft - 960 - position 37', () => {
  const chess = new Chess(
    'n2bqrkr/p1p1pppp/1pn5/3p1b2/P6P/1NP5/1P1PPPP1/1NBBQRKR w HFhf - 3 9',
  )
  expect(chess.perft(3)).toBe(12152)
})
test('perft - 960 - position 38', () => {
  const chess = new Chess(
    'nnbqrbkr/1pp1p1p1/p2p4/5p1p/2P1P3/N7/PPQP1PPP/N1B1RBKR w HEhe - 0 9',
  )
  expect(chess.perft(3)).toBe(18098)
})
test('perft - 960 - position 39', () => {
  const chess = new Chess(
    'nnbqrkr1/pp1pp2p/2p2b2/5pp1/1P5P/4P1P1/P1PP1P2/NNBQRKRB w GEge - 1 9',
  )
  expect(chess.perft(3)).toBe(33721)
})
test('perft - 960 - position 40', () => {
  const chess = new Chess(
    'nb1qbrkr/p1pppp2/1p1n2pp/8/1P6/2PN3P/P2PPPP1/NB1QBRKR w HFhf - 0 9',
  )
  expect(chess.perft(3)).toBe(14021)
})
test('perft - 960 - position 41', () => {
  const chess = new Chess(
    'nnq1brkr/pp1pppp1/8/2p4P/8/5K2/PPPbPP1P/NNQBBR1R w hf - 0 9',
  )
  expect(chess.perft(3)).toBe(18263)
})
test('perft - 960 - position 42', () => {
  const chess = new Chess(
    'nnqrbb1r/pppppk2/5pp1/7p/1P6/3P2PP/P1P1PP2/NNQRBBKR w HD - 0 9',
  )
  expect(chess.perft(3)).toBe(21945)
})
test('perft - 960 - position 43', () => {
  const chess = new Chess(
    'nnqr1krb/p1p1pppp/2bp4/8/1p1P4/4P3/PPP2PPP/NNQRBKRB w GDgd - 0 9',
  )
  expect(chess.perft(3)).toBe(20796)
})
test('perft - 960 - position 44', () => {
  const chess = new Chess(
    'nbnqrkbr/p2ppp2/1p4p1/2p4p/3P3P/3N4/PPP1PPPR/NB1QRKB1 w Ehe - 0 9',
  )
  expect(chess.perft(3)).toBe(15190)
})
test('perft - 960 - position 45', () => {
  const chess = new Chess(
    'n1qbrkbr/p1ppp2p/2n2pp1/1p6/1P6/2P3P1/P2PPP1P/NNQBRKBR w HEhe - 0 9',
  )
  expect(chess.perft(3)).toBe(14269)
})
test('perft - 960 - position 46', () => {
  const chess = new Chess(
    '2qrkbbr/ppn1pppp/n1p5/3p4/5P2/P1PP4/1P2P1PP/NNQRKBBR w HDhd - 1 9',
  )
  expect(chess.perft(3)).toBe(20584)
})
test('perft - 960 - position 47', () => {
  const chess = new Chess(
    '1nqr1rbb/pppkp1pp/1n3p2/3p4/1P6/5P1P/P1PPPKP1/NNQR1RBB w - - 1 9',
  )
  expect(chess.perft(3)).toBe(15921)
})
test('perft - 960 - position 48', () => {
  const chess = new Chess(
    'bbn1rqkr/pp1pp2p/4npp1/2p5/1P6/2BPP3/P1P2PPP/1BNNRQKR w HEhe - 0 9',
  )
  expect(chess.perft(3)).toBe(17743)
})
test('perft - 960 - position 49', () => {
  const chess = new Chess(
    'bn1brqkr/pppp2p1/3npp2/7p/PPP5/8/3PPPPP/BNNBRQKR w HEhe - 0 9',
  )
  expect(chess.perft(3)).toBe(17835)
})
test('perft - 960 - position 50', () => {
  const chess = new Chess(
    'bn1rqbkr/ppp1ppp1/1n6/2p4p/7P/3P4/PPP1PPP1/BN1RQBKR w HDhd - 0 9',
  )
  expect(chess.perft(3)).toBe(20562)
})
test('perft - 960 - position 51', () => {
  const chess = new Chess(
    'bnnr1krb/ppp2ppp/3p4/3Bp3/q1P3PP/8/PP1PPP2/BNNRQKR1 w GDgd - 0 9',
  )
  expect(chess.perft(3)).toBe(30772)
})
test('perft - 960 - position 52', () => {
  const chess = new Chess(
    '1bbnrqkr/pp1ppppp/8/2p5/n7/3PNPP1/PPP1P2P/NBB1RQKR w HEhe - 1 9',
  )
  expect(chess.perft(3)).toBe(15673)
})
test('perft - 960 - position 53', () => {
  const chess = new Chess(
    'nnbbrqkr/p2ppp1p/1pp5/8/6p1/N1P5/PPBPPPPP/N1B1RQKR w HEhe - 0 9',
  )
  expect(chess.perft(3)).toBe(14031)
})
test('perft - 960 - position 54', () => {
  const chess = new Chess(
    'nnbrqbkr/2p1p1pp/p4p2/1p1p4/8/NP6/P1PPPPPP/N1BRQBKR w HDhd - 0 9',
  )
  expect(chess.perft(3)).toBe(10220)
})
test('perft - 960 - position 55', () => {
  const chess = new Chess(
    'nnbrqk1b/pp2pprp/2pp2p1/8/3PP1P1/8/PPP2P1P/NNBRQRKB w d - 1 9',
  )
  expect(chess.perft(3)).toBe(27856)
})
test('perft - 960 - position 56', () => {
  const chess = new Chess(
    '1bnrbqkr/ppnpp1p1/2p2p1p/8/1P6/4PPP1/P1PP3P/NBNRBQKR w HDhd - 0 9',
  )
  expect(chess.perft(3)).toBe(19760)
})
test('perft - 960 - position 57', () => {
  const chess = new Chess(
    'n1rbbqkr/pp1pppp1/7p/P1p5/1n6/2PP4/1P2PPPP/NNRBBQKR w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(14978)
})
test('perft - 960 - position 58', () => {
  const chess = new Chess(
    'n1rqb1kr/p1pppp1p/1pn4b/3P2p1/P7/1P6/2P1PPPP/NNRQBBKR w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(12506)
})
test('perft - 960 - position 59', () => {
  const chess = new Chess(
    'nnrqbkrb/pppp1pp1/7p/4p3/6P1/2N2B2/PPPPPP1P/NR1QBKR1 w Ggc - 2 9',
  )
  expect(chess.perft(3)).toBe(19364)
})
test('perft - 960 - position 60', () => {
  const chess = new Chess(
    'n1nrqkbr/ppb2ppp/3pp3/2p5/2P3P1/5P2/PP1PPB1P/NBNRQK1R w HDhd - 1 9',
  )
  expect(chess.perft(3)).toBe(25861)
})
test('perft - 960 - position 61', () => {
  const chess = new Chess(
    '2rbqkbr/p1pppppp/1nn5/1p6/7P/P4P2/1PPPP1PB/NNRBQK1R w HChc - 2 9',
  )
  expect(chess.perft(3)).toBe(18030)
})
test('perft - 960 - position 62', () => {
  const chess = new Chess(
    'nn1qkbbr/pp2ppp1/2rp4/2p4p/P2P4/1N5P/1PP1PPP1/1NRQKBBR w HCh - 1 9',
  )
  expect(chess.perft(3)).toBe(18916)
})
test('perft - 960 - position 63', () => {
  const chess = new Chess(
    'nnrqk1bb/p1ppp2p/5rp1/1p3p2/1P4P1/5P1P/P1PPP3/NNRQKRBB w FCc - 1 9',
  )
  expect(chess.perft(3)).toBe(20510)
})
test('perft - 960 - position 64', () => {
  const chess = new Chess(
    'bb1nrkqr/ppppn2p/4ppp1/8/1P4P1/4P3/P1PPKP1P/BBNNR1QR w he - 0 9',
  )
  expect(chess.perft(3)).toBe(20024)
})
test('perft - 960 - position 65', () => {
  const chess = new Chess(
    'bnnbrkqr/1p1ppp2/8/p1p3pp/1P6/N4P2/PBPPP1PP/2NBRKQR w HEhe - 0 9',
  )
  expect(chess.perft(3)).toBe(24850)
})
test('perft - 960 - position 66', () => {
  const chess = new Chess(
    '1nnrkbqr/p1pp1ppp/4p3/1p6/1Pb1P3/6PB/P1PP1P1P/BNNRK1QR w HDhd - 0 9',
  )
  expect(chess.perft(3)).toBe(22133)
})
test('perft - 960 - position 67', () => {
  const chess = new Chess(
    'bnr1kqrb/pppp1pp1/1n5p/4p3/P3P3/3P2P1/1PP2P1P/BNNRKQRB w GDg - 0 9',
  )
  expect(chess.perft(3)).toBe(16411)
})
test('perft - 960 - position 68', () => {
  const chess = new Chess(
    'nbbnrkqr/p1ppp1pp/1p3p2/8/2P5/4P3/PP1P1PPP/NBBNRKQR w HEhe - 1 9',
  )
  expect(chess.perft(3)).toBe(15561)
})
test('perft - 960 - position 69', () => {
  const chess = new Chess(
    'nn1brkqr/pp1bpppp/8/2pp4/P4P2/1PN5/2PPP1PP/N1BBRKQR w HEhe - 1 9',
  )
  expect(chess.perft(3)).toBe(16958)
})
test('perft - 960 - position 70', () => {
  const chess = new Chess(
    'n1brkbqr/ppp1pp1p/6pB/3p4/2Pn4/8/PP2PPPP/NN1RKBQR w HDhd - 0 9',
  )
  expect(chess.perft(3)).toBe(30360)
})
test('perft - 960 - position 71', () => {
  const chess = new Chess(
    'nnbrkqrb/p2ppp2/Q5pp/1pp5/4PP2/2N5/PPPP2PP/N1BRK1RB w GDgd - 0 9',
  )
  expect(chess.perft(3)).toBe(29017)
})
test('perft - 960 - position 72', () => {
  const chess = new Chess(
    'nbnrbk1r/pppppppq/8/7p/8/1N2QPP1/PPPPP2P/NB1RBK1R w HDhd - 2 9',
  )
  expect(chess.perft(3)).toBe(35403)
})
test('perft - 960 - position 73', () => {
  const chess = new Chess(
    'nnrbbkqr/2pppp1p/p7/6p1/1p2P3/4QPP1/PPPP3P/NNRBBK1R w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(22524)
})
test('perft - 960 - position 74', () => {
  const chess = new Chess(
    'nnrkbbqr/1p2pppp/p2p4/2p5/8/1N2P1P1/PPPP1P1P/1NKRBBQR w hc - 0 9',
  )
  expect(chess.perft(3)).toBe(18136)
})
test('perft - 960 - position 75', () => {
  const chess = new Chess(
    'n1rkbqrb/pp1ppp2/2n3p1/2p4p/P5PP/1P6/2PPPP2/NNRKBQRB w GCgc - 0 9',
  )
  expect(chess.perft(3)).toBe(20712)
})
test('perft - 960 - position 76', () => {
  const chess = new Chess(
    'nbkr1qbr/1pp1pppp/pn1p4/8/3P2P1/5R2/PPP1PP1P/NBN1KQBR w H - 2 9',
  )
  expect(chess.perft(3)).toBe(18669)
})
test('perft - 960 - position 77', () => {
  const chess = new Chess(
    'nnr1kqbr/pp1pp1p1/2p5/b4p1p/P7/1PNP4/2P1PPPP/N1RBKQBR w HChc - 1 9',
  )
  expect(chess.perft(3)).toBe(6530)
})
test('perft - 960 - position 78', () => {
  const chess = new Chess(
    'n1rkqbbr/p1pp1pp1/np2p2p/8/8/N4PP1/PPPPP1BP/N1RKQ1BR w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(19119)
})
test('perft - 960 - position 79', () => {
  const chess = new Chess(
    'nnr1qrbb/p2kpppp/1p1p4/2p5/6P1/PP1P4/2P1PP1P/NNRKQRBB w FC - 0 9',
  )
  expect(chess.perft(3)).toBe(17043)
})
test('perft - 960 - position 80', () => {
  const chess = new Chess(
    'bbnnrkrq/ppp1pp2/6p1/3p4/7p/7P/PPPPPPP1/BBNNRRKQ w ge - 0 9',
  )
  expect(chess.perft(3)).toBe(12242)
})
test('perft - 960 - position 81', () => {
  const chess = new Chess(
    'bnnbrkr1/ppp2p1p/5q2/3pp1p1/4P3/1N4P1/PPPPRP1P/BN1B1KRQ w Gge - 0 9',
  )
  expect(chess.perft(3)).toBe(27228)
})
test('perft - 960 - position 82', () => {
  const chess = new Chess(
    'bn1rkbrq/1pppppp1/p6p/1n6/3P4/6PP/PPPRPP2/BNN1KBRQ w Ggd - 2 9',
  )
  expect(chess.perft(3)).toBe(19278)
})
test('perft - 960 - position 83', () => {
  const chess = new Chess(
    'b1nrkrqb/1p1npppp/p2p4/2p5/5P2/4P2P/PPPP1RP1/BNNRK1QB w Dfd - 1 9',
  )
  expect(chess.perft(3)).toBe(12603)
})
test('perft - 960 - position 84', () => {
  const chess = new Chess(
    '1bbnrkrq/ppppppp1/8/7p/1n4P1/1PN5/P1PPPP1P/NBBR1KRQ w Gge - 0 9',
  )
  expect(chess.perft(3)).toBe(25473)
})
test('perft - 960 - position 85', () => {
  const chess = new Chess(
    'nnbbrkrq/2pp1pp1/1p5p/pP2p3/7P/N7/P1PPPPP1/N1BBRKRQ w GEge - 0 9',
  )
  expect(chess.perft(3)).toBe(9638)
})
test('perft - 960 - position 86', () => {
  const chess = new Chess(
    'nnbrkbrq/1pppp1p1/p7/7p/1P2Pp2/BN6/P1PP1PPP/1N1RKBRQ w GDgd - 0 9',
  )
  expect(chess.perft(3)).toBe(13441)
})
test('perft - 960 - position 87', () => {
  const chess = new Chess(
    'n1brkrqb/pppp3p/n3pp2/6p1/3P1P2/N1P5/PP2P1PP/N1BRKRQB w FDfd - 0 9',
  )
  expect(chess.perft(3)).toBe(19005)
})
test('perft - 960 - position 88', () => {
  const chess = new Chess(
    'nbnrbk2/p1pppp1p/1p3qr1/6p1/1B1P4/1N6/PPP1PPPP/1BNR1RKQ w d - 2 9',
  )
  expect(chess.perft(3)).toBe(22780)
})
test('perft - 960 - position 89', () => {
  const chess = new Chess(
    'nnrbbrkq/1pp2ppp/3p4/p3p3/3P1P2/1P2P3/P1P3PP/NNRBBKRQ w GC - 1 9',
  )
  expect(chess.perft(3)).toBe(24538)
})
test('perft - 960 - position 90', () => {
  const chess = new Chess(
    'nnrkbbrq/1pp2p1p/p2pp1p1/2P5/8/8/PP1PPPPP/NNRKBBRQ w Ggc - 0 9',
  )
  expect(chess.perft(3)).toBe(19283)
})
test('perft - 960 - position 91', () => {
  const chess = new Chess(
    'nnr1brqb/1ppkp1pp/8/p2p1p2/1P1P4/N1P5/P3PPPP/N1RKBRQB w FC - 1 9',
  )
  expect(chess.perft(3)).toBe(15471)
})
test('perft - 960 - position 92', () => {
  const chess = new Chess(
    'nbnrkrbq/2ppp2p/p4p2/1P4p1/4PP2/8/1PPP2PP/NBNRKRBQ w FDfd - 0 9',
  )
  expect(chess.perft(3)).toBe(26137)
})
test('perft - 960 - position 93', () => {
  const chess = new Chess(
    '1nrbkr1q/1pppp1pp/1n6/p4p2/N1b4P/8/PPPPPPPB/N1RBKR1Q w FCfc - 2 9',
  )
  expect(chess.perft(3)).toBe(24141)
})
test('perft - 960 - position 94', () => {
  const chess = new Chess(
    'nnrkrbbq/pppp2pp/8/4pp2/4P3/P7/1PPPBPPP/NNKRR1BQ w c - 0 9',
  )
  expect(chess.perft(3)).toBe(19883)
})
test('perft - 960 - position 95', () => {
  const chess = new Chess(
    'n1rk1qbb/pppprpp1/2n4p/4p3/2PP3P/8/PP2PPP1/NNRKRQBB w ECc - 1 9',
  )
  expect(chess.perft(3)).toBe(16031)
})
test('perft - 960 - position 96', () => {
  const chess = new Chess(
    'bbq1rnkr/pnp1pp1p/1p1p4/6p1/2P5/2Q1P2P/PP1P1PP1/BB1NRNKR w HEhe - 2 9',
  )
  expect(chess.perft(3)).toBe(30516)
})
test('perft - 960 - position 97', () => {
  const chess = new Chess(
    'bq1brnkr/1p1ppp1p/1np5/p5p1/8/1N5P/PPPPPPP1/BQ1BRNKR w HEhe - 0 9',
  )
  expect(chess.perft(3)).toBe(13524)
})
test('perft - 960 - position 98', () => {
  const chess = new Chess(
    'bq1rn1kr/1pppppbp/Nn4p1/8/8/P7/1PPPPPPP/BQ1RNBKR w HDhd - 1 9',
  )
  expect(chess.perft(3)).toBe(18197)
})
test('perft - 960 - position 99', () => {
  const chess = new Chess(
    'bqnr1kr1/pppppp1p/6p1/5n2/4B3/3N2PP/PbPPPP2/BQNR1KR1 w GDgd - 2 9',
  )
  expect(chess.perft(3)).toBe(36559)
})
test('perft - 960 - position 100', () => {
  const chess = new Chess(
    'qbb1rnkr/ppp3pp/4n3/3ppp2/1P3PP1/8/P1PPPN1P/QBB1RNKR w HEhe - 0 9',
  )
  expect(chess.perft(3)).toBe(20502)
})
test('perft - 960 - position 101', () => {
  const chess = new Chess(
    'qnbbr1kr/pp1ppp1p/4n3/6p1/2p3P1/2PP1P2/PP2P2P/QNBBRNKR w HEhe - 0 9',
  )
  expect(chess.perft(3)).toBe(16520)
})
test('perft - 960 - position 102', () => {
  const chess = new Chess(
    '1nbrnbkr/p1ppp1pp/1p6/5p2/4q1PP/3P4/PPP1PP2/QNBRNBKR w HDhd - 1 9',
  )
  expect(chess.perft(3)).toBe(33199)
})
test('perft - 960 - position 103', () => {
  const chess = new Chess(
    'q1brnkrb/p1pppppp/n7/1p6/P7/3P1P2/QPP1P1PP/1NBRNKRB w GDgd - 0 9',
  )
  expect(chess.perft(3)).toBe(26106)
})
test('perft - 960 - position 104', () => {
  const chess = new Chess(
    'qbnrb1kr/ppp1pp1p/3p4/2n3p1/1P6/6N1/P1PPPPPP/QBNRB1KR w HDhd - 2 9',
  )
  expect(chess.perft(3)).toBe(23132)
})
test('perft - 960 - position 105', () => {
  const chess = new Chess(
    'q1rbbnkr/pppp1p2/2n3pp/2P1p3/3P4/8/PP1NPPPP/Q1RBBNKR w HChc - 2 9',
  )
  expect(chess.perft(3)).toBe(24540)
})
test('perft - 960 - position 106', () => {
  const chess = new Chess(
    'q1r1bbkr/pnpp1ppp/2n1p3/1p6/2P2P2/2N1N3/PP1PP1PP/Q1R1BBKR w HChc - 2 9',
  )
  expect(chess.perft(3)).toBe(32098)
})
test('perft - 960 - position 107', () => {
  const chess = new Chess(
    '2rnbkrb/pqppppp1/1pn5/7p/2P5/P1R5/QP1PPPPP/1N1NBKRB w Ggc - 4 9',
  )
  expect(chess.perft(3)).toBe(16506)
})
test('perft - 960 - position 108', () => {
  const chess = new Chess(
    'qbnr1kbr/p2ppppp/2p5/1p6/4n2P/P4N2/1PPP1PP1/QBNR1KBR w HDhd - 0 9',
  )
  expect(chess.perft(3)).toBe(23828)
})
test('perft - 960 - position 109', () => {
  const chess = new Chess(
    'qnrbnk1r/pp1pp2p/5p2/2pbP1p1/3P4/1P6/P1P2PPP/QNRBNKBR w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(24832)
})
test('perft - 960 - position 110', () => {
  const chess = new Chess(
    'qnrnk1br/p1p2ppp/8/1pbpp3/8/PP2N3/1QPPPPPP/1NR1KBBR w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(20828)
})
test('perft - 960 - position 111', () => {
  const chess = new Chess(
    'qnrnkrbb/Bpppp2p/6p1/5p2/5P2/3PP3/PPP3PP/QNRNKR1B w FCfc - 1 9',
  )
  expect(chess.perft(3)).toBe(25730)
})
test('perft - 960 - position 112', () => {
  const chess = new Chess(
    'bbnqrn1r/ppppp2k/5p2/6pp/7P/1QP5/PP1PPPP1/B1N1RNKR w HE - 0 9',
  )
  expect(chess.perft(3)).toBe(21790)
})
test('perft - 960 - position 113', () => {
  const chess = new Chess(
    'b1qbrnkr/ppp1pp2/2np4/6pp/4P3/2N4P/PPPP1PP1/BQ1BRNKR w HEhe - 0 9',
  )
  expect(chess.perft(3)).toBe(24253)
})
test('perft - 960 - position 114', () => {
  const chess = new Chess(
    'bnqr1bkr/pp1ppppp/2p5/4N3/5P2/P7/1PPPPnPP/BNQR1BKR w HDhd - 3 9',
  )
  expect(chess.perft(3)).toBe(13909)
})
test('perft - 960 - position 115', () => {
  const chess = new Chess(
    'b1qr1krb/pp1ppppp/n2n4/8/2p5/2P3P1/PP1PPP1P/BNQRNKRB w GDgd - 0 9',
  )
  expect(chess.perft(3)).toBe(19721)
})
test('perft - 960 - position 116', () => {
  const chess = new Chess(
    'nbbqr1kr/1pppp1pp/8/p1n2p2/4P3/PN6/1PPPQPPP/1BB1RNKR w HEhe - 0 9',
  )
  expect(chess.perft(3)).toBe(23416)
})
test('perft - 960 - position 117', () => {
  const chess = new Chess(
    'nqbbrn1r/p1pppp1k/1p4p1/7p/4P3/1R3B2/PPPP1PPP/NQB2NKR w H - 0 9',
  )
  expect(chess.perft(3)).toBe(13512)
})
test('perft - 960 - position 118', () => {
  const chess = new Chess(
    'nqbr1bkr/p1p1ppp1/1p1n4/3pN2p/1P6/8/P1PPPPPP/NQBR1BKR w HDhd - 0 9',
  )
  expect(chess.perft(3)).toBe(26532)
})
test('perft - 960 - position 119', () => {
  const chess = new Chess(
    'nqbrn1rb/pppp1kp1/5p1p/4p3/P4B2/3P2P1/1PP1PP1P/NQ1RNKRB w GD - 0 9',
  )
  expect(chess.perft(3)).toBe(22332)
})
test('perft - 960 - position 120', () => {
  const chess = new Chess(
    'nb1r1nkr/ppp1ppp1/2bp4/7p/3P2qP/P6R/1PP1PPP1/NBQRBNK1 w Dhd - 1 9',
  )
  expect(chess.perft(3)).toBe(60060)
})
test('perft - 960 - position 121', () => {
  const chess = new Chess(
    'n1rbbnkr/1p1pp1pp/p7/2p1qp2/1B3P2/3P4/PPP1P1PP/NQRB1NKR w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(21595)
})
test('perft - 960 - position 122', () => {
  const chess = new Chess(
    'nqrnbbkr/p2p1p1p/1pp5/1B2p1p1/1P3P2/4P3/P1PP2PP/NQRNB1KR w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(30159)
})
test('perft - 960 - position 123', () => {
  const chess = new Chess(
    'nqr1bkrb/ppp1pp2/2np2p1/P6p/8/2P4P/1P1PPPP1/NQRNBKRB w GCgc - 0 9',
  )
  expect(chess.perft(3)).toBe(16569)
})
test('perft - 960 - position 124', () => {
  const chess = new Chess(
    'nb1rnkbr/pqppppp1/1p5p/8/1PP4P/8/P2PPPP1/NBQRNKBR w HDhd - 1 9',
  )
  expect(chess.perft(3)).toBe(24862)
})
test('perft - 960 - position 125', () => {
  const chess = new Chess(
    'nqrbnkbr/2p1p1pp/3p4/pp3p2/6PP/3P1N2/PPP1PP2/NQRB1KBR w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(14409)
})
test('perft - 960 - position 126', () => {
  const chess = new Chess(
    'nqrnkbbr/pp1p1p1p/4p1p1/1p6/8/5P1P/P1PPP1P1/NQRNKBBR w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(31481)
})
test('perft - 960 - position 127', () => {
  const chess = new Chess(
    'nqrnkrbb/p2ppppp/1p6/2p5/2P3P1/5P2/PP1PPN1P/NQR1KRBB w FCfc - 1 9',
  )
  expect(chess.perft(3)).toBe(23958)
})
test('perft - 960 - position 128', () => {
  const chess = new Chess(
    'bbnrqrk1/pp2pppp/4n3/2pp4/P7/1N5P/BPPPPPP1/B2RQNKR w HD - 2 9',
  )
  expect(chess.perft(3)).toBe(17164)
})
test('perft - 960 - position 129', () => {
  const chess = new Chess(
    'bnr1qnkr/p1pp1p1p/1p4p1/4p1b1/2P1P3/1P6/PB1P1PPP/1NRBQNKR w HChc - 1 9',
  )
  expect(chess.perft(3)).toBe(29249)
})
test('perft - 960 - position 130', () => {
  const chess = new Chess(
    'b1rqnbkr/ppp1ppp1/3p3p/2n5/P3P3/2NP4/1PP2PPP/B1RQNBKR w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(15533)
})
test('perft - 960 - position 131', () => {
  const chess = new Chess(
    'bnrqnr1b/pp1pkppp/2p1p3/P7/2P5/7P/1P1PPPP1/BNRQNKRB w GC - 0 9',
  )
  expect(chess.perft(3)).toBe(15293)
})
test('perft - 960 - position 132', () => {
  const chess = new Chess(
    'n1brq1kr/bppppppp/p7/8/4P1Pn/8/PPPP1P2/NBBRQNKR w HDhd - 0 9',
  )
  expect(chess.perft(3)).toBe(13139)
})
test('perft - 960 - position 133', () => {
  const chess = new Chess(
    '1rbbqnkr/ppn1ppp1/3p3p/2p5/3P4/1N4P1/PPPBPP1P/1R1BQNKR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(29547)
})
test('perft - 960 - position 134', () => {
  const chess = new Chess(
    'nrbq2kr/ppppppb1/5n1p/5Pp1/8/P5P1/1PPPP2P/NRBQNBKR w HBhb - 1 9',
  )
  expect(chess.perft(3)).toBe(11745)
})
test('perft - 960 - position 135', () => {
  const chess = new Chess(
    'nrb1nkrb/pp3ppp/1qBpp3/2p5/8/P5P1/1PPPPP1P/NRBQNKR1 w GBgb - 2 9',
  )
  expect(chess.perft(3)).toBe(25642)
})
test('perft - 960 - position 136', () => {
  const chess = new Chess(
    '1br1bnkr/ppqppp1p/1np3p1/8/1PP4P/4N3/P2PPPP1/NBRQB1KR w HChc - 1 9',
  )
  expect(chess.perft(3)).toBe(24765)
})
test('perft - 960 - position 137', () => {
  const chess = new Chess(
    'nrqbb1kr/1p1pp1pp/2p3n1/p4p2/3PP3/P5N1/1PP2PPP/NRQBB1KR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(26213)
})
test('perft - 960 - position 138', () => {
  const chess = new Chess(
    'nrqn1bkr/ppppp1pp/4b3/8/4P1p1/5P2/PPPP3P/NRQNBBKR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(20223)
})
test('perft - 960 - position 139', () => {
  const chess = new Chess(
    'nrqnbrkb/pppp1p2/4p2p/3B2p1/8/1P4P1/PQPPPP1P/NR1NBKR1 w GB - 0 9',
  )
  expect(chess.perft(3)).toBe(27073)
})
test('perft - 960 - position 140', () => {
  const chess = new Chess(
    'nbrq1kbr/Bp3ppp/2pnp3/3p4/5P2/2P4P/PP1PP1P1/NBRQNK1R w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(48022)
})
test('perft - 960 - position 141', () => {
  const chess = new Chess(
    'nrqbnkbr/1p2ppp1/p1p4p/3p4/1P6/8/PQPPPPPP/1RNBNKBR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(23135)
})
test('perft - 960 - position 142', () => {
  const chess = new Chess(
    'nrqn1bbr/2ppkppp/4p3/pB6/8/2P1P3/PP1P1PPP/NRQNK1BR w HB - 1 9',
  )
  expect(chess.perft(3)).toBe(17096)
})
test('perft - 960 - position 143', () => {
  const chess = new Chess(
    'nrqnkrb1/p1ppp2p/1p4p1/4bp2/4PP1P/4N3/PPPP2P1/NRQ1KRBB w FBfb - 1 9',
  )
  expect(chess.perft(3)).toBe(27397)
})
test('perft - 960 - position 144', () => {
  const chess = new Chess(
    '1bnrnqkr/pbpp2pp/8/1p2pp2/P6P/3P1N2/1PP1PPP1/BBNR1QKR w HDhd - 0 9',
  )
  expect(chess.perft(3)).toBe(23475)
})
test('perft - 960 - position 145', () => {
  const chess = new Chess(
    'b1rbnqkr/1pp1ppp1/2n4p/p2p4/5P2/1PBP4/P1P1P1PP/1NRBNQKR w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(14817)
})
test('perft - 960 - position 146', () => {
  const chess = new Chess(
    '1nrnqbkr/p1pppppp/1p6/8/2b2P2/P1N5/1PP1P1PP/BNR1QBKR w HChc - 2 9',
  )
  expect(chess.perft(3)).toBe(17716)
})
test('perft - 960 - position 147', () => {
  const chess = new Chess(
    '1nrnqkrb/2ppp1pp/p7/1p3p2/5P2/N5K1/PPPPP2P/B1RNQ1RB w gc - 0 9',
  )
  expect(chess.perft(3)).toBe(23572)
})
test('perft - 960 - position 148', () => {
  const chess = new Chess(
    'nbbr1qkr/p1pppppp/8/1p1n4/3P4/1N3PP1/PPP1P2P/1BBRNQKR w HDhd - 1 9',
  )
  expect(chess.perft(3)).toBe(20527)
})
test('perft - 960 - position 149', () => {
  const chess = new Chess(
    '1rbbnqkr/1pnppp1p/p5p1/2p5/2P4P/5P2/PP1PP1PR/NRBBNQK1 w Bhb - 1 9',
  )
  expect(chess.perft(3)).toBe(14221)
})
test('perft - 960 - position 150', () => {
  const chess = new Chess(
    'nrb1qbkr/2pppppp/2n5/p7/2p5/4P3/PPNP1PPP/1RBNQBKR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(15572)
})
test('perft - 960 - position 151', () => {
  const chess = new Chess(
    'nrb1qkrb/2ppppp1/p3n3/1p1B3p/2P5/6P1/PP1PPPRP/NRBNQK2 w Bgb - 2 9',
  )
  expect(chess.perft(3)).toBe(16770)
})
test('perft - 960 - position 152', () => {
  const chess = new Chess(
    'nbrn1qkr/ppp1pp2/3p2p1/3Q3P/b7/8/PPPPPP1P/NBRNB1KR w HChc - 2 9',
  )
  expect(chess.perft(3)).toBe(40157)
})
test('perft - 960 - position 153', () => {
  const chess = new Chess(
    'nr1bbqkr/pp1pp2p/1n3pp1/2p5/8/1P4P1/P1PPPPQP/NRNBBK1R w hb - 0 9',
  )
  expect(chess.perft(3)).toBe(15719)
})
test('perft - 960 - position 154', () => {
  const chess = new Chess(
    'nr2bbkr/ppp1pppp/1n1p4/8/6PP/1NP4q/PP1PPP2/1RNQBBKR w HBhb - 1 9',
  )
  expect(chess.perft(3)).toBe(15984)
})
test('perft - 960 - position 155', () => {
  const chess = new Chess(
    '1rnqbkrb/ppp1p1p1/1n3p2/3p3p/P6P/4P3/1PPP1PP1/NRNQBRKB w gb - 0 9',
  )
  expect(chess.perft(3)).toBe(14044)
})
test('perft - 960 - position 156', () => {
  const chess = new Chess(
    'nb1rqkbr/1pppp1pp/4n3/p4p2/6PP/5P2/PPPPPN2/NBR1QKBR w HCh - 0 9',
  )
  expect(chess.perft(3)).toBe(16789)
})
test('perft - 960 - position 157', () => {
  const chess = new Chess(
    'nrnbqkbr/2pp2pp/4pp2/pp6/8/1P3P2/P1PPPBPP/NRNBQ1KR w hb - 0 9',
  )
  expect(chess.perft(3)).toBe(16951)
})
test('perft - 960 - position 158', () => {
  const chess = new Chess(
    'nrnqkbbr/ppppp1p1/7p/5p2/8/P4PP1/NPPPP2P/NR1QKBBR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(20621)
})
test('perft - 960 - position 159', () => {
  const chess = new Chess(
    '1rnqkr1b/ppppp2p/1n3pp1/8/2P3P1/Pb1N4/1P1PPP1P/NR1QKRBB w FBfb - 0 9',
  )
  expect(chess.perft(3)).toBe(19671)
})
test('perft - 960 - position 160', () => {
  const chess = new Chess(
    'bbnrnkqr/1pppp1pp/5p2/p7/7P/1P6/PBPPPPPR/1BNRNKQ1 w D - 2 9',
  )
  expect(chess.perft(3)).toBe(17834)
})
test('perft - 960 - position 161', () => {
  const chess = new Chess(
    'bnrbk1qr/1ppp1ppp/p2np3/8/P7/2N2P2/1PPPP1PP/B1RBNKQR w HC - 0 9',
  )
  expect(chess.perft(3)).toBe(17569)
})
test('perft - 960 - position 162', () => {
  const chess = new Chess(
    'br1nkbqr/ppppppp1/8/n6p/8/N1P2PP1/PP1PP2P/B1RNKBQR w HCh - 1 9',
  )
  expect(chess.perft(3)).toBe(20182)
})
test('perft - 960 - position 163', () => {
  const chess = new Chess(
    'bnr1kqrb/pp1pppp1/2n5/2p5/1P4Pp/4N3/P1PPPP1P/BNKR1QRB w gc - 0 9',
  )
  expect(chess.perft(3)).toBe(31630)
})
test('perft - 960 - position 164', () => {
  const chess = new Chess(
    '1bbrnkqr/pp1p1ppp/2p1p3/1n6/5P2/3Q4/PPPPP1PP/NBBRNK1R w HDhd - 2 9',
  )
  expect(chess.perft(3)).toBe(31075)
})
test('perft - 960 - position 165', () => {
  const chess = new Chess(
    'nrbbnk1r/pp2pppq/8/2pp3p/3P2P1/1N6/PPP1PP1P/1RBBNKQR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(31344)
})
test('perft - 960 - position 166', () => {
  const chess = new Chess(
    'nr1nkbqr/ppp3pp/5p2/3pp3/6b1/3PP3/PPP2PPP/NRBNKBQR w hb - 0 9',
  )
  expect(chess.perft(3)).toBe(13306)
})
test('perft - 960 - position 167', () => {
  const chess = new Chess(
    'nrbnk1rb/ppp1pq1p/3p4/5pp1/2P1P3/1N6/PP1PKPPP/1RBN1QRB w gb - 2 9',
  )
  expect(chess.perft(3)).toBe(24026)
})
test('perft - 960 - position 168', () => {
  const chess = new Chess(
    '1brnbkqr/pppppp2/6p1/7p/1Pn5/P1NP4/2P1PPPP/NBR1BKQR w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(13760)
})
test('perft - 960 - position 169', () => {
  const chess = new Chess(
    'nrnbbk1r/p1pppppq/8/7p/1p6/P5PP/1PPPPPQ1/NRNBBK1R w HBhb - 2 9',
  )
  expect(chess.perft(3)).toBe(26742)
})
test('perft - 960 - position 170', () => {
  const chess = new Chess(
    'n1nkb1qr/prppppbp/6p1/1p6/2P2P2/P7/1P1PP1PP/NRNKBBQR w HBh - 1 9',
  )
  expect(chess.perft(3)).toBe(24701)
})
test('perft - 960 - position 171', () => {
  const chess = new Chess(
    'nr2bqrb/ppkpp1pp/1np5/5p1P/5P2/2P5/PP1PP1P1/NRNKBQRB w GB - 0 9',
  )
  expect(chess.perft(3)).toBe(13055)
})
test('perft - 960 - position 172', () => {
  const chess = new Chess(
    'nbr1kqbr/p3pppp/2ppn3/1p4P1/4P3/1P6/P1PP1P1P/NBRNKQBR w HChc - 1 9',
  )
  expect(chess.perft(3)).toBe(14291)
})
test('perft - 960 - position 173', () => {
  const chess = new Chess(
    'nr1bkqbr/1p1pp1pp/pnp2p2/8/6P1/P1PP4/1P2PP1P/NRNBKQBR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(13343)
})
test('perft - 960 - position 174', () => {
  const chess = new Chess(
    'nr1kqbbr/np2pppp/p1p5/1B1p1P2/8/4P3/PPPP2PP/NRNKQ1BR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(23391)
})
test('perft - 960 - position 175', () => {
  const chess = new Chess(
    'nrnk1rbb/p1p2ppp/3pq3/Qp2p3/1P1P4/8/P1P1PPPP/NRN1KRBB w fb - 2 9',
  )
  expect(chess.perft(3)).toBe(25683)
})
test('perft - 960 - position 176', () => {
  const chess = new Chess(
    'bbnrnkrq/pp1ppp1p/6p1/2p5/6P1/P5RP/1PPPPP2/BBNRNK1Q w Dgd - 3 9',
  )
  expect(chess.perft(3)).toBe(45060)
})
test('perft - 960 - position 177', () => {
  const chess = new Chess(
    'bnrb1rkq/ppnpppp1/3Q4/2p4p/7P/N7/PPPPPPP1/B1RBNKR1 w GC - 2 9',
  )
  expect(chess.perft(3)).toBe(31944)
})
test('perft - 960 - position 178', () => {
  const chess = new Chess(
    'bnrnkbrq/p1ppppp1/1p5p/8/P2PP3/5P2/1PP3PP/BNRNKBRQ w GCgc - 1 9',
  )
  expect(chess.perft(3)).toBe(16992)
})
test('perft - 960 - position 179', () => {
  const chess = new Chess(
    'bnrnkrqb/pp2p2p/2pp1pp1/8/P7/2PP1P2/1P2P1PP/BNRNKRQB w FCfc - 0 9',
  )
  expect(chess.perft(3)).toBe(19726)
})
test('perft - 960 - position 180', () => {
  const chess = new Chess(
    'nbbrnkr1/1pppp1p1/p6q/P4p1p/8/5P2/1PPPP1PP/NBBRNRKQ w gd - 2 9',
  )
  expect(chess.perft(3)).toBe(10484)
})
test('perft - 960 - position 181', () => {
  const chess = new Chess(
    'nrb1nkrq/2pp1ppp/p4b2/1p2p3/P4B2/3P4/1PP1PPPP/NR1BNRKQ w gb - 0 9',
  )
  expect(chess.perft(3)).toBe(14017)
})
test('perft - 960 - position 182', () => {
  const chess = new Chess(
    'nrbnkbrq/p3p1pp/1p6/2pp1P2/8/3PP3/PPP2P1P/NRBNKBRQ w GBgb - 0 9',
  )
  expect(chess.perft(3)).toBe(24819)
})
test('perft - 960 - position 183', () => {
  const chess = new Chess(
    'nrbnkrqb/pppp1p1p/4p1p1/8/7P/2P1P3/PPNP1PP1/1RBNKRQB w FBfb - 0 9',
  )
  expect(chess.perft(3)).toBe(9998)
})
test('perft - 960 - position 184', () => {
  const chess = new Chess(
    'nbrn1krq/ppp1p2p/6b1/3p1pp1/8/4N1PP/PPPPPP2/NBR1BRKQ w gc - 1 9',
  )
  expect(chess.perft(3)).toBe(23632)
})
test('perft - 960 - position 185', () => {
  const chess = new Chess(
    'nrnbbkrq/p1pp2pp/5p2/1p6/2P1pP1B/1P6/P2PP1PP/NRNB1KRQ w GBgb - 0 9',
  )
  expect(chess.perft(3)).toBe(16102)
})
test('perft - 960 - position 186', () => {
  const chess = new Chess(
    'nrn1bbrq/1ppkppp1/p2p3p/8/1P3N2/4P3/P1PP1PPP/NR1KBBRQ w GB - 2 9',
  )
  expect(chess.perft(3)).toBe(18722)
})
test('perft - 960 - position 187', () => {
  const chess = new Chess(
    'n1krbrqb/1ppppppp/p7/8/4n3/P4P1P/1PPPPQP1/NRNKBR1B w FB - 2 9',
  )
  expect(chess.perft(3)).toBe(16988)
})
test('perft - 960 - position 188', () => {
  const chess = new Chess(
    'n1rnkrbq/1p1ppp1p/8/p1p1b1p1/3PQ1P1/4N3/PPP1PP1P/NBR1KRB1 w FCfc - 0 9',
  )
  expect(chess.perft(3)).toBe(35731)
})
test('perft - 960 - position 189', () => {
  const chess = new Chess(
    'nrnbkrbq/2pp1pp1/pp6/4p2p/P7/5PPP/1PPPP3/NRNBKRBQ w FBfb - 0 9',
  )
  expect(chess.perft(3)).toBe(16731)
})
test('perft - 960 - position 190', () => {
  const chess = new Chess(
    '1rnkrbbq/pp1p2pp/1n3p2/1Bp1p3/1P6/1N2P3/P1PP1PPP/1RNKR1BQ w EBeb - 0 9',
  )
  expect(chess.perft(3)).toBe(32244)
})
test('perft - 960 - position 191', () => {
  const chess = new Chess(
    'nr1krqbb/p1ppppp1/8/1p5p/1Pn5/5P2/P1PPP1PP/NRNKRQBB w EBeb - 0 9',
  )
  expect(chess.perft(3)).toBe(15985)
})
test('perft - 960 - position 192', () => {
  const chess = new Chess(
    'bbq1rkr1/1ppppppp/p1n2n2/8/2P2P2/1P6/PQ1PP1PP/BB1NRKNR w HEe - 3 9',
  )
  expect(chess.perft(3)).toBe(26846)
})
test('perft - 960 - position 193', () => {
  const chess = new Chess(
    'b1nbrknr/1qppp1pp/p4p2/1p6/6P1/P2NP3/1PPP1P1P/BQ1BRKNR w HEhe - 1 9',
  )
  expect(chess.perft(3)).toBe(17138)
})
test('perft - 960 - position 194', () => {
  const chess = new Chess(
    'bqnrk1nr/pp2ppbp/6p1/2pp4/2P5/5P2/PPQPP1PP/B1NRKBNR w HDhd - 0 9',
  )
  expect(chess.perft(3)).toBe(22876)
})
test('perft - 960 - position 195', () => {
  const chess = new Chess(
    'bqnrknrb/1ppp1p1p/p7/6p1/1P2p3/P1PN4/3PPPPP/BQ1RKNRB w GDgd - 0 9',
  )
  expect(chess.perft(3)).toBe(19290)
})
test('perft - 960 - position 196', () => {
  const chess = new Chess(
    'q1b1rknr/pp1pppp1/4n2p/2p1b3/1PP5/4P3/PQ1P1PPP/1BBNRKNR w HEhe - 1 9',
  )
  expect(chess.perft(3)).toBe(32566)
})
test('perft - 960 - position 197', () => {
  const chess = new Chess(
    'qnbbrknr/1p1ppppp/8/p1p5/5P2/PP1P4/2P1P1PP/QNBBRKNR w HEhe - 0 9',
  )
  expect(chess.perft(3)).toBe(16331)
})
test('perft - 960 - position 198', () => {
  const chess = new Chess(
    'q1brkb1r/p1pppppp/np3B2/8/6n1/1P5N/P1PPPPPP/QN1RKB1R w HDhd - 0 9',
  )
  expect(chess.perft(3)).toBe(31549)
})
test('perft - 960 - position 199', () => {
  const chess = new Chess(
    'qn1rk1rb/p1pppppp/1p2n3/8/2b5/4NPP1/PPPPP1RP/QNBRK2B w Dgd - 4 9',
  )
  expect(chess.perft(3)).toBe(19156)
})
test('perft - 960 - position 200', () => {
  const chess = new Chess(
    'qbnrbknr/ppp2p1p/8/3pp1p1/1PP1B3/5N2/P2PPPPP/Q1NRBK1R w HDhd - 0 9',
  )
  expect(chess.perft(3)).toBe(32506)
})
test('perft - 960 - position 201', () => {
  const chess = new Chess(
    'qnrbb1nr/pp1p1ppp/2p2k2/4p3/4P3/5PPP/PPPP4/QNRBBKNR w HC - 0 9',
  )
  expect(chess.perft(3)).toBe(10287)
})
test('perft - 960 - position 202', () => {
  const chess = new Chess(
    'qnr1bbnr/ppk1p1pp/3p4/2p2p2/8/2P5/PP1PPPPP/QNKRBBNR w - - 1 9',
  )
  expect(chess.perft(3)).toBe(11834)
})
test('perft - 960 - position 203', () => {
  const chess = new Chess(
    'qnrkbnrb/1p1p1ppp/2p5/4p3/p7/N1BP4/PPP1PPPP/Q1R1KNRB w gc - 0 9',
  )
  expect(chess.perft(3)).toBe(16233)
})
test('perft - 960 - position 204', () => {
  const chess = new Chess(
    'qbnrkn1r/1pppp1p1/p3bp2/2BN3p/8/5P2/PPPPP1PP/QBNRK2R w HDhd - 0 9',
  )
  expect(chess.perft(3)).toBe(38728)
})
test('perft - 960 - position 205', () => {
  const chess = new Chess(
    'qnrbknbr/1pp2ppp/4p3/p6N/2p5/8/PPPPPPPP/Q1RBK1BR w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(11844)
})
test('perft - 960 - position 206', () => {
  const chess = new Chess(
    '1qkrnbbr/p1pppppp/2n5/1p6/8/5NP1/PPPPPP1P/QNRK1BBR w HC - 4 9',
  )
  expect(chess.perft(3)).toBe(13987)
})
test('perft - 960 - position 207', () => {
  const chess = new Chess(
    'q1rknr1b/1ppppppb/2n5/p2B3p/8/1PN3P1/P1PPPP1P/Q1RKNRB1 w FCfc - 3 9',
  )
  expect(chess.perft(3)).toBe(28520)
})
test('perft - 960 - position 208', () => {
  const chess = new Chess(
    'bbnqrk1r/pp1pppp1/2p4p/8/6n1/1N1P1P2/PPP1P1PP/BBQ1RKNR w HEhe - 4 9',
  )
  expect(chess.perft(3)).toBe(20147)
})
test('perft - 960 - position 209', () => {
  const chess = new Chess(
    'bn1brknr/ppp1p1pp/5p2/3p4/6qQ/3P3P/PPP1PPP1/BN1BRKNR w HEhe - 4 9',
  )
  expect(chess.perft(3)).toBe(22991)
})
test('perft - 960 - position 210', () => {
  const chess = new Chess(
    '1nqrkbnr/2pp1ppp/pp2p3/3b4/2P5/N7/PP1PPPPP/B1QRKBNR w HDhd - 0 9',
  )
  expect(chess.perft(3)).toBe(16173)
})
test('perft - 960 - position 211', () => {
  const chess = new Chess(
    'bnqrk1rb/1pp1pppp/p2p4/4n3/2PPP3/8/PP3PPP/BNQRKNRB w GDgd - 1 9',
  )
  expect(chess.perft(3)).toBe(28169)
})
test('perft - 960 - position 212', () => {
  const chess = new Chess(
    'nbb1rknr/1ppq1ppp/3p4/p3p3/4P3/1N2R3/PPPP1PPP/1BBQ1KNR w Hhe - 2 9',
  )
  expect(chess.perft(3)).toBe(31293)
})
test('perft - 960 - position 213', () => {
  const chess = new Chess(
    'nqbbrknr/2ppp2p/pp4p1/5p2/7P/3P1P2/PPPBP1P1/NQ1BRKNR w HEhe - 0 9',
  )
  expect(chess.perft(3)).toBe(13266)
})
test('perft - 960 - position 214', () => {
  const chess = new Chess(
    '1qbrkb1r/pppppppp/8/3n4/4P1n1/PN6/1PPP1P1P/1QBRKBNR w HDhd - 3 9',
  )
  expect(chess.perft(3)).toBe(21982)
})
test('perft - 960 - position 215', () => {
  const chess = new Chess(
    '1qbrknrb/1p1ppppp/1np5/8/p4P1P/4P1N1/PPPP2P1/NQBRK1RB w GDgd - 0 9',
  )
  expect(chess.perft(3)).toBe(10581)
})
test('perft - 960 - position 216', () => {
  const chess = new Chess(
    'nbqrbkr1/ppp1pppp/8/3p4/6n1/2P2PPN/PP1PP2P/NBQRBK1R w HDd - 1 9',
  )
  expect(chess.perft(3)).toBe(25748)
})
test('perft - 960 - position 217', () => {
  const chess = new Chess(
    'nqrb1knr/1ppbpp1p/p7/3p2p1/2P3P1/5P1P/PP1PP3/NQRBBKNR w HChc - 1 9',
  )
  expect(chess.perft(3)).toBe(25857)
})
test('perft - 960 - position 218', () => {
  const chess = new Chess(
    '1qrkbbr1/pppp1ppp/1n3n2/4p3/5P2/1N6/PPPPP1PP/1QRKBBNR w HCc - 0 9',
  )
  expect(chess.perft(3)).toBe(19118)
})
test('perft - 960 - position 219', () => {
  const chess = new Chess(
    'nqrkb1rb/pp2pppp/2p1n3/3p4/3PP1N1/8/PPP2PPP/NQRKB1RB w GCgc - 0 9',
  )
  expect(chess.perft(3)).toBe(21752)
})
test('perft - 960 - position 220', () => {
  const chess = new Chess(
    'nb1rknbr/pp2ppp1/8/2Bp3p/6P1/2P2P1q/PP1PP2P/NBQRKN1R w HDhd - 0 9',
  )
  expect(chess.perft(3)).toBe(43025)
})
test('perft - 960 - position 221', () => {
  const chess = new Chess(
    'nqrbkn1r/pp1pp1pp/8/2p2p2/5P2/P3B2P/1PbPP1P1/NQRBKN1R w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(19439)
})
test('perft - 960 - position 222', () => {
  const chess = new Chess(
    'nqrknbbr/pp1pppp1/7p/2p5/7P/1P1N4/P1PPPPPB/NQRK1B1R w HChc - 2 9',
  )
  expect(chess.perft(3)).toBe(23137)
})
test('perft - 960 - position 223', () => {
  const chess = new Chess(
    '1qrknrbb/B1p1pppp/8/1p1p4/2n2P2/1P6/P1PPP1PP/NQRKNR1B w FCfc - 0 9',
  )
  expect(chess.perft(3)).toBe(20237)
})
test('perft - 960 - position 224', () => {
  const chess = new Chess(
    'bbnrqk1r/1ppppppp/8/7n/1p6/P6P/1BPPPPP1/1BNRQKNR w HDhd - 0 9',
  )
  expect(chess.perft(3)).toBe(15471)
})
test('perft - 960 - position 225', () => {
  const chess = new Chess(
    'bnrbqknr/ppp3p1/3ppp1Q/7p/3P4/1P6/P1P1PPPP/BNRB1KNR w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(26876)
})
test('perft - 960 - position 226', () => {
  const chess = new Chess(
    'bn1qkb1r/pprppppp/8/2p5/2PPP1n1/8/PPR2PPP/BN1QKBNR w Hh - 1 9',
  )
  expect(chess.perft(3)).toBe(27829)
})
test('perft - 960 - position 227', () => {
  const chess = new Chess(
    '1nrqknrb/p1pp1ppp/1p2p3/3N4/5P1P/5b2/PPPPP3/B1RQKNRB w GCgc - 2 9',
  )
  expect(chess.perft(3)).toBe(27685)
})
test('perft - 960 - position 228', () => {
  const chess = new Chess(
    'nbbrqrk1/pppppppp/8/2N1n3/P7/6P1/1PPPPP1P/1BBRQKNR w HD - 3 9',
  )
  expect(chess.perft(3)).toBe(14339)
})
test('perft - 960 - position 229', () => {
  const chess = new Chess(
    '1rbbqknr/1ppp1pp1/1n2p3/p6p/4P1P1/P6N/1PPP1P1P/NRBBQK1R w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(18652)
})
test('perft - 960 - position 230', () => {
  const chess = new Chess(
    'nrq1kbnr/p1pbpppp/3p4/1p6/6P1/1N3N2/PPPPPP1P/1RBQKB1R w HBhb - 4 9',
  )
  expect(chess.perft(3)).toBe(16640)
})
test('perft - 960 - position 231', () => {
  const chess = new Chess(
    'nr1qknr1/p1pppp1p/b5p1/1p6/8/P4PP1/1bPPP1RP/NRBQKN1B w Bgb - 0 9',
  )
  expect(chess.perft(3)).toBe(11215)
})
test('perft - 960 - position 232', () => {
  const chess = new Chess(
    'nbrqbknr/1ppp2pp/8/4pp2/p2PP1P1/7N/PPP2P1P/NBRQBK1R w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(24416)
})
test('perft - 960 - position 233', () => {
  const chess = new Chess(
    'nr1b1k1r/ppp1pppp/2bp1n2/6P1/2P3q1/5P2/PP1PP2P/NRQBBKNR w HBhb - 1 9',
  )
  expect(chess.perft(3)).toBe(30908)
})
test('perft - 960 - position 234', () => {
  const chess = new Chess(
    'nrqkbbnr/2pppp1p/p7/1p6/2P1Pp2/8/PPNP2PP/1RQKBBNR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(17874)
})
test('perft - 960 - position 235', () => {
  const chess = new Chess(
    '1rqkbnrb/pp1ppp1p/1n4p1/B1p5/3PP3/4N3/PPP2PPP/NRQK2RB w GBgb - 0 9',
  )
  expect(chess.perft(3)).toBe(23991)
})
test('perft - 960 - position 236', () => {
  const chess = new Chess(
    'nbrqkn1r/1pppp2p/5pp1/p2b4/5P2/P2PN3/1PP1P1PP/NBRQK1BR w HChc - 2 9',
  )
  expect(chess.perft(3)).toBe(15482)
})
test('perft - 960 - position 237', () => {
  const chess = new Chess(
    'nrqbknbr/pp1pppp1/8/2p4p/P3PP2/8/1PPP2PP/NRQBKNBR w HBhb - 1 9',
  )
  expect(chess.perft(3)).toBe(19371)
})
test('perft - 960 - position 238', () => {
  const chess = new Chess(
    'nrqknbbr/p2pppp1/1pp5/6Qp/3P4/1P3P2/P1P1P1PP/NR1KNBBR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(32932)
})
test('perft - 960 - position 239', () => {
  const chess = new Chess(
    'nrqknrbb/1p3ppp/p2p4/2p1p3/1P6/3PP1P1/P1P2P1P/NRQKNRBB w FBfb - 0 9',
  )
  expect(chess.perft(3)).toBe(22643)
})
test('perft - 960 - position 240', () => {
  const chess = new Chess(
    '1bnrkqnr/p1pppp2/7p/1p4p1/4b3/7N/PPPP1PPP/BBNRKQ1R w HDhd - 0 9',
  )
  expect(chess.perft(3)).toBe(19808)
})
test('perft - 960 - position 241', () => {
  const chess = new Chess(
    'bnrbkq1r/pp2p1pp/5n2/2pp1p2/P7/N1PP4/1P2PPPP/B1RBKQNR w HChc - 1 9',
  )
  expect(chess.perft(3)).toBe(18494)
})
test('perft - 960 - position 242', () => {
  const chess = new Chess(
    '2rkqbnr/p1pppppp/2b5/1pn5/1P3P1Q/2B5/P1PPP1PP/1NRK1BNR w HChc - 3 9',
  )
  expect(chess.perft(3)).toBe(30111)
})
test('perft - 960 - position 243', () => {
  const chess = new Chess(
    'bnrkqnrb/2pppp2/8/pp4pp/1P5P/6P1/P1PPPPB1/BNRKQNR1 w GCgc - 0 9',
  )
  expect(chess.perft(3)).toBe(34090)
})
test('perft - 960 - position 244', () => {
  const chess = new Chess(
    '1bbrkq1r/pppp2pp/1n2pp1n/8/2PP4/1N4P1/PP2PP1P/1BBRKQNR w HDhd - 1 9',
  )
  expect(chess.perft(3)).toBe(28907)
})
test('perft - 960 - position 245', () => {
  const chess = new Chess(
    'nrbbkqnr/1p2pp1p/p1p3p1/3p4/8/1PP5/P2PPPPP/NRBBKQNR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(13212)
})
test('perft - 960 - position 246', () => {
  const chess = new Chess(
    '1rbkqbr1/ppp1pppp/1n5n/3p4/3P4/1PP3P1/P3PP1P/NRBKQBNR w HBb - 1 9',
  )
  expect(chess.perft(3)).toBe(20686)
})
test('perft - 960 - position 247', () => {
  const chess = new Chess(
    'nrbkq1rb/1ppp1pp1/4p1n1/p6p/2PP4/5P2/PPK1P1PP/NRB1QNRB w gb - 0 9',
  )
  expect(chess.perft(3)).toBe(23678)
})
test('perft - 960 - position 248', () => {
  const chess = new Chess(
    'nbrkbqnr/p2pp1p1/5p2/1pp4p/7P/3P2P1/PPP1PP2/NBKRBQNR w hc - 0 9',
  )
  expect(chess.perft(3)).toBe(17223)
})
test('perft - 960 - position 249', () => {
  const chess = new Chess(
    'nrkb1qnr/ppppp1p1/6bp/5p2/1PP1P1P1/8/P2P1P1P/NRKBBQNR w HBhb - 1 9',
  )
  expect(chess.perft(3)).toBe(24586)
})
test('perft - 960 - position 250', () => {
  const chess = new Chess(
    'nrk1bbnr/p1q1pppp/1ppp4/8/3P3P/4K3/PPP1PPP1/NR1QBBNR w hb - 0 9',
  )
  expect(chess.perft(3)).toBe(21683)
})
test('perft - 960 - position 251', () => {
  const chess = new Chess(
    'nrkqbr1b/1pppp1pp/5pn1/p6N/1P3P2/8/P1PPP1PP/NRKQB1RB w GBb - 0 9',
  )
  expect(chess.perft(3)).toBe(13815)
})
test('perft - 960 - position 252', () => {
  const chess = new Chess(
    'nbrkq2r/pppp1bpp/4p1n1/5p2/7P/2P3N1/PP1PPPP1/NBKRQ1BR w hc - 0 9',
  )
  expect(chess.perft(3)).toBe(19536)
})
test('perft - 960 - position 253', () => {
  const chess = new Chess(
    'nrkbqnbr/2ppp2p/pp6/5pp1/P1P5/8/1P1PPPPP/NRKBQNBR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(11341)
})
test('perft - 960 - position 254', () => {
  const chess = new Chess(
    'nr1qnbbr/pk1pppp1/1pp4p/8/3P4/5P1P/PPP1P1P1/NRKQNBBR w HB - 0 9',
  )
  expect(chess.perft(3)).toBe(13615)
})
test('perft - 960 - position 255', () => {
  const chess = new Chess(
    'nrkq1rbb/pp1ppp1p/2pn4/8/PP3Pp1/7P/2PPP1P1/NRKQNRBB w FBfb - 0 9',
  )
  expect(chess.perft(3)).toBe(22075)
})
test('perft - 960 - position 256', () => {
  const chess = new Chess(
    'b2rknqr/pp1ppppp/8/2P5/n7/P7/1PPNPPPb/BBNRK1QR w HDhd - 2 9',
  )
  expect(chess.perft(3)).toBe(19523)
})
test('perft - 960 - position 257', () => {
  const chess = new Chess(
    'bnrbknqr/pp2p2p/2p3p1/3p1p2/8/3P4/PPPNPPPP/B1RBKNQR w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(14320)
})
test('perft - 960 - position 258', () => {
  const chess = new Chess(
    'bnrknb1r/pppp2pp/8/4pp2/6P1/3P3P/qPP1PPQ1/BNRKNB1R w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(31813)
})
test('perft - 960 - position 259', () => {
  const chess = new Chess(
    'b1rknqrb/ppp1p1p1/2np1p1p/8/4N3/6PQ/PPPPPP1P/B1RKN1RB w GCgc - 0 9',
  )
  expect(chess.perft(3)).toBe(23082)
})
test('perft - 960 - position 260', () => {
  const chess = new Chess(
    'nb1rknqr/pbppp2p/6p1/1p3p2/5P2/3KP3/PPPP2PP/NBBR1NQR w hd - 2 9',
  )
  expect(chess.perft(3)).toBe(9779)
})
test('perft - 960 - position 261', () => {
  const chess = new Chess(
    'nr1bknqr/1ppb1ppp/p7/3pp3/B7/2P3NP/PP1PPPP1/NRB1K1QR w HBhb - 2 9',
  )
  expect(chess.perft(3)).toBe(19541)
})
test('perft - 960 - position 262', () => {
  const chess = new Chess(
    'nrbkn2r/pppp1pqp/4p1p1/8/3P2P1/P3B3/P1P1PP1P/NR1KNBQR w HBhb - 1 9',
  )
  expect(chess.perft(3)).toBe(25578)
})
test('perft - 960 - position 263', () => {
  const chess = new Chess(
    'nrbknqrb/2p1ppp1/1p6/p2p2Bp/1P6/3P1P2/P1P1P1PP/NR1KNQRB w GBgb - 0 9',
  )
  expect(chess.perft(3)).toBe(18288)
})
test('perft - 960 - position 264', () => {
  const chess = new Chess(
    'nbr1knqr/1pp1p1pp/3p1pb1/8/7P/5P2/PPPPPQP1/NBRKBN1R w HC - 2 9',
  )
  expect(chess.perft(3)).toBe(25767)
})
test('perft - 960 - position 265', () => {
  const chess = new Chess(
    'n1kbbnqr/prp2ppp/1p1p4/4p3/1P2P3/3P1B2/P1P2PPP/NRK1BNQR w HBh - 2 9',
  )
  expect(chess.perft(3)).toBe(17020)
})
test('perft - 960 - position 266', () => {
  const chess = new Chess(
    'nrknbbqr/pp3p1p/B3p1p1/2pp4/4P3/2N3P1/PPPP1P1P/NRK1B1QR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(19755)
})
test('perft - 960 - position 267', () => {
  const chess = new Chess(
    'n1knbqrb/pr1p1ppp/Qp6/2p1p3/4P3/6P1/PPPP1P1P/NRKNB1RB w GBg - 2 9',
  )
  expect(chess.perft(3)).toBe(17197)
})
test('perft - 960 - position 268', () => {
  const chess = new Chess(
    'nbrknqbr/p3p1pp/1p1p1p2/2p5/2Q1PP2/8/PPPP2PP/NBRKN1BR w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(32470)
})
test('perft - 960 - position 269', () => {
  const chess = new Chess(
    'nrkb1qbr/pp1pppp1/5n2/7p/2p5/1N1NPP2/PPPP2PP/1RKB1QBR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(18813)
})
test('perft - 960 - position 270', () => {
  const chess = new Chess(
    'nrk2bbr/pppqpppp/3p4/8/1P3nP1/3P4/P1P1PP1P/NRKNQBBR w HBhb - 1 9',
  )
  expect(chess.perft(3)).toBe(19954)
})
test('perft - 960 - position 271', () => {
  const chess = new Chess(
    'nrknqrbb/1p2ppp1/2pp4/Q6p/P2P3P/8/1PP1PPP1/NRKN1RBB w FBfb - 0 9',
  )
  expect(chess.perft(3)).toBe(16111)
})
test('perft - 960 - position 272', () => {
  const chess = new Chess(
    'bbnrk1rq/pp2p1pp/2ppn3/5p2/8/3NNP1P/PPPPP1P1/BB1RK1RQ w GDgd - 1 9',
  )
  expect(chess.perft(3)).toBe(20141)
})
test('perft - 960 - position 273', () => {
  const chess = new Chess(
    'bnrbknrq/ppppp2p/6p1/5p2/4QPP1/8/PPPPP2P/BNRBKNR1 w GCgc - 0 9',
  )
  expect(chess.perft(3)).toBe(32612)
})
test('perft - 960 - position 274', () => {
  const chess = new Chess(
    'bnkrnbrq/ppppp1p1/B6p/5p2/8/4P3/PPPP1PPP/BNKRN1RQ w - - 0 9',
  )
  expect(chess.perft(3)).toBe(11124)
})
test('perft - 960 - position 275', () => {
  const chess = new Chess(
    'bnrk1rqb/2pppp1p/3n4/pp4p1/3Q1P2/2N3P1/PPPPP2P/B1RKNR1B w FCfc - 0 9',
  )
  expect(chess.perft(3)).toBe(74590)
})
test('perft - 960 - position 276', () => {
  const chess = new Chess(
    'nbbrk1rq/pp2pppp/2pp4/8/2P2n2/6N1/PP1PP1PP/NBBRKR1Q w Dgd - 0 9',
  )
  expect(chess.perft(3)).toBe(26841)
})
test('perft - 960 - position 277', () => {
  const chess = new Chess(
    'nrbb2rq/pppk1ppp/4p1n1/3p4/6P1/1BP5/PP1PPPQP/NRB1KNR1 w GB - 0 9',
  )
  expect(chess.perft(3)).toBe(22048)
})
test('perft - 960 - position 278', () => {
  const chess = new Chess(
    'nrbk1brq/p1ppppp1/7p/1p6/4P1nP/P7/1PPP1PP1/NRBKNBRQ w GBgb - 0 9',
  )
  expect(chess.perft(3)).toBe(12739)
})
test('perft - 960 - position 279', () => {
  const chess = new Chess(
    'nrbk1rqb/1pp2ppp/5n2/p2pp3/5B2/1N1P2P1/PPP1PP1P/1R1KNRQB w FBfb - 0 9',
  )
  expect(chess.perft(3)).toBe(31559)
})
test('perft - 960 - position 280', () => {
  const chess = new Chess(
    'nbrkb1rq/p1pp1ppp/4n3/4p3/Pp6/6N1/1PPPPPPP/NBRKBRQ1 w Cgc - 0 9',
  )
  expect(chess.perft(3)).toBe(10271)
})
test('perft - 960 - position 281', () => {
  const chess = new Chess(
    'nrkb1nrq/p2pp1pp/1pp2p2/7b/6PP/5P2/PPPPP2N/NRKBB1RQ w GBgb - 0 9',
  )
  expect(chess.perft(3)).toBe(11152)
})
test('perft - 960 - position 282', () => {
  const chess = new Chess(
    'nr1nbbr1/pppkpp1p/6p1/3p4/P6P/1P6/1RPPPPP1/N1KNBBRQ w G - 1 9',
  )
  expect(chess.perft(3)).toBe(11304)
})
test('perft - 960 - position 283', () => {
  const chess = new Chess(
    'nrknbrqb/3p1ppp/ppN1p3/8/6P1/8/PPPPPP1P/1RKNBRQB w FBfb - 0 9',
  )
  expect(chess.perft(3)).toBe(17267)
})
test('perft - 960 - position 284', () => {
  const chess = new Chess(
    'nbrkn1bq/p1pppr1p/1p6/5pp1/8/1N2PP2/PPPP2PP/1BKRNRBQ w c - 1 9',
  )
  expect(chess.perft(3)).toBe(10090)
})
test('perft - 960 - position 285', () => {
  const chess = new Chess(
    'nrkbnrbq/ppppppp1/8/8/7p/PP3P2/2PPPRPP/NRKBN1BQ w Bfb - 0 9',
  )
  expect(chess.perft(3)).toBe(6189)
})
test('perft - 960 - position 286', () => {
  const chess = new Chess(
    'nrknrbbq/p4ppp/2p1p3/1p1p4/1P2P3/2P5/P1NP1PPP/1RKNRBBQ w EBeb - 0 9',
  )
  expect(chess.perft(3)).toBe(21915)
})
test('perft - 960 - position 287', () => {
  const chess = new Chess(
    'nrknr1bb/pppp1p2/7p/2qPp1p1/8/1P5P/P1P1PPP1/NRKNRQBB w EBeb - 0 9',
  )
  expect(chess.perft(3)).toBe(14336)
})
test('perft - 960 - position 288', () => {
  const chess = new Chess(
    'bbqnrrkn/ppp2p1p/3pp1p1/8/1PP5/2Q5/P1BPPPPP/B2NRKRN w GE - 0 9',
  )
  expect(chess.perft(3)).toBe(23446)
})
test('perft - 960 - position 289', () => {
  const chess = new Chess(
    'bqn1rkrn/p1p2ppp/1p1p4/4p3/3PP2b/8/PPP2PPP/BQNBRKRN w GEge - 2 9',
  )
  expect(chess.perft(3)).toBe(20042)
})
test('perft - 960 - position 290', () => {
  const chess = new Chess(
    'bqnrkb1n/p1p1pprp/3p4/1p2P1p1/2PP4/8/PP3PPP/BQNRKBRN w GDd - 1 9',
  )
  expect(chess.perft(3)).toBe(28102)
})
test('perft - 960 - position 291', () => {
  const chess = new Chess(
    'bqr1krnb/ppppppp1/7p/3n4/1P4P1/P4N2/2PPPP1P/BQNRKR1B w FDf - 3 9',
  )
  expect(chess.perft(3)).toBe(22936)
})
test('perft - 960 - position 292', () => {
  const chess = new Chess(
    'qbbn1krn/pp3ppp/4r3/2ppp3/P1P4P/8/1P1PPPP1/QBBNRKRN w GEg - 1 9',
  )
  expect(chess.perft(3)).toBe(21100)
})
test('perft - 960 - position 293', () => {
  const chess = new Chess(
    'qnbbrkrn/1p1pp2p/p7/2p2pp1/8/4P2P/PPPP1PPK/QNBBRR1N w ge - 0 9',
  )
  expect(chess.perft(3)).toBe(15139)
})
test('perft - 960 - position 294', () => {
  const chess = new Chess(
    'qnbrkbrn/1ppp2p1/p3p2p/5p2/P4P2/1P6/2PPP1PP/QNBRKBRN w GDgd - 0 9',
  )
  expect(chess.perft(3)).toBe(16735)
})
test('perft - 960 - position 295', () => {
  const chess = new Chess(
    '1nbrkrnb/p1pppp1p/1pq3p1/8/4P3/P1P4N/1P1P1PPP/QNBRKR1B w FDfd - 1 9',
  )
  expect(chess.perft(3)).toBe(11789)
})
test('perft - 960 - position 296', () => {
  const chess = new Chess(
    'qb1r1krn/pppp2pp/1n2ppb1/4P3/7P/8/PPPP1PP1/QBNRBKRN w GDgd - 0 9',
  )
  expect(chess.perft(3)).toBe(12205)
})
test('perft - 960 - position 297', () => {
  const chess = new Chess(
    'qnr1bkrn/p3pppp/1bpp4/1p6/2P2PP1/8/PP1PPN1P/QNRBBKR1 w GCgc - 0 9',
  )
  expect(chess.perft(3)).toBe(26617)
})
test('perft - 960 - position 298', () => {
  const chess = new Chess(
    '1nkrbbrn/qppppppp/8/8/p2P4/1P5P/P1P1PPP1/QNKRBBRN w - - 0 9',
  )
  expect(chess.perft(3)).toBe(18371)
})
test('perft - 960 - position 299', () => {
  const chess = new Chess(
    '1qrkbrnb/ppp1p1pp/n2p4/5p2/4N3/8/PPPPPPPP/Q1RKBRNB w Ffc - 2 9',
  )
  expect(chess.perft(3)).toBe(18573)
})
test('perft - 960 - position 300', () => {
  const chess = new Chess(
    'q1nrkrbn/pp1pppp1/2p4p/8/P7/5Pb1/BPPPPNPP/Q1NRKRB1 w FDfd - 0 9',
  )
  expect(chess.perft(3)).toBe(12911)
})
test('perft - 960 - position 301', () => {
  const chess = new Chess(
    'qnrbkrbn/1p1p1pp1/p1p5/4p2p/8/3P1P2/PPP1P1PP/QNRBKRBN w FCfc - 0 9',
  )
  expect(chess.perft(3)).toBe(17713)
})
test('perft - 960 - position 302', () => {
  const chess = new Chess(
    'qnrkr1bn/p1pp1ppp/8/1p2p3/3P1P2/bP4P1/P1P1P2P/QNRKRBBN w ECec - 1 9',
  )
  expect(chess.perft(3)).toBe(20973)
})
test('perft - 960 - position 303', () => {
  const chess = new Chess(
    'q1krrnbb/p1p1pppp/2np4/1pB5/5P2/8/PPPPP1PP/QNRKRN1B w EC - 0 9',
  )
  expect(chess.perft(3)).toBe(21966)
})
test('perft - 960 - position 304', () => {
  const chess = new Chess(
    'bbn1rkrn/pp1p1ppp/8/2p1p1q1/6P1/P7/BPPPPP1P/B1NQRKRN w GEge - 0 9',
  )
  expect(chess.perft(3)).toBe(25177)
})
test('perft - 960 - position 305', () => {
  const chess = new Chess(
    'bn1brkrn/pp1qpp1p/2p3p1/3p4/1PPP4/P7/4PPPP/BNQBRKRN w GEge - 1 9',
  )
  expect(chess.perft(3)).toBe(22858)
})
test('perft - 960 - position 306', () => {
  const chess = new Chess(
    'b2rkbrn/p1pppppp/qp6/8/1n6/2B2P2/P1PPP1PP/1NQRKBRN w GDgd - 0 9',
  )
  expect(chess.perft(3)).toBe(21440)
})
test('perft - 960 - position 307', () => {
  const chess = new Chess(
    'b2rkrnb/pqp1pppp/n7/1p1p4/P7/N1P2N2/1P1PPPPP/B1QRKR1B w FDfd - 4 9',
  )
  expect(chess.perft(3)).toBe(19558)
})
test('perft - 960 - position 308', () => {
  const chess = new Chess(
    '1bbqrkrn/ppppp1p1/8/5p1p/P1n3P1/3P4/1PP1PP1P/NBBQRRKN w ge - 1 9',
  )
  expect(chess.perft(3)).toBe(17351)
})
test('perft - 960 - position 309', () => {
  const chess = new Chess(
    'nqb1rrkn/ppp1bppp/3pp3/8/3P4/1P6/PQP1PPPP/N1BBRRKN w - - 1 9',
  )
  expect(chess.perft(3)).toBe(12465)
})
test('perft - 960 - position 310', () => {
  const chess = new Chess(
    'nqbrkbr1/p1pppppp/1p6/2N2n2/2P5/5P2/PP1PP1PP/1QBRKBRN w GDgd - 1 9',
  )
  expect(chess.perft(3)).toBe(20289)
})
test('perft - 960 - position 311', () => {
  const chess = new Chess(
    'nqbrkrn1/1ppppp2/6pp/p7/1P6/2Q5/P1PPPPPP/N1BRKRNB w FDfd - 0 9',
  )
  expect(chess.perft(3)).toBe(20985)
})
test('perft - 960 - position 312', () => {
  const chess = new Chess(
    'nbqrbrkn/pp1p1pp1/2p5/4p2p/2P3P1/1P3P2/P2PP2P/NBQRBKRN w GD - 0 9',
  )
  expect(chess.perft(3)).toBe(22581)
})
test('perft - 960 - position 313', () => {
  const chess = new Chess(
    'nqrbbrkn/1p1pppp1/8/p1p4p/4P2P/1N4P1/PPPP1P2/1QRBBKRN w GC - 0 9',
  )
  expect(chess.perft(3)).toBe(14468)
})
test('perft - 960 - position 314', () => {
  const chess = new Chess(
    'nqrkbbrn/2p1p1pp/pp1p1p2/8/P2N4/2P5/1P1PPPPP/1QRKBBRN w GCgc - 0 9',
  )
  expect(chess.perft(3)).toBe(23310)
})
test('perft - 960 - position 315', () => {
  const chess = new Chess(
    'n1krbrnb/q1pppppp/p7/1p6/3Q4/2P2P2/PP1PP1PP/N1RKBRNB w FC - 1 9',
  )
  expect(chess.perft(3)).toBe(41327)
})
test('perft - 960 - position 316', () => {
  const chess = new Chess(
    'nb1rkrbn/p1pp1p1p/qp6/4p1p1/5PP1/P7/1PPPPB1P/NBQRKR1N w FDfd - 2 9',
  )
  expect(chess.perft(3)).toBe(16463)
})
test('perft - 960 - position 317', () => {
  const chess = new Chess(
    'nqr1krbn/pppp1ppp/8/8/3pP3/5P2/PPPb1NPP/NQRBKRB1 w FCfc - 3 9',
  )
  expect(chess.perft(3)).toBe(1047)
})
test('perft - 960 - position 318', () => {
  const chess = new Chess(
    'n1rkrbbn/pqppppp1/7p/1p6/8/1NPP4/PP1KPPPP/1QR1RBBN w ec - 0 9',
  )
  expect(chess.perft(3)).toBe(17553)
})
test('perft - 960 - position 319', () => {
  const chess = new Chess(
    '1qrkrnbb/1p1p1ppp/pnp1p3/8/3PP3/P6P/1PP2PP1/NQRKRNBB w ECec - 0 9',
  )
  expect(chess.perft(3)).toBe(17342)
})
test('perft - 960 - position 320', () => {
  const chess = new Chess(
    '1bnrqkrn/2ppppp1/p7/1p1b3p/3PP1P1/8/PPPQ1P1P/BBNR1KRN w GDgd - 1 9',
  )
  expect(chess.perft(3)).toBe(32238)
})
test('perft - 960 - position 321', () => {
  const chess = new Chess(
    'bnrbqkr1/ppp2pp1/6n1/3pp2p/1P6/2N3N1/P1PPPPPP/B1RBQRK1 w gc - 0 9',
  )
  expect(chess.perft(3)).toBe(17345)
})
test('perft - 960 - position 322', () => {
  const chess = new Chess(
    '1nrqkbrn/p1pppppp/8/1p1b4/P6P/5P2/1PPPP1P1/BNRQKBRN w GCgc - 1 9',
  )
  expect(chess.perft(3)).toBe(10619)
})
test('perft - 960 - position 323', () => {
  const chess = new Chess(
    'b1rqkrnb/ppppppp1/8/6p1/3n4/NP6/P1PPPP1P/B1RQKRNB w FCfc - 0 9',
  )
  expect(chess.perft(3)).toBe(15578)
})
test('perft - 960 - position 324', () => {
  const chess = new Chess(
    'nbbrqkrn/ppp3p1/3pp3/5p1p/1P2P3/P7/2PPQPPP/NBBR1KRN w GDgd - 0 9',
  )
  expect(chess.perft(3)).toBe(25719)
})
test('perft - 960 - position 325', () => {
  const chess = new Chess(
    'nr1bqrk1/ppp1pppp/6n1/3pP3/8/5PQb/PPPP2PP/NRBB1KRN w GB - 3 9',
  )
  expect(chess.perft(3)).toBe(20161)
})
test('perft - 960 - position 326', () => {
  const chess = new Chess(
    '1rbqkbr1/ppppp1pp/1n6/4np2/3P1P2/6P1/PPPQP2P/NRB1KBRN w GBgb - 1 9',
  )
  expect(chess.perft(3)).toBe(17897)
})
test('perft - 960 - position 327', () => {
  const chess = new Chess(
    'nr1qkr1b/ppp1pp1p/4bn2/3p2p1/4P3/1Q6/PPPP1PPP/NRB1KRNB w FBfb - 4 9',
  )
  expect(chess.perft(3)).toBe(30923)
})
test('perft - 960 - position 328', () => {
  const chess = new Chess(
    'nb1qbkrn/pprp1pp1/7p/2p1pB2/Q1PP4/8/PP2PPPP/N1R1BKRN w GCg - 2 9',
  )
  expect(chess.perft(3)).toBe(50723)
})
test('perft - 960 - position 329', () => {
  const chess = new Chess(
    'nrqb1rkn/pp2pppp/2bp4/2p5/6P1/2P3N1/PP1PPP1P/NRQBBRK1 w - - 3 9',
  )
  expect(chess.perft(3)).toBe(21148)
})
test('perft - 960 - position 330', () => {
  const chess = new Chess(
    'nrq1bbrn/ppkpp2p/2p3p1/P4p2/8/4P1N1/1PPP1PPP/NRQKBBR1 w GB - 0 9',
  )
  expect(chess.perft(3)).toBe(13533)
})
test('perft - 960 - position 331', () => {
  const chess = new Chess(
    'Br1kbrn1/pqpppp2/8/6pp/3b2P1/1N6/PPPPPP1P/1RQKBRN1 w FBfb - 3 9',
  )
  expect(chess.perft(3)).toBe(18175)
})
test('perft - 960 - position 332', () => {
  const chess = new Chess(
    'nbrqkrbn/2p1p1pp/p7/1p1p1p2/4P1P1/5P2/PPPP3P/NBRQKRBN w FCfc - 0 9',
  )
  expect(chess.perft(3)).toBe(22489)
})
test('perft - 960 - position 333', () => {
  const chess = new Chess(
    '1rqbkrbn/1ppppp1p/1n6/p1N3p1/8/2P4P/PP1PPPP1/1RQBKRBN w FBfb - 0 9',
  )
  expect(chess.perft(3)).toBe(14569)
})
test('perft - 960 - position 334', () => {
  const chess = new Chess(
    '1rqkrbbn/ppnpp1pp/8/2p5/6p1/3P4/PPP1PPPP/NRK1RBBN w eb - 0 9',
  )
  expect(chess.perft(3)).toBe(10812)
})
test('perft - 960 - position 335', () => {
  const chess = new Chess(
    'nrqkrnbb/p1pp2pp/5p2/4P3/2p5/4N3/PP1PP1PP/NRQKR1BB w EBeb - 0 9',
  )
  expect(chess.perft(3)).toBe(23256)
})
test('perft - 960 - position 336', () => {
  const chess = new Chess(
    'bbnrkqrn/pp3pp1/4p2p/2pp4/4P1P1/1PB5/P1PP1P1P/1BNRKQRN w GDgd - 0 9',
  )
  expect(chess.perft(3)).toBe(30536)
})
test('perft - 960 - position 337', () => {
  const chess = new Chess(
    'bnrbkqr1/1p2pppp/6n1/p1pp4/7P/P3P3/1PPPKPP1/BNRB1QRN w gc - 0 9',
  )
  expect(chess.perft(3)).toBe(9332)
})
test('perft - 960 - position 338', () => {
  const chess = new Chess(
    'b1rkqbrn/pp1p2pp/2n1p3/2p2p2/3P2PP/8/PPP1PP2/BNKRQBRN w gc - 0 9',
  )
  expect(chess.perft(3)).toBe(30831)
})
test('perft - 960 - position 339', () => {
  const chess = new Chess(
    'b1rkqrnb/2ppppp1/np6/p6p/1P6/P2P3P/2P1PPP1/BNRKQRNB w FCfc - 0 9',
  )
  expect(chess.perft(3)).toBe(18732)
})
test('perft - 960 - position 340', () => {
  const chess = new Chess(
    'nbbrkqrn/1ppp1p2/p6p/4p1p1/5P2/1P5P/P1PPPNP1/NBBRKQR1 w GDgd - 0 9',
  )
  expect(chess.perft(3)).toBe(13222)
})
test('perft - 960 - position 341', () => {
  const chess = new Chess(
    'nrbbkqrn/p1pppppp/8/1p6/4P3/7Q/PPPP1PPP/NRBBK1RN w GBgb - 0 9',
  )
  expect(chess.perft(3)).toBe(28418)
})
test('perft - 960 - position 342', () => {
  const chess = new Chess(
    'nrbkqbrn/1pppp2p/8/p4pp1/P4PQ1/8/1PPPP1PP/NRBK1BRN w GBgb - 0 9',
  )
  expect(chess.perft(3)).toBe(13067)
})
test('perft - 960 - position 343', () => {
  const chess = new Chess(
    'nr1kqr1b/pp2pppp/5n2/2pp4/P5b1/5P2/1PPPPRPP/NRBK1QNB w Bfb - 2 9',
  )
  expect(chess.perft(3)).toBe(12386)
})
test('perft - 960 - position 344', () => {
  const chess = new Chess(
    'nbkrbqrn/1pppppp1/8/4P2p/pP6/P7/2PP1PPP/NBRKBQRN w GC - 0 9',
  )
  expect(chess.perft(3)).toBe(8475)
})
test('perft - 960 - position 345', () => {
  const chess = new Chess(
    'nrkb1qrn/pp1pp1pp/8/5p1b/P1p4P/6N1/1PPPPPP1/NRKBBQR1 w GBgb - 2 9',
  )
  expect(chess.perft(3)).toBe(9037)
})
test('perft - 960 - position 346', () => {
  const chess = new Chess(
    '1rkq1brn/ppppp1pp/1n6/3b1p2/3N3P/5P2/PPPPP1P1/1RKQBBRN w GBgb - 3 9',
  )
  expect(chess.perft(3)).toBe(15324)
})
test('perft - 960 - position 347', () => {
  const chess = new Chess(
    'nrk1brnb/pp1ppppp/2p5/3q4/5P2/PP6/1KPPP1PP/NR1QBRNB w fb - 1 9',
  )
  expect(chess.perft(3)).toBe(21765)
})
test('perft - 960 - position 348', () => {
  const chess = new Chess(
    'nbrkqr1n/1pppp2p/p4pp1/2Bb4/5P2/6P1/PPPPP2P/NBRKQ1RN w Cfc - 2 9',
  )
  expect(chess.perft(3)).toBe(24775)
})
test('perft - 960 - position 349', () => {
  const chess = new Chess(
    'n1kbqrbn/2p1pppp/1r6/pp1p4/P7/3P4/1PP1PPPP/NRKBQRBN w FBf - 2 9',
  )
  expect(chess.perft(3)).toBe(14101)
})
test('perft - 960 - position 350', () => {
  const chess = new Chess(
    'nrkqrbb1/ppp1pppp/3p4/8/4P3/2Pn1P2/PP4PP/NRKQRBBN w EBeb - 0 9',
  )
  expect(chess.perft(3)).toBe(3090)
})
test('perft - 960 - position 351', () => {
  const chess = new Chess(
    'nrkqrnbb/ppppp1p1/7p/1P3p2/3P4/2P5/P3PPPP/NRKQRNBB w EBeb - 0 9',
  )
  expect(chess.perft(3)).toBe(21091)
})
test('perft - 960 - position 352', () => {
  const chess = new Chess(
    'bbnr1rqn/pp2pkpp/2pp1p2/8/4P1P1/8/PPPP1P1P/BBNRKRQN w FD - 0 9',
  )
  expect(chess.perft(3)).toBe(11135)
})
test('perft - 960 - position 353', () => {
  const chess = new Chess(
    'bnrbk1qn/1pppprpp/8/p4p1P/6P1/3P4/PPP1PP2/BNRBKRQN w FCc - 0 9',
  )
  expect(chess.perft(3)).toBe(11447)
})
test('perft - 960 - position 354', () => {
  const chess = new Chess(
    '1nrkrbqn/p1pp1ppp/4p3/1p6/1PP5/6PB/P2PPPbP/BNRKR1QN w ECec - 0 9',
  )
  expect(chess.perft(3)).toBe(29012)
})
test('perft - 960 - position 355', () => {
  const chess = new Chess(
    'b1rkr1nb/pppppqp1/n4B2/7p/8/1P4P1/P1PPPP1P/1NKRRQNB w ec - 1 9',
  )
  expect(chess.perft(3)).toBe(31790)
})
test('perft - 960 - position 356', () => {
  const chess = new Chess(
    'nbbrkrqn/p1ppp1p1/8/1p3p1p/2P3PP/8/PP1PPPQ1/NBBRKR1N w FDfd - 0 9',
  )
  expect(chess.perft(3)).toBe(31848)
})
test('perft - 960 - position 357', () => {
  const chess = new Chess(
    '1rbbkrqn/ppp1pp2/1n1p2p1/7p/P3P1P1/3P4/1PP2P1P/NRBBKRQN w FBfb - 0 9',
  )
  expect(chess.perft(3)).toBe(18083)
})
test('perft - 960 - position 358', () => {
  const chess = new Chess(
    'nrbkrbq1/Qpppp1pp/2n5/5p2/P4P2/6N1/1PPPP1PP/NRBKRB2 w EBeb - 1 9',
  )
  expect(chess.perft(3)).toBe(16713)
})
test('perft - 960 - position 359', () => {
  const chess = new Chess(
    '1rbkr1nb/pppp1qpp/1n6/4pp2/1PP1P3/8/PB1P1PPP/NR1KRQNB w EBeb - 1 9',
  )
  expect(chess.perft(3)).toBe(32970)
})
test('perft - 960 - position 360', () => {
  const chess = new Chess(
    'nbrk1rqn/p1ppp2p/1p6/5ppb/8/1N2P2P/PPPP1PP1/1BKRBRQN w fc - 0 9',
  )
  expect(chess.perft(3)).toBe(12350)
})
test('perft - 960 - position 361', () => {
  const chess = new Chess(
    'nrkbbrqn/3pppp1/7p/ppp5/P7/1N5P/1PPPPPP1/1RKBBRQN w FBfb - 0 9',
  )
  expect(chess.perft(3)).toBe(9026)
})
test('perft - 960 - position 362', () => {
  const chess = new Chess(
    'nrkr1bqn/ppp1pppp/3p4/1b6/7P/P7/1PPPPPP1/NRKRBBQN w DBdb - 1 9',
  )
  expect(chess.perft(3)).toBe(9083)
})
test('perft - 960 - position 363', () => {
  const chess = new Chess(
    'nrkrbqnb/p4ppp/1p2p3/2pp4/6P1/2P2N2/PPNPPP1P/1RKRBQ1B w DBdb - 0 9',
  )
  expect(chess.perft(3)).toBe(21012)
})
test('perft - 960 - position 364', () => {
  const chess = new Chess(
    'nbkrr1bn/ppB2ppp/4p3/2qp4/4P3/5P2/PPPP2PP/NBRKRQ1N w EC - 1 9',
  )
  expect(chess.perft(3)).toBe(51939)
})
test('perft - 960 - position 365', () => {
  const chess = new Chess(
    'n1kbrqbn/p1pp1pp1/4p2p/2B5/1r3P2/8/PPPPP1PP/NRKBRQ1N w EBe - 2 9',
  )
  expect(chess.perft(3)).toBe(30874)
})
test('perft - 960 - position 366', () => {
  const chess = new Chess(
    'nrkrqbbn/2pppp1p/8/pp6/1P1P2p1/P5P1/2P1PP1P/NRKRQBBN w DBdb - 0 9',
  )
  expect(chess.perft(3)).toBe(10034)
})
test('perft - 960 - position 367', () => {
  const chess = new Chess(
    'nrkr1nbb/1ppp2pp/p3q3/4pp2/2P5/P3P3/1PKP1PPP/NR1RQNBB w db - 0 9',
  )
  expect(chess.perft(3)).toBe(13953)
})
test('perft - 960 - position 368', () => {
  const chess = new Chess(
    'bbnrkrnq/1pp1p2p/6p1/p2p1p2/8/1P2P3/P1PP1PPP/BBNRKRNQ w FDfd - 0 9',
  )
  expect(chess.perft(3)).toBe(21915)
})
test('perft - 960 - position 369', () => {
  const chess = new Chess(
    'bnrbkrn1/pp1ppp2/2p3pp/8/2Pq4/P4PP1/1P1PP2P/BNRBKRNQ w FCfc - 1 9',
  )
  expect(chess.perft(3)).toBe(16593)
})
test('perft - 960 - position 370', () => {
  const chess = new Chess(
    'b1rkrbnq/1pp1pppp/2np4/p5N1/8/1P2P3/P1PP1PPP/BNRKRB1Q w ECec - 0 9',
  )
  expect(chess.perft(3)).toBe(27073)
})
test('perft - 960 - position 371', () => {
  const chess = new Chess(
    'b1krrnqb/pp1ppp1p/n1p3p1/2N5/6P1/8/PPPPPP1P/B1RKRNQB w EC - 0 9',
  )
  expect(chess.perft(3)).toBe(28494)
})
test('perft - 960 - position 372', () => {
  const chess = new Chess(
    '1bbr1rnq/ppppkppp/8/3np3/4P3/3P4/PPP1KPPP/NBBRR1NQ w - - 1 9',
  )
  expect(chess.perft(3)).toBe(18290)
})
test('perft - 960 - position 373', () => {
  const chess = new Chess(
    'nrbbk1nq/p1p1prpp/1p6/N2p1p2/P7/8/1PPPPPPP/R1BBKRNQ w Fb - 2 9',
  )
  expect(chess.perft(3)).toBe(13710)
})
test('perft - 960 - position 374', () => {
  const chess = new Chess(
    '1rbkrb1q/1pppp1pp/1n5n/p4p2/P3P3/1P6/2PPNPPP/NRBKRB1Q w EBeb - 1 9',
  )
  expect(chess.perft(3)).toBe(10198)
})
test('perft - 960 - position 375', () => {
  const chess = new Chess(
    'nrbkr1qb/1pp1pppp/6n1/p2p4/2P1P3/1N4N1/PP1P1PPP/1RBKR1QB w EBeb - 0 9',
  )
  expect(chess.perft(3)).toBe(19126)
})
test('perft - 960 - position 376', () => {
  const chess = new Chess(
    'nbrkbrnq/p3p1pp/1pp2p2/3p4/1PP5/4P3/P1KP1PPP/NBR1BRNQ w fc - 0 9',
  )
  expect(chess.perft(3)).toBe(18009)
})
test('perft - 960 - position 377', () => {
  const chess = new Chess(
    'nrk1brnq/pp1p1pp1/7p/b1p1p3/1P6/6P1/P1PPPPQP/NRKBBRN1 w FBfb - 2 9',
  )
  expect(chess.perft(3)).toBe(20352)
})
test('perft - 960 - position 378', () => {
  const chess = new Chess(
    'nrkr1bnq/1p2pppp/p2p4/1bp5/PP6/1R5N/2PPPPPP/N1KRBB1Q w Ddb - 2 9',
  )
  expect(chess.perft(3)).toBe(20494)
})
test('perft - 960 - position 379', () => {
  const chess = new Chess(
    'nrk1b1qb/pppn1ppp/3rp3/3p4/2P3P1/3P4/PPN1PP1P/1RKRBNQB w DBb - 3 9',
  )
  expect(chess.perft(3)).toBe(33203)
})
test('perft - 960 - position 380', () => {
  const chess = new Chess(
    'nb1rrnbq/ppkp1ppp/8/2p1p3/P7/1N2P3/1PPP1PPP/1BKRRNBQ w - - 1 9',
  )
  expect(chess.perft(3)).toBe(9655)
})
test('perft - 960 - position 381', () => {
  const chess = new Chess(
    'nrkbrnbq/4pppp/1ppp4/p7/2P1P3/3P2N1/PP3PPP/NRKBR1BQ w EBeb - 0 9',
  )
  expect(chess.perft(3)).toBe(17132)
})
test('perft - 960 - position 382', () => {
  const chess = new Chess(
    'nrkrnbbq/3p1ppp/1p6/p1p1p3/3P2P1/P4Q2/1PP1PP1P/NRKRNBB1 w DBdb - 0 9',
  )
  expect(chess.perft(3)).toBe(28597)
})
test('perft - 960 - position 383', () => {
  const chess = new Chess(
    'nr1rnqbb/ppp1pp1p/3k2p1/3p4/1P5P/3P1N2/P1P1PPP1/NRKR1QBB w DB - 1 9',
  )
  expect(chess.perft(3)).toBe(18547)
})
test('perft - 960 - position 384', () => {
  const chess = new Chess(
    'bbqrnnkr/1ppp1p1p/5p2/p5p1/P7/1P4P1/2PPPP1P/1BQRNNKR w HDhd - 0 9',
  )
  expect(chess.perft(3)).toBe(7224)
})
test('perft - 960 - position 385', () => {
  const chess = new Chess(
    'bqrb2k1/pppppppr/5nnp/8/3P1P2/4P1N1/PPP3PP/BQRBN1KR w HCc - 1 9',
  )
  expect(chess.perft(3)).toBe(15872)
})
test('perft - 960 - position 386', () => {
  const chess = new Chess(
    'bqrnn1kr/1pppbppp/8/4p3/1p6/2P1N2P/P2PPPP1/BQR1NBKR w HChc - 1 9',
  )
  expect(chess.perft(3)).toBe(31695)
})
test('perft - 960 - position 387', () => {
  const chess = new Chess(
    'bqr1nkr1/pppppp2/2n3p1/7p/1P1b1P2/8/PQP1P1PP/B1RNNKRB w GCgc - 0 9',
  )
  expect(chess.perft(3)).toBe(21539)
})
test('perft - 960 - position 388', () => {
  const chess = new Chess(
    'qbbrnn1r/1pppp1pk/p7/5p1p/P2P3P/3N4/1PP1PPP1/QBBR1NKR w HD - 0 9',
  )
  expect(chess.perft(3)).toBe(24475)
})
test('perft - 960 - position 389', () => {
  const chess = new Chess(
    'qrbb2kr/p1pppppp/1p1n4/8/1P3n2/P7/Q1PPP1PP/1RBBNNKR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(26955)
})
test('perft - 960 - position 390', () => {
  const chess = new Chess(
    'qrb2bkr/1pp1pppp/2np1n2/pN6/3P4/4B3/PPP1PPPP/QR2NBKR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(20534)
})
test('perft - 960 - position 391', () => {
  const chess = new Chess(
    'qrbnnkrb/pp2pp1p/8/2pp2p1/7P/P1P5/QP1PPPP1/1RBNNKRB w GBgb - 0 9',
  )
  expect(chess.perft(3)).toBe(21142)
})
test('perft - 960 - position 392', () => {
  const chess = new Chess(
    '1brnb1kr/p1pppppp/1p6/8/4q2n/1P2P1P1/PNPP1P1P/QBR1BNKR w HChc - 3 9',
  )
  expect(chess.perft(3)).toBe(13462)
})
test('perft - 960 - position 393', () => {
  const chess = new Chess(
    '1rnbbnkr/1pp1pppp/1q1p4/p7/4P3/5PN1/PPPP1BPP/QRNB2KR w HBhb - 1 9',
  )
  expect(chess.perft(3)).toBe(21764)
})
test('perft - 960 - position 394', () => {
  const chess = new Chess(
    'qrnnbb1Q/ppp1pk1p/3p2p1/5p2/PP6/5P2/2PPP1PP/1RNNBBKR w HB - 0 9',
  )
  expect(chess.perft(3)).toBe(27902)
})
test('perft - 960 - position 395', () => {
  const chess = new Chess(
    'qrnnbkrb/p3p1pp/3p1p2/1pp5/PP2P3/8/2PP1PPP/QRNNBRKB w gb - 0 9',
  )
  expect(chess.perft(3)).toBe(27955)
})
test('perft - 960 - position 396', () => {
  const chess = new Chess(
    'qbrnnkbr/1p2pp1p/p1p3p1/3p4/6P1/P1N4P/1PPPPP2/QBR1NKBR w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(18930)
})
test('perft - 960 - position 397', () => {
  const chess = new Chess(
    'qr1b1kbr/1p1ppppp/1n1n4/p1p5/4P3/5NPP/PPPP1P2/QRNB1KBR w HBhb - 1 9',
  )
  expect(chess.perft(3)).toBe(17235)
})
test('perft - 960 - position 398', () => {
  const chess = new Chess(
    'qrnnkb1r/1pppppp1/7p/p4b2/4P3/5P1P/PPPP2PR/QRNNKBB1 w Bhb - 1 9',
  )
  expect(chess.perft(3)).toBe(31720)
})
test('perft - 960 - position 399', () => {
  const chess = new Chess(
    'qr1nkrbb/p2ppppp/1pp5/8/3Pn3/1NP3P1/PP2PP1P/QR1NKRBB w FBfb - 1 9',
  )
  expect(chess.perft(3)).toBe(11107)
})
test('perft - 960 - position 400', () => {
  const chess = new Chess(
    'bbrqn1kr/1pppp1pp/4n3/5p2/p5P1/3P4/PPP1PPKP/BBRQNN1R w hc - 0 9',
  )
  expect(chess.perft(3)).toBe(12963)
})
test('perft - 960 - position 401', () => {
  const chess = new Chess(
    'brqb1nkr/pppppp1p/8/4N1pn/5P2/6P1/PPPPP2P/BRQB1NKR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(14338)
})
test('perft - 960 - position 402', () => {
  const chess = new Chess(
    'brqnn1kr/pp3ppp/2pbp3/3p4/8/2NPP3/PPP1BPPP/BRQ1N1KR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(20760)
})
test('perft - 960 - position 403', () => {
  const chess = new Chess(
    'brq1nkrb/ppp2ppp/8/n2pp2P/P7/4P3/1PPP1PP1/BRQNNKRB w GBgb - 1 9',
  )
  expect(chess.perft(3)).toBe(8295)
})
test('perft - 960 - position 404', () => {
  const chess = new Chess(
    'rbbqn1kr/pp2p1pp/6n1/2pp1p2/2P4P/P7/BP1PPPP1/R1BQNNKR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(25798)
})
test('perft - 960 - position 405', () => {
  const chess = new Chess(
    '1qbbn1kr/1ppppppp/r3n3/8/p1P5/P7/1P1PPPPP/RQBBNNKR w HAh - 1 9',
  )
  expect(chess.perft(3)).toBe(24530)
})
test('perft - 960 - position 406', () => {
  const chess = new Chess(
    'rqbnnbkr/ppp1ppp1/7p/3p4/PP6/7P/1NPPPPP1/RQB1NBKR w HAa - 1 9',
  )
  expect(chess.perft(3)).toBe(14509)
})
test('perft - 960 - position 407', () => {
  const chess = new Chess(
    'r1bnnkrb/q1ppp1pp/p7/1p3pB1/2P1P3/3P4/PP3PPP/RQ1NNKRB w GAga - 2 9',
  )
  expect(chess.perft(3)).toBe(27776)
})
test('perft - 960 - position 408', () => {
  const chess = new Chess(
    'rbqnb1kr/ppppp1pp/5p2/5N2/7P/1n3P2/PPPPP1P1/RBQNB1KR w HAha - 1 9',
  )
  expect(chess.perft(3)).toBe(27633)
})
test('perft - 960 - position 409', () => {
  const chess = new Chess(
    'rqnbbn1r/ppppppp1/6k1/8/6Pp/2PN4/PP1PPPKP/RQ1BBN1R w - - 0 9',
  )
  expect(chess.perft(3)).toBe(15367)
})
test('perft - 960 - position 410', () => {
  const chess = new Chess(
    'rqnnbbkr/p1p2pp1/1p1p3p/4p3/4NP2/6P1/PPPPP2P/RQN1BBKR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(17923)
})
test('perft - 960 - position 411', () => {
  const chess = new Chess(
    '1qnnbrkb/rppp1ppp/p3p3/8/4P3/2PP1P2/PP4PP/RQNNBKRB w GA - 1 9',
  )
  expect(chess.perft(3)).toBe(12135)
})
test('perft - 960 - position 412', () => {
  const chess = new Chess(
    'rbqnn1br/p1pppk1p/1p4p1/5p2/8/P1P2P2/1PBPP1PP/R1QNNKBR w HA - 0 9',
  )
  expect(chess.perft(3)).toBe(23877)
})
test('perft - 960 - position 413', () => {
  const chess = new Chess(
    'rqnbnkbr/1ppppp2/p5p1/8/1P4p1/4PP2/P1PP3P/RQNBNKBR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(18536)
})
test('perft - 960 - position 414', () => {
  const chess = new Chess(
    'rq1nkbbr/1p2pppp/p2n4/2pp4/1P4P1/P2N4/2PPPP1P/RQ1NKBBR w HAha - 1 9',
  )
  expect(chess.perft(3)).toBe(19840)
})
test('perft - 960 - position 415', () => {
  const chess = new Chess(
    'r1nnkrbb/pp1pppp1/2p3q1/7p/8/1PPP3P/P3PPP1/RQNNKRBB w FAfa - 1 9',
  )
  expect(chess.perft(3)).toBe(10808)
})
test('perft - 960 - position 416', () => {
  const chess = new Chess(
    'bbrnqk1r/pppp3p/6p1/4pp2/3P2P1/8/PPP1PP1P/BBRN1NKR w HC - 0 9',
  )
  expect(chess.perft(3)).toBe(12965)
})
test('perft - 960 - position 417', () => {
  const chess = new Chess(
    'brnb1nkr/pppqpp2/3p2pp/8/3PP3/1P6/PBP2PPP/1RNBQNKR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(28517)
})
test('perft - 960 - position 418', () => {
  const chess = new Chess(
    'brnq1b1r/ppp1ppkp/3p1np1/8/8/5P1P/PPPPPKPR/BRNQNB2 w - - 0 9',
  )
  expect(chess.perft(3)).toBe(10951)
})
test('perft - 960 - position 419', () => {
  const chess = new Chess(
    'brnq1rkb/1pppppp1/3n3p/p7/8/P4NP1/1PPPPPRP/BRNQ1K1B w B - 0 9',
  )
  expect(chess.perft(3)).toBe(14049)
})
test('perft - 960 - position 420', () => {
  const chess = new Chess(
    'rbb1qnkr/p1ppp1pp/1p3p2/6n1/8/1PN1P2P/P1PP1PP1/RBB1QNKR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(16412)
})
test('perft - 960 - position 421', () => {
  const chess = new Chess(
    'rnbb1nkr/1ppp1ppp/4p3/p5q1/6P1/1PP5/PB1PPP1P/RN1BQNKR w HAha - 1 9',
  )
  expect(chess.perft(3)).toBe(14149)
})
test('perft - 960 - position 422', () => {
  const chess = new Chess(
    'rnbqnbkr/1pp1p2p/3p1p2/p5p1/5PP1/2P5/PPNPP2P/RNBQ1BKR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(16679)
})
test('perft - 960 - position 423', () => {
  const chess = new Chess(
    'rnb2krb/pppqppnp/8/3p2p1/1P4P1/7P/P1PPPPB1/RNBQNKR1 w GAga - 1 9',
  )
  expect(chess.perft(3)).toBe(18749)
})
test('perft - 960 - position 424', () => {
  const chess = new Chess(
    'rbnqb1kr/pppn1pp1/3p3p/4p3/1P6/P7/R1PPPPPP/1BNQBNKR w Hha - 1 9',
  )
  expect(chess.perft(3)).toBe(12277)
})
test('perft - 960 - position 425', () => {
  const chess = new Chess(
    'rnqb1nkr/p1pbp1pp/8/1pPp1p2/P2P4/8/1P2PPPP/RNQBBNKR w HAha - 1 9',
  )
  expect(chess.perft(3)).toBe(26952)
})
test('perft - 960 - position 426', () => {
  const chess = new Chess(
    'rnq1bbkr/1p1ppp1p/4n3/p1p3p1/P1PP4/8/RP2PPPP/1NQNBBKR w Hha - 0 9',
  )
  expect(chess.perft(3)).toBe(21296)
})
test('perft - 960 - position 427', () => {
  const chess = new Chess(
    '1nqnbkrb/1pppp2p/r7/p4pp1/3P4/8/PPPBPPPP/RNQNK1RB w g - 0 9',
  )
  expect(chess.perft(3)).toBe(28534)
})
test('perft - 960 - position 428', () => {
  const chess = new Chess(
    'rbnqnkbr/p1pp1p1p/8/1p2p3/3P2pP/2P5/PP2PPP1/RBNQNKBR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(27120)
})
test('perft - 960 - position 429', () => {
  const chess = new Chess(
    'rnq1nkbr/1p1p1ppp/2p1pb2/p7/7P/2P5/PPNPPPPB/RNQB1K1R w HAha - 2 9',
  )
  expect(chess.perft(3)).toBe(24010)
})
test('perft - 960 - position 430', () => {
  const chess = new Chess(
    'rnqnk1br/p1ppp1bp/1p3p2/6p1/4N3/P5P1/1PPPPP1P/R1QNKBBR w HAha - 2 9',
  )
  expect(chess.perft(3)).toBe(19396)
})
test('perft - 960 - position 431', () => {
  const chess = new Chess(
    'rnq1krbb/p1p1pppp/8/1p1p4/1n5B/2N2P2/PPPPP1PP/RNQ1KR1B w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(24029)
})
test('perft - 960 - position 432', () => {
  const chess = new Chess(
    'bbrnnqkr/1pp1pppp/3p4/p7/P3P3/7P/1PPP1PP1/BBRNNQKR w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(11025)
})
test('perft - 960 - position 433', () => {
  const chess = new Chess(
    'brnbnqkr/p1ppp3/1p5p/5Pp1/5P2/3N4/PPPPP2P/BRNB1QKR w HBhb g6 0 9',
  )
  expect(chess.perft(3)).toBe(21402)
})
test('perft - 960 - position 434', () => {
  const chess = new Chess(
    'br1nqbkr/1ppppp2/pn6/6pp/2PP4/1N4P1/PP2PP1P/BR1NQBKR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(16220)
})
test('perft - 960 - position 435', () => {
  const chess = new Chess(
    '1rnnqkrb/p2ppp1p/1pp5/2N3p1/8/1P6/P1PPPPKP/BR1NQ1RB w gb - 0 9',
  )
  expect(chess.perft(3)).toBe(34831)
})
test('perft - 960 - position 436', () => {
  const chess = new Chess(
    'rbbnnqkr/pp3pp1/2p1p3/3p3p/3P3P/1PP5/P3PPP1/RBBNNQKR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(23079)
})
test('perft - 960 - position 437', () => {
  const chess = new Chess(
    'rn1bnqkr/p1ppppp1/8/1p5p/P4P1P/3N4/1PPPP1b1/RNBB1QKR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(21735)
})
test('perft - 960 - position 438', () => {
  const chess = new Chess(
    '1nbnqbkr/1p1p1ppp/r3p3/p1p5/P3P3/3Q4/1PPP1PPP/RNBN1BKR w HAh - 2 9',
  )
  expect(chess.perft(3)).toBe(24278)
})
test('perft - 960 - position 439', () => {
  const chess = new Chess(
    'rnbnqkrb/2pppppp/1p6/p7/1PP5/4N2P/P2PPPP1/RNB1QKRB w GAg - 0 9',
  )
  expect(chess.perft(3)).toBe(14225)
})
test('perft - 960 - position 440', () => {
  const chess = new Chess(
    'rbnnbq1r/ppppppkp/6p1/N7/4P3/P7/1PPP1PPP/RB1NBQKR w HA - 5 9',
  )
  expect(chess.perft(3)).toBe(18371)
})
test('perft - 960 - position 441', () => {
  const chess = new Chess(
    'r1nbbqkr/pppppp1p/8/8/1n3Pp1/3N1QP1/PPPPP2P/RN1BB1KR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(25431)
})
test('perft - 960 - position 442', () => {
  const chess = new Chess(
    'rnq1bbkr/pp1p1ppp/2pnp3/8/7P/1QP5/PP1PPPPR/RNN1BBK1 w Aha - 2 9',
  )
  expect(chess.perft(3)).toBe(16838)
})
test('perft - 960 - position 443', () => {
  const chess = new Chess(
    'rnnqbrkb/2ppppp1/1p1N4/p6p/4P3/8/PPPP1PPP/R1NQBKRB w GA - 0 9',
  )
  expect(chess.perft(3)).toBe(20591)
})
test('perft - 960 - position 444', () => {
  const chess = new Chess(
    'rbnnq1br/pppp1kp1/4pp2/7p/PP6/2PP4/4PPPP/RBNNQKBR w HA - 0 9',
  )
  expect(chess.perft(3)).toBe(12201)
})
test('perft - 960 - position 445', () => {
  const chess = new Chess(
    'rnnbqkbr/p2ppp2/7p/1pp3p1/2P2N2/8/PP1PPPPP/RN1BQKBR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(13896)
})
test('perft - 960 - position 446', () => {
  const chess = new Chess(
    'rnn1kbbr/ppppqp2/6p1/2N1p2p/P7/2P5/1P1PPPPP/RN1QKBBR w HAha - 2 9',
  )
  expect(chess.perft(3)).toBe(22088)
})
test('perft - 960 - position 447', () => {
  const chess = new Chess(
    'rnnqkrbb/p1p1p1pp/1p3p2/8/3p2Q1/P1P1P3/1P1P1PPP/RNN1KRBB w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(34735)
})
test('perft - 960 - position 448', () => {
  const chess = new Chess(
    'bbrnk1qr/1pppppp1/p4n1p/8/P2P2N1/8/1PP1PPPP/BBR1NKQR w HC - 1 9',
  )
  expect(chess.perft(3)).toBe(11213)
})
test('perft - 960 - position 449', () => {
  const chess = new Chess(
    'brnbnkqr/1pp1p1p1/p2p1p2/7p/1P4PP/8/PBPPPP2/1RNBNKQR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(24260)
})
test('perft - 960 - position 450', () => {
  const chess = new Chess(
    'br2kbqr/ppppp1pp/3n1p2/3P4/3n3P/3N4/PPP1PPP1/BR1NKBQR w HBhb - 3 9',
  )
  expect(chess.perft(3)).toBe(22039)
})
test('perft - 960 - position 451', () => {
  const chess = new Chess(
    'br1nkqrb/ppppppp1/8/7p/4P3/n1P2PP1/PP1P3P/BRNNKQRB w GBgb - 0 9',
  )
  expect(chess.perft(3)).toBe(16934)
})
test('perft - 960 - position 452', () => {
  const chess = new Chess(
    'rbbn1kqr/pp1pp1p1/2pn3p/5p2/5P2/1P1N4/PNPPP1PP/RBB2KQR w HAha - 1 9',
  )
  expect(chess.perft(3)).toBe(21543)
})
test('perft - 960 - position 453', () => {
  const chess = new Chess(
    'rnbbnk1r/pp1ppp1p/6q1/2p5/PP4p1/4P3/2PP1PPP/RNBBNKQR w HAha - 1 9',
  )
  expect(chess.perft(3)).toBe(26898)
})
test('perft - 960 - position 454', () => {
  const chess = new Chess(
    'rnbnkbqr/1pp3pp/3p4/p3pp2/3P2P1/2N1N3/PPP1PP1P/R1B1KBQR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(32907)
})
test('perft - 960 - position 455', () => {
  const chess = new Chess(
    'r1bnkqrb/1ppppppp/p3n3/8/6P1/4N3/PPPPPPRP/RNB1KQ1B w Aga - 1 9',
  )
  expect(chess.perft(3)).toBe(11416)
})
test('perft - 960 - position 456', () => {
  const chess = new Chess(
    'rbn1bkqr/p1pp1pp1/1pn5/4p2p/7P/1PBP4/P1P1PPP1/RBNN1KQR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(11649)
})
test('perft - 960 - position 457', () => {
  const chess = new Chess(
    'rnnbbkqr/3ppppp/p7/1pp5/P6P/6P1/1PPPPP2/RNNBBKQR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(15733)
})
test('perft - 960 - position 458', () => {
  const chess = new Chess(
    'r1nk1bqr/1pppp1pp/2n5/p4p1b/5P2/1N4B1/PPPPP1PP/RN1K1BQR w HAha - 2 9',
  )
  expect(chess.perft(3)).toBe(21983)
})
test('perft - 960 - position 459', () => {
  const chess = new Chess(
    'r1nkbqrb/p2pppp1/npp4p/8/4PP2/2N4P/PPPP2P1/R1NKBQRB w GAga - 0 9',
  )
  expect(chess.perft(3)).toBe(17480)
})
test('perft - 960 - position 460', () => {
  const chess = new Chess(
    'rbnnkqbr/ppppp2p/5p2/6p1/2P1B3/P6P/1P1PPPP1/R1NNKQBR w HAha - 1 9',
  )
  expect(chess.perft(3)).toBe(24956)
})
test('perft - 960 - position 461', () => {
  const chess = new Chess(
    '1r1bkqbr/pppp1ppp/2nnp3/8/2P5/N4P2/PP1PP1PP/1RNBKQBR w Hh - 0 9',
  )
  expect(chess.perft(3)).toBe(22844)
})
test('perft - 960 - position 462', () => {
  const chess = new Chess(
    'rn1kqbbr/p1pppp1p/1p4p1/1n6/1P2P3/4Q2P/P1PP1PP1/RNNK1BBR w HAha - 1 9',
  )
  expect(chess.perft(3)).toBe(30100)
})
test('perft - 960 - position 463', () => {
  const chess = new Chess(
    'rn1kqrbb/pppppppp/8/8/2nP2P1/1P2P3/P1P2P1P/RNNKQRBB w FAfa - 1 9',
  )
  expect(chess.perft(3)).toBe(21701)
})
test('perft - 960 - position 464', () => {
  const chess = new Chess(
    'b1rnnkrq/bpppppp1/7p/8/1p6/2B5/PNPPPPPP/1BR1NKRQ w GCgc - 2 9',
  )
  expect(chess.perft(3)).toBe(17253)
})
test('perft - 960 - position 465', () => {
  const chess = new Chess(
    'brnb1krq/pppppppp/8/5P2/2P1n2P/8/PP1PP1P1/BRNBNKRQ w GBgb - 1 9',
  )
  expect(chess.perft(3)).toBe(14882)
})
test('perft - 960 - position 466', () => {
  const chess = new Chess(
    'b1nnkbrq/pr1pppp1/1p5p/2p5/P2N1P2/8/1PPPP1PP/BR1NKBRQ w GBg - 0 9',
  )
  expect(chess.perft(3)).toBe(12181)
})
test('perft - 960 - position 467', () => {
  const chess = new Chess(
    'br1nkrqb/p1p1p1pp/3n4/1p1p1p2/5N1P/4P3/PPPP1PP1/BR1NKRQB w FBfb - 0 9',
  )
  expect(chess.perft(3)).toBe(19398)
})
test('perft - 960 - position 468', () => {
  const chess = new Chess(
    'rbbnnkrq/p2pp1pp/2p5/5p2/1pPP1B2/P7/1P2PPPP/RB1NNKRQ w GAga - 0 9',
  )
  expect(chess.perft(3)).toBe(30474)
})
test('perft - 960 - position 469', () => {
  const chess = new Chess(
    'rnbbnkr1/1p1ppp1p/2p3p1/p7/2Pq4/1P1P4/P2BPPPP/RN1BNKRQ w GAga - 2 9',
  )
  expect(chess.perft(3)).toBe(29847)
})
test('perft - 960 - position 470', () => {
  const chess = new Chess(
    '1rbnkbrq/pppppp2/n5pp/2P5/P7/4N3/1P1PPPPP/RNB1KBRQ w GAg - 2 9',
  )
  expect(chess.perft(3)).toBe(14146)
})
test('perft - 960 - position 471', () => {
  const chess = new Chess(
    '1nbnkr1b/rppppppq/p7/7p/1P5P/3P2P1/P1P1PP2/RNBNKRQB w FAf - 1 9',
  )
  expect(chess.perft(3)).toBe(26696)
})
test('perft - 960 - position 472', () => {
  const chess = new Chess(
    'rbn1bkrq/ppppp3/4n2p/5pp1/1PN5/2P5/P2PPPPP/RBN1BKRQ w GAga - 0 9',
  )
  expect(chess.perft(3)).toBe(24090)
})
test('perft - 960 - position 473', () => {
  const chess = new Chess(
    'r1nbbkrq/1ppp2pp/2n2p2/p3p3/5P2/1N4BP/PPPPP1P1/RN1B1KRQ w GAga - 0 9',
  )
  expect(chess.perft(3)).toBe(20141)
})
test('perft - 960 - position 474', () => {
  const chess = new Chess(
    'rnnkbbrq/1pppp1p1/5p2/7p/p6P/3N1P2/PPPPP1PQ/RN1KBBR1 w GAga - 0 9',
  )
  expect(chess.perft(3)).toBe(20098)
})
test('perft - 960 - position 475', () => {
  const chess = new Chess(
    'r1nkbrqb/pppp1p2/n3p1p1/7p/2P2P2/1P6/P2PPQPP/RNNKBR1B w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(21397)
})
test('perft - 960 - position 476', () => {
  const chess = new Chess(
    'rbnnkr1q/1ppp2pp/p4p2/P2bp3/4P2P/8/1PPP1PP1/RBNNKRBQ w FAfa - 1 9',
  )
  expect(chess.perft(3)).toBe(23387)
})
test('perft - 960 - position 477', () => {
  const chess = new Chess(
    'rn1bkrb1/1ppppp1p/pn4p1/8/P2q3P/3P4/NPP1PPP1/RN1BKRBQ w FAfa - 1 9',
  )
  expect(chess.perft(3)).toBe(18322)
})
test('perft - 960 - position 478', () => {
  const chess = new Chess(
    'rn1krbbq/pppp1npp/4pp2/8/4P2P/3P2P1/PPP2P2/RNNKRBBQ w EAea - 1 9',
  )
  expect(chess.perft(3)).toBe(23968)
})
test('perft - 960 - position 479', () => {
  const chess = new Chess(
    'rnn1rqbb/ppkp1pp1/2p1p2p/2P5/8/3P1P2/PP2P1PP/RNNKRQBB w EA - 0 9',
  )
  expect(chess.perft(3)).toBe(11973)
})
test('perft - 960 - position 480', () => {
  const chess = new Chess(
    'bbqr1knr/pppppp1p/8/4n1p1/2P1P3/6P1/PPQP1P1P/BB1RNKNR w HDhd - 0 9',
  )
  expect(chess.perft(3)).toBe(18253)
})
test('perft - 960 - position 481', () => {
  const chess = new Chess(
    'bq1bnknr/pprppp1p/8/2p3p1/4PPP1/8/PPPP3P/BQRBNKNR w HCh - 0 9',
  )
  expect(chess.perft(3)).toBe(14021)
})
test('perft - 960 - position 482', () => {
  const chess = new Chess(
    'bqrnkb1r/1p2pppp/p1pp3n/5Q2/2P4P/5N2/PP1PPPP1/B1RNKB1R w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(33347)
})
test('perft - 960 - position 483', () => {
  const chess = new Chess(
    'bq1rknrb/pppppp1p/4n3/6p1/4P1P1/3P1P2/PPP4P/BQRNKNRB w GCg - 0 9',
  )
  expect(chess.perft(3)).toBe(14815)
})
test('perft - 960 - position 484', () => {
  const chess = new Chess(
    'q1brnknr/pp1pp1p1/8/2p2p1p/5b2/P4N2/1PPPP1PP/QBBRK1NR w hd - 0 9',
  )
  expect(chess.perft(3)).toBe(15778)
})
test('perft - 960 - position 485', () => {
  const chess = new Chess(
    'qrbbnknr/1p1ppp1p/p1p5/8/1P2P1p1/3P1B2/P1P2PPP/QRB1NKNR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(24049)
})
test('perft - 960 - position 486', () => {
  const chess = new Chess(
    'qrb1kbnr/p3pppp/2n5/1ppp4/7P/3P1P2/PPP1P1PR/QRBNKBN1 w Bhb - 0 9',
  )
  expect(chess.perft(3)).toBe(22606)
})
test('perft - 960 - position 487', () => {
  const chess = new Chess(
    'qrbnknrb/ppp1pp2/6p1/7p/PPNp4/8/2PPPPPP/QRB1KNRB w GBgb - 0 9',
  )
  expect(chess.perft(3)).toBe(26762)
})
test('perft - 960 - position 488', () => {
  const chess = new Chess(
    'qbrnbknr/pp1pp1pp/8/2p2p2/3Q4/PP6/2PPPPPP/1BRNBKNR w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(39472)
})
test('perft - 960 - position 489', () => {
  const chess = new Chess(
    'qr1bbk1r/pppppp1p/1n6/5np1/4B3/1PP5/P2PPPPP/QRN1BKNR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(16938)
})
test('perft - 960 - position 490', () => {
  const chess = new Chess(
    'qrnkbbnr/1p1pp2p/p7/2p1Npp1/6P1/7P/PPPPPP2/QR1KBBNR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(16348)
})
test('perft - 960 - position 491', () => {
  const chess = new Chess(
    'qrnkbnrb/pp1p1p2/2p1p1pp/4N3/P4P2/8/1PPPP1PP/QR1KBNRB w GBgb - 0 9',
  )
  expect(chess.perft(3)).toBe(20737)
})
test('perft - 960 - position 492', () => {
  const chess = new Chess(
    'qbrnknbr/1pppppp1/p6p/8/1P6/3PP3/PQP2PPP/1BRNKNBR w HChc - 3 9',
  )
  expect(chess.perft(3)).toBe(16755)
})
test('perft - 960 - position 493', () => {
  const chess = new Chess(
    'qrnbk1br/1ppppp1p/p5p1/8/4Pn2/4K1P1/PPPP1P1P/QRNB1NBR w hb - 0 9',
  )
  expect(chess.perft(3)).toBe(13776)
})
test('perft - 960 - position 494', () => {
  const chess = new Chess(
    'qrnk1bbr/1pnp1ppp/p1p1p3/8/3Q4/1P1N3P/P1PPPPP1/1RNK1BBR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(42898)
})
test('perft - 960 - position 495', () => {
  const chess = new Chess(
    'qrnknrb1/pppppp2/8/6pp/4P2P/3P1P2/PbP3P1/QRNKNRBB w FBfb - 0 9',
  )
  expect(chess.perft(3)).toBe(17965)
})
test('perft - 960 - position 496', () => {
  const chess = new Chess(
    'bbrqnrk1/ppp2ppp/7n/3pp3/8/P4N1N/1PPPPPPP/BBRQ1RK1 w - - 1 9',
  )
  expect(chess.perft(3)).toBe(12078)
})
test('perft - 960 - position 497', () => {
  const chess = new Chess(
    'brqbnk1r/1ppp1ppp/8/p3pn2/8/2PP1P2/PP2PKPP/BRQBN1NR w hb - 1 9',
  )
  expect(chess.perft(3)).toBe(19387)
})
test('perft - 960 - position 498', () => {
  const chess = new Chess(
    'brqnkbnr/pp2pp1p/3p4/2p5/5p2/3P3P/PPP1PPP1/B1RNKBNR w Hhb - 0 9',
  )
  expect(chess.perft(3)).toBe(10755)
})
test('perft - 960 - position 499', () => {
  const chess = new Chess(
    'brq1kn1b/1ppppprp/2n3p1/p7/P1N5/6P1/1PPPPP1P/BRQNK1RB w GBb - 2 9',
  )
  expect(chess.perft(3)).toBe(16739)
})
test('perft - 960 - position 500', () => {
  const chess = new Chess(
    'rbbq1k1r/ppp1pppp/7n/1n1p4/5P2/P2P4/1PPBP1PP/RB1QNKNR w HAha - 1 9',
  )
  expect(chess.perft(3)).toBe(20110)
})
test('perft - 960 - position 501', () => {
  const chess = new Chess(
    'r1bbnk1r/qpp1pppp/p6n/3p4/1P6/5N1P/P1PPPPP1/RQBBK1NR w ha - 0 9',
  )
  expect(chess.perft(3)).toBe(18209)
})
test('perft - 960 - position 502', () => {
  const chess = new Chess(
    'rqbnkbnr/1pp2p1p/3p4/p3p1p1/8/2P2P2/PP1PPNPP/RQBNKB1R w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(21903)
})
test('perft - 960 - position 503', () => {
  const chess = new Chess(
    'r1bnknrb/pqppp1p1/1p5p/5p2/7P/3P2N1/PPP1PPP1/RQBNK1RB w GAga - 2 9',
  )
  expect(chess.perft(3)).toBe(20291)
})
test('perft - 960 - position 504', () => {
  const chess = new Chess(
    'rbqnbknr/pp1pppp1/8/2p5/3P3p/5N1P/PPP1PPPR/RBQNBK2 w Aha - 0 9',
  )
  expect(chess.perft(3)).toBe(26785)
})
test('perft - 960 - position 505', () => {
  const chess = new Chess(
    'rqnbbrk1/ppppppp1/8/5n1p/3P3P/2B3P1/PPP1PP2/RQNB1KNR w HA - 0 9',
  )
  expect(chess.perft(3)).toBe(11452)
})
test('perft - 960 - position 506', () => {
  const chess = new Chess(
    'rqnkbbnr/pp2p1p1/8/2pp1p1p/3PPP2/8/PPP1N1PP/RQNKBB1R w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(23142)
})
test('perft - 960 - position 507', () => {
  const chess = new Chess(
    'rqnkbnr1/pppp2bp/6p1/4pp2/1P2P3/3NN3/P1PP1PPP/RQ1KB1RB w GAga - 0 9',
  )
  expect(chess.perft(3)).toBe(18835)
})
test('perft - 960 - position 508', () => {
  const chess = new Chess(
    'rbq2kbr/pppppppp/2n5/P7/3P1n2/2P5/1P2PPPP/RBQNKNBR w HA - 1 9',
  )
  expect(chess.perft(3)).toBe(27028)
})
test('perft - 960 - position 509', () => {
  const chess = new Chess(
    'rq1bkn1r/ppppp2p/3n4/5pp1/2b3P1/1N1P1P2/PPP1P2P/RQ1BKNBR w HAha - 1 9',
  )
  expect(chess.perft(3)).toBe(22667)
})
test('perft - 960 - position 510', () => {
  const chess = new Chess(
    'r1nknbbr/p2ppp1p/1pp3p1/8/1P6/4P3/P1PPNPPq/R1QKNBBR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(22144)
})
test('perft - 960 - position 511', () => {
  const chess = new Chess(
    'rqnknrbb/ppp1p3/5ppp/2Np4/2P5/4P3/PP1P1PPP/RQNK1RBB w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(23277)
})
test('perft - 960 - position 512', () => {
  const chess = new Chess(
    '1brnqknr/2p1pppp/p2p4/1P6/6P1/4Nb2/PP1PPP1P/BBR1QKNR w HChc - 1 9',
  )
  expect(chess.perft(3)).toBe(32982)
})
test('perft - 960 - position 513', () => {
  const chess = new Chess(
    'brn1qknr/1p1pppp1/pb5p/Q1p5/3P3P/8/PPP1PPPR/BRNB1KN1 w Bhb - 2 9',
  )
  expect(chess.perft(3)).toBe(20952)
})
test('perft - 960 - position 514', () => {
  const chess = new Chess(
    'brnqkbnr/pppppp2/8/6pp/6P1/P2P1P2/1PP1P2P/BRNQKBNR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(9782)
})
test('perft - 960 - position 515', () => {
  const chess = new Chess(
    '2nqknrb/1rpppppp/5B2/pp6/1PP1b3/3P4/P3PPPP/1RNQKNRB w GBg - 1 9',
  )
  expect(chess.perft(3)).toBe(36238)
})
test('perft - 960 - position 516', () => {
  const chess = new Chess(
    'rb1nqknr/1pp1pppp/8/3p4/p2P4/6PN/PPPQPP1P/RBBN1K1R w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(21237)
})
test('perft - 960 - position 517', () => {
  const chess = new Chess(
    'rnbbqknr/pppp4/5p2/4p1pp/P7/2N2PP1/1PPPP2P/R1BBQKNR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(14651)
})
test('perft - 960 - position 518', () => {
  const chess = new Chess(
    'rn1qkbnr/p1p1pp1p/bp4p1/3p4/1P6/4P3/P1PP1PPP/RNBQKBNR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(24319)
})
test('perft - 960 - position 519', () => {
  const chess = new Chess(
    'r1bqk1rb/pppnpppp/5n2/3p4/2P3PP/2N5/PP1PPP2/R1BQKNRB w GAga - 1 9',
  )
  expect(chess.perft(3)).toBe(27121)
})
test('perft - 960 - position 520', () => {
  const chess = new Chess(
    'rbnqbknr/1p1ppp1p/6p1/p1p5/7P/3P4/PPP1PPP1/RBNQBKNR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(18842)
})
test('perft - 960 - position 521', () => {
  const chess = new Chess(
    'r1qbbk1r/pp1ppppp/n1p5/5n2/B1P3P1/8/PP1PPP1P/RNQ1BKNR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(22293)
})
test('perft - 960 - position 522', () => {
  const chess = new Chess(
    'rnqkbb1r/p1pppppp/8/8/1p4n1/PP4PP/2PPPP2/RNQKBBNR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(9519)
})
test('perft - 960 - position 523', () => {
  const chess = new Chess(
    'rnqk1nrb/pppbpp2/7p/3p2p1/4B3/2N1N1P1/PPPPPP1P/R1QKB1R1 w GAga - 0 9',
  )
  expect(chess.perft(3)).toBe(38128)
})
test('perft - 960 - position 524', () => {
  const chess = new Chess(
    'rbnqknbr/1pp1ppp1/3p4/7p/p2P2PP/2P5/PP2PP2/RBNQKNBR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(28342)
})
test('perft - 960 - position 525', () => {
  const chess = new Chess(
    'rn1bknbr/pq2pppp/1p6/2pp4/P7/1P1P4/2PNPPPP/RNQBK1BR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(16652)
})
test('perft - 960 - position 526', () => {
  const chess = new Chess(
    'r1qk1bbr/ppp1pp1p/2np1n2/6p1/2PP4/3BP3/PP3PPP/RNQKN1BR w HAha - 2 9',
  )
  expect(chess.perft(3)).toBe(30213)
})
test('perft - 960 - position 527', () => {
  const chess = new Chess(
    'r1qknrbb/pppp1p2/2n3p1/4p2p/8/QPP5/P1NPPPPP/RN1K1RBB w FAfa - 2 9',
  )
  expect(chess.perft(3)).toBe(21563)
})
test('perft - 960 - position 528', () => {
  const chess = new Chess(
    'bbkr1qnr/2pppppp/2n5/pp6/8/PPN5/1BPPPPPP/1BR1KQNR w HC - 2 9',
  )
  expect(chess.perft(3)).toBe(15183)
})
test('perft - 960 - position 529', () => {
  const chess = new Chess(
    '1rnbkqnr/1bpppppp/1p6/7P/p2P4/5P2/PPP1P1P1/BRNBKQNR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(11790)
})
test('perft - 960 - position 530', () => {
  const chess = new Chess(
    'brnkqbnr/2p1pppp/1p6/3p4/1pP5/P6P/3PPPP1/BRNKQBNR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(21054)
})
test('perft - 960 - position 531', () => {
  const chess = new Chess(
    'br1kqnrb/npp1pppp/8/3p4/p4N2/PP6/2PPPPPP/BR1KQNRB w GBgb - 0 9',
  )
  expect(chess.perft(3)).toBe(25585)
})
test('perft - 960 - position 532', () => {
  const chess = new Chess(
    'rbbnkq1r/pppppp1p/7n/6p1/P5P1/2P2N2/1P1PPP1P/RBBNKQ1R w HAha - 1 9',
  )
  expect(chess.perft(3)).toBe(17585)
})
test('perft - 960 - position 533', () => {
  const chess = new Chess(
    'rnbbk1nr/pp2qppp/2ppp3/8/3P4/P1N4N/1PP1PPPP/R1BBKQ1R w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(24197)
})
test('perft - 960 - position 534', () => {
  const chess = new Chess(
    'rnbk1b1r/ppppn1pp/4pp2/7q/7P/P5PB/1PPPPP2/RNBKQ1NR w HAha - 3 9',
  )
  expect(chess.perft(3)).toBe(16633)
})
test('perft - 960 - position 535', () => {
  const chess = new Chess(
    'r2kqnrb/pbppppp1/np5p/8/4Q1P1/3P4/PPP1PP1P/RNBK1NRB w GAga - 2 9',
  )
  expect(chess.perft(3)).toBe(55009)
})
test('perft - 960 - position 536', () => {
  const chess = new Chess(
    'rbnkbq1r/p1p2ppp/1p2pn2/3p4/P3P3/3P4/1PP1KPPP/RBN1BQNR w ha - 2 9',
  )
  expect(chess.perft(3)).toBe(27179)
})
test('perft - 960 - position 537', () => {
  const chess = new Chess(
    'rk1bb1nr/ppppqppp/n7/1N2p3/6P1/7N/PPPPPP1P/R1KBBQ1R w HA - 6 9',
  )
  expect(chess.perft(3)).toBe(19478)
})
test('perft - 960 - position 538', () => {
  const chess = new Chess(
    'rnkqbbnr/p1ppp2p/1p4p1/8/1B3p1P/2NP4/PPP1PPP1/R1KQ1BNR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(18855)
})
test('perft - 960 - position 539', () => {
  const chess = new Chess(
    'rnkqb1rb/pp1p1ppp/4p3/2P3n1/8/1PP5/P3PPPP/RNKQBNRB w GAga - 0 9',
  )
  expect(chess.perft(3)).toBe(20699)
})
test('perft - 960 - position 540', () => {
  const chess = new Chess(
    'rb1kqnbr/pp1pp1p1/1np2p2/7p/P1P3PP/8/1P1PPP2/RBNKQNBR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(33661)
})
test('perft - 960 - position 541', () => {
  const chess = new Chess(
    'rnkbq1br/ppp2ppp/3p4/Q3p1n1/5P2/3P2P1/PPP1P2P/RNKB1NBR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(46472)
})
test('perft - 960 - position 542', () => {
  const chess = new Chess(
    'rn1qnbbr/pp2pppp/2ppk3/8/2PP4/3Q1N2/PP2PPPP/RNK2BBR w HA - 1 9',
  )
  expect(chess.perft(3)).toBe(22474)
})
test('perft - 960 - position 543', () => {
  const chess = new Chess(
    'rnkqnr1b/ppppp1pp/5p2/8/Q1P2P2/8/PP1P2PP/RbK1NRBB w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(31987)
})
test('perft - 960 - position 544', () => {
  const chess = new Chess(
    'bbrn1nqr/ppp1k1pp/5p2/3pp3/7P/3PN3/PPP1PPP1/BBRK1NQR w - - 1 9',
  )
  expect(chess.perft(3)).toBe(15063)
})
test('perft - 960 - position 545', () => {
  const chess = new Chess(
    'brnbkn1r/1pppp1p1/4q3/p4p1p/7P/1N3P2/PPPPP1PQ/BR1BKN1R w HBhb - 2 9',
  )
  expect(chess.perft(3)).toBe(26120)
})
test('perft - 960 - position 546', () => {
  const chess = new Chess(
    'br1knbqr/pp2p1pp/1n6/2pp1p2/6P1/2P4B/PP1PPPQP/BRNKN2R w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(19202)
})
test('perft - 960 - position 547', () => {
  const chess = new Chess(
    'brnk1qrb/p1ppppp1/1p5p/8/P3n3/1N4P1/1PPPPPRP/BR1KNQ1B w Bgb - 0 9',
  )
  expect(chess.perft(3)).toBe(13991)
})
test('perft - 960 - position 548', () => {
  const chess = new Chess(
    'rbbnknqr/pppp3p/5pp1/8/1P1pP3/7P/P1P2PP1/RBBNKNQR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(21616)
})
test('perft - 960 - position 549', () => {
  const chess = new Chess(
    '1nbbknqr/rpp1ppp1/1Q1p3p/p7/2P2PP1/8/PP1PP2P/RNBBKN1R w HAh - 2 9',
  )
  expect(chess.perft(3)).toBe(34977)
})
test('perft - 960 - position 550', () => {
  const chess = new Chess(
    'rnb2bqr/ppkpppp1/3n3p/2p5/6PP/2N2P2/PPPPP3/R1BKNBQR w HA - 2 9',
  )
  expect(chess.perft(3)).toBe(20365)
})
test('perft - 960 - position 551', () => {
  const chess = new Chess(
    'rn1k1qrb/p1pppppp/bp6/8/4n3/P4BPP/1PPPPP2/RNBKNQR1 w GAga - 2 9',
  )
  expect(chess.perft(3)).toBe(14998)
})
test('perft - 960 - position 552', () => {
  const chess = new Chess(
    'rb2bnqr/nppkpppp/3p4/p7/1P6/P2N2P1/2PPPP1P/RB1KBNQR w HA - 3 9',
  )
  expect(chess.perft(3)).toBe(11475)
})
test('perft - 960 - position 553', () => {
  const chess = new Chess(
    'r1kbb1qr/2pppppp/np2n3/p7/2P3P1/8/PP1PPPQP/RNKBBN1R w HAha - 1 9',
  )
  expect(chess.perft(3)).toBe(23953)
})
test('perft - 960 - position 554', () => {
  const chess = new Chess(
    'rnknbb1r/p1ppp1pp/8/1p1P1p1q/8/P1P5/1P2PPPP/RNKNBBQR w HAha - 1 9',
  )
  expect(chess.perft(3)).toBe(12733)
})
test('perft - 960 - position 555', () => {
  const chess = new Chess(
    'rnkn1qrb/pp1bp1pp/2p5/1N1p1p2/8/2P5/PPKPPPPP/R2NBQRB w ga - 2 9',
  )
  expect(chess.perft(3)).toBe(14549)
})
test('perft - 960 - position 556', () => {
  const chess = new Chess(
    'r1nknqbr/pp2p1pp/2p2p2/3p4/6P1/PP1P4/2P1PP1b/RBNKNQBR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(13777)
})
test('perft - 960 - position 557', () => {
  const chess = new Chess(
    'rnkb1qbr/p1pp1p1p/1p2pn2/1Q4p1/4P3/N4P2/PPPP2PP/R1KBN1BR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(39356)
})
test('perft - 960 - position 558', () => {
  const chess = new Chess(
    'rn2qbbr/1pkppp1p/p3n1p1/8/8/2P2P2/PP1PP1PP/RNKN1BBR w HA - 0 9',
  )
  expect(chess.perft(3)).toBe(14888)
})
test('perft - 960 - position 559', () => {
  const chess = new Chess(
    'rn1nqrbb/p1kppp1p/8/1pp3p1/1P6/2N1P3/P1PP1PPP/RK1NQRBB w - - 0 9',
  )
  expect(chess.perft(3)).toBe(12489)
})
test('perft - 960 - position 560', () => {
  const chess = new Chess(
    'bbrnknrq/1pp3pp/p2p1p2/4p3/P7/1P2N3/2PPPPPP/BBRN1RKQ w gc - 0 9',
  )
  expect(chess.perft(3)).toBe(13900)
})
test('perft - 960 - position 561', () => {
  const chess = new Chess(
    'brnb1nrq/pppp1kpp/4p3/8/5p1P/P1P3P1/1P1PPP2/BRNBKNRQ w GB - 1 9',
  )
  expect(chess.perft(3)).toBe(23904)
})
test('perft - 960 - position 562', () => {
  const chess = new Chess(
    'br1k1brq/ppppp2p/1n1n1pp1/8/P1P5/3P2P1/1P2PP1P/BRNKNBRQ w GBgb - 0 9',
  )
  expect(chess.perft(3)).toBe(23550)
})
test('perft - 960 - position 563', () => {
  const chess = new Chess(
    '1r1knrqb/n1pppppp/p1b5/1p6/8/3N1P2/PPPPP1PP/BRNK1RQB w fb - 3 9',
  )
  expect(chess.perft(3)).toBe(23210)
})
test('perft - 960 - position 564', () => {
  const chess = new Chess(
    'rbbnk1rq/pppppppp/8/3Pn3/8/4P1P1/PPP2P1P/RBBNKNRQ w GAga - 1 9',
  )
  expect(chess.perft(3)).toBe(12619)
})
test('perft - 960 - position 565', () => {
  const chess = new Chess(
    'rnbbk1rq/2pppp1p/p3n1p1/1p6/P3N3/8/1PPPPPPP/RNBB1KRQ w ga - 0 9',
  )
  expect(chess.perft(3)).toBe(20061)
})
test('perft - 960 - position 566', () => {
  const chess = new Chess(
    'rnbkn1rq/ppppppb1/6p1/7p/2B2P2/1P2P3/P1PP2PP/RNBKN1RQ w GAga - 1 9',
  )
  expect(chess.perft(3)).toBe(23210)
})
test('perft - 960 - position 567', () => {
  const chess = new Chess(
    'rn1knrqb/p2pppp1/b1p5/1p5p/2P2P2/1P6/P2PP1PP/RNBKNRQB w FAfa - 1 9',
  )
  expect(chess.perft(3)).toBe(18481)
})
test('perft - 960 - position 568', () => {
  const chess = new Chess(
    'rbnkbnrq/pp2p1Np/2p2p2/8/3p4/8/PPPPPPPP/RBNKBR1Q w Aga - 0 9',
  )
  expect(chess.perft(3)).toBe(16435)
})
test('perft - 960 - position 569', () => {
  const chess = new Chess(
    'rk1bbnrq/ppp1pppp/n7/3p4/5P2/3P2NP/PPP1P1P1/RNKBB1RQ w GA - 0 9',
  )
  expect(chess.perft(3)).toBe(16238)
})
test('perft - 960 - position 570', () => {
  const chess = new Chess(
    'r1knbbrq/pppp2p1/2n1p2p/5p2/4P3/P1PP4/1P3PPP/RNKNBBRQ w GAga - 1 9',
  )
  expect(chess.perft(3)).toBe(13091)
})
test('perft - 960 - position 571', () => {
  const chess = new Chess(
    'rnknbrqb/p1p1pp1p/3p4/1p1N2p1/8/N7/PPPPPPPP/1RK1BRQB w Ffa - 0 9',
  )
  expect(chess.perft(3)).toBe(18942)
})
test('perft - 960 - position 572', () => {
  const chess = new Chess(
    'rbnknrb1/1p1ppp1p/p1p3p1/8/1P3P2/1R6/PqPPP1PP/RBNKN1BQ w Afa - 0 9',
  )
  expect(chess.perft(3)).toBe(34723)
})
test('perft - 960 - position 573', () => {
  const chess = new Chess(
    'rnkbnrbq/2p1ppp1/p7/1p1p3p/3P4/1P4P1/P1P1PP1P/RNKBNRBQ w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(12748)
})
test('perft - 960 - position 574', () => {
  const chess = new Chess(
    'r1knrbbq/pp1ppppp/2p1n3/8/2P3P1/P7/1PKPPP1P/RN1NRBBQ w ea - 0 9',
  )
  expect(chess.perft(3)).toBe(16037)
})
test('perft - 960 - position 575', () => {
  const chess = new Chess(
    'rnknrq1b/ppp1p1p1/4b3/3p1p1p/6P1/P4P2/1PPPPQ1P/RNKNR1BB w EAea - 2 9',
  )
  expect(chess.perft(3)).toBe(23124)
})
test('perft - 960 - position 576', () => {
  const chess = new Chess(
    'bbqr1krn/pppp1p1p/5n2/4p1p1/3P4/P3QP2/1PP1P1PP/BB1RNKRN w GDgd - 0 9',
  )
  expect(chess.perft(3)).toBe(25627)
})
test('perft - 960 - position 577', () => {
  const chess = new Chess(
    'bq1b1krn/pp1ppppp/3n4/2r5/3p3N/6N1/PPP1PPPP/BQRB1KR1 w GCg - 2 9',
  )
  expect(chess.perft(3)).toBe(18571)
})
test('perft - 960 - position 578', () => {
  const chess = new Chess(
    'bqrnkbrn/2pp1pp1/p7/1p2p2p/1P6/4N3/P1PPPPPP/BQR1KBRN w GCgc - 0 9',
  )
  expect(chess.perft(3)).toBe(22327)
})
test('perft - 960 - position 579', () => {
  const chess = new Chess(
    'bqr1krnb/1np1pppp/8/pp1p4/8/2P2N2/PP1PPPPP/BQRNKR1B w FCfc - 0 9',
  )
  expect(chess.perft(3)).toBe(18874)
})
test('perft - 960 - position 580', () => {
  const chess = new Chess(
    'qbb1rkrn/1ppppppp/p7/7n/8/P2P4/1PP1PPPP/QBBRNKRN w Gg - 0 9',
  )
  expect(chess.perft(3)).toBe(13837)
})
test('perft - 960 - position 581', () => {
  const chess = new Chess(
    '1rbbnkrn/p1p1pp1p/2q5/1p1p2p1/8/2P3P1/PP1PPP1P/QRBBNKRN w GBgb - 2 9',
  )
  expect(chess.perft(3)).toBe(24370)
})
test('perft - 960 - position 582', () => {
  const chess = new Chess(
    'qrb1kbrn/ppp1p2p/4npp1/3p4/8/1PP4P/PR1PPPP1/Q1BNKBRN w Ggb - 1 9',
  )
  expect(chess.perft(3)).toBe(9291)
})
test('perft - 960 - position 583', () => {
  const chess = new Chess(
    'qr2krnb/p1p1pppp/b1np4/1p6/3NP3/7P/PPPP1PP1/QRBNKR1B w FBfb - 2 9',
  )
  expect(chess.perft(3)).toBe(17081)
})
test('perft - 960 - position 584', () => {
  const chess = new Chess(
    'qbrnbkrn/ppp3pp/3p4/5p2/2P1pP2/6PP/PP1PP3/QBRNBKRN w GCgc - 0 9',
  )
  expect(chess.perft(3)).toBe(16835)
})
test('perft - 960 - position 585', () => {
  const chess = new Chess(
    'qrnb1krn/ppp1p1pp/5p2/2Np4/b2P4/2P5/PP2PPPP/QR1BBKRN w GBgb - 0 9',
  )
  expect(chess.perft(3)).toBe(17490)
})
test('perft - 960 - position 586', () => {
  const chess = new Chess(
    'qrnkbbrn/pp2pp2/8/2pp2pp/6PP/3P4/PPPKPP2/QRN1BBRN w gb - 0 9',
  )
  expect(chess.perft(3)).toBe(13116)
})
test('perft - 960 - position 587', () => {
  const chess = new Chess(
    'qrnkbrnb/p1p1ppp1/1p6/3p4/3P3p/5N1P/PPP1PPP1/QRNKBR1B w FBfb - 0 9',
  )
  expect(chess.perft(3)).toBe(13205)
})
test('perft - 960 - position 588', () => {
  const chess = new Chess(
    'qbr1krbn/1pppp1pp/p7/5pn1/2PP4/8/PPB1PPPP/Q1RNKRBN w FCfc - 0 9',
  )
  expect(chess.perft(3)).toBe(21651)
})
test('perft - 960 - position 589', () => {
  const chess = new Chess(
    '1rnbkrbn/1qp1pppp/3p4/pp6/4P3/1NP4P/PP1P1PP1/QR1BKRBN w FBfb - 0 9',
  )
  expect(chess.perft(3)).toBe(15089)
})
test('perft - 960 - position 590', () => {
  const chess = new Chess(
    'q1rkrbbn/ppp1pppp/8/3p4/1PnP4/P7/1RP1PPPP/Q1NKRBBN w Ee - 1 9',
  )
  expect(chess.perft(3)).toBe(10769)
})
test('perft - 960 - position 591', () => {
  const chess = new Chess(
    'qrnkrn1b/ppppp1pp/4b3/7P/6p1/P7/1PPPPP2/QRNKRNBB w EBeb - 0 9',
  )
  expect(chess.perft(3)).toBe(15623)
})
test('perft - 960 - position 592', () => {
  const chess = new Chess(
    'bbr1nkrn/ppp1pppp/3q4/3p4/8/P7/1PPPPPPP/BBRQNRKN w gc - 5 9',
  )
  expect(chess.perft(3)).toBe(13895)
})
test('perft - 960 - position 593', () => {
  const chess = new Chess(
    'brqbnkrn/pp1pp2p/5pp1/2p5/4P3/P2P1N2/1PP2PPP/BRQB1KRN w GBgb - 0 9',
  )
  expect(chess.perft(3)).toBe(19916)
})
test('perft - 960 - position 594', () => {
  const chess = new Chess(
    '2qnkbrn/p1pppppp/8/1r6/1p2bP2/7N/PPPPP1PP/BR1QKBRN w GBg - 4 9',
  )
  expect(chess.perft(3)).toBe(15713)
})
test('perft - 960 - position 595', () => {
  const chess = new Chess(
    'r1qnkr1b/p1pppppp/7n/1p6/8/1P3b1N/PRPPPPPP/B1QNK1RB w f - 5 9',
  )
  expect(chess.perft(3)).toBe(15437)
})
test('perft - 960 - position 596', () => {
  const chess = new Chess(
    'rbbqn1rn/pppp1pp1/3k4/4p2Q/2PPP3/8/PP3PPP/RBB1NKRN w GA - 1 9',
  )
  expect(chess.perft(3)).toBe(28757)
})
test('perft - 960 - position 597', () => {
  const chess = new Chess(
    'rqbbnkrn/3pppp1/p1p4p/1p6/5P2/P2N4/1PPPP1PP/RQBBK1RN w ga - 0 9',
  )
  expect(chess.perft(3)).toBe(16400)
})
test('perft - 960 - position 598', () => {
  const chess = new Chess(
    'r2nkbrn/pp2pppp/8/2ppqb2/2P3P1/5P2/PP1PPN1P/RQB1KBRN w GAga - 3 9',
  )
  expect(chess.perft(3)).toBe(31164)
})
test('perft - 960 - position 599', () => {
  const chess = new Chess(
    'rqbnk1nb/p1pppr1p/5p2/1p4p1/1PP1P3/8/P2P1PPP/RQBNKRNB w FAa - 1 9',
  )
  expect(chess.perft(3)).toBe(18208)
})
test('perft - 960 - position 600', () => {
  const chess = new Chess(
    'rbqnb1rn/p1pp1kpp/1p2pp2/8/4P2P/P5P1/1PPP1P2/RBQNBKRN w GA - 0 9',
  )
  expect(chess.perft(3)).toBe(9423)
})
test('perft - 960 - position 601', () => {
  const chess = new Chess(
    'rqnbbkrn/p1p1pppp/3p4/1p5B/8/1P1NP3/P1PP1PPP/RQ2BKRN w GAga - 0 9',
  )
  expect(chess.perft(3)).toBe(18382)
})
test('perft - 960 - position 602', () => {
  const chess = new Chess(
    'rqnkbbr1/ppppp1pp/5p2/7n/8/2PNP2P/PP1P1PP1/RQ1KBBRN w GAga - 1 9',
  )
  expect(chess.perft(3)).toBe(12506)
})
test('perft - 960 - position 603', () => {
  const chess = new Chess(
    'r1nkbrnb/2ppppp1/1q6/pp5p/1P6/P3P3/2PPKPPP/RQN1BRNB w fa - 2 9',
  )
  expect(chess.perft(3)).toBe(21518)
})
test('perft - 960 - position 604', () => {
  const chess = new Chess(
    'rbqnkrbn/p1ppppp1/7p/1p6/7P/2N1P3/PPPP1PPB/RBQ1KR1N w FAfa - 1 9',
  )
  expect(chess.perft(3)).toBe(18566)
})
test('perft - 960 - position 605', () => {
  const chess = new Chess(
    'r1nbkrbn/p1qp1ppp/8/1pp1p3/2P1P3/6P1/PP1PBP1P/RQN1KRBN w FAfa - 2 9',
  )
  expect(chess.perft(3)).toBe(14503)
})
test('perft - 960 - position 606', () => {
  const chess = new Chess(
    'rqnkr1bn/ppp1ppb1/3p2pp/8/P7/2P2P2/1PKPP1PP/RQN1RBBN w ea - 1 9',
  )
  expect(chess.perft(3)).toBe(21365)
})
test('perft - 960 - position 607', () => {
  const chess = new Chess(
    'r2krnbb/qppp1ppp/1n6/p3p3/PP6/4N3/N1PPPPPP/RQ1KR1BB w EAea - 4 9',
  )
  expect(chess.perft(3)).toBe(17054)
})
test('perft - 960 - position 608', () => {
  const chess = new Chess(
    'bbr1qk1n/1ppppp1p/2n5/p7/P7/1P2P3/2PP1PrP/1BRNQKRN w GCc - 0 9',
  )
  expect(chess.perft(3)).toBe(10680)
})
test('perft - 960 - position 609', () => {
  const chess = new Chess(
    'brnbq1rn/2ppppkp/p5p1/1p6/8/1BP3P1/PP1PPP1P/BRN1QRKN w - - 0 9',
  )
  expect(chess.perft(3)).toBe(13989)
})
test('perft - 960 - position 610', () => {
  const chess = new Chess(
    'brn1kbrn/pp2p1pp/3p4/q1p2p2/2P4P/6P1/PP1PPP2/BRNQKBRN w GBgb - 1 9',
  )
  expect(chess.perft(3)).toBe(10205)
})
test('perft - 960 - position 611', () => {
  const chess = new Chess(
    'brn1krnb/p3pppp/1qpp4/1p6/2P3P1/1P6/P2PPP1P/BRNQKRNB w FBfb - 1 9',
  )
  expect(chess.perft(3)).toBe(24761)
})
test('perft - 960 - position 612', () => {
  const chess = new Chess(
    'r1b1qkrn/1p1ppppp/p1p1n3/8/4P3/1PN5/P1PPQPPb/RBB2KRN w GAga - 0 9',
  )
  expect(chess.perft(3)).toBe(24536)
})
test('perft - 960 - position 613', () => {
  const chess = new Chess(
    'r1bbqk1n/p1pppprp/n7/1p4p1/5P2/2N3N1/PPPPP1PP/1RBBQKR1 w Ga - 4 9',
  )
  expect(chess.perft(3)).toBe(14657)
})
test('perft - 960 - position 614', () => {
  const chess = new Chess(
    'rnbqkbrn/p1pp1pp1/4p3/7p/2p4P/2P5/PP1PPPP1/R1BQKBRN w GAga - 0 9',
  )
  expect(chess.perft(3)).toBe(9076)
})
test('perft - 960 - position 615', () => {
  const chess = new Chess(
    'rnbqkrnb/1p1pp1p1/2p4p/p4p2/3P2P1/7N/PPPBPP1P/RN1QKR1B w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(25319)
})
test('perft - 960 - position 616', () => {
  const chess = new Chess(
    'rbnqbkr1/1ppppp2/p5n1/6pp/4P3/1N6/PPPP1PPP/RBQ1BRKN w ga - 2 9',
  )
  expect(chess.perft(3)).toBe(9683)
})
test('perft - 960 - position 617', () => {
  const chess = new Chess(
    'rnqb1krn/ppppp1p1/7p/7b/P1P2pPP/8/1P1PPP2/RNQBBKRN w GAga - 0 9',
  )
  expect(chess.perft(3)).toBe(15400)
})
test('perft - 960 - position 618', () => {
  const chess = new Chess(
    'rnqkbbr1/p1pp1ppp/4p3/1p6/P3P2n/5P2/1PPP1NPP/RNQKBBR1 w GAga - 2 9',
  )
  expect(chess.perft(3)).toBe(22883)
})
test('perft - 960 - position 619', () => {
  const chess = new Chess(
    'rn1kbrnb/1qppp1pp/1p6/p4p2/1B1P4/1P5N/P1P1PPPP/RNQK1R1B w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(43015)
})
test('perft - 960 - position 620', () => {
  const chess = new Chess(
    'rbnqkrbn/Bppp1p2/p5pp/4p3/5P2/6PP/PPPPP3/RBNQKR1N w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(20434)
})
test('perft - 960 - position 621', () => {
  const chess = new Chess(
    'rnqbkr1n/1p1ppbpp/3p1p2/p7/8/1P6/P1PPPPPP/R1QBKRBN w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(14424)
})
test('perft - 960 - position 622', () => {
  const chess = new Chess(
    'rnqkrb1n/ppppp3/6p1/5p1p/2b2P2/P1N5/1PPPP1PP/RQ1KRBBN w EAea - 1 9',
  )
  expect(chess.perft(3)).toBe(20684)
})
test('perft - 960 - position 623', () => {
  const chess = new Chess(
    'rnqk1nbb/1pp2ppp/3pr3/p3p3/3P1P2/2N3N1/PPP1P1PP/R1QKR1BB w EAa - 1 9',
  )
  expect(chess.perft(3)).toBe(26412)
})
test('perft - 960 - position 624', () => {
  const chess = new Chess(
    'bbr1kqrn/p1p1ppp1/1p2n2p/3p4/1P1P4/2N5/P1P1PPPP/BBR1KQRN w GCgc - 0 9',
  )
  expect(chess.perft(3)).toBe(11475)
})
test('perft - 960 - position 625', () => {
  const chess = new Chess(
    'brnbkq1n/ppp1ppr1/7p/3p2p1/2P3PP/8/PPBPPP2/BRN1KQRN w GBb - 2 9',
  )
  expect(chess.perft(3)).toBe(19017)
})
test('perft - 960 - position 626', () => {
  const chess = new Chess(
    'brnkqbr1/1pppp1pp/5p2/p7/P1P1P2n/8/1P1P1PP1/BRNKQBRN w GBgb - 0 9',
  )
  expect(chess.perft(3)).toBe(11672)
})
test('perft - 960 - position 627', () => {
  const chess = new Chess(
    'b1rkqrnb/p1ppp1pp/1p1n4/5p2/5P2/PN5P/1PPPP1P1/BR1KQRNB w FBf - 0 9',
  )
  expect(chess.perft(3)).toBe(17259)
})
test('perft - 960 - position 628', () => {
  const chess = new Chess(
    '1bbnkqrn/rppppp2/p5p1/7p/7P/P1P1P3/1P1P1PP1/RBBNKQRN w GAg - 1 9',
  )
  expect(chess.perft(3)).toBe(12391)
})
test('perft - 960 - position 629', () => {
  const chess = new Chess(
    'rnbbkqr1/1pppppp1/7p/p3n3/PP5P/8/1BPPPPP1/RN1BKQRN w GAga - 0 9',
  )
  expect(chess.perft(3)).toBe(12224)
})
test('perft - 960 - position 630', () => {
  const chess = new Chess(
    'r1bkqbrn/ppppp1pp/8/5p2/3nPP2/1P4N1/P1PP2PP/RNBKQBR1 w GAga - 1 9',
  )
  expect(chess.perft(3)).toBe(21158)
})
test('perft - 960 - position 631', () => {
  const chess = new Chess(
    'rnbkqr1b/1p1pp1pp/p4p1n/2p5/1P5P/N4P2/P1PPP1P1/R1BKQRNB w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(11738)
})
test('perft - 960 - position 632', () => {
  const chess = new Chess(
    'rbnkbqrn/p1p3pp/1p1p4/B3pp2/3P2P1/6N1/PPP1PP1P/RBNK1QR1 w GAga - 0 9',
  )
  expect(chess.perft(3)).toBe(33464)
})
test('perft - 960 - position 633', () => {
  const chess = new Chess(
    'r1kbbqrn/ppp3pp/2np1p2/1P2p3/3P1P2/8/P1P1P1PP/RNKBBQRN w GAga - 0 9',
  )
  expect(chess.perft(3)).toBe(28916)
})
test('perft - 960 - position 634', () => {
  const chess = new Chess(
    'rk1qbbrn/p2npppp/1p6/2p4Q/8/4P3/PPPP1PPP/RNK1B1RN w GA - 2 9',
  )
  expect(chess.perft(3)).toBe(22359)
})
test('perft - 960 - position 635', () => {
  const chess = new Chess(
    'rnk1brnb/pp1p1pp1/8/q1p1p2p/5P2/NP6/P1PPP1PP/R1KQBRNB w FAfa - 1 9',
  )
  expect(chess.perft(3)).toBe(20215)
})
test('perft - 960 - position 636', () => {
  const chess = new Chess(
    'rb1kqrbn/npp1ppp1/p7/3P3p/2PP4/8/PP3PPP/RBNKQRBN w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(27395)
})
test('perft - 960 - position 637', () => {
  const chess = new Chess(
    'rnkb1rbn/pp1p2pp/8/2p1pp1q/P6P/1PN5/2PPPPP1/R1KBQRBN w FAfa - 1 9',
  )
  expect(chess.perft(3)).toBe(21188)
})
test('perft - 960 - position 638', () => {
  const chess = new Chess(
    'rnkqrbbn/1pppp1p1/8/p2N1p1p/2P4P/8/PP1PPPP1/R1KQRBBN w EAea - 0 9',
  )
  expect(chess.perft(3)).toBe(17571)
})
test('perft - 960 - position 639', () => {
  const chess = new Chess(
    'rnk1r1bb/pp1ppppp/1q4n1/2p5/5P1P/3PP3/PPP3P1/RNKQRNBB w EAea - 1 9',
  )
  expect(chess.perft(3)).toBe(24613)
})
test('perft - 960 - position 640', () => {
  const chess = new Chess(
    'bbrnkrqn/1ppp1p2/6pp/p3p3/5PP1/2PB4/PP1PP2P/B1RNKRQN w FCfc - 0 9',
  )
  expect(chess.perft(3)).toBe(25425)
})
test('perft - 960 - position 641', () => {
  const chess = new Chess(
    'b1rbkrqn/ppp2ppp/1n2p3/3p4/6P1/2PP4/PP2PP1P/BRNBKRQN w FBf - 1 9',
  )
  expect(chess.perft(3)).toBe(10610)
})
test('perft - 960 - position 642', () => {
  const chess = new Chess(
    'brnkrb1n/1pp1p1pp/3p4/p1Nq1p2/2P5/8/PP1PPPPP/BRK1RBQN w eb - 2 9',
  )
  expect(chess.perft(3)).toBe(17842)
})
test('perft - 960 - position 643', () => {
  const chess = new Chess(
    'brn1r1nb/ppppkppp/4p3/8/2PP1P2/8/PP1KP1PP/BRN1RQNB w - - 1 9',
  )
  expect(chess.perft(3)).toBe(16874)
})
test('perft - 960 - position 644', () => {
  const chess = new Chess(
    'rbb1krqn/1pp1pp1p/p3n1p1/3pP3/8/1PN5/P1PP1PPP/RBB1KRQN w FAfa d6 0 9',
  )
  expect(chess.perft(3)).toBe(12641)
})
test('perft - 960 - position 645', () => {
  const chess = new Chess(
    'r1bbkrqn/p1pppppp/8/4n3/1p5P/P2P2P1/1PP1PP2/RNBBKRQN w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(13133)
})
test('perft - 960 - position 646', () => {
  const chess = new Chess(
    'rnbkrbqn/p1pp1ppp/4p3/1p6/8/BPN3P1/P1PPPP1P/R2KRBQN w EAea - 2 9',
  )
  expect(chess.perft(3)).toBe(20029)
})
test('perft - 960 - position 647', () => {
  const chess = new Chess(
    'rnbkrqn1/pppppp2/8/1Q2b1pp/P3P3/5P2/1PPP2PP/RNBKR1NB w EAea - 0 9',
  )
  expect(chess.perft(3)).toBe(36440)
})
test('perft - 960 - position 648', () => {
  const chess = new Chess(
    'rbnkbrqn/p1pppp2/7p/1p4pP/3P1P2/8/PPP1P1P1/RBNKBRQN w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(17143)
})
test('perft - 960 - position 649', () => {
  const chess = new Chess(
    '1nkbbrqn/3ppppp/r1p5/pp6/8/4PP2/PPPPN1PP/RNKBBRQ1 w FAf - 2 9',
  )
  expect(chess.perft(3)).toBe(14641)
})
test('perft - 960 - position 650', () => {
  const chess = new Chess(
    'rnkrbbq1/pppppnp1/7p/8/1B1Q1p2/3P1P2/PPP1P1PP/RNKR1B1N w DAda - 2 9',
  )
  expect(chess.perft(3)).toBe(36240)
})
test('perft - 960 - position 651', () => {
  const chess = new Chess(
    '1rkrbqnb/pppppp2/2n3p1/7p/3P3P/P4N2/1PP1PPP1/RNKRBQ1B w DAd - 0 9',
  )
  expect(chess.perft(3)).toBe(16049)
})
test('perft - 960 - position 652', () => {
  const chess = new Chess(
    'rbnkr1bn/pp1pqp1p/2p1p3/6p1/3P4/7P/PPP1PPP1/RBNKRQBN w EAea - 0 9',
  )
  expect(chess.perft(3)).toBe(12257)
})
test('perft - 960 - position 653', () => {
  const chess = new Chess(
    'r1kbrqb1/pppp2pp/2n1p1n1/5p1B/4PP2/P7/1PPP2PP/RNK1RQBN w EAea - 2 9',
  )
  expect(chess.perft(3)).toBe(53626)
})
test('perft - 960 - position 654', () => {
  const chess = new Chess(
    'rnkrqbbn/p1p3pp/1p1ppp2/8/1P6/3P2P1/PKP1PP1P/RN1RQBBN w da - 0 9',
  )
  expect(chess.perft(3)).toBe(20735)
})
test('perft - 960 - position 655', () => {
  const chess = new Chess(
    'rnkrqnbb/ppp2p1p/3p4/4p1p1/3P3P/N1Q5/PPP1PPP1/R1KR1NBB w DAda - 0 9',
  )
  expect(chess.perft(3)).toBe(45637)
})
test('perft - 960 - position 656', () => {
  const chess = new Chess(
    'bbrnkrn1/p1pppp2/1p6/6pp/3q4/1P3QP1/P1PPPP1P/BBRNKRN1 w FCfc - 0 9',
  )
  expect(chess.perft(3)).toBe(45749)
})
test('perft - 960 - position 657', () => {
  const chess = new Chess(
    'br1bkrnq/1p2pppp/pnp5/3p4/P1P5/5P2/1P1PPKPP/BRNB1RNQ w fb - 2 9',
  )
  expect(chess.perft(3)).toBe(12237)
})
test('perft - 960 - position 658', () => {
  const chess = new Chess(
    'brnkrbn1/pppppp1q/B6p/6p1/8/1P2PP2/P1PP2PP/BRNKR1NQ w EBeb - 0 9',
  )
  expect(chess.perft(3)).toBe(25868)
})
test('perft - 960 - position 659', () => {
  const chess = new Chess(
    'br1krnqb/pppppp1p/1n4p1/8/8/P2NN3/2PPPPPP/BR1K1RQB w Beb - 2 9',
  )
  expect(chess.perft(3)).toBe(36748)
})
test('perft - 960 - position 660', () => {
  const chess = new Chess(
    'rbbnkr1q/p1p2ppp/1p1ppn2/8/1PP4P/8/P2PPPP1/RBBNKRNQ w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(22623)
})
test('perft - 960 - position 661', () => {
  const chess = new Chess(
    'r1b1krnq/pp2pppp/1bn5/2pp4/4N3/5P2/PPPPPRPP/R1BBK1NQ w Afa - 0 9',
  )
  expect(chess.perft(3)).toBe(17427)
})
test('perft - 960 - position 662', () => {
  const chess = new Chess(
    '1nbkrbn1/rpppppqp/p7/6p1/4P3/3P2P1/PPP1KP1P/RNB1RBNQ w e - 1 9',
  )
  expect(chess.perft(3)).toBe(24748)
})
test('perft - 960 - position 663', () => {
  const chess = new Chess(
    'r1bkrnqb/pp3ppp/n1ppp3/8/1P5P/P7/R1PPPPP1/1NBKRNQB w Eea - 0 9',
  )
  expect(chess.perft(3)).toBe(11417)
})
test('perft - 960 - position 664', () => {
  const chess = new Chess(
    'rbnkbrnq/ppp1p2p/5p2/3p2p1/1B1P4/1N4P1/PPP1PP1P/RB1K1RNQ w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(25532)
})
test('perft - 960 - position 665', () => {
  const chess = new Chess(
    'rnk1brnq/pp1ppppp/2p5/b7/8/1P2P2P/P1PP1PPQ/RNKBBRN1 w FAfa - 3 9',
  )
  expect(chess.perft(3)).toBe(19043)
})
test('perft - 960 - position 666', () => {
  const chess = new Chess(
    'rnkrbbnq/p1p3pp/5p2/1p1pp3/P7/1PN2P2/2PPP1PP/R1KRBBNQ w DAda - 0 9',
  )
  expect(chess.perft(3)).toBe(21865)
})
test('perft - 960 - position 667', () => {
  const chess = new Chess(
    'r1krbnqb/p1pp1ppp/2n1p3/8/1p4P1/PPP5/3PPP1P/RNKRBNQB w DAda - 1 9',
  )
  expect(chess.perft(3)).toBe(14709)
})
test('perft - 960 - position 668', () => {
  const chess = new Chess(
    'rbnkrnbq/ppp1pp2/3p2p1/2N5/P6p/2P5/1P1PPPPP/RB1KRNBQ w EAea - 0 9',
  )
  expect(chess.perft(3)).toBe(25107)
})
test('perft - 960 - position 669', () => {
  const chess = new Chess(
    'rnkbrn1q/1ppppppb/8/p4N1p/8/P1N5/1PPPPPPP/R1KBR1BQ w EAea - 0 9',
  )
  expect(chess.perft(3)).toBe(20813)
})
test('perft - 960 - position 670', () => {
  const chess = new Chess(
    'rnkrnbbq/p1p2ppp/3pp3/1p6/6P1/4PQ1B/PPPP1P1P/RNKRN1B1 w DAda - 0 9',
  )
  expect(chess.perft(3)).toBe(16800)
})
test('perft - 960 - position 671', () => {
  const chess = new Chess(
    'rnkrnqbb/pp2p1p1/3p3p/2p2p2/5P2/1P1N4/P1PPPQPP/RNKR2BB w DAda - 0 9',
  )
  expect(chess.perft(3)).toBe(23210)
})
test('perft - 960 - position 672', () => {
  const chess = new Chess(
    'bb1rknnr/ppqppppp/8/2p5/3P1N2/1P6/P1P1PPPP/BBQRKN1R w HDhd - 1 9',
  )
  expect(chess.perft(3)).toBe(32279)
})
test('perft - 960 - position 673', () => {
  const chess = new Chess(
    'bqrbknnr/ppp1p2p/8/3p1p2/5p2/P3N2P/1PPPP1P1/BQRBK1NR w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(9009)
})
test('perft - 960 - position 674', () => {
  const chess = new Chess(
    'b1rk1bnr/qpp1pppp/p4n2/3p4/3PPP2/7N/PPP3PP/BQRKNB1R w HChc - 1 9',
  )
  expect(chess.perft(3)).toBe(16587)
})
test('perft - 960 - position 675', () => {
  const chess = new Chess(
    'bqkrnnrb/pppp2p1/4pp2/4P2p/6P1/7P/PPPP1P2/BQRKNNRB w GC - 1 9',
  )
  expect(chess.perft(3)).toBe(15118)
})
test('perft - 960 - position 676', () => {
  const chess = new Chess(
    'q1brknnr/1p1ppppp/p7/2p5/8/1PPP4/P2RPPPP/QBB1KNNR w Hhd - 0 9',
  )
  expect(chess.perft(3)).toBe(13206)
})
test('perft - 960 - position 677', () => {
  const chess = new Chess(
    'qrb1k1nr/ppppb1pp/6n1/4ppN1/3P4/4N3/PPP1PPPP/QRBBK2R w HBhb - 2 9',
  )
  expect(chess.perft(3)).toBe(26191)
})
test('perft - 960 - position 678', () => {
  const chess = new Chess(
    '1rbknbnr/1ppp1pp1/q6p/p3p3/5P2/2PPB3/PP2P1PP/QR1KNBNR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(28147)
})
test('perft - 960 - position 679', () => {
  const chess = new Chess(
    'qrbk2rb/1ppp1ppp/5nn1/p3p3/1N6/P7/1PPPPPPP/QRB1KNRB w gb - 0 9',
  )
  expect(chess.perft(3)).toBe(14398)
})
test('perft - 960 - position 680', () => {
  const chess = new Chess(
    'qbrk1nnr/1pp1pppp/2b5/p2p4/P2P2P1/8/1PP1PP1P/QBKRBNNR w hc - 1 9',
  )
  expect(chess.perft(3)).toBe(18103)
})
test('perft - 960 - position 681', () => {
  const chess = new Chess(
    'qrkbbnnr/ppp2p1p/4p3/3p2p1/P7/2PP4/1P2PPPP/QRKBBNNR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(16616)
})
test('perft - 960 - position 682', () => {
  const chess = new Chess(
    'qr1kbbnr/ppp1pp1p/4n1p1/2Pp4/6P1/4N3/PP1PPP1P/QRK1BBNR w HB d6 0 9',
  )
  expect(chess.perft(3)).toBe(18068)
})
test('perft - 960 - position 683', () => {
  const chess = new Chess(
    'qrk1b1rb/p1pppppp/3nnQ2/1p6/1P3P2/3P4/P1P1P1PP/1RKNBNRB w GBgb - 3 9',
  )
  expect(chess.perft(3)).toBe(55463)
})
test('perft - 960 - position 684', () => {
  const chess = new Chess(
    'qbrk1nbr/pppp3p/5n2/4ppp1/3P1P2/4N3/PPP1P1PP/QBKRN1BR w hc - 0 9',
  )
  expect(chess.perft(3)).toBe(20165)
})
test('perft - 960 - position 685', () => {
  const chess = new Chess(
    'qrkb1nbr/1pppppQp/3n4/p7/5p2/1P1N4/P1PPP1PP/1RKB1NBR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(40100)
})
test('perft - 960 - position 686', () => {
  const chess = new Chess(
    'qrk1nbbr/ppp1p1p1/4n2p/3p1p2/1P5P/3P2P1/P1P1PP2/QRKNNBBR w HBhb - 1 9',
  )
  expect(chess.perft(3)).toBe(25367)
})
test('perft - 960 - position 687', () => {
  const chess = new Chess(
    'qrkn1rbb/pp2pppp/2p5/3p4/P2Qn1P1/1P6/2PPPP1P/1RKNNRBB w FBfb - 0 9',
  )
  expect(chess.perft(3)).toBe(35335)
})
test('perft - 960 - position 688', () => {
  const chess = new Chess(
    'bbrqknnr/ppp4p/3pp3/5pp1/4PP2/5Q2/PPPP2PP/BBR1KNNR w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(29974)
})
test('perft - 960 - position 689', () => {
  const chess = new Chess(
    '1rqbkn1r/p1p1pppp/1p5n/P2p4/3Pb1P1/8/1PP1PP1P/BRQBKNNR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(19482)
})
test('perft - 960 - position 690', () => {
  const chess = new Chess(
    'br1knbnr/1qp1pppp/pp1p4/8/8/PP6/2PPPPPP/BRQKNBNR w HBhb - 2 9',
  )
  expect(chess.perft(3)).toBe(18835)
})
test('perft - 960 - position 691', () => {
  const chess = new Chess(
    'brqk2rb/ppppp1pp/4np2/8/2n5/3P1Q2/PP2PPPP/BR1KNNRB w GBgb - 0 9',
  )
  expect(chess.perft(3)).toBe(30434)
})
test('perft - 960 - position 692', () => {
  const chess = new Chess(
    'r1bqknnr/pp1pp1p1/5p1p/2p1b2N/2P5/8/PPQPPPPP/RBB1K1NR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(25549)
})
test('perft - 960 - position 693', () => {
  const chess = new Chess(
    'rqbbknnr/ppppp2p/5pp1/8/8/1P3PP1/PQPPP2P/R1BBKNNR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(10163)
})
test('perft - 960 - position 694', () => {
  const chess = new Chess(
    'rqbknbnr/1pp1p2p/p7/3p1pp1/7N/1PP5/P2PPPPP/RQBK1BNR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(19606)
})
test('perft - 960 - position 695', () => {
  const chess = new Chess(
    'rqb1nnrb/2ppkppp/1p2p3/p7/2PPP3/1P6/P4PPP/RQBKNNRB w GA - 1 9',
  )
  expect(chess.perft(3)).toBe(22895)
})
test('perft - 960 - position 696', () => {
  const chess = new Chess(
    'rb1kbn1r/p1ppppp1/qp5n/7p/P7/RPP5/3PPPPP/1BQKBNNR w Hha - 2 9',
  )
  expect(chess.perft(3)).toBe(23815)
})
test('perft - 960 - position 697', () => {
  const chess = new Chess(
    'rqkbb1nr/p1p2ppp/1p1p2n1/3Np3/4P3/5N2/PPPP1PPP/RQKBB2R w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(20663)
})
test('perft - 960 - position 698', () => {
  const chess = new Chess(
    'rqknbbr1/p1pppp1p/1p3np1/8/4P3/2P2P1P/PP1P2P1/RQKNBBNR w HAa - 0 9',
  )
  expect(chess.perft(3)).toBe(18231)
})
test('perft - 960 - position 699', () => {
  const chess = new Chess(
    'r1k1bnrb/1qpppppp/1p2n3/p7/1P5P/6P1/P1PPPP2/RQKNBNR1 w GAga - 1 9',
  )
  expect(chess.perft(3)).toBe(20693)
})
test('perft - 960 - position 700', () => {
  const chess = new Chess(
    'rb1knnbr/1pp1ppp1/p2p3p/5q2/3B2P1/3P1P2/PPP1P2P/RBQKNN1R w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(44096)
})
test('perft - 960 - position 701', () => {
  const chess = new Chess(
    'rqkb1nbr/p1p1ppp1/1p3n1p/2Qp4/8/2P5/PP1PPPPP/R1KBNNBR w HAha - 2 9',
  )
  expect(chess.perft(3)).toBe(38218)
})
test('perft - 960 - position 702', () => {
  const chess = new Chess(
    'rqknnbbr/2pppp2/pp5p/6p1/1P1P4/4PP2/P1P3PP/RQKNNBBR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(17638)
})
test('perft - 960 - position 703', () => {
  const chess = new Chess(
    'rqkn1rbb/1pp1pppp/p7/3p4/3Pn3/2P1PP2/PP4PP/RQKNNRBB w FAfa - 1 9',
  )
  expect(chess.perft(3)).toBe(12216)
})
test('perft - 960 - position 704', () => {
  const chess = new Chess(
    'bbrkqn1r/1pppppp1/5n2/p7/1PP2P1p/7N/P2PP1PP/BBRKQN1R w HChc - 1 9',
  )
  expect(chess.perft(3)).toBe(35291)
})
test('perft - 960 - position 705', () => {
  const chess = new Chess(
    'brkbqn1r/p2ppppp/7n/1p6/P1p3PP/8/1PPPPP1N/BRKBQ1NR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(11790)
})
test('perft - 960 - position 706', () => {
  const chess = new Chess(
    'brkq1bnr/pp1ppp1p/8/2p2np1/P7/8/1PPPPPPP/BRKQNBNR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(11811)
})
test('perft - 960 - position 707', () => {
  const chess = new Chess(
    'brkqnnrb/1ppppppp/8/8/p3P3/5N2/PPPP1PPP/BRKQ1NRB w GBgb - 3 9',
  )
  expect(chess.perft(3)).toBe(9653)
})
test('perft - 960 - position 708', () => {
  const chess = new Chess(
    'rbbkq1nr/1p2pppp/p1p3nB/3p4/1Q1P4/6N1/PPP1PPPP/RB1K2NR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(43404)
})
test('perft - 960 - position 709', () => {
  const chess = new Chess(
    'rkbbq1nr/1pppp1p1/4np2/p6p/8/PP3P2/1KPPP1PP/R1BBQNNR w ha - 0 9',
  )
  expect(chess.perft(3)).toBe(15220)
})
test('perft - 960 - position 710', () => {
  const chess = new Chess(
    'r1bqn1nr/pkpppp1p/1p4pb/8/PN6/R7/1PPPPPPP/1KBQ1BNR w H - 2 9',
  )
  expect(chess.perft(3)).toBe(25450)
})
test('perft - 960 - position 711', () => {
  const chess = new Chess(
    'rkb1nnrb/1pppq1pp/p4p2/4p3/5P2/1P1PB3/P1P1P1PP/RK1QNNRB w GAga - 0 9',
  )
  expect(chess.perft(3)).toBe(17050)
})
test('perft - 960 - position 712', () => {
  const chess = new Chess(
    'rbkqbn1r/pppp1p1p/2n1p1p1/8/8/1P1PP1N1/P1P2PPP/RBKQB1NR w HAha - 1 9',
  )
  expect(chess.perft(3)).toBe(20308)
})
test('perft - 960 - position 713', () => {
  const chess = new Chess(
    'rkqbb1n1/pppppppr/8/6np/5P2/8/PPPPP1PP/RKQBBNNR w HAa - 6 9',
  )
  expect(chess.perft(3)).toBe(12154)
})
test('perft - 960 - position 714', () => {
  const chess = new Chess(
    'rkqnbbnr/ppppppp1/8/7p/3N4/6PP/PPPPPP2/RKQNBB1R w HAa - 0 9',
  )
  expect(chess.perft(3)).toBe(12495)
})
test('perft - 960 - position 715', () => {
  const chess = new Chess(
    'rkqnb1rb/p1p1pppp/1p1p4/2n5/3P4/2P1N1N1/PP2PPPP/RKQ1B1RB w GAga - 0 9',
  )
  expect(chess.perft(3)).toBe(29124)
})
test('perft - 960 - position 716', () => {
  const chess = new Chess(
    'rbk1nnbr/1ppq1ppp/p2p4/4p3/P3B2P/2P5/1P1PPPP1/R1KQNNBR w HAha - 2 9',
  )
  expect(chess.perft(3)).toBe(37265)
})
test('perft - 960 - position 717', () => {
  const chess = new Chess(
    'r1qbn1br/k1pppppp/6n1/pp6/5P1P/P7/1PPPP1PB/RKQBNN1R w HA - 1 9',
  )
  expect(chess.perft(3)).toBe(12867)
})
test('perft - 960 - position 718', () => {
  const chess = new Chess(
    'rkqnn1br/pppp3p/4p1pb/5p2/P2P4/7P/1PP1PPPB/RKQNNB1R w HAha - 1 9',
  )
  expect(chess.perft(3)).toBe(21249)
})
test('perft - 960 - position 719', () => {
  const chess = new Chess(
    'rk1nnrbb/p1p1pppp/1p6/3p1q2/P3P3/2NN4/1PPP1PPP/RKQ2RBB w FAfa - 3 9',
  )
  expect(chess.perft(3)).toBe(29087)
})
test('perft - 960 - position 720', () => {
  const chess = new Chess(
    'bbrk1q1r/ppppppp1/3n4/7p/3Pn3/6PN/PPP1PPNP/BBRK1Q1R w HChc - 2 9',
  )
  expect(chess.perft(3)).toBe(16551)
})
test('perft - 960 - position 721', () => {
  const chess = new Chess(
    'brkbnq1r/p1ppp2p/5ppn/1p6/5P2/1P1P2P1/P1P1P2P/BRKBNQNR w HBhb - 0 9',
  )
  expect(chess.perft(3)).toBe(24984)
})
test('perft - 960 - position 722', () => {
  const chess = new Chess(
    'br1k1bnr/ppppp1pp/4np2/1B2P2q/3P4/8/PPP2PPP/BRKNQ1NR w HB - 3 9',
  )
  expect(chess.perft(3)).toBe(40615)
})
test('perft - 960 - position 723', () => {
  const chess = new Chess(
    'brk1qnrb/pnppp1p1/1p6/5p1p/8/5PPP/PPPPP1R1/BRKNQN1B w Bgb - 0 9',
  )
  expect(chess.perft(3)).toBe(13111)
})
test('perft - 960 - position 724', () => {
  const chess = new Chess(
    'rbbkn1nr/1ppp2pp/p3p3/2q2p2/3P4/6P1/PPPBPP1P/RB1KNQNR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(31332)
})
test('perft - 960 - position 725', () => {
  const chess = new Chess(
    'rkbbn1nr/ppppp1pp/8/6N1/5p2/1q6/P1PPPPPP/RKBBN1QR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(1919)
})
test('perft - 960 - position 726', () => {
  const chess = new Chess(
    'rkb2bnr/pp2pppp/2p1n3/3p4/q2P4/5NP1/PPP1PP1P/RKBNQBR1 w Aha - 0 9',
  )
  expect(chess.perft(3)).toBe(24504)
})
test('perft - 960 - position 727', () => {
  const chess = new Chess(
    'rkbq1nrb/ppppppp1/7p/8/1P1n4/P4P1P/2PPP1P1/RKBNQNRB w GAga - 0 9',
  )
  expect(chess.perft(3)).toBe(17631)
})
test('perft - 960 - position 728', () => {
  const chess = new Chess(
    'rbknb1nr/ppp1qp1p/6p1/3pp3/3P3P/2B1P3/PPP2PP1/RBKN1QNR w HAha - 1 9',
  )
  expect(chess.perft(3)).toBe(24688)
})
test('perft - 960 - position 729', () => {
  const chess = new Chess(
    'rknbbq1r/p1pppppp/1p2N3/8/3n4/2P5/PP1PPPPP/RK1BBQNR w HAha - 4 9',
  )
  expect(chess.perft(3)).toBe(22138)
})
test('perft - 960 - position 730', () => {
  const chess = new Chess(
    'r1nqbbnr/1pppp1pp/1k6/p4p2/8/4P3/PPPP1PPP/RKN1BBNR w HA - 0 9',
  )
  expect(chess.perft(3)).toBe(17302)
})
test('perft - 960 - position 731', () => {
  const chess = new Chess(
    'rkn2qrb/ppp1pppp/6n1/1b1p4/1P6/4PPB1/P1PP2PP/RKNQ1NRB w GAga - 3 9',
  )
  expect(chess.perft(3)).toBe(14070)
})
test('perft - 960 - position 732', () => {
  const chess = new Chess(
    'rbkn2br/ppppp1p1/4np1p/1P5q/8/2P1N3/P2PPPPP/RBK1QNBR w HAha - 1 9',
  )
  expect(chess.perft(3)).toBe(29506)
})
test('perft - 960 - position 733', () => {
  const chess = new Chess(
    '1knbqnbr/1ppppp1p/r5p1/p7/7P/2PN2P1/PP1PPP2/RK1BQNBR w HAh - 2 9',
  )
  expect(chess.perft(3)).toBe(19395)
})
test('perft - 960 - position 734', () => {
  const chess = new Chess(
    'rk1qnbbr/pnpppp1p/6p1/1p6/3P4/1P6/P1P1PPPP/RKNQNBBR w HAha - 1 9',
  )
  expect(chess.perft(3)).toBe(11159)
})
test('perft - 960 - position 735', () => {
  const chess = new Chess(
    'rknqnrbb/pp1p2p1/5p1p/2p1p3/2P1P3/P2P4/1P3PPP/RKNQNRBB w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(18116)
})
test('perft - 960 - position 736', () => {
  const chess = new Chess(
    'bbrk2qr/pp1p1ppp/3n2n1/2p1p3/3P1P2/6N1/PPP1P1PP/BBRKN1QR w HChc - 0 9',
  )
  expect(chess.perft(3)).toBe(21521)
})
test('perft - 960 - position 737', () => {
  const chess = new Chess(
    'b1krnnqr/1p1ppppp/p1p5/b6B/P7/4P1N1/1PPP1PPP/BRK1N1QR w HB - 2 9',
  )
  expect(chess.perft(3)).toBe(16451)
})
test('perft - 960 - position 738', () => {
  const chess = new Chess(
    '1rknnbqr/3ppppp/p7/1pp5/4b2P/P4P2/1PPPP1PR/BRKNNBQ1 w Bhb - 1 9',
  )
  expect(chess.perft(3)).toBe(19746)
})
test('perft - 960 - position 739', () => {
  const chess = new Chess(
    'br1nn1rb/pppkpqpp/3p1p2/8/PP6/4N3/1KPPPPPP/BR2NQRB w - - 3 9',
  )
  expect(chess.perft(3)).toBe(17129)
})
test('perft - 960 - position 740', () => {
  const chess = new Chess(
    'rbbkn1qr/pppp2p1/6np/4pp2/7N/7P/PPPPPPPR/RBBK1NQ1 w Aha - 0 9',
  )
  expect(chess.perft(3)).toBe(14158)
})
test('perft - 960 - position 741', () => {
  const chess = new Chess(
    'rk1bn1qr/pppbpppp/4n3/4p3/4P3/5P2/PPPP2PP/RKBB1NQR w HAha - 1 9',
  )
  expect(chess.perft(3)).toBe(13440)
})
test('perft - 960 - position 742', () => {
  const chess = new Chess(
    'rkbnnbqr/1ppp1ppp/p7/4p3/8/QP3P2/P1PPP1PP/RKBNNB1R w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(21511)
})
test('perft - 960 - position 743', () => {
  const chess = new Chess(
    '1kbnnqrb/1pp1p1pp/r4p2/p2p4/N4P2/3P4/PPP1P1PP/RKB1NQRB w GAg - 2 9',
  )
  expect(chess.perft(3)).toBe(14979)
})
test('perft - 960 - position 744', () => {
  const chess = new Chess(
    'rbknbn1r/pppp1p1p/4p1q1/8/P1P3Pp/8/1P1PPP2/RBKNBNQR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(24959)
})
test('perft - 960 - position 745', () => {
  const chess = new Chess(
    'rk1bb1qr/2pppppp/p2nn3/1p4P1/6QP/8/PPPPPP2/RKNBBN1R w HAha - 2 9',
  )
  expect(chess.perft(3)).toBe(30124)
})
test('perft - 960 - position 746', () => {
  const chess = new Chess(
    'rkn1bbqr/p2ppppp/2p1n3/1p6/4PP2/6PP/PPPP4/RKNNBBQR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(22744)
})
test('perft - 960 - position 747', () => {
  const chess = new Chess(
    'rkn1bqrb/pnp1pppp/3p4/8/Pp6/1N2NP2/1PPPP1PP/RK2BQRB w GAga - 0 9',
  )
  expect(chess.perft(3)).toBe(17174)
})
test('perft - 960 - position 748', () => {
  const chess = new Chess(
    'rbk1n1br/ppp1ppqp/2n5/2Np2p1/8/2P5/PPBPPPPP/R1KN1QBR w HAha - 4 9',
  )
  expect(chess.perft(3)).toBe(30663)
})
test('perft - 960 - position 749', () => {
  const chess = new Chess(
    'rknbn1br/1ppp1ppp/p3p3/8/1q6/2P2N1P/P2PPPP1/RKNB1QBR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(3697)
})
test('perft - 960 - position 750', () => {
  const chess = new Chess(
    'rkn1qbbr/pp3ppp/4n3/2ppp3/4P1P1/P2P4/1PP2P1P/RKNNQBBR w HAha - 0 9',
  )
  expect(chess.perft(3)).toBe(24437)
})
test('perft - 960 - position 751', () => {
  const chess = new Chess(
    'rkn1qrbb/pp1ppp2/2p1n1p1/7p/2P2P1P/6P1/PP1PP3/RKNNQRBB w FAfa - 1 9',
  )
  expect(chess.perft(3)).toBe(27595)
})
test('perft - 960 - position 752', () => {
  const chess = new Chess(
    'b1rknnrq/bpppp1p1/p6p/5p1P/6P1/4N3/PPPPPP2/BBRKN1RQ w GCgc - 1 9',
  )
  expect(chess.perft(3)).toBe(28888)
})
test('perft - 960 - position 753', () => {
  const chess = new Chess(
    'brkb1nr1/pppppp2/3n2pp/3B4/1P6/4P3/PqPP1PPP/BRK1NNRQ w GBgb - 2 9',
  )
  expect(chess.perft(3)).toBe(2965)
})
test('perft - 960 - position 754', () => {
  const chess = new Chess(
    'brk1nbrq/1ppppn1p/6p1/p4p2/P5P1/5R2/1PPPPP1P/BRKNNB1Q w Bgb - 0 9',
  )
  expect(chess.perft(3)).toBe(27709)
})
test('perft - 960 - position 755', () => {
  const chess = new Chess(
    'brkn1rqb/1p1ppppp/3n4/p1p5/1P3P2/8/PNPPP1PP/BR1KNRQB w fb - 1 9',
  )
  expect(chess.perft(3)).toBe(19399)
})
test('perft - 960 - position 756', () => {
  const chess = new Chess(
    'rb1k1nrq/pbp1pppp/1p1p1n2/8/5P2/4NN1P/PPPPP1P1/RBBK2RQ w GAga - 2 9',
  )
  expect(chess.perft(3)).toBe(24056)
})
test('perft - 960 - position 757', () => {
  const chess = new Chess(
    'rkbbnnrq/p1pp3p/4p1p1/1p3p2/P6P/1P6/1BPPPPP1/RK1BNNRQ w GAga - 0 9',
  )
  expect(chess.perft(3)).toBe(30668)
})
test('perft - 960 - position 758', () => {
  const chess = new Chess(
    'rk2nbrq/p1ppppp1/bpn5/7p/6P1/2N2P2/PPPPP1QP/RKB1NBR1 w GAga - 2 9',
  )
  expect(chess.perft(3)).toBe(18206)
})
test('perft - 960 - position 759', () => {
  const chess = new Chess(
    'rkbn1r1b/pp1pppnp/6q1/2p3p1/5P1P/4N3/PPPPP1P1/RKB1NRQB w FAfa - 1 9',
  )
  expect(chess.perft(3)).toBe(21254)
})
test('perft - 960 - position 760', () => {
  const chess = new Chess(
    'rbknb1rq/ppp1p1p1/3pnp1p/8/6PP/2PP4/PP2PP2/RBKNBNRQ w GAga - 0 9',
  )
  expect(chess.perft(3)).toBe(26800)
})
test('perft - 960 - position 761', () => {
  const chess = new Chess(
    'rknbb1rq/p1pn1ppp/4p3/1p1p4/2P5/1P2N1P1/P2PPP1P/RKNBB1RQ w GAga - 1 9',
  )
  expect(chess.perft(3)).toBe(24798)
})
test('perft - 960 - position 762', () => {
  const chess = new Chess(
    'rk1nbbrq/pp1p1ppp/3n4/P3p3/2p4P/8/1PPPPPP1/RKNNBBRQ w GAga - 1 9',
  )
  expect(chess.perft(3)).toBe(12776)
})
test('perft - 960 - position 763', () => {
  const chess = new Chess(
    'rknnbr1b/ppp2pqp/3p4/4p1p1/7P/3P1P2/PPP1P1P1/RKNNBRQB w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(26408)
})
test('perft - 960 - position 764', () => {
  const chess = new Chess(
    'rb1k1rbq/ppppN1pp/2nn4/5p2/7P/8/PPPPPPP1/RBK1NRBQ w FA - 1 9',
  )
  expect(chess.perft(3)).toBe(22785)
})
test('perft - 960 - position 765', () => {
  const chess = new Chess(
    'r1nbnrbq/kppppp1p/6p1/8/p1PP1P2/4P3/PP4PP/RKNBNRBQ w FA - 1 9',
  )
  expect(chess.perft(3)).toBe(21198)
})
test('perft - 960 - position 766', () => {
  const chess = new Chess(
    'rkn1rbbq/p1pppppp/2n5/1pP5/8/1N2P3/PP1P1PPP/RK1NRBBQ w EAea - 1 9',
  )
  expect(chess.perft(3)).toBe(11890)
})
test('perft - 960 - position 767', () => {
  const chess = new Chess(
    'rknnrqbb/2pppppp/8/p7/Np3P2/3P4/PPP1P1PP/RKN1RQBB w EAea - 0 9',
  )
  expect(chess.perft(3)).toBe(14456)
})
test('perft - 960 - position 768', () => {
  const chess = new Chess(
    'bb1rknrn/1qppppp1/1p4B1/p6N/8/2P5/PP1PPPPP/B1QRK1RN w GDgd - 1 9',
  )
  expect(chess.perft(3)).toBe(22421)
})
test('perft - 960 - position 769', () => {
  const chess = new Chess(
    'b1rbknrn/qpp1ppp1/p6p/3p4/2P5/1P1P1P2/P3P1PP/BQRBKNRN w GCgc - 0 9',
  )
  expect(chess.perft(3)).toBe(24421)
})
test('perft - 960 - position 770', () => {
  const chess = new Chess(
    'bqkrnbrn/1pp1pp1p/p7/1B1p2p1/4P3/7P/PPPP1PP1/BQKRN1RN w - - 0 9',
  )
  expect(chess.perft(3)).toBe(18366)
})
test('perft - 960 - position 771', () => {
  const chess = new Chess(
    'bqrknrnb/1p2ppp1/p1pp3p/8/3P1P2/1PP5/P3P1PP/BQRKNRNB w FCfc - 0 9',
  )
  expect(chess.perft(3)).toBe(20686)
})
test('perft - 960 - position 772', () => {
  const chess = new Chess(
    'qbbrkn1r/pppppp1p/8/6p1/2P1Pn1P/6N1/PP1P1PP1/QBBRKNR1 w GDd - 3 9',
  )
  expect(chess.perft(3)).toBe(11581)
})
test('perft - 960 - position 773', () => {
  const chess = new Chess(
    '1rbbknr1/p1ppp1pp/1pq2pn1/8/3P4/P3P3/QPP2PPP/1RBBKNRN w GBgb - 3 9',
  )
  expect(chess.perft(3)).toBe(30581)
})
test('perft - 960 - position 774', () => {
  const chess = new Chess(
    'qrbkn1rn/pppp1ppp/8/6b1/P1P1Pp2/8/1P1P2PP/QRBKNBRN w GBgb - 0 9',
  )
  expect(chess.perft(3)).toBe(12447)
})
test('perft - 960 - position 775', () => {
  const chess = new Chess(
    'qrbk1rnb/p2ppp1p/5n2/1pp3p1/8/7P/PPPPPPPN/QRBKR1NB w Bfb - 0 9',
  )
  expect(chess.perft(3)).toBe(13448)
})
test('perft - 960 - position 776', () => {
  const chess = new Chess(
    'qbrkb1r1/ppp2ppp/3pn1n1/P3p3/4P3/3P4/1PP2PPP/QBRKBNRN w GCgc - 1 9',
  )
  expect(chess.perft(3)).toBe(20596)
})
test('perft - 960 - position 777', () => {
  const chess = new Chess(
    'qrkbb1r1/ppp1pnpp/3p2n1/5p2/1P3P2/2Q3N1/P1PPP1PP/1RKBB1RN w GBgb - 0 9',
  )
  expect(chess.perft(3)).toBe(32244)
})
test('perft - 960 - position 778', () => {
  const chess = new Chess(
    'qrknbbrn/ppp1ppp1/8/7p/2Bp4/4PPP1/PPPP3P/QRKNB1RN w GBgb - 0 9',
  )
  expect(chess.perft(3)).toBe(16168)
})
test('perft - 960 - position 779', () => {
  const chess = new Chess(
    'qrk1brnb/ppppp3/4n2p/5pp1/2PP4/2N4P/PP2PPP1/QRK1BRNB w FBfb - 2 9',
  )
  expect(chess.perft(3)).toBe(17447)
})
test('perft - 960 - position 780', () => {
  const chess = new Chess(
    'qbrknrb1/p2ppppp/2p3n1/8/p4P2/6PP/1PPPP3/QBRKNRBN w FCfc - 0 9',
  )
  expect(chess.perft(3)).toBe(23235)
})
test('perft - 960 - position 781', () => {
  const chess = new Chess(
    '1rkb1rbn/p1pp1ppp/3np3/1p6/4qP2/3NB3/PPPPPRPP/QRKB3N w Bfb - 0 9',
  )
  expect(chess.perft(3)).toBe(22585)
})
test('perft - 960 - position 782', () => {
  const chess = new Chess(
    '1rknrbbn/p1pp1p1p/8/1p2p1p1/4qPP1/2P5/PP1PP1BP/QRKNR1BN w EBeb - 0 9',
  )
  expect(chess.perft(3)).toBe(36355)
})
test('perft - 960 - position 783', () => {
  const chess = new Chess(
    'qrk1rn1b/ppppp2p/4n3/3b1pp1/4P2P/5BP1/PPPP1P2/QRKNRNB1 w EBeb - 3 9',
  )
  expect(chess.perft(3)).toBe(22189)
})
test('perft - 960 - position 784', () => {
  const chess = new Chess(
    'bbrqk1rn/pp1ppppp/8/2p5/2P1P3/5n1P/PPBP1PP1/B1RQKNRN w GCgc - 1 9',
  )
  expect(chess.perft(3)).toBe(2690)
})
test('perft - 960 - position 785', () => {
  const chess = new Chess(
    'brqbk2n/pppppprp/8/6p1/1P3n2/5P2/P1PPP1PP/R1QBKNRN w Gb - 2 9',
  )
  expect(chess.perft(3)).toBe(13255)
})
test('perft - 960 - position 786', () => {
  const chess = new Chess(
    'brqknbr1/pp3ppp/3p2n1/2p1p3/2P5/5P2/PPKPP1PP/BRQ1NBRN w gb - 0 9',
  )
  expect(chess.perft(3)).toBe(13190)
})
test('perft - 960 - position 787', () => {
  const chess = new Chess(
    '1rqknrnb/2pp1ppp/p3p3/1p6/P2P4/5bP1/1PP1PP1P/BRQKNRNB w FBfb - 0 9',
  )
  expect(chess.perft(3)).toBe(20052)
})
test('perft - 960 - position 788', () => {
  const chess = new Chess(
    'rbb1k1rn/p1pqpppp/6n1/1p1p4/5P2/3PP3/PPP1K1PP/RBBQ1NRN w ga - 3 9',
  )
  expect(chess.perft(3)).toBe(16773)
})
test('perft - 960 - position 789', () => {
  const chess = new Chess(
    'rqbbknr1/1ppp2pp/p5n1/4pp2/P7/1PP5/1Q1PPPPP/R1BBKNRN w GAga - 0 9',
  )
  expect(chess.perft(3)).toBe(15347)
})
test('perft - 960 - position 790', () => {
  const chess = new Chess(
    'rqbknbrn/2pppppp/6Q1/pp6/8/2P5/PP1PPPPP/R1BKNBRN w GAga - 2 9',
  )
  expect(chess.perft(3)).toBe(34100)
})
test('perft - 960 - position 791', () => {
  const chess = new Chess(
    'rqbknr1b/pp1ppp2/2p2n1p/6p1/8/3P1PPP/PPP1P3/RQBKNRNB w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(12275)
})
test('perft - 960 - position 792', () => {
  const chess = new Chess(
    'rbqkbnrn/p3pppp/1p6/3p4/P1p3P1/1P6/1QPPPP1P/RB1KBNRN w GAga - 0 9',
  )
  expect(chess.perft(3)).toBe(35865)
})
test('perft - 960 - position 793', () => {
  const chess = new Chess(
    'rqkbb1rn/p1p1pppn/1p1p4/7p/4PP2/7P/PPPPB1P1/RQK1BNRN w GAga - 1 9',
  )
  expect(chess.perft(3)).toBe(20804)
})
test('perft - 960 - position 794', () => {
  const chess = new Chess(
    'rqknbbrn/1p2pp1p/3p2p1/p1p5/P2P4/1P6/1KP1PPPP/RQ1NBBRN w ga - 0 9',
  )
  expect(chess.perft(3)).toBe(21655)
})
test('perft - 960 - position 795', () => {
  const chess = new Chess(
    'rqknbrnb/1pp3pp/5p2/p2pp3/P7/3PPN2/1PP2PPP/RQKNBR1B w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(19509)
})
test('perft - 960 - position 796', () => {
  const chess = new Chess(
    'rbqkr1bn/p1pppp1p/1p1n4/6p1/7P/3P1PP1/PPP1P3/RBQKNRBN w FAa - 0 9',
  )
  expect(chess.perft(3)).toBe(16282)
})
test('perft - 960 - position 797', () => {
  const chess = new Chess(
    'rqk1nrb1/ppbp1ppp/4p1n1/2p5/7P/1PP5/P2PPPP1/RQKBNRBN w FAfa - 1 9',
  )
  expect(chess.perft(3)).toBe(21480)
})
test('perft - 960 - position 798', () => {
  const chess = new Chess(
    'rqknrbbn/pp1p1ppp/4p3/2p5/3P2P1/7P/PPP1PP2/RQKNRBBN w EAa - 0 9',
  )
  expect(chess.perft(3)).toBe(11829)
})
test('perft - 960 - position 799', () => {
  const chess = new Chess(
    'rqknrnbb/pp1ppp1p/2p3p1/8/8/1P2P1NP/P1PP1PP1/RQKNR1BB w EAea - 0 9',
  )
  expect(chess.perft(3)).toBe(14480)
})
test('perft - 960 - position 800', () => {
  const chess = new Chess(
    '1brkq1rn/2pppppp/1p2n3/p2bN3/8/7P/PPPPPPP1/BBRKQ1RN w GCgc - 2 9',
  )
  expect(chess.perft(3)).toBe(20134)
})
test('perft - 960 - position 801', () => {
  const chess = new Chess(
    'brkbqnrn/2pp1ppp/8/1p2p3/Pp2N3/8/2PPPPPP/BRKBQNR1 w GBgb - 0 9',
  )
  expect(chess.perft(3)).toBe(25308)
})
test('perft - 960 - position 802', () => {
  const chess = new Chess(
    'brk1nbrn/pp1ppppp/2p5/7P/5P2/q2P4/PPP1P1P1/BRKQNBRN w GBgb - 1 9',
  )
  expect(chess.perft(3)).toBe(8716)
})
test('perft - 960 - position 803', () => {
  const chess = new Chess(
    'brkqnrnb/1p1pp1p1/p4p2/2p4p/8/P2PP3/1PP1QPPP/BRK1NRNB w FBfb - 0 9',
  )
  expect(chess.perft(3)).toBe(12584)
})
test('perft - 960 - position 804', () => {
  const chess = new Chess(
    'rbbkqnrn/2ppp2p/pp3p2/6p1/P6P/8/RPPPPPP1/1BBKQNRN w Gga - 0 9',
  )
  expect(chess.perft(3)).toBe(12125)
})
test('perft - 960 - position 805', () => {
  const chess = new Chess(
    'rkbbqr1n/1ppppppn/7p/p7/4P3/2P2P2/PP1PB1PP/RKB1QNRN w GAa - 3 9',
  )
  expect(chess.perft(3)).toBe(16026)
})
test('perft - 960 - position 806', () => {
  const chess = new Chess(
    'rkbqnbrn/ppppp3/8/5ppp/2P3P1/7P/PPQPPP2/RKB1NBRN w GAga - 0 9',
  )
  expect(chess.perft(3)).toBe(19250)
})
test('perft - 960 - position 807', () => {
  const chess = new Chess(
    'rkb1nrnb/pppp1pp1/5q1p/8/P3p3/4R1P1/1PPPPP1P/1KBQNRNB w Ffa - 0 9',
  )
  expect(chess.perft(3)).toBe(23690)
})
test('perft - 960 - position 808', () => {
  const chess = new Chess(
    'rbkqb1rn/1p1ppppp/4n3/p1p5/8/3PBP2/PPP1P1PP/RBKQ1NRN w GAga - 0 9',
  )
  expect(chess.perft(3)).toBe(21416)
})
test('perft - 960 - position 809', () => {
  const chess = new Chess(
    'rk1qbnrn/1p1ppppp/1b6/p1p5/P7/2P3NP/1P1PPPP1/RKQBB1RN w GAga - 0 9',
  )
  expect(chess.perft(3)).toBe(12313)
})
test('perft - 960 - position 810', () => {
  const chess = new Chess(
    'rk1nbbrn/ppp1ppp1/8/3p3p/1P1P2q1/5PB1/P1P1P1PP/RKQN1BRN w GAga - 1 9',
  )
  expect(chess.perft(3)).toBe(29219)
})
test('perft - 960 - position 811', () => {
  const chess = new Chess(
    'rkqnbr1b/pp1pppp1/7p/2p2n2/P2P4/7N/RPP1PPPP/1KQNBR1B w Ffa - 0 9',
  )
  expect(chess.perft(3)).toBe(24267)
})
test('perft - 960 - position 812', () => {
  const chess = new Chess(
    'rbkq1rbn/2p1pppp/pp3n2/3p4/5P2/3N2N1/PPPPP1PP/RBKQR1B1 w Afa - 2 9',
  )
  expect(chess.perft(3)).toBe(18027)
})
test('perft - 960 - position 813', () => {
  const chess = new Chess(
    'rkqbr1bn/p2ppppp/1pp2n2/8/5P2/3P1N2/PPP1PRPP/RKQB2BN w Aa - 3 9',
  )
  expect(chess.perft(3)).toBe(14593)
})
test('perft - 960 - position 814', () => {
  const chess = new Chess(
    'rk1qrbbn/p1ppp1pp/1p2n3/5p2/1P6/K3N3/P1PPPPPP/R1Q1RBBN w ea - 0 9',
  )
  expect(chess.perft(3)).toBe(14069)
})
test('perft - 960 - position 815', () => {
  const chess = new Chess(
    'rkqnrnbb/pp1pp3/2p5/5ppp/8/PP4NP/2PPPPP1/RKQNR1BB w EAea - 0 9',
  )
  expect(chess.perft(3)).toBe(18228)
})
test('perft - 960 - position 816', () => {
  const chess = new Chess(
    'bbrknq1r/ppppppp1/8/7p/5n2/3P4/PPP1PNPP/BBKRNQR1 w c - 0 9',
  )
  expect(chess.perft(3)).toBe(13300)
})
test('perft - 960 - position 817', () => {
  const chess = new Chess(
    'brkbnqr1/2pppnpp/pp3p2/8/4PPPP/8/PPPP4/BRKBNQRN w GBgb - 1 9',
  )
  expect(chess.perft(3)).toBe(23908)
})
test('perft - 960 - position 818', () => {
  const chess = new Chess(
    'brk1qb1n/ppppppr1/2n3pp/8/2P3P1/2N5/PP1PPP1P/BR1KQBRN w b - 1 9',
  )
  expect(chess.perft(3)).toBe(15537)
})
test('perft - 960 - position 819', () => {
  const chess = new Chess(
    'brknq1nb/pp2prpp/8/2pP1p2/6P1/2N5/PPPP1P1P/BRK1QRNB w FBb - 1 9',
  )
  expect(chess.perft(3)).toBe(27897)
})
test('perft - 960 - position 820', () => {
  const chess = new Chess(
    'rbbk1qrn/ppp1p1pp/5p2/3p1n2/7N/P7/1PPPPPPP/RBB1KQRN w ga - 0 9',
  )
  expect(chess.perft(3)).toBe(13060)
})
test('perft - 960 - position 821', () => {
  const chess = new Chess(
    'rk1b1qrn/ppp1pppp/5n2/3pN3/P6P/7b/1PPPPPP1/RKBB1QRN w GAga - 4 9',
  )
  expect(chess.perft(3)).toBe(19235)
})
test('perft - 960 - position 822', () => {
  const chess = new Chess(
    'rkbnqbrn/pp1ppp1p/2p5/6p1/P7/4P3/KPPPQPPP/R1BN1BRN w - - 3 9',
  )
  expect(chess.perft(3)).toBe(17443)
})
test('perft - 960 - position 823', () => {
  const chess = new Chess(
    'rk1nqrnb/pbpppp2/1p4p1/7p/P7/5NP1/1PPPPPBP/RKBNQR2 w FAfa - 2 9',
  )
  expect(chess.perft(3)).toBe(21626)
})
test('perft - 960 - position 824', () => {
  const chess = new Chess(
    'rbknb1rn/p1pp2pp/1p6/4pp2/1q3P1B/2N5/PPPPPNPP/RBK2QR1 w GAga - 2 9',
  )
  expect(chess.perft(3)).toBe(36940)
})
test('perft - 960 - position 825', () => {
  const chess = new Chess(
    'rk1bbqrn/pp1pp1pp/3n4/5p2/3p4/1PP5/PK2PPPP/R1NBBQRN w ga - 0 9',
  )
  expect(chess.perft(3)).toBe(14059)
})
test('perft - 960 - position 826', () => {
  const chess = new Chess(
    'rknqbbr1/p1pp1pp1/1p4n1/4p2p/4P1P1/6RB/PPPP1P1P/RKNQB2N w Aga - 0 9',
  )
  expect(chess.perft(3)).toBe(20918)
})
test('perft - 960 - position 827', () => {
  const chess = new Chess(
    'rknqbr1b/pppp1ppp/4p2n/8/1P3P2/4P3/P1PPN1PP/RKNQBR1B w FAfa - 2 9',
  )
  expect(chess.perft(3)).toBe(17177)
})
test('perft - 960 - position 828', () => {
  const chess = new Chess(
    'r2kqrbn/bppppppp/2n5/p4B2/5P2/2P5/PP1PP1PP/1RKNQRBN w F - 2 9',
  )
  expect(chess.perft(3)).toBe(37800)
})
test('perft - 960 - position 829', () => {
  const chess = new Chess(
    'rk1bqrb1/ppppppp1/1n6/7p/2P2P1n/4P1Q1/PP1P2PP/RKNB1RBN w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(25817)
})
test('perft - 960 - position 830', () => {
  const chess = new Chess(
    'rkq1rb1n/ppppp1pp/1n6/5p2/PPb2P2/8/1KPPP1PP/R1NQRBBN w ea - 1 9',
  )
  expect(chess.perft(3)).toBe(21009)
})
test('perft - 960 - position 831', () => {
  const chess = new Chess(
    'rknqr2b/pppnp1pp/3p4/3b1p2/8/1N1P2N1/PPP1PPPP/RKQ1R1BB w EAea - 1 9',
  )
  expect(chess.perft(3)).toBe(23708)
})
test('perft - 960 - position 832', () => {
  const chess = new Chess(
    'bbrknrqn/ppppp1pB/8/2P2p1p/8/5N2/PP1PPPPP/B1RK1RQN w FCfc - 0 9',
  )
  expect(chess.perft(3)).toBe(23923)
})
test('perft - 960 - position 833', () => {
  const chess = new Chess(
    'brkbnrq1/1pppp1p1/6np/p4p2/4P3/1PP5/P1KP1PPP/BR1BNRQN w fb - 1 9',
  )
  expect(chess.perft(3)).toBe(19329)
})
test('perft - 960 - position 834', () => {
  const chess = new Chess(
    'brknrbq1/1p1p1ppp/p3p1n1/2p5/8/1P1BPP2/P1PP2PP/BRKNR1QN w EBeb - 0 9',
  )
  expect(chess.perft(3)).toBe(27868)
})
test('perft - 960 - position 835', () => {
  const chess = new Chess(
    'brknrqnb/p2ppp1p/2p5/1p6/3P2p1/P1P1N3/1P2PPPP/BRK1RQNB w EBeb - 0 9',
  )
  expect(chess.perft(3)).toBe(15169)
})
test('perft - 960 - position 836', () => {
  const chess = new Chess(
    'rbbk1rqn/1ppppppp/3n4/p7/2P5/3N4/PP1PPPPP/RBB1KRQN w fa - 1 9',
  )
  expect(chess.perft(3)).toBe(11094)
})
test('perft - 960 - position 837', () => {
  const chess = new Chess(
    'rkbbnrqn/p2p1ppp/1p2p3/8/P1p1P3/1BP5/1P1P1PPP/RKB1NRQN w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(13295)
})
test('perft - 960 - position 838', () => {
  const chess = new Chess(
    'rkb1rb1n/ppppppqp/8/2n3p1/2P1P1P1/8/PP1P1P1P/RKBNRBQN w EAea - 1 9',
  )
  expect(chess.perft(3)).toBe(16212)
})
test('perft - 960 - position 839', () => {
  const chess = new Chess(
    'rkb1rqnb/pppp3p/2n3p1/4pp2/P2P3P/2P5/1P2PPP1/RKBNRQNB w EAea - 0 9',
  )
  expect(chess.perft(3)).toBe(22188)
})
test('perft - 960 - position 840', () => {
  const chess = new Chess(
    'rbk1brqn/ppp1pppp/8/3p4/7P/1P4P1/2PPPP2/RBKNBRQN w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(13862)
})
test('perft - 960 - position 841', () => {
  const chess = new Chess(
    'rknbbrqn/pp3pp1/4p3/2pp3p/2P5/8/PPBPPPPP/RKN1BRQN w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(19280)
})
test('perft - 960 - position 842', () => {
  const chess = new Chess(
    '1knrbbqn/rp1p1ppp/p3p3/2p5/8/5P1P/PPPPP1P1/RKNRBBQN w DAd - 0 9',
  )
  expect(chess.perft(3)).toBe(15194)
})
test('perft - 960 - position 843', () => {
  const chess = new Chess(
    'rknr1qnb/ppp1p1pp/3p2b1/8/4p3/1P3P1P/P1PP2P1/RKNRBQNB w DAda - 0 9',
  )
  expect(chess.perft(3)).toBe(18969)
})
test('perft - 960 - position 844', () => {
  const chess = new Chess(
    'rbk1r1bn/ppppp1pp/4n3/5p2/1P3P2/4N2P/PqPPP1P1/RBK1RQBN w EAea - 1 9',
  )
  expect(chess.perft(3)).toBe(1319)
})
test('perft - 960 - position 845', () => {
  const chess = new Chess(
    'r1nbrqbn/k1ppp1pp/1p6/p4p2/2P5/6PQ/PP1PPP1P/RKNBR1BN w EA - 0 9',
  )
  expect(chess.perft(3)).toBe(20436)
})
test('perft - 960 - position 846', () => {
  const chess = new Chess(
    'rknrqbbn/1pp1pp2/p5p1/3p3p/6P1/PN5P/1PPPPP2/RK1RQBBN w DAda - 0 9',
  )
  expect(chess.perft(3)).toBe(15515)
})
test('perft - 960 - position 847', () => {
  const chess = new Chess(
    'rknrqn1b/p1pp1ppb/8/1p2p1Qp/3P4/3N4/PPP1PPPP/RK1R1NBB w DAda - 0 9',
  )
  expect(chess.perft(3)).toBe(48283)
})
test('perft - 960 - position 848', () => {
  const chess = new Chess(
    'bbkrnrnq/p2p1ppp/2p1p3/1p6/1P2Q3/6P1/P1PPPP1P/BBKRNRN1 w - - 0 9',
  )
  expect(chess.perft(3)).toBe(39895)
})
test('perft - 960 - position 849', () => {
  const chess = new Chess(
    'brkbnr2/1ppppp1p/7n/p5N1/P2q4/8/1PPPPPPP/BRKBNRQ1 w FBfb - 1 9',
  )
  expect(chess.perft(3)).toBe(19234)
})
test('perft - 960 - position 850', () => {
  const chess = new Chess(
    'brknrbnq/p1ppppp1/1p6/7p/2PP4/5P2/PPK1P1PP/BR1NRBNQ w eb - 1 9',
  )
  expect(chess.perft(3)).toBe(14748)
})
test('perft - 960 - position 851', () => {
  const chess = new Chess(
    'brk1r1qb/pp1ppnpp/2p2pn1/8/6N1/2N3P1/PPPPPP1P/BRK1R1QB w EBeb - 3 9',
  )
  expect(chess.perft(3)).toBe(28379)
})
test('perft - 960 - position 852', () => {
  const chess = new Chess(
    'rbbk1rnq/pppp1pp1/4p2p/8/3P2n1/4BN1P/PPP1PPP1/RB1K1RNQ w FAfa - 3 9',
  )
  expect(chess.perft(3)).toBe(16151)
})
test('perft - 960 - position 853', () => {
  const chess = new Chess(
    'rkbbnr1q/p1pppppp/5n2/1p5B/PP6/4P3/2PP1PPP/RKB1NRNQ w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(21036)
})
test('perft - 960 - position 854', () => {
  const chess = new Chess(
    'rkb1rbnq/1pppp1pp/5p2/p7/5n1P/1PN3P1/P1PPPP2/RKB1RBNQ w EAea - 0 9',
  )
  expect(chess.perft(3)).toBe(27130)
})
test('perft - 960 - position 855', () => {
  const chess = new Chess(
    'rkbnrnqb/1ppp1p1p/p5p1/4p3/4P3/2N2P2/PPPP2PP/RKBR1NQB w Aea - 0 9',
  )
  expect(chess.perft(3)).toBe(13300)
})
test('perft - 960 - position 856', () => {
  const chess = new Chess(
    'rbknbr1q/pppp2pp/4p3/5p1n/1P2P2N/8/P1PP1PPP/RBKNBR1Q w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(13799)
})
test('perft - 960 - position 857', () => {
  const chess = new Chess(
    'rknbb1nq/pppppr2/5pp1/7p/8/1N4P1/PPPPPP1P/RK1BBRNQ w FAa - 2 9',
  )
  expect(chess.perft(3)).toBe(15618)
})
test('perft - 960 - position 858', () => {
  const chess = new Chess(
    'rknr1bnq/p2pp1pp/1p3p2/2p4b/6PP/2P2N2/PP1PPP2/RKNRBB1Q w DAda - 1 9',
  )
  expect(chess.perft(3)).toBe(13150)
})
test('perft - 960 - position 859', () => {
  const chess = new Chess(
    'rknrb1qb/ppp1pppp/3p4/8/4P1nP/2P5/PPKP1PP1/R1NRBNQB w da - 1 9',
  )
  expect(chess.perft(3)).toBe(14849)
})
test('perft - 960 - position 860', () => {
  const chess = new Chess(
    'rbk1rnbq/pppp1npp/4p3/5p2/4P1P1/7P/PPPP1P1N/RBKNR1BQ w EAea - 1 9',
  )
  expect(chess.perft(3)).toBe(15178)
})
test('perft - 960 - position 861', () => {
  const chess = new Chess(
    'rknbrnb1/p1pppp1p/1p6/3N2p1/P3q1P1/8/1PPPPP1P/RKNBR1BQ w EAea - 1 9',
  )
  expect(chess.perft(3)).toBe(27343)
})
test('perft - 960 - position 862', () => {
  const chess = new Chess(
    'rknrn1b1/ppppppqp/8/6p1/2P5/2P1BP2/PP2P1PP/RKNRNB1Q w DAda - 1 9',
  )
  expect(chess.perft(3)).toBe(24360)
})
test('perft - 960 - position 863', () => {
  const chess = new Chess(
    '1k1rnqbb/npppppp1/r7/p2B3p/5P2/1N4P1/PPPPP2P/RK1RNQB1 w DAd - 0 9',
  )
  expect(chess.perft(3)).toBe(44297)
})
test('perft - 960 - position 864', () => {
  const chess = new Chess(
    'bbqr1rkn/pp1ppppp/8/2p5/1P2P1n1/7N/P1PP1P1P/BBQRKR1N w FD - 0 9',
  )
  expect(chess.perft(3)).toBe(22986)
})
test('perft - 960 - position 865', () => {
  const chess = new Chess(
    'bqkr1rnn/1ppp1ppp/p4b2/4p3/P7/3PP2N/1PP2PPP/BQRBKR1N w FC - 3 9',
  )
  expect(chess.perft(3)).toBe(12802)
})
test('perft - 960 - position 866', () => {
  const chess = new Chess(
    'bqrkrbnn/1pp1ppp1/8/p6p/3p4/P3P2P/QPPP1PP1/B1RKRBNN w ECec - 0 9',
  )
  expect(chess.perft(3)).toBe(18585)
})
test('perft - 960 - position 867', () => {
  const chess = new Chess(
    'bqkrrnnb/2p1pppp/p7/1P1p4/8/2R3P1/PP1PPP1P/BQ1KRNNB w E - 0 9',
  )
  expect(chess.perft(3)).toBe(45187)
})
test('perft - 960 - position 868', () => {
  const chess = new Chess(
    'qbbrkrn1/p1pppn1p/8/1p3Pp1/2P5/8/PP1PPP1P/QBBRKRNN w FDfd - 0 9',
  )
  expect(chess.perft(3)).toBe(13244)
})
test('perft - 960 - position 869', () => {
  const chess = new Chess(
    'qrbbkrnn/pp1p2pp/4p3/5p2/2p2P1P/2P5/PP1PP1P1/QRBBKRNN w FBfb - 0 9',
  )
  expect(chess.perft(3)).toBe(12736)
})
test('perft - 960 - position 870', () => {
  const chess = new Chess(
    'qrbkrbn1/1pp1pppp/p2p4/8/5PPn/2P5/PP1PP3/QRBKRBNN w EBeb - 0 9',
  )
  expect(chess.perft(3)).toBe(9443)
})
test('perft - 960 - position 871', () => {
  const chess = new Chess(
    'qrb1rnnb/pp1p1ppp/2pk4/4p3/1P2P3/1R6/P1PP1PPP/Q1BKRNNB w E - 4 9',
  )
  expect(chess.perft(3)).toBe(26863)
})
test('perft - 960 - position 872', () => {
  const chess = new Chess(
    'qbrkbrn1/p1pppp1p/6n1/1p4p1/1P6/5P2/P1PPPBPP/QBRK1RNN w FCfc - 1 9',
  )
  expect(chess.perft(3)).toBe(27385)
})
test('perft - 960 - position 873', () => {
  const chess = new Chess(
    'qrkbbr2/2pppppp/5nn1/pp1Q4/P7/3P4/1PP1PPPP/1RKBBRNN w FBfb - 0 9',
  )
  expect(chess.perft(3)).toBe(44012)
})
test('perft - 960 - position 874', () => {
  const chess = new Chess(
    'qrkrbbnn/pp2pp2/2pp2pp/1B6/P7/4P3/1PPP1PPP/QRKRB1NN w DBdb - 0 9',
  )
  expect(chess.perft(3)).toBe(12653)
})
test('perft - 960 - position 875', () => {
  const chess = new Chess(
    'qrkrbnnb/p1pp1pp1/1p5p/4p3/1P6/6PN/PKPPPP1P/QR1RBN1B w db - 0 9',
  )
  expect(chess.perft(3)).toBe(20000)
})
test('perft - 960 - position 876', () => {
  const chess = new Chess(
    'qbrkr1bn/p1p1pp1p/1p1p2n1/6p1/3P1P2/4P3/PPP3PP/QBKRRNBN w ec - 2 9',
  )
  expect(chess.perft(3)).toBe(14835)
})
test('perft - 960 - position 877', () => {
  const chess = new Chess(
    'qrk1rnb1/p1pp1ppp/1p2Bbn1/8/4P3/6P1/PPPP1P1P/QRK1RNBN w EBeb - 1 9',
  )
  expect(chess.perft(3)).toBe(24887)
})
test('perft - 960 - position 878', () => {
  const chess = new Chess(
    '1qkrnbbn/1rpppppp/pp6/5N2/P4P2/8/1PPPP1PP/QRKRNBB1 w DBd - 3 9',
  )
  expect(chess.perft(3)).toBe(16646)
})
test('perft - 960 - position 879', () => {
  const chess = new Chess(
    'qrkr2bb/pppppppp/8/1n2n3/1N5P/1P6/P1PPPPP1/QRKR1NBB w DBdb - 1 9',
  )
  expect(chess.perft(3)).toBe(21048)
})
test('perft - 960 - position 880', () => {
  const chess = new Chess(
    'bbrqkrnn/3ppppp/8/ppp5/6P1/4P2N/PPPPKP1P/BBRQ1R1N w fc - 0 9',
  )
  expect(chess.perft(3)).toBe(16119)
})
test('perft - 960 - position 881', () => {
  const chess = new Chess(
    'brqbkrnn/1pp2p1p/3pp1p1/p5N1/8/1P6/P1PPPPPP/BRQBK1RN w Bfb - 0 9',
  )
  expect(chess.perft(3)).toBe(22827)
})
test('perft - 960 - position 882', () => {
  const chess = new Chess(
    'br1krb1n/2qppppp/pp3n2/8/1P4P1/8/P1PPPP1P/1RQKRBNN w EBeb - 0 9',
  )
  expect(chess.perft(3)).toBe(23943)
})
test('perft - 960 - position 883', () => {
  const chess = new Chess(
    'brqkr1nb/2ppp1pp/1p2np2/p7/2P1PN2/8/PP1P1PPP/BRQKRN1B w EBeb - 0 9',
  )
  expect(chess.perft(3)).toBe(19728)
})
test('perft - 960 - position 884', () => {
  const chess = new Chess(
    'rbbqkrnn/3pppp1/p7/1pp4p/2P1P2P/8/PP1P1PP1/RBBQKRNN w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(18164)
})
test('perft - 960 - position 885', () => {
  const chess = new Chess(
    'rqbbkr1n/pp1p1p1p/4pn2/2p3p1/4P1P1/3P3P/PPP2P2/RQBBKRNN w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(14629)
})
test('perft - 960 - position 886', () => {
  const chess = new Chess(
    'rqbkrbnn/p1ppp3/1p3pp1/7p/3P4/P1P5/1PQ1PPPP/R1BKRBNN w EAea - 0 9',
  )
  expect(chess.perft(3)).toBe(20339)
})
test('perft - 960 - position 887', () => {
  const chess = new Chess(
    'rqbkrnn1/pp2ppbp/3p4/2p3p1/2P5/1P3N1P/P2PPPP1/RQBKRN1B w EAea - 1 9',
  )
  expect(chess.perft(3)).toBe(28732)
})
test('perft - 960 - position 888', () => {
  const chess = new Chess(
    'rbqkb1nn/1ppppr1p/p5p1/5p2/1P6/2P4P/P1KPPPP1/RBQ1BRNN w a - 1 9',
  )
  expect(chess.perft(3)).toBe(10403)
})
test('perft - 960 - position 889', () => {
  const chess = new Chess(
    'rqkb1rnn/1pp1pp1p/p5p1/1b1p4/3P4/P5P1/RPP1PP1P/1QKBBRNN w Ffa - 1 9',
  )
  expect(chess.perft(3)).toBe(11592)
})
test('perft - 960 - position 890', () => {
  const chess = new Chess(
    'rq1rbbnn/pkp1ppp1/3p3p/1p2N1P1/8/8/PPPPPP1P/RQKRBB1N w DA - 0 9',
  )
  expect(chess.perft(3)).toBe(16419)
})
test('perft - 960 - position 891', () => {
  const chess = new Chess(
    'rqkrb2b/p2ppppp/2p3nn/1p6/5P2/PP1P4/2P1P1PP/RQKRBNNB w DAda - 1 9',
  )
  expect(chess.perft(3)).toBe(21563)
})
test('perft - 960 - position 892', () => {
  const chess = new Chess(
    'rbqkr1bn/pp1ppp2/2p1n2p/6p1/8/4BPNP/PPPPP1P1/RBQKRN2 w EAea - 0 9',
  )
  expect(chess.perft(3)).toBe(15082)
})
test('perft - 960 - position 893', () => {
  const chess = new Chess(
    'rqkbrnb1/2ppp1pp/pp3pn1/8/5P2/B2P4/PPP1P1PP/RQKBRN1N w EAea - 2 9',
  )
  expect(chess.perft(3)).toBe(13541)
})
test('perft - 960 - position 894', () => {
  const chess = new Chess(
    'rqkrnbb1/p1p1pppp/1p4n1/3p4/7P/P3P3/1PPPBPP1/RQKRN1BN w DAda - 0 9',
  )
  expect(chess.perft(3)).toBe(15565)
})
test('perft - 960 - position 895', () => {
  const chess = new Chess(
    'rqkrn1bb/p1ppp1pp/4n3/1p6/6p1/4N3/PPPPPPPP/RQKR2BB w DAda - 0 9',
  )
  expect(chess.perft(3)).toBe(10234)
})
test('perft - 960 - position 896', () => {
  const chess = new Chess(
    'bbrkqr2/pppp1ppp/6nn/8/2P1p3/3PP2N/PP3PPP/BBRKQR1N w FCfc - 0 9',
  )
  expect(chess.perft(3)).toBe(21688)
})
test('perft - 960 - position 897', () => {
  const chess = new Chess(
    'brk1qrnn/1pppbppp/4p3/8/1p6/P1P4P/3PPPP1/BRKBQRNN w FBfb - 1 9',
  )
  expect(chess.perft(3)).toBe(16920)
})
test('perft - 960 - position 898', () => {
  const chess = new Chess(
    '1r1qrbnn/p1pkpppp/1p1p4/8/3P1PP1/P4b2/1PP1P2P/BRKQRBNN w EB - 1 9',
  )
  expect(chess.perft(3)).toBe(17021)
})
test('perft - 960 - position 899', () => {
  const chess = new Chess(
    '1rkqrnnb/p1p1p1pp/1p1p4/3b1p1N/4P3/5N2/PPPP1PPP/BRKQR2B w EBeb - 1 9',
  )
  expect(chess.perft(3)).toBe(27035)
})
test('perft - 960 - position 900', () => {
  const chess = new Chess(
    'rbbkq1rn/pppppppp/7n/8/P7/3P3P/1PPKPPP1/RBB1QRNN w a - 3 9',
  )
  expect(chess.perft(3)).toBe(9900)
})
test('perft - 960 - position 901', () => {
  const chess = new Chess(
    'rkbbqr1n/1p1pppp1/2p2n2/p4NBp/8/3P4/PPP1PPPP/RK1BQRN1 w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(30533)
})
test('perft - 960 - position 902', () => {
  const chess = new Chess(
    'rkbqrb1n/3pBppp/ppp2n2/8/8/P2P4/1PP1PPPP/RK1QRBNN w EAea - 0 9',
  )
  expect(chess.perft(3)).toBe(19718)
})
test('perft - 960 - position 903', () => {
  const chess = new Chess(
    'rkb1rn1b/ppppqppp/4p3/8/1P2n1P1/5Q2/P1PP1P1P/RKB1RNNB w EAea - 2 9',
  )
  expect(chess.perft(3)).toBe(40114)
})
test('perft - 960 - position 904', () => {
  const chess = new Chess(
    'r1kqbrnn/pp1pp1p1/7p/2P2p2/5b2/3P4/P1P1P1PP/RBKQBRNN w FAfa - 0 9',
  )
  expect(chess.perft(3)).toBe(4745)
})
test('perft - 960 - position 905', () => {
  const chess = new Chess(
    'rkqbbr1n/ppp1ppp1/8/Q2p3p/4n3/3P1P2/PPP1P1PP/RK1BBRNN w FAfa - 2 9',
  )
  expect(chess.perft(3)).toBe(40433)
})
test('perft - 960 - position 906', () => {
  const chess = new Chess(
    'rkqrbbn1/p1ppppp1/Bp5p/8/P6n/2P1P3/1P1P1PPP/RKQRB1NN w DAda - 0 9',
  )
  expect(chess.perft(3)).toBe(15488)
})
test('perft - 960 - position 907', () => {
  const chess = new Chess(
    'rkqrb1nb/1ppp1ppp/p7/4p3/5n2/3P2N1/PPPQPPPP/RK1RB1NB w DAda - 0 9',
  )
  expect(chess.perft(3)).toBe(19877)
})
test('perft - 960 - position 908', () => {
  const chess = new Chess(
    'rbkqrnbn/pppp1p2/4p1p1/7p/7P/P2P4/BPP1PPP1/R1KQRNBN w EAea - 0 9',
  )
  expect(chess.perft(3)).toBe(13992)
})
test('perft - 960 - position 909', () => {
  const chess = new Chess(
    'rkqbrnbn/pp1ppp2/8/2p3p1/P1P4p/5P2/1PKPP1PP/R1QBRNBN w ea - 0 9',
  )
  expect(chess.perft(3)).toBe(16843)
})
test('perft - 960 - position 910', () => {
  const chess = new Chess(
    'rkqrnbbn/1p2pp1p/3p2p1/p1p5/P5PP/3N4/1PPPPP2/RKQR1BBN w DAda - 0 9',
  )
  expect(chess.perft(3)).toBe(15512)
})
test('perft - 960 - position 911', () => {
  const chess = new Chess(
    'rk2rnbb/ppqppppp/2pn4/8/1P3P2/6P1/P1PPP1NP/RKQR1NBB w DAa - 1 9',
  )
  expect(chess.perft(3)).toBe(20206)
})
test('perft - 960 - position 912', () => {
  const chess = new Chess(
    'b1krrqnn/pp1ppp1p/2p3p1/8/P3Pb1P/1P6/2PP1PP1/BBRKRQNN w EC - 0 9',
  )
  expect(chess.perft(3)).toBe(30759)
})
test('perft - 960 - position 913', () => {
  const chess = new Chess(
    '1rkbrqnn/p1pp1ppp/1p6/8/P2Pp3/8/1PPKPPQP/BR1BR1NN w eb - 0 9',
  )
  expect(chess.perft(3)).toBe(24892)
})
test('perft - 960 - position 914', () => {
  const chess = new Chess(
    'brkrqb1n/1pppp1pp/p7/3n1p2/P5P1/3PP3/1PP2P1P/BRKRQBNN w DBdb - 0 9',
  )
  expect(chess.perft(3)).toBe(18682)
})
test('perft - 960 - position 915', () => {
  const chess = new Chess(
    'brkrqnnb/3pppp1/1p6/p1p4p/2P3P1/6N1/PP1PPP1P/BRKRQ1NB w DBdb - 0 9',
  )
  expect(chess.perft(3)).toBe(20042)
})
test('perft - 960 - position 916', () => {
  const chess = new Chess(
    'r1bkrq1n/pp2pppp/3b1n2/2pp2B1/6P1/3P1P2/PPP1P2P/RB1KRQNN w EAea - 2 9',
  )
  expect(chess.perft(3)).toBe(22848)
})
test('perft - 960 - position 917', () => {
  const chess = new Chess(
    'rk1brq1n/p1p1pppp/3p1n2/1p3b2/4P3/2NQ4/PPPP1PPP/RKBBR2N w EAea - 4 9',
  )
  expect(chess.perft(3)).toBe(35774)
})
test('perft - 960 - position 918', () => {
  const chess = new Chess(
    'rkbrqbnn/1p2ppp1/B1p5/p2p3p/4P2P/8/PPPP1PP1/RKBRQ1NN w DAda - 0 9',
  )
  expect(chess.perft(3)).toBe(21005)
})
test('perft - 960 - position 919', () => {
  const chess = new Chess(
    'rkbrqn1b/pp1pp1pp/2p2p2/5n2/8/2P2P2/PP1PP1PP/RKBRQ1NB w DAda - 0 9',
  )
  expect(chess.perft(3)).toBe(10485)
})
test('perft - 960 - position 920', () => {
  const chess = new Chess(
    'rbkrbnn1/ppppp1pp/5q2/5p2/5P2/P3P2N/1PPP2PP/RBKRBQ1N w DAda - 3 9',
  )
  expect(chess.perft(3)).toBe(26900)
})
test('perft - 960 - position 921', () => {
  const chess = new Chess(
    'rkr1bqnn/1ppp1p1p/p5p1/4p3/3PP2b/2P2P2/PP4PP/RKRBBQNN w CAca - 0 9',
  )
  expect(chess.perft(3)).toBe(32006)
})
test('perft - 960 - position 922', () => {
  const chess = new Chess(
    'rkrqbbnn/pppp3p/8/4ppp1/1PP4P/8/P2PPPP1/RKRQBBNN w CAca - 0 9',
  )
  expect(chess.perft(3)).toBe(18834)
})
test('perft - 960 - position 923', () => {
  const chess = new Chess(
    'rkrqbn1b/pppp2pp/8/4pp2/1P1P2n1/5N2/P1P1PP1P/RKRQBN1B w CAca - 0 9',
  )
  expect(chess.perft(3)).toBe(19654)
})
test('perft - 960 - position 924', () => {
  const chess = new Chess(
    'rbkrqnbn/p1p1ppp1/1p1p4/8/3PP2p/2PB4/PP3PPP/R1KRQNBN w DAda - 0 9',
  )
  expect(chess.perft(3)).toBe(23298)
})
test('perft - 960 - position 925', () => {
  const chess = new Chess(
    '1krbqnbn/1p2pppp/r1pp4/p7/8/1P1P2PP/P1P1PP2/RKRBQNBN w CAc - 0 9',
  )
  expect(chess.perft(3)).toBe(13519)
})
test('perft - 960 - position 926', () => {
  const chess = new Chess(
    'rkrq1b2/pppppppb/3n2np/2N5/4P3/7P/PPPP1PP1/RKRQ1BBN w CAca - 1 9',
  )
  expect(chess.perft(3)).toBe(21708)
})
test('perft - 960 - position 927', () => {
  const chess = new Chess(
    'rkr1nnbb/ppp2p1p/3p1qp1/4p3/P5P1/3PN3/1PP1PP1P/RKRQN1BB w CAca - 1 9',
  )
  expect(chess.perft(3)).toBe(20361)
})
test('perft - 960 - position 928', () => {
  const chess = new Chess(
    'bbrkrnqn/1p1ppppp/8/8/p2pP3/PP6/2P2PPP/BBRKRNQN w ECec - 0 9',
  )
  expect(chess.perft(3)).toBe(19067)
})
test('perft - 960 - position 929', () => {
  const chess = new Chess(
    'brkbrnqn/ppp2p2/4p3/P2p2pp/6P1/5P2/1PPPP2P/BRKBRNQN w EBeb - 0 9',
  )
  expect(chess.perft(3)).toBe(14563)
})
test('perft - 960 - position 930', () => {
  const chess = new Chess(
    'brkr1bqn/1pppppp1/3n3p/1p6/P7/4P1P1/1PPP1P1P/BRKRN1QN w DBdb - 0 9',
  )
  expect(chess.perft(3)).toBe(7430)
})
test('perft - 960 - position 931', () => {
  const chess = new Chess(
    'brkr1qnb/pppp2pp/2B1p3/5p2/2n5/6PP/PPPPPPN1/BRKR1QN1 w DBdb - 1 9',
  )
  expect(chess.perft(3)).toBe(23303)
})
test('perft - 960 - position 932', () => {
  const chess = new Chess(
    'rbbkrnqn/p1p1p1pp/8/1p1p4/1P1Pp3/6N1/P1P2PPP/RBBKRNQ1 w EAea - 0 9',
  )
  expect(chess.perft(3)).toBe(19844)
})
test('perft - 960 - position 933', () => {
  const chess = new Chess(
    'rkbbrn1n/pppppp2/5q1p/6p1/3P3P/4P3/PPP2PP1/RKBBRNQN w EAea - 1 9',
  )
  expect(chess.perft(3)).toBe(19224)
})
test('perft - 960 - position 934', () => {
  const chess = new Chess(
    'rkbr1bq1/ppnppppp/6n1/2p5/2P1N2P/8/PP1PPPP1/RKBRNBQ1 w DAda - 3 9',
  )
  expect(chess.perft(3)).toBe(14359)
})
test('perft - 960 - position 935', () => {
  const chess = new Chess(
    '1kbrnqnb/r1ppppp1/8/pp5p/8/1P1NP3/P1PP1PPP/RKB1RQNB w Ad - 2 9',
  )
  expect(chess.perft(3)).toBe(17305)
})
test('perft - 960 - position 936', () => {
  const chess = new Chess(
    'rbkrb1qn/1pp1ppp1/3pn2p/pP6/8/4N1P1/P1PPPP1P/RBKRB1QN w DAda - 0 9',
  )
  expect(chess.perft(3)).toBe(12492)
})
test('perft - 960 - position 937', () => {
  const chess = new Chess(
    'rkrbbnqn/ppppp3/5p2/6pp/5PBP/4P3/PPPP2P1/RKR1BNQN w CAca - 0 9',
  )
  expect(chess.perft(3)).toBe(25435)
})
test('perft - 960 - position 938', () => {
  const chess = new Chess(
    'rkr1bb1n/ppppp1pp/5p2/4n3/3QP3/5P2/RPPP2PP/1KRNBB1N w Cca - 1 9',
  )
  expect(chess.perft(3)).toBe(51766)
})
test('perft - 960 - position 939', () => {
  const chess = new Chess(
    'rkr1bqnb/pp1ppppp/8/2pN4/1P6/5N2/P1PPnPPP/RKR1BQ1B w CAca - 0 9',
  )
  expect(chess.perft(3)).toBe(20511)
})
test('perft - 960 - position 940', () => {
  const chess = new Chess(
    'rbkrnqb1/2ppppp1/p5np/1p6/8/3N4/PPPPPPPP/RBKRQNB1 w DAda - 2 9',
  )
  expect(chess.perft(3)).toBe(9159)
})
test('perft - 960 - position 941', () => {
  const chess = new Chess(
    'rkrbnqb1/p1pppnpp/5p2/1p6/2P5/1P1P1N2/P3PPPP/RKRB1QBN w CAca - 0 9',
  )
  expect(chess.perft(3)).toBe(14039)
})
test('perft - 960 - position 942', () => {
  const chess = new Chess(
    'rkr1qbbn/ppppppp1/4n3/7p/8/P7/KPPPPPPP/R1RNQBBN w ca - 0 9',
  )
  expect(chess.perft(3)).toBe(11458)
})
test('perft - 960 - position 943', () => {
  const chess = new Chess(
    'rkrnqnb1/1ppppp2/p5p1/7p/8/P1bPP3/1PP1QPPP/RKRN1NBB w CAca - 0 9',
  )
  expect(chess.perft(3)).toBe(15526)
})
test('perft - 960 - position 944', () => {
  const chess = new Chess(
    'b2krn1q/p1rppppp/1Q3n2/2p1b3/1P4P1/8/P1PPPP1P/BBRKRNN1 w ECe - 3 9',
  )
  expect(chess.perft(3)).toBe(42945)
})
test('perft - 960 - position 945', () => {
  const chess = new Chess(
    'brkbrnn1/pp1pppp1/7q/2p5/6Pp/4P1NP/PPPP1P2/BRKBR1NQ w EBeb - 2 9',
  )
  expect(chess.perft(3)).toBe(29593)
})
test('perft - 960 - position 946', () => {
  const chess = new Chess(
    'brkrnb1q/pp1p1ppp/2p1p3/5n2/1P6/5N1N/P1PPPPPP/BRKR1B1Q w DBdb - 1 9',
  )
  expect(chess.perft(3)).toBe(27830)
})
test('perft - 960 - position 947', () => {
  const chess = new Chess(
    'brkr1nqb/pp1p1pp1/2pn3p/P3p3/4P3/6P1/1PPP1P1P/BRKRNNQB w DBdb - 0 9',
  )
  expect(chess.perft(3)).toBe(8052)
})
test('perft - 960 - position 948', () => {
  const chess = new Chess(
    'r1bkrn1q/ppbppppp/5n2/2p5/3P4/P6N/1PP1PPPP/RBBKRNQ1 w EAea - 3 9',
  )
  expect(chess.perft(3)).toBe(22551)
})
test('perft - 960 - position 949', () => {
  const chess = new Chess(
    'rkbbrnnq/pp2pppp/8/2pp4/P1P5/1P3P2/3PP1PP/RKBBRNNQ w EAea - 1 9',
  )
  expect(chess.perft(3)).toBe(15410)
})
test('perft - 960 - position 950', () => {
  const chess = new Chess(
    'rkbr1b1q/p1pppppp/1p1n4/7n/5QP1/3N4/PPPPPP1P/RKBR1BN1 w DAda - 4 9',
  )
  expect(chess.perft(3)).toBe(34382)
})
test('perft - 960 - position 951', () => {
  const chess = new Chess(
    'rkbr1nqb/pppp2np/8/4ppp1/1P6/6N1/P1PPPPPP/RKBRN1QB w DAda - 1 9',
  )
  expect(chess.perft(3)).toBe(13260)
})
test('perft - 960 - position 952', () => {
  const chess = new Chess(
    'rbkr1nnq/p1p1pp1p/1p4p1/3p4/b3P3/4N3/PPPPNPPP/RBKRB1Q1 w DAda - 0 9',
  )
  expect(chess.perft(3)).toBe(23414)
})
test('perft - 960 - position 953', () => {
  const chess = new Chess(
    'rkrbb1nq/p2pppp1/1p4n1/2p4p/3N4/4P1P1/PPPP1P1P/RKRBBN1Q w CAca - 0 9',
  )
  expect(chess.perft(3)).toBe(22231)
})
test('perft - 960 - position 954', () => {
  const chess = new Chess(
    'rkrnbb1q/pp2pp1p/6pn/2pp4/2B1P2P/8/PPPP1PP1/RKRNB1NQ w CAca - 0 9',
  )
  expect(chess.perft(3)).toBe(23853)
})
test('perft - 960 - position 955', () => {
  const chess = new Chess(
    'rk2bnqb/pprpppp1/4n2p/2p5/P7/3P2NP/1PP1PPP1/RKRNB1QB w CAa - 1 9',
  )
  expect(chess.perft(3)).toBe(16251)
})
test('perft - 960 - position 956', () => {
  const chess = new Chess(
    'r1krnnbq/pp1ppp1p/6p1/2p5/2P5/P3P3/Rb1P1PPP/1BKRNNBQ w Dda - 0 9',
  )
  expect(chess.perft(3)).toBe(1312)
})
test('perft - 960 - position 957', () => {
  const chess = new Chess(
    '1krbnnbq/1pp1p1pp/r7/p2p1p2/3PP3/2P3P1/PP3P1P/RKRBNNBQ w CAc - 0 9',
  )
  expect(chess.perft(3)).toBe(28033)
})
test('perft - 960 - position 958', () => {
  const chess = new Chess(
    'rkr1nbbq/2ppp1pp/1pn5/p4p2/P6P/3P4/1PP1PPPB/RKRNNB1Q w CAca - 1 9',
  )
  expect(chess.perft(3)).toBe(15689)
})
test('perft - 960 - position 959', () => {
  const chess = new Chess(
    'rkrnnqbb/p1ppp2p/Qp6/4Pp2/5p2/8/PPPP2PP/RKRNN1BB w CAca - 0 9',
  )
  expect(chess.perft(3)).toBe(32020)
})
test('perft - 960 - position 960', () => {
  const chess = new Chess(
    'bbq1nr1r/pppppk1p/2n2p2/6p1/P4P2/4P1P1/1PPP3P/BBQNNRKR w HF - 1 9',
  )
  expect(chess.perft(3)).toBe(14744)
})
