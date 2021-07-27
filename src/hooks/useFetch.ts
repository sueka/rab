import { useEffect, useState } from 'react'

import { shouldBePresent } from '~/asserters/commonAsserters'
import fetch, { NoAnyResponse } from '~/fetch'

// TODO: remove?
type PromiseState =
  | 'pending'
  | 'fulfilled'
  | 'rejected'

/**
 * A hook to suspend a fetch result.
 *
 * @throws `Promise<void>` while pending.
 * @throws `Error` if rejected.
 */
export default function useFetch(input: RequestInfo, init?: RequestInit) {
  const [fetchPromise, setFetchPromise] = useState<Promise<NoAnyResponse> | null>(null)
  const [response, setResponse] = useState<NoAnyResponse | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [state, setState] = useState<PromiseState | null>(null)

  useEffect(() => {
    setFetchPromise(fetch(input, init))
    setState('pending')
  }, [input, init])

  switch (state) {
    case 'pending':
      shouldBePresent(fetchPromise)

      throw fetchPromise.then((value) => {
        setResponse(value)
        setState('fulfilled')
      }).catch((reason) => {
        if (!(reason instanceof Error)) {
          throw new TypeError('Non-error reason caught.')
        }

        setError(reason)
        setState('rejected')
      })
    case null:
    case 'fulfilled': return response
    case 'rejected': throw error
  }
}
