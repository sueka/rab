import * as React from 'react'
import Helmet from 'react-helmet'
import { FormattedMessage } from 'react-intl'

import container from '../../container'
import { Repository } from '../../githubResourceTypes'
import { GitHubApi } from '../../useCase'
import messages from './messages'

interface LocalState {
  response: {
    status: number
    body: Repository
  } | null
}

export default class Info extends React.Component<{}, LocalState> {
  private gitHubApi: GitHubApi = container.get('GitHubApi')

  public state: Readonly<LocalState> = {
    response: null,
  }

  public componentDidMount() {
    this.gitHubApi.getRepo({ owner: 'sueka', repo: 'react-app-prototype' }).then(({ response: { status }, body }) => {
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
