import { Chess, Glyph } from '../src/chess'
import { describe, expect, it } from 'vitest'

describe('Glyph Support', () => {
  it('captures multiple NAGs and converts to glyphs', () => {
    const chess = new Chess()
    const pgn =
      '1. e4 $1 {Great move} ' +
      'e5 $6 {Questionable} ' +
      '2. Nf3 $14 Nc6 $10 *'

    chess.loadPgn(pgn)

    const fen1 = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1'
    const fen2 = 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2'
    const fen3 = 'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2'
    const fen4 = 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3'

    expect(chess.fen()).toEqual(fen4)

    const comments = chess.getComments()
    expect(comments).toContainEqual({
      fen: fen1,
      comment: 'Great move',
    })
    expect(comments).toContainEqual({
      fen: fen2,
      comment: 'Questionable',
    })
    expect(comments).toContainEqual({
      fen: fen3,
      glyph: '⩲', // $14 -> White is slightly better
    })
    expect(comments).toContainEqual({
      fen: fen4,
      glyph: '=', // $10 -> Equal position
    })
  })

  it('handles multiple NAGs by using first valid glyph', () => {
    const chess = new Chess()
    const pgn = '1. e4 $1 $14 $99 $10 *' // Mix of invalid and valid NAGs

    chess.loadPgn(pgn)

    const fen1 = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1'
    const comments = chess.getComments()

    expect(comments).toContainEqual({
      fen: fen1,
      glyph: '⩲', // Should use $14 (first valid glyph) not $10
    })
  })

  it('manually set glyph with validation', () => {
    const chess = new Chess()
    chess.move('e4')
    const currentFen = chess.fen()

    // Valid glyph
    chess.setGlyph('±')
    expect(chess.getGlyph()).toEqual('±')
    expect(chess.getGlyph(currentFen)).toEqual('±')

    // Invalid glyph should throw
    expect(() => chess.setGlyph('invalid' as never)).toThrow('Invalid glyph: invalid')

    const comments = chess.getComments()
    expect(comments).toContainEqual({
      fen: currentFen,
      glyph: '±',
    })
  })

  it('remove glyph functionality', () => {
    const chess = new Chess()
    chess.move('e4')

    // Set a glyph
    chess.setGlyph('∞')
    expect(chess.getGlyph()).toEqual('∞')

    // Remove it
    const removed = chess.removeGlyph()
    expect(removed).toEqual('∞')
    expect(chess.getGlyph()).toBeUndefined()

    // Remove non-existent should return undefined
    const removedAgain = chess.removeGlyph()
    expect(removedAgain).toBeUndefined()

    // Comments should be empty after removal
    expect(chess.getComments()).toEqual([])
  })

  it('glyph with specific FEN', () => {
    const chess = new Chess()
    chess.move('e4')
    const fen1 = chess.fen()
    chess.move('e5')
    const fen2 = chess.fen()

    // Set glyph for previous position
    chess.setGlyph('→', fen1)
    expect(chess.getGlyph(fen1)).toEqual('→')
    expect(chess.getGlyph(fen2)).toBeUndefined()
    expect(chess.getGlyph()).toBeUndefined() // Current position has no glyph

    // Remove glyph by FEN
    const removed = chess.removeGlyph(fen1)
    expect(removed).toEqual('→')
    expect(chess.getGlyph(fen1)).toBeUndefined()
  })

  it('integration with comments and suffixes', () => {
    const chess = new Chess()
    chess.move('e4')
    const currentFen = chess.fen()

    // Set all three types of annotations
    chess.setComment('Excellent opening')
    chess.setSuffixAnnotation('!!')
    chess.setGlyph('⩲')

    const comments = chess.getComments()
    expect(comments).toContainEqual({
      fen: currentFen,
      comment: 'Excellent opening',
      suffixAnnotation: '!!',
      glyph: '⩲',
    })
  })

  it('reset clears all glyphs', () => {
    const chess = new Chess()
    chess.move('e4')
    chess.setGlyph('±')
    chess.move('e5')
    chess.setGlyph('∓')

    expect(chess.getComments()).toHaveLength(2)

    chess.reset()
    expect(chess.getComments()).toEqual([])
    expect(chess.getGlyph()).toBeUndefined()
  })

  it('all supported lichess glyphs', () => {
    const chess = new Chess()
    const supportedGlyphs: Glyph[] = [
      '□', // Only move
      '⨀', // Zugzwang
      '=', // Equal position
      '∞', // Unclear position
      '⩲', // White is slightly better
      '⩱', // Black is slightly better
      '±', // White is better
      '∓', // Black is better
      '+−', // White is winning
      '-+', // Black is winning
      'N', // Novelty
      '↑↑', // Development
      '↑', // Initiative
      '→', // Attack
      '⇆', // Counterplay
      '⊕', // Time trouble
      '=∞', // With compensation
      '∆', // With the idea
    ]

    // Test each glyph can be set and retrieved
    supportedGlyphs.forEach(glyph => {
      chess.setGlyph(glyph)
      expect(chess.getGlyph()).toEqual(glyph)
    })
  })

  it('PGN with NAGs mapped to glyphs', () => {
    const chess = new Chess()
    const pgn = `
      1. e4 $16 $132 e5 $15
      2. Nf3 $36 Nc6 $140
      3. Bc4 $40 Be7 $44 *
    `

    chess.loadPgn(pgn)

    const comments = chess.getComments()

    // Find entries with glyphs
    const glyphEntries = comments.filter(entry => entry.glyph)

    expect(glyphEntries).toHaveLength(6)
    expect(glyphEntries.map(e => e.glyph)).toContain('±') // $16
    expect(glyphEntries.map(e => e.glyph)).toContain('⩱') // $15
    expect(glyphEntries.map(e => e.glyph)).toContain('↑') // $36
    expect(glyphEntries.map(e => e.glyph)).toContain('∆') // $140
    expect(glyphEntries.map(e => e.glyph)).toContain('→') // $40
    expect(glyphEntries.map(e => e.glyph)).toContain('=∞') // $44
  })
})