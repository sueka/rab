import * as React from 'react'
import Helmet from 'react-helmet'
import { FormattedMessage } from 'react-intl'

import messages from './messages'

export interface StateProps {
  value: number
}

export interface DispatchProps {
  reset(): void
  increment(): void
  decrement(): void
  incrementIfOdd(value: number): void
  incrementAsync(ms: number): void
}

type Props =
  & StateProps
  & DispatchProps

export default class Counter extends React.Component<Props> {
  private handleIncrementIfOdd = () => {
    const { value, incrementIfOdd } = this.props

    incrementIfOdd(value)
  }

  private handleIncrementAsync = () => {
    const { incrementAsync } = this.props

    incrementAsync(1000)
  }

  public render() {
    const { value, reset, increment, decrement } = this.props

    return (
      <div>
        <FormattedMessage { ...messages.title }>
          { (title) => (
            <Helmet>
              <title>{ title }</title>
            </Helmet>
          ) }
        </FormattedMessage>
        { value }
        <button onClick={ reset }><FormattedMessage { ...messages.reset } /></button>
        <button onClick={ increment }><FormattedMessage { ...messages.increment } /></button>
        <button onClick={ decrement }><FormattedMessage { ...messages.decrement } /></button>
        <button onClick={ this.handleIncrementIfOdd }><FormattedMessage { ...messages.incrementIfOdd } /></button>
        <button onClick={ this.handleIncrementAsync }><FormattedMessage { ...messages.incrementAsync } /></button>
      </div>
    )
  }
}
