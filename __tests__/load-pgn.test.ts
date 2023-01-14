import { Chess, DEFAULT_POSITION } from '../src/chess'

test('loadPgn - works', () => {
  const chess = new Chess()
  const fen = '4q2k/2r1r3/4PR1p/p1p5/P1Bp1Q1P/1P6/6P1/6K1 b - - 4 41'
  const pgn = `
[Event "Reykjavik WCh"]
[Site "Reykjavik WCh"]
[Date "1972.01.07"]
[EventDate "?"]
[Round "6"]
[Result "1-0"]
[White "Robert James Fischer"]
[Black "Boris Spassky"]
[ECO "D59"]
[WhiteElo "?"]
[BlackElo "?"]
[PlyCount "81"]

1. c4 e6 2. Nf3 d5 3. d4 Nf6 4. Nc3 Be7 5. Bg5 O-O 6. e3 h6
7. Bh4 b6 8. cxd5 Nxd5 9. Bxe7 Qxe7 10. Nxd5 exd5 11. Rc1 Be6
12. Qa4 c5 13. Qa3 Rc8 14. Bb5 a6 15. dxc5 bxc5 16. O-O Ra7
17. Be2 Nd7 18. Nd4 Qf8 19. Nxe6 fxe6 20. e4 d4 21. f4 Qe7
22. e5 Rb8 23. Bc4 Kh8 24. Qh3 Nf8 25. b3 a5 26. f5 exf5
27. Rxf5 Nh7 28. Rcf1 Qd8 29. Qg3 Re7 30. h4 Rbb7 31. e6 Rbc7
32. Qe5 Qe8 33. a4 Qd8 34. R1f2 Qe8 35. R2f3 Qd8 36. Bd3 Qe8
37. Qe4 Nf6 38. Rxf6 gxf6 39. Rxf6 Kg8 40. Bc4 Kh8 41. Qf4 1-0`

  chess.loadPgn(pgn)
  expect(chess.fen()).toEqual(fen)
})

test('loadPgn - works - no header', () => {
  const chess = new Chess()
  const fen = 'r1b1r3/pp1k3p/n2p4/8/Q7/b2P4/P1PK2P1/1R3B2 b - - 1 23'
  const pgn = `
1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 Nf6 6. Nxg4 Nxe4 7. d3 Ng3 8.
Bxf4 Nxh1 9. Qe2+ Qe7 10. Nf6+ Kd8 11. Bxc7+ Kxc7 12. Nd5+ Kd8 13. Nxe7 Bxe7
14. Qg4 d6 15. Qf4 Rg8 16. Qxf7 Bxh4+ 17. Kd2 Re8 18. Na3 Na6 19. Qh5 Bf6 20.
Qxh1 Bxb2 21. Qh4+ Kd7 22. Rb1 Bxa3 23. Qa4+`

  chess.loadPgn(pgn)
  expect(chess.fen()).toEqual(fen)
})

test('loadPgn - works - no moves', () => {
  // GitHub Issue #362 - Load PGN works - no moves
  const chess = new Chess()
  const pgn = ''

  chess.loadPgn(pgn)
  expect(chess.fen()).toEqual(DEFAULT_POSITION)
})

test('loadPgn - works - no moves (header only)', () => {
  // GitHub Issue #362 - Load PGN works - no moves
  const chess = new Chess()
  const pgn = `
[White "White"]
[Black "Black"]
`

  chess.loadPgn(pgn)
  expect(chess.fen()).toEqual(DEFAULT_POSITION)
})

test('loadPgn - works - comments', () => {
  const chess = new Chess()
  const fen = '1n1Rkb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2K5 b k - 1 17'
  const comments = [
    {
      fen: 'rn1qkbnr/ppp2ppp/3p4/4p3/3PP1b1/5N2/PPP2PPP/RNBQKB1R w KQkq - 1 4',
      comment: 'This is a weak move already.--Fischer',
    },
    {
      fen: 'rn2kb1r/pp2qppp/2p2n2/4p1B1/2B1P3/1QN5/PPP2PPP/R3K2R b KQkq - 1 9',
      comment:
        "Black is in what's like a zugzwang position, here. He can't " +
        "develop the [Queen's] knight because the pawn, is hanging, the " +
        'bishop is blocked because of the Queen.--Fischer',
    },
  ]
  const pgn = `
[Event "Paris"]
[Site "Paris"]
[Date "1858.??.??"]
[EventDate "?"]
[Round "?"]
[Result "1-0"]
[White "Paul Morphy"]
[Black "Duke Karl / Count Isouard"]
[ECO "C41"]
[WhiteElo "?"]
[BlackElo "?"]
[PlyCount "33"]

1.e4 e5 2.Nf3 d6 3.d4 Bg4 {This is a weak move already.--Fischer} 4.dxe5 Bxf3
5.Qxf3 dxe5 6.Bc4 Nf6 7.Qb3 Qe7 8.Nc3 c6 9.Bg5 {Black is in what's like a
zugzwang position, here. He can't develop the [Queen's] knight because the
pawn, is hanging, the bishop is blocked because of the Queen.--Fischer} b5
10.Nxb5 cxb5 11.Bxb5+ Nbd7 12.O-O-O Rd8 13.Rxd7 Rxd7 14.Rd1 Qe6 15.Bxd7+ Nxd7
16.Qb8+ Nxb8 17.Rd8# 1-0`

  chess.loadPgn(pgn)
  expect(chess.fen()).toEqual(fen)
  expect(chess.getComments()).toEqual(comments)
})

