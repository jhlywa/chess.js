import { Chess } from '../src/chess'

test('move - works - standard algebraic notation', () => {
  const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  const next = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1'
  const chess = new Chess(fen)
  const move = chess.move('e4')
  expect(move.isBigPawn()).toEqual(true)
  expect(move.isCapture()).toEqual(false)
  expect(move.isPromotion()).toEqual(false)
  expect(move.isEnPassant()).toEqual(false)
  expect(move.isKingsideCastle()).toEqual(false)
  expect(move.isQueensideCastle()).toEqual(false)
  expect(move.after).toEqual(chess.fen())
  expect(chess.fen()).toEqual(next)
})

test('move - works - standard algebraic notation (mates)', () => {
  const fen = '7k/3R4/3p2Q1/6Q1/2N1N3/8/8/3R3K w - - 0 1'
  const next = '3R3k/8/3p2Q1/6Q1/2N1N3/8/8/3R3K b - - 1 1'
  const chess = new Chess(fen)
  const move = chess.move('Rd8#')
  expect(chess.fen()).toEqual(next)
  expect(move.after).toEqual(chess.fen())
  expect(move.isCapture()).toEqual(false)
  expect(move.isPromotion()).toEqual(false)
  expect(move.isEnPassant()).toEqual(false)
  expect(move.isKingsideCastle()).toEqual(false)
  expect(move.isQueensideCastle()).toEqual(false)
  expect(move.isBigPawn()).toEqual(false)
})

test('move - works - standard algebraic notation (white en passant)', () => {
  const fen = 'rnbqkbnr/pp3ppp/2pp4/4pP2/4P3/8/PPPP2PP/RNBQKBNR w KQkq e6 0 1'
  const next = 'rnbqkbnr/pp3ppp/2ppP3/8/4P3/8/PPPP2PP/RNBQKBNR b KQkq - 0 1'
  const chess = new Chess(fen)
  const move = chess.move('fxe6')

  expect(move).toMatchObject({
    from: 'f5',
    to: 'e6',
    captured: 'p',
    flags: 'e',
  })
  expect(chess.fen()).toEqual(move.after)
  expect(move.after).toEqual(next)
  expect(move.isCapture()).toEqual(false)
  expect(move.isPromotion()).toEqual(false)
  expect(move.isEnPassant()).toEqual(true)
  expect(move.isKingsideCastle()).toEqual(false)
  expect(move.isQueensideCastle()).toEqual(false)
  expect(move.isBigPawn()).toEqual(false)
})

test('move - works - standard algebraic notation (black en passant)', () => {
  const fen = 'rnbqkbnr/pppp2pp/8/4p3/4Pp2/2PP4/PP3PPP/RNBQKBNR b KQkq e3 0 1'
  const next = 'rnbqkbnr/pppp2pp/8/4p3/8/2PPp3/PP3PPP/RNBQKBNR w KQkq - 0 2'
  const chess = new Chess(fen)
  const move = chess.move('fxe3')
  expect(move).toMatchObject({
    from: 'f4',
    to: 'e3',
    captured: 'p',
    flags: 'e',
  })
  expect(chess.fen()).toEqual(move.after)
  expect(move.after).toEqual(next)
  expect(move.isCapture()).toEqual(false)
  expect(move.isPromotion()).toEqual(false)
  expect(move.isEnPassant()).toEqual(true)
  expect(move.isKingsideCastle()).toEqual(false)
  expect(move.isQueensideCastle()).toEqual(false)
  expect(move.isBigPawn()).toEqual(false)
})

test('move - works - standard algebraic notation (pin disambiguates piece)', () => {
  const fen = 'r2qkbnr/ppp2ppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R b KQkq - 3 7'
  const next = 'r2qkb1r/ppp1nppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R w KQkq - 4 8'
  const chess = new Chess(fen)
  const move = chess.move('Ne7')

  expect(move).toMatchObject({
    from: 'g8',
    to: 'e7',
    flags: 'n',
  })
  expect(move.after).toEqual(next)
  expect(chess.fen()).toEqual(move.after)
  expect(move.isCapture()).toEqual(false)
  expect(move.isPromotion()).toEqual(false)
  expect(move.isEnPassant()).toEqual(false)
  expect(move.isKingsideCastle()).toEqual(false)
  expect(move.isQueensideCastle()).toEqual(false)
  expect(move.isBigPawn()).toEqual(false)
})

test('move - works - permissive parser (accepts overly disambiguated piece)', () => {
  const fen = 'r2qkbnr/ppp2ppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R b KQkq - 3 7'
  const next = 'r2qkb1r/ppp1nppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R w KQkq - 4 8'
  const chess = new Chess(fen)
  const move = chess.move('Nge7')
  expect(move).toMatchObject({
    to: 'e7',
    from: 'g8',
    piece: 'n',
  })
  expect(chess.fen()).toBe(next)
  expect(move.isCapture()).toEqual(false)
  expect(move.isPromotion()).toEqual(false)
  expect(move.isEnPassant()).toEqual(false)
  expect(move.isKingsideCastle()).toEqual(false)
  expect(move.isQueensideCastle()).toEqual(false)
  expect(move.isBigPawn()).toEqual(false)
})

test('move - works - permissive parser (accepts correctly disambiguated piece)', () => {
  const fen = 'r2qkbnr/ppp2ppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R b KQkq - 3 7'
  const next = 'r2qkb1r/ppp1nppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R w KQkq - 4 8'
  const chess = new Chess(fen)
  const move = chess.move('Ne7')
  expect(move).toMatchObject({
    to: 'e7',
    from: 'g8',
    piece: 'n',
  })
  expect(chess.fen()).toBe(next)
  expect(move.isCapture()).toEqual(false)
  expect(move.isPromotion()).toEqual(false)
  expect(move.isEnPassant()).toEqual(false)
  expect(move.isKingsideCastle()).toEqual(false)
  expect(move.isQueensideCastle()).toEqual(false)
  expect(move.isBigPawn()).toEqual(false)
})

test('move - strict - throws Error - overly disambiguated piece', () => {
  const fen = 'r2qkbnr/ppp2ppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R b KQkq - 3 7'
  const chess = new Chess(fen)
  expect(() => chess.move('Nge7', { strict: true })).toThrowError()
})

test('move - throws Error - illegal move', () => {
  const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  const chess = new Chess(fen)
  expect(() => chess.move('e5')).toThrowError()
})

test('move - works - verbose', () => {
  const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  const next = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1'
  const chess = new Chess(fen)
  const move = chess.move({ from: 'e2', to: 'e4' })
  expect(chess.fen()).toEqual(next)
  expect(move.after).toEqual(next)
  expect(move.isCapture()).toEqual(false)
  expect(move.isPromotion()).toEqual(false)
  expect(move.isEnPassant()).toEqual(false)
  expect(move.isKingsideCastle()).toEqual(false)
  expect(move.isQueensideCastle()).toEqual(false)
  expect(move.isBigPawn()).toEqual(true)
})

test('move - works - verbose - promotion field ignored if not promoting', () => {
  const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  const next = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1'
  const chess = new Chess(fen)
  const move = chess.move({ from: 'e2', to: 'e4', promotion: 'q' })
  expect(chess.fen()).toBe(next)
  expect(move.isCapture()).toEqual(false)
  expect(move.isPromotion()).toEqual(false)
  expect(move.isEnPassant()).toEqual(false)
  expect(move.isKingsideCastle()).toEqual(false)
  expect(move.isQueensideCastle()).toEqual(false)
  expect(move.isBigPawn()).toEqual(true)
})

test('move - works - verbose - under promotion', () => {
  const fen = '8/1k5P/8/8/8/8/8/1K6 w - - 0 1'
  const next = '7N/1k6/8/8/8/8/8/1K6 b - - 0 1'
  const chess = new Chess(fen)
  const move = chess.move({ from: 'h7', to: 'h8', promotion: 'n' })
  expect(chess.fen()).toEqual(next)
  expect(move.after).toEqual(next)
  expect(move.isCapture()).toEqual(false)
  expect(move.isPromotion()).toEqual(true)
  expect(move.isEnPassant()).toEqual(false)
  expect(move.isKingsideCastle()).toEqual(false)
  expect(move.isQueensideCastle()).toEqual(false)
  expect(move.isBigPawn()).toEqual(false)
})

test('move - throws Error - verbose (illegal move)', () => {
  const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  const chess = new Chess(fen)
  expect(() => chess.move({ from: 'e2', to: 'e5' })).toThrowError()
})

