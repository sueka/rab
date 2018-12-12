import * as React from 'react'
import { connect } from 'react-redux'
import { Maybe } from 'tsmonad'

import { State } from '../../redux'
import { HttpClient, HttpClientAction, tryToFetch } from '../../redux/modules/httpClient'
import { Repository } from '../../githubResourceTypes'

interface StateProps {
  calls: HttpClient.CallMapObject
}

interface DispatchProps {
  _tryToFetch(method: unknown, endpoint: string): HttpClientAction
}

type Props = StateProps & DispatchProps

const mapStateToProps = ({ info: { calls } }: State): StateProps => ({
  calls,
})

const mapDispatchToProps: DispatchProps = {
  _tryToFetch: tryToFetch,
}

class Info extends React.Component<Props, State> {
  private callId = Maybe.nothing<string>()

  public componentDidMount() {
    const { _tryToFetch } = this.props

    const action = _tryToFetch('GET', 'https://api.github.com/repos/sueka/react-app-prototype')

    switch (action.type) {
      case '@@react-app-prototype/httpClient/TRY_TO_FETCH':
        const { id } = action.payload

        this.callId = Maybe.just(id)
        break
      default:
        throw new TypeError(`${action.type} should not be created in this context.`)
    }
  }

  public render() {
    const { calls } = this.props

    const data = this.callId.caseOf({
      just: (callId) => calls[callId],
      nothing: () => Maybe.nothing<HttpClient.Response>(),
    }).fmap(({ body }) => body as unknown as Repository)

    return (
      <p>
        {data.caseOf({
          just: (repository) => repository.name,
          nothing: () => 'No data fetched.',
        })}
      </p>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)
