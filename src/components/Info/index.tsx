import * as React from 'react'
import Helmet from 'react-helmet'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'

import { UnreachableError } from '../../lib/errors'
import container from '../../container'
import { Repository } from '../../types/gitHubResourceTypes'
import { GitHubApi } from '../../useCase'
import messages from './messages'

type Props =
  & InjectedIntlProps

interface LocalState {
  status: number | null
  fetching: boolean
  repo: Repository | null
}

class Info extends React.Component<Props, LocalState> {
  private gitHubApi: GitHubApi = container.get('GitHubApi')

  public state: Readonly<LocalState> = {
    status: null,
    fetching: false,
    repo: null,
  }

  private handleClick: React.MouseEventHandler = () => {
    this.setState({
      fetching: true,
    })

    this.gitHubApi.getRepo({ owner: 'sueka', repo: 'react-app-prototype' }).then(({ response: { status, body } }) => {
      this.setState({
        status,
        fetching: false,
        repo: body,
      })
    })
  }

  private get statusText() {
    const { intl: { formatMessage } } = this.props
    const { status, fetching } = this.state

    if (fetching) {
      return formatMessage(messages.fetching)
    }

    if (status === null) {
      return formatMessage(messages.fetchingNotStarted)
    }

    if (status === 200) {
      return formatMessage(messages.fetchingDoneWith200)
    }

    if (status !== 200) {
      return formatMessage(messages.fetchingDoneWithNon200)
    }

    throw new UnreachableError()
  }

  private get info() {
    const { repo } = this.state

    if (repo === null) {
      return null
    }

    return repo.name
  }

  public render() {
    return (
      <>
        <FormattedMessage { ...messages.title }>
          { (title) => (
            <Helmet>
              <title>{ title }</title>
            </Helmet>
          ) }
        </FormattedMessage>
        <button onClick={ this.handleClick } disabled={ this.state.fetching }>
          <FormattedMessage { ...messages.fetchData } />
        </button>
        <p>
          { this.statusText }
        </p>
        { this.info }
      </>
    )
  }
}

export default injectIntl(Info)
