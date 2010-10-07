/******************************************************************************
 * UNIT TESTS
 *****************************************************************************/
function log(text, newline) {
  var console = document.getElementById('console');
  console.innerHTML += text;
  if (typeof(newline) == 'undefined' || newline == true) {
    console.innerHTML += '<br />';
  }
}

function run_unit_tests() {
  var start = new Date();
  var console = document.getElementById('console');

  if (console == null) {
    alert('Can\'t locate console.  Aborting.');
    return
  }

  perft_unit_tests();
  checkmate_unit_tests();
  stalemate_unit_tests();
  algebraic_notation_tests();
  get_and_put_tests();
  fen_tests();
  make_move_tests();

  var finish = new Date();
  var diff = (finish - start) / 1000;
  log('Total Time: ' + diff + ' secs');
}


function perft_unit_tests() {
  var chess = new Chess();
  var start = new Date();
  var perfts = [
    {fen: 'r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1', 
      depth: 3, nodes: 97862},
    {fen: '8/PPP4k/8/8/8/8/4Kppp/8 w - - 0 1',
      depth: 4, nodes: 89363},
    {fen: '8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1',
      depth: 4, nodes: 43238},
    {fen: 'rnbqkbnr/p3pppp/2p5/1pPp4/3P4/8/PP2PPPP/RNBQKBNR w KQkq b6 0 4',
      depth: 3, nodes: 23509},
  ];

  var total_nodes = 0;
  for (var i = 0; i < perfts.length; i++) {
    chess.load(perfts[i].fen);
    var nodes = chess.perft(perfts[i].depth);
    var s = 'Perft Test #' + i + ': ' + perfts[i].fen + ' - ' + nodes + ' : ';
    s += (nodes != perfts[i].nodes) ? 'FAILED!' : 'PASSED!';
    total_nodes += nodes;
    log(s);
  }
  var finish = new Date();
  var diff = (finish - start) / 1000;

  log('--> Perft Time: ' + diff + ' secs ' + '(' + Math.floor(total_nodes / diff) + ' NPS)');
  log('');
}

function checkmate_unit_tests() {
  var chess = new Chess();
  var start = new Date();
  var checkmates = [
    '8/5r2/4K1q1/4p3/3k4/8/8/8 w - - 0 7',
    '4r2r/p6p/1pnN2p1/kQp5/3pPq2/3P4/PPP3PP/R5K1 b - - 0 2',
    'r3k2r/ppp2p1p/2n1p1p1/8/2B2P1q/2NPb1n1/PP4PP/R2Q3K w kq - 0 8',
    '8/6R1/pp1r3p/6p1/P3R1Pk/1P4P1/7K/8 b - - 0 4',
  ]

  for (var i = 0; i < checkmates.length; i++) {
    chess.load(checkmates[i]);
    var s = 'Checkmate Test #' + i + ': ' + checkmates[i] + ' : ';
    s += (chess.in_checkmate()) ? 'PASSED!' : 'FAILED!';
    log(s);
  }

  var finish = new Date();
  var diff = (finish - start) / 1000;
  log('--> Checkmate Time: ' + diff + ' secs');
  log('');
}

function stalemate_unit_tests() {
  var chess = new Chess();
  var start = new Date();
  var stalemates = [
    '1R6/8/8/8/8/8/7R/k6K b - - 0 1',
    '8/8/5k2/p4p1p/P4K1P/1r6/8/8 w - - 0 2',
  ];

  for (var i = 0; i < stalemates.length; i++) {
    chess.load(stalemates[i]);
    var s = 'Stalemate Test #' + i + ': ' + stalemates[i] + ' : ';
    s += (chess.in_stalemate()) ? 'PASSED!' : 'FAILED!';
    log(s);
  }
  var finish = new Date();
  var diff = (finish - start) / 1000;
  log('--> Stalemate Time: ' + diff + ' secs');
  log('');
}

