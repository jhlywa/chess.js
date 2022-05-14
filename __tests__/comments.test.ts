import { Chess } from '../src/chess'

describe('Manipulate Comments', () => {
  it('no comments', () => {
    const chess = new Chess()
    expect(chess.get_comment()).toBeUndefined()
    expect(chess.get_comments()).toEqual([])
    chess.move('e4')
    expect(chess.get_comment()).toBeUndefined()
    expect(chess.get_comments()).toEqual([])
    expect(chess.pgn()).toEqual('1. e4')
  })

  it('comment for initial position', () => {
    const chess = new Chess()
    chess.set_comment('starting position')
    expect(chess.get_comment()).toEqual('starting position')
    expect(chess.get_comments()).toEqual([
      { fen: chess.fen(), comment: 'starting position' },
    ])
    expect(chess.pgn()).toEqual('{starting position}')
  })

  it('comment for first move', () => {
    const chess = new Chess()
    chess.move('e4')
    const e4 = chess.fen()
    chess.set_comment('good move')
    expect(chess.get_comment()).toEqual('good move')
    expect(chess.get_comments()).toEqual([{ fen: e4, comment: 'good move' }])
    chess.move('e5')
    expect(chess.get_comment()).toBeUndefined()
    expect(chess.get_comments()).toEqual([{ fen: e4, comment: 'good move' }])
    expect(chess.pgn()).toEqual('1. e4 {good move} e5')
  })

  it('comment for last move', () => {
    const chess = new Chess()
    chess.move('e4')
    chess.move('e6')
    chess.set_comment('dubious move')
    expect(chess.get_comment()).toEqual('dubious move')
    expect(chess.get_comments()).toEqual([
      { fen: chess.fen(), comment: 'dubious move' },
    ])
    expect(chess.pgn()).toEqual('1. e4 e6 {dubious move}')
  })

  it('comment with brackets', () => {
    const chess = new Chess()
    chess.set_comment('{starting position}')
    expect(chess.get_comment()).toEqual('[starting position]')
  })

  it('comments for everything', () => {
    const chess = new Chess()

    const initial = chess.fen()
    chess.set_comment('starting position')
    expect(chess.get_comment()).toEqual('starting position')
    expect(chess.get_comments()).toEqual([
      { fen: initial, comment: 'starting position' },
    ])
    expect(chess.pgn()).toEqual('{starting position}')

    chess.move('e4')
    const e4 = chess.fen()
    chess.set_comment('good move')
    expect(chess.get_comment()).toEqual('good move')
    expect(chess.get_comments()).toEqual([
      { fen: initial, comment: 'starting position' },
      { fen: e4, comment: 'good move' },
    ])
    expect(chess.pgn()).toEqual('{starting position} 1. e4 {good move}')

    chess.move('e6')
    const e6 = chess.fen()
    chess.set_comment('dubious move')
    expect(chess.get_comment()).toEqual('dubious move')
    expect(chess.get_comments()).toEqual([
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
    expect(chess.delete_comment()).toBeUndefined()
    expect(chess.delete_comments()).toEqual([])
    const initial = chess.fen()
    chess.set_comment('starting position')
    chess.move('e4')
    const e4 = chess.fen()
    chess.set_comment('good move')
    chess.move('e6')
    const e6 = chess.fen()
    chess.set_comment('dubious move')
    expect(chess.get_comments()).toEqual([
      { fen: initial, comment: 'starting position' },
      { fen: e4, comment: 'good move' },
      { fen: e6, comment: 'dubious move' },
    ])
    expect(chess.delete_comment()).toEqual('dubious move')
    expect(chess.pgn()).toEqual('{starting position} 1. e4 {good move} e6')
    expect(chess.delete_comment()).toBeUndefined()
    expect(chess.delete_comments()).toEqual([
      { fen: initial, comment: 'starting position' },
      { fen: e4, comment: 'good move' },
    ])
    expect(chess.pgn()).toEqual('1. e4 e6')
  })

  it('prune comments', () => {
    const chess = new Chess()
    chess.move('e4')
    chess.set_comment('tactical')
    chess.undo()
    chess.move('d4')
    chess.set_comment('positional')
    expect(chess.get_comments()).toEqual([
      { fen: chess.fen(), comment: 'positional' },
    ])
    expect(chess.pgn()).toEqual('1. d4 {positional}')
  })

  it('clear comments', () => {
    const test = (fn: (chess: Chess) => void) => {
      const chess = new Chess()
      chess.move('e4')
      chess.set_comment('good move')
      expect(chess.get_comments()).toEqual([
        { fen: chess.fen(), comment: 'good move' },
      ])
      fn(chess)
      expect(chess.get_comments()).toEqual([])
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
      chess.load_pgn('1. e4')
    })
  })
})

describe('Format Comments', () => {
  it('wrap comments', () => {
    const chess = new Chess()
    chess.move('e4')
    chess.set_comment('good   move')
    chess.move('e5')
    chess.set_comment('classical response')
    expect(chess.pgn()).toEqual('1. e4 {good   move} e5 {classical response}')
    expect(chess.pgn({ max_width: 16 })).toEqual(
      ['1. e4 {good', 'move} e5', '{classical', 'response}'].join('\n')
    )
    expect(chess.pgn({ max_width: 2 })).toEqual(
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
  ]

  tests.forEach((test) => {
    it(`load ${test.name}`, () => {
      const chess = new Chess()
      chess.load_pgn(test.input)
      expect(chess.pgn()).toEqual(test.output)
    })
  })
})
