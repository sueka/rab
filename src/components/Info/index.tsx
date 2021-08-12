import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { Octokit } from '@octokit/core'
import { Either, isLeft, right } from 'fp-ts/lib/Either'
import { resolve } from 'inversify-react'
import React from 'react'
import { FormattedMessage, WrappedComponentProps, injectIntl } from 'react-intl'

import { asGetRepoResponse } from '~/validators/gitHubApiResourceValidators'
import messages from './messages'

type Props =
  & WrappedComponentProps

interface State {
  successful: boolean
  fetching: boolean
  repo?: Either<Error, GitHubApi.Repository> | null
}

class Info extends React.Component<Props, State> {
  @resolve('Octokit') private readonly octokit!: Octokit

  public override state: Readonly<State> = {
    successful: true,
    fetching: false,
  }

  private handleClick: React.MouseEventHandler = () => {
    this.setState({
      fetching: true,
    })

    this.octokit.request('GET /repos/{owner}/{repo}', { owner: 'sueka', repo: 'rap' }).then(
      (output) => {
        this.setState({
          successful: true,
          fetching: false,
          repo: right(asGetRepoResponse(output.data)),
        })
      },
      (reason: unknown) => {
        console.error(reason) // tslint:disable-line:no-console

        this.setState({
          successful: false,
          fetching: false,
          repo: null,
        })
      }
    )
  }

  private get statusText() {
    const { intl: { formatMessage } } = this.props
    const { successful, fetching, repo } = this.state

    if (fetching) {
      return formatMessage(messages.fetching)
    } else if (!successful) {
      return formatMessage(messages.fetchingFailed)
    } else if (repo == null) {
      return formatMessage(messages.fetchingNotStarted)
    } else {
      return formatMessage(messages.fetchingDoneSuccessfully)
    }
  }

  private get info() {
    const { repo } = this.state

    if (repo == null) {
      return repo
    }

    if (isLeft(repo)) {
      return repo.toString()
    }

    return <Link href={ repo.right.html_url }>{ repo.right.full_name }</Link>
  }

  public override render() {
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
