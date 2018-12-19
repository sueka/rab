import * as React from 'react'
import { connect } from 'react-redux'

import { State } from '../../redux'
import { tryToFetch } from '../../redux/modules/httpClient'
import { Repository } from '../../githubResourceTypes'

interface StateProps {
  calls: State['info']['calls']
}

interface DispatchProps {
  _tryToFetch: typeof tryToFetch
}

type Props = StateProps & DispatchProps

let callId: string | null = null

const mapStateToProps = ({ info: { calls } }: State): StateProps => ({
  calls,
})

const mapDispatchToProps: DispatchProps = {
  _tryToFetch: tryToFetch,
}

class Info extends React.Component<Props, State> {
  public componentDidMount() {
    const { _tryToFetch } = this.props

    const action = _tryToFetch('GET', 'https://api.github.com/repos/sueka/react-app-prototype')

    ;({ callId } = action.payload)
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

    // NOTE: call.response.body を {} から Repository へダウンキャストする。 Body#json() が any 値を返すため、この非型安全性は回避できないが、 Repository インターフェイスが正確に書かれていれば、実質型安全である。
    const repo = call.response.body as Repository

    return (
      <p>
        { repo.name }
      </p>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)
