import { Chess, Piece, WHITE, BLACK, KING, QUEEN } from '../src/chess'

test('getSquareByPiece', () => {
  const chess = new Chess()
  expect(chess.getSquareByPiece({ type: KING, color: WHITE })).toEqual('e1')
  expect(chess.getSquareByPiece({ type: KING, color: BLACK })).toEqual('e8')
})

test('getSquareByPiece - returns undefined for missing piece', () => {
  // queens are missing
  const chess = new Chess('8/6p1/8/2k4p/1R3P1P/Pp2K1P1/r7/8 w - - 1 44')
  expect(chess.getSquareByPiece({ type: QUEEN, color: WHITE })).toEqual(
    undefined,
  )
})

test('getSquareByPiece - returns undefined for invalid piece', () => {
  const chess = new Chess()
  expect(
    chess.getSquareByPiece({
      type: 'bad-piece',
      color: 'bad-color',
    } as unknown as Piece),
  ).toEqual(undefined)
})
