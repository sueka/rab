import * as React from 'react'
import Helmet from 'react-helmet'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import * as assert from 'assert'
import { resolve } from 'inversify-react'

import GetRepo from '../../useCase/GetRepo'
import messages from './messages'

type Props =
  & InjectedIntlProps

interface LocalState {
  successful: boolean
  fetching: boolean
  repo?: Repository | Error | null
}

class Info extends React.Component<Props, LocalState> {
  @resolve('GetRepo') private getRepo!: GetRepo

  public state: Readonly<LocalState> = {
    successful: true,
    fetching: false,
  }

  private handleClick: React.MouseEventHandler = () => {
    this.setState({
      fetching: true,
    })

    this.getRepo.apply({ owner: 'sueka', repo: 'react-app-prototype' }) // TODO: use Suspense
      .then((output) => {
        if (output.successful) {
          this.setState({
            successful: true,
            fetching: false,
            repo: output.response.body,
          })
        } else {
          this.setState({
            successful: false,
            fetching: false,
            repo: new Error(output.response.body.message),
          })
        }
      })
      .catch((reason) => {
        this.setState({
          successful: false,
          fetching: false,
          repo: reason,
        })
      })
  }

  private get statusText() {
    const { intl: { formatMessage } } = this.props
    const { successful, fetching, repo } = this.state

    if (fetching) {
      return formatMessage(messages.fetching)
    } else {
      if (repo == null) {
        return formatMessage(messages.fetchingNotStarted)
      } else {
        if (!(repo instanceof Error)) {
          assert(successful)

          return formatMessage(messages.fetchingDoneSuccessfully)
        } else {
          assert(!successful)

          return formatMessage(messages.fetchingFailed)
        }
      }
    }
  }

  private get info() {
    const { repo } = this.state

    if (repo == null) {
      return null
    }

    if (repo instanceof Error) {
      return repo.toString()
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
