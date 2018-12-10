import * as React from 'react'
import { connect } from 'react-redux'

import { State } from '../../redux'
import { HttpClientAction, tryToFetch } from '../../redux/modules/httpClient'

interface StateProps {
  data: string
}

interface DispatchProps {
  _tryToFetch(method: unknown, endpoint: string): HttpClientAction
}

type Props = StateProps & DispatchProps

const mapStateToProps = ({ info: { response } }: State): StateProps => ({
  data: response.caseOf({
    just: ({ body }) => body,
    nothing: () => 'No data.',
  }),
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
      <>
        {data}
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)
