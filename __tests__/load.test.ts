import { Chess, DEFAULT_POSITION, SEVEN_TAG_ROSTER } from '../src/chess'

test('load - default position', () => {
  const chess = new Chess()
  expect(chess.fen()).toEqual(DEFAULT_POSITION)
})

// see fen.test.ts for more testcases involving .load()

test('load - invalid fen', () => {
  const chess = new Chess()
  expect(() => chess.load('')).toThrow()
})

test('load - incomplete FEN string', () => {
  const chess = new Chess()
  // the 8th rank (nbqkbnr) is missing a piece or square digit
  const fen = 'nbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  expect(() => chess.load(fen)).toThrow()
})

test('load - bad empty squares digit (9)', () => {
  const chess = new Chess()
  const fen = 'rnbqkbnr/pppppppp/9/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  expect(() => chess.load(fen)).toThrow()
})

test('load - bad piece (X)', () => {
  const chess = new Chess()
  const fen = '1nbqkbn1/pppp1ppX/8/4p3/4P3/8/PPPP1PPP/1NBQKBN1 b - - 1 2'
  expect(() => chess.load(fen)).toThrow()
})

test('load - missing white king', () => {
  const chess = new Chess()
  const fen = '1nbqkbn1/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/1NBQ1BN1 b - - 1 2'
  expect(() => chess.load(fen)).toThrow()
})

test('load - missing black king', () => {
  const chess = new Chess()
  const fen = '1nbq1bn1/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/1NBQKBN1 b - - 1 2'
  expect(() => chess.load(fen)).toThrow()
})

test('load - bad ep square (e9)', () => {
  const chess = new Chess()
  const fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e9 0 1'
  expect(() => chess.load(fen)).toThrow()
})

test('load - missing FEN tokens (no castling rights, ep square, or move numbers)', () => {
  const chess = new Chess()
  const fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b'
  expect(() => chess.load(fen)).not.toThrow()
})

test('load - preserveHeaders = false', () => {
  const chess = new Chess()
  chess.setHeader('White', 'Magnus Carlsen')
  chess.setHeader('Black', 'Viswanathan Anand')
  chess.load(DEFAULT_POSITION)
  expect(chess.getHeaders()).toEqual({...SEVEN_TAG_ROSTER})
})

test('load - preserveHeaders = true', () => {
  const chess = new Chess()
  chess.setHeader('White', 'Magnus Carlsen')
  chess.setHeader('Black', 'Viswanathan Anand')
  chess.load(DEFAULT_POSITION, { preserveHeaders: true })
  expect(chess.getHeaders()).toEqual({ ...SEVEN_TAG_ROSTER,
    White: 'Magnus Carlsen',
    Black: 'Viswanathan Anand',
  })
})

test('load - skipValidation = true', () => {
  const chess = new Chess()
  // missing white king
  const fen = '1nbqkbn1/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/1NBQ1BN1 b - - 1 2'
  expect(() => chess.load(fen, { skipValidation: true })).not.toThrow()
})

test('Chess constructor - skipValidation = false', () => {
  expect(() => {
    // white king is missing from fen
    const _chess = new Chess(
      '1nbqkbn1/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/1NBQ1BN1 b - - 1 2',
    )
  }).toThrowError()
})

test('Chess constructor - skipValidation = true', () => {
  expect(() => {
    // white king is missing from fen
    const _chess = new Chess(
      '1nbqkbn1/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/1NBQ1BN1 b - - 1 2',
      { skipValidation: false },
    )
  }).toThrowError()
})
