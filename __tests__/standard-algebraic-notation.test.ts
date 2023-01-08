import { Chess, DEFAULT_POSITION } from '../src/chess'
import { split } from './utils'
import 'jest-extended'

const positions = [
  {
    fen: DEFAULT_POSITION,
    moves: `a3 a4 b3 b4 c3 c4 d3 d4 e3 e4 f3 f4 g3 g4 h3 h4 Na3 Nc3 Nf3 Nh3`,
  },

  {
    fen: '7k/3R4/3p2Q1/6Q1/2N1N3/8/8/3R3K w - - 0 1',
    moves: `Rd8# Re7 Rf7 Rg7 Rh7# R7xd6 Rc7 Rb7 Ra7 Qf7 Qe8# Qg7# Qg8# Qh7#
    Q6h6# Q6h5# Q6f5 Q6f6# Qe6 Qxd6 Q5f6# Qe7 Qd8# Q5h6# Q5h5# Qh4# Qg4 Qg3 Qg2
    Qg1 Qf4 Qe3 Qd2 Qc1 Q5f5 Qe5+ Qd5 Qc5 Qb5 Qa5 Na5 Nb6 Ncxd6 Ne5 Ne3 Ncd2
    Nb2 Na3 Nc5 Nexd6 Nf6 Ng3 Nf2 Ned2 Nc3 Rd2 Rd3 Rd4 Rd5 R1xd6 Re1 Rf1 Rg1
    Rc1 Rb1 Ra1 Kg2 Kh2 Kg1`,
  },
  {
    fen: '1r3k2/P1P5/8/8/8/8/8/R3K2R w KQ - 0 1',
    moves: `a8=Q a8=R a8=B a8=N axb8=Q+ axb8=R+ axb8=B axb8=N c8=Q+ c8=R+
        c8=B c8=N cxb8=Q+ cxb8=R+ cxb8=B cxb8=N Ra2 Ra3 Ra4 Ra5 Ra6 Rb1 Rc1 Rd1
        Kd2 Ke2 Kf2 Kf1 Kd1 Rh2 Rh3 Rh4 Rh5 Rh6 Rh7 Rh8+ Rg1 Rf1+ O-O+ O-O-O`,
  },

  {
    fen: '5rk1/8/8/8/8/8/2p5/R3K2R w KQ - 0 1',
    moves: `Ra2 Ra3 Ra4 Ra5 Ra6 Ra7 Ra8 Rb1 Rc1 Rd1 Kd2 Ke2 Rh2 Rh3 Rh4 Rh5 Rh6
    Rh7 Rh8+ Rg1+ Rf1`,
  },
  {
    fen: '5rk1/8/8/8/8/8/2p5/R3K2R b KQ - 0 1',
    moves: `Rf7 Rf6 Rf5 Rf4 Rf3 Rf2 Rf1+ Re8+ Rd8 Rc8 Rb8 Ra8 Kg7 Kf7 c1=Q+
    c1=R+ c1=B c1=N`,
  },
  {
    fen: 'r3k2r/p2pqpb1/1n2pnp1/2pPN3/1p2P3/2N2Q1p/PPPB1PPP/R3K2R w KQkq c6 0 2',
    moves: `gxh3 Qxf6 Qxh3 Nxd7 Nxf7 Nxg6 dxc6 dxe6 Rg1 Rf1 Ke2 Kf1 Kd1 Rb1 Rc1
    Rd1 g3 g4 Be3 Bf4 Bg5 Bh6 Bc1 b3 a3 a4 Qf4 Qf5 Qg4 Qh5 Qg3 Qe2 Qd1 Qe3 Qd3
    Na4 Nb5 Ne2 Nd1 Nb1 Nc6 Ng4 Nd3 Nc4 d6 O-O O-O-O`,
  },
  {
    fen: 'k7/8/K7/8/3n3n/5R2/3n4/8 b - - 0 1',
    moves: `N2xf3 Nhxf3 Nd4xf3 N2b3 Nc4 Ne4 Nf1 Nb1 Nhf5 Ng6 Ng2 Nb5 Nc6 Ne6
    Ndf5 Ne2 Nc2 N4b3 Kb8`,
  },
]

positions.forEach(({ fen, moves }, i) => {
  test(`standard algebraic notation - ${i}`, () => {
    const chess = new Chess(fen)
    expect(chess.moves()).toIncludeSameMembers(split(moves))
  })
})
