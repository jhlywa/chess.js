import { Chess } from '../src/chess'
import 'jest-extended'

describe('Regression Tests', () => {
  it('Github Issue #30 - move generateion - single square bug', () => {
    const chess = new Chess(
      'rnbqk2r/ppp1pp1p/5n1b/3p2pQ/1P2P3/B1N5/P1PP1PPP/R3KBNR b KQkq - 3 5'
    )
    const moves: string[] = []
    expect(chess.moves({ square: 'f1', verbose: true })).toIncludeSameMembers(
      moves
    )
  })

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

  it('Github Issue #85 (white) - SetUp and FEN should be accepted in loadPgn', () => {
    const chess = new Chess()
    const pgn = [
      '[SetUp "1"]',
      '[FEN "7k/5K2/4R3/8/8/8/8/8 w KQkq - 0 1"]',
      '',
      '1. Rh6#',
    ]
    chess.loadPgn(pgn.join('\n'))
    expect(chess.fen()).toBe('7k/5K2/7R/8/8/8/8/8 b KQkq - 1 1')
  })

  it('Github Issue #85 (black) - SetUp and FEN should be accepted in loadPgn', () => {
    const chess = new Chess()
    const pgn = [
      '[SetUp "1"]',
      '[FEN "r4r1k/1p4b1/3p3p/5qp1/1RP5/6P1/3NP3/2Q2RKB b KQkq - 0 1"]',
      '',
      '1. ... Qc5+',
    ]
    chess.loadPgn(pgn.join('\n'))
    expect(chess.fen()).toBe(
      'r4r1k/1p4b1/3p3p/2q3p1/1RP5/6P1/3NP3/2Q2RKB w KQkq - 1 2'
    )
  })

  it('Github Issue #98 (white) - Wrong movement number after setting a position via FEN', () => {
    const chess = new Chess()
    chess.load('4r3/8/2p2PPk/1p6/pP2p1R1/P1B5/2P2K2/3r4 w - - 1 45')
    chess.move('f7')
    const result = chess.pgn()
    expect(result.match(/(45\. f7)$/)?.[0]).toBe('45. f7')
  })

  it('Github Issue #98 (black) - Wrong movement number after setting a position via FEN', () => {
    const chess = new Chess()
    chess.load('4r3/8/2p2PPk/1p6/pP2p1R1/P1B5/2P2K2/3r4 b - - 1 45')
    chess.move('Rf1+')
    const result = chess.pgn()
    expect(result.match(/(45\. \.\.\. Rf1\+)$/)?.[0]).toBe('45. ... Rf1+')
  })

  it('Github Issue #129 loadPgn() should not clear headers if PGN contains SetUp and FEN tags', () => {
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
    chess.loadPgn(pgn.join('\n'))
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
    chess.loadPgn(pgn.join('\n'))
    chess.clear()
    const expected = {
      FEN: '8/8/8/8/8/8/8/8 w - - 0 1',
      SetUp: '1',
    }
    expect(chess.header()).toEqual(expected)
  })

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
    chess.loadPgn(pgn.join('\n'))
    expect(chess.header()['Date']).toBe('1972.01.07')
  })

  it('Github Issue #284 - permissive settings allows illegal moves', () => {
    const chess = new Chess('4k3/8/8/8/8/4p3/8/4K3 w - - 0 1')
    expect(() => chess.move('e1f2')).toThrowError()
  })

  it('Github Issue #282 - playing a move on an empty board throws an error', () => {
    const chess = new Chess()
    chess.clear()
    expect(() => chess.move('e4')).toThrowError()
  })

  it('Github Issue #279 - loadPgn duplicates last move if it has a comment', () => {
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
    chess.loadPgn(
      '1. e4 e5 2. Nf3 Nc6 3. Bb5 d6 ' +
        '4. d4 Bd7 5. Nc3 Nf6 6. Bxc6 {comment}'
    )
    expect(chess.history()).toEqual(history)
    expect(chess.header()['Result']).toBeUndefined()

    // trailing comment - end of game marker after comment
    chess.loadPgn(
      '1. e4 e5 2. Nf3 Nc6 3. Bb5 d6 ' +
        '4. d4 Bd7 5. Nc3 Nf6 6. Bxc6 {comment} *'
    )
    expect(chess.history()).toEqual(history)
    expect(chess.header()['Result']).toBeUndefined()

    // trailing comment - end of game marker before comment
    chess.loadPgn(
      '1. e4 e5 2. Nf3 Nc6 3. Bb5 d6 ' +
        '4. d4 Bd7 5. Nc3 Nf6 6. Bxc6 * {comment}'
    )
    expect(chess.history()).toEqual(history)
    expect(chess.header()['Result']).toBeUndefined()

    // trailing comment with PGN header - no end of game marker
    chess.loadPgn(
      '[White "name"]\n\n' +
        '1. e4 e5 2. Nf3 Nc6 ' +
        '3. Bb5 d6 ' +
        '4. d4 Bd7 5. Nc3 Nf6 ' +
        '6. Bxc6 {comment}'
    )
    expect(chess.history()).toEqual(history)
    expect(chess.header()['Result']).toBeUndefined()

    // trailing comment with result header - end of game marker after comment
    chess.loadPgn(
      '[White "name"]\n\n' +
        '1. e4 e5 2. Nf3 Nc6 3. Bb5 d6 ' +
        '4. d4 Bd7 5. Nc3 Nf6 6. Bxc6 {comment} *'
    )
    expect(chess.history()).toEqual(history)
    expect(chess.header()['Result']).toBe('*')

    // trailing comment with result header - end of game marker before comment
    chess.loadPgn(
      '[White "name"]\n\n' +
        '1. e4 e5 2. Nf3 Nc6 3. Bb5 d6 ' +
        '4. d4 Bd7 5. Nc3 Nf6 6. Bxc6 1/2-1/2 {comment}'
    )
    expect(chess.history()).toEqual(history)
    expect(chess.header()['Result']).toBe('1/2-1/2')
  })

  it('Github Issue #286 - pgn should not generate sloppy moves', () => {
    const chess = new Chess()
    chess.loadPgn('1. e4 d5 2. Nf3 Nd7 3. Bb5 Nf6 4. O-O')
    expect(chess.pgn()).toBe('1. e4 d5 2. Nf3 Nd7 3. Bb5 Nf6 4. O-O')
  })

  it('Github Issue #321 - strict parser should always run before permissive', () => {
    let chess = new Chess()
    // these test examples are lifted from the github issue
    chess.load('r4rk1/4nqpp/1p1p4/2pPpp2/bPP1P3/R1B1NQ2/P4PPP/1R4K1 w - - 0 28')
    chess.move('bxc5')
    chess.undo()
    chess.move('bxc5', { strict: true })

    // over-disambiguation with strict should fail
    chess.load(
      'rnbqk2r/p1pp1ppp/1p2pn2/8/1bPP4/2N1P3/PP3PPP/R1BQKBNR w KQkq - 0 5'
    )
    expect(() => chess.move('Nge2', { strict: true })).toThrowError()
    // permisssive should work
    chess.move('Nge2')
  })

  it('Github Issue #326a - ignore whitespace after header tag (loadPgn)', () => {
    let chess = new Chess()
    const pgn = `
    [white "player a"]
         [black "player b"]
              [note "whitespace after right bracket"]      

            1. e4 e5`

    chess.loadPgn(pgn)
  })

  it('Github Issue #326b - ignore whitespace in line after header (loadPgn)', () => {
    let chess = new Chess()
    const pgn = `
    [white "player a"]
         [black "player b"]
              [note "whitespace after right bracket and in empty line below"]      
   
            1. e4 e5`

    chess.loadPgn(pgn)
  })
})