test('loadPgn - works - comments (before first move)', () => {
  // Github Issue #134 - Load PGN with comment before first move
  const chess = new Chess()
  const fen =
    'r1bqk2r/pp1nbppp/2p1pn2/3p4/2PP4/5NP1/PP2PPBP/RNBQ1RK1 w kq - 4 7'
  const comments = [
    {
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      comment:
        ' Kevin and I go way back.  I checked the USCF player stats ' +
        'and my previous record against Kevin was 4 losses and 1 draw ' +
        'out of 5 games.  All of our previous games were between ' +
        '1992-1998. ',
    },
    {
      fen: 'rnbqkb1r/pppp1ppp/4pn2/8/2PP4/6P1/PP2PP1P/RNBQKBNR b KQkq - 0 3',
      comment:
        ' Avrukh says to play 3.g3 instead of 3.Nf3 in case the Knight ' +
        'later comes to e2, as in the Bogo-Indian. ',
    },
  ]
  const pgn = `
[Event "2012 ROCHESTER GRAND WINTER OPEN"]
[Site "Rochester"]
[Date "2012.02.04"]
[Round "1"]
[White "Jensen, Matthew"]
[Black "Gaustad, Kevin"]
[Result "1-0"]
[ECO "E01"]
[WhiteElo "2131"]
[BlackElo "1770"]
[Annotator "Jensen, Matthew"]

{ Kevin and I go way back.  I checked the USCF player stats and my previous
record against Kevin was 4 losses and 1 draw out of 5 games.  All of our
previous games were between 1992-1998. }
1.d4 Nf6 2.c4 e6 3.g3 { Avrukh says
to play 3.g3 instead of 3.Nf3 in case the Knight later comes to e2, as in the
Bogo-Indian. } 3...d5 4.Bg2 c6 5.Nf3 Be7 6.O-O Nbd7
1-0`

  chess.loadPgn(pgn)
  expect(chess.fen()).toEqual(fen)
  expect(chess.getComments()).toEqual(comments)
})

test('loadPgn - works - regression test (pinned piece)', () => {
  /* regression test - broken PGN parser ended up moving the pinned knight at
   * c3 and ended up in this position:
   * rnbqk2r/pp1p1ppp/4pn2/1N6/1bPN4/8/PP2PPPP/R1BQKB1R b KQkq - 2 6
   */
  const chess = new Chess()
  const fen = 'rnbqk2r/pp1p1ppp/4pn2/1N6/1bP5/2N5/PP2PPPP/R1BQKB1R b KQkq - 2 6'
  const pgn = '1. d4 Nf6 2. c4 e6 3. Nf3 c5 4. Nc3 cxd4 5. Nxd4 Bb4 6. Nb5'
  chess.loadPgn(pgn)
  expect(chess.fen()).toEqual(fen)
})

test('loadPgn - works - move annotations', () => {
  const chess = new Chess()
  const fen = 'rnbqkbnr/ppp2ppp/8/3pp3/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3'
  const pgn = '1. e4!! e5?! 2. d4?? d5!?'
  chess.loadPgn(pgn)
  expect(chess.fen()).toEqual(fen)
})

test('loadPgn - works - move annotations (including check symbols)', () => {
  const chess = new Chess()
  const fen = 'rnb2q1r/pp1k2pp/2pb1n2/8/3P4/5N2/PPP2PPP/RNBQKB1R w KQ - 0 8'
  const pgn =
    '1.e4 e6 2.d4 d5 3.exd5 c6?? 4.dxe6 Nf6?! 5.exf7+!! Kd7!? 6.Nf3 Bd6 7.f8=N+!! Qxf8'
  chess.loadPgn(pgn)
  expect(chess.fen()).toEqual(fen)
})

