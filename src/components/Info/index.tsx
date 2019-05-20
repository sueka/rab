import * as React from 'react'
import Helmet from 'react-helmet'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'

import container from '../../container'
import { Repository } from '../../githubResourceTypes'
import { GitHubApi } from '../../useCase'
import messages from './messages'

type Props =
  & InjectedIntlProps

interface LocalState {
  response: {
    status: number
    body: Repository
  } | null
}

class Info extends React.Component<Props, LocalState> {
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

  private get statusText() {
    const { intl: { formatMessage } } = this.props
    const { response } = this.state

    if (response === null) {
      return formatMessage(messages.fetchingNotDone)
    }

    if (response.status !== 200) {
      return formatMessage(messages.fetchingDoneWithNon200)
    }

    return response.body.name
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
        <p>
          { this.statusText }
        </p>
      </>
    )
  }
}

export default injectIntl(Info)
