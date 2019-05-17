import * as React from 'react'
import Helmet from 'react-helmet'
import { FormattedMessage } from 'react-intl'

import { Repository } from '../../githubResourceTypes'
import { GitHubApi } from '../../useCase'
import messages from './messages'

export interface StateProps {
  gitHubApi: GitHubApi
}

interface LocalState {
  response: {
    status: number
    body: Repository
  } | null
}

type Props =
  & StateProps

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
          <FormattedMessage { ...messages.title }>
            { (title) => (
              <Helmet>
                <title>{ title }</title>
              </Helmet>
            ) }
          </FormattedMessage>
          <FormattedMessage { ...messages.fetchingNotDone } />
        </p>
      )
    }

    if (response.status !== 200) {
      return (
        <p>
          <FormattedMessage { ...messages.title }>
            { (title) => (
              <Helmet>
                <title>{ title }</title>
              </Helmet>
            ) }
          </FormattedMessage>
          <FormattedMessage { ...messages.fetchingDoneWithNon200 } />
        </p>
      )
    }

    return (
      <p>
        <FormattedMessage { ...messages.title }>
          { (title) => (
            <Helmet>
              <title>{ title }</title>
            </Helmet>
          ) }
        </FormattedMessage>
        { response.body.name }
      </p>
    )
  }
}