test('loadPgn - works - prunes recursive annotation variations (RAV)', () => {
  const chess = new Chess()
  const pgn = "1. e4 ( 1. d4 { Queen's pawn } d5 ( 1... Nf6 ) ) e5"
  const fen = 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2'

  chess.loadPgn(pgn)
  expect(chess.fen()).toEqual(fen)
  expect(chess.getComments()).toEqual([])
})

test('loadPgn - works - preserves RAV inside comments', () => {
  const chess = new Chess()
  const fen =
    '3q1rk1/1b1rbp1p/p2p1np1/1p2pP2/3BP3/P1NB3Q/1PP3PP/4RR1K w - - 0 19'
  const comments = [
    {
      fen: 'rnbqkbnr/pp1p1ppp/4p3/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3',
      comment: ' Sicilian Defence, French Variation ',
    },
    {
      fen: '3q1rk1/1b1rbp1p/p2ppnp1/1p6/3BPP2/P1NB3Q/1PP3PP/4RR1K w - - 0 18',
      comment: ' (0.05 → 1.03) Inaccuracy. The best move was h6. ',
    },
  ]
  const pgn = `
1. e4 c5 2. Nf3 e6 { Sicilian Defence, French Variation } 3. Nc3 a6
4. Be2 Nc6 5. d4 cxd4 6. Nxd4 Qc7 7. O-O Nf6 8. Be3 Be7 9. f4 d6
10. Kh1 O-O 11. Qe1 Nxd4 12. Bxd4 b5 13. Qg3 Bb7 14. a3 Rad8
15. Rae1 Rd7 16. Bd3 Qd8 17. Qh3 g6? { (0.05 → 1.03) Inaccuracy.
The best move was h6. } (17... h6 18. Rd1 Re8 19. Qg3 Nh5 20. Qg4
Nf6 21. Qh3 Bc6 22. Kg1 Qb8 23. Qg3 Nh5 24. Qf2 Bf6 25. Be2 Bxd4
26. Rxd4 Nf6 27. g3) 18. f5 e5`

  chess.loadPgn(pgn)
  expect(chess.fen()).toEqual(fen)
  expect(chess.getComments()).toEqual(comments)
})

test('loadPgn - works - mixed RAV and comments', () => {
  const chess = new Chess()
  const fen =
    'rnbq1rk1/ppp1ppbp/5np1/3p4/3P1B2/4PN1P/PPP2PP1/RN1QKB1R w KQ - 1 6'
  const comments = [
    {
      fen: 'rnbqk2r/ppp1ppbp/5np1/3p4/3P1B2/4PN1P/PPP2PP1/RN1QKB1R b KQkq - 0 5',
      comment: ' 5. Be2 O-O 6. O-O c5 7. c3 Nc6 ',
    },
  ]
  const pgn = `
1. d4 d5 2. Bf4 Nf6 3. e3 g6 4. Nf3 (4. Nc3 Bg7 5. Nf3 O-O 6. Be2 c5)
4... Bg7 5. h3 { 5. Be2 O-O 6. O-O c5 7. c3 Nc6 } 5... O-O`

  chess.loadPgn(pgn)
  expect(chess.fen()).toEqual(fen)
  expect(chess.getComments()).toEqual(comments)
})

test('loadPgn - works - FEN and SetUp tag', () => {
  const chess = new Chess()
  const fen = '1n1Rkb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2K5 b k - 1 17'
  const pgn = `
[White "Paul Morphy"]
[Black "Duke Karl / Count Isouard"]
[SetUp "1"]
[FEN "1n2kb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2KR4 w k - 0 17"]

17.Rd8# 1-0`
  chess.loadPgn(pgn)
  expect(chess.fen()).toEqual(fen)
})

test("loadPgn - works - prunes numeric annotation glyphs (NAG's)", () => {
  const chess = new Chess()
  const fen = 'r2r2k1/5pp1/p1p2q2/PpP1p3/1PnbP2p/5R2/2Q1BPPP/2B2RK1 b - - 3 27'
  const pgn = `
1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bb6 5. a4 a6 6. c3 Nf6 7. d3 d6
8. Nbd2 O-O 9. O-O Ne7 10. d4 Ng6 11. dxe5 Nxe5 12. Nxe5 dxe5 13. Qb3 Ne8
14. Nf3 Nd6 15. Rd1 Bg4 16. Be2 Qf6 17. c4 Bxf3 18. Bxf3 Bd4 19. Rb1 b5 $2
20. c5 Nc4 21. Rf1 Qg6 22. Qc2 c6 23. Be2 Rfd8 24. a5 h5 $2 (24... Rd7 $11)
25. Rb3 $1 h4 26. Rh3 Qf6 27. Rf3`

  chess.loadPgn(pgn)
  expect(chess.fen()).toEqual(fen)
})

