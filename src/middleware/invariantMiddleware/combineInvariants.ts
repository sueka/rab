import { Invariant } from './createInvariantMiddleware'

const combineInvariants: <S extends Record<K, V>, K extends keyof S = keyof S, V extends S[K] = S[K]>(invariants: {
  [P in keyof S]?: Invariant<S[P]>
}) => Invariant<S> = (invariants) => (state) => {
  return Object.entries(state).every(([moduleName, moduleState]) => {
    return invariants[moduleName]?.(moduleState) ?? true
  })
}

export default combineInvariants
