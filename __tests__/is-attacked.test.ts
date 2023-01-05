import { Chess, Square, Color, SQUARES, WHITE, BLACK } from '../src/chess'

function areAttacked(chess: Chess, squares: Square[], color: Color) {
  return squares.reduce(
    (acc, square) => acc && chess.isAttacked(square, color),
    true
  )
}

function areNotAttacked(chess: Chess, squares: Square[], color: Color) {
  // returns true is all squares are NOT attacked
  return !squares.reduce(
    (acc, square) => acc || chess.isAttacked(square, color),
    false
  )
}

test('isAttacked (white pawn attacks)', () => {
  const chess = new Chess()

  // diagonal attacks
  chess.load('4k3/4p3/8/8/8/8/4P3/4K3 w - - 0 1')
  expect(areAttacked(chess, ['d3', 'f3'], WHITE)).toBe(true)
  expect(areNotAttacked(chess, ['d3', 'f3'], BLACK)).toBe(true)

  // small/big pawn moves aren't attacks
  expect(areNotAttacked(chess, ['e4', 'e4'], WHITE)).toBe(true)
})

test('isAttacked (black pawn attacks)', () => {
  const chess = new Chess()

  // diagonal attacks
  chess.load('4k3/4p3/8/8/8/8/4P3/4K3 w - - 0 1')
  expect(areAttacked(chess, ['f6', 'd6'], BLACK)).toBe(true)
  expect(areNotAttacked(chess, ['f6', 'd6'], WHITE)).toBe(true)

  // small/big pawn moves aren't attacks
  expect(areNotAttacked(chess, ['e6', 'e5'], BLACK)).toBe(true)
})

test('isAttacked (knight)', () => {
  const chess = new Chess('4k3/4p3/8/8/4N3/8/8/4K3 w - - 0 1')

  const squares: Square[] = ['d2', 'f2', 'c3', 'g3', 'd6', 'f6', 'c5', 'g5']

  expect(areAttacked(chess, squares, WHITE)).toBe(true)
  expect(chess.isAttacked('e4', WHITE)).toBe(false) // same square
})

test('isAttacked (bishop)', () => {
  const chess = new Chess('4k3/4p3/8/8/4b3/8/8/4K3 w - - 0 1')

  const squares: Square[] = [
    'b1',
    'c2',
    'd3',
    'f5',
    'g6',
    'h7',
    'a8',
    'b7',
    'c6',
    'd5',
    'f3',
    'g2',
    'h1',
  ]
  expect(areAttacked(chess, squares, BLACK)).toBe(true)
  expect(chess.isAttacked('e4', BLACK)).toBe(false) // same square
})

test('isAttacked (rook)', () => {
  const chess = new Chess('4k3/4n3/8/8/8/4R3/8/4K3 w - - 0 1')

  const squares: Square[] = [
    'e1', // yes, we can attack our own color
    'e2',
    'e4',
    'e5',
    'e6',
    'e7',
    'a3',
    'b3',
    'c3',
    'd3',
    'f3',
    'g3',
    'h3',
  ]
  expect(areAttacked(chess, squares, WHITE)).toBe(true)
  expect(chess.isAttacked('e3', WHITE)).toBe(false) // same square
})

test('isAttacked (queen)', () => {
  const chess = new Chess('4k3/4n3/8/8/8/4q3/4P3/4K3 w - - 0 1')

  const squares: Square[] = [
    'e2',
    'e4',
    'e5',
    'e6',
    'e7', // yes, we can attack our own color
    'a3',
    'b3',
    'c3',
    'd3',
    'f3',
    'g3',
    'h3',
    'c1',
    'd2',
    'f4',
    'g5',
    'h6',
    'g1',
    'f2',
    'd4',
    'c5',
    'b6',
    'a7',
  ]
  expect(areAttacked(chess, squares, BLACK)).toBe(true)
  expect(chess.isAttacked('e3', BLACK)).toBe(false) // same square
})

test('isAttacked (king)', () => {
  const chess = new Chess('4k3/4n3/8/8/8/4q3/4P3/4K3 w - - 0 1')

  const squares: Square[] = [
    'e2', // yes, we can attack our own color
    'd1',
    'd2',
    'f1',
    'f2',
  ]
  expect(areAttacked(chess, squares, WHITE)).toBe(true)
  expect(chess.isAttacked('e1', WHITE)).toBe(false) // same square
})

test('isAttacked (pinned pieces still attacks)', () => {
  // pinned pawn, but still is an attacked square
  const chess = new Chess('4k3/4r3/8/8/8/8/4P3/4K3 w - - 0 1')
  expect(areAttacked(chess, ['d3', 'f3'], WHITE)).toBe(true)
})

test('isAttacked (no x-ray)', () => {
  const chess = new Chess('4k3/4n3/8/8/8/4q3/4P3/4K3 w - - 0 1')
  expect(areNotAttacked(chess, ['e1'], BLACK)).toBe(true)
})
