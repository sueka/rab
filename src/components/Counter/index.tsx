import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Typography from '@mui/material/Typography'
import React, { memo, useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'

import { decrement, increment, incrementAsync, incrementIfOdd, reset, selectCount } from '~/redux/modules/counter'
import messages from './messages'

const Counter: React.FC = () => {
  const value = useSelector(selectCount)

  const dispatch = useDispatch()
  const handleReset = useCallback(() => { dispatch(reset()) }, [dispatch])
  const handleIncrement = useCallback(() => { dispatch(increment()) }, [dispatch])
  const handleDecrement = useCallback(() => { dispatch(decrement()) }, [dispatch])
  const handleIncrementIfOdd = useCallback(() => { dispatch(incrementIfOdd()) }, [dispatch])
  const handleIncrementAsync = useCallback(() => { dispatch(incrementAsync(1000)) }, [dispatch])

  return (
    <div>
      <Typography component="span">{ value }</Typography>
      <ButtonGroup>
        <Button onClick={ handleReset }><FormattedMessage { ...messages.reset } /></Button>
        <Button onClick={ handleIncrement }><FormattedMessage { ...messages.increment } /></Button>
        <Button onClick={ handleDecrement }><FormattedMessage { ...messages.decrement } /></Button>
        <Button onClick={ handleIncrementIfOdd } data-testid="incrementIfOddButton"><FormattedMessage { ...messages.incrementIfOdd } /></Button>
        <Button onClick={ handleIncrementAsync } data-testid="incrementAsyncButton"><FormattedMessage { ...messages.willIncrementInOneSecond } /></Button>
      </ButtonGroup>
    </div>
  )
}

export default memo(Counter)
