import * as React from 'react'

import { Call, tryToFetch } from '../../redux/modules/httpClient'
import { Repository } from '../../githubResourceTypes'

interface Props {
  calls: Call[]
  _tryToFetch: typeof tryToFetch
}

let callId: string | null = null

export default class Info extends React.Component<Props> {
  public componentDidMount() {
    const { _tryToFetch } = this.props;

    ({ payload: { callId } } = _tryToFetch('GET', 'https://api.github.com/repos/sueka/react-app-prototype'))
  }

  public render() {
    const { calls } = this.props

    const call = calls.find(({ id }) => (callId !== null) ? callId === id : false)

    if (call === undefined) {
      return (
        <p>
          Fetching not started.
        </p>
      )
    }

    if (call.response === null) {
      return (
        <p>
          No data fetched.
        </p>
      )
    }

    // NOTE: call.response.body を {} から Repository へダウンキャストする。
    const repo = call.response.body as Repository

    return (
      <p>
        { repo.name }
      </p>
    )
  }
}
