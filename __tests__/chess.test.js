import {
  Chess,
  WHITE,
  BLACK,
  PAWN,
  KNIGHT,
  BISHOP,
  ROOK,
  KING,
  QUEEN,
  SQUARES,
} from '../chess.js'

describe('Perft', () => {
  const perfts = [
    {
      fen: 'r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1',
      depth: 3,
      nodes: 97862,
    },
    { fen: '8/PPP4k/8/8/8/8/4Kppp/8 w - - 0 1', depth: 4, nodes: 89363 },
    {
      fen: '8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1',
      depth: 4,
      nodes: 43238,
    },
    {
      fen: 'rnbqkbnr/p3pppp/2p5/1pPp4/3P4/8/PP2PPPP/RNBQKBNR w KQkq b6 0 4',
      depth: 3,
      nodes: 23509,
    },
  ]

  perfts.forEach(({ fen, depth, nodes }) => {
    const chess = new Chess(fen)

    test(fen, () => {
      expect(chess.perft(depth)).toBe(nodes)
    })
  })
})

describe('Single Square Move Generation', () => {
  const positions = [
    {
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      square: 'e2',
      verbose: false,
      moves: ['e3', 'e4'],
    },
    {
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      square: 'e9',
      verbose: false,
      moves: [],
    }, // invalid square
    {
      fen: 'rnbqk1nr/pppp1ppp/4p3/8/1b1P4/2N5/PPP1PPPP/R1BQKBNR w KQkq - 2 3',
      square: 'c3',
      verbose: false,
      moves: [],
    }, // pinned piece
    {
      fen: '8/k7/8/8/8/8/7p/K7 b - - 0 1',
      square: 'h2',
      verbose: false,
      moves: ['h1=Q+', 'h1=R+', 'h1=B', 'h1=N'],
    }, // promotion
    {
      fen: 'r1bq1rk1/1pp2ppp/p1np1n2/2b1p3/2B1P3/2NP1N2/PPPBQPPP/R3K2R w KQ - 0 8',
      square: 'e1',
      verbose: false,
      moves: ['Kf1', 'Kd1', 'O-O', 'O-O-O'],
    }, // castling
    {
      fen: 'r1bq1rk1/1pp2ppp/p1np1n2/2b1p3/2B1P3/2NP1N2/PPPBQPPP/R3K2R w - - 0 8',
      square: 'e1',
      verbose: false,
      moves: ['Kf1', 'Kd1'],
    }, // no castling
    {
      fen: '8/7K/8/8/1R6/k7/1R1p4/8 b - - 0 1',
      square: 'a3',
      verbose: false,
      moves: [],
    }, // trapped king
    {
      fen: '8/7K/8/8/1R6/k7/1R1p4/8 b - - 0 1',
      square: 'd2',
      verbose: true,
      moves: [
        {
          color: 'b',
          from: 'd2',
          to: 'd1',
          flags: 'np',
          piece: 'p',
          promotion: 'q',
          san: 'd1=Q',
        },
        {
          color: 'b',
          from: 'd2',
          to: 'd1',
          flags: 'np',
          piece: 'p',
          promotion: 'r',
          san: 'd1=R',
        },
        {
          color: 'b',
          from: 'd2',
          to: 'd1',
          flags: 'np',
          piece: 'p',
          promotion: 'b',
          san: 'd1=B',
        },
        {
          color: 'b',
          from: 'd2',
          to: 'd1',
          flags: 'np',
          piece: 'p',
          promotion: 'n',
          san: 'd1=N',
        },
      ],
    }, // verbose
    {
      fen: 'rnbqk2r/ppp1pp1p/5n1b/3p2pQ/1P2P3/B1N5/P1PP1PPP/R3KBNR b KQkq - 3 5',
      square: 'f1',
      verbose: true,
      moves: [],
    }, // issue #30
  ]

  positions.forEach((position) => {
    const chess = new Chess(position.fen)
    test(position.fen + ' ' + position.square, () => {
      const moves = chess.moves({
        square: position.square,
        verbose: position.verbose,
      })
      expect(moves).toEqual(position.moves)
    })
  })
})

describe('Checkmate', () => {
  const checkmates = [
    '8/5r2/4K1q1/4p3/3k4/8/8/8 w - - 0 7',
    '4r2r/p6p/1pnN2p1/kQp5/3pPq2/3P4/PPP3PP/R5K1 b - - 0 2',
    'r3k2r/ppp2p1p/2n1p1p1/8/2B2P1q/2NPb1n1/PP4PP/R2Q3K w kq - 0 8',
    '8/6R1/pp1r3p/6p1/P3R1Pk/1P4P1/7K/8 b - - 0 4',
  ]

  checkmates.forEach((fen) => {
    const chess = new Chess(fen)
    it('should detect checkmate', () => {
      expect(chess.in_checkmate()).toBe(true)
      expect(chess.in_draw()).toEqual(false)
    })
  })

  const noCheckmates = [
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    '1R6/8/8/8/8/8/7R/k6K b - - 0 1', // stalemate
  ]

  noCheckmates.forEach((fen) => {
    const chess = new Chess(fen)
    it('should detect no checkmate', () => {
      expect(chess.in_checkmate()).toBe(false)
    })
  })
})

describe('Stalemate', () => {
  const stalemates = [
    '1R6/8/8/8/8/8/7R/k6K b - - 0 1',
    '8/8/5k2/p4p1p/P4K1P/1r6/8/8 w - - 0 2',
  ]

  stalemates.forEach((fen) => {
    const chess = new Chess(fen)
    it('should detect stalemate', () => {
      expect(chess.in_stalemate()).toBe(true)
      expect(chess.in_draw()).toEqual(true)
    })
  })
})

describe('Insufficient Material', () => {
  const drawn = [
    '8/8/8/8/8/8/8/k6K w - - 0 1',
    '8/2N5/8/8/8/8/8/k6K w - - 0 1',
    '8/2b5/8/8/8/8/8/k6K w - - 0 1',
    '8/b7/3B4/8/8/8/8/k6K w - - 0 1',
    '8/b1B1b1B1/1b1B1b1B/8/8/8/8/1k5K w - - 0 1',
  ]

  const notDrawn = [
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    '8/2p5/8/8/8/8/8/k6K w - - 0 1',
    '8/b7/B7/8/8/8/8/k6K w - - 0 1',
    '8/bB2b1B1/1b1B1b1B/8/8/8/8/1k5K w - - 0 1',
  ]

  drawn.forEach((fen) => {
    const chess = new Chess(fen)
    it(`should be drawn - ${fen}`, () => {
      expect(chess.insufficient_material()).toEqual(true)
      expect(chess.in_draw()).toEqual(true)
    })
  })

  notDrawn.forEach((fen) => {
    const chess = new Chess(fen)
    it(`should not be drawn - ${fen}`, () => {
      expect(chess.insufficient_material()).toEqual(false)
      expect(chess.in_draw()).toEqual(false)
    })
  })
})

describe('Threefold Repetition', () => {
  const positions = [
    {
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      moves: 'Nf3 Nf6 Ng1 Ng8 Nf3 Nf6 Ng1 Ng8',
    },

    /* Fischer - Petrosian, Buenos Aires, 1971 */
    {
      fen: '8/pp3p1k/2p2q1p/3r1P2/5R2/7P/P1P1QP2/7K b - - 2 30',
      moves: 'Qe5 Qh5 Qf6 Qe2 Re5 Qd3 Rd5 Qe2',
    },
  ]

  positions.forEach(({ fen, moves }) => {
    const chess = new Chess(fen)

    it(`should be drawn - ${fen}`, () => {
      moves.split(/\s+/).forEach((move) => {
        expect(chess.in_threefold_repetition()).toBe(false)
        chess.move(move)
      })
      expect(chess.in_threefold_repetition()).toBe(true)
      expect(chess.in_draw()).toBe(true)
    })
  })
})

describe('Algebraic Notation', () => {
  const positions = [
    {
      fen: '7k/3R4/3p2Q1/6Q1/2N1N3/8/8/3R3K w - - 0 1',
      moves: `Rd8# Re7 Rf7 Rg7 Rh7# R7xd6 Rc7 Rb7 Ra7 Qf7 Qe8# Qg7# Qg8# Qh7#
        Q6h6# Q6h5# Q6f5 Q6f6# Qe6 Qxd6 Q5f6# Qe7 Qd8# Q5h6# Q5h5# Qh4# Qg4 Qg3
        Qg2 Qg1 Qf4 Qe3 Qd2 Qc1 Q5f5 Qe5+ Qd5 Qc5 Qb5 Qa5 Na5 Nb6 Ncxd6 Ne5 Ne3
        Ncd2 Nb2 Na3 Nc5 Nexd6 Nf6 Ng3 Nf2 Ned2 Nc3 Rd2 Rd3 Rd4 Rd5 R1xd6 Re1
        Rf1 Rg1 Rc1 Rb1 Ra1 Kg2 Kh2 Kg1`,
    },
    {
      fen: '1r3k2/P1P5/8/8/8/8/8/R3K2R w KQ - 0 1',
      moves: `a8=Q a8=R a8=B a8=N axb8=Q+ axb8=R+ axb8=B axb8=N c8=Q+ c8=R+
        c8=B c8=N cxb8=Q+ cxb8=R+ cxb8=B cxb8=N Ra2 Ra3 Ra4 Ra5 Ra6 Rb1 Rc1 Rd1
        Kd2 Ke2 Kf2 Kf1 Kd1 Rh2 Rh3 Rh4 Rh5 Rh6 Rh7 Rh8+ Rg1 Rf1+ O-O+ O-O-O`,
    },
    {
      fen: '5rk1/8/8/8/8/8/2p5/R3K2R w KQ - 0 1',
      moves: `Ra2 Ra3 Ra4 Ra5 Ra6 Ra7 Ra8 Rb1 Rc1 Rd1 Kd2 Ke2 Rh2 Rh3 Rh4 Rh5
        Rh6 Rh7 Rh8+ Rg1+ Rf1`,
    },
    {
      fen: '5rk1/8/8/8/8/8/2p5/R3K2R b KQ - 0 1',
      moves: `Rf7 Rf6 Rf5 Rf4 Rf3 Rf2 Rf1+ Re8+ Rd8 Rc8 Rb8 Ra8 Kg7 Kf7 c1=Q+
        c1=R+ c1=B c1=N`,
    },
    {
      fen: 'r3k2r/p2pqpb1/1n2pnp1/2pPN3/1p2P3/2N2Q1p/PPPB1PPP/R3K2R w KQkq c6 0 2',
      moves: `gxh3 Qxf6 Qxh3 Nxd7 Nxf7 Nxg6 dxc6 dxe6 Rg1 Rf1 Ke2 Kf1 Kd1 Rb1
        Rc1 Rd1 g3 g4 Be3 Bf4 Bg5 Bh6 Bc1 b3 a3 a4 Qf4 Qf5 Qg4 Qh5 Qg3 Qe2 Qd1
        Qe3 Qd3 Na4 Nb5 Ne2 Nd1 Nb1 Nc6 Ng4 Nd3 Nc4 d6 O-O O-O-O`,
    },
    {
      fen: 'k7/8/K7/8/3n3n/5R2/3n4/8 b - - 0 1',
      moves: `N2xf3 Nhxf3 Nd4xf3 N2b3 Nc4 Ne4 Nf1 Nb1 Nhf5 Ng6 Ng2 Nb5 Nc6 Ne6
        Ndf5 Ne2 Nc2 N4b3 Kb8`,
    },
  ]

  positions.forEach(({ fen, moves }) => {
    const chess = new Chess(fen)
    it(`should generate Standard Algebraic Notation - ${fen}`, () => {
      // use .sort() to ignore the order in which the moves appear in the move list
      expect(chess.moves().sort()).toEqual(moves.split(/\s+|\n/).sort())
    })
  })
})