function algebraic_notation_tests() {
  var chess = new Chess();
  var start = new Date();
  var passed = true;
  var positions = [
    {fen: '7k/3R4/3p2Q1/6Q1/2N1N3/8/8/3R3K w - - 0 1', 
     moves: ['Rd8#', 'Re7', 'Rf7', 'Rg7', 'Rh7#', 'R7xd6', 'Rc7', 'Rb7', 'Ra7',
             'Qf7', 'Qe8#', 'Qg7#', 'Qg8#', 'Qh7#', 'Q6h6#', 'Q6h5#', 'Q6f5',
             'Q6f6#', 'Qe6', 'Qxd6', 'Q5f6#', 'Qe7', 'Qd8#', 'Q5h6#', 'Q5h5#',
             'Qh4#', 'Qg4', 'Qg3', 'Qg2', 'Qg1', 'Qf4', 'Qe3', 'Qd2', 'Qc1',
             'Q5f5', 'Qe5+', 'Qd5', 'Qc5', 'Qb5', 'Qa5', 'Na5', 'Nb6', 'Ncxd6',
             'Ne5', 'Ne3', 'Ncd2', 'Nb2', 'Na3', 'Nc5', 'Nexd6', 'Nf6', 'Ng3',
             'Nf2', 'Ned2', 'Nc3', 'Rd2', 'Rd3', 'Rd4', 'Rd5', 'R1xd6', 'Re1',
             'Rf1', 'Rg1', 'Rc1', 'Rb1', 'Ra1', 'Kg2', 'Kh2', 'Kg1']},
    {fen: '1r3k2/P1P5/8/8/8/8/8/R3K2R w KQ - 0 1',
     moves: ['a8=Q', 'a8=R', 'a8=B', 'a8=N', 'axb8=Q+', 'axb8=R+', 'axb8=B',
             'axb8=N', 'c8=Q+', 'c8=R+', 'c8=B', 'c8=N', 'cxb8=Q+', 'cxb8=R+',
             'cxb8=B', 'cxb8=N', 'Ra2', 'Ra3', 'Ra4', 'Ra5', 'Ra6', 'Rb1', 
             'Rc1', 'Rd1', 'Kd2', 'Ke2', 'Kf2', 'Kf1', 'Kd1', 'Rh2', 'Rh3',
             'Rh4', 'Rh5', 'Rh6', 'Rh7', 'Rh8+', 'Rg1', 'Rf1+', 'O-O+',
             'O-O-O']},
    {fen: '5rk1/8/8/8/8/8/2p5/R3K2R w KQ - 0 1',
     moves: ['Ra2', 'Ra3', 'Ra4', 'Ra5', 'Ra6', 'Ra7', 'Ra8', 'Rb1', 'Rc1',
             'Rd1', 'Kd2', 'Ke2', 'Rh2', 'Rh3', 'Rh4', 'Rh5', 'Rh6', 'Rh7',
             'Rh8+', 'Rg1+', 'Rf1']},
    {fen: '5rk1/8/8/8/8/8/2p5/R3K2R b KQ - 0 1',
     moves: ['Rf7', 'Rf6', 'Rf5', 'Rf4', 'Rf3', 'Rf2', 'Rf1+', 'Re8+', 'Rd8',
             'Rc8', 'Rb8', 'Ra8', 'Kg7', 'Kf7', 'c1=Q+', 'c1=R+', 'c1=B',
             'c1=N']},
    {fen: 'r3k2r/p2pqpb1/1n2pnp1/2pPN3/1p2P3/2N2Q1p/PPPB1PPP/R3K2R w KQkq c6 0 2',
     moves: ['gxh3', 'Qxf6', 'Qxh3', 'Nxd7', 'Nxf7', 'Nxg6', 'dxc6', 'dxe6',
             'Rg1', 'Rf1', 'Ke2', 'Kf1', 'Kd1', 'Rb1', 'Rc1', 'Rd1', 'g3',
             'g4', 'Be3', 'Bf4', 'Bg5', 'Bh6', 'Bc1', 'b3', 'a3', 'a4', 'Qf4',
             'Qf5', 'Qg4', 'Qh5', 'Qg3', 'Qe2', 'Qd1', 'Qe3', 'Qd3', 'Na4',
             'Nb5', 'Ne2', 'Nd1', 'Nb1', 'Nc6', 'Ng4', 'Nd3', 'Nc4', 'd6',
             'O-O', 'O-O-O']},
    {fen: 'k7/8/K7/8/3n3n/5R2/3n4/8 b - - 0 1',
     moves: ['N2xf3', 'Nhxf3', 'Nd4xf3', 'N2b3', 'Nc4', 'Ne4', 'Nf1', 'Nb1',
             'Nhf5', 'Ng6', 'Ng2', 'Nb5', 'Nc6', 'Ne6', 'Ndf5', 'Ne2', 'Nc2',
             'N4b3', 'Kb8']},
    ];

  for (var i = 0; i < positions.length; i++) { 
    var s = 'Algebraic Notation Test #' + i + ': ' + positions[i].fen + ' : ';
    chess.load(positions[i].fen);
    var moves = chess.moves();
    if (moves.length != positions[i].moves.length) {
      passed = false;
    } else {
      for (var j = 0; j < moves.length; j++) {
        if (positions[i].moves.indexOf(moves[j].move) == -1) {
          passed = false;
          break; 
        } 
      } 
    }
    s += passed ? 'PASSED!' : 'FAILED!';
    log(s);
  }

  var finish = new Date();
  var diff = (finish - start) / 1000;
  log('--> Algebraic Notation Time: ' + diff + ' secs');
  log('');
}

