/***************************************************************************
 * PUBLIC API
 **************************************************************************/
'use strict';

function api(chessObj) {
  this.chess = chessObj;
}

api.prototype = {
  WHITE: WHITE,
  BLACK: BLACK,
  PAWN: PAWN,
  KNIGHT: KNIGHT,
  BISHOP: BISHOP,
  ROOK: ROOK,
  QUEEN: QUEEN,
  KING: KING,
  SQUARES: ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
            'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
            'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
            'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
            'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
            'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
            'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
            'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'],

  FLAGS: FLAGS,

  load: function(fen) {
    this.chess.load(fen);
  },

  reset: function() {
    return this.chess.reset();
  },

  moves: function(options) {
    return this.chess.moves(options);
  },

  inCheck: function() {
    return this.chess.inCheck();
  },

  inCheckmate: function() {
    return this.chess.inCheckmate();
  },

  inStalemate: function() {
    return this.chess.inStalemate();
  },

  inDraw: function() {
    return this.chess.halfMoves >= 100 ||
      this.chess.inStalemate() ||
      this.chess.insufficientMaterial() ||
      this.chess.inThreefoldRepetition();
  },

  insufficientMaterial: function() {
    return this.chess.insufficientMaterial();
  },

  inThreefoldRepetition: function() {
    return this.chess.inThreefoldRepetition();
  },

  gameOver: function() {
    return this.chess.halfMoves >= 100 ||
      this.chess.inCheckmate() ||
      this.chess.inStalemate() ||
             this.chess.insufficientMaterial() ||
      this.chess.inThreefoldRepetition();
  },

  validateFen: function(fen) {
    return this.chess.validateFen(fen);
  },

  fen: function() {
    return this.chess.generateFen();
  },

  pgn: function(options) {
    return this.chess.pgn(options);
  },

  /* convert a move from Standard Algebraic Notation (SAN) to 0x88
   * coordinates
   */
  moveFromSan: function(move) {
    return this.chess.moveFromSan(move);
  },

  loadPgn: function(pgn, options) {
    return this.chess.loadPgn(pgn, options);
  },

  header: function(args) {
    return this.chess.setHeader(args);
  },

  ascii: function() {
    return this.chess.ascii();
  },

  turn: function() {
    return this.chess.turn;
  },

  move: function(move) {
    return this.chess.move(move);
  },

  undo: function() {
    var move = this.chess.undoMove();
    return (move) ? this.chess.makePretty(move) : null;
  },

  clear: function() {
    return this.chess.clear();
  },

  put: function(piece, square) {
    return this.chess.put(piece, square);
  },

  get: function(square) {
    return this.chess.get(square);
  },

  remove: function(square) {
    return this.chess.remove(square);
  },

  perft: function(depth) {
    return this.chess.perft(depth);
  },

  squareColor: function(square) {
    if (square in this.chess.SQUARES) {
      var sq0x88 = this.chess.SQUARES[square];
      return ((this.chess.rank(sq0x88) + this.chess.file(sq0x88)) % 2 === 0) ? 'light' : 'dark';
    }

    return null;
  },

  history: function(options) {
    var reversedHistory = [];
    var moveHistory = [];
    var verbose = (typeof options !== 'undefined' && 'verbose' in options &&
                   options.verbose);

    while (this.chess.history.length > 0) {
      reversedHistory.push(this.chess.undoMove());
    }

    while (reversedHistory.length > 0) {
      var move = reversedHistory.pop();
      if (verbose) {
        moveHistory.push(this.chess.makePretty(move));
      } else {
        moveHistory.push(this.chess.moveToSan(move));
      }
      this.chess.makeMove(move);
    }

    return moveHistory;
  }
};

module.exports = api;