describe('Get/Put/Remove', () => {
  const chess = new Chess()
  let passed = true
  const positions = [
    {
      pieces: {
        a7: { type: PAWN, color: WHITE },
        b7: { type: PAWN, color: BLACK },
        c7: { type: KNIGHT, color: WHITE },
        d7: { type: KNIGHT, color: BLACK },
        e7: { type: BISHOP, color: WHITE },
        f7: { type: BISHOP, color: BLACK },
        g7: { type: ROOK, color: WHITE },
        h7: { type: ROOK, color: BLACK },
        a6: { type: QUEEN, color: WHITE },
        b6: { type: QUEEN, color: BLACK },
        a4: { type: KING, color: WHITE },
        h4: { type: KING, color: BLACK },
      },
      should_pass: true,
    },

    {
      pieces: { a7: { type: 'z', color: WHITE } }, // bad piece
      should_pass: false,
    },

    {
      pieces: { j4: { type: PAWN, color: WHITE } }, // bad square
      should_pass: false,
    },

    /* disallow two kings (black) */
    {
      pieces: {
        a7: { type: KING, color: BLACK },
        h2: { type: KING, color: WHITE },
        a8: { type: KING, color: BLACK },
      },
      should_pass: false,
    },

    /* disallow two kings (white) */
    {
      pieces: {
        a7: { type: KING, color: BLACK },
        h2: { type: KING, color: WHITE },
        h1: { type: KING, color: WHITE },
      },
      should_pass: false,
    },

    /* allow two kings if overwriting the exact same square */
    {
      pieces: {
        a7: { type: KING, color: BLACK },
        h2: { type: KING, color: WHITE },
        h2: { type: KING, color: WHITE },
      },
      should_pass: true,
    },
  ]

  positions.forEach((position) => {
    passed = true
    chess.clear()

    it('position should pass - ' + position.should_pass, () => {
      /* places the pieces */
      for (const square in position.pieces) {
        passed &= chess.put(position.pieces[square], square)
      }

      /* iterate over every square to make sure get returns the proper
       * piece values/color
       */
      for (let j = 0; j < SQUARES.length; j++) {
        const square = SQUARES[j]
        if (!(square in position.pieces)) {
          if (chess.get(square)) {
            passed = false
            break
          }
        } else {
          const piece = chess.get(square)
          if (
            !(
              piece &&
              piece.type == position.pieces[square].type &&
              piece.color == position.pieces[square].color
            )
          ) {
            passed = false
            break
          }
        }
      }

      if (passed) {
        /* remove the pieces */
        for (let j = 0; j < SQUARES.length; j++) {
          const square = SQUARES[j]
          const piece = chess.remove(square)
          if (!(square in position.pieces) && piece) {
            passed = false
            break
          }

          if (
            piece &&
            (position.pieces[square].type != piece.type ||
              position.pieces[square].color != piece.color)
          ) {
            passed = false
            break
          }
        }
      }

      /* finally, check for an empty board */
      passed = passed && chess.fen() == '8/8/8/8/8/8/8/8 w - - 0 1'

      /* some tests should fail, so make sure we're supposed to pass/fail each
       * test
       */
      passed = passed == position.should_pass

      expect(passed).toBe(true)
    })
  })
})

describe('FEN', () => {
  const validPositions = [
    '8/8/8/8/8/8/8/8 w - - 0 1',
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    '1nbqkbn1/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/1NBQKBN1 b - - 1 2',
  ]

  const invalidPositions = [
    /* incomplete FEN string */
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBN w KQkq - 0 1',

    /* bad digit (9)*/
    'rnbqkbnr/pppppppp/9/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',

    /* bad piece (X)*/
    '1nbqkbn1/pppp1ppX/8/4p3/4P3/8/PPPP1PPP/1NBQKBN1 b - - 1 2',

    /* bad ep square*/
    'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e9 0 1',
  ]

  const chess = new Chess()

  validPositions.forEach((fen) => {
    it('Valid FEN - ' + fen, () => {
      expect(chess.load(fen)).toBe(true)
      expect(chess.fen()).toEqual(fen)
    })
  })

  invalidPositions.forEach((fen) => {
    it('Invalid FEN - ' + fen, () => {
      expect(chess.load(fen)).toBe(false)
    })
  })
})

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
      max_width: 19,
      newline_char: '<br />',
      pgn: '[White "Jeff Hlywa"]<br />[Black "Steve Bragg"]<br />[GreatestGameEverPlayed? "True"]<br /><br />1. d4 d5 2. Nf3 Nc6<br />3. e3 e6 4. Bb5 g5<br />5. O-O Qf6<br />6. Nc3 Bd7<br />7. Bxc6 Bxc6<br />8. Re1 O-O-O<br />9. a4 Bb4 10. a5 b5<br />11. axb6 axb6<br />12. Ra8+ Kd7<br />13. Ne5+ Kd6<br />14. Rxd8+ Qxd8<br />15. Nxf7+ Ke7<br />16. Nxd5+ Qxd5<br />17. c3 Kxf7<br />18. Qf3+ Qxf3<br />19. gxf3 Bxf3<br />20. cxb4 e5<br />21. dxe5 Ke6<br />22. b3 Kxe5<br />23. Bb2+ Ke4<br />24. Bxh8 Nf6<br />25. Bxf6 h5<br />26. Bxg5 Bg2<br />27. Kxg2 Kf5<br />28. Bh4 Kg4<br />29. Bg3 Kf5<br />30. e4+ Kg4<br />31. e5 h4<br />32. Bxh4 Kxh4<br />33. e6 c5<br />34. bxc5 bxc5<br />35. e7 c4<br />36. bxc4 Kg4<br />37. e8=Q Kf5<br />38. Qe5+ Kg4<br />39. Re4#',
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
      max_width: 65,
      pgn: '[Event "Reykjavik WCh"]\n[Site "Reykjavik WCh"]\n[Date "1972.01.07"]\n[EventDate "?"]\n[Round "6"]\n[Result "1-0"]\n[White "Robert James Fischer"]\n[Black "Boris Spassky"]\n[ECO "D59"]\n[WhiteElo "?"]\n[BlackElo "?"]\n[PlyCount "81"]\n\n1. c4 e6 2. Nf3 d5 3. d4 Nf6 4. Nc3 Be7 5. Bg5 O-O 6. e3 h6\n7. Bh4 b6 8. cxd5 Nxd5 9. Bxe7 Qxe7 10. Nxd5 exd5 11. Rc1 Be6\n12. Qa4 c5 13. Qa3 Rc8 14. Bb5 a6 15. dxc5 bxc5 16. O-O Ra7\n17. Be2 Nd7 18. Nd4 Qf8 19. Nxe6 fxe6 20. e4 d4 21. f4 Qe7\n22. e5 Rb8 23. Bc4 Kh8 24. Qh3 Nf8 25. b3 a5 26. f5 exf5\n27. Rxf5 Nh7 28. Rcf1 Qd8 29. Qg3 Re7 30. h4 Rbb7 31. e6 Rbc7\n32. Qe5 Qe8 33. a4 Qd8 34. R1f2 Qe8 35. R2f3 Qd8 36. Bd3 Qe8\n37. Qe4 Nf6 38. Rxf6 gxf6 39. Rxf6 Kg8 40. Bc4 Kh8 41. Qf4 1-0',
      fen: '4q2k/2r1r3/4PR1p/p1p5/P1Bp1Q1P/1P6/6P1/6K1 b - - 4 41',
    },
    {
      moves: `f3 e5 g4 Qh4#`, // testing max_width being small and having no comments
      header: [],
      max_width: 1,
      pgn: '1. f3 e5\n2. g4 Qh4#',
      fen: 'rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3',
    },
    {
      moves: `Ba5 O-O d6 d4`, // testing a non-starting position
      header: [],
      max_width: 20,
      pgn: '[SetUp "1"]\n[FEN "r1bqk1nr/pppp1ppp/2n5/4p3/1bB1P3/2P2N2/P2P1PPP/RNBQK2R b KQkq - 0 1"]\n\n1. ... Ba5 2. O-O d6\n3. d4',
      starting_position:
        'r1bqk1nr/pppp1ppp/2n5/4p3/1bB1P3/2P2N2/P2P1PPP/RNBQK2R b KQkq - 0 1',
      fen: 'r1bqk1nr/ppp2ppp/2np4/b3p3/2BPP3/2P2N2/P4PPP/RNBQ1RK1 b kq d3 0 3',
    },
  ]

  positions.forEach((position, i) => {
    it('Postion: ' + i, () => {
      const chess = new Chess()
      if (position.starting_position) {
        chess.load(position.starting_position)
      }
      position.moves.split(/\s+|\n/).forEach((move) => {
        expect(chess.move(move)).not.toBeNull()
      })
      chess.header(...position.header)
      expect(chess.fen()).toBe(position.fen)
      expect(
        chess.pgn({
          max_width: position.max_width,
          newline_char: position.newline_char,
        })
      ).toBe(position.pgn)
    })
  })
})

