declare namespace Chess {
  type Color = 'white' | 'black' // of square or player

  //
  // _|                                            _|
  // _|_|_|      _|_|      _|_|_|  _|  _|_|    _|_|_|
  // _|    _|  _|    _|  _|    _|  _|_|      _|    _|
  // _|    _|  _|    _|  _|    _|  _|        _|    _|
  // _|_|_|      _|_|      _|_|_|  _|          _|_|_|
  //
  //

  interface Chessboard {
    pieces: CoordinatedPiece[] // pieces.map(({ coord }) => coord) is unique
  }

  interface CoordinatedPiece {
    piece: Alt.Exclude<Piece, '♙' | '♟' > | Pawn
    coord: Coordinates
  }

  //
  //           _|
  //   _|_|_|  _|_|_|      _|_|      _|_|_|    _|_|_|  _|_|_|  _|_|      _|_|_|  _|_|_|
  // _|        _|    _|  _|_|_|_|  _|_|      _|_|      _|    _|    _|  _|    _|  _|    _|
  // _|        _|    _|  _|            _|_|      _|_|  _|    _|    _|  _|    _|  _|    _|
  //   _|_|_|  _|    _|    _|_|_|  _|_|_|    _|_|_|    _|    _|    _|    _|_|_|  _|    _|
  //
  //

  type Piece = '♔' | '♕' | '♖' | '♗' | '♘' | '♙' | '♚' | '♛' | '♜' | '♝' | '♞' | '♟' // colored

  interface Pawn {
    piece: '♙' | '♟'
    hasAdvancedTwoSquares: boolean
  }

  //
  //                                               _|  _|                        _|
  //   _|_|_|    _|_|      _|_|    _|  _|_|    _|_|_|      _|_|_|      _|_|_|  _|_|_|_|    _|_|
  // _|        _|    _|  _|    _|  _|_|      _|    _|  _|  _|    _|  _|    _|    _|      _|_|_|_|
  // _|        _|    _|  _|    _|  _|        _|    _|  _|  _|    _|  _|    _|    _|      _|
  //   _|_|_|    _|_|      _|_|    _|          _|_|_|  _|  _|    _|    _|_|_|      _|_|    _|_|_|
  //
  //

  type File = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

  interface Coordinates {
    file: File
    rank: Rank
  }

  type EasyFile = number
  type EasyRank = number

  interface EasyCoordinates {
    file: EasyFile
    rank: EasyRank
  }

  //
  //
  // _|_|_|  _|_|      _|_|    _|      _|    _|_|
  // _|    _|    _|  _|    _|  _|      _|  _|_|_|_|
  // _|    _|    _|  _|    _|    _|  _|    _|
  // _|    _|    _|    _|_|        _|        _|_|_|
  //
  //

  interface Move {
    file: number // >0 is rightward
    rank: number // >0 is upward
  }
}
