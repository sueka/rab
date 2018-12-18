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

const mapStateToProps = ({ info: { calls } }: State): StateProps => ({
  calls,
})

const mapDispatchToProps: DispatchProps = {
  _tryToFetch: tryToFetch,
}

class Info extends React.Component<Props, State> {
  private callId: string | null = null

  public componentDidMount() {
    const { _tryToFetch } = this.props

    const action = _tryToFetch('GET', 'https://api.github.com/repos/sueka/react-app-prototype')

    const { callId } = action.payload

    this.callId = callId
  }

  public render() {
    const { calls } = this.props

    const call = calls.find(({ id }) => (this.callId !== null) ? this.callId === id : false)

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

    const repo = call.response.body as unknown as Repository

    return (
      <p>
        { repo.name }
      </p>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)
