import * as React from 'react'
import Helmet from 'react-helmet'
import { v4 } from 'uuid'

import { Repository } from '../../githubResourceTypes'
import { Result, HttpClientActionDispatcher } from '../../redux/modules/httpClient'

export interface StateProps {
  results: Result[]
}

export interface DispatchProps {
  dispatchedActions: HttpClientActionDispatcher
}

interface LocalState {
  resultId: string
}

type Props = StateProps & DispatchProps

export default class Info extends React.Component<Props, LocalState> {
  public state: Readonly<LocalState> = {
    resultId: v4(),
  }

  public componentDidMount() {
    const { dispatchedActions: { fetch } } = this.props
    const { resultId } = this.state

    // TODO: 環境変数を検査するメカニズムを導入する。
    if (process.env.GITHUB_API_V3_ORIGIN === undefined) {
      throw new TypeError('The GITHUB_API_V3_ORIGIN environment variable does not exist.')
    }

    // TODO: no-process-env を有効にする。
    fetch(resultId, 'GET', `${ process.env.GITHUB_API_V3_ORIGIN }/repos/sueka/react-app-prototype`)
  }

  public render() {
    const { results } = this.props
    const { resultId } = this.state

    const result = results.find(({ id }) => resultId === id)

    if (result === undefined) {
      return (
        <p>
          <Helmet>
            <title>info</title>
          </Helmet>
          Fetching not started.
        </p>
      )
    }

    if (result.response === null) {
      return (
        <p>
          <Helmet>
            <title>info</title>
          </Helmet>
          Fetching..
        </p>
      )
    }

    if (result.response.statusCode !== 200) {
      return (
        <p>
          <Helmet>
            <title>info</title>
          </Helmet>
          Fetching done with non-200.
        </p>
      )
    }

    // NOTE: result.response.body を Json (defined in src/commonTypes.ts) から Repository へダウンキャストする。
    const repo = result.response.body as Repository

    return (
      <p>
        <Helmet>
          <title>info</title>
        </Helmet>
        { repo.name }
      </p>
    )
  }
}
