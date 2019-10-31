import { Action, Reducer } from 'redux'

import { CoordinatedPiece } from '~/types/chessTypes'

//
//             _|                  _|
//   _|_|_|  _|_|_|_|    _|_|_|  _|_|_|_|    _|_|
// _|_|        _|      _|    _|    _|      _|_|_|_|
//     _|_|    _|      _|    _|    _|      _|
// _|_|_|        _|_|    _|_|_|      _|_|    _|_|_|
//
//

export interface ChessState {
  board: {
    pieces: CoordinatedPiece[]
  }
}

//
//                       _|      _|
//   _|_|_|    _|_|_|  _|_|_|_|        _|_|    _|_|_|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
//   _|_|_|    _|_|_|      _|_|  _|    _|_|    _|    _|
//
//
//
//   _|
// _|_|_|_|  _|    _|  _|_|_|      _|_|      _|_|_|
//   _|      _|    _|  _|    _|  _|_|_|_|  _|_|
//   _|      _|    _|  _|    _|  _|            _|_|
//     _|_|    _|_|_|  _|_|_|      _|_|_|  _|_|_|
//                 _|  _|
//             _|_|    _|

export /* for testing */ const RESET_BOARD = '@@react-app-base/chess/RESET_BOARD'

const chessActionTypes = [
  RESET_BOARD,
]

interface ResetBoardAction extends Action<typeof RESET_BOARD> {} // TODO: chess 960

export type ChessAction =
  | ResetBoardAction

function isChessAction(action: Action): action is ChessAction {
  return chessActionTypes.includes(action.type)
}

//
//                       _|      _|
//   _|_|_|    _|_|_|  _|_|_|_|        _|_|    _|_|_|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
//   _|_|_|    _|_|_|      _|_|  _|    _|_|    _|    _|
//
//
//
//                                           _|
//   _|_|_|  _|  _|_|    _|_|      _|_|_|  _|_|_|_|    _|_|    _|  _|_|    _|_|_|
// _|        _|_|      _|_|_|_|  _|    _|    _|      _|    _|  _|_|      _|_|
// _|        _|        _|        _|    _|    _|      _|    _|  _|            _|_|
//   _|_|_|  _|          _|_|_|    _|_|_|      _|_|    _|_|    _|        _|_|_|
//
//

export const resetBoard = (): ResetBoardAction => ({
  type: RESET_BOARD,
})

//
//                           _|
// _|  _|_|    _|_|      _|_|_|  _|    _|    _|_|_|    _|_|    _|  _|_|
// _|_|      _|_|_|_|  _|    _|  _|    _|  _|        _|_|_|_|  _|_|
// _|        _|        _|    _|  _|    _|  _|        _|        _|
// _|          _|_|_|    _|_|_|    _|_|_|    _|_|_|    _|_|_|  _|
//
//

export const createChessReducer: (initialState: ChessState) => Reducer<ChessState, Action> = (initialState) => (state = initialState, action) => {
  if (!isChessAction(action)) {
    return state
  }

  switch (action.type) {
    case RESET_BOARD: return {
      ...state,
      board: {
        pieces: [
          { piece: '♖', coord: { file: 'a', rank: '1' } },
          { piece: '♘', coord: { file: 'b', rank: '1' } },
          { piece: '♗', coord: { file: 'c', rank: '1' } },
          { piece: '♕', coord: { file: 'd', rank: '1' } },
          { piece: '♔', coord: { file: 'e', rank: '1' } },
          { piece: '♗', coord: { file: 'f', rank: '1' } },
          { piece: '♘', coord: { file: 'g', rank: '1' } },
          { piece: '♖', coord: { file: 'h', rank: '1' } },
          { piece: '♙', coord: { file: 'a', rank: '2' } },
          { piece: '♙', coord: { file: 'b', rank: '2' } },
          { piece: '♙', coord: { file: 'c', rank: '2' } },
          { piece: '♙', coord: { file: 'd', rank: '2' } },
          { piece: '♙', coord: { file: 'e', rank: '2' } },
          { piece: '♙', coord: { file: 'f', rank: '2' } },
          { piece: '♙', coord: { file: 'g', rank: '2' } },
          { piece: '♙', coord: { file: 'h', rank: '2' } },
          { piece: '♟', coord: { file: 'a', rank: '7' } },
          { piece: '♟', coord: { file: 'b', rank: '7' } },
          { piece: '♟', coord: { file: 'c', rank: '7' } },
          { piece: '♟', coord: { file: 'd', rank: '7' } },
          { piece: '♟', coord: { file: 'e', rank: '7' } },
          { piece: '♟', coord: { file: 'f', rank: '7' } },
          { piece: '♟', coord: { file: 'g', rank: '7' } },
          { piece: '♟', coord: { file: 'h', rank: '7' } },
          { piece: '♜', coord: { file: 'a', rank: '8' } },
          { piece: '♞', coord: { file: 'b', rank: '8' } },
          { piece: '♝', coord: { file: 'c', rank: '8' } },
          { piece: '♛', coord: { file: 'd', rank: '8' } },
          { piece: '♚', coord: { file: 'e', rank: '8' } },
          { piece: '♝', coord: { file: 'f', rank: '8' } },
          { piece: '♞', coord: { file: 'g', rank: '8' } },
          { piece: '♜', coord: { file: 'h', rank: '8' } },
        ],
      },
    }
  }
}
