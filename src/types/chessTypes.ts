namespace Chess {
  type Piece = '♔' | '♕' | '♖' | '♗' | '♘' | '♙' | '♚' | '♛' | '♜' | '♝' | '♞' | '♟'
  type File = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'
  type Rank = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'

  interface Coordinates {
    file: File
    rank: Rank
  }

  export interface CoordinatedPiece {
    piece: Piece
    coord: Coordinates
  }
}
