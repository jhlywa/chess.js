import { Chess, validateFen } from '../src/chess'
import { CHESS960_PERFT } from './chess960-perft'
import { describe, expect, it, test } from 'vitest'

describe('Chess960 perft', () => {
  test('all 960 reference positions, two moves deep', () => {
    for (const [fen, depth1, depth2] of CHESS960_PERFT) {
      const chess = new Chess(fen, { chess960: true })
      expect([fen, chess.perft(1), chess.perft(2)]).toEqual([
        fen,
        depth1,
        depth2,
      ])
    }
  })

  test('every 24th reference position, three moves deep', () => {
    for (let i = 0; i < CHESS960_PERFT.length; i += 24) {
      const [fen, , , depth3] = CHESS960_PERFT[i]
      const chess = new Chess(fen, { chess960: true })
      expect([fen, chess.perft(3)]).toEqual([fen, depth3])
    }
  })

  test('the standard start position plays as in standard chess', () => {
    const chess = new Chess(undefined, { chess960: true })
    expect(chess.perft(4)).toBe(197281)
    expect(chess.fen()).toBe(new Chess().fen())
  })
})

describe('Chess960 castling', () => {
  it('castles kingside by taking the king onto its rook, swapping the two', () => {
    const chess = new Chess('4k3/8/8/8/8/8/8/1R3KR1 w GB - 0 1', {
      chess960: true,
    })
    const move = chess.move({ from: 'f1', to: 'g1' })

    expect(move.san).toBe('O-O')
    expect(move.isKingsideCastle()).toBe(true)
    expect(move.to).toBe('g1')
    expect(move.lan).toBe('f1g1')
    expect(chess.fen()).toBe('4k3/8/8/8/8/8/8/1R3RK1 b - - 1 1')
  })

  it('castles queenside onto a rook on the b-file', () => {
    const chess = new Chess('4k3/8/8/8/8/8/8/1R3KR1 w GB - 0 1', {
      chess960: true,
    })
    const move = chess.move({ from: 'f1', to: 'b1' })

    expect(move.san).toBe('O-O-O')
    expect(move.to).toBe('b1')
    expect(chess.fen()).toBe('4k3/8/8/8/8/8/8/2KR2R1 b - - 1 1')
  })

  it('castles with a king already on its castling square', () => {
    const chess = new Chess('4k3/8/8/8/8/8/8/R5KR w HA - 0 1', {
      chess960: true,
    })
    const move = chess.move('O-O')

    expect(move.from).toBe('g1')
    expect(move.to).toBe('h1')
    expect(chess.fen()).toBe('4k3/8/8/8/8/8/8/R4RK1 b - - 1 1')
  })

  it('reads a king move to the castling square as a king move', () => {
    const fen = '4k3/8/8/8/8/8/8/R4K1R w HA - 0 1'

    const walked = new Chess(fen, { chess960: true })
    expect(walked.move({ from: 'f1', to: 'g1' }).san).toBe('Kg1')
    expect(walked.fen()).toBe('4k3/8/8/8/8/8/8/R5KR b - - 1 1')

    const castled = new Chess(fen, { chess960: true })
    expect(castled.move({ from: 'f1', to: 'h1' }).san).toBe('O-O')
    expect(castled.fen()).toBe('4k3/8/8/8/8/8/8/R4RK1 b - - 1 1')
  })

  it('takes the king onto its rook in long algebraic notation too', () => {
    const chess = new Chess('4k3/8/8/8/8/8/8/R4K1R w HA - 0 1', {
      chess960: true,
    })
    expect(chess.move('f1a1').san).toBe('O-O-O')
    expect(chess.fen()).toBe('4k3/8/8/8/8/8/8/2KR3R b - - 1 1')
  })

  it('does not castle through a piece on the rook’s path', () => {
    const chess = new Chess('4k3/8/8/8/8/8/8/RN3K1R w HA - 0 1', {
      chess960: true,
    })
    expect(chess.moves()).toContain('O-O')
    expect(chess.moves()).not.toContain('O-O-O')
  })

  it('does not castle across an attacked square', () => {
    const chess = new Chess('3rk3/8/8/8/8/8/8/R4K1R w HA - 0 1', {
      chess960: true,
    })
    expect(chess.moves()).toContain('O-O')
    expect(chess.moves()).not.toContain('O-O-O')
  })

  it('does not castle out of check', () => {
    const chess = new Chess('4kr2/8/8/8/8/8/8/R4K1R w HA - 0 1', {
      chess960: true,
    })
    expect(chess.moves().filter((san) => san.startsWith('O-O'))).toEqual([])
  })

  it('castles with an attacked rook', () => {
    const chess = new Chess('4k2r/8/8/8/8/8/8/R4K1R w HA - 0 1', {
      chess960: true,
    })
    expect(chess.moves()).toContain('O-O')
  })

  it('does not castle when the rook, once moved, uncovers the king', () => {
    // the rook on b1 shields c1 from the black rook on a1
    const chess = new Chess('4k3/8/8/8/8/8/8/rR3K2 w Q - 0 1', {
      chess960: true,
    })
    expect(chess.getCastlingRights('w').q).toBe(true)
    expect(chess.moves()).not.toContain('O-O-O')
  })

  it('undoes castling back to the position before it', () => {
    const fen = '4k3/8/8/8/8/8/8/1R3KR1 w GB - 0 1'
    const chess = new Chess(fen, { chess960: true })
    const hash = chess.hash()

    chess.move('O-O')
    chess.undo()

    expect(chess.fen()).toBe('4k3/8/8/8/8/8/8/1R3KR1 w KQ - 0 1')
    expect(chess.hash()).toBe(hash)
  })

  it('drops the right of a rook that moves or is taken', () => {
    const chess = new Chess('r3k2r/8/8/8/8/8/8/R3K1R1 w GAha - 0 1', {
      chess960: true,
    })

    chess.move('Rxa8+')
    expect(chess.getCastlingRights('w')).toEqual({ k: true, q: false })
    expect(chess.getCastlingRights('b')).toEqual({ k: true, q: false })
  })

  it('lists castling as king to rook, which moves the same when passed back', () => {
    for (const [fen] of CHESS960_PERFT.slice(0, 50)) {
      const chess = new Chess(fen, { chess960: true })
      for (const move of chess.moves({ verbose: true })) {
        const again = new Chess(fen, { chess960: true })
        const { from, to, promotion } = move
        expect(again.move({ from, to, promotion }).san).toBe(move.san)
      }
    }
  })

  it('lists castling among the king’s moves', () => {
    const chess = new Chess('4k3/8/8/8/8/8/8/1R3KR1 w GB - 0 1', {
      chess960: true,
    })
    const castling = chess
      .moves({ square: 'f1', verbose: true })
      .filter((move) => move.isKingsideCastle() || move.isQueensideCastle())
      .map((move) => move.to)

    expect(castling.sort()).toEqual(['b1', 'g1'])
  })
})

