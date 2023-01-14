import { Chess } from '../src/chess'

test('move - works - standard algebraic notation', () => {
  const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  const next = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1'
  const chess = new Chess(fen)
  chess.move('e4')
  expect(chess.fen()).toBe(next)
})

test('move - works - standard algebraic notation (mates)', () => {
  const fen = '7k/3R4/3p2Q1/6Q1/2N1N3/8/8/3R3K w - - 0 1'
  const next = '3R3k/8/3p2Q1/6Q1/2N1N3/8/8/3R3K b - - 1 1'
  const chess = new Chess(fen)
  chess.move('Rd8#')
  expect(chess.fen()).toBe(next)
})

test('move - works - standard algebraic notation (white en passant)', () => {
  const fen = 'rnbqkbnr/pp3ppp/2pp4/4pP2/4P3/8/PPPP2PP/RNBQKBNR w KQkq e6 0 1'
  const next = 'rnbqkbnr/pp3ppp/2ppP3/8/4P3/8/PPPP2PP/RNBQKBNR b KQkq - 0 1'
  const chess = new Chess(fen)
  expect(chess.move('fxe6')).toMatchObject({
    from: 'f5',
    to: 'e6',
    captured: 'p',
    flags: 'e',
  })
  expect(chess.fen()).toBe(next)
})

test('move - works - standard algebraic notation (black en passant)', () => {
  const fen = 'rnbqkbnr/pppp2pp/8/4p3/4Pp2/2PP4/PP3PPP/RNBQKBNR b KQkq e3 0 1'
  const next = 'rnbqkbnr/pppp2pp/8/4p3/8/2PPp3/PP3PPP/RNBQKBNR w KQkq - 0 2'
  const chess = new Chess(fen)
  expect(chess.move('fxe3')).toMatchObject({
    from: 'f4',
    to: 'e3',
    captured: 'p',
    flags: 'e',
  })
  expect(chess.fen()).toBe(next)
})

test('move - works - standard algebraic notation (pin disambiguates piece)', () => {
  const fen = 'r2qkbnr/ppp2ppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R b KQkq - 3 7'
  const next = 'r2qkb1r/ppp1nppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R w KQkq - 4 8'
  const chess = new Chess(fen)
  expect(chess.move('Ne7')).toMatchObject({
    from: 'g8',
    to: 'e7',
    flags: 'n',
  })
  expect(chess.fen()).toBe(next)
})

test('move - works - permissive parser (accepts overly disambiguated piece)', () => {
  const fen = 'r2qkbnr/ppp2ppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R b KQkq - 3 7'
  const next = 'r2qkb1r/ppp1nppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R w KQkq - 4 8'
  const chess = new Chess(fen)
  expect(chess.move('Nge7')).toMatchObject({
    to: 'e7',
    from: 'g8',
    piece: 'n',
  })
  expect(chess.fen()).toBe(next)
})

test('move - works - permissive parser (accepts correctly disambiguated piece)', () => {
  const fen = 'r2qkbnr/ppp2ppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R b KQkq - 3 7'
  const next = 'r2qkb1r/ppp1nppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R w KQkq - 4 8'
  const chess = new Chess(fen)
  expect(chess.move('Ne7')).toMatchObject({
    to: 'e7',
    from: 'g8',
    piece: 'n',
  })
  expect(chess.fen()).toBe(next)
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
  chess.move({ from: 'e2', to: 'e4' })
  expect(chess.fen()).toBe(next)
})

test('move - works - verbose - promotion field ignored if not promoting', () => {
  const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  const next = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1'
  const chess = new Chess(fen)
  chess.move({ from: 'e2', to: 'e4', promotion: 'q' })
  expect(chess.fen()).toBe(next)
})

test('move - works - verbose - under promotion', () => {
  const fen = '8/1k5P/8/8/8/8/8/1K6 w - - 0 1'
  const next = '7N/1k6/8/8/8/8/8/1K6 b - - 0 1'
  const chess = new Chess(fen)
  chess.move({ from: 'h7', to: 'h8', promotion: 'n' })
  expect(chess.fen()).toBe(next)
})

test('move - throws Error - verbose (illegal move)', () => {
  const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  const chess = new Chess(fen)
  expect(() => chess.move({ from: 'e2', to: 'e5' })).toThrowError()
})
