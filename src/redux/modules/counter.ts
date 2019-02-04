import { Dispatch, Action, Reducer } from 'redux'

import { delay } from '../../commonFunctions'

//
//             _|                  _|
//   _|_|_|  _|_|_|_|    _|_|_|  _|_|_|_|    _|_|
// _|_|        _|      _|    _|    _|      _|_|_|_|
//     _|_|    _|      _|    _|    _|      _|
// _|_|_|        _|_|    _|_|_|      _|_|    _|_|_|
//
//

export interface CounterState {
  count: number
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

export const NOP = '@@react-app-prototype/counter/NOP'
export const INCREMENT = '@@react-app-prototype/counter/INCREMENT'
export const DECREMENT = '@@react-app-prototype/counter/DECREMENT'

const counterActionTypes = [NOP, INCREMENT, DECREMENT]

interface NopAction extends Action<typeof NOP> {}

interface IncrementAction extends Action<typeof INCREMENT> {}

interface DecrementAction extends Action<typeof DECREMENT> {}

export type CounterAction = NopAction | IncrementAction | DecrementAction

function isCounterAction(action: Action): action is CounterAction {
  return counterActionTypes.some((counterActionType) => counterActionType === action.type)
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

export const nop = (): NopAction => ({
  type: NOP,
})

export const increment = (): IncrementAction => ({
  type: INCREMENT,
})

export const decrement = (): DecrementAction => ({
  type: DECREMENT,
})

//
//                       _|      _|
//   _|_|_|    _|_|_|  _|_|_|_|        _|_|    _|_|_|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
//   _|_|_|    _|_|_|      _|_|  _|    _|_|    _|    _|
//
//
//
// _|                                  _|  _|
// _|_|_|      _|_|_|  _|_|_|      _|_|_|  _|    _|_|    _|  _|_|    _|_|_|
// _|    _|  _|    _|  _|    _|  _|    _|  _|  _|_|_|_|  _|_|      _|_|
// _|    _|  _|    _|  _|    _|  _|    _|  _|  _|        _|            _|_|
// _|    _|    _|_|_|  _|    _|    _|_|_|  _|    _|_|_|  _|        _|_|_|
//
//

const handleNop = (state: CounterState, _action: NopAction) => state

const handleIncrement = ({ count }: CounterState, _action: IncrementAction) => ({
  count: count + 1,
})

const handleDecrement = ({ count }: CounterState, _action: DecrementAction) => ({
  count: count - 1,
})

//
//                       _|      _|
//   _|_|_|    _|_|_|  _|_|_|_|        _|_|    _|_|_|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
//   _|_|_|    _|_|_|      _|_|  _|    _|_|    _|    _|
//
//
//
//       _|  _|                                  _|                _|
//   _|_|_|        _|_|_|  _|_|_|      _|_|_|  _|_|_|_|    _|_|_|  _|_|_|      _|_|    _|  _|_|
// _|    _|  _|  _|_|      _|    _|  _|    _|    _|      _|        _|    _|  _|_|_|_|  _|_|
// _|    _|  _|      _|_|  _|    _|  _|    _|    _|      _|        _|    _|  _|        _|
//   _|_|_|  _|  _|_|_|    _|_|_|      _|_|_|      _|_|    _|_|_|  _|    _|    _|_|_|  _|
//                         _|
//                         _|

export class CounterActionDispatcher {
  private dispatch: Dispatch

  constructor(dispatch: Dispatch) {
    this.dispatch = dispatch
  }

  private nop: typeof nop = (...args) => this.dispatch(nop(...args))

  public increment: typeof increment = (...args) => this.dispatch(increment(...args))

  public decrement: typeof decrement = (...args) => this.dispatch(decrement(...args))

  public incrementIfOdd = (value: number) => (value % 2 !== 0) ? this.increment() : this.nop()

  /**
   * incrementAsync
   *
   * @param ms - delay in milliseconds
   */
  public incrementAsync = async (ms: number) => await delay(ms).then(() => this.increment())
}

//
//                           _|
// _|  _|_|    _|_|      _|_|_|  _|    _|    _|_|_|    _|_|    _|  _|_|
// _|_|      _|_|_|_|  _|    _|  _|    _|  _|        _|_|_|_|  _|_|
// _|        _|        _|    _|  _|    _|  _|        _|        _|
// _|          _|_|_|    _|_|_|    _|_|_|    _|_|_|    _|_|_|  _|
//
//

export const createCounterReducer: (initialState: CounterState) => Reducer<CounterState, Action> = (initialState) => (state = initialState, action) => {
  if (!isCounterAction(action)) {
    return state
  }

  switch (action.type) {
    case NOP: return handleNop(state, action)
    case INCREMENT: return handleIncrement(state, action)
    case DECREMENT: return handleDecrement(state, action)
  }
}