test('loadPgn - works - messy whitespace (tabs, whitespace, and mixed newlines)', () => {
  const chess = new Chess()
  const pgn =
    '    \t   [ Event"Reykjavik WCh"    ]\n' +
    '[Site "Reykjavik WCh"]       \n' +
    '[Date "1972.01.07"]\n' +
    '[EventDate "?"]\n' +
    '[\tRound "6"]\n' +
    '[Result "1-0"]\n' +
    '[White "Robert James Fischer"]\r\n' +
    '[Black "Boris Spassky"]\n' +
    '[ECO "D59"]\n' +
    '[WhiteElo "?"]\n' +
    '[BlackElo "?"]\n' +
    '[PlyCount "81"]                \n' +
    '            \r\n' +
    '1. c4 e6 2. Nf3 d5 3. d4 Nf6 4. Nc3 Be7 5. Bg5 O-O 6. e3 h6\n' +
    '7. Bh4 b6 8. cxd5 Nxd5 9. Bxe7 Qxe7 10. Nxd5 exd5 11. Rc1 Be6\n' +
    '12. Qa4 c5 13. Qa3 Rc8 14. Bb5 a6 15. dxc5 bxc5 16. O-O Ra7\n' +
    '17. Be2 Nd7 18. Nd4 Qf8 19. Nxe6 fxe6 20. e4 d4 21. f4 Qe7\r\n' +
    '22. e5 Rb8 23. Bc4 Kh8 24. Qh3 Nf8 25. b3 a5 26. f5 exf5\n' +
    '27. Rxf5 Nh7 28. Rcf1 Qd8 29. Qg3 Re7 30. h4 Rbb7 31. e6 Rbc7\r\n' +
    '32. Qe5 Qe8 33. a4 Qd8 34. R1f2 Qe8 35. R2f3 Qd8 36. Bd3 Qe8\r\n' +
    '37. Qe4 Nf6 38. Rxf6 gxf6 39. Rxf6 Kg8 40. Bc4 Kh8 41. Qf4 1-0\n'

  // loadPgn throws if there is an error, so we can just call these
  chess.loadPgn(pgn)

  // spot check a few of the header values
  expect(chess.header()['Event']).toEqual('Reykjavik WCh')
  expect(chess.header()['Round']).toEqual('6')
})

test('loadPgn - works - parses different newline characters', () => {
  const chess = new Chess()
  const fen = '1n1Rkb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2K5 b k - 1 17'
  const comments = [
    {
      fen: 'rn1qkbnr/ppp2ppp/3p4/4p3/3PP1b1/5N2/PPP2PPP/RNBQKB1R w KQkq - 1 4',
      comment: 'This is a weak move already.--Fischer',
    },
    {
      fen: 'rn2kb1r/pp2qppp/2p2n2/4p1B1/2B1P3/1QN5/PPP2PPP/R3K2R b KQkq - 1 9',
      comment:
        "Black is in what's like a zugzwang position, here. He can't " +
        "develop the [Queen's] knight because the pawn, is hanging, the " +
        'bishop is blocked because of the Queen.--Fischer',
    },
  ]
  const pgn = [
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
    '1.e4 e5 2.Nf3 d6 3.d4 Bg4 {This is a weak move already.--Fischer} 4.dxe5 Bxf3',
    "5.Qxf3 dxe5 6.Bc4 Nf6 7.Qb3 Qe7 8.Nc3 c6 9.Bg5 {Black is in what's like a",
    "zugzwang position, here. He can't develop the [Queen's] knight because the",
    'pawn, is hanging, the bishop is blocked because of the Queen.--Fischer} b5',
    '10.Nxb5 cxb5 11.Bxb5+ Nbd7 12.O-O-O Rd8 13.Rxd7 Rxd7 14.Rd1 Qe6 15.Bxd7+ Nxd7',
    '16.Qb8+ Nxb8 17.Rd8# 1-0',
  ]

  const newlines = ['\n', '<br />', '\r\n', 'BLAH']

  newlines.forEach((newline) => {
    chess.loadPgn(pgn.join(newline), { newlineChar: newline })
    expect(chess.fen()).toEqual(fen)
    expect(chess.getComments()).toEqual(comments)
  })
})

