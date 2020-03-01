import { Map } from 'immutable'
import { injectable } from 'inversify'
import { Action, Reducer } from 'redux'
import { SagaIterator } from 'redux-saga'
import { put, select } from 'redux-saga/effects'

import Coordinates from '~/domain/vo/Coordinates'
import { takeEvery } from '~/lib/boni/redux-saga/effects'
import equalsChessmen from '~/lib/extensions/Eq/equalsChessmen'
import { State } from '~/redux'
import getCoordinatesAttackedBy from '~/utils/chess/getCoordinatesAttackedBy'

//
//             _|                  _|
//   _|_|_|  _|_|_|_|    _|_|_|  _|_|_|_|    _|_|
// _|_|        _|      _|    _|    _|      _|_|_|_|
//     _|_|    _|      _|    _|    _|      _|
// _|_|_|        _|_|    _|_|_|      _|_|    _|_|_|
//
//

export interface ChessState {
  board: Chess.Chessboard
  picking?: {
    chessman: Chess.Chessman
    source: Chess.Coordinates
  } | null
  targets?: Chess.Coordinates[] | null
}

export function chessInvariant({ board, picking, targets }: ChessState) {
  return (
    (picking == null || (!board.chessmen.has(new Coordinates(picking.source)) || existsCoordinatedChessman(picking.chessman, picking.source, board))) && // any picking → (any chessman at picking.source on board → chessman at picking.source on board = picking.chessman)
    (picking != null || targets == null) // no picking → no targets
  )
}

