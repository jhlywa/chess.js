/*
 * Copyright (c) 2018, Jeff Hlywa (jhlywa@gmail.com)
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 *----------------------------------------------------------------------------*/

/* minified license below  */

/* @license
 * Copyright (c) 2018, Jeff Hlywa (jhlywa@gmail.com)
 * Released under the BSD license
 * https://github.com/jhlywa/chess.js/blob/master/LICENSE
 */

var Chess = function(fen) {
  var BLACK = 'b';
  var WHITE = 'w';

  var EMPTY = -1;

  var PAWN = 'p';
  var KNIGHT = 'n';
  var BISHOP = 'b';
  var ROOK = 'r';
  var QUEEN = 'q';
  var KING = 'k';

  var SYMBOLS = 'pnbrqkPNBRQK';

  var DEFAULT_POSITION =
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  var POSSIBLE_RESULTS = ['1-0', '0-1', '1/2-1/2', '*'];

  var PAWN_OFFSETS = {
    b: [16, 32, 17, 15],
    w: [-16, -32, -17, -15]
  };

  var PIECE_OFFSETS = {
    n: [-18, -33, -31, -14, 18, 33, 31, 14],
    b: [-17, -15, 17, 15],
    r: [-16, 1, 16, -1],
    q: [-17, -16, -15, 1, 17, 16, 15, -1],
    k: [-17, -16, -15, 1, 17, 16, 15, -1]
  };

  // prettier-ignore
  var ATTACKS = [
    20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20, 0,
     0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
     0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
     0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
     0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
    24,24,24,24,24,24,56,  0, 56,24,24,24,24,24,24, 0,
     0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
     0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
     0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
     0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
    20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20
  ];

  // prettier-ignore
  var RAYS = [
     17,  0,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0,  0, 15, 0,
      0, 17,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0, 15,  0, 0,
      0,  0, 17,  0,  0,  0,  0, 16,  0,  0,  0,  0, 15,  0,  0, 0,
      0,  0,  0, 17,  0,  0,  0, 16,  0,  0,  0, 15,  0,  0,  0, 0,
      0,  0,  0,  0, 17,  0,  0, 16,  0,  0, 15,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0, 17,  0, 16,  0, 15,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0,  0, 17, 16, 15,  0,  0,  0,  0,  0,  0, 0,
      1,  1,  1,  1,  1,  1,  1,  0, -1, -1,  -1,-1, -1, -1, -1, 0,
      0,  0,  0,  0,  0,  0,-15,-16,-17,  0,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0,-15,  0,-16,  0,-17,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,-15,  0,  0,-16,  0,  0,-17,  0,  0,  0,  0, 0,
      0,  0,  0,-15,  0,  0,  0,-16,  0,  0,  0,-17,  0,  0,  0, 0,
      0,  0,-15,  0,  0,  0,  0,-16,  0,  0,  0,  0,-17,  0,  0, 0,
      0,-15,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,-17,  0, 0,
    -15,  0,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,  0,-17
  ];

  var SHIFTS = { p: 0, n: 1, b: 2, r: 3, q: 4, k: 5 };

  var FLAGS = {
    NORMAL: 'n',
    CAPTURE: 'c',
    BIG_PAWN: 'b',
    EP_CAPTURE: 'e',
    PROMOTION: 'p',
    KSIDE_CASTLE: 'k',
    QSIDE_CASTLE: 'q'
  };

  var BITS = {
    NORMAL: 1,
    CAPTURE: 2,
    BIG_PAWN: 4,
    EP_CAPTURE: 8,
    PROMOTION: 16,
    KSIDE_CASTLE: 32,
    QSIDE_CASTLE: 64
  };

  var RANK_1 = 7;
  var RANK_2 = 6;
  var RANK_3 = 5;
  var RANK_4 = 4;
  var RANK_5 = 3;
  var RANK_6 = 2;
  var RANK_7 = 1;
  var RANK_8 = 0;

  // prettier-ignore
  var SQUARES = {
    a8:   0, b8:   1, c8:   2, d8:   3, e8:   4, f8:   5, g8:   6, h8:   7,
    a7:  16, b7:  17, c7:  18, d7:  19, e7:  20, f7:  21, g7:  22, h7:  23,
    a6:  32, b6:  33, c6:  34, d6:  35, e6:  36, f6:  37, g6:  38, h6:  39,
    a5:  48, b5:  49, c5:  50, d5:  51, e5:  52, f5:  53, g5:  54, h5:  55,
    a4:  64, b4:  65, c4:  66, d4:  67, e4:  68, f4:  69, g4:  70, h4:  71,
    a3:  80, b3:  81, c3:  82, d3:  83, e3:  84, f3:  85, g3:  86, h3:  87,
    a2:  96, b2:  97, c2:  98, d2:  99, e2: 100, f2: 101, g2: 102, h2: 103,
    a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119
  };

  var ROOKS = {
    w: [
      { square: SQUARES.a1, flag: BITS.QSIDE_CASTLE },
      { square: SQUARES.h1, flag: BITS.KSIDE_CASTLE }
    ],
    b: [
      { square: SQUARES.a8, flag: BITS.QSIDE_CASTLE },
      { square: SQUARES.h8, flag: BITS.KSIDE_CASTLE }
    ]
  };

  var board = new Array(128);
  var kings = { w: EMPTY, b: EMPTY };
  var turn = WHITE;
  var castling = { w: 0, b: 0 };
  var epSquare = EMPTY;
  var halfMoves = 0;
  var moveNumber = 1;
  var history = [];
  var header = {};

  /* if the user passes in a fen string, load it, else default to
   * starting position
   */
  if (typeof fen === 'undefined') {
    load(DEFAULT_POSITION);
  } else {
    load(fen);
  }

  function clear(keepHeaders) {
    if (typeof keepHeaders === 'undefined') {
      keepHeaders = false;
    }

    board = new Array(128);
    kings = { w: EMPTY, b: EMPTY };
    turn = WHITE;
    castling = { w: 0, b: 0 };
    epSquare = EMPTY;
    halfMoves = 0;
    moveNumber = 1;
    history = [];
    if (!keepHeaders) header = {};
    updateSetup(generateFen());
  }

  function reset() {
    load(DEFAULT_POSITION);
  }

  function load(fen, keepHeaders) {
    if (typeof keepHeaders === 'undefined') {
      keepHeaders = false;
    }

    var tokens = fen.split(/\s+/);
    var position = tokens[0];
    var square = 0;

    if (!validateFen(fen).valid) {
      return false;
    }

    clear(keepHeaders);

    for (var i = 0; i < position.length; i++) {
      var piece = position.charAt(i);

      if (piece === '/') {
        square += 8;
      } else if (isDigit(piece)) {
        square += parseInt(piece, 10);
      } else {
        var color = piece < 'a' ? WHITE : BLACK;
        put({ type: piece.toLowerCase(), color: color }, algebraic(square));
        square++;
      }
    }

    turn = tokens[1];

    if (tokens[2].indexOf('K') > -1) {
      castling.w |= BITS.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf('Q') > -1) {
      castling.w |= BITS.QSIDE_CASTLE;
    }
    if (tokens[2].indexOf('k') > -1) {
      castling.b |= BITS.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf('q') > -1) {
      castling.b |= BITS.QSIDE_CASTLE;
    }

    epSquare = tokens[3] === '-' ? EMPTY : SQUARES[tokens[3]];
    halfMoves = parseInt(tokens[4], 10);
    moveNumber = parseInt(tokens[5], 10);

    updateSetup(generateFen());

    return true;
  }

  /* TODO: this function is pretty much crap - it validates structure but
   * completely ignores content (e.g. doesn't verify that each side has a king)
   * ... we should rewrite this, and ditch the silly errorNumber field while
   * we're at it
   */
  function validateFen(fen) {
    var errors = {
      0: 'No errors.',
      1: 'FEN string must contain six space-delimited fields.',
      2: '6th field (move number) must be a positive integer.',
      3: '5th field (half move counter) must be a non-negative integer.',
      4: '4th field (en-passant square) is invalid.',
      5: '3rd field (castling availability) is invalid.',
      6: '2nd field (side to move) is invalid.',
      7: "1st field (piece positions) does not contain 8 '/'-delimited rows.",
      8: '1st field (piece positions) is invalid [consecutive numbers].',
      9: '1st field (piece positions) is invalid [invalid piece].',
      10: '1st field (piece positions) is invalid [row too large].',
      11: 'Illegal en-passant square'
    };

    /* 1st criterion: 6 space-seperated fields? */
    var tokens = fen.split(/\s+/);
    if (tokens.length !== 6) {
      return { valid: false, errorNumber: 1, error: errors[1] };
    }

    /* 2nd criterion: move number field is a integer value > 0? */
    if (isNaN(tokens[5]) || parseInt(tokens[5], 10) <= 0) {
      return { valid: false, errorNumber: 2, error: errors[2] };
    }

    /* 3rd criterion: half move counter is an integer >= 0? */
    if (isNaN(tokens[4]) || parseInt(tokens[4], 10) < 0) {
      return { valid: false, errorNumber: 3, error: errors[3] };
    }

    /* 4th criterion: 4th field is a valid e.p.-string? */
    if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
      return { valid: false, errorNumber: 4, error: errors[4] };
    }

    /* 5th criterion: 3th field is a valid castle-string? */
    if (!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(tokens[2])) {
      return { valid: false, errorNumber: 5, error: errors[5] };
    }

    /* 6th criterion: 2nd field is "w" (white) or "b" (black)? */
    if (!/^(w|b)$/.test(tokens[1])) {
      return { valid: false, errorNumber: 6, error: errors[6] };
    }

    /* 7th criterion: 1st field contains 8 rows? */
    var rows = tokens[0].split('/');
    if (rows.length !== 8) {
      return { valid: false, errorNumber: 7, error: errors[7] };
    }

    /* 8th criterion: every row is valid? */
    for (var i = 0; i < rows.length; i++) {
      /* check for right sum of fields AND not two numbers in succession */
      var sumFields = 0;
      var previousWasNumber = false;

      for (var k = 0; k < rows[i].length; k++) {
        if (!isNaN(rows[i][k])) {
          if (previousWasNumber) {
            return { valid: false, errorNumber: 8, error: errors[8] };
          }
          sumFields += parseInt(rows[i][k], 10);
          previousWasNumber = true;
        } else {
          if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
            return { valid: false, errorNumber: 9, error: errors[9] };
          }
          sumFields += 1;
          previousWasNumber = false;
        }
      }
      if (sumFields !== 8) {
        return { valid: false, errorNumber: 10, error: errors[10] };
      }
    }

    if (
      (tokens[3][1] == '3' && tokens[1] == 'w') ||
      (tokens[3][1] == '6' && tokens[1] == 'b')
    ) {
      return { valid: false, errorNumber: 11, error: errors[11] };
    }

    /* everything's okay! */
    return { valid: true, errorNumber: 0, error: errors[0] };
  }

  function generateFen() {
    var empty = 0;
    var fen = '';

    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      if (board[i] == null) {
        empty++;
      } else {
        if (empty > 0) {
          fen += empty;
          empty = 0;
        }
        var color = board[i].color;
        var piece = board[i].type;

        fen += color === WHITE ? piece.toUpperCase() : piece.toLowerCase();
      }

      if ((i + 1) & 0x88) {
        if (empty > 0) {
          fen += empty;
        }

        if (i !== SQUARES.h1) {
          fen += '/';
        }

        empty = 0;
        i += 8;
      }
    }

    var cflags = '';
    if (castling[WHITE] & BITS.KSIDE_CASTLE) {
      cflags += 'K';
    }
    if (castling[WHITE] & BITS.QSIDE_CASTLE) {
      cflags += 'Q';
    }
    if (castling[BLACK] & BITS.KSIDE_CASTLE) {
      cflags += 'k';
    }
    if (castling[BLACK] & BITS.QSIDE_CASTLE) {
      cflags += 'q';
    }

    /* do we have an empty castling flag? */
    cflags = cflags || '-';
    var epflags = epSquare === EMPTY ? '-' : algebraic(epSquare);

    return [fen, turn, cflags, epflags, halfMoves, moveNumber].join(' ');
  }

  function setHeader(args) {
    for (var i = 0; i < args.length; i += 2) {
      if (typeof args[i] === 'string' && typeof args[i + 1] === 'string') {
        header[args[i]] = args[i + 1];
      }
    }
    return header;
  }

  /* called when the initial board setup is changed with put() or remove().
   * modifies the SetUp and FEN properties of the header object.  if the FEN is
   * equal to the default position, the SetUp and FEN are deleted
   * the setup is only updated if history.length is zero, ie moves haven't been
   * made.
   */
  function updateSetup(fen) {
    if (history.length > 0) return;

    if (fen !== DEFAULT_POSITION) {
      header['SetUp'] = '1';
      header['FEN'] = fen;
    } else {
      delete header['SetUp'];
      delete header['FEN'];
    }
  }

  function get(square) {
    var piece = board[SQUARES[square]];
    return piece ? { type: piece.type, color: piece.color } : null;
  }

  function put(piece, square) {
    /* check for valid piece object */
    if (!('type' in piece && 'color' in piece)) {
      return false;
    }

    /* check for piece */
    if (SYMBOLS.indexOf(piece.type.toLowerCase()) === -1) {
      return false;
    }

    /* check for valid square */
    if (!(square in SQUARES)) {
      return false;
    }

    var sq = SQUARES[square];

    /* don't let the user place more than one king */
    if (
      piece.type == KING &&
      !(kings[piece.color] == EMPTY || kings[piece.color] == sq)
    ) {
      return false;
    }

    board[sq] = { type: piece.type, color: piece.color };
    if (piece.type === KING) {
      kings[piece.color] = sq;
    }

    updateSetup(generateFen());

    return true;
  }

  function remove(square) {
    var piece = get(square);
    board[SQUARES[square]] = null;
    if (piece && piece.type === KING) {
      kings[piece.color] = EMPTY;
    }

    updateSetup(generateFen());

    return piece;
  }

  function buildMove(board, from, to, flags, promotion) {
    var move = {
      color: turn,
      from: from,
      to: to,
      flags: flags,
      piece: board[from].type
    };

    if (promotion) {
      move.flags |= BITS.PROMOTION;
      move.promotion = promotion;
    }

    if (board[to]) {
      move.captured = board[to].type;
    } else if (flags & BITS.EP_CAPTURE) {
      move.captured = PAWN;
    }
    return move;
  }

  function generateMoves(options) {
    function addMove(board, moves, from, to, flags) {
      /* if pawn promotion */
      if (
        board[from].type === PAWN &&
        (rank(to) === RANK_8 || rank(to) === RANK_1)
      ) {
        var pieces = [QUEEN, ROOK, BISHOP, KNIGHT];
        for (var i = 0, len = pieces.length; i < len; i++) {
          moves.push(buildMove(board, from, to, flags, pieces[i]));
        }
      } else {
        moves.push(buildMove(board, from, to, flags));
      }
    }

    var moves = [];
    var us = turn;
    var them = swapColor(us);
    var secondRank = { b: RANK_7, w: RANK_2 };

    var firstSq = SQUARES.a8;
    var lastSq = SQUARES.h1;
    var singleSquare = false;

    /* do we want legal moves? */
    var legal =
      typeof options !== 'undefined' && 'legal' in options
        ? options.legal
        : true;

    /* are we generating moves for a single square? */
    if (typeof options !== 'undefined' && 'square' in options) {
      if (options.square in SQUARES) {
        firstSq = lastSq = SQUARES[options.square];
        singleSquare = true;
      } else {
        /* invalid square */
        return [];
      }
    }

    for (var i = firstSq; i <= lastSq; i++) {
      /* did we run off the end of the board */
      if (i & 0x88) {
        i += 7;
        continue;
      }

      var piece = board[i];
      if (piece == null || piece.color !== us) {
        continue;
      }

      if (piece.type === PAWN) {
        /* single square, non-capturing */
        var square = i + PAWN_OFFSETS[us][0];
        if (board[square] == null) {
          addMove(board, moves, i, square, BITS.NORMAL);

          /* double square */
          var square = i + PAWN_OFFSETS[us][1];
          if (secondRank[us] === rank(i) && board[square] == null) {
            addMove(board, moves, i, square, BITS.BIG_PAWN);
          }
        }

        /* pawn captures */
        for (j = 2; j < 4; j++) {
          var square = i + PAWN_OFFSETS[us][j];
          if (square & 0x88) continue;

          if (board[square] != null && board[square].color === them) {
            addMove(board, moves, i, square, BITS.CAPTURE);
          } else if (square === epSquare) {
            addMove(board, moves, i, epSquare, BITS.EP_CAPTURE);
          }
        }
      } else {
        for (var j = 0, len = PIECE_OFFSETS[piece.type].length; j < len; j++) {
          var offset = PIECE_OFFSETS[piece.type][j];
          var square = i;

          while (true) {
            square += offset;
            if (square & 0x88) break;

            if (board[square] == null) {
              addMove(board, moves, i, square, BITS.NORMAL);
            } else {
              if (board[square].color === us) break;
              addMove(board, moves, i, square, BITS.CAPTURE);
              break;
            }

            /* break, if knight or king */
            if (piece.type === 'n' || piece.type === 'k') break;
          }
        }
      }
    }

    /* check for castling if: a) we're generating all moves, or b) we're doing
     * single square move generation on the king's square
     */
    if (!singleSquare || lastSq === kings[us]) {
      /* king-side castling */
      if (castling[us] & BITS.KSIDE_CASTLE) {
        var castlingFrom = kings[us];
        var castlingTo = castlingFrom + 2;

        if (
          board[castlingFrom + 1] == null &&
          board[castlingTo] == null &&
          !attacked(them, kings[us]) &&
          !attacked(them, castlingFrom + 1) &&
          !attacked(them, castlingTo)
        ) {
          addMove(board, moves, kings[us], castlingTo, BITS.KSIDE_CASTLE);
        }
      }

      /* queen-side castling */
      if (castling[us] & BITS.QSIDE_CASTLE) {
        var castlingFrom = kings[us];
        var castlingTo = castlingFrom - 2;

        if (
          board[castlingFrom - 1] == null &&
          board[castlingFrom - 2] == null &&
          board[castlingFrom - 3] == null &&
          !attacked(them, kings[us]) &&
          !attacked(them, castlingFrom - 1) &&
          !attacked(them, castlingTo)
        ) {
          addMove(board, moves, kings[us], castlingTo, BITS.QSIDE_CASTLE);
        }
      }
    }

    /* return all pseudo-legal moves (this includes moves that allow the king
     * to be captured)
     */
    if (!legal) {
      return moves;
    }

    /* filter out illegal moves */
    var legalMoves = [];
    for (var i = 0, len = moves.length; i < len; i++) {
      makeMove(moves[i]);
      if (!kingAttacked(us)) {
        legalMoves.push(moves[i]);
      }
      undoMove();
    }

    return legalMoves;
  }

  /* convert a move from 0x88 coordinates to Standard Algebraic Notation
   * (SAN)
   *
   * @param {boolean} sloppy Use the sloppy SAN generator to work around over
   * disambiguation bugs in Fritz and Chessbase.  See below:
   *
   * r1bqkbnr/ppp2ppp/2n5/1B1pP3/4P3/8/PPPP2PP/RNBQK1NR b KQkq - 2 4
   * 4. ... Nge7 is overly disambiguated because the knight on c6 is pinned
   * 4. ... Ne7 is technically the valid SAN
   */
  function moveToSan(move, sloppy) {
    var output = '';

    if (move.flags & BITS.KSIDE_CASTLE) {
      output = 'O-O';
    } else if (move.flags & BITS.QSIDE_CASTLE) {
      output = 'O-O-O';
    } else {
      var disambiguator = getDisambiguator(move, sloppy);

      if (move.piece !== PAWN) {
        output += move.piece.toUpperCase() + disambiguator;
      }

      if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
        if (move.piece === PAWN) {
          output += algebraic(move.from)[0];
        }
        output += 'x';
      }

      output += algebraic(move.to);

      if (move.flags & BITS.PROMOTION) {
        output += '=' + move.promotion.toUpperCase();
      }
    }

    makeMove(move);
    if (inCheck()) {
      if (inCheckmate()) {
        output += '#';
      } else {
        output += '+';
      }
    }
    undoMove();

    return output;
  }

  // parses all of the decorators out of a SAN string
  function strippedSan(move) {
    return move.replace(/=/, '').replace(/[+#]?[?!]*$/, '');
  }

  function attacked(color, square) {
    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      /* did we run off the end of the board */
      if (i & 0x88) {
        i += 7;
        continue;
      }

      /* if empty square or wrong color */
      if (board[i] == null || board[i].color !== color) continue;

      var piece = board[i];
      var difference = i - square;
      var index = difference + 119;

      if (ATTACKS[index] & (1 << SHIFTS[piece.type])) {
        if (piece.type === PAWN) {
          if (difference > 0) {
            if (piece.color === WHITE) return true;
          } else {
            if (piece.color === BLACK) return true;
          }
          continue;
        }

        /* if the piece is a knight or a king */
        if (piece.type === 'n' || piece.type === 'k') return true;

        var offset = RAYS[index];
        var j = i + offset;

        var blocked = false;
        while (j !== square) {
          if (board[j] != null) {
            blocked = true;
            break;
          }
          j += offset;
        }

        if (!blocked) return true;
      }
    }

    return false;
  }

  function kingAttacked(color) {
    return attacked(swapColor(color), kings[color]);
  }

  function inCheck() {
    return kingAttacked(turn);
  }

  function inCheckmate() {
    return inCheck() && generateMoves().length === 0;
  }

  function inStalemate() {
    return !inCheck() && generateMoves().length === 0;
  }

  function insufficientMaterial() {
    var pieces = {};
    var bishops = [];
    var numPieces = 0;
    var sqColor = 0;

    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      sqColor = (sqColor + 1) % 2;
      if (i & 0x88) {
        i += 7;
        continue;
      }

      var piece = board[i];
      if (piece) {
        pieces[piece.type] = piece.type in pieces ? pieces[piece.type] + 1 : 1;
        if (piece.type === BISHOP) {
          bishops.push(sqColor);
        }
        numPieces++;
      }
    }

    /* k vs. k */
    if (numPieces === 2) {
      return true;
    } else if (
      /* k vs. kn .... or .... k vs. kb */
      numPieces === 3 &&
      (pieces[BISHOP] === 1 || pieces[KNIGHT] === 1)
    ) {
      return true;
    } else if (numPieces === pieces[BISHOP] + 2) {
      /* kb vs. kb where any number of bishops are all on the same color */
      var sum = 0;
      var len = bishops.length;
      for (var i = 0; i < len; i++) {
        sum += bishops[i];
      }
      if (sum === 0 || sum === len) {
        return true;
      }
    }

    return false;
  }

  function inThreefoldRepetition() {
    /* TODO: while this function is fine for casual use, a better
     * implementation would use a Zobrist key (instead of FEN). the
     * Zobrist key would be maintained in the makeMove/undoMove functions,
     * avoiding the costly that we do below.
     */
    var moves = [];
    var positions = {};
    var repetition = false;

    while (true) {
      var move = undoMove();
      if (!move) break;
      moves.push(move);
    }

    while (true) {
      /* remove the last two fields in the FEN string, they're not needed
       * when checking for draw by rep */
      var fen = generateFen()
        .split(' ')
        .slice(0, 4)
        .join(' ');

      /* has the position occurred three or move times */
      positions[fen] = fen in positions ? positions[fen] + 1 : 1;
      if (positions[fen] >= 3) {
        repetition = true;
      }

      if (!moves.length) {
        break;
      }
      makeMove(moves.pop());
    }

    return repetition;
  }

  function push(move) {
    history.push({
      move: move,
      kings: { b: kings.b, w: kings.w },
      turn: turn,
      castling: { b: castling.b, w: castling.w },
      epSquare: epSquare,
      halfMoves: halfMoves,
      moveNumber: moveNumber
    });
  }

  function makeMove(move) {
    var us = turn;
    var them = swapColor(us);
    push(move);

    board[move.to] = board[move.from];
    board[move.from] = null;

    /* if ep capture, remove the captured pawn */
    if (move.flags & BITS.EP_CAPTURE) {
      if (turn === BLACK) {
        board[move.to - 16] = null;
      } else {
        board[move.to + 16] = null;
      }
    }

    /* if pawn promotion, replace with new piece */
    if (move.flags & BITS.PROMOTION) {
      board[move.to] = { type: move.promotion, color: us };
    }

    /* if we moved the king */
    if (board[move.to].type === KING) {
      kings[board[move.to].color] = move.to;

      /* if we castled, move the rook next to the king */
      if (move.flags & BITS.KSIDE_CASTLE) {
        var castlingTo = move.to - 1;
        var castlingFrom = move.to + 1;
        board[castlingTo] = board[castlingFrom];
        board[castlingFrom] = null;
      } else if (move.flags & BITS.QSIDE_CASTLE) {
        var castlingTo = move.to + 1;
        var castlingFrom = move.to - 2;
        board[castlingTo] = board[castlingFrom];
        board[castlingFrom] = null;
      }

      /* turn off castling */
      castling[us] = '';
    }

    /* turn off castling if we move a rook */
    if (castling[us]) {
      for (var i = 0, len = ROOKS[us].length; i < len; i++) {
        if (
          move.from === ROOKS[us][i].square &&
          castling[us] & ROOKS[us][i].flag
        ) {
          castling[us] ^= ROOKS[us][i].flag;
          break;
        }
      }
    }

    /* turn off castling if we capture a rook */
    if (castling[them]) {
      for (var i = 0, len = ROOKS[them].length; i < len; i++) {
        if (
          move.to === ROOKS[them][i].square &&
          castling[them] & ROOKS[them][i].flag
        ) {
          castling[them] ^= ROOKS[them][i].flag;
          break;
        }
      }
    }

    /* if big pawn move, update the en passant square */
    if (move.flags & BITS.BIG_PAWN) {
      if (turn === 'b') {
        epSquare = move.to - 16;
      } else {
        epSquare = move.to + 16;
      }
    } else {
      epSquare = EMPTY;
    }

    /* reset the 50 move counter if a pawn is moved or a piece is captured */
    if (move.piece === PAWN) {
      halfMoves = 0;
    } else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
      halfMoves = 0;
    } else {
      halfMoves++;
    }

    if (turn === BLACK) {
      moveNumber++;
    }
    turn = swapColor(turn);
  }

  function undoMove() {
    var old = history.pop();
    if (old == null) {
      return null;
    }

    var move = old.move;
    kings = old.kings;
    turn = old.turn;
    castling = old.castling;
    epSquare = old.epSquare;
    halfMoves = old.halfMoves;
    moveNumber = old.moveNumber;

    var us = turn;
    var them = swapColor(turn);

    board[move.from] = board[move.to];
    board[move.from].type = move.piece; // to undo any promotions
    board[move.to] = null;

    if (move.flags & BITS.CAPTURE) {
      board[move.to] = { type: move.captured, color: them };
    } else if (move.flags & BITS.EP_CAPTURE) {
      var index;
      if (us === BLACK) {
        index = move.to - 16;
      } else {
        index = move.to + 16;
      }
      board[index] = { type: PAWN, color: them };
    }

    if (move.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
      var castlingTo, castlingFrom;
      if (move.flags & BITS.KSIDE_CASTLE) {
        castlingTo = move.to + 1;
        castlingFrom = move.to - 1;
      } else if (move.flags & BITS.QSIDE_CASTLE) {
        castlingTo = move.to - 2;
        castlingFrom = move.to + 1;
      }

      board[castlingTo] = board[castlingFrom];
      board[castlingFrom] = null;
    }

    return move;
  }

  /* this function is used to uniquely identify ambiguous moves */
  function getDisambiguator(move, sloppy) {
    var moves = generateMoves({ legal: !sloppy });

    var from = move.from;
    var to = move.to;
    var piece = move.piece;

    var ambiguities = 0;
    var sameRank = 0;
    var sameFile = 0;

    for (var i = 0, len = moves.length; i < len; i++) {
      var ambigFrom = moves[i].from;
      var ambigTo = moves[i].to;
      var ambigPiece = moves[i].piece;

      /* if a move of the same piece type ends on the same to square, we'll
       * need to add a disambiguator to the algebraic notation
       */
      if (piece === ambigPiece && from !== ambigFrom && to === ambigTo) {
        ambiguities++;

        if (rank(from) === rank(ambigFrom)) {
          sameRank++;
        }

        if (file(from) === file(ambigFrom)) {
          sameFile++;
        }
      }
    }

    if (ambiguities > 0) {
      /* if there exists a similar moving piece on the same rank and file as
       * the move in question, use the square as the disambiguator
       */
      if (sameRank > 0 && sameFile > 0) {
        return algebraic(from);
      } else if (sameFile > 0) {
        /* if the moving piece rests on the same file, use the rank symbol as the
       * disambiguator
       */
        return algebraic(from).charAt(1);
      } else {
        /* else use the file symbol */
        return algebraic(from).charAt(0);
      }
    }

    return '';
  }

  function ascii() {
    var s = '   +------------------------+\n';
    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      /* display the rank */
      if (file(i) === 0) {
        s += ' ' + '87654321'[rank(i)] + ' |';
      }

      /* empty piece */
      if (board[i] == null) {
        s += ' . ';
      } else {
        var piece = board[i].type;
        var color = board[i].color;
        var symbol =
          color === WHITE ? piece.toUpperCase() : piece.toLowerCase();
        s += ' ' + symbol + ' ';
      }

      if ((i + 1) & 0x88) {
        s += '|\n';
        i += 8;
      }
    }
    s += '   +------------------------+\n';
    s += '     a  b  c  d  e  f  g  h\n';

    return s;
  }

  // convert a move from Standard Algebraic Notation (SAN) to 0x88 coordinates
  function moveFromSan(move, sloppy) {
    // strip off any move decorations: e.g Nf3+?!
    var cleanMove = strippedSan(move);

    // if we're using the sloppy parser run a regex to grab piece, to, and from
    // this should parse invalid SAN like: Pe2-e4, Rc1c4, Qf3xf7
    if (sloppy) {
      var matches = cleanMove.match(
        /([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/
      );
      if (matches) {
        var piece = matches[1];
        var from = matches[2];
        var to = matches[3];
        var promotion = matches[4];
      }
    }

    var moves = generateMoves();
    for (var i = 0, len = moves.length; i < len; i++) {
      // try the strict parser first, then the sloppy parser if requested
      // by the user
      if (
        cleanMove === strippedSan(moveToSan(moves[i])) ||
        (sloppy && cleanMove === strippedSan(moveToSan(moves[i], true)))
      ) {
        return moves[i];
      } else {
        if (
          matches &&
          (!piece || piece.toLowerCase() == moves[i].piece) &&
          SQUARES[from] == moves[i].from &&
          SQUARES[to] == moves[i].to &&
          (!promotion || promotion.toLowerCase() == moves[i].promotion)
        ) {
          return moves[i];
        }
      }
    }

    return null;
  }

  /*****************************************************************************
   * UTILITY FUNCTIONS
   ****************************************************************************/
  function rank(i) {
    return i >> 4;
  }

  function file(i) {
    return i & 15;
  }

  function algebraic(i) {
    var f = file(i),
      r = rank(i);
    return 'abcdefgh'.substring(f, f + 1) + '87654321'.substring(r, r + 1);
  }

  function swapColor(c) {
    return c === WHITE ? BLACK : WHITE;
  }

  function isDigit(c) {
    return '0123456789'.indexOf(c) !== -1;
  }

  /* pretty = external move object */
  function makePretty(uglyMove) {
    var move = clone(uglyMove);
    move.san = moveToSan(move, false);
    move.to = algebraic(move.to);
    move.from = algebraic(move.from);

    var flags = '';

    for (var flag in BITS) {
      if (BITS[flag] & move.flags) {
        flags += FLAGS[flag];
      }
    }
    move.flags = flags;

    return move;
  }

  function clone(obj) {
    var dupe = obj instanceof Array ? [] : {};

    for (var property in obj) {
      if (typeof property === 'object') {
        dupe[property] = clone(obj[property]);
      } else {
        dupe[property] = obj[property];
      }
    }

    return dupe;
  }

  function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
  }

  /*****************************************************************************
   * DEBUGGING UTILITIES
   ****************************************************************************/
  function perft(depth) {
    var moves = generateMoves({ legal: false });
    var nodes = 0;
    var color = turn;

    for (var i = 0, len = moves.length; i < len; i++) {
      makeMove(moves[i]);
      if (!kingAttacked(color)) {
        if (depth - 1 > 0) {
          var childNodes = perft(depth - 1);
          nodes += childNodes;
        } else {
          nodes++;
        }
      }
      undoMove();
    }

    return nodes;
  }

  return {
    /***************************************************************************
     * PUBLIC CONSTANTS (is there a better way to do this?)
     **************************************************************************/
    WHITE: WHITE,
    BLACK: BLACK,
    PAWN: PAWN,
    KNIGHT: KNIGHT,
    BISHOP: BISHOP,
    ROOK: ROOK,
    QUEEN: QUEEN,
    KING: KING,
    SQUARES: (function() {
      /* from the ECMA-262 spec (section 12.6.4):
                 * "The mechanics of enumerating the properties ... is
                 * implementation dependent"
                 * so: for (var sq in SQUARES) { keys.push(sq); } might not be
                 * ordered correctly
                 */
      var keys = [];
      for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
        if (i & 0x88) {
          i += 7;
          continue;
        }
        keys.push(algebraic(i));
      }
      return keys;
    })(),
    FLAGS: FLAGS,

    /***************************************************************************
     * PUBLIC API
     **************************************************************************/
    load: function(fen) {
      return load(fen);
    },

    reset: function() {
      return reset();
    },

    moves: function(options) {
      /* The internal representation of a chess move is in 0x88 format, and
       * not meant to be human-readable.  The code below converts the 0x88
       * square coordinates to algebraic coordinates.  It also prunes an
       * unnecessary move keys resulting from a verbose call.
       */

      var uglyMoves = generateMoves(options);
      var moves = [];

      for (var i = 0, len = uglyMoves.length; i < len; i++) {
        /* does the user want a full move object (most likely not), or just
         * SAN
         */
        if (
          typeof options !== 'undefined' &&
          'verbose' in options &&
          options.verbose
        ) {
          moves.push(makePretty(uglyMoves[i]));
        } else {
          moves.push(moveToSan(uglyMoves[i], false));
        }
      }

      return moves;
    },

    inCheck: function() {
      return inCheck();
    },

    inCheckmate: function() {
      return inCheckmate();
    },

    inStalemate: function() {
      return inStalemate();
    },

    inDraw: function() {
      return (
        halfMoves >= 100 ||
        inStalemate() ||
        insufficientMaterial() ||
        inThreefoldRepetition()
      );
    },

    insufficientMaterial: function() {
      return insufficientMaterial();
    },

    inThreefoldRepetition: function() {
      return inThreefoldRepetition();
    },

    gameOver: function() {
      return (
        halfMoves >= 100 ||
        inCheckmate() ||
        inStalemate() ||
        insufficientMaterial() ||
        inThreefoldRepetition()
      );
    },

    validateFen: function(fen) {
      return validateFen(fen);
    },

    fen: function() {
      return generateFen();
    },

    board: function() {
      var output = [],
        row = [];

      for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
        if (board[i] == null) {
          row.push(null);
        } else {
          row.push({ type: board[i].type, color: board[i].color });
        }
        if ((i + 1) & 0x88) {
          output.push(row);
          row = [];
          i += 8;
        }
      }

      return output;
    },

    pgn: function(options) {
      /* using the specification from http://www.chessclub.com/help/PGN-spec
       * example for html usage: .pgn({ maxWidth: 72, newlineChar: "<br />" })
       */
      var newline =
        typeof options === 'object' && typeof options.newlineChar === 'string'
          ? options.newlineChar
          : '\n';
      var maxWidth =
        typeof options === 'object' && typeof options.maxWidth === 'number'
          ? options.maxWidth
          : 0;
      var result = [];
      var headerExists = false;

      /* add the PGN header headerrmation */
      for (var i in header) {
        /* TODO: order of enumerated properties in header object is not
         * guaranteed, see ECMA-262 spec (section 12.6.4)
         */
        result.push('[' + i + ' "' + header[i] + '"]' + newline);
        headerExists = true;
      }

      if (headerExists && history.length) {
        result.push(newline);
      }

      /* pop all of history onto reversedHistory */
      var reversedHistory = [];
      while (history.length > 0) {
        reversedHistory.push(undoMove());
      }

      var moves = [];
      var moveString = '';

      /* build the list of moves.  a moveString looks like: "3. e3 e6" */
      while (reversedHistory.length > 0) {
        var move = reversedHistory.pop();

        /* if the position started with black to move, start PGN with 1. ... */
        if (!history.length && move.color === 'b') {
          moveString = moveNumber + '. ...';
        } else if (move.color === 'w') {
          /* store the previous generated moveString if we have one */
          if (moveString.length) {
            moves.push(moveString);
          }
          moveString = moveNumber + '.';
        }

        moveString = moveString + ' ' + moveToSan(move, false);
        makeMove(move);
      }

      /* are there any other leftover moves? */
      if (moveString.length) {
        moves.push(moveString);
      }

      /* is there a result? */
      if (typeof header.Result !== 'undefined') {
        moves.push(header.Result);
      }

      /* history should be back to what is was before we started generating PGN,
       * so join together moves
       */
      if (maxWidth === 0) {
        return result.join('') + moves.join(' ');
      }

      /* wrap the PGN output at maxWidth */
      var currentWidth = 0;
      for (var i = 0; i < moves.length; i++) {
        /* if the current move will push past maxWidth */
        if (currentWidth + moves[i].length > maxWidth && i !== 0) {
          /* don't end the line with whitespace */
          if (result[result.length - 1] === ' ') {
            result.pop();
          }

          result.push(newline);
          currentWidth = 0;
        } else if (i !== 0) {
          result.push(' ');
          currentWidth++;
        }
        result.push(moves[i]);
        currentWidth += moves[i].length;
      }

      return result.join('');
    },

    loadPgn: function(pgn, options) {
      // allow the user to specify the sloppy move parser to work around over
      // disambiguation bugs in Fritz and Chessbase
      var sloppy =
        typeof options !== 'undefined' && 'sloppy' in options
          ? options.sloppy
          : false;

      function mask(str) {
        return str.replace(/\\/g, '\\');
      }

      function hasKeys(object) {
        for (var key in object) {
          return true;
        }
        return false;
      }

      function parsePgnHeader(header, options) {
        var newlineChar =
          typeof options === 'object' &&
          typeof options.newlineChar === 'string'
            ? options.newlineChar
            : '\r?\n';
        var headerObj = {};
        var headers = header.split(new RegExp(mask(newlineChar)));
        var key = '';
        var value = '';

        for (var i = 0; i < headers.length; i++) {
          key = headers[i].replace(/^\[([A-Z][A-Za-z]*)\s.*\]$/, '$1');
          value = headers[i].replace(/^\[[A-Za-z]+\s"(.*)"\]$/, '$1');
          if (trim(key).length > 0) {
            headerObj[key] = value;
          }
        }

        return headerObj;
      }

      var newlineChar =
        typeof options === 'object' && typeof options.newlineChar === 'string'
          ? options.newlineChar
          : '\r?\n';

      // RegExp to split header. Takes advantage of the fact that header and movetext
      // will always have a blank line between them (ie, two newlineChar's).
      // With default newlineChar, will equal: /^(\[((?:\r?\n)|.)*\])(?:\r?\n){2}/
      var headerRegex = new RegExp(
        '^(\\[((?:' +
          mask(newlineChar) +
          ')|.)*\\])' +
          '(?:' +
          mask(newlineChar) +
          '){2}'
      );

      // If no header given, begin with moves.
      var headerString = headerRegex.test(pgn)
        ? headerRegex.exec(pgn)[1]
        : '';

      // Put the board in the starting position
      reset();

      /* parse PGN header */
      var headers = parsePgnHeader(headerString, options);
      for (var key in headers) {
        setHeader([key, headers[key]]);
      }

      /* load the starting position indicated by [Setup '1'] and
      * [FEN position] */
      if (headers['SetUp'] === '1') {
        if (!('FEN' in headers && load(headers['FEN'], true))) {
          // second argument to load: don't clear the headers
          return false;
        }
      }

      /* delete header to get the moves */
      var ms = pgn
        .replace(headerString, '')
        .replace(new RegExp(mask(newlineChar), 'g'), ' ');

      /* delete comments */
      ms = ms.replace(/(\{[^}]+\})+?/g, '');

      /* delete recursive annotation variations */
      var ravRegex = /(\([^\(\)]+\))+?/;
      while (ravRegex.test(ms)) {
        ms = ms.replace(ravRegex, '');
      }

      /* delete move numbers */
      ms = ms.replace(/\d+\.(\.\.)?/g, '');

      /* delete ... indicating black to move */
      ms = ms.replace(/\.\.\./g, '');

      /* delete numeric annotation glyphs */
      ms = ms.replace(/\$\d+/g, '');

      /* trim and get array of moves */
      var moves = trim(ms).split(new RegExp(/\s+/));

      /* delete empty entries */
      moves = moves
        .join(',')
        .replace(/,,+/g, ',')
        .split(',');
      var move = '';

      for (var halfMove = 0; halfMove < moves.length - 1; halfMove++) {
        move = moveFromSan(moves[halfMove], sloppy);

        /* move not possible! (don't clear the board to examine to show the
         * latest valid position)
         */
        if (move == null) {
          return false;
        } else {
          makeMove(move);
        }
      }

      /* examine last move */
      move = moves[moves.length - 1];
      if (POSSIBLE_RESULTS.indexOf(move) > -1) {
        if (hasKeys(header) && typeof header.Result === 'undefined') {
          setHeader(['Result', move]);
        }
      } else {
        move = moveFromSan(move, sloppy);
        if (move == null) {
          return false;
        } else {
          makeMove(move);
        }
      }
      return true;
    },

    header: function() {
      return setHeader(arguments);
    },

    ascii: function() {
      return ascii();
    },

    turn: function() {
      return turn;
    },

    move: function(move, options) {
      /* The move function can be called with in the following parameters:
       *
       * .move('Nxb7')      <- where 'move' is a case-sensitive SAN string
       *
       * .move({ from: 'h7', <- where the 'move' is a move object (additional
       *         to :'h8',      fields are ignored)
       *         promotion: 'q',
       *      })
       */

      // allow the user to specify the sloppy move parser to work around over
      // disambiguation bugs in Fritz and Chessbase
      var sloppy =
        typeof options !== 'undefined' && 'sloppy' in options
          ? options.sloppy
          : false;

      var moveObj = null;

      if (typeof move === 'string') {
        moveObj = moveFromSan(move, sloppy);
      } else if (typeof move === 'object') {
        var moves = generateMoves();

        /* convert the pretty move object to an ugly move object */
        for (var i = 0, len = moves.length; i < len; i++) {
          if (
            move.from === algebraic(moves[i].from) &&
            move.to === algebraic(moves[i].to) &&
            (!('promotion' in moves[i]) ||
              move.promotion === moves[i].promotion)
          ) {
            moveObj = moves[i];
            break;
          }
        }
      }

      /* failed to find move */
      if (!moveObj) {
        return null;
      }

      /* need to make a copy of move because we can't generate SAN after the
       * move is made
       */
      var prettyMove = makePretty(moveObj);

      makeMove(moveObj);

      return prettyMove;
    },

    undo: function() {
      var move = undoMove();
      return move ? makePretty(move) : null;
    },

    clear: function() {
      return clear();
    },

    put: function(piece, square) {
      return put(piece, square);
    },

    get: function(square) {
      return get(square);
    },

    remove: function(square) {
      return remove(square);
    },

    perft: function(depth) {
      return perft(depth);
    },

    squareColor: function(square) {
      if (square in SQUARES) {
        var sq_0x88 = SQUARES[square];
        return (rank(sq_0x88) + file(sq_0x88)) % 2 === 0 ? 'light' : 'dark';
      }

      return null;
    },

    history: function(options) {
      var reversedHistory = [];
      var moveHistory = [];
      var verbose =
        typeof options !== 'undefined' &&
        'verbose' in options &&
        options.verbose;

      while (history.length > 0) {
        reversedHistory.push(undoMove());
      }

      while (reversedHistory.length > 0) {
        var move = reversedHistory.pop();
        if (verbose) {
          moveHistory.push(makePretty(move));
        } else {
          moveHistory.push(moveToSan(move));
        }
        makeMove(move);
      }

      return moveHistory;
    }
  };
};

/* export Chess object if using node or any other CommonJS compatible
 * environment */
if (typeof exports !== 'undefined') exports.Chess = Chess;
/* export Chess object for any RequireJS compatible environment */
if (typeof define !== 'undefined')
  define(function() {
    return Chess;
  });
