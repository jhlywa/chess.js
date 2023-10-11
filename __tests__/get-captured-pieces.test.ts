import { Chess } from '../src/chess'


describe('getCapturedWhitePieces() and getCapturedBlackPieces() should return captured pieces', () => {
  const chess = new Chess()

  beforeAll(() => {
    chess.move('d4')
    chess.move('e5')
    chess.move('dxe5')
    chess.move('Bb4+')
    chess.move('c3')
    chess.move('Bxc3+')
    chess.move('Nxc3')
    chess.move('d5')
    chess.move('Nxd5')
    chess.move('Qxd5')
  })

  test('get-captured-pieces - works - gives all captured white pieces', () => {
    expect(chess.getCapturedWhitePieces()).toEqual({"b": 0, "k": 0, "n": 1, "p": 1, "q": 0,"r": 0})
  })

  test('get-captured-pieces - works - gives all captured black pieces', () => {
    expect(chess.getCapturedBlackPieces()).toEqual({"b": 1, "k": 0, "n": 0, "p": 2, "q": 0,"r": 0})
  })
})