function existsCoordinatedChessman(chessman: Chess.Chessman, coord: Chess.Coordinates, board: Chess.Chessboard): boolean {
  const actual = board.chessmen.get(new Coordinates(coord))

  return actual !== undefined && equalsChessmen(actual, chessman)
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

const RESET_BOARD = '@@react-app-base/chess/RESET_BOARD'
const HALF_MOVE = '@@react-app-base/chess/HALF_MOVE' // neither castle nor capture pawn en passant
const PICK_CHESSMAN = '@@react-app-base/chess/PICK_CHESSMAN'
const PUT_CHESSMAN = '@@react-app-base/chess/PUT_CHESSMAN'
const RELEASE_CHESSMAN = '@@react-app-base/chess/RELEASE_CHESSMAN'
const REMOVE_CHESSMAN = '@@react-app-base/chess/REMOVE_CHESSMAN'
const SET_TARGETS = '@@react-app-base/chess/SET_TARGETS'

const chessActionTypes = [
  RESET_BOARD,
  HALF_MOVE,
  PICK_CHESSMAN,
  PUT_CHESSMAN,
  RELEASE_CHESSMAN,
  REMOVE_CHESSMAN,
  SET_TARGETS,
]

type ResetBoardAction = ReturnType<typeof resetBoard> // TODO: chess 960
type HalfMoveAction = ReturnType<typeof halfMove>
type PickChessmanAction = ReturnType<typeof pickChessman>
type PutChessmanAction = ReturnType<typeof putChessman>
type ReleaseChessmanAction = ReturnType<typeof releaseChessman>
type RemoveChessmanAction = ReturnType<typeof removeChessman>
type SetTargets = ReturnType<typeof setTargets>

export type ChessAction =
  | ResetBoardAction
  | HalfMoveAction
  | PickChessmanAction
  | PutChessmanAction
  | ReleaseChessmanAction
  | RemoveChessmanAction
  | SetTargets

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

export const resetBoard = () => <const> ({
  type: RESET_BOARD,
})

export const halfMove = (chessman: Chess.Chessman, source: Chess.Coordinates, target: Chess.Coordinates) => <const> ({
  type: HALF_MOVE,
  payload: {
    chessman,
    source,
    target,
  },
})

export const pickChessman = (chessman: Chess.Chessman, source: Chess.Coordinates) => <const> ({
  type: PICK_CHESSMAN,
  payload: {
    chessman,
    source,
  },
})

export const putChessman = (chessman: Chess.Chessman, target: Chess.Coordinates) => <const> ({
  type: PUT_CHESSMAN,
  payload: {
    chessman,
    target,
  },
})

export const releaseChessman = () => <const> ({
  type: RELEASE_CHESSMAN,
})

export const removeChessman = (coord: Chess.Coordinates) => <const> ({
  type: REMOVE_CHESSMAN,
  payload: {
    coord,
  },
})

export const setTargets = (targets: Chess.Coordinates[]) => <const> ({
  type: SET_TARGETS,
  payload: {
    targets,
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
        chessmen: Map([
          [new Coordinates({ rank: 1, file: 1 }), { symbol: '♖' }],
          [new Coordinates({ rank: 1, file: 2 }), { symbol: '♘' }],
          [new Coordinates({ rank: 1, file: 3 }), { symbol: '♗' }],
          [new Coordinates({ rank: 1, file: 4 }), { symbol: '♕' }],
          [new Coordinates({ rank: 1, file: 5 }), { symbol: '♔' }],
          [new Coordinates({ rank: 1, file: 6 }), { symbol: '♗' }],
          [new Coordinates({ rank: 1, file: 7 }), { symbol: '♘' }],
          [new Coordinates({ rank: 1, file: 8 }), { symbol: '♖' }],
          [new Coordinates({ rank: 2, file: 1 }), { symbol: '♙', hasAdvancedTwoSquares: false }],
          [new Coordinates({ rank: 2, file: 2 }), { symbol: '♙', hasAdvancedTwoSquares: false }],
          [new Coordinates({ rank: 2, file: 3 }), { symbol: '♙', hasAdvancedTwoSquares: false }],
          [new Coordinates({ rank: 2, file: 4 }), { symbol: '♙', hasAdvancedTwoSquares: false }],
          [new Coordinates({ rank: 2, file: 5 }), { symbol: '♙', hasAdvancedTwoSquares: false }],
          [new Coordinates({ rank: 2, file: 6 }), { symbol: '♙', hasAdvancedTwoSquares: false }],
          [new Coordinates({ rank: 2, file: 7 }), { symbol: '♙', hasAdvancedTwoSquares: false }],
          [new Coordinates({ rank: 2, file: 8 }), { symbol: '♙', hasAdvancedTwoSquares: false }],
          [new Coordinates({ rank: 7, file: 1 }), { symbol: '♟', hasAdvancedTwoSquares: false }],
          [new Coordinates({ rank: 7, file: 2 }), { symbol: '♟', hasAdvancedTwoSquares: false }],
          [new Coordinates({ rank: 7, file: 3 }), { symbol: '♟', hasAdvancedTwoSquares: false }],
          [new Coordinates({ rank: 7, file: 4 }), { symbol: '♟', hasAdvancedTwoSquares: false }],
          [new Coordinates({ rank: 7, file: 5 }), { symbol: '♟', hasAdvancedTwoSquares: false }],
          [new Coordinates({ rank: 7, file: 6 }), { symbol: '♟', hasAdvancedTwoSquares: false }],
          [new Coordinates({ rank: 7, file: 7 }), { symbol: '♟', hasAdvancedTwoSquares: false }],
          [new Coordinates({ rank: 7, file: 8 }), { symbol: '♟', hasAdvancedTwoSquares: false }],
          [new Coordinates({ rank: 8, file: 1 }), { symbol: '♜' }],
          [new Coordinates({ rank: 8, file: 2 }), { symbol: '♞' }],
          [new Coordinates({ rank: 8, file: 3 }), { symbol: '♝' }],
          [new Coordinates({ rank: 8, file: 4 }), { symbol: '♛' }],
          [new Coordinates({ rank: 8, file: 5 }), { symbol: '♚' }],
          [new Coordinates({ rank: 8, file: 6 }), { symbol: '♝' }],
          [new Coordinates({ rank: 8, file: 7 }), { symbol: '♞' }],
          [new Coordinates({ rank: 8, file: 8 }), { symbol: '♜' }],
        ]),
      },
    }
    case HALF_MOVE: return state
    case PICK_CHESSMAN: return {
      ...state,
      picking: {
        chessman: action.payload.chessman,
        source: action.payload.source,
      },
    }
    case PUT_CHESSMAN: return {
      ...state,
      board: {
        ...state.board,
        chessmen: state.board.chessmen.set(new Coordinates(action.payload.target), action.payload.chessman), // TODO
      },
      picking: null,
      targets: null,
    }
    case RELEASE_CHESSMAN: return {
      ...state,
      picking: null,
      targets: null,
    }
    case REMOVE_CHESSMAN: return {
      ...state,
      board: {
        ...state.board,
        chessmen: state.board.chessmen.delete(new Coordinates(action.payload.coord)), // TODO
      },
    }
    case SET_TARGETS: return {
      ...state,
      targets: action.payload.targets,
    }
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
  private *halfMoveSaga({ payload: { chessman, source, target } }: HalfMoveAction): SagaIterator {
    // TODO: check move

    // TODO: castle

    // TODO: remove en passant

    yield put(removeChessman(source))
    yield put(putChessman(chessman, target))

    // TODO: turn
  }

  private *pickChessmanSaga({ payload: { chessman, source } }: PickChessmanAction): SagaIterator {
    const { chess: { board } }: State = yield select()

    const targets = getCoordinatesAttackedBy(chessman, source, board)

    yield put(setTargets(targets))
  }

  public *rootSaga(): SagaIterator {
    yield takeEvery(HALF_MOVE, [this, this.halfMoveSaga])
    yield takeEvery(PICK_CHESSMAN, [this, this.pickChessmanSaga])
  }
}
