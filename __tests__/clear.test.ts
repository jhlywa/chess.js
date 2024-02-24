import { Chess } from '../src/chess'

test('clear', () => {
  const chess = new Chess()
  chess.header('White', 'Magnus Carlsen')
  chess.header('Black', 'Viswanathan Anand')

  chess.clear()
  expect(chess.fen()).toEqual('8/8/8/8/8/8/8/8 w - - 0 1')
  expect(chess.header()).toEqual({})
})

test('clear - preserveHeaders = true', () => {
  const chess = new Chess()
  chess.header('White', 'Magnus Carlsen')
  chess.header('Black', 'Viswanathan Anand')

  chess.clear({ preserveHeaders: true })

  expect(chess.fen()).toEqual('8/8/8/8/8/8/8/8 w - - 0 1')
  expect(chess.header()).toEqual({
    White: 'Magnus Carlsen',
    Black: 'Viswanathan Anand',
  })
})
