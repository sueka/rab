import { Action } from 'redux'
import { ActionPattern, ForkEffect, takeEvery as originalTakeEvery } from 'redux-saga/effects'

/**
 * Same as `takeEvery(pattern, worker)` but supports passing a `this` context to `worker`.
 * This is useful to invoke object methods.
 *
 * derived from https://github.com/redux-saga/redux-saga/blob/0668e9149c8aa847cbfad9f03883b6b5b2946042/packages/core/effects.d.ts#L630-L633
 */
export default function takeEvery<
  A extends Action,
  Ctx,
>(
  pattern: ActionPattern<A>,
  [ctx, worker]: [Ctx, (this: Ctx, action: A) => unknown]
): ForkEffect {
  return originalTakeEvery(pattern, (action: A) => worker.call(ctx, action))
}
