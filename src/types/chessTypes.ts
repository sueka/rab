declare namespace Chess {
  type Piece = '♔' | '♕' | '♖' | '♗' | '♘' | '♙' | '♚' | '♛' | '♜' | '♝' | '♞' | '♟'
  type File = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  type Color = 'white' | 'black'

  interface Coordinates {
    file: File
    rank: Rank
  }

  export interface CoordinatedPiece {
    piece: Piece
    coord: Coordinates
  }
}