function get_and_put_tests() {
  var chess = new Chess();
  var start = new Date();
  var passed = true;
  var positions = [
    {fen: '8/8/8/8/8/8/8/8 w - - 0 1',
     pieces: {a7: 'P', b7: 'p', c7: 'N', d7: 'n', e7: 'B', f7: 'b', g7: 'R',
              h7: 'r', a6: 'Q', b6: 'q', c6: 'K', d6: 'k'}},
  ];

  for (var i = 0; i < positions.length; i++) {
    passed = true;
    chess.load(positions[i].fen);
    var s = 'Get/Put Test #' + i + ' : ';

    /* places the pieces */
    for (var square in positions[i].pieces) {
      chess.put(positions[i].pieces[square] + '@' + square);
    }

    /* iterate over every square to make sure get returns the proper
     * piece values/color 
     */
    for (var square in Chess().SQUARES) {
      if (!(square in positions[i].pieces)) {
        if (chess.get(square) != null) {
          passed = false;
          break;
        }
      } else {
        if (chess.get(square) != positions[i].pieces[square]) {
          passed = false;
          break;
        }
      }
    }
    s += passed ? 'PASSED!' : 'FAILED!';

    log(s);
  }
  var finish = new Date();
  var diff = (finish - start) / 1000;
  log('--> Get/Put Time: ' + diff + ' secs');
  log('');
}

function fen_tests() {
  var chess = new Chess();
  var start = new Date();
  var positions = [
    '8/8/8/8/8/8/8/8 w - - 0 1',
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    '1nbqkbn1/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/1NBQKBN1 b - - 1 2',
  ];

  for (var i = 0; i < positions.length; i++) {
    chess.load(positions[i]);
    var s = 'FEN Test #' + i + ': ' + positions[i] + ' : ';
    s += (chess.fen() == positions[i]) ? 'PASSED!' : 'FAILED!';
    log(s);
  }
  var finish = new Date();
  var diff = (finish - start) / 1000;
  log('--> FEN Time: ' + diff + ' secs');
  log('');
}

function make_move_tests() {
  var chess = new Chess();
  var start = new Date();
  var positions = [
    {fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
     legal: true,
     move: 'e4',
     next: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1'},
    {fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
     legal: false,
     move: 'e5'},
    {fen: '7k/3R4/3p2Q1/6Q1/2N1N3/8/8/3R3K w - - 0 1',
     legal: true,
     move: 'Rd8#',
     next: '3R3k/8/3p2Q1/6Q1/2N1N3/8/8/3R3K b - - 1 1'},
    {fen: 'rnbqkbnr/pp3ppp/2pp4/4pP2/4P3/8/PPPP2PP/RNBQKBNR w KQkq e6 0 1',
     legal: true,
     move: 'fxe6',
     next: 'rnbqkbnr/pp3ppp/2ppP3/8/4P3/8/PPPP2PP/RNBQKBNR b KQkq - 0 1'}
  ];

  for (var i = 0; i < positions.length; i++) {
    chess.load(positions[i].fen);
    var s = 'Make Move Test #' + i + ': ' + positions[i].fen + 
            ' (' + positions[i].move + ' ' + positions[i].legal + ') : ';
    result = chess.move(positions[i].move);
    if (positions[i].legal) {
      s += (result && chess.fen() == positions[i].next) ? 'PASSED!' : 'FAILED!';
    } else {
      s += (!result) ? 'PASSED!' : 'FAILED!';
    }

    log(s);
  }
  var finish = new Date();
  var diff = (finish - start) / 1000;
  log('--> Make Move Time: ' + diff + ' secs');
  log('');
}