test('loadPgn - works - permissive parser (unnecessary disambiguation - #1)', () => {
  const chess = new Chess()
  const fen = '8/4P1bp/pk6/1p6/4r3/1P2n3/r5PP/2R4K w - - 0 33'
  const pgn = `
1.e4 e5 2.Nf3 d6 3.d4 Bg4 4.dxe5 Bxf3 5.Qxf3 dxe5 6.Qf5 Nc6 7.Bb5 Nge7 8.Qxe5
Qd7 9.O-O Nxe5 10.Bxd7+ Nxd7 11.Rd1 O-O-O 12.Nc3 Ng6 13.Be3 a6 14.Ba7 b6 15.Na4
Kb7 16.Bxb6 cxb6 17.b3 b5 18.Nb2 Nge5 19.f3 Rc8 20.Rac1 Ba3 21.Rb1 Rxc2 22.f4
Ng4 23.Rxd7+ Kc6 24.Rxf7 Bxb2 25.Rxg7 Ne3 26.Rg3 Bd4 27.Kh1 Rxa2 28.Rc1+ Kb6
29.e5 Rf8 30.e6 Rxf4 31.e7 Re4 32.Rg7 Bxg7`

  // move 7... Nge7 is overly disambiguated, so loadPgn will throw
  expect(() => chess.loadPgn(pgn, { strict: true })).toThrowError()

  // but the sloppy parse will handle it
  chess.loadPgn(pgn)
  expect(chess.fen()).toEqual(fen)
})

test('loadPgn - works - permissive parser (unnecessary disambiguation - #2)', () => {
  const chess = new Chess()
  const pgn = `
1.e4 e5 2. Nf3 d5 3. Nxe5 f6 4. Bb5+ c6 5. Qh5+ Ke7 Qf7+ Kd6 7. d3 Kxe5 8. Qh5+
g5 9. g3 cxb5 10. Bf4+ Ke6 exd5+ Qxd5 12. Qe8+ Kf5 13. Rg1 gxf4 14. Nc3 Qc5 15.
Ne4 Qxf2+ Kxf2 fxg3+ 17. Rxg3 Nd7 18. Qh5+ Ke6 19. Qe8+ Kd5 20. Rg4 Rb8 c4+ Kc6
22. Qe6+ Kc7 23. cxb5 Ne7 24. Rc1+ Kd8 25. Nxf6 Ra8 Kf1 Rb8 27. Rc1c4 b6 28.
Rc4-d4 Rb7 29. Qf7 Rc7 30. Qe8# 1-0`
  const fen = '2bkQb1r/p1rnn2p/1p3N2/1P6/3R2R1/3P4/PP5P/5K2 b - - 5 30'

  // the strict parser should throwa on 27. Rc1c4
  expect(() => chess.loadPgn(pgn, { strict: true })).toThrowError()

  // the sloppy parser should accept it
  chess.loadPgn(pgn)
  expect(chess.fen()).toEqual(fen)
})

test('loadPgn - works - permissive parser (correctly disambiguated move - #1)', () => {
  const chess = new Chess()
  const fen = '8/4P1bp/pk6/1p6/4r3/1P2n3/r5PP/2R4K w - - 0 33'
  const pgn = `
1.e4 e5 2.Nf3 d6 3.d4 Bg4 4.dxe5 Bxf3 5.Qxf3 dxe5 6.Qf5 Nc6 7.Bb5 Ne7 8.Qxe5
Qd7 9.O-O Nxe5 10.Bxd7+ Nxd7 11.Rd1 O-O-O 12.Nc3 Ng6 13.Be3 a6 14.Ba7 b6 15.Na4
Kb7 16.Bxb6 cxb6 17.b3 b5 18.Nb2 Nge5 19.f3 Rc8 20.Rac1 Ba3 21.Rb1 Rxc2 22.f4
Ng4 23.Rxd7+ Kc6 24.Rxf7 Bxb2 25.Rxg7 Ne3 26.Rg3 Bd4 27.Kh1 Rxa2 28.Rc1+ Kb6
29.e5 Rf8 30.e6 Rxf4 31.e7 Re4 32.Rg7 Bxg7`

  // move 7... Ne7 is correct now

  // both parsers should handle correctly disambiguated moves
  chess.loadPgn(pgn, { strict: true })
  expect(chess.fen()).toEqual(fen)
  chess.loadPgn(pgn)
  expect(chess.fen()).toEqual(fen)
})

test('loadPgn - works - permissive parser (correctly disambiguated move - #2)', () => {
  const chess = new Chess()
  const fen = 'r1bq1b1r/ppp3pp/4k3/3np3/1nB5/2N2Q2/PPPP1PPP/R1B1K2R w KQ - 4 9'
  const pgn = `
1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6 4.Ng5 d5 5.exd5 Nxd5 6.Nxf7 Kxf7 7.Qf3+ Ke6 8.Nc3 Nb4`

  // both parsers should handle correctly disambiguated moves (8... Nb4)
  chess.loadPgn(pgn, { strict: true })
  expect(chess.fen()).toEqual(fen)
  chess.loadPgn(pgn)
  expect(chess.fen()).toEqual(fen)
})

