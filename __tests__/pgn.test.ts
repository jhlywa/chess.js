import { Chess } from '../src/chess'
import { split, fileToString } from './utils'

describe('PGN', () => {
  const positions = [
    {
      moves: `d4 d5 Nf3 Nc6 e3 e6 Bb5 g5 O-O Qf6 Nc3 Bd7 Bxc6 Bxc6 Re1 O-O-O a4
        Bb4 a5 b5 axb6 axb6 Ra8+ Kd7 Ne5+ Kd6 Rxd8+ Qxd8 Nxf7+ Ke7 Nxd5+ Qxd5
        c3 Kxf7 Qf3+ Qxf3 gxf3 Bxf3 cxb4 e5 dxe5 Ke6 b3 Kxe5 Bb2+ Ke4 Bxh8 Nf6
        Bxf6 h5 Bxg5 Bg2 Kxg2 Kf5 Bh4 Kg4 Bg3 Kf5 e4+ Kg4 e5 h4 Bxh4 Kxh4 e6 c5
        bxc5 bxc5 e7 c4 bxc4 Kg4 e8=Q Kf5 Qe5+ Kg4 Re4#`,

      header: [
        'White',
        'Jeff Hlywa',
        'Black',
        'Steve Bragg',
        'GreatestGameEverPlayed?',
        'True',
      ],
      maxWidth: 19,
      newlineChar: '<br />',
      pgn: fileToString('pgn/0.pgn'),
      fen: '8/8/8/4Q3/2P1R1k1/8/5PKP/8 b - - 4 39',
    },

    {
      moves: `c4 e6 Nf3 d5 d4 Nf6 Nc3 Be7 Bg5 O-O e3 h6 Bh4 b6 cxd5 Nxd5 Bxe7
        Qxe7 Nxd5 exd5 Rc1 Be6 Qa4 c5 Qa3 Rc8 Bb5 a6 dxc5 bxc5 O-O Ra7 Be2 Nd7
        Nd4 Qf8 Nxe6 fxe6 e4 d4 f4 Qe7 e5 Rb8 Bc4 Kh8 Qh3 Nf8 b3 a5 f5 exf5
        Rxf5 Nh7 Rcf1 Qd8 Qg3 Re7 h4 Rbb7 e6 Rbc7 Qe5 Qe8 a4 Qd8 R1f2 Qe8 R2f3
        Qd8 Bd3 Qe8 Qe4 Nf6 Rxf6 gxf6 Rxf6 Kg8 Bc4 Kh8 Qf4`,
      header: [
        'Event',
        'Reykjavik WCh',
        'Site',
        'Reykjavik WCh',
        'Date',
        '1972.01.07',
        'EventDate',
        '?',
        'Round',
        '6',
        'Result',
        '1-0',
        'White',
        'Robert James Fischer',
        'Black',
        'Boris Spassky',
        'ECO',
        'D59',
        'WhiteElo',
        '?',
        'BlackElo',
        '?',
        'PlyCount',
        '81',
      ],
      maxWidth: 65,
      pgn: fileToString('pgn/1.pgn'),
      fen: '4q2k/2r1r3/4PR1p/p1p5/P1Bp1Q1P/1P6/6P1/6K1 b - - 4 41',
    },
    {
      // testing maxWidth being small and having no comments
      moves: `f3 e5 g4 Qh4#`,
      header: [],
      maxWidth: 1,
      pgn: fileToString('pgn/2.pgn'),
      fen: 'rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3',
    },
    {
      // testing a non-starting position
      moves: `Ba5 O-O d6 d4`,
      header: [],
      maxWidth: 20,
      pgn: fileToString('pgn/3.pgn'),
      starting_position:
        'r1bqk1nr/pppp1ppp/2n5/4p3/1bB1P3/2P2N2/P2P1PPP/RNBQK2R b KQkq - 0 1',
      fen: 'r1bqk1nr/ppp2ppp/2np4/b3p3/2BPP3/2P2N2/P4PPP/RNBQ1RK1 b kq - 0 3',
    },
  ]

  positions.forEach((position, i) => {
    it(`Postion: ${i}`, () => {
      const chess = new Chess()

      if (position.starting_position) {
        chess.load(position.starting_position)
      }

      // make each move - will throw if invalid
      split(position.moves).forEach((move: string) => {
        chess.move(move)
      })

      // verify the fen in the final position
      expect(chess.fen()).toBe(position.fen)

      chess.header(...position.header)

      const pgn = chess.pgn({
        maxWidth: position.maxWidth,
        newline: position.newlineChar,
      })
      expect(pgn).toEqual(position.pgn)
    })
  })
})
