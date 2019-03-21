import * as React from 'react'
import Helmet from 'react-helmet'

import { Repository } from '../../githubResourceTypes'
import { GitHubApi } from '../../useCase'

export interface StateProps {
  gitHubApi: GitHubApi
}

interface LocalState {
  response: {
    status: number
    body: Repository
  } | null
}

type Props = StateProps

export default class Info extends React.Component<Props, LocalState> {
  public state: Readonly<LocalState> = {
    response: null,
  }

  public componentDidMount() {
    const { gitHubApi } = this.props

    gitHubApi.getRepo({ owner: 'sueka', repo: 'react-app-prototype' }).then(({ response: { status }, body }) => {
      this.setState({
        response: { status, body },
      })
    })
  }

  public render() {
    const { response } = this.state

    if (response === null) {
      return (
        <p>
          <Helmet>
            <title>info</title>
          </Helmet>
          Fetching not done.
        </p>
      )
    }

    if (response.status !== 200) {
      return (
        <p>
          <Helmet>
            <title>info</title>
          </Helmet>
          Fetching done with non-200.
        </p>
      )
    }

    return (
      <p>
        <Helmet>
          <title>info</title>
        </Helmet>
        { response.body.name }
      </p>
    )
  }
}
