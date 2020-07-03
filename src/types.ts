type Board = Array<Piece | undefined>
type Comments = Record<string, string>

type Color = 'w' | 'b'
type PieceSymbol = 'p' | 'n' | 'b' | 'r' | 'q' | 'k'
type Square = 'a8' | 'b8' | 'c8' | 'd8' | 'e8' | 'f8' | 'g8' | 'h8' |
              'a7' | 'b7' | 'c7' | 'd7' | 'e7' | 'f7' | 'g7' | 'h7' |
              'a6' | 'b6' | 'c6' | 'd6' | 'e6' | 'f6' | 'g6' | 'h6' |
              'a5' | 'b5' | 'c5' | 'd5' | 'e5' | 'f5' | 'g5' | 'h5' |
              'a4' | 'b4' | 'c4' | 'd4' | 'e4' | 'f4' | 'g4' | 'h4' |
              'a3' | 'b3' | 'c3' | 'd3' | 'e3' | 'f3' | 'g3' | 'h3' |
              'a2' | 'b2' | 'c2' | 'd2' | 'e2' | 'f2' | 'g2' | 'h2' |
              'a1' | 'b1' | 'c1' | 'd1' | 'e1' | 'f1' | 'g1' | 'h1'
type FlagKey = 'NORMAL' | 'CAPTURE' | 'BIG_PAWN' | 'EP_CAPTURE' | 'PROMOTION' | 'KSIDE_CASTLE' | 'QSIDE_CASTLE'

type Piece = {
  color: Color;
  type: PieceSymbol;
}

interface Header extends Record<string, string | undefined> {
  SetUp?: string;
  FEN?: string;
}

type PgnComment = {
  fen: string;
  comment: string;
}

interface ColorState extends Record<Color, number> {
  w: number;
  b: number;
}

type GameHistory = {
  move: Move;
  state: State;
}

type State = {
  kings: ColorState;
  turn: Color;
  castling: ColorState;
  ep_square: number;
  half_moves: number;
  move_number: number;
  board: Board;
}

type Move = {
  to: number;
  from: number;
  color: Color;
  flags: number;
  piece: PieceSymbol;
  captured?: PieceSymbol;
  promotion?: PieceSymbol;
  san?: string;
}

type PrettyMove = {
  to: string;
  from: string;
  color: Color;
  flags: string;
  piece: PieceSymbol;
  san: string;
  captured?: PieceSymbol;
  promotion?: PieceSymbol;
}

type Validation = {
  valid: boolean;
  error_number: number;
  error: string;
}
