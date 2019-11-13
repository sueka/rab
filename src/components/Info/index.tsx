import React from 'react'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import assert from 'assert'
import { either } from 'fp-ts'
import { resolve } from 'inversify-react'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import GetRepo from '~/useCase/GetRepo'

import messages from './messages'

type Props =
  & InjectedIntlProps

interface LocalState {
  successful: boolean
  fetching: boolean
  repo?: either.Either<Error, GitHubApiResource.Repository> | null
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

    this.getRepo.apply({ owner: 'sueka', repo: 'react-app-prototype' })
      .then((output) => {
        if (output.successful) {
          this.setState({
            successful: true,
            fetching: false,
            repo: either.right(output.response.body),
          })
        } else {
          this.setState({
            successful: false,
            fetching: false,
            repo: either.left(new Error(output.response.body.message)),
          })
        }
      })
      .catch((reason: unknown) => {
        console.error(reason) // tslint:disable-line:no-console

        this.setState({
          successful: false,
          fetching: false,
          repo: null,
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
        if (either.isRight(repo)) {
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
      return repo
    }

    if (either.isLeft(repo)) {
      return repo.toString()
    }

    return repo.right.name
  }

  public render() {
    return (
      <>
        <Button onClick={ this.handleClick } disabled={ this.state.fetching } variant="contained" color="secondary">
          <FormattedMessage { ...messages.fetchData } />
        </Button>
        <Typography>
          { this.statusText }
        </Typography>
        { this.info != null && ( // tslint:disable-line:strict-boolean-expressions
          <Typography component="span">{ this.info }</Typography>
        ) }
      </>
    )
  }
}

export default injectIntl(Info)