test('loadPgn - works - permissive parser (alebraic notation)', () => {
  const chess = new Chess()
  const fen = 'r1q1r1k1/1p1n1ppB/p2b4/2pn4/8/7P/PPQ2BP1/3R1RK1 b - - 0 25'
  const pgn = `
e2e4 d7d5 e4d5 d8d5 d2d4 g8f6 c2c4 d5d8 g1f3 c8g4 f1e2 e7e6 b1c3 f8e7 c1e3 e8g8
d1b3 b8c6 a1d1 a8b8 e1g1 d8c8 h2h3 g4h5 d4d5 e6d5 c4d5 h5f3 e2f3 c6e5 f3e2 a7a6
e3a7 b8a8 a7d4 e7d6 b3c2 f8e8 f2f4 e5d7 e2d3 c7c5 d4f2 d6f4 c3e4 f6d5 e4d6 f4d6
d3h7`

  // the strict parser shouldn't handle this
  expect(() => chess.loadPgn(pgn, { strict: true })).toThrowError()

  // the permissive parser should accept it
  chess.loadPgn(pgn)
  expect(chess.fen()).toEqual(fen)
})

test('loadPgn - works - permissive parser (alebraic notation with symbols and en passant)', () => {
  const chess = new Chess()
  const fen = '8/p2Q4/2P3kp/5p2/4b3/1P2P3/r6q/3K1R2 w - - 0 39'
  const pgn = `
1. d2d4 f7f5 2. b2b3 e7e6 3. c1b2 d7d5 4. g1f3 f8d6 5. e2e3 g8f6 6. b1d2 e8g8
7. c2c4 c7c6 8. f1d3 b8d7 9. e1g1 f6e4 10. a1c1 g7g5 11. h2h3 d8e8 12. d3e4
d5e4 13. f3g5 e8g6 14. h3h4 h7h6 15. g5h3 d7f6 16. f2f4 e4f3 17. d2f3 f6g4 18.
d1e2 d6g3 19. h3f4 g6g7 20. d4d5 g7f7 21. d5e6 c8e6 22. f3e5 g4e5 23. b2e5 g8h7
24. h4h5 f8g8 25. e2f3 g3f4 26. e5f4 g8g4 27. g2g3 a8g8 28. c1c2 b7b5 29. c4b5
e6d5 30. f3d1 f7h5 31. c2h2 g4g3+ 32. f4g3 g8g3+ 33. g1f2 h5h2+ 34. f2e1 g3g2
35. d1d3 d5e4 36. d3d7+ h7g6 37. b5c6 g2e2+ 38. e1d1 e2a2 0-1`

  // the strict parser shouldn't handle this
  expect(() => chess.loadPgn(pgn, { strict: true })).toThrowError()

  // the permissive parser should accept it
  chess.loadPgn(pgn)
  expect(chess.fen()).toEqual(fen)
})

test('loadPgn - works - permissive parser (alebraic notation with underpromotion)', () => {
  const chess = new Chess()
  const fen = '7Q/6R1/4B3/7k/4N3/8/6PP/6K1 b - - 2 68'
  const pgn = `
1. e2e4 c7c5 2. g1f3 d7d6 3. d2d4 c5d4 4. f3d4 g8f6 5. f1d3 a7a6 6. c1e3 e7e5
7. d4f5 c8f5 8. e4f5 d6d5 9. e3g5 f8e7 10. d1e2 e5e4 11. g5f6 e7f6 12. d3e4
d5e4 13. e2e4+ d8e7 14. e4e7+ f6e7 15. e1g1 e8g8 16. f1e1 e7f6 17. c2c3 b8c6
18. b1d2 a8d8 19. d2e4 f8e8 20. e1e3 c6e5 21. a1e1 e5d3 22. e4f6+ g7f6 23.
e3e8+ d8e8 24. e1e8+ g8g7 25. b2b4 d3e5 26. a2a4 b7b5 27. a4b5 a6b5 28. e8b8
e5g4 29. b8b5 g4e5 30. b5c5 g7f8 31. b4b5 f8e7 32. f2f4 e5d7 33. c5c7 e7d6 34.
c7c8 d7b6 35. c8c6+ d6d7 36. c6b6 h7h5 37. b6f6 h5h4 38. f6f7+ d7d6 39. f7h7
h4h3 40. h7h3 d6e7 41. b5b6 e7f6 42. h3h5 f6g7 43. b6b7 g7g8 44. b7b8N g8g7 45.
c3c4 g7f6 46. c4c5 f6e7 47. c5c6 e7f6 48. c6c7 f6e7 49. c7c8B e7d6 50. b8a6
d6e7 51. c8e6 e7f6 52. a6c5 f6g7 53. c5e4 g7f8 54. h5h8+ f8g7 55. h8g8+ g7h6
56. g8g6+ h6h7 57. e4f6+ h7h8 58. f6e4 h8h7 59. f5f6 h7g6 60. f6f7 g6h5 61.
f7f8R h5h6 62. f4f5 h6h7 63. f8f7+ h7h6 64. f5f6 h6g6 65. f7g7+ g6h5 66. f6f7
h5h4 67. f7f8Q h4h5 68. f8h8# 1-0`

  // the strict parser shouldn't handle this
  expect(() => chess.loadPgn(pgn, { strict: true })).toThrowError()

  // the permissive parser should accept it
  chess.loadPgn(pgn)
  expect(chess.fen()).toEqual(fen)
})

