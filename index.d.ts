declare module 'chess.js' {
  type FEN = string
  
  type Color = 'w' | 'b'
  
  type PieceIdentifier = 'k' | 'q' | 'r' | 'n' | 'b' | 'p'
  type PromotionPieceIdentifier = 'q' | 'r' | 'n' | 'b'
  
  interface Piece {
    type: PieceIdentifier,
    color: Color,
  }
  
  type SquareLabel =
    'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6' | 'a7' | 'a8' |
    'b1' | 'b2' | 'b3' | 'b4' | 'b5' | 'b6' | 'b7' | 'b8' |
    'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6' | 'c7' | 'c8' |
    'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6' | 'd7' | 'd8' |
    'e1' | 'e2' | 'e3' | 'e4' | 'e5' | 'e6' | 'e7' | 'e8' |
    'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6' | 'f7' | 'f8' |
    'g1' | 'g2' | 'g3' | 'g4' | 'g5' | 'g6' | 'g7' | 'g8' |
    'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8'
  
  interface HistoryOptions {
    verbose: boolean
  }
  
  interface LoadPGNOptions {
    newline_char?: string,
    sloppy?: boolean,
  }
  
  type SANMove = string
  
  interface Move {
    from: SquareLabel,
    to: SquareLabel,
    promotion?: PromotionPieceIdentifier
  }
  
  type MoveFlags = 'n' | 'b' | 'e' | 'c' | 'p' | 'k' | 'q'
  
  interface VerboseMove extends Move {
    color: Color,
    flags: MoveFlags,
    piece: PieceIdentifier,
    san: SANMove,
  }
  
  interface MoveOptions {
    sloppy?: boolean
  }
  
  interface MovesOptions {
    square?: SquareLabel,
    verbose?: boolean
  }
  
  interface PGNOptions {
    max_width?: number,
    newline_char?: string,
  }
  
  interface FENValidationResult {
    valid: boolean,
    error_number: number,
    error: string,
  }
  
  class Chess {
    constructor(fen?: string)
  
    ascii(): string
  
    clear(): void
  
    fen(): FEN
 
    game_over(): boolean
  
    get(square: SquareLabel): Piece
  
    history(options?: HistoryOptions): Array<string | VerboseMove>
  
    in_check(): boolean
  
    in_checkmate(): boolean
  
    in_draw(): boolean
  
    in_stalemate(): boolean
  
    in_threefold_repetition(): boolean
  
    header(...tagValues: string[]): void | { [key: string]: string }
  
    insufficient_material(): boolean
  
    load(fen: FEN): true
 
    load_pgn(pgn: string, options?: LoadPGNOptions): boolean
  
    move(move: string | SANMove | Move, options?: MoveOptions): VerboseMove | null
  
    moves(options?: MovesOptions): Array<SANMove | VerboseMove>
  
    pgn(options?: PGNOptions): string
  
    put(piece: Piece, square: SquareLabel): boolean
  
    remove(square: SquareLabel): Piece
 
    reset(): void
  
    square_color(square: SquareLabel): 'light' | 'dark'
  
    turn(): Color
  
    undo(): VerboseMove | null
  
    validate_fen(fen: FEN): FENValidationResult
  }
}
  