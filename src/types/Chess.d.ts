/// <reference path='../../node_modules/immutable/dist/immutable.d.ts'/>

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
    chessmen: Immutable.Map<Class.ValueObject<Coordinates>, Chessman>
  }

  //
  //           _|
  //   _|_|_|  _|_|_|      _|_|      _|_|_|    _|_|_|  _|_|_|  _|_|      _|_|_|  _|_|_|
  // _|        _|    _|  _|_|_|_|  _|_|      _|_|      _|    _|    _|  _|    _|  _|    _|
  // _|        _|    _|  _|            _|_|      _|_|  _|    _|    _|  _|    _|  _|    _|
  //   _|_|_|  _|    _|    _|_|_|  _|_|_|    _|_|_|    _|    _|    _|    _|_|_|  _|    _|
  //
  //

  type Chessman = Piece | Pawn

  interface Piece {
    symbol: Alt.Exclude<Symbol, '♙' | '♟' >
  }

  interface Pawn {
    symbol: Alt.Extract<Symbol, '♙' | '♟'>
    hasAdvancedTwoSquares: boolean
  }

  type Symbol = '♔' | '♕' | '♖' | '♗' | '♘' | '♙' | '♚' | '♛' | '♜' | '♝' | '♞' | '♟' // colored

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