describe('Chess960 FEN', () => {
  it('reads Shredder-FEN and writes X-FEN', () => {
    const chess = new Chess(
      'bqnb1rkr/pp3ppp/3ppn2/2p5/5P2/P2P4/NPP1P1PP/BQ1BNRKR w HFhf - 2 9',
      { chess960: true },
    )
    expect(chess.fen()).toBe(
      'bqnb1rkr/pp3ppp/3ppn2/2p5/5P2/P2P4/NPP1P1PP/BQ1BNRKR w KQkq - 2 9',
    )
  })

  it('writes the file of a castling rook that is not the outermost', () => {
    const chess = new Chess('k7/8/8/8/8/8/8/2K1R2R w E - 0 1', {
      chess960: true,
    })
    expect(chess.fen()).toBe('k7/8/8/8/8/8/8/2K1R2R w E - 0 1')

    chess.move('O-O')
    expect(chess.fen()).toBe('k7/8/8/8/8/8/8/5RKR b - - 1 1')
  })

  it('reads K and Q as the outermost rooks', () => {
    const chess = new Chess('k7/8/8/8/8/8/8/2K1R2R w K - 0 1', {
      chess960: true,
    })
    expect(chess.fen()).toBe('k7/8/8/8/8/8/8/2K1R2R w K - 0 1')
    // the rook on e1 stands in the way of the one on h1
    expect(chess.moves()).not.toContain('O-O')

    chess.move({ from: 'e1', to: 'e2' })
    chess.move({ from: 'a8', to: 'b8' })
    chess.move('O-O')
    expect(chess.fen()).toBe('1k6/8/8/8/8/8/4R3/5RK1 b - - 3 2')
  })

  it('drops rights it has no rook for', () => {
    const chess = new Chess('4k3/8/8/8/8/8/8/4K2R w KQ - 0 1', {
      chess960: true,
    })
    expect(chess.fen()).toBe('4k3/8/8/8/8/8/8/4K2R w K - 0 1')
  })

  it('accepts rook files only with chess960', () => {
    const fen = '4k3/8/8/8/8/8/8/1R3KR1 w GB - 0 1'
    expect(validateFen(fen).ok).toBe(false)
    expect(validateFen(fen, { chess960: true }).ok).toBe(true)
    expect(() => new Chess(fen)).toThrow()
  })

  it('keeps standard chess as it was', () => {
    const chess = new Chess('4k3/8/8/8/8/8/8/R4K1R w KQ - 0 1')
    expect(chess.isChess960()).toBe(false)
    expect(chess.fen()).toBe('4k3/8/8/8/8/8/8/R4K1R w - - 0 1')
    expect(() => chess.move({ from: 'f1', to: 'h1' })).toThrow()
  })

  it('keeps its rules across load, unless told otherwise', () => {
    const chess = new Chess(undefined, { chess960: true })
    chess.load('4k3/8/8/8/8/8/8/R4K1R w HA - 0 1')
    expect(chess.isChess960()).toBe(true)

    chess.load('4k3/8/8/8/8/8/8/R3K2R w KQ - 0 1', { chess960: false })
    expect(chess.isChess960()).toBe(false)
  })

  it('takes the outermost rook when castling rights are set by hand', () => {
    const chess = new Chess('4k3/8/8/8/8/8/8/R4K1R w - - 0 1', {
      chess960: true,
    })
    expect(chess.setCastlingRights('w', { k: true, q: true })).toBe(true)
    expect(chess.fen()).toBe('4k3/8/8/8/8/8/8/R4K1R w KQ - 0 1')
    expect(chess.moves()).toContain('O-O-O')
  })
})

describe('Chess960 PGN', () => {
  it('plays a game with a Chess960 Variant tag by Chess960 rules', () => {
    const chess = new Chess()
    chess.loadPgn(
      [
        '[Variant "Chess960"]',
        '[SetUp "1"]',
        '[FEN "4k3/8/8/8/8/8/8/1R3KR1 w GB - 0 1"]',
        '',
        '1. O-O *',
      ].join('\n'),
    )

    expect(chess.isChess960()).toBe(true)
    expect(chess.fen()).toBe('4k3/8/8/8/8/8/8/1R3RK1 b - - 1 1')
  })

  it('writes the Variant tag, so the game reads back', () => {
    const chess = new Chess('4k3/8/8/8/8/8/8/1R3KR1 w GB - 0 1', {
      chess960: true,
    })
    chess.move('O-O-O')

    const pgn = chess.pgn()
    expect(pgn).toContain('[Variant "Chess960"]')

    const again = new Chess()
    again.loadPgn(pgn)
    expect(again.fen()).toBe(chess.fen())
  })
})
