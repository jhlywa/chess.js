import { Chess } from '../src/chess'
import { describe, expect, it } from 'vitest'

describe('Suffix-Only Support', () => {
  it('captures multiple suffixes and comments', () => {
    const chess = new Chess()
    const pgn =
      '1. c4 {English Opening} ' +
      'e5!? {Aggressive} ' +
      '2. Nf3!! {Best Move} ' +
      'Nc6?? {Blunder} *'

    chess.loadPgn(pgn)

    const fen1 = 'rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq - 0 1'
    const fen2 = 'rnbqkbnr/pppp1ppp/8/4p3/2P5/8/PP1PPPPP/RNBQKBNR w KQkq - 0 2'
    const fen3 =
      'rnbqkbnr/pppp1ppp/8/4p3/2P5/5N2/PP1PPPPP/RNBQKB1R b KQkq - 1 2'
    const fen4 =
      'r1bqkbnr/pppp1ppp/2n5/4p3/2P5/5N2/PP1PPPPP/RNBQKB1R w KQkq - 2 3'

    expect(chess.fen()).toEqual(fen4)

    expect(chess.getComments()).toEqual([
      {
        fen: fen1,
        comment: 'English Opening',
        nags: [],
      },
      {
        fen: fen2,
        comment: 'Aggressive',
        suffixAnnotation: '!?',
        nags: [],
      },
      {
        fen: fen3,
        comment: 'Best Move',
        suffixAnnotation: '!!',
        nags: [],
      },
      {
        fen: fen4,
        comment: 'Blunder',
        suffixAnnotation: '??',
        nags: [],
      },
    ])
  })
})

describe('Chess getComments - First Approach (Suffix-Only Handling)', () => {
  it('should correctly handle comments, suffixes, and suffix-only cases from PGN loading', () => {
    const chess = new Chess()
    const pgn =
      '1. c4 {Comment for c4} e5!? {Comment and Suffix for e5} 2. Nf3!! Nc6 *'

    chess.loadPgn(pgn)

    const fenC4 = 'rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq - 0 1'
    const fenE5 = 'rnbqkbnr/pppp1ppp/8/4p3/2P5/8/PP1PPPPP/RNBQKBNR w KQkq - 0 2'
    const fenNf3 =
      'rnbqkbnr/pppp1ppp/8/4p3/2P5/5N2/PP1PPPPP/RNBQKB1R b KQkq - 1 2'
    const fenNc6 =
      'r1bqkbnr/pppp1ppp/2n5/4p3/2P5/5N2/PP1PPPPP/RNBQKB1R w KQkq - 2 3'

    expect(chess.fen()).toEqual(fenNc6)

    const commentsResult = chess.getComments()

    const expectedComments = [
      {
        fen: fenC4,
        comment: 'Comment for c4',
        nags: [],
      },
      {
        fen: fenE5,
        comment: 'Comment and Suffix for e5',
        suffixAnnotation: '!?',
        nags: [],
      },
      {
        fen: fenNf3,
        suffixAnnotation: '!!',
        nags: [],
      },
    ]

    expect(commentsResult).toEqual(expectedComments)
  })

  it('should handle manually set suffix-only with an empty comment string for the current FEN', () => {
    const chess = new Chess()
    chess.move('g3')
    const currentFen = chess.fen()

    chess.setSuffixAnnotation('?!')

    const commentsResult = chess.getComments()

    const entryForCurrentFen = commentsResult.find((c) => c.fen === currentFen)

    expect(entryForCurrentFen).toBeDefined()
    expect(entryForCurrentFen).toEqual({
      fen: currentFen,
      suffixAnnotation: '?!',
      nags: [],
    })
  })
})

