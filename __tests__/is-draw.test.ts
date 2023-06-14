import { Chess } from '../src/chess'

test('isDraw - strict mode, fivefold repetition', () => {
  const moves = 'Nf3 Nf6 Ng1 Ng8 Nf3 Nf6 Ng1 Ng8 Nf3 Nf6 Ng1 Ng8'.split(/\s+/)
  const chess = new Chess()

  moves.forEach((move) => {
    expect(chess.isDraw(true)).toBe(false)
    chess.move(move)
  })
  
  expect(chess.isDraw()).toBe(true)
  expect(chess.isDraw(true)).toBe(false)
  chess.move('Nf3')
  chess.move('Nf6')
  chess.move('Ng1')
  chess.move('Ng8')
  expect(chess.isDraw(true)).toBe(true)

})

test('isDraw - strict mode, seventy-five-move rule', () => {
  const pgn = `1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 Nf6 5.O-O Nxe4 6.d4 b5 7.Bb3 d5 8.dxe5 Be6 
  9.c3 Be7 10.Re1 O-O 11.Nbd2 Nc5 12.Bc2 d4 13.Nf1 d3 14.Bb3 Nxb3 15.axb3 Qd7 16.Ng5 Bf5 
  17.Ng3 Bg6 18.h4 Rfd8 19.Bd2 h6 20.h5 Bf5 21.Nxf5 Qxf5 22.Qf3 Qxf3 23.Nxf3 a5 24.Re4 Rd5 
  25.Rae1 Rad8 26.g4 Ra8 27.Kg2 Kf8 28.Nd4 Nxd4 29.Rxd4 Rxd4 30.cxd4 Rd8 31.Be3 Rd5 32.Rd1 
  c5 33.dxc5 Bxc5 34.Bxc5+ Rxc5 35.Rxd3 Rxe5 36.Rd8+ Ke7 37.Ra8 b4 38.Kf3 Rc5 39.Ra7+ Ke6 
  40.Ke4 Rc2 41.Ra6+ Ke7 42.Rxa5 Rxb2 43.f4 Rxb3 44.Rb5 Rb1 45.g5 b3 46.gxh6 gxh6 47.Kf5 b2
  48.Rb7+ Ke8 49.Kf6 Rh1 50.Rxb2 Rxh5 51.Rb8+ Kd7 52.Kxf7 Rf5+ 53.Kg6 Rxf4 54.Kxh6 Ke6 
  55.Rb6+ Kf7 56.Rb7+ Kf6 57.Rb6+ Kf5 58.Rb5+ Kg4 59.Rg5+ Kf3 60.Rb5 Ra4 61.Kg5 Ra1 62.Rb3+
  Ke4 63.Rb4+ Kd5 64.Rb5+ Kc6 65.Rb2 Kc5 66.Kf4 Kd4 67.Rd2+ Kc3 68.Rd7 Kc2 69.Ke3 Ra3+ 
  70.Ke4 Ra4+ 71.Ke5 Ra8 72.Ke4 Kc3 73.Kf5 Ra5+ 74.Kg4 Kc4 75.Kh4 Ra4 76.Kh3 Kc5 77.Kh2 
  Kc6 78.Rd2 Kc5 79.Kh3 Ra3+ 80.Kh4 Kc6 81.Kh5 Kc7 82.Kh6 Kc8 83.Kh7 Rh3+ 84.Kg6 Kc7 85.Kf7
  Kc6 86.Ke6 Kc5 87.Kf5 Kc4 88.Kg4 Rh8 89.Rd7 Rg8+ 90.Kf3 Kc5 91.Kf4 Rf8+ 92.Ke5 Kc6 93.Rd2 
  Re8+ 94.Kf4 Rf8+ 95.Ke5 Kc5 96.Ke4 Kc4 97.Rc2+ Kb3 98.Rc7 Re8+ 99.Kd5 Rd8+ 100.Ke6 Kb4 
  101.Kf6 Rd1 102.Ke6 Kb5 103.Kf6 Re1 104.Kf5`
  const moves = pgn.split(/\s*\d+\.\s*|\s+/).slice(1)
  const strictPgn = `104.Rd1 105.Rc8 Ka5 106.Kf4 Re1 107.Kg4 Ka4 108.Rb8 
  Rf1 109.Kg5 Ka3 110.Rc8 Ka2 111.Kh5 Re1 112.Kg5 Ka1 113.Rc7 Rf1 114.Rd7 Kb2 115.Kg6 Re1 116.
  Rc7 Kb1 117.Kg5 Re2 118.Rc4 Re6 119.Kg4 Kb2 120.Kg3 Ka3 121.Rc2 Re8 122.Kg2 Ka4 123.Rc4+ Ka3 
  124.Kg1 Re2 125.Rc5 Ka2 126.Kh1 Re1+ 127.Kh2 Ka1 128.Kh3 Rd1 129.Rd5`
  const strictMoves = strictPgn.split(/\s*\d+\.\s*|\s+/).slice(1)
  
  const chess = new Chess()
  moves.forEach((move) => {
    expect(chess.isDraw()).toBe(false)
    expect(chess.isDraw(true)).toBe(false)
    chess.move(move)
  })

  strictMoves.forEach((move) => {
    expect(chess.isDraw()).toBe(true)
    expect(chess.isDraw(true)).toBe(false)
    chess.move(move)
  })
  expect(chess.isDraw()).toBe(true)
  expect(chess.isDraw(true)).toBe(true)
})