describe('Load PGN', () => {
  const chess = new Chess()
  const tests = [
    {
      pgn: [
        '[Event "Reykjavik WCh"]',
        '[Site "Reykjavik WCh"]',
        '[Date "1972.01.07"]',
        '[EventDate "?"]',
        '[Round "6"]',
        '[Result "1-0"]',
        '[White "Robert James Fischer"]',
        '[Black "Boris Spassky"]',
        '[ECO "D59"]',
        '[WhiteElo "?"]',
        '[BlackElo "?"]',
        '[PlyCount "81"]',
        '',
        '1. c4 e6 2. Nf3 d5 3. d4 Nf6 4. Nc3 Be7 5. Bg5 O-O 6. e3 h6',
        '7. Bh4 b6 8. cxd5 Nxd5 9. Bxe7 Qxe7 10. Nxd5 exd5 11. Rc1 Be6',
        '12. Qa4 c5 13. Qa3 Rc8 14. Bb5 a6 15. dxc5 bxc5 16. O-O Ra7',
        '17. Be2 Nd7 18. Nd4 Qf8 19. Nxe6 fxe6 20. e4 d4 21. f4 Qe7',
        '22. e5 Rb8 23. Bc4 Kh8 24. Qh3 Nf8 25. b3 a5 26. f5 exf5',
        '27. Rxf5 Nh7 28. Rcf1 Qd8 29. Qg3 Re7 30. h4 Rbb7 31. e6 Rbc7',
        '32. Qe5 Qe8 33. a4 Qd8 34. R1f2 Qe8 35. R2f3 Qd8 36. Bd3 Qe8',
        '37. Qe4 Nf6 38. Rxf6 gxf6 39. Rxf6 Kg8 40. Bc4 Kh8 41. Qf4 1-0',
      ],
      expect: true,
    },
    {
      fen: '1n1Rkb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2K5 b k - 1 17',
      pgn: [
        '[Event "Paris"]',
        '[Site "Paris"]',
        '[Date "1858.??.??"]',
        '[EventDate "?"]',
        '[Round "?"]',
        '[Result "1-0"]',
        '[White "Paul Morphy"]',
        '[Black "Duke Karl / Count Isouard"]',
        '[ECO "C41"]',
        '[WhiteElo "?"]',
        '[BlackElo "?"]',
        '[PlyCount "33"]',
        '',
        '1.e4 e5 2.Nf3 d6 3.d4 Bg4 {This is a weak move',
        'already.--Fischer} 4.dxe5 Bxf3 5.Qxf3 dxe5 6.Bc4 Nf6 7.Qb3 Qe7',
        "8.Nc3 c6 9.Bg5 {Black is in what's like a zugzwang position",
        "here. He can't develop the [Queen's] knight because the pawn",
        'is hanging, the bishop is blocked because of the',
        'Queen.--Fischer} b5 10.Nxb5 cxb5 11.Bxb5+ Nbd7 12.O-O-O Rd8',
        '13.Rxd7 Rxd7 14.Rd1 Qe6 15.Bxd7+ Nxd7 16.Qb8+ Nxb8 17.Rd8# 1-0',
      ],
      expect: true,
    },
    // Github Issue #134 - Load PGN with comment before first move
    {
      fen: 'r1bqk2r/pp1nbppp/2p1pn2/3p4/2PP4/5NP1/PP2PPBP/RNBQ1RK1 w kq - 4 7',
      pgn: [
        '[Event "2012 ROCHESTER GRAND WINTER OPEN"]',
        '[Site "Rochester"]',
        '[Date "2012.02.04"]',
        '[Round "1"]',
        '[White "Jensen, Matthew"]',
        '[Black "Gaustad, Kevin"]',
        '[Result "1-0"]',
        '[ECO "E01"]',
        '[WhiteElo "2131"]',
        '[BlackElo "1770"]',
        '[Annotator "Jensen, Matthew"]',
        '',
        '{ Kevin and I go way back.  I checked the USCF player stats and my previous',
        'record against Kevin was 4 losses and 1 draw out of 5 games.  All of our',
        'previous games were between 1992-1998. }',
        '1.d4 Nf6 2.c4 e6 3.g3 { Avrukh says',
        'to play 3.g3 instead of 3.Nf3 in case the Knight later comes to e2, as in the',
        'Bogo-Indian. } 3...d5 4.Bg2 c6 5.Nf3 Be7 6.O-O Nbd7',
        '1-0',
      ],
      expect: true,
    },
    {
      pgn: [
        '1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 Nf6 6. Nxg4 Nxe4',
        '7. d3 Ng3 8. Bxf4 Nxh1 9. Qe2+ Qe7 10. Nf6+ Kd8 11. Bxc7+ Kxc7',
        '12. Nd5+ Kd8 13. Nxe7 Bxe7 14. Qg4 d6 15. Qf4 Rg8 16. Qxf7 Bxh4+',
        '17. Kd2 Re8 18. Na3 Na6 19. Qh5 Bf6 20. Qxh1 Bxb2 21. Qh4+ Kd7',
        '22. Rb1 Bxa3 23. Qa4+',
      ],
      expect: true,
    },
    /* regression test - broken PGN parser ended up here:
     * fen = rnbqk2r/pp1p1ppp/4pn2/1N6/1bPN4/8/PP2PPPP/R1BQKB1R b KQkq - 2 6
     */
    {
      pgn: ['1. d4 Nf6 2. c4 e6 3. Nf3 c5 4. Nc3 cxd4 5. Nxd4 Bb4 6. Nb5'],
      fen: 'rnbqk2r/pp1p1ppp/4pn2/1N6/1bP5/2N5/PP2PPPP/R1BQKB1R b KQkq - 2 6',
      expect: true,
    },
    { pgn: ['1. e4 Qxd7 1/2-1/2'], expect: false },
    {
      pgn: ['1. e4!! e5?! 2. d4?? d5!?'],
      fen: 'rnbqkbnr/ppp2ppp/8/3pp3/3PP3/8/PPP2PPP/RNBQKBNR w KQkq d6 0 3',
      expect: true,
    },
    { pgn: ['1. e4!+'], expect: false },
    {
      pgn: [
        '1.e4 e6 2.d4 d5 3.exd5 c6?? 4.dxe6 Nf6?! 5.exf7+!! Kd7!? 6.Nf3 Bd6 7.f8=N+!! Qxf8',
      ],
      fen: 'rnb2q1r/pp1k2pp/2pb1n2/8/3P4/5N2/PPP2PPP/RNBQKB1R w KQ - 0 8',
      expect: true,
    },
    {
      pgn: ["1. e4 ( 1. d4 { Queen's pawn } d5 ( 1... Nf6 ) ) e5"],
      fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2',
      expect: true,
    },
    {
      pgn: [
        '1. e4 c5 2. Nf3 e6 { Sicilian Defence, French Variation } 3. Nc3 a6',
        '4. Be2 Nc6 5. d4 cxd4 6. Nxd4 Qc7 7. O-O Nf6 8. Be3 Be7 9. f4 d6',
        '10. Kh1 O-O 11. Qe1 Nxd4 12. Bxd4 b5 13. Qg3 Bb7 14. a3 Rad8',
        '15. Rae1 Rd7 16. Bd3 Qd8 17. Qh3 g6? { (0.05 → 1.03) Inaccuracy.',
        'The best move was h6. } (17... h6 18. Rd1 Re8 19. Qg3 Nh5 20. Qg4',
        'Nf6 21. Qh3 Bc6 22. Kg1 Qb8 23. Qg3 Nh5 24. Qf2 Bf6 25. Be2 Bxd4',
        '26. Rxd4 Nf6 27. g3) 18. f5 e5',
      ],
      fen: '3q1rk1/1b1rbp1p/p2p1np1/1p2pP2/3BP3/P1NB3Q/1PP3PP/4RR1K w - - 0 19',
      expect: true,
    },
    {
      pgn: [
        '1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bb6 5. a4 a6 6. c3 Nf6 7. d3 d6',
        '8. Nbd2 O-O 9. O-O Ne7 10. d4 Ng6 11. dxe5 Nxe5 12. Nxe5 dxe5 13. Qb3 Ne8',
        '14. Nf3 Nd6 15. Rd1 Bg4 16. Be2 Qf6 17. c4 Bxf3 18. Bxf3 Bd4 19. Rb1 b5 $2',
        '20. c5 Nc4 21. Rf1 Qg6 22. Qc2 c6 23. Be2 Rfd8 24. a5 h5 $2 (24... Rd7 $11)',
        '25. Rb3 $1 h4 26. Rh3 Qf6 27. Rf3',
      ],
      fen: 'r2r2k1/5pp1/p1p2q2/PpP1p3/1PnbP2p/5R2/2Q1BPPP/2B2RK1 b - - 3 27',
      expect: true,
    },
    {
      pgn: [
        '1. d4 d5 2. Bf4 Nf6 3. e3 g6 4. Nf3 (4. Nc3 Bg7 5. Nf3 O-O 6. Be2 c5)',
        '4... Bg7 5. h3 { 5. Be2 O-O 6. O-O c5 7. c3 Nc6 } 5... O-O',
      ],
      fen: 'rnbq1rk1/ppp1ppbp/5np1/3p4/3P1B2/4PN1P/PPP2PP1/RN1QKB1R w KQ - 1 6',
      expect: true,
    },

    // test the sloppy PGN parser
    {
      pgn: [
        '1.e4 e5 2.Nf3 d6 3.d4 Bg4 4.dxe5 Bxf3 5.Qxf3 dxe5 6.Qf5 Nc6 7.Bb5 Nge7',
        '8.Qxe5 Qd7 9.O-O Nxe5 10.Bxd7+ Nxd7 11.Rd1 O-O-O 12.Nc3 Ng6 13.Be3 a6',
        '14.Ba7 b6 15.Na4 Kb7 16.Bxb6 cxb6 17.b3 b5 18.Nb2 Nge5 19.f3 Rc8',
        '20.Rac1 Ba3 21.Rb1 Rxc2 22.f4 Ng4 23.Rxd7+ Kc6 24.Rxf7 Bxb2 25.Rxg7',
        'Ne3 26.Rg3 Bd4 27.Kh1 Rxa2 28.Rc1+ Kb6 29.e5 Rf8 30.e6 Rxf4 31.e7 Re4',
        '32.Rg7 Bxg7',
      ],
      fen: '8/4P1bp/pk6/1p6/4r3/1P2n3/r5PP/2R4K w - - 0 33',
      expect: false,
      sloppy: false,
    },

    {
      pgn: [
        '1.e4 e5 2.Nf3 d6 3.d4 Bg4 4.dxe5 Bxf3 5.Qxf3 dxe5 6.Qf5 Nc6 7.Bb5 Nge7',
        '8.Qxe5 Qd7 9.O-O Nxe5 10.Bxd7+ Nxd7 11.Rd1 O-O-O 12.Nc3 Ng6 13.Be3 a6',
        '14.Ba7 b6 15.Na4 Kb7 16.Bxb6 cxb6 17.b3 b5 18.Nb2 Nge5 19.f3 Rc8',
        '20.Rac1 Ba3 21.Rb1 Rxc2 22.f4 Ng4 23.Rxd7+ Kc6 24.Rxf7 Bxb2 25.Rxg7',
        'Ne3 26.Rg3 Bd4 27.Kh1 Rxa2 28.Rc1+ Kb6 29.e5 Rf8 30.e6 Rxf4 31.e7 Re4',
        '32.Rg7 Bxg7',
      ],
      fen: '8/4P1bp/pk6/1p6/4r3/1P2n3/r5PP/2R4K w - - 0 33',
      expect: true,
      sloppy: true,
    },

    // the sloppy PGN parser should still accept correctly disambiguated moves
    {
      pgn: [
        '1.e4 e5 2.Nf3 d6 3.d4 Bg4 4.dxe5 Bxf3 5.Qxf3 dxe5 6.Qf5 Nc6 7.Bb5 Ne7',
        '8.Qxe5 Qd7 9.O-O Nxe5 10.Bxd7+ Nxd7 11.Rd1 O-O-O 12.Nc3 Ng6 13.Be3 a6',
        '14.Ba7 b6 15.Na4 Kb7 16.Bxb6 cxb6 17.b3 b5 18.Nb2 Nge5 19.f3 Rc8',
        '20.Rac1 Ba3 21.Rb1 Rxc2 22.f4 Ng4 23.Rxd7+ Kc6 24.Rxf7 Bxb2 25.Rxg7',
        'Ne3 26.Rg3 Bd4 27.Kh1 Rxa2 28.Rc1+ Kb6 29.e5 Rf8 30.e6 Rxf4 31.e7 Re4',
        '32.Rg7 Bxg7',
      ],
      fen: '8/4P1bp/pk6/1p6/4r3/1P2n3/r5PP/2R4K w - - 0 33',
      expect: true,
      sloppy: true,
    },

    {
      pgn: [
        '1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6 4.Ng5 d5 5.exd5 Nxd5 6.Nxf7 Kxf7 7.Qf3+',
        'Ke6 8.Nc3 Nb4',
      ],
      fen: 'r1bq1b1r/ppp3pp/4k3/3np3/1nB5/2N2Q2/PPPP1PPP/R1B1K2R w KQ - 4 9',
      expect: true,
      sloppy: true,
    },

    // the sloppy parser should handle lazy disambiguation (e.g. Rc1c4 below)
    {
      pgn: [
        '1.e4 e5 2. Nf3 d5 3. Nxe5 f6 4. Bb5+ c6 5. Qh5+ Ke7',
        'Qf7+ Kd6 7. d3 Kxe5 8. Qh5+ g5 9. g3 cxb5 10. Bf4+ Ke6',
        'exd5+ Qxd5 12. Qe8+ Kf5 13. Rg1 gxf4 14. Nc3 Qc5 15. Ne4 Qxf2+',
        'Kxf2 fxg3+ 17. Rxg3 Nd7 18. Qh5+ Ke6 19. Qe8+ Kd5 20. Rg4 Rb8',
        'c4+ Kc6 22. Qe6+ Kc7 23. cxb5 Ne7 24. Rc1+ Kd8 25. Nxf6 Ra8',
        'Kf1 Rb8 27. Rc1c4 b6 28. Rc4-d4 Rb7 29. Qf7 Rc7 30. Qe8# 1-0',
      ],
      fen: '2bkQb1r/p1rnn2p/1p3N2/1P6/3R2R1/3P4/PP5P/5K2 b - - 5 30',
      expect: true,
      sloppy: true,
    },

    // sloppy parse should parse long algebraic notation
    {
      pgn: [
        'e2e4 d7d5 e4d5 d8d5 d2d4 g8f6 c2c4 d5d8 g1f3 c8g4 f1e2 e7e6 b1c3 f8e7',
        'c1e3 e8g8 d1b3 b8c6 a1d1 a8b8 e1g1 d8c8 h2h3 g4h5 d4d5 e6d5 c4d5 h5f3',
        'e2f3 c6e5 f3e2 a7a6 e3a7 b8a8 a7d4 e7d6 b3c2 f8e8 f2f4 e5d7 e2d3 c7c5',
        'd4f2 d6f4 c3e4 f6d5 e4d6 f4d6 d3h7',
      ],
      fen: 'r1q1r1k1/1p1n1ppB/p2b4/2pn4/8/7P/PPQ2BP1/3R1RK1 b - - 0 25',
      expect: true,
      sloppy: true,
    },

    // sloppy parse should parse extended long algebraic notation w/ en
    // passant
    {
      pgn: [
        '1. d2d4 f7f5 2. b2b3 e7e6 3. c1b2 d7d5 4. g1f3 f8d6 5. e2e3 g8f6 6. b1d2',
        'e8g8 7. c2c4 c7c6 8. f1d3 b8d7 9. e1g1 f6e4 10. a1c1 g7g5 11. h2h3 d8e8 12.',
        'd3e4 d5e4 13. f3g5 e8g6 14. h3h4 h7h6 15. g5h3 d7f6 16. f2f4 e4f3 17. d2f3',
        'f6g4 18. d1e2 d6g3 19. h3f4 g6g7 20. d4d5 g7f7 21. d5e6 c8e6 22. f3e5 g4e5',
        '23. b2e5 g8h7 24. h4h5 f8g8 25. e2f3 g3f4 26. e5f4 g8g4 27. g2g3 a8g8 28.',
        'c1c2 b7b5 29. c4b5 e6d5 30. f3d1 f7h5 31. c2h2 g4g3+ 32. f4g3 g8g3+ 33.',
        'g1f2 h5h2+ 34. f2e1 g3g2 35. d1d3 d5e4 36. d3d7+ h7g6 37. b5c6 g2e2+ 38.',
        'e1d1 e2a2 0-1',
      ],
      fen: '8/p2Q4/2P3kp/5p2/4b3/1P2P3/r6q/3K1R2 w - - 0 39',
      expect: true,
      sloppy: true,
    },

    // sloppy parse should parse long algebraic notation w/ underpromotions
    {
      pgn: [
        '1. e2e4 c7c5 2. g1f3 d7d6 3. d2d4 c5d4 4. f3d4 g8f6 5. f1d3 a7a6 6. c1e3',
        'e7e5 7. d4f5 c8f5 8. e4f5 d6d5 9. e3g5 f8e7 10. d1e2 e5e4 11. g5f6 e7f6 12.',
        'd3e4 d5e4 13. e2e4+ d8e7 14. e4e7+ f6e7 15. e1g1 e8g8 16. f1e1 e7f6 17.',
        'c2c3 b8c6 18. b1d2 a8d8 19. d2e4 f8e8 20. e1e3 c6e5 21. a1e1 e5d3 22. e4f6+',
        'g7f6 23. e3e8+ d8e8 24. e1e8+ g8g7 25. b2b4 d3e5 26. a2a4 b7b5 27. a4b5',
        'a6b5 28. e8b8 e5g4 29. b8b5 g4e5 30. b5c5 g7f8 31. b4b5 f8e7 32. f2f4 e5d7',
        '33. c5c7 e7d6 34. c7c8 d7b6 35. c8c6+ d6d7 36. c6b6 h7h5 37. b6f6 h5h4 38.',
        'f6f7+ d7d6 39. f7h7 h4h3 40. h7h3 d6e7 41. b5b6 e7f6 42. h3h5 f6g7 43. b6b7',
        'g7g8 44. b7b8N g8g7 45. c3c4 g7f6 46. c4c5 f6e7 47. c5c6 e7f6 48. c6c7 f6e7',
        '49. c7c8B e7d6 50. b8a6 d6e7 51. c8e6 e7f6 52. a6c5 f6g7 53. c5e4 g7f8 54.',
        'h5h8+ f8g7 55. h8g8+ g7h6 56. g8g6+ h6h7 57. e4f6+ h7h8 58. f6e4 h8h7 59.',
        'f5f6 h7g6 60. f6f7 g6h5 61. f7f8R h5h6 62. f4f5 h6h7 63. f8f7+ h7h6 64.',
        'f5f6 h6g6 65. f7g7+ g6h5 66. f6f7 h5h4 67. f7f8Q h4h5 68. f8h8# 1-0',
      ],
      fen: '7Q/6R1/4B3/7k/4N3/8/6PP/6K1 b - - 2 68',
      expect: true,
      sloppy: true,
    },

    // sloppy parse should parse abbreviated long algebraic notation
    {
      pgn: [
        '1. d2d4 f7f5 2. Bc1g5 d7d6 3. e2e3 Nb8d7 4. c2c4 Ng8f6 5. Nb1c3 e7e5 6.',
        'd4e5 d6e5 7. g2g3 Bf8e7 8. Bf1h3 h7h6 9. Bg5f6 Nd7f6 10. Qd1d8+ Be7d8 11.',
        'Ng1f3 e5e4 12. Nf3d4 g7g6 13. e1g1 c7c5 14. Nd4b5 e8g8 15. Nb5d6 Bd8c7 16.',
        'Nd6c8 Ra8c8 17. Rf1d1 Rc8d8 18. Bh3f1 b7b6 19. Nc3d5 Nf6d5 20. c4d5 Rf8e8',
        '21. Bf1b5 Re8e5 22. Bb5c6 Kg8f7 23. Kg1f1 Kf7f6 24. h2h4 g6g5 25. h4g5+',
        'h6g5 26. Kf1e2 Rd8h8 27. Rd1h1 Rh8h1 28. Ra1h1 Kf6g7 29. Rh1h5 Kg7g6 30.',
        'Rh5h8 Re5e7 31. Rh8a8 a7a5 32. Ra8a7 Kg6f6 33. Ra7b7 Kf6e5 34. Ke2d2 f5f4',
        '35. g3f4+ g5f4 36. Kd2c3 f4e3 37. f2e3 Re7f7 38. Kc3c4 Ke5d6 39. a2a3 Rf7f3',
        '40. b2b4 a5b4 41. a3b4 c5b4 42. Kc4b4 Rf3e3 43. Kb4c4 Re3a3 44. Kc4b4 e4e3',
        '45. Bc6b5 Ra3a1 46. Kb4c3 Ra1a3+ 47. Kc3d4 Ra3b3 48. Bb5e2 Rb3b4+ 49. Kd4e3',
        'Rb4h4 50. Be2f3 Rh4h3 51. Rb7a7 Rh3f3+ 52. Ke3f3 b6b5 53. Kf3e4 Kd6c5 54.',
        'Ra7b7 Bc7b6 55. Ke4e5 b5b4 56. d5d6 b4b3 57. Rb7b6 Kc5b6 58. d6d7 Kb6c7 59.',
        'Ke5e6 1-0',
      ],
      fen: '8/2kP4/4K3/8/8/1p6/8/8 b - - 2 59',
      expect: true,
      sloppy: true,
    },

    // sloppy parse should parse extended long algebraic notation
    {
      pgn: [
        '1. e2-e4 c7-c5 2. Ng1-f3 d7-d6 3. d2-d4 c5xd4 4. Nf3xd4 Ng8-f6 5. Bf1-d3',
        'a7-a6 6. Bc1-e3 e7-e5 7. Nd4-f5 Bc8xf5 8. e4xf5 d6-d5 9. Be3-g5 Bf8-e7 10.',
        'Qd1-e2 e5-e4 11. Bg5xf6 Be7xf6 12. Bd3xe4 d5xe4 13. Qe2xe4+ Qd8-e7 14.',
        'Qe4xe7+ Bf6xe7 15. e1-g1 e8-g8 16. Rf1-e1 Be7-f6 17. c2-c3 Nb8-c6 18.',
        'Nb1-d2 Ra8-d8 19. Nd2-e4 Rf8-e8 20. Re1-e3 Nc6-e5 21. Ra1-e1 Ne5-d3 22.',
        'Ne4xf6+ g7xf6 23. Re3xe8+ Rd8xe8 24. Re1xe8+ Kg8-g7 25. b2-b4 Nd3-e5 26.',
        'a2-a4 b7-b5 27. a4xb5 a6xb5 28. Re8-b8 Ne5-g4 29. Rb8xb5 Ng4-e5 30. Rb5-c5',
        'Kg7-f8 31. b4-b5 Kf8-e7 32. f2-f4 Ne5-d7 33. Rc5-c7 Ke7-d6 34. Rc7-c8',
        'Nd7-b6 35. Rc8-c6+ Kd6-d7 36. Rc6xb6 h7-h5 37. Rb6xf6 h5-h4 38. Rf6xf7+',
        'Kd7-d6 39. Rf7-h7 h4-h3 40. Rh7xh3 Kd6-e7 41. b5-b6 Ke7-f6 42. Rh3-h5',
        'Kf6-g7 43. b6-b7 Kg7-g8 44. b7-b8N Kg8-g7 45. c3-c4 Kg7-f6 46. c4-c5 Kf6-e7',
        '47. c5-c6 Ke7-f6 48. c6-c7 Kf6-e7 49. c7-c8B Ke7-d6 50. Nb8-a6 Kd6-e7 51.',
        'Bc8-e6 Ke7-f6 52. Na6-c5 Kf6-g7 53. Nc5-e4 Kg7-f8 54. Rh5-h8+ Kf8-g7 55.',
        'Rh8-g8+ Kg7-h6 56. Rg8-g6+ Kh6-h7 57. Ne4-f6+ Kh7-h8 58. Nf6-e4 Kh8-h7 59.',
        'f5-f6 Kh7xg6 60. f6-f7 Kg6-h5 61. f7-f8R Kh5-h6 62. f4-f5 Kh6-h7 63.',
        'Rf8-f7+ Kh7-h6 64. f5-f6 Kh6-g6 65. Rf7-g7+ Kg6-h5 66. f6-f7 Kh5-h4 67.',
        'f7-f8Q Kh4-h5 68. Qf8-h8# 1-0',
      ],
      fen: '7Q/6R1/4B3/7k/4N3/8/6PP/6K1 b - - 2 68',
      expect: true,
      sloppy: true,
    },
  ]

  const newline_chars = ['\n', '<br />', '\r\n', 'BLAH']

  tests.forEach((t, i) => {
    newline_chars.forEach((newline, j) => {
      it(i + String.fromCharCode(97 + j), () => {
        const sloppy = t.sloppy || false
        const result = chess.load_pgn(t.pgn.join(newline), {
          sloppy: sloppy,
          newline_char: newline,
        })
        const should_pass = t.expect

        /* some tests are expected to fail */
        if (should_pass) {
          /* some PGN's tests contain comments which are stripped during
           * parsing, so we'll need compare the results of the load against a
           * FEN string (instead of the reconstructed PGN [e.g.
           * test.pgn.join(newline)])
           */
          if ('fen' in t) {
            expect(result && chess.fen() == t.fen).toBe(true)
          } else {
            expect(
              result &&
                chess.pgn({ max_width: 65, newline_char: newline }) ==
                  t.pgn.join(newline)
            ).toBe(true)
          }
        } else {
          /* this test should fail, so make sure it does */
          expect(result == should_pass).toBe(true)
        }
      })
    })
  })

  // special case dirty file containing a mix of \n and \r\n
  it('dirty pgn', () => {
    const pgn =
      '[Event "Reykjavik WCh"]\n' +
      '[Site "Reykjavik WCh"]\n' +
      '[Date "1972.01.07"]\n' +
      '[EventDate "?"]\n' +
      '[Round "6"]\n' +
      '[Result "1-0"]\n' +
      '[White "Robert James Fischer"]\r\n' +
      '[Black "Boris Spassky"]\n' +
      '[ECO "D59"]\n' +
      '[WhiteElo "?"]\n' +
      '[BlackElo "?"]\n' +
      '[PlyCount "81"]\n' +
      '\r\n' +
      '1. c4 e6 2. Nf3 d5 3. d4 Nf6 4. Nc3 Be7 5. Bg5 O-O 6. e3 h6\n' +
      '7. Bh4 b6 8. cxd5 Nxd5 9. Bxe7 Qxe7 10. Nxd5 exd5 11. Rc1 Be6\n' +
      '12. Qa4 c5 13. Qa3 Rc8 14. Bb5 a6 15. dxc5 bxc5 16. O-O Ra7\n' +
      '17. Be2 Nd7 18. Nd4 Qf8 19. Nxe6 fxe6 20. e4 d4 21. f4 Qe7\r\n' +
      '22. e5 Rb8 23. Bc4 Kh8 24. Qh3 Nf8 25. b3 a5 26. f5 exf5\n' +
      '27. Rxf5 Nh7 28. Rcf1 Qd8 29. Qg3 Re7 30. h4 Rbb7 31. e6 Rbc7\n' +
      '32. Qe5 Qe8 33. a4 Qd8 34. R1f2 Qe8 35. R2f3 Qd8 36. Bd3 Qe8\n' +
      '37. Qe4 Nf6 38. Rxf6 gxf6 39. Rxf6 Kg8 40. Bc4 Kh8 41. Qf4 1-0\n'

    const result = chess.load_pgn(pgn, { newline_char: '\r?\n' })
    expect(result).toBe(true)

    expect(chess.load_pgn(pgn)).toBe(true)
    expect(chess.pgn().match(/^\[\[/) === null).toBe(true)
  })
})

describe('Manipulate Comments', () => {
  it('no comments', () => {
    const chess = new Chess()
    expect(chess.get_comment()).toBeUndefined()
    expect(chess.get_comments()).toEqual([])
    chess.move('e4')
    expect(chess.get_comment()).toBeUndefined()
    expect(chess.get_comments()).toEqual([])
    expect(chess.pgn()).toEqual('1. e4')
  })

  it('comment for initial position', () => {
    const chess = new Chess()
    chess.set_comment('starting position')
    expect(chess.get_comment()).toEqual('starting position')
    expect(chess.get_comments()).toEqual([
      { fen: chess.fen(), comment: 'starting position' },
    ])
    expect(chess.pgn()).toEqual('{starting position}')
  })

  it('comment for first move', () => {
    const chess = new Chess()
    chess.move('e4')
    const e4 = chess.fen()
    chess.set_comment('good move')
    expect(chess.get_comment()).toEqual('good move')
    expect(chess.get_comments()).toEqual([{ fen: e4, comment: 'good move' }])
    chess.move('e5')
    expect(chess.get_comment()).toBeUndefined()
    expect(chess.get_comments()).toEqual([{ fen: e4, comment: 'good move' }])
    expect(chess.pgn()).toEqual('1. e4 {good move} e5')
  })

  it('comment for last move', () => {
    const chess = new Chess()
    chess.move('e4')
    chess.move('e6')
    chess.set_comment('dubious move')
    expect(chess.get_comment()).toEqual('dubious move')
    expect(chess.get_comments()).toEqual([
      { fen: chess.fen(), comment: 'dubious move' },
    ])
    expect(chess.pgn()).toEqual('1. e4 e6 {dubious move}')
  })

  it('comment with brackets', () => {
    const chess = new Chess()
    chess.set_comment('{starting position}')
    expect(chess.get_comment()).toEqual('[starting position]')
  })

  it('comments for everything', () => {
    const chess = new Chess()

    const initial = chess.fen()
    chess.set_comment('starting position')
    expect(chess.get_comment()).toEqual('starting position')
    expect(chess.get_comments()).toEqual([
      { fen: initial, comment: 'starting position' },
    ])
    expect(chess.pgn()).toEqual('{starting position}')

    chess.move('e4')
    const e4 = chess.fen()
    chess.set_comment('good move')
    expect(chess.get_comment()).toEqual('good move')
    expect(chess.get_comments()).toEqual([
      { fen: initial, comment: 'starting position' },
      { fen: e4, comment: 'good move' },
    ])
    expect(chess.pgn()).toEqual('{starting position} 1. e4 {good move}')

    chess.move('e6')
    const e6 = chess.fen()
    chess.set_comment('dubious move')
    expect(chess.get_comment()).toEqual('dubious move')
    expect(chess.get_comments()).toEqual([
      { fen: initial, comment: 'starting position' },
      { fen: e4, comment: 'good move' },
      { fen: e6, comment: 'dubious move' },
    ])
    expect(chess.pgn()).toEqual(
      '{starting position} 1. e4 {good move} e6 {dubious move}'
    )
  })

  it('delete comments', () => {
    const chess = new Chess()
    expect(chess.delete_comment()).toBeUndefined()
    expect(chess.delete_comments()).toEqual([])
    const initial = chess.fen()
    chess.set_comment('starting position')
    chess.move('e4')
    const e4 = chess.fen()
    chess.set_comment('good move')
    chess.move('e6')
    const e6 = chess.fen()
    chess.set_comment('dubious move')
    expect(chess.get_comments()).toEqual([
      { fen: initial, comment: 'starting position' },
      { fen: e4, comment: 'good move' },
      { fen: e6, comment: 'dubious move' },
    ])
    expect(chess.delete_comment()).toEqual('dubious move')
    expect(chess.pgn()).toEqual('{starting position} 1. e4 {good move} e6')
    expect(chess.delete_comment()).toBeUndefined()
    expect(chess.delete_comments()).toEqual([
      { fen: initial, comment: 'starting position' },
      { fen: e4, comment: 'good move' },
    ])
    expect(chess.pgn()).toEqual('1. e4 e6')
  })

  it('prune comments', () => {
    const chess = new Chess()
    chess.move('e4')
    chess.set_comment('tactical')
    chess.undo()
    chess.move('d4')
    chess.set_comment('positional')
    expect(chess.get_comments()).toEqual([
      { fen: chess.fen(), comment: 'positional' },
    ])
    expect(chess.pgn()).toEqual('1. d4 {positional}')
  })

  it('clear comments', () => {
    const test = (fn) => {
      const chess = new Chess()
      chess.move('e4')
      chess.set_comment('good move')
      expect(chess.get_comments()).toEqual([
        { fen: chess.fen(), comment: 'good move' },
      ])
      fn(chess)
      expect(chess.get_comments()).toEqual([])
    }
    test((chess) => {
      chess.reset()
    })
    test((chess) => {
      chess.clear()
    })
    test((chess) => {
      chess.load(chess.fen())
    })
    test((chess) => {
      chess.load_pgn('1. e4')
    })
  })
})

describe('Format Comments', () => {
  it('wrap comments', () => {
    const chess = new Chess()
    chess.move('e4')
    chess.set_comment('good   move')
    chess.move('e5')
    chess.set_comment('classical response')
    expect(chess.pgn()).toEqual('1. e4 {good   move} e5 {classical response}')
    expect(chess.pgn({ max_width: 16 })).toEqual(
      ['1. e4 {good', 'move} e5', '{classical', 'response}'].join('\n')
    )
    expect(chess.pgn({ max_width: 2 })).toEqual(
      ['1.', 'e4', '{good', 'move}', 'e5', '{classical', 'response}'].join('\n')
    )
  })
})

describe('Load Comments', () => {
  const tests = [
    {
      name: 'bracket comments',
      input: '1. e4 {good move} e5 {classical response}',
      output: '1. e4 {good move} e5 {classical response}',
    },
    {
      name: 'semicolon comments',
      input: '1. e4 e5; romantic era\n 2. Nf3 Nc6; common continuation',
      output: '1. e4 e5 {romantic era} 2. Nf3 Nc6 {common continuation}',
    },
    {
      name: 'bracket and semicolon comments',
      input: '1. e4 {good!} e5; standard response\n 2. Nf3 Nc6 {common}',
      output: '1. e4 {good!} e5 {standard response} 2. Nf3 Nc6 {common}',
    },
    {
      name: 'bracket comments with newlines',
      input: '1. e4 {good\nmove} e5 {classical\nresponse}',
      output: '1. e4 {good move} e5 {classical response}',
    },
    {
      name: 'initial comment',
      input: '{ great game }\n1. e4 e5',
      output: '{ great game } 1. e4 e5',
    },
    {
      name: 'empty bracket comment',
      input: '1. e4 {}',
      output: '1. e4 {}',
    },
    {
      name: 'empty semicolon comment',
      input: '1. e4;\ne5',
      output: '1. e4 {} e5',
    },
    {
      name: 'unicode comment',
      input: '1. e4 {Δ, Й, ק ,م, ๗, あ, 叶, 葉, and 말}',
      output: '1. e4 {Δ, Й, ק ,م, ๗, あ, 叶, 葉, and 말}',
    },
    {
      name: 'semicolon in bracket comment',
      input: '1. e4 { a classic; well-studied } e5',
      output: '1. e4 { a classic; well-studied } e5',
    },
    {
      name: 'bracket in semicolon comment',
      input: '1. e4 e5 ; a classic {well-studied}',
      output: '1. e4 e5 {a classic {well-studied}}',
    },
    {
      name: 'markers in bracket comment',
      input: '1. e4 e5 {($1) 1. e4 is good}',
      output: '1. e4 e5 {($1) 1. e4 is good}',
    },
    {
      name: 'markers in semicolon comment',
      input: '1. e4 e5; ($1) 1. e4 is good',
      output: '1. e4 e5 {($1) 1. e4 is good}',
    },
  ]

  tests.forEach((test) => {
    it(`load ${test.name}`, () => {
      const chess = new Chess()
      chess.load_pgn(test.input)
      expect(chess.pgn()).toEqual(test.output)
    })
  })
})

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

describe('Validate FEN', () => {
  const chess = new Chess()
  const positions = [
    {
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNRw KQkq - 0 1',
      error_number: 1,
    },
    {
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 x',
      error_number: 2,
    },
    {
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0',
      error_number: 2,
    },
    {
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 -1',
      error_number: 2,
    },
    {
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - x 1',
      error_number: 3,
    },
    {
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - -1 1',
      error_number: 3,
    },
    {
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq e2 0 1',
      error_number: 4,
    },
    {
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq e7 0 1',
      error_number: 4,
    },
    {
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq x 0 1',
      error_number: 4,
    },
    {
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQxkq - 0 1',
      error_number: 5,
    },
    {
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w kqKQ - 0 1',
      error_number: 5,
    },
    {
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR ? KQkq - 0 1',
      error_number: 6,
    },
    { fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP w KQkq - 0 1', error_number: 7 },
    {
      fen: 'rnbqkbnr/pppppppp/17/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      error_number: 8,
    },
    {
      fen: 'rnbqk?nr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      error_number: 9,
    },
    {
      fen: 'rnbqkbnr/pppppppp/7/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      error_number: 10,
    },
    {
      fen: 'rnbqkbnr/p1p1p1p1p/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      error_number: 10,
    },
    {
      fen: 'r1bqkbnr/2pppppp/n7/1p6/8/4P3/PPPP1PPP/RNBQK1NR b KQkq b6 0 4',
      error_number: 11,
    },
    {
      fen: 'rnbqkbnr/1p1ppppp/B1p5/8/6P1/4P3/PPPP1P1P/RNBQK1NR w KQkq g3 0 3',
      error_number: 11,
    },
    {
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      error_number: 0,
    },
    {
      fen: 'rnbqkbnr/pppp1ppp/8/4p3/2P5/8/PP1PPPPP/RNBQKBNR w KQkq e6 0 2',
      error_number: 0,
    },
    {
      fen: '3r2k1/p1q2pp1/2nr1n1p/2p1p3/4P2B/P1P2Q1P/B4PP1/1R2R1K1 b - - 3 20',
      error_number: 0,
    },
    {
      fen: 'r2q1rk1/3bbppp/p3pn2/1p1pB3/3P4/1QNBP3/PP3PPP/R4RK1 w - - 4 13',
      error_number: 0,
    },
    {
      fen: 'rnbqk2r/ppp1bppp/4pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 1 5',
      error_number: 0,
    },
    {
      fen: '1k1rr3/1p5p/p1Pp2q1/3nppp1/PB6/3P4/3Q1PPP/1R3RK1 b - - 0 28',
      error_number: 0,
    },
    {
      fen: 'r3r1k1/3n1pp1/2q1p2p/2p5/p1p2P2/P3P2P/1PQ2BP1/1R2R1K1 w - - 0 27',
      error_number: 0,
    },
    {
      fen: 'r3rbk1/1R3p1p/3Pq1p1/6B1/p6P/5Q2/5PP1/3R2K1 b - - 3 26',
      error_number: 0,
    },
    {
      fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
      error_number: 0,
    },
    {
      fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
      error_number: 0,
    },
    {
      fen: 'r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 5',
      error_number: 0,
    },
    {
      fen: 'r1b2rk1/4bppp/p1np4/q3p1P1/1p2P2P/4BP2/PPP1N1Q1/1K1R1B1R w - - 0 17',
      error_number: 0,
    },
    {
      fen: 'r2q1rk1/ppp1bppp/2np1nb1/4p3/P1B1P1P1/3P1N1P/1PP2P2/RNBQR1K1 w - - 1 10',
      error_number: 0,
    },
    {
      fen: 'r2qkb1r/pb1n1p2/4pP2/1ppP2B1/2p5/2N3P1/PP3P1P/R2QKB1R b KQkq - 0 13',
      error_number: 0,
    },
    {
      fen: '3k1b1r/p2n1p2/5P2/2pN4/P1p2B2/1p3qP1/1P2KP2/3R4 w - - 0 29',
      error_number: 0,
    },
    {
      fen: 'rnbq1rk1/1pp1ppbp/p2p1np1/8/2PPP3/2N1BP2/PP2N1PP/R2QKB1R b KQ - 1 7',
      error_number: 0,
    },
    {
      fen: 'rn1qkb1r/pb1p1ppp/1p2pn2/4P3/2Pp4/5NP1/PP1N1PBP/R1BQK2R b KQkq - 0 8',
      error_number: 0,
    },
    {
      fen: 'rnbqkbnr/pp1p1ppp/4p3/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3',
      error_number: 0,
    },
    {
      fen: 'r1bq1rk1/pp2ppbp/3p1np1/8/3pPP2/3B4/PPPPN1PP/R1BQ1RK1 w - - 4 10',
      error_number: 0,
    },
    {
      fen: 'r1b3k1/5pbp/2N1p1p1/p6q/2p2P2/2P1B3/PPQ3PP/3R2K1 b - - 0 22',
      error_number: 0,
    },
    {
      fen: 'rnbqkb1r/ppp1pppp/3p1n2/8/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 1 3',
      error_number: 0,
    },
    {
      fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2PP4/2N2N2/PP2PPPP/R1BQKB1R b KQkq d3 0 4',
      error_number: 0,
    },
    {
      fen: 'r1bqk2r/ppp1bppp/2n5/3p4/3Pn3/3B1N2/PPP2PPP/RNBQ1RK1 w kq - 4 8',
      error_number: 0,
    },
    {
      fen: '4kb1r/1p3pp1/p3p3/4P1BN/1n1p1PPP/PR6/1P4r1/1KR5 b k - 0 24',
      error_number: 0,
    },
    {
      fen: 'r3kb1r/pbpp1ppp/1qp1n3/4P3/2P5/1N2Q3/PP1B1PPP/R3KB1R w KQkq - 7 13',
      error_number: 0,
    },
    {
      fen: 'r1b1r1k1/p4p1p/2pb2p1/3pn3/N7/4BP2/PPP2KPP/3RRB2 b - - 3 18',
      error_number: 0,
    },
    {
      fen: 'r1b2rk1/p2nqp1p/3P2p1/2p2p2/2B5/1PB3N1/P4PPP/R2Q2K1 b - - 0 18',
      error_number: 0,
    },
    {
      fen: 'rnb1k2r/1p3ppp/p3Pn2/8/3N2P1/2q1B3/P1P1BP1P/R2Q1K1R b kq - 1 12',
      error_number: 0,
    },
    {
      fen: 'rnb1k2r/1pq1bppp/p2ppn2/8/3NPP2/2N1B3/PPP1B1PP/R2QK2R w KQkq - 1 9',
      error_number: 0,
    },
    {
      fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
      error_number: 0,
    },
    {
      fen: '4r3/1pr3pk/p2p2q1/3Pppbp/8/1NPQ1PP1/PP2R2P/1K1R4 w - - 8 28',
      error_number: 0,
    },
    {
      fen: 'b2r3r/4kp2/p3p1p1/1p2P3/1P1n1P2/P1NB4/KP4P1/3R2R1 b - - 2 26',
      error_number: 0,
    },
    {
      fen: 'rnbqk2r/ppppppbp/5np1/8/2PPP3/2N5/PP3PPP/R1BQKBNR b KQkq e3 0 4',
      error_number: 0,
    },
    {
      fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2',
      error_number: 0,
    },
    {
      fen: 'rn1q1rk1/pbp2pp1/1p3b1p/3p4/3P4/2NBPN2/PP3PPP/2RQK2R b K - 1 11',
      error_number: 0,
    },
    {
      fen: '2rq1rk1/pp1bppbp/3p1np1/8/2BNP3/2N1BP2/PPPQ2PP/1K1R3R b - - 0 13',
      error_number: 0,
    },
    {
      fen: 'r2qkb1r/1p1bpppp/p1np4/6B1/B3P1n1/2PQ1N2/PP3PPP/RN2R1K1 b kq - 0 10',
      error_number: 0,
    },
    {
      fen: 'r1bq1rk1/1p2npb1/p6p/3p2p1/3P3B/2N5/PP2BPPP/R2QR1K1 w - - 0 15',
      error_number: 0,
    },
    {
      fen: 'r3r1k1/pbq1bppp/4pnn1/2p1B1N1/2P2P2/1P1B2N1/P3Q1PP/4RRK1 b - - 4 17',
      error_number: 0,
    },
    {
      fen: '4k3/5p2/p1q1pbp1/1pr1P3/3n1P2/1B2B2Q/PP3P2/3R3K w - - 1 28',
      error_number: 0,
    },
    {
      fen: '2k4r/pp1r1p1p/8/2Pq1p2/1Pn2P2/PQ3NP1/3p1NKP/R7 b - - 0 28',
      error_number: 0,
    },
    {
      fen: 'rnbqkb1r/ppp2ppp/3p1n2/4N3/4P3/8/PPPP1PPP/RNBQKB1R w KQkq - 0 4',
      error_number: 0,
    },
    {
      fen: '3r1rk1/Qpp2p1p/7q/1P2P1p1/2B1Rn2/6NP/P4P1P/5RK1 b - - 0 22',
      error_number: 0,
    },
    {
      fen: 'rn2kb1r/2qp1ppp/b3pn2/2pP2B1/1pN1P3/5P2/PP4PP/R2QKBNR w KQkq - 4 11',
      error_number: 0,
    },
    {
      fen: 'r3k2r/pp1nbp1p/2p2pb1/3p4/3P3N/2N1P3/PP3PPP/R3KB1R w KQkq - 4 12',
      error_number: 0,
    },
    {
      fen: 'rn1qr1k1/pbppbppp/1p3n2/3P4/8/P1N1P1P1/1P2NPBP/R1BQK2R b KQ - 2 10',
      error_number: 0,
    },
    {
      fen: 'r1bqk2r/pp1nbppp/2p2n2/3p2B1/3P4/2N1PN2/PP3PPP/R2QKB1R w KQkq - 1 8',
      error_number: 0,
    },
    {
      fen: 'r1bqk2r/pppp1pp1/2n2n1p/8/1bPN3B/2N5/PP2PPPP/R2QKB1R b KQkq - 1 7',
      error_number: 0,
    },
    {
      fen: 'r1bqk2r/1pppbppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 4 6',
      error_number: 0,
    },
    {
      fen: 'r1b1kb1r/p2p1ppp/1qp1p3/3nP3/2P1NP2/8/PP4PP/R1BQKB1R b KQkq c3 0 10',
      error_number: 0,
    },
    { fen: '8/R7/2b5/3k2K1/P1p1r3/2B5/1P6/8 b - - 8 74', error_number: 0 },
    {
      fen: '2q5/5pk1/5p1p/4b3/1p1pP3/7P/1Pr3P1/R2Q1RK1 w - - 14 37',
      error_number: 0,
    },
    {
      fen: 'r4rk1/1bqnbppp/p2p4/1p2p3/3BPP2/P1NB4/1PP3PP/3RQR1K w - - 0 16',
      error_number: 0,
    },
    {
      fen: 'r1bqk2r/pp1n1ppp/2pbpn2/6N1/3P4/3B1N2/PPP2PPP/R1BQK2R w KQkq - 2 8',
      error_number: 0,
    },
    {
      fen: 'r1b1kb1r/pp3ppp/1qnppn2/8/2B1PB2/1NN5/PPP2PPP/R2QK2R b KQkq - 1 8',
      error_number: 0,
    },
    {
      fen: '1r3r1k/2q1n1pb/pn5p/1p2pP2/6B1/PPNRQ2P/2P1N1P1/3R3K b - - 0 28',
      error_number: 0,
    },
    {
      fen: 'rnbqk2r/ppp1bppp/4pn2/3p2B1/2PP4/2N2N2/PP2PPPP/R2QKB1R b KQkq - 3 5',
      error_number: 0,
    },
    {
      fen: '2r3k1/5pp1/p2p3p/1p1Pp2P/5b2/8/qP1K2P1/3QRB1R w - - 0 26',
      error_number: 0,
    },
    {
      fen: '6k1/1Q3p2/2p1r3/B1Pn2p1/3P1b1p/5P1P/5P2/5K2 w - - 6 47',
      error_number: 0,
    },
    { fen: '8/k7/Pr2R3/7p/8/4n1P1/1r2p1P1/4R1K1 w - - 0 59', error_number: 0 },
    {
      fen: '8/3k4/1nbPp2p/1pK2np1/p7/PP1R1P2/2P4P/4R3 b - - 7 34',
      error_number: 0,
    },
    {
      fen: '4rbk1/rnR2p1p/pp2pnp1/3p4/3P4/1P2PB1P/P2BNPP1/R5K1 b - - 0 20',
      error_number: 0,
    },
    { fen: '5r2/6pk/8/p3P1p1/1R6/7Q/1Pr2P1K/2q5 b - - 2 48', error_number: 0 },
    {
      fen: '1br2rk1/2q2pp1/p3bnp1/1p1p4/8/1PN1PBPP/PB1Q1P2/R2R2K1 b - - 0 19',
      error_number: 0,
    },
    {
      fen: '4r1k1/b4p2/p4pp1/1p6/3p1N1P/1P2P1P1/P4P2/3R2K1 w - - 0 30',
      error_number: 0,
    },
    {
      fen: '3rk3/1Q4p1/p3p3/4RPqp/4p2P/P7/KPP5/8 b - h3 0 33',
      error_number: 0,
    },
    {
      fen: '6k1/1p1r1pp1/5qp1/p1pBP3/Pb3n2/1Q1RB2P/1P3PP1/6K1 b - - 0 28',
      error_number: 0,
    },
    {
      fen: '3r2k1/pp2bp2/1q4p1/3p1b1p/4PB1P/2P2PQ1/P2R2P1/3R2K1 w - - 1 28',
      error_number: 0,
    },
    {
      fen: '3r4/p1qn1pk1/1p1R3p/2P1pQpP/8/4B3/5PP1/6K1 w - - 0 35',
      error_number: 0,
    },
    {
      fen: 'rnb1k1nr/pp2q1pp/2pp4/4pp2/2PPP3/8/PP2NPPP/R1BQKB1R w KQkq f6 0 8',
      error_number: 0,
    },
    {
      fen: 'rnbqkbnr/pp1ppppp/2p5/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq d3 0 2',
      error_number: 0,
    },
    {
      fen: '4q1k1/6p1/p2rnpPp/1p2p3/7P/1BP5/PP3Q2/1K3R2 w - - 0 34',
      error_number: 0,
    },
    {
      fen: '3r2k1/p1q2pp1/1n2rn1p/1B2p3/P1p1P3/2P3BP/4QPP1/1R2R1K1 b - - 1 25',
      error_number: 0,
    },
    { fen: '8/p7/1b2BkR1/5P2/4K3/7r/P7/8 b - - 9 52', error_number: 0 },
    {
      fen: '2rq2k1/p4p1p/1p1prp2/1Ppb4/8/P1QPP1P1/1B3P1P/R3R1K1 w - - 2 20',
      error_number: 0,
    },
    {
      fen: '8/1pQ3bk/p2p1qp1/P2Pp2p/NP6/7P/5PP1/6K1 w - - 1 36',
      error_number: 0,
    },
    {
      fen: '8/1pQ3bk/p2p2p1/P2Pp2p/1P5P/2N3P1/2q2PK1/8 b - - 0 39',
      error_number: 0,
    },
    {
      fen: 'r1bq1rk1/pp2n1bp/2pp1np1/3PppN1/1PP1P3/2N2B2/P4PPP/R1BQR1K1 w - - 0 13',
      error_number: 0,
    },
    {
      fen: '1r4k1/5p2/3P2pp/p3Pp2/5q2/2Q2P1P/5P2/4R1K1 w - - 0 29',
      error_number: 0,
    },
    {
      fen: 'rnbqkbnr/pp2pppp/3p4/8/3pP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 4',
      error_number: 0,
    },
    {
      fen: 'R2qk2r/2p2ppp/1bnp1n2/1p2p3/3PP1b1/1BP2N2/1P3PPP/1NBQ1RK1 b k - 0 11',
      error_number: 0,
    },
    {
      fen: '6k1/4qp2/3p2p1/3Pp2p/7P/4Q1P1/5PBK/8 b - - 20 57',
      error_number: 0,
    },
    { fen: '3k4/r3q3/3p1p2/2pB4/P7/7P/6P1/1Q4K1 b - - 6 43', error_number: 0 },
    {
      fen: '5k2/1n4p1/2p2p2/p2q1B1P/P4PK1/6P1/1Q6/8 b - - 4 46',
      error_number: 0,
    },
    {
      fen: '6k1/pr2pb2/5pp1/1B1p4/P7/4QP2/1PP3Pq/2KR4 w - - 1 27',
      error_number: 0,
    },
    {
      fen: '1rbqk2r/2pp1ppp/2n2n2/1pb1p3/4P3/1BP2N2/1P1P1PPP/RNBQ1RK1 b k - 0 9',
      error_number: 0,
    },
    {
      fen: '6r1/2p5/pbpp1k1r/5b2/3P1N1p/1PP2N1P/P4R2/2K1R3 w - - 4 33',
      error_number: 0,
    },
    {
      fen: 'rnbqkb1r/pppppppp/5n2/8/3P4/5N2/PPP1PPPP/RNBQKB1R b KQkq - 2 2',
      error_number: 0,
    },
    {
      fen: 'rnbqkb1r/pppppppp/5n2/8/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3 0 2',
      error_number: 0,
    },
    {
      fen: '4b3/5p1k/r7/p3BNQp/4P1pP/1r1n4/1P3P1N/7K b - - 2 40',
      error_number: 0,
    },
    {
      fen: 'r2q1rk1/pb1p2pp/1p1bpnn1/5p2/2PP4/PPN1BP1P/2B1N1P1/1R1Q1R1K b - - 2 16',
      error_number: 0,
    },
    {
      fen: 'rnbqkbnr/ppp1pppp/8/8/2pP4/5N2/PP2PPPP/RNBQKB1R b KQkq - 1 3',
      error_number: 0,
    },
    {
      fen: '4rrk1/8/p1pR4/1p6/1PPKNq2/3P1p2/PB5n/R2Q4 b - - 6 40',
      error_number: 0,
    },
    {
      fen: 'r1bqk1nr/1p2bppp/p1np4/4p3/2P1P3/N1N5/PP3PPP/R1BQKB1R b KQkq - 1 8',
      error_number: 0,
    },
    {
      fen: 'r1bqk2r/pp2bppp/2n1p3/3n4/3P4/2NB1N2/PP3PPP/R1BQ1RK1 b kq - 3 9',
      error_number: 0,
    },
    {
      fen: 'r1bqkbnr/pppp2pp/2n5/1B2p3/3Pp3/5N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
      error_number: 0,
    },
    {
      fen: '2n1r3/p1k2pp1/B1p3b1/P7/5bP1/2N1B3/1P2KP2/2R5 b - - 4 25',
      error_number: 0,
    },
    {
      fen: 'r4rk1/2q3pp/4p3/p1Pn1p2/1p1P4/4PP2/1B1Q2PP/R3R1K1 w - - 0 22',
      error_number: 0,
    },
    { fen: '8/8/1p6/3b4/1P1k1p2/8/3KBP2/8 w - - 2 68', error_number: 0 },
    {
      fen: '2b2k2/1p5p/2p5/p1p1q3/2PbN3/1P5P/P5B1/3RR2K w - - 4 33',
      error_number: 0,
    },
    {
      fen: '1b6/5kp1/5p2/1b1p4/1P6/4PPq1/2Q2RNp/7K b - - 2 41',
      error_number: 0,
    },
    {
      fen: 'r3r1k1/p2nqpp1/bpp2n1p/3p4/B2P4/P1Q1PP2/1P2NBPP/R3K2R w KQ - 6 16',
      error_number: 0,
    },
    {
      fen: 'r3k2r/8/p4p2/3p2p1/4b3/2R2PP1/P6P/4R1K1 b kq - 0 27',
      error_number: 0,
    },
    {
      fen: 'r1rb2k1/5ppp/pqp5/3pPb2/QB1P4/2R2N2/P4PPP/2R3K1 b - - 7 23',
      error_number: 0,
    },
    {
      fen: '3r1r2/3P2pk/1p1R3p/1Bp2p2/6q1/4Q3/PP3P1P/7K w - - 4 30',
      error_number: 0,
    },
  ]

  positions.forEach((position) => {
    it(position.fen + ' (valid: ' + (position.error_number == 0) + ')', () => {
      const result = chess.validate_fen(position.fen)
      expect(result.error_number == position.error_number).toBe(true)
    })
  })
})

describe('History', () => {
  const chess = new Chess()
  const tests = [
    {
      verbose: false,
      fen: '4q2k/2r1r3/4PR1p/p1p5/P1Bp1Q1P/1P6/6P1/6K1 b - - 4 41',
      moves: [
        'c4',
        'e6',
        'Nf3',
        'd5',
        'd4',
        'Nf6',
        'Nc3',
        'Be7',
        'Bg5',
        'O-O',
        'e3',
        'h6',
        'Bh4',
        'b6',
        'cxd5',
        'Nxd5',
        'Bxe7',
        'Qxe7',
        'Nxd5',
        'exd5',
        'Rc1',
        'Be6',
        'Qa4',
        'c5',
        'Qa3',
        'Rc8',
        'Bb5',
        'a6',
        'dxc5',
        'bxc5',
        'O-O',
        'Ra7',
        'Be2',
        'Nd7',
        'Nd4',
        'Qf8',
        'Nxe6',
        'fxe6',
        'e4',
        'd4',
        'f4',
        'Qe7',
        'e5',
        'Rb8',
        'Bc4',
        'Kh8',
        'Qh3',
        'Nf8',
        'b3',
        'a5',
        'f5',
        'exf5',
        'Rxf5',
        'Nh7',
        'Rcf1',
        'Qd8',
        'Qg3',
        'Re7',
        'h4',
        'Rbb7',
        'e6',
        'Rbc7',
        'Qe5',
        'Qe8',
        'a4',
        'Qd8',
        'R1f2',
        'Qe8',
        'R2f3',
        'Qd8',
        'Bd3',
        'Qe8',
        'Qe4',
        'Nf6',
        'Rxf6',
        'gxf6',
        'Rxf6',
        'Kg8',
        'Bc4',
        'Kh8',
        'Qf4',
      ],
    },
    {
      verbose: true,
      fen: '4q2k/2r1r3/4PR1p/p1p5/P1Bp1Q1P/1P6/6P1/6K1 b - - 4 41',
      moves: [
        {
          color: 'w',
          from: 'c2',
          to: 'c4',
          flags: 'b',
          piece: 'p',
          san: 'c4',
        },
        {
          color: 'b',
          from: 'e7',
          to: 'e6',
          flags: 'n',
          piece: 'p',
          san: 'e6',
        },
        {
          color: 'w',
          from: 'g1',
          to: 'f3',
          flags: 'n',
          piece: 'n',
          san: 'Nf3',
        },
        {
          color: 'b',
          from: 'd7',
          to: 'd5',
          flags: 'b',
          piece: 'p',
          san: 'd5',
        },
        {
          color: 'w',
          from: 'd2',
          to: 'd4',
          flags: 'b',
          piece: 'p',
          san: 'd4',
        },
        {
          color: 'b',
          from: 'g8',
          to: 'f6',
          flags: 'n',
          piece: 'n',
          san: 'Nf6',
        },
        {
          color: 'w',
          from: 'b1',
          to: 'c3',
          flags: 'n',
          piece: 'n',
          san: 'Nc3',
        },
        {
          color: 'b',
          from: 'f8',
          to: 'e7',
          flags: 'n',
          piece: 'b',
          san: 'Be7',
        },
        {
          color: 'w',
          from: 'c1',
          to: 'g5',
          flags: 'n',
          piece: 'b',
          san: 'Bg5',
        },
        {
          color: 'b',
          from: 'e8',
          to: 'g8',
          flags: 'k',
          piece: 'k',
          san: 'O-O',
        },
        {
          color: 'w',
          from: 'e2',
          to: 'e3',
          flags: 'n',
          piece: 'p',
          san: 'e3',
        },
        {
          color: 'b',
          from: 'h7',
          to: 'h6',
          flags: 'n',
          piece: 'p',
          san: 'h6',
        },
        {
          color: 'w',
          from: 'g5',
          to: 'h4',
          flags: 'n',
          piece: 'b',
          san: 'Bh4',
        },
        {
          color: 'b',
          from: 'b7',
          to: 'b6',
          flags: 'n',
          piece: 'p',
          san: 'b6',
        },
        {
          color: 'w',
          from: 'c4',
          to: 'd5',
          flags: 'c',
          piece: 'p',
          captured: 'p',
          san: 'cxd5',
        },
        {
          color: 'b',
          from: 'f6',
          to: 'd5',
          flags: 'c',
          piece: 'n',
          captured: 'p',
          san: 'Nxd5',
        },
        {
          color: 'w',
          from: 'h4',
          to: 'e7',
          flags: 'c',
          piece: 'b',
          captured: 'b',
          san: 'Bxe7',
        },
        {
          color: 'b',
          from: 'd8',
          to: 'e7',
          flags: 'c',
          piece: 'q',
          captured: 'b',
          san: 'Qxe7',
        },
        {
          color: 'w',
          from: 'c3',
          to: 'd5',
          flags: 'c',
          piece: 'n',
          captured: 'n',
          san: 'Nxd5',
        },
        {
          color: 'b',
          from: 'e6',
          to: 'd5',
          flags: 'c',
          piece: 'p',
          captured: 'n',
          san: 'exd5',
        },
        {
          color: 'w',
          from: 'a1',
          to: 'c1',
          flags: 'n',
          piece: 'r',
          san: 'Rc1',
        },
        {
          color: 'b',
          from: 'c8',
          to: 'e6',
          flags: 'n',
          piece: 'b',
          san: 'Be6',
        },
        {
          color: 'w',
          from: 'd1',
          to: 'a4',
          flags: 'n',
          piece: 'q',
          san: 'Qa4',
        },
        {
          color: 'b',
          from: 'c7',
          to: 'c5',
          flags: 'b',
          piece: 'p',
          san: 'c5',
        },
        {
          color: 'w',
          from: 'a4',
          to: 'a3',
          flags: 'n',
          piece: 'q',
          san: 'Qa3',
        },
        {
          color: 'b',
          from: 'f8',
          to: 'c8',
          flags: 'n',
          piece: 'r',
          san: 'Rc8',
        },
        {
          color: 'w',
          from: 'f1',
          to: 'b5',
          flags: 'n',
          piece: 'b',
          san: 'Bb5',
        },
        {
          color: 'b',
          from: 'a7',
          to: 'a6',
          flags: 'n',
          piece: 'p',
          san: 'a6',
        },
        {
          color: 'w',
          from: 'd4',
          to: 'c5',
          flags: 'c',
          piece: 'p',
          captured: 'p',
          san: 'dxc5',
        },
        {
          color: 'b',
          from: 'b6',
          to: 'c5',
          flags: 'c',
          piece: 'p',
          captured: 'p',
          san: 'bxc5',
        },
        {
          color: 'w',
          from: 'e1',
          to: 'g1',
          flags: 'k',
          piece: 'k',
          san: 'O-O',
        },
        {
          color: 'b',
          from: 'a8',
          to: 'a7',
          flags: 'n',
          piece: 'r',
          san: 'Ra7',
        },
        {
          color: 'w',
          from: 'b5',
          to: 'e2',
          flags: 'n',
          piece: 'b',
          san: 'Be2',
        },
        {
          color: 'b',
          from: 'b8',
          to: 'd7',
          flags: 'n',
          piece: 'n',
          san: 'Nd7',
        },
        {
          color: 'w',
          from: 'f3',
          to: 'd4',
          flags: 'n',
          piece: 'n',
          san: 'Nd4',
        },
        {
          color: 'b',
          from: 'e7',
          to: 'f8',
          flags: 'n',
          piece: 'q',
          san: 'Qf8',
        },
        {
          color: 'w',
          from: 'd4',
          to: 'e6',
          flags: 'c',
          piece: 'n',
          captured: 'b',
          san: 'Nxe6',
        },
        {
          color: 'b',
          from: 'f7',
          to: 'e6',
          flags: 'c',
          piece: 'p',
          captured: 'n',
          san: 'fxe6',
        },
        {
          color: 'w',
          from: 'e3',
          to: 'e4',
          flags: 'n',
          piece: 'p',
          san: 'e4',
        },
        {
          color: 'b',
          from: 'd5',
          to: 'd4',
          flags: 'n',
          piece: 'p',
          san: 'd4',
        },
        {
          color: 'w',
          from: 'f2',
          to: 'f4',
          flags: 'b',
          piece: 'p',
          san: 'f4',
        },
        {
          color: 'b',
          from: 'f8',
          to: 'e7',
          flags: 'n',
          piece: 'q',
          san: 'Qe7',
        },
        {
          color: 'w',
          from: 'e4',
          to: 'e5',
          flags: 'n',
          piece: 'p',
          san: 'e5',
        },
        {
          color: 'b',
          from: 'c8',
          to: 'b8',
          flags: 'n',
          piece: 'r',
          san: 'Rb8',
        },
        {
          color: 'w',
          from: 'e2',
          to: 'c4',
          flags: 'n',
          piece: 'b',
          san: 'Bc4',
        },
        {
          color: 'b',
          from: 'g8',
          to: 'h8',
          flags: 'n',
          piece: 'k',
          san: 'Kh8',
        },
        {
          color: 'w',
          from: 'a3',
          to: 'h3',
          flags: 'n',
          piece: 'q',
          san: 'Qh3',
        },
        {
          color: 'b',
          from: 'd7',
          to: 'f8',
          flags: 'n',
          piece: 'n',
          san: 'Nf8',
        },
        {
          color: 'w',
          from: 'b2',
          to: 'b3',
          flags: 'n',
          piece: 'p',
          san: 'b3',
        },
        {
          color: 'b',
          from: 'a6',
          to: 'a5',
          flags: 'n',
          piece: 'p',
          san: 'a5',
        },
        {
          color: 'w',
          from: 'f4',
          to: 'f5',
          flags: 'n',
          piece: 'p',
          san: 'f5',
        },
        {
          color: 'b',
          from: 'e6',
          to: 'f5',
          flags: 'c',
          piece: 'p',
          captured: 'p',
          san: 'exf5',
        },
        {
          color: 'w',
          from: 'f1',
          to: 'f5',
          flags: 'c',
          piece: 'r',
          captured: 'p',
          san: 'Rxf5',
        },
        {
          color: 'b',
          from: 'f8',
          to: 'h7',
          flags: 'n',
          piece: 'n',
          san: 'Nh7',
        },
        {
          color: 'w',
          from: 'c1',
          to: 'f1',
          flags: 'n',
          piece: 'r',
          san: 'Rcf1',
        },
        {
          color: 'b',
          from: 'e7',
          to: 'd8',
          flags: 'n',
          piece: 'q',
          san: 'Qd8',
        },
        {
          color: 'w',
          from: 'h3',
          to: 'g3',
          flags: 'n',
          piece: 'q',
          san: 'Qg3',
        },
        {
          color: 'b',
          from: 'a7',
          to: 'e7',
          flags: 'n',
          piece: 'r',
          san: 'Re7',
        },
        {
          color: 'w',
          from: 'h2',
          to: 'h4',
          flags: 'b',
          piece: 'p',
          san: 'h4',
        },
        {
          color: 'b',
          from: 'b8',
          to: 'b7',
          flags: 'n',
          piece: 'r',
          san: 'Rbb7',
        },
        {
          color: 'w',
          from: 'e5',
          to: 'e6',
          flags: 'n',
          piece: 'p',
          san: 'e6',
        },
        {
          color: 'b',
          from: 'b7',
          to: 'c7',
          flags: 'n',
          piece: 'r',
          san: 'Rbc7',
        },
        {
          color: 'w',
          from: 'g3',
          to: 'e5',
          flags: 'n',
          piece: 'q',
          san: 'Qe5',
        },
        {
          color: 'b',
          from: 'd8',
          to: 'e8',
          flags: 'n',
          piece: 'q',
          san: 'Qe8',
        },
        {
          color: 'w',
          from: 'a2',
          to: 'a4',
          flags: 'b',
          piece: 'p',
          san: 'a4',
        },
        {
          color: 'b',
          from: 'e8',
          to: 'd8',
          flags: 'n',
          piece: 'q',
          san: 'Qd8',
        },
        {
          color: 'w',
          from: 'f1',
          to: 'f2',
          flags: 'n',
          piece: 'r',
          san: 'R1f2',
        },
        {
          color: 'b',
          from: 'd8',
          to: 'e8',
          flags: 'n',
          piece: 'q',
          san: 'Qe8',
        },
        {
          color: 'w',
          from: 'f2',
          to: 'f3',
          flags: 'n',
          piece: 'r',
          san: 'R2f3',
        },
        {
          color: 'b',
          from: 'e8',
          to: 'd8',
          flags: 'n',
          piece: 'q',
          san: 'Qd8',
        },
        {
          color: 'w',
          from: 'c4',
          to: 'd3',
          flags: 'n',
          piece: 'b',
          san: 'Bd3',
        },
        {
          color: 'b',
          from: 'd8',
          to: 'e8',
          flags: 'n',
          piece: 'q',
          san: 'Qe8',
        },
        {
          color: 'w',
          from: 'e5',
          to: 'e4',
          flags: 'n',
          piece: 'q',
          san: 'Qe4',
        },
        {
          color: 'b',
          from: 'h7',
          to: 'f6',
          flags: 'n',
          piece: 'n',
          san: 'Nf6',
        },
        {
          color: 'w',
          from: 'f5',
          to: 'f6',
          flags: 'c',
          piece: 'r',
          captured: 'n',
          san: 'Rxf6',
        },
        {
          color: 'b',
          from: 'g7',
          to: 'f6',
          flags: 'c',
          piece: 'p',
          captured: 'r',
          san: 'gxf6',
        },
        {
          color: 'w',
          from: 'f3',
          to: 'f6',
          flags: 'c',
          piece: 'r',
          captured: 'p',
          san: 'Rxf6',
        },
        {
          color: 'b',
          from: 'h8',
          to: 'g8',
          flags: 'n',
          piece: 'k',
          san: 'Kg8',
        },
        {
          color: 'w',
          from: 'd3',
          to: 'c4',
          flags: 'n',
          piece: 'b',
          san: 'Bc4',
        },
        {
          color: 'b',
          from: 'g8',
          to: 'h8',
          flags: 'n',
          piece: 'k',
          san: 'Kh8',
        },
        {
          color: 'w',
          from: 'e4',
          to: 'f4',
          flags: 'n',
          piece: 'q',
          san: 'Qf4',
        },
      ],
      fen: '4q2k/2r1r3/4PR1p/p1p5/P1Bp1Q1P/1P6/6P1/6K1 b - - 4 41',
    },
  ]

  tests.forEach((t, i) => {
    const passed = true

    it('History ' + i, () => {
      chess.reset()

      for (let j = 0; j < t.moves.length; j++) {
        chess.move(t.moves[j])
      }

      const history = chess.history({ verbose: t.verbose })
      if (t.fen != chess.fen()) {
        passed = false
      } else if (history.length != t.moves.length) {
        passed = false
      } else {
        for (let j = 0; j < t.moves.length; j++) {
          if (!t.verbose) {
            if (history[j] != t.moves[j]) {
              passed = false
              break
            }
          } else {
            for (const key in history[j]) {
              if (history[j][key] != t.moves[j][key]) {
                passed = false
                break
              }
            }
          }
        }
      }
      expect(passed).toBe(true)
    })
  })
})

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

  tests.forEach((test) => {
    it('Board - ' + test.fen, () => {
      const chess = new Chess(test.fen)
      expect(JSON.stringify(chess.board()) === JSON.stringify(test.board)).toBe(
        true
      )
    })
  })
})

describe('Parse PGN Headers', () => {
  it('Github Issue #191 - whitespace before closing bracket', () => {
    const pgn = [
      '[Event "Reykjavik WCh"]',
      '[Site "Reykjavik WCh"]',
      '[Date "1972.01.07" ]',
      '[EventDate "?"]',
      '[Round "6"]',
      '[Result "1-0"]',
      '[White "Robert James Fischer"]',
      '[Black "Boris Spassky"]',
      '[ECO "D59"]',
      '[WhiteElo "?"]',
      '[BlackElo "?"]',
      '[PlyCount "81"]',
      '',
      '1. c4 e6 2. Nf3 d5 3. d4 Nf6 4. Nc3 Be7 5. Bg5 O-O 6. e3 h6',
      '7. Bh4 b6 8. cxd5 Nxd5 9. Bxe7 Qxe7 10. Nxd5 exd5 11. Rc1 Be6',
      '12. Qa4 c5 13. Qa3 Rc8 14. Bb5 a6 15. dxc5 bxc5 16. O-O Ra7',
      '17. Be2 Nd7 18. Nd4 Qf8 19. Nxe6 fxe6 20. e4 d4 21. f4 Qe7',
      '22. e5 Rb8 23. Bc4 Kh8 24. Qh3 Nf8 25. b3 a5 26. f5 exf5',
      '27. Rxf5 Nh7 28. Rcf1 Qd8 29. Qg3 Re7 30. h4 Rbb7 31. e6 Rbc7',
      '32. Qe5 Qe8 33. a4 Qd8 34. R1f2 Qe8 35. R2f3 Qd8 36. Bd3 Qe8',
      '37. Qe4 Nf6 38. Rxf6 gxf6 39. Rxf6 Kg8 40. Bc4 Kh8 41. Qf4 1-0',
    ]
    const chess = new Chess()
    chess.load_pgn(pgn.join('\n'))
    expect(chess.header()['Date']).toBe('1972.01.07')
  })
})

describe('ASCII Board', () => {
  it('Draws an ASCII board', () => {
    const output = [
      '   +------------------------+',
      ' 8 | r  .  .  .  .  r  k  . |',
      ' 7 | .  .  .  .  n  q  p  p |',
      ' 6 | .  p  .  p  .  .  .  . |',
      ' 5 | .  .  p  P  p  p  .  . |',
      ' 4 | b  P  P  .  P  .  .  . |',
      ' 3 | R  .  B  .  N  Q  .  . |',
      ' 2 | P  .  .  .  .  P  P  P |',
      ' 1 | .  R  .  .  .  .  K  . |',
      '   +------------------------+',
      '     a  b  c  d  e  f  g  h',
    ]

    const chess = new Chess(
      'r4rk1/4nqpp/1p1p4/2pPpp2/bPP1P3/R1B1NQ2/P4PPP/1R4K1 w - - 0 28'
    )

    expect(chess.ascii()).toBe(output.join('\n'))
  })
})

describe('Regression Tests', () => {
  it('Github Issue #32 - castling flag reappearing', () => {
    const chess = new Chess(
      'b3k2r/5p2/4p3/1p5p/6p1/2PR2P1/BP3qNP/6QK b k - 2 28'
    )
    chess.move({ from: 'a8', to: 'g2' })
    expect(chess.fen()).toEqual(
      '4k2r/5p2/4p3/1p5p/6p1/2PR2P1/BP3qbP/6QK w k - 0 29'
    )
  })

  it('Github Issue #58 - placing more than one king', () => {
    const chess = new Chess('N3k3/8/8/8/8/8/5b2/4K3 w - - 0 1')
    expect(chess.put({ type: 'k', color: 'w' }, 'a1')).toBe(false)
    chess.put({ type: 'q', color: 'w' }, 'a1')
    chess.remove('a1')
    expect(chess.moves().join(' ')).toBe('Kd2 Ke2 Kxf2 Kf1 Kd1')
  })

  it('Github Issue #85 (white) - SetUp and FEN should be accepted in load_pgn', () => {
    const chess = new Chess()
    const pgn = [
      '[SetUp "1"]',
      '[FEN "7k/5K2/4R3/8/8/8/8/8 w KQkq - 0 1"]',
      '',
      '1. Rh6#',
    ]
    const result = chess.load_pgn(pgn.join('\n'))
    expect(result).toBe(true)
    expect(chess.fen()).toBe('7k/5K2/7R/8/8/8/8/8 b KQkq - 1 1')
  })

  it('Github Issue #85 (black) - SetUp and FEN should be accepted in load_pgn', () => {
    const chess = new Chess()
    const pgn = [
      '[SetUp "1"]',
      '[FEN "r4r1k/1p4b1/3p3p/5qp1/1RP5/6P1/3NP3/2Q2RKB b KQkq - 0 1"]',
      '',
      '1. ... Qc5+',
    ]
    const result = chess.load_pgn(pgn.join('\n'))
    expect(result).toBe(true)
    expect(chess.fen()).toBe(
      'r4r1k/1p4b1/3p3p/2q3p1/1RP5/6P1/3NP3/2Q2RKB w KQkq - 1 2'
    )
  })

  it('Github Issue #98 (white) - Wrong movement number after setting a position via FEN', () => {
    const chess = new Chess()
    chess.load('4r3/8/2p2PPk/1p6/pP2p1R1/P1B5/2P2K2/3r4 w - - 1 45')
    chess.move('f7')
    const result = chess.pgn()
    expect(result.match(/(45\. f7)$/)[0]).toBe('45. f7')
  })

  it('Github Issue #98 (black) - Wrong movement number after setting a position via FEN', () => {
    const chess = new Chess()
    chess.load('4r3/8/2p2PPk/1p6/pP2p1R1/P1B5/2P2K2/3r4 b - - 1 45')
    chess.move('Rf1+')
    const result = chess.pgn()
    expect(result.match(/(45\. \.\.\. Rf1\+)$/)[0]).toBe('45. ... Rf1+')
  })

  it('Github Issue #129 load_pgn() should not clear headers if PGN contains SetUp and FEN tags', () => {
    const pgn = [
      '[Event "Test Olympiad"]',
      '[Site "Earth"]',
      '[Date "????.??.??"]',
      '[Round "6"]',
      '[White "Testy"]',
      '[Black "McTest"]',
      '[Result "*"]',
      '[FEN "rnbqkb1r/1p3ppp/p2ppn2/6B1/3NP3/2N5/PPP2PPP/R2QKB1R w KQkq - 0 1"]',
      '[SetUp "1"]',
      '',
      '1.Qd2 Be7 *',
    ]

    const chess = new Chess()
    expect(chess.load_pgn(pgn.join('\n'))).toEqual(true)
    const expected = {
      Event: 'Test Olympiad',
      Site: 'Earth',
      Date: '????.??.??',
      Round: '6',
      White: 'Testy',
      Black: 'McTest',
      Result: '*',
      FEN: 'rnbqkb1r/1p3ppp/p2ppn2/6B1/3NP3/2N5/PPP2PPP/R2QKB1R w KQkq - 0 1',
      SetUp: '1',
    }
    expect(chess.header()).toEqual(expected)
  })

  it('Github Issue #129 clear() should clear the board and delete all headers with the exception of SetUp and FEN', () => {
    const pgn = [
      '[Event "Test Olympiad"]',
      '[Site "Earth"]',
      '[Date "????.??.??"]',
      '[Round "6"]',
      '[White "Testy"]',
      '[Black "McTest"]',
      '[Result "*"]',
      '[FEN "rnbqkb1r/1p3ppp/p2ppn2/6B1/3NP3/2N5/PPP2PPP/R2QKB1R w KQkq - 0 1"]',
      '[SetUp "1"]',
      '',
      '1.Qd2 Be7 *',
    ]

    const chess = new Chess()
    chess.load_pgn(pgn.join('\n'))
    chess.clear()
    const expected = {
      FEN: '8/8/8/8/8/8/8/8 w - - 0 1',
      SetUp: '1',
    }
    expect(chess.header()).toEqual(expected)
  })

  it('Github Issue #284 - sloppy settings allows illegal moves', () => {
    const chess = new Chess('4k3/8/8/8/8/4p3/8/4K3 w - - 0 1')
    expect(chess.move('e1f2', { sloppy: true })).toBeNull()
  })

  it('Github Issue #282 - playing a move on an empty board throws an error', () => {
    const chess = new Chess('8/8/8/8/8/8/8/8 w KQkq - 0 1')
    expect(chess.move('e4')).toBeNull()
  })

  it('Github Issue #279 - load_pgn duplicate last move if it has a comment', () => {
    const history = [
      'e4',
      'e5',
      'Nf3',
      'Nc6',
      'Bb5',
      'd6',
      'd4',
      'Bd7',
      'Nc3',
      'Nf6',
      'Bxc6',
    ]

    // trailing comment - no end of game marker
    const chess = new Chess()
    let result = chess.load_pgn(
      '1. e4 e5 2. Nf3 Nc6 3. Bb5 d6 ' +
        '4. d4 Bd7 5. Nc3 Nf6 6. Bxc6 {comment}'
    )
    expect(result).toBe(true)
    expect(chess.history()).toEqual(history)
    expect(chess.header()['Result']).toBeUndefined()

    // trailing comment - end of game marker after comment
    result = chess.load_pgn(
      '1. e4 e5 2. Nf3 Nc6 3. Bb5 d6 ' +
        '4. d4 Bd7 5. Nc3 Nf6 6. Bxc6 {comment} *'
    )
    expect(result).toBe(true)
    expect(chess.history()).toEqual(history)
    expect(chess.header()['Result']).toBeUndefined()

    // trailing comment - end of game marker before comment
    result = chess.load_pgn(
      '1. e4 e5 2. Nf3 Nc6 3. Bb5 d6 ' +
        '4. d4 Bd7 5. Nc3 Nf6 6. Bxc6 * {comment}'
    )
    expect(result).toBe(true)
    expect(chess.history()).toEqual(history)
    expect(chess.header()['Result']).toBeUndefined()

    // trailing comment with PGN header - no end of game marker
    result = chess.load_pgn(
      '[White "name"]\n\n' +
        '1. e4 e5 2. Nf3 Nc6 ' +
        '3. Bb5 d6 ' +
        '4. d4 Bd7 5. Nc3 Nf6 ' +
        '6. Bxc6 {comment}'
    )
    expect(result).toBe(true)
    expect(chess.history()).toEqual(history)
    expect(chess.header()['Result']).toBeUndefined()

    // trailing comment with result header - end of game marker after comment
    result = chess.load_pgn(
      '[White "name"]\n\n' +
        '1. e4 e5 2. Nf3 Nc6 3. Bb5 d6 ' +
        '4. d4 Bd7 5. Nc3 Nf6 6. Bxc6 {comment} *'
    )
    expect(result).toBe(true)
    expect(chess.history()).toEqual(history)
    expect(chess.header()['Result']).toBe('*')

    // trailing comment with result header - end of game marker before comment
    result = chess.load_pgn(
      '[White "name"]\n\n' +
        '1. e4 e5 2. Nf3 Nc6 3. Bb5 d6 ' +
        '4. d4 Bd7 5. Nc3 Nf6 6. Bxc6 1/2-1/2 {comment}'
    )
    expect(result).toBe(true)
    expect(chess.history()).toEqual(history)
    expect(chess.header()['Result']).toBe('1/2-1/2')
  })

  it('Github Issue #286 - pgn should not generate sloppy moves', () => {
    const chess = new Chess()
    chess.load_pgn('1. e4 d5 2. Nf3 Nd7 3. Bb5 Nf6 4. O-O')
    expect(chess.pgn()).toBe('1. e4 d5 2. Nf3 Nd7 3. Bb5 Nf6 4. O-O')
  })

  it('Github Issue #321 - strict parser should always run before sloppy', () => {
    let chess = new Chess()
    // these test examples are lifted from the github issue
    chess.load('r4rk1/4nqpp/1p1p4/2pPpp2/bPP1P3/R1B1NQ2/P4PPP/1R4K1 w - - 0 28')
    expect(chess.move('bxc5')).not.toBeNull()

    chess.load('r4rk1/4nqpp/1p1p4/2pPpp2/bPP1P3/R1B1NQ2/P4PPP/1R4K1 w - - 0 28')
    expect(chess.move('bxc5', { sloppy: true })).not.toBeNull()

    // over-disambiguation without sloppy should fail
    chess.load(
      'rnbqk2r/p1pp1ppp/1p2pn2/8/1bPP4/2N1P3/PP3PPP/R1BQKBNR w KQkq - 0 5'
    )
    expect(chess.move('Nge2')).toBeNull()

    // over-disambiguation with sloppy should pass
    chess.load(
      'rnbqk2r/p1pp1ppp/1p2pn2/8/1bPP4/2N1P3/PP3PPP/R1BQKBNR w KQkq - 0 5'
    )
    expect(chess.move('Nge2', { sloppy: true })).not.toBeNull()
  })
})
