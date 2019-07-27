import * as React from 'react'
import { FormattedMessage } from 'react-intl'

import Button from '@material-ui/core/Button'

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
        { value }
        <Button onClick={ reset }><FormattedMessage { ...messages.reset } /></Button>
        <Button onClick={ increment }><FormattedMessage { ...messages.increment } /></Button>
        <Button onClick={ decrement }><FormattedMessage { ...messages.decrement } /></Button>
        <Button onClick={ this.handleIncrementIfOdd } data-testid="incrementIfOddButton"><FormattedMessage { ...messages.incrementIfOdd } /></Button>
        <Button onClick={ this.handleIncrementAsync } data-testid="incrementAsyncButton"><FormattedMessage { ...messages.willIncrementInOneSecond } /></Button>
      </div>
    )
  }
}