test('loadPgn - works - permissive parser (extended long alebraic notation)', () => {
  const chess = new Chess()
  const fen = '8/2kP4/4K3/8/8/1p6/8/8 b - - 2 59'
  const pgn = `
1. d2d4 f7f5 2. Bc1g5 d7d6 3. e2e3 Nb8d7 4. c2c4 Ng8f6 5. Nb1c3 e7e5 6. d4e5
d6e5 7. g2g3 Bf8e7 8. Bf1h3 h7h6 9. Bg5f6 Nd7f6 10. Qd1d8+ Be7d8 11. Ng1f3 e5e4
12. Nf3d4 g7g6 13. e1g1 c7c5 14. Nd4b5 e8g8 15. Nb5d6 Bd8c7 16. Nd6c8 Ra8c8 17.
Rf1d1 Rc8d8 18. Bh3f1 b7b6 19. Nc3d5 Nf6d5 20. c4d5 Rf8e8 21. Bf1b5 Re8e5 22.
Bb5c6 Kg8f7 23. Kg1f1 Kf7f6 24. h2h4 g6g5 25. h4g5+ h6g5 26. Kf1e2 Rd8h8 27.
Rd1h1 Rh8h1 28. Ra1h1 Kf6g7 29. Rh1h5 Kg7g6 30. Rh5h8 Re5e7 31. Rh8a8 a7a5 32.
Ra8a7 Kg6f6 33. Ra7b7 Kf6e5 34. Ke2d2 f5f4 35. g3f4+ g5f4 36. Kd2c3 f4e3 37.
f2e3 Re7f7 38. Kc3c4 Ke5d6 39. a2a3 Rf7f3 40. b2b4 a5b4 41. a3b4 c5b4 42. Kc4b4
Rf3e3 43. Kb4c4 Re3a3 44. Kc4b4 e4e3 45. Bc6b5 Ra3a1 46. Kb4c3 Ra1a3+ 47. Kc3d4
Ra3b3 48. Bb5e2 Rb3b4+ 49. Kd4e3 Rb4h4 50. Be2f3 Rh4h3 51. Rb7a7 Rh3f3+ 52.
Ke3f3 b6b5 53. Kf3e4 Kd6c5 54. Ra7b7 Bc7b6 55. Ke4e5 b5b4 56. d5d6 b4b3 57.
Rb7b6 Kc5b6 58. d6d7 Kb6c7 59. Ke5e6 1-0
`

  // the strict parser shouldn't handle this
  expect(() => chess.loadPgn(pgn, { strict: true })).toThrowError()

  // the permissive parser should accept it
  chess.loadPgn(pgn)
  expect(chess.fen()).toEqual(fen)
})