describe('Manipulate Comments', () => {
  it('no comments', () => {
    const chess = new Chess()
    expect(chess.getComment()).toBeUndefined()
    expect(chess.getComments()).toEqual([])
    chess.move('e4')
    expect(chess.getComment()).toBeUndefined()
    expect(chess.getComments()).toEqual([])
    expect(chess.pgn().endsWith('1. e4 *')).toBe(true)
  })

  it('comment for initial position', () => {
    const chess = new Chess()
    chess.setComment('starting position')
    expect(chess.getComment()).toEqual('starting position')
    expect(chess.getComments()).toEqual([
      { fen: chess.fen(), comment: 'starting position', nags: [] },
    ])
    expect(chess.pgn().endsWith('{starting position} *')).toBe(true)
  })

  it('comment for first move', () => {
    const chess = new Chess()
    chess.move('e4')
    const e4 = chess.fen()
    chess.setComment('good move')
    expect(chess.getComment()).toEqual('good move')
    expect(chess.getComments()).toEqual([
      { fen: e4, comment: 'good move', nags: [] },
    ])
    chess.move('e5')
    expect(chess.getComment()).toBeUndefined()
    expect(chess.getComments()).toEqual([
      { fen: e4, comment: 'good move', nags: [] },
    ])
    expect(chess.pgn().endsWith('1. e4 {good move} e5 *')).toBe(true)
  })

  it('comment for last move', () => {
    const chess = new Chess()
    chess.move('e4')
    chess.move('e6')
    chess.setComment('dubious move')
    expect(chess.getComment()).toEqual('dubious move')
    expect(chess.getComments()).toEqual([
      { fen: chess.fen(), comment: 'dubious move', nags: [] },
    ])
    expect(chess.pgn().endsWith('1. e4 e6 {dubious move} *')).toBe(true)
  })

  it('comment with brackets', () => {
    const chess = new Chess()
    chess.setComment('{starting position}')
    expect(chess.getComment()).toEqual('[starting position]')
  })

  it('comments for everything', () => {
    const chess = new Chess()

    const initial = chess.fen()
    chess.setComment('starting position')
    expect(chess.getComment()).toEqual('starting position')
    expect(chess.getComments()).toEqual([
      { fen: initial, comment: 'starting position', nags: [] },
    ])
    expect(chess.pgn().endsWith('{starting position} *')).toBe(true)

    chess.move('e4')
    const e4 = chess.fen()
    chess.setComment('good move')
    expect(chess.getComment()).toEqual('good move')
    expect(chess.getComments()).toEqual([
      { fen: initial, comment: 'starting position', nags: [] },
      { fen: e4, comment: 'good move', nags: [] },
    ])
    expect(
      chess.pgn().endsWith('{starting position} 1. e4 {good move} *'),
    ).toBe(true)

    chess.move('e6')
    const e6 = chess.fen()
    chess.setComment('dubious move')
    expect(chess.getComment()).toEqual('dubious move')
    expect(chess.getComments()).toEqual([
      { fen: initial, comment: 'starting position', nags: [] },
      { fen: e4, comment: 'good move', nags: [] },
      { fen: e6, comment: 'dubious move', nags: [] },
    ])
    expect(
      chess
        .pgn()
        .endsWith('{starting position} 1. e4 {good move} e6 {dubious move} *'),
    ).toBe(true)
  })

  it('remove comments', () => {
    const chess = new Chess()
    expect(chess.removeComment()).toBeUndefined()
    expect(chess.removeComments()).toEqual([])
    const initial = chess.fen()
    chess.setComment('starting position')
    chess.move('e4')
    const e4 = chess.fen()
    chess.setComment('good move')
    chess.move('e6')
    const e6 = chess.fen()
    chess.setComment('dubious move')
    expect(chess.getComments()).toEqual([
      { fen: initial, comment: 'starting position', nags: [] },
      { fen: e4, comment: 'good move', nags: [] },
      { fen: e6, comment: 'dubious move', nags: [] },
    ])
    expect(chess.removeComment()).toEqual('dubious move')
    expect(
      chess.pgn().endsWith('{starting position} 1. e4 {good move} e6 *'),
    ).toBe(true)
    expect(chess.removeComment()).toBeUndefined()
    expect(chess.removeComments()).toEqual([
      { fen: initial, comment: 'starting position' },
      { fen: e4, comment: 'good move' },
    ])
    expect(chess.pgn().endsWith('1. e4 e6 *')).toBe(true)
  })

  it('prune comments', () => {
    const chess = new Chess()
    chess.move('e4')
    chess.setComment('tactical')
    chess.undo()
    chess.move('d4')
    chess.setComment('positional')
    expect(chess.getComments()).toEqual([
      { fen: chess.fen(), comment: 'positional', nags: [] },
    ])
    expect(chess.pgn().endsWith('1. d4 {positional} *')).toBe(true)
  })

  it('clear comments', () => {
    const test = (fn: (chess: Chess) => void) => {
      const chess = new Chess()
      chess.move('e4')
      chess.setComment('good move')
      expect(chess.getComments()).toEqual([
        { fen: chess.fen(), comment: 'good move', nags: [] },
      ])
      fn(chess)
      expect(chess.getComments()).toEqual([])
    }
    test((chess: Chess) => {
      chess.reset()
    })
    test((chess: Chess) => {
      chess.clear()
    })
    test((chess: Chess) => {
      chess.load(chess.fen())
    })
    test((chess: Chess) => {
      chess.loadPgn('1. e4')
    })
  })
})

