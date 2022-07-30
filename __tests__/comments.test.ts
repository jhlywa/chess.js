import { Chess } from '../src/chess'

describe('Manipulate Comments', () => {
  it('no comments', () => {
    const chess = new Chess()
    expect(chess.getComment()).toBeUndefined()
    expect(chess.getComments()).toEqual([])
    chess.move('e4')
    expect(chess.getComment()).toBeUndefined()
    expect(chess.getComments()).toEqual([])
    expect(chess.pgn()).toEqual('1. e4')
  })

  it('comment for initial position', () => {
    const chess = new Chess()
    chess.setComment('starting position')
    expect(chess.getComment()).toEqual('starting position')
    expect(chess.getComments()).toEqual([
      { fen: chess.fen(), comment: 'starting position' },
    ])
    expect(chess.pgn()).toEqual('{starting position}')
  })

  it('comment for first move', () => {
    const chess = new Chess()
    chess.move('e4')
    const e4 = chess.fen()
    chess.setComment('good move')
    expect(chess.getComment()).toEqual('good move')
    expect(chess.getComments()).toEqual([{ fen: e4, comment: 'good move' }])
    chess.move('e5')
    expect(chess.getComment()).toBeUndefined()
    expect(chess.getComments()).toEqual([{ fen: e4, comment: 'good move' }])
    expect(chess.pgn()).toEqual('1. e4 {good move} e5')
  })

  it('comment for last move', () => {
    const chess = new Chess()
    chess.move('e4')
    chess.move('e6')
    chess.setComment('dubious move')
    expect(chess.getComment()).toEqual('dubious move')
    expect(chess.getComments()).toEqual([
      { fen: chess.fen(), comment: 'dubious move' },
    ])
    expect(chess.pgn()).toEqual('1. e4 e6 {dubious move}')
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
      { fen: initial, comment: 'starting position' },
    ])
    expect(chess.pgn()).toEqual('{starting position}')

    chess.move('e4')
    const e4 = chess.fen()
    chess.setComment('good move')
    expect(chess.getComment()).toEqual('good move')
    expect(chess.getComments()).toEqual([
      { fen: initial, comment: 'starting position' },
      { fen: e4, comment: 'good move' },
    ])
    expect(chess.pgn()).toEqual('{starting position} 1. e4 {good move}')

    chess.move('e6')
    const e6 = chess.fen()
    chess.setComment('dubious move')
    expect(chess.getComment()).toEqual('dubious move')
    expect(chess.getComments()).toEqual([
      { fen: initial, comment: 'starting position' },
      { fen: e4, comment: 'good move' },
      { fen: e6, comment: 'dubious move' },
    ])
    expect(chess.pgn()).toEqual(
      '{starting position} 1. e4 {good move} e6 {dubious move}'
    )
  })

  it('delete comments', () => {
    const chess = new Chess()
    expect(chess.deleteComment()).toBeUndefined()
    expect(chess.deleteComments()).toEqual([])
    const initial = chess.fen()
    chess.setComment('starting position')
    chess.move('e4')
    const e4 = chess.fen()
    chess.setComment('good move')
    chess.move('e6')
    const e6 = chess.fen()
    chess.setComment('dubious move')
    expect(chess.getComments()).toEqual([
      { fen: initial, comment: 'starting position' },
      { fen: e4, comment: 'good move' },
      { fen: e6, comment: 'dubious move' },
    ])
    expect(chess.deleteComment()).toEqual('dubious move')
    expect(chess.pgn()).toEqual('{starting position} 1. e4 {good move} e6')
    expect(chess.deleteComment()).toBeUndefined()
    expect(chess.deleteComments()).toEqual([
      { fen: initial, comment: 'starting position' },
      { fen: e4, comment: 'good move' },
    ])
    expect(chess.pgn()).toEqual('1. e4 e6')
  })

  it('prune comments', () => {
    const chess = new Chess()
    chess.move('e4')
    chess.setComment('tactical')
    chess.undo()
    chess.move('d4')
    chess.setComment('positional')
    expect(chess.getComments()).toEqual([
      { fen: chess.fen(), comment: 'positional' },
    ])
    expect(chess.pgn()).toEqual('1. d4 {positional}')
  })

  it('clear comments', () => {
    const test = (fn: (chess: Chess) => void) => {
      const chess = new Chess()
      chess.move('e4')
      chess.setComment('good move')
      expect(chess.getComments()).toEqual([
        { fen: chess.fen(), comment: 'good move' },
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
    expect(chess.pgn()).toEqual('1. e4 {good   move} e5 {classical response}')
    expect(chess.pgn({ maxWidth: 16 })).toEqual(
      ['1. e4 {good', 'move} e5', '{classical', 'response}'].join('\n')
    )
    expect(chess.pgn({ maxWidth: 2 })).toEqual(
      ['1.', 'e4', '{good', 'move}', 'e5', '{classical', 'response}'].join('\n')
    )
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
      expect(chess.pgn()).toEqual(test.output)
    })
  })
})
