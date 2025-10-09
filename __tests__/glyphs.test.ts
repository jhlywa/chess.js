import { Chess, nagToGlyph } from '../src/chess'
import { describe, expect, it } from 'vitest'

describe('NAG Support', () => {
  it('captures multiple NAGs from PGN', () => {
    const chess = new Chess()
    const pgn =
      '1. e4 $1 {Great move} ' +
      'e5 $6 {Questionable} ' +
      '2. Nf3 $14 Nc6 $10 *'

    chess.loadPgn(pgn)

    const fen1 = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1'
    const fen2 = 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2'
    const fen3 =
      'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2'
    const fen4 =
      'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3'

    expect(chess.fen()).toEqual(fen4)

    const comments = chess.getComments()
    expect(comments).toContainEqual({
      fen: fen1,
      comment: 'Great move',
      nags: [1],
    })
    expect(comments).toContainEqual({
      fen: fen2,
      comment: 'Questionable',
      nags: [6],
    })
    expect(comments).toContainEqual({
      fen: fen3,
      nags: [14],
    })
    expect(comments).toContainEqual({
      fen: fen4,
      nags: [10],
    })
  })

  it('handles multiple NAGs per position', () => {
    const chess = new Chess()
    const pgn = '1. e4 $1 $14 $99 $10 *' // Mix of NAGs

    chess.loadPgn(pgn)

    const fen1 = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1'
    const comments = chess.getComments()

    expect(comments).toContainEqual({
      fen: fen1,
      nags: [1, 14, 99, 10], // All NAGs stored
    })
  })

  it('manually add NAG', () => {
    const chess = new Chess()
    chess.move('e4')
    const currentFen = chess.fen()

    // Add NAG 16 (± - White is better)
    chess.addNag(16)
    expect(chess.getNags()).toEqual([16])
    expect(chess.getNags(currentFen)).toEqual([16])

    // Add another NAG
    chess.addNag(36) // ↑ - Initiative
    expect(chess.getNags()).toEqual([16, 36])

    const comments = chess.getComments()
    expect(comments).toContainEqual({
      fen: currentFen,
      nags: [16, 36],
    })
  })

  it('remove NAG functionality', () => {
    const chess = new Chess()
    chess.move('e4')

    // Add NAGs
    chess.addNag(13) // ∞ - Unclear position
    chess.addNag(36) // ↑ - Initiative
    expect(chess.getNags()).toEqual([13, 36])

    // Remove one NAG
    const removed = chess.removeNag(13)
    expect(removed).toBe(true)
    expect(chess.getNags()).toEqual([36])

    // Remove all NAGs
    const removedAll = chess.removeNags()
    expect(removedAll).toEqual([36])
    expect(chess.getNags()).toEqual([])

    // Remove non-existent should return empty array
    const removedAgain = chess.removeNags()
    expect(removedAgain).toEqual([])

    // Comments should be empty after removal
    expect(chess.getComments()).toEqual([])
  })

  it('NAG with specific FEN', () => {
    const chess = new Chess()
    chess.move('e4')
    const fen1 = chess.fen()
    chess.move('e5')
    const fen2 = chess.fen()

    // Set NAG for previous position
    chess.addNag(40, fen1) // → - Attack
    expect(chess.getNags(fen1)).toEqual([40])
    expect(chess.getNags(fen2)).toEqual([])
    expect(chess.getNags()).toEqual([]) // Current position has no NAG

    // Remove NAG by FEN
    const removed = chess.removeNags(fen1)
    expect(removed).toEqual([40])
    expect(chess.getNags(fen1)).toEqual([])
  })

  it('integration with comments and suffixes', () => {
    const chess = new Chess()
    chess.move('e4')
    const currentFen = chess.fen()

    // Set all three types of annotations
    chess.setComment('Excellent opening')
    chess.setSuffixAnnotation('!!')
    chess.addNag(14) // ⩲ - White is slightly better

    const comments = chess.getComments()
    expect(comments).toContainEqual({
      fen: currentFen,
      comment: 'Excellent opening',
      suffixAnnotation: '!!',
      nags: [14],
    })
  })

  it('reset clears all NAGs', () => {
    const chess = new Chess()
    chess.move('e4')
    chess.addNag(16) // ± - White is better
    chess.move('e5')
    chess.addNag(17) // ∓ - Black is better

    expect(chess.getComments()).toHaveLength(2)

    chess.reset()
    expect(chess.getComments()).toEqual([])
    expect(chess.getNags()).toEqual([])
  })

  it('nagToGlyph utility function', () => {
    // Test mapping for all supported NAGs
    expect(nagToGlyph(7)).toBe('□') // Only move
    expect(nagToGlyph(22)).toBe('⨀') // Zugzwang
    expect(nagToGlyph(10)).toBe('=') // Equal position
    expect(nagToGlyph(13)).toBe('∞') // Unclear position
    expect(nagToGlyph(14)).toBe('⩲') // White is slightly better
    expect(nagToGlyph(15)).toBe('⩱') // Black is slightly better
    expect(nagToGlyph(16)).toBe('±') // White is better
    expect(nagToGlyph(17)).toBe('∓') // Black is better
    expect(nagToGlyph(18)).toBe('+−') // White is winning
    expect(nagToGlyph(19)).toBe('-+') // Black is winning
    expect(nagToGlyph(146)).toBe('N') // Novelty
    expect(nagToGlyph(32)).toBe('↑↑') // Development
    expect(nagToGlyph(36)).toBe('↑') // Initiative
    expect(nagToGlyph(40)).toBe('→') // Attack
    expect(nagToGlyph(132)).toBe('⇆') // Counterplay
    expect(nagToGlyph(138)).toBe('⊕') // Time trouble
    expect(nagToGlyph(44)).toBe('=∞') // With compensation
    expect(nagToGlyph(140)).toBe('∆') // With the idea

    // Test unmapped NAG returns undefined
    expect(nagToGlyph(1)).toBeUndefined()
    expect(nagToGlyph(99)).toBeUndefined()
    expect(nagToGlyph(999)).toBeUndefined()
  })

  it('PGN with multiple NAGs per position', () => {
    const chess = new Chess()
    const pgn = `
      1. e4 $16 $132 e5 $15
      2. Nf3 $36 Nc6 $140
      3. Bc4 $40 Be7 $44 *
    `

    chess.loadPgn(pgn)

    const comments = chess.getComments()

    // Find entries with NAGs
    const nagEntries = comments.filter((entry) => entry.nags)

    expect(nagEntries).toHaveLength(6)

    // Check specific positions have correct NAGs
    const e4Entry = comments.find((c) =>
      c.fen.includes('rnbqkbnr/pppppppp/8/8/4P3'),
    )
    expect(e4Entry?.nags).toEqual([16, 132])

    const e5Entry = comments.find((c) =>
      c.fen.includes('rnbqkbnr/pppp1ppp/8/4p3/4P3/8'),
    )
    expect(e5Entry?.nags).toEqual([15])

    // Verify all NAGs can be converted to glyphs
    expect(nagToGlyph(16)).toBe('±')
    expect(nagToGlyph(132)).toBe('⇆')
    expect(nagToGlyph(15)).toBe('⩱')
    expect(nagToGlyph(36)).toBe('↑')
    expect(nagToGlyph(140)).toBe('∆')
    expect(nagToGlyph(40)).toBe('→')
    expect(nagToGlyph(44)).toBe('=∞')
  })

  it('setNags replaces existing NAGs', () => {
    const chess = new Chess()
    chess.move('e4')

    chess.addNag(10)
    chess.addNag(14)
    expect(chess.getNags()).toEqual([10, 14])

    // Replace with new set
    chess.setNags([16, 36, 40])
    expect(chess.getNags()).toEqual([16, 36, 40])
  })

  it('addNag avoids duplicates', () => {
    const chess = new Chess()
    chess.move('e4')

    chess.addNag(10)
    chess.addNag(10)
    chess.addNag(10)

    expect(chess.getNags()).toEqual([10])
  })
})
