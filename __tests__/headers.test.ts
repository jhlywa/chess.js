import { Chess, SEVEN_TAG_ROSTER } from '../src/chess'
import { beforeEach, describe, expect, test } from 'vitest'

describe('Chess Header Methods', () => {
  let chess: Chess

  beforeEach(() => {
    chess = new Chess()
  })

  test('setHeader should add or update a header', () => {
    chess.setHeader('Event', 'Test Event')
    chess.setHeader('Site', 'Test Site')

    const headers = chess.getHeaders()
    expect(headers).toEqual({
      ...SEVEN_TAG_ROSTER,
      Event: 'Test Event',
      Site: 'Test Site',
    })

    // Update an existing header
    chess.setHeader('Event', 'Updated Event')
    expect(chess.getHeaders().Event).toBe('Updated Event')
  })

  test('removeHeader should remove a header if it exists', () => {
    chess.setHeader('Event', 'Test Event')
    chess.setHeader('Site', 'Test Site')

    const removed = chess.removeHeader('Event')
    expect(removed).toBe(true)

    const headers = chess.getHeaders()
    expect(headers).toEqual({
      ...SEVEN_TAG_ROSTER,
      Site: 'Test Site',
    })

    // Attempt to remove a non-existent header
    const nonExistent = chess.removeHeader('NonExistent')
    expect(nonExistent).toBe(false)
  })

  test('getHeaders should return only non-null headers', () => {
    chess.setHeader('Event', 'Test Event')
    chess.setHeader('Site', 'Test Site')
    chess.setHeader('Opening', "Santasiere's Folly")

    // Simulate a null header
    chess.setHeader('Round', null as unknown as string) // Round will be set as mandatory default ("?")

    const headers = chess.getHeaders()
    const expected = {
      ...SEVEN_TAG_ROSTER,
      Opening: "Santasiere's Folly",
      Event: 'Test Event',
      Site: 'Test Site',
    }

    expect(headers).toEqual(expected)

    const expectedPartial = { ...expected } as Partial<typeof expected>
    delete expectedPartial.Opening

    chess.removeHeader('Opening')
    expect(chess.getHeaders()).toEqual(expectedPartial)

    expect(headers.Round).toBe('?')
  })
})
