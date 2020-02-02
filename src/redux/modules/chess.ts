import { injectable } from 'inversify'
import { Action, Reducer } from 'redux'
import { SagaIterator } from 'redux-saga'

import { takeEvery } from '~/lib/boni/redux-saga/effects'

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
    pieces: Chess.CoordinatedPiece[]
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
export /* for testing */ const HALF_MOVE = '@@react-app-base/chess/HALF_MOVE' // neither castle nor capture pawn en passant

const chessActionTypes = [
  RESET_BOARD,
  HALF_MOVE,
]

interface ResetBoardAction extends Action<typeof RESET_BOARD> {} // TODO: chess 960

interface HalfMoveAction extends Action<typeof HALF_MOVE> {
  payload: {
    piece: Chess.CoordinatedPiece
    target: Chess.Coordinates
  }
}

export type ChessAction =
  | ResetBoardAction
  | HalfMoveAction

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

export const halfMove = (piece: Chess.CoordinatedPiece, target: Chess.Coordinates): HalfMoveAction => ({
  type: HALF_MOVE,
  payload: {
    piece,
    target,
  },
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
          { piece: '♖', coord: { file: 1, rank: 1 } },
          { piece: '♘', coord: { file: 2, rank: 1 } },
          { piece: '♗', coord: { file: 3, rank: 1 } },
          { piece: '♕', coord: { file: 4, rank: 1 } },
          { piece: '♔', coord: { file: 5, rank: 1 } },
          { piece: '♗', coord: { file: 6, rank: 1 } },
          { piece: '♘', coord: { file: 7, rank: 1 } },
          { piece: '♖', coord: { file: 8, rank: 1 } },
          { piece: '♙', coord: { file: 1, rank: 2 } },
          { piece: '♙', coord: { file: 2, rank: 2 } },
          { piece: '♙', coord: { file: 3, rank: 2 } },
          { piece: '♙', coord: { file: 4, rank: 2 } },
          { piece: '♙', coord: { file: 5, rank: 2 } },
          { piece: '♙', coord: { file: 6, rank: 2 } },
          { piece: '♙', coord: { file: 7, rank: 2 } },
          { piece: '♙', coord: { file: 8, rank: 2 } },
          { piece: '♟', coord: { file: 1, rank: 7 } },
          { piece: '♟', coord: { file: 2, rank: 7 } },
          { piece: '♟', coord: { file: 3, rank: 7 } },
          { piece: '♟', coord: { file: 4, rank: 7 } },
          { piece: '♟', coord: { file: 5, rank: 7 } },
          { piece: '♟', coord: { file: 6, rank: 7 } },
          { piece: '♟', coord: { file: 7, rank: 7 } },
          { piece: '♟', coord: { file: 8, rank: 7 } },
          { piece: '♜', coord: { file: 1, rank: 8 } },
          { piece: '♞', coord: { file: 2, rank: 8 } },
          { piece: '♝', coord: { file: 3, rank: 8 } },
          { piece: '♛', coord: { file: 4, rank: 8 } },
          { piece: '♚', coord: { file: 5, rank: 8 } },
          { piece: '♝', coord: { file: 6, rank: 8 } },
          { piece: '♞', coord: { file: 7, rank: 8 } },
          { piece: '♜', coord: { file: 8, rank: 8 } },
        ],
      },
    }
    case HALF_MOVE: return state
  }
}

//
//                                           _|
//   _|_|_|    _|_|    _|  _|_|  _|      _|        _|_|_|    _|_|
// _|_|      _|_|_|_|  _|_|      _|      _|  _|  _|        _|_|_|_|
//     _|_|  _|        _|          _|  _|    _|  _|        _|
// _|_|_|      _|_|_|  _|            _|      _|    _|_|_|    _|_|_|
//
//

@injectable()
export class ChessService {
  private *halfMoveSaga({}: HalfMoveAction): SagaIterator {
    // TODO: check move

    // TODO: update board

    // TODO: turn
  }

  public *rootSaga(): SagaIterator {
    yield takeEvery(HALF_MOVE, [this, this.halfMoveSaga])
  }
}