describe('Format Comments', () => {
  it('wrap comments', () => {
    const chess = new Chess()
    chess.move('e4')
    chess.setComment('good   move')
    chess.move('e5')
    chess.setComment('classical response')
    expect(
      chess.pgn().endsWith('1. e4 {good   move} e5 {classical response} *'),
    ).toBe(true)
    expect(
      chess
        .pgn({ maxWidth: 16 })
        .endsWith(
          ['1. e4 {good', 'move} e5', '{classical', 'response} *'].join('\n'),
        ),
    ).toBe(true)
    expect(
      chess
        .pgn({ maxWidth: 2 })
        .endsWith(
          [
            '1.',
            'e4',
            '{good',
            'move}',
            'e5',
            '{classical',
            'response}',
            '*',
          ].join('\n'),
        ),
    ).toBe(true)
  })
})

describe('Load Comments', () => {
  const tests = [
    {
      name: 'bracket comments',
      input: '1. e4 {good move} e5 {classical response}',
      output: '1. e4 {good move} e5 {classical response}',
    },
    {
      name: 'semicolon comments',
      input: '1. e4 e5; romantic era\n 2. Nf3 Nc6; common continuation',
      output: '1. e4 e5 {romantic era} 2. Nf3 Nc6 {common continuation}',
    },
    {
      name: 'bracket and semicolon comments',
      input: '1. e4 {good!} e5; standard response\n 2. Nf3 Nc6 {common}',
      output: '1. e4 {good!} e5 {standard response} 2. Nf3 Nc6 {common}',
    },
    {
      name: 'bracket comments with newlines',
      input: '1. e4 {good\nmove} e5 {classical\nresponse}',
      output: '1. e4 {good move} e5 {classical response}',
    },
    {
      name: 'initial comment',
      input: '{ great game }\n1. e4 e5',
      output: '{ great game } 1. e4 e5',
    },
    {
      name: 'initial comment with black starting first',
      input:
        '[SetUp "1"]\n[FEN "rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq - 0 1"]\n\n{ great game } 1. ... Nc6',
      output:
        '[SetUp "1"]\n[FEN "rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq - 0 1"]\n\n{ great game } 1. ... Nc6',
    },
    {
      name: 'empty bracket comment',
      input: '1. e4 {}',
      output: '1. e4 {}',
    },
    {
      name: 'empty semicolon comment',
      input: '1. e4;\ne5',
      output: '1. e4 {} e5',
    },
    {
      name: 'unicode comment',
      input: '1. e4 {Δ, Й, ק ,م, ๗, あ, 叶, 葉, and 말}',
      output: '1. e4 {Δ, Й, ק ,م, ๗, あ, 叶, 葉, and 말}',
    },
    {
      name: 'semicolon in bracket comment',
      input: '1. e4 { a classic; well-studied } e5',
      output: '1. e4 { a classic; well-studied } e5',
    },
    {
      name: 'bracket in semicolon comment',
      input: '1. e4 e5 ; a classic {well-studied}',
      output: '1. e4 e5 {a classic {well-studied}}',
    },
    {
      name: 'markers in bracket comment',
      input: '1. e4 e5 {($1) 1. e4 is good}',
      output: '1. e4 e5 {($1) 1. e4 is good}',
    },
    {
      name: 'markers in semicolon comment',
      input: '1. e4 e5; ($1) 1. e4 is good',
      output: '1. e4 e5 {($1) 1. e4 is good}',
    },
    {
      name: 'comment before black to move',
      input: `
[SetUp "1"]
[FEN "r4rk1/p1nq1pp1/1p1pp2p/8/P2PR3/1QP2N2/1P3PPP/R5K1 b - - 0 16"]

{test comment} 16...Rfb8`,
      output: `[SetUp "1"]
[FEN "r4rk1/p1nq1pp1/1p1pp2p/8/P2PR3/1QP2N2/1P3PPP/R5K1 b - - 0 16"]

{test comment} 16. ... Rfb8`,
    },
  ]

  tests.forEach((test) => {
    it(`load ${test.name}`, () => {
      const chess = new Chess()
      chess.loadPgn(test.input)
      expect(chess.pgn().endsWith(test.output + ' *')).toBe(true)
    })
  })
})