test('move - works - permissive parser (piece capture without x)', () => {
  const fen =
    'r1bqk2r/p1p2pp1/2n1pn2/1p5p/2pP4/bPNB1PN1/PB1Q2PP/R3K2R w KQkq - 0 12'
  const next =
    'r1bqk2r/p1p2pp1/2n1pn2/1p5p/2pP4/BPNB1PN1/P2Q2PP/R3K2R b KQkq - 0 12'
  const chess = new Chess(fen)
  const move = chess.move('Ba3')
  expect(move).toMatchObject({
    to: 'a3',
    from: 'b2',
    piece: 'b',
  })
  expect(chess.fen()).toEqual(next)
  expect(move.after).toEqual(next)
  expect(move.isCapture()).toEqual(true)
  expect(move.isPromotion()).toEqual(false)
  expect(move.isEnPassant()).toEqual(false)
  expect(move.isKingsideCastle()).toEqual(false)
  expect(move.isQueensideCastle()).toEqual(false)
  expect(move.isBigPawn()).toEqual(false)
})

test('move - works - permissive parser (pawn capture without x)', () => {
  const fen = 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 2'
  const next = 'rnbqkbnr/pppp1ppp/8/8/4Pp2/8/PPPP2PP/RNBQKBNR w KQkq - 0 3'
  const chess = new Chess(fen)
  const move = chess.move('ef4')
  expect(move).toMatchObject({
    to: 'f4',
    from: 'e5',
    piece: 'p',
  })
  expect(chess.fen()).toEqual(next)
  expect(move.after).toEqual(next)
  expect(move.isCapture()).toEqual(true)
  expect(move.isPromotion()).toEqual(false)
  expect(move.isEnPassant()).toEqual(false)
  expect(move.isKingsideCastle()).toEqual(false)
  expect(move.isQueensideCastle()).toEqual(false)
  expect(move.isBigPawn()).toEqual(false)
})

test('move - works - permissive parser (en passant capture without x)', () => {
  const fen = 'rnbqkbnr/pppp1ppp/8/8/4PpP1/8/PPPP3P/RNBQKBNR b KQkq g3 0 3'
  const next = 'rnbqkbnr/pppp1ppp/8/8/4P3/6p1/PPPP3P/RNBQKBNR w KQkq - 0 4'
  const chess = new Chess(fen)
  const move = chess.move('fg3')
  expect(move).toMatchObject({
    to: 'g3',
    from: 'f4',
    piece: 'p',
  })
  expect(chess.fen()).toEqual(next)
  expect(move.after).toEqual(next)
  expect(move.isCapture()).toEqual(false)
  expect(move.isPromotion()).toEqual(false)
  expect(move.isEnPassant()).toEqual(true)
  expect(move.isKingsideCastle()).toEqual(false)
  expect(move.isQueensideCastle()).toEqual(false)
  expect(move.isBigPawn()).toEqual(false)
})

test('move - works - kingside castling', () => {
  const fen =
    'r1bqkbnr/ppp2ppp/2np4/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1'
  const next =
    'r1bqkbnr/ppp2ppp/2np4/4p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 1 1'
  const moves = ['O-O', 'e1g1']
  for (const theMove of moves) {
    const chess = new Chess(fen)
    const move = chess.move(theMove)
    expect(move.isBigPawn()).toEqual(false)
    expect(move.isCapture()).toEqual(false)
    expect(move.isPromotion()).toEqual(false)
    expect(move.isEnPassant()).toEqual(false)
    expect(move.isKingsideCastle()).toEqual(true)
    expect(move.isQueensideCastle()).toEqual(false)
    expect(move.after).toEqual(chess.fen())
    expect(chess.fen()).toEqual(next)
  }
})

test('move - works - queenside castling', () => {
  const fen =
    'r3kb1r/pppbqppp/2np1n2/4p3/4P3/2NP1N2/PPPBBPPP/R2Q1RK1 b kq - 5 7'
  const next =
    '2kr1b1r/pppbqppp/2np1n2/4p3/4P3/2NP1N2/PPPBBPPP/R2Q1RK1 w - - 6 8'
  const moves = ['O-O-O', 'e8c8']
  for (const theMove of moves) {
    const chess = new Chess(fen)
    const move = chess.move(theMove)
    expect(move.isBigPawn()).toEqual(false)
    expect(move.isCapture()).toEqual(false)
    expect(move.isPromotion()).toEqual(false)
    expect(move.isEnPassant()).toEqual(false)
    expect(move.isKingsideCastle()).toEqual(false)
    expect(move.isQueensideCastle()).toEqual(true)
    expect(move.after).toEqual(chess.fen())
    expect(chess.fen()).toEqual(next)
  }
})