test('loadPgn - works - permissive parser (extended long alebraic notation with hyphens)', () => {
  const chess = new Chess()
  const fen = '7Q/6R1/4B3/7k/4N3/8/6PP/6K1 b - - 2 68'
  const pgn = `
1. e2-e4 c7-c5 2. Ng1-f3 d7-d6 3. d2-d4 c5xd4 4. Nf3xd4 Ng8-f6 5. Bf1-d3
a7-a6 6. Bc1-e3 e7-e5 7. Nd4-f5 Bc8xf5 8. e4xf5 d6-d5 9. Be3-g5 Bf8-e7 10.
Qd1-e2 e5-e4 11. Bg5xf6 Be7xf6 12. Bd3xe4 d5xe4 13. Qe2xe4+ Qd8-e7 14. Qe4xe7+
Bf6xe7 15. e1-g1 e8-g8 16. Rf1-e1 Be7-f6 17. c2-c3 Nb8-c6 18. Nb1-d2 Ra8-d8 19.
Nd2-e4 Rf8-e8 20. Re1-e3 Nc6-e5 21. Ra1-e1 Ne5-d3 22. Ne4xf6+ g7xf6 23. Re3xe8+
Rd8xe8 24. Re1xe8+ Kg8-g7 25. b2-b4 Nd3-e5 26. a2-a4 b7-b5 27. a4xb5 a6xb5 28.
Re8-b8 Ne5-g4 29. Rb8xb5 Ng4-e5 30. Rb5-c5 Kg7-f8 31. b4-b5 Kf8-e7 32. f2-f4
Ne5-d7 33. Rc5-c7 Ke7-d6 34. Rc7-c8 Nd7-b6 35. Rc8-c6+ Kd6-d7 36. Rc6xb6 h7-h5
37. Rb6xf6 h5-h4 38. Rf6xf7+ Kd7-d6 39. Rf7-h7 h4-h3 40. Rh7xh3 Kd6-e7 41.
b5-b6 Ke7-f6 42. Rh3-h5 Kf6-g7 43. b6-b7 Kg7-g8 44. b7-b8N Kg8-g7 45. c3-c4
Kg7-f6 46. c4-c5 Kf6-e7 47. c5-c6 Ke7-f6 48. c6-c7 Kf6-e7 49. c7-c8B Ke7-d6 50.
Nb8-a6 Kd6-e7 51. Bc8-e6 Ke7-f6 52. Na6-c5 Kf6-g7 53. Nc5-e4 Kg7-f8 54. Rh5-h8+
Kf8-g7 55. Rh8-g8+ Kg7-h6 56. Rg8-g6+ Kh6-h7 57. Ne4-f6+ Kh7-h8 58. Nf6-e4
Kh8-h7 59. f5-f6 Kh7xg6 60. f6-f7 Kg6-h5 61. f7-f8R Kh5-h6 62. f4-f5 Kh6-h7 63.
Rf8-f7+ Kh7-h6 64. f5-f6 Kh6-g6 65. Rf7-g7+ Kg6-h5 66. f6-f7 Kh5-h4 67. f7-f8Q
Kh4-h5 68. Qf8-h8# 1-0`

  // the strict parser shouldn't handle this
  expect(() => chess.loadPgn(pgn, { strict: true })).toThrowError()

  // the permissive parser should accept it
  chess.loadPgn(pgn)
  expect(chess.fen()).toEqual(fen)
})

test('loadPgn - works - permissive parser (FEN without SetUp tag)', () => {
  const chess = new Chess()
  const fen = '1n1Rkb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2K5 b k - 1 17'
  const pgn = `
[White "Paul Morphy"]
[Black "Duke Karl / Count Isouard"]
[FEN "1n2kb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2KR4 w k - 0 17"]

17.Rd8# 1-0`

  // the strict parser shouldn't handle this
  expect(() => chess.loadPgn(pgn, { strict: true })).toThrowError()

  // the permissive parser should accept it
  chess.loadPgn(pgn)
  expect(chess.fen()).toEqual(fen)
})

test('loadPgn - works - permissive parser (FEN tag case insensitive)', () => {
  const chess = new Chess()
  const fen = '1n1Rkb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2K5 b k - 1 17'
  const pgn = `
[White "Paul Morphy"]
[Black "Duke Karl / Count Isouard"]
[fEn "1n2kb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2KR4 w k - 0 17"]

17.Rd8# 1-0`

  // the strict parser shouldn't handle this
  expect(() => chess.loadPgn(pgn, { strict: true })).toThrowError()

  // the permissive parser should accept it
  chess.loadPgn(pgn)
  expect(chess.fen()).toEqual(fen)
})

test('loadPgn - throws Error (illegal move)', () => {
  const chess = new Chess()
  const pgn = '1. e4 Qxd7 1/2-1/2'
  expect(() => chess.loadPgn(pgn)).toThrowError()
})

test('loadPgn - throws Error (illegal check annotation)', () => {
  const chess = new Chess()
  const pgn = '1. e4!+'
  expect(() => chess.loadPgn(pgn)).toThrowError()
})

test('loadPgn - throws Error (invalid FEN in header)', () => {
  const chess = new Chess()
  const pgn = `
[White "Paul Morphy"]
[Black "Duke Karl / Count Isouard"]
[fEn "1n2kb1r/p4XXX/4q3/4p1B1/4P3/8/PPP2PPP/2KR4 w k - 0 17"]

17.Rd8# 1-0`

  // the strict parser shouldn't handle this
  expect(() => chess.loadPgn(pgn, { strict: true })).toThrowError()

  // the permissive parser shouldn'taccept it either
  expect(() => chess.loadPgn(pgn)).toThrowError()
})
