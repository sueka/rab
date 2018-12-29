import * as React from 'react'

import { Repository } from '../../githubResourceTypes'
import { Call, tryToFetch } from '../../redux/modules/httpClient'

export interface StateProps {
  calls: Call[]
}

export interface DispatchProps {
  _tryToFetch: typeof tryToFetch
}

type Props = StateProps & DispatchProps

interface LocalState {
  callId?: string
}

export default class Info extends React.Component<Props, LocalState> {

  // NOTE: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/826ce0f1ce1d1887d199986283630d6f63075ad5/types/react/index.d.ts#L419 にも関わらず、初期化されていない state は null であるため、初期化を強制するためにプロパティ宣言を行う。
  public state: Readonly<LocalState>

  constructor(props: Props) {
    super(props)

    this.state = {}
  }

  public componentDidMount() {
    const { _tryToFetch } = this.props

    const { payload } = _tryToFetch('GET', 'https://api.github.com/repos/sueka/react-app-prototype')

    this.setState({
      callId: payload.callId,
    })
  }

  public render() {
    const { calls } = this.props
    const { callId } = this.state

    const call = calls.find(({ id }) => (callId !== undefined) ? callId === id : false)

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

    // NOTE: call.response.body を Json (defined in src/commonTypes.ts) から Repository へダウンキャストする。
    const repo = call.response.body as Repository

    return (
      <p>
        { repo.name }
      </p>
    )
  }
}
