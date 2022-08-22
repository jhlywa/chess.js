import { Chess } from '../src/chess'

const emptyBoard = "8/8/8/8/8/8/8/8 w - - 0 1"
const mateFen = "rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3"
const endGameFen = "8/8/8/8/3r4/8/3P4/3K1k2 w - - 0 1"
const movesArray = ["d3", "Kc2", "Kc1"]
const drawFen = "7k/8/8/8/8/8/8/K7 w - - 0 1"

const obj = {
  "_board": [
      {
          "type": "r",
          "color": "b"
      },
      {
          "type": "n",
          "color": "b"
      },
      {
          "type": "b",
          "color": "b"
      },
      {
          "type": "q",
          "color": "b"
      },
      {
          "type": "k",
          "color": "b"
      },
      {
          "type": "b",
          "color": "b"
      },
      {
          "type": "n",
          "color": "b"
      },
      {
          "type": "r",
          "color": "b"
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      {
          "type": "p",
          "color": "b"
      },
      {
          "type": "p",
          "color": "b"
      },
      {
          "type": "p",
          "color": "b"
      },
      {
          "type": "p",
          "color": "b"
      },
      {
          "type": "p",
          "color": "b"
      },
      {
          "type": "p",
          "color": "b"
      },
      {
          "type": "p",
          "color": "b"
      },
      {
          "type": "p",
          "color": "b"
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      {
          "type": "p",
          "color": "w"
      },
      {
          "type": "p",
          "color": "w"
      },
      {
          "type": "p",
          "color": "w"
      },
      {
          "type": "p",
          "color": "w"
      },
      {
          "type": "p",
          "color": "w"
      },
      {
          "type": "p",
          "color": "w"
      },
      {
          "type": "p",
          "color": "w"
      },
      {
          "type": "p",
          "color": "w"
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      {
          "type": "r",
          "color": "w"
      },
      {
          "type": "n",
          "color": "w"
      },
      {
          "type": "b",
          "color": "w"
      },
      {
          "type": "q",
          "color": "w"
      },
      {
          "type": "k",
          "color": "w"
      },
      {
          "type": "b",
          "color": "w"
      },
      {
          "type": "n",
          "color": "w"
      },
      {
          "type": "r",
          "color": "w"
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
  ],
  "_turn": "w",
  "_header": {},
  "_kings": {
      "w": 116,
      "b": 4
  },
  "_epSquare": -1,
  "_halfMoves": 0,
  "_moveNumber": 1,
  "_history": [],
  "_comments": {},
  "_castling": {
      "w": 96,
      "b": 96
  }
}

describe("Chess", () => {
  const board = new Chess();
  const newBoard = new Chess(obj);
  it("FEN",()=> {
    expect(typeof newBoard.fen).toBe("function");
    expect(newBoard.fen()).toBe(board.fen());
  });

  it("PGN",()=> {
    expect(typeof newBoard.pgn).toBe("function");
    expect(newBoard.pgn()).toBe(board.pgn());
  });

  it("move",()=> {
    expect(typeof newBoard.move).toBe("function");
    expect(newBoard.move('f3')).toStrictEqual(board.move('f3'));
    expect(newBoard.fen()).toBe(board.fen());
  });

  it("isCheck isMate",()=> {
    expect(typeof newBoard.isCheck).toBe("function");
    expect(typeof newBoard.isCheckmate).toBe("function");
    expect(newBoard.move('e5')).toStrictEqual(board.move('e5'));
    expect(newBoard.move('g4')).toStrictEqual(board.move('g4'));
    expect(newBoard.isCheck()).toBeFalsy();
    expect(newBoard.isCheckmate()).toBeFalsy();
    expect(newBoard.move('Qh4')).toStrictEqual(board.move('Qh4'));
    expect(newBoard.isCheck()).toBeTruthy();
    expect(newBoard.isCheckmate()).toBeTruthy();
    expect(newBoard.fen()).toBe(board.fen());
  });

  it("clear",()=> {
    expect(typeof newBoard.clear).toBe("function");
    expect(newBoard.clear()).toBe(board.clear());
    expect(newBoard.fen()).toStrictEqual(emptyBoard);
  });

  it("load",()=> {
    expect(typeof newBoard.load).toBe("function");
    newBoard.load(mateFen);
    expect(newBoard.isCheckmate()).toBeTruthy();
    expect(newBoard.fen()).toStrictEqual(mateFen);
  });
  
  it("moves", ()=> {
    expect(typeof newBoard.moves).toBe("function");
    newBoard.load(endGameFen);
    expect(newBoard.moves()).toStrictEqual(movesArray);
  });

  it("draw", ()=> {
    expect(typeof newBoard.isDraw).toBe("function");
    newBoard.load(drawFen)
    expect(newBoard.isDraw()).toBeTruthy();
  });

});
