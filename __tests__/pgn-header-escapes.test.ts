import { Chess } from '../src/chess'
import { describe, expect, test } from 'vitest'

const tagValues = [
  ['plain text', 'Open Cup – Zürich', 'Open Cup – Zürich'],
  ['quotes', String.raw`The \"Open\" Cup`, 'The "Open" Cup'],
  ['backslashes', String.raw`a\\b\\c`, String.raw`a\b\c`],
  ['backslash before quote', String.raw`\\\"`, String.raw`\"`],
  ['trailing backslash', String.raw`path\\`, 'path\\'],
  ['literal escape letters', String.raw`\\n\\t`, String.raw`\n\t`],
]

describe.each([false, true])('PGN tag parsing (strict: %s)', (strict) => {
  test.each(tagValues)('loads %s', (_name, encoded, decoded) => {
    const chess = new Chess()
    chess.loadPgn(`[Event "${encoded}"]\n\n1. e4 e5 *`, { strict })

    expect(chess.getHeaders().Event).toBe(decoded)
    expect(chess.history()).toEqual(['e4', 'e5'])
  })

  test('preserves unknown escape sequences', () => {
    const chess = new Chess()
    chess.loadPgn(String.raw`[Event "a\q\n\t"]`, { strict })

    expect(chess.getHeaders().Event).toBe(String.raw`a\q\n\t`)
  })
})

test.each(tagValues)(
  'pgn escapes %s and round-trips headers',
  (_name, encoded, decoded) => {
    const chess = new Chess()
    chess.setHeader('Event', decoded)
    chess.setHeader('Annotator', decoded)
    chess.move('e4')
    chess.move('e5')
    const headers = chess.getHeaders()

    const pgn = chess.pgn()
    expect(pgn).toContain(`[Event "${encoded}"]\n`)
    expect(pgn).toContain(`[Annotator "${encoded}"]\n`)
    expect(chess.getHeaders()).toEqual(headers)

    const reloaded = new Chess()
    reloaded.loadPgn(pgn)
    expect(reloaded.getHeaders()).toEqual(headers)
    expect(reloaded.history()).toEqual(chess.history())
    expect(reloaded.fen()).toBe(chess.fen())
    expect(reloaded.pgn()).toBe(pgn)
  },
)
