import React, { useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Typography from '@material-ui/core/Typography'

import { State } from '~/redux'
import { decrement, increment, incrementAsync, incrementIfOdd, reset } from '~/redux/modules/counter'
import messages from './messages'

interface StateProps {
  value: number
}

interface DispatchProps {
  reset(): void
  increment(): void
  decrement(): void
  incrementIfOdd(): void
  incrementAsync(ms: number): void
}

type Props =
  & StateProps
  & DispatchProps

export /* for testing */ const Counter: React.FunctionComponent<Props> = ({ value, reset, increment, decrement, incrementIfOdd, incrementAsync }) => {
  const handleIncrementAsync = useCallback(() => {
    incrementAsync(1000)
  }, [incrementAsync])

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

// connect

const mapStateToProps = ({ counter: { count } }: State): StateProps => ({
  value: count,
})

const mapDispatchToProps: DispatchProps = {
  reset,
  increment,
  decrement,
  incrementIfOdd,
  incrementAsync,
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
