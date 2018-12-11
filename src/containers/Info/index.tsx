import * as React from 'react'
import { connect } from 'react-redux'
import { Maybe } from 'tsmonad'

import { State } from '../../redux'
import { HttpClientAction, tryToFetch } from '../../redux/modules/httpClient'
import { Repository } from '../../githubResourceTypes'

interface StateProps {
  data: Maybe<Repository>
}

interface DispatchProps {
  _tryToFetch(method: unknown, endpoint: string): HttpClientAction
}

type Props = StateProps & DispatchProps

const mapStateToProps = ({ info: { response } }: State): StateProps => ({
  data: response.fmap(({ body }) => body as unknown as Repository),
})

const mapDispatchToProps: DispatchProps = {
  _tryToFetch: tryToFetch,
}

class Info extends React.Component<Props, State> {
  public componentDidMount() {
    const { _tryToFetch } = this.props

    _tryToFetch('GET', 'https://api.github.com/repos/sueka/react-app-prototype')
  }

  public render() {
    const { data } = this.props

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
