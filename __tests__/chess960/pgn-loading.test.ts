
import { Chess960 } from '../../src/chess'
import { fileToString } from '../utils'
import { expect, test, describe } from 'vitest'

describe('Chess960 PGN Loading', () => {

  test('Game 1: Keymer vs Erigaisi (2025 Freestyle) - Round 01-02', () => {
    const pgn = fileToString('pgn/freestyle-1.pgn')
    const chess = new Chess960()
    
   
    chess.loadPgn(pgn) 

    expect(chess.header()['White']).toBe('Keymer, Vincent')
    expect(chess.header()['Black']).toBe('Erigaisi Arjun')
    expect(chess.header()['Result']).toBe('1-0')
    expect(chess.header()['Variant']).toBe('Chess960')
    
    expect(chess.fen()).toBe('8/p3q3/1p1k2QP/1Pp5/2Prp3/8/P2P4/5RK1 b F - 2 39')
  })
  test('Game 5: Aronian vs Carlsen (2025 Freestyle) - Final KO', () => {
    const pgn = fileToString('pgn/freestyle-5.pgn')
    const chess = new Chess960()
    chess.loadPgn(pgn)

    expect(chess.header()['White']).toBe('Aronian, Levon')
    expect(chess.header()['Black']).toBe('Carlsen, Magnus')
    expect(chess.header()['Result']).toBe('1-0')
    expect(chess.header()['Variant']).toBe('Chess960')
    
   
    expect(chess.fen()).toBe('8/2k3p1/1p2b3/6P1/1P1K1n1P/3BN3/2P5/8 b - - 2 45')
  })
  
  test('Game 6: Carlsen vs Aronian (2025 Freestyle) - Final KO Draw', () => {
    const pgn = fileToString('pgn/freestyle-6.pgn')
    const chess = new Chess960()
    chess.loadPgn(pgn)

    expect(chess.header()['White']).toBe('Carlsen, Magnus')
    expect(chess.header()['Black']).toBe('Aronian, Levon')
    expect(chess.header()['Result']).toBe('1/2-1/2')
    
    expect(chess.fen()).toBe('2k5/2P4R/p1n4p/7r/8/1N6/P2K4/8 w - - 3 65')
  })

  test('Game 7: Carlsen vs Sindarov (2025 Freestyle) - Round 02-04', () => {
    const pgn = fileToString('pgn/freestyle-7.pgn')
    const chess = new Chess960()
    
    chess.loadPgn(pgn)

    expect(chess.header()['White']).toBe('Carlsen, Magnus')
    expect(chess.header()['Black']).toBe('Sindarov, Javokhir')
    expect(chess.header()['Result']).toBe('1/2-1/2')
    
    expect(chess.fen()).toBe('8/8/8/4p3/5kpp/3K4/6BP/8 w - - 0 66')
  })

  test('Game 8: Aronian vs Niemann (2025 Freestyle) - Round 01-04', () => {
    const pgn = fileToString('pgn/freestyle-8.pgn')
    const chess = new Chess960()
    chess.loadPgn(pgn)

    expect(chess.header()['White']).toBe('Aronian, Levon')
    expect(chess.header()['Black']).toBe('Niemann, Hans Moke')
    expect(chess.header()['Result']).toBe('1-0')
    
    expect(chess.fen()).toBe('8/8/pN1pPk2/P3p3/1P2P2p/5nr1/4K3/5R2 b - - 5 45')
  })

  test('Game 9: Aronian vs Keymer (2025 Freestyle) - Round 02-02', () => {
    const pgn = fileToString('pgn/freestyle-9.pgn')
    const chess = new Chess960()
    
    chess.loadPgn(pgn) 

    expect(chess.header()['White']).toBe('Aronian, Levon')
    expect(chess.header()['Black']).toBe('Keymer, Vincent')
    expect(chess.header()['Result']).toBe('1/2-1/2')
    expect(chess.header()['Variant']).toBe('Chess960')
    
    expect(chess.fen()).toBe('5n2/p3Q2k/7r/7P/8/5N2/q5P1/6K1 b - - 3 57')
  })
})