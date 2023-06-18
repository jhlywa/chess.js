import { Chess } from '../src/chess'

test('isFivefoldRepetition', () => {
  const moves = 'Nf3 Nf6 Ng1 Ng8 Nf3 Nf6 Ng1 Ng8 Nf3 Nf6 Ng1 Ng8 Nf3 Nf6 Ng1 Ng8'.split(/\s+/)
  const chess = new Chess()
  moves.forEach((move) => {
    expect(chess.isFivefoldRepetition()).toBe(false)
    chess.move(move)
  })
  expect(chess.isFivefoldRepetition()).toBe(true)
  chess.move('e4')
  expect(chess.isFivefoldRepetition()).toBe(false)
})
