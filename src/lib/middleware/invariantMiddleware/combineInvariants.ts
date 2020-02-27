import { Invariant } from './createInvariantMiddleware'

const combineInvariants: <S extends Record<K, V>, K extends keyof S = keyof S, V extends S[K] = S[K]>(invariants: {
  [P in keyof S]?: Invariant<S[P]>
}) => Invariant<S> = (invariants) => (state) => {
  for (const [moduleName, moduleState] of Object.entries(state)) {
    if (!(invariants[moduleName]?.(moduleState) ?? true)) {
      return false
    }
  }

  return true
}

export default combineInvariants
