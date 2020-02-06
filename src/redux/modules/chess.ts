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
    chessmen: Map<Chess.Coordinates, Chess.Chessman>
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
    chessman: Chess.Chessman
    source: Chess.Coordinates
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

export const halfMove = (chessman: Chess.Chessman, source: Chess.Coordinates, target: Chess.Coordinates): HalfMoveAction => ({
  type: HALF_MOVE,
  payload: {
    chessman,
    source,
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
        chessmen: new Map([
          [{ rank: 1, file: 1 }, { symbol: '♖' }],
          [{ rank: 1, file: 2 }, { symbol: '♘' }],
          [{ rank: 1, file: 3 }, { symbol: '♗' }],
          [{ rank: 1, file: 4 }, { symbol: '♕' }],
          [{ rank: 1, file: 5 }, { symbol: '♔' }],
          [{ rank: 1, file: 6 }, { symbol: '♗' }],
          [{ rank: 1, file: 7 }, { symbol: '♘' }],
          [{ rank: 1, file: 8 }, { symbol: '♖' }],
          [{ rank: 2, file: 1 }, { symbol: '♙', hasAdvancedTwoSquares: false }],
          [{ rank: 2, file: 2 }, { symbol: '♙', hasAdvancedTwoSquares: false }],
          [{ rank: 2, file: 3 }, { symbol: '♙', hasAdvancedTwoSquares: false }],
          [{ rank: 2, file: 4 }, { symbol: '♙', hasAdvancedTwoSquares: false }],
          [{ rank: 2, file: 5 }, { symbol: '♙', hasAdvancedTwoSquares: false }],
          [{ rank: 2, file: 6 }, { symbol: '♙', hasAdvancedTwoSquares: false }],
          [{ rank: 2, file: 7 }, { symbol: '♙', hasAdvancedTwoSquares: false }],
          [{ rank: 2, file: 8 }, { symbol: '♙', hasAdvancedTwoSquares: false }],
          [{ rank: 7, file: 1 }, { symbol: '♟', hasAdvancedTwoSquares: false }],
          [{ rank: 7, file: 2 }, { symbol: '♟', hasAdvancedTwoSquares: false }],
          [{ rank: 7, file: 3 }, { symbol: '♟', hasAdvancedTwoSquares: false }],
          [{ rank: 7, file: 4 }, { symbol: '♟', hasAdvancedTwoSquares: false }],
          [{ rank: 7, file: 5 }, { symbol: '♟', hasAdvancedTwoSquares: false }],
          [{ rank: 7, file: 6 }, { symbol: '♟', hasAdvancedTwoSquares: false }],
          [{ rank: 7, file: 7 }, { symbol: '♟', hasAdvancedTwoSquares: false }],
          [{ rank: 7, file: 8 }, { symbol: '♟', hasAdvancedTwoSquares: false }],
          [{ rank: 8, file: 1 }, { symbol: '♜' }],
          [{ rank: 8, file: 2 }, { symbol: '♞' }],
          [{ rank: 8, file: 3 }, { symbol: '♝' }],
          [{ rank: 8, file: 4 }, { symbol: '♛' }],
          [{ rank: 8, file: 5 }, { symbol: '♚' }],
          [{ rank: 8, file: 6 }, { symbol: '♝' }],
          [{ rank: 8, file: 7 }, { symbol: '♞' }],
          [{ rank: 8, file: 8 }, { symbol: '♜' }],
        ]),
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
