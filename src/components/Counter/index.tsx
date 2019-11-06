import React, { useCallback } from 'react'
import { FormattedMessage } from 'react-intl'

import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Typography from '@material-ui/core/Typography'

import messages from './messages'

export interface StateProps {
  value: number
}

export interface DispatchProps {
  reset(): void
  increment(): void
  decrement(): void
  incrementIfOdd(): void
  incrementAsync(ms: number): void
}

type Props =
  & StateProps
  & DispatchProps

const Counter: React.FunctionComponent<Props> = ({ value, reset, increment, decrement, incrementIfOdd, incrementAsync }) => {
  const handleIncrementAsync = useCallback(() => {
    incrementAsync(1000)
  }, [])

  return (
    <div>
      <Typography component="span">{ value }</Typography>
      <ButtonGroup>
        <Button onClick={ reset }><FormattedMessage { ...messages.reset } /></Button>
        <Button onClick={ increment }><FormattedMessage { ...messages.increment } /></Button>
        <Button onClick={ decrement }><FormattedMessage { ...messages.decrement } /></Button>
        <Button onClick={ incrementIfOdd } data-testid="incrementIfOddButton"><FormattedMessage { ...messages.incrementIfOdd } /></Button>
        <Button onClick={ handleIncrementAsync } data-testid="incrementAsyncButton"><FormattedMessage { ...messages.willIncrementInOneSecond } /></Button>
      </ButtonGroup>
    </div>
  )
}

export default Counter
