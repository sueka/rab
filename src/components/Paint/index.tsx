import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import React, { useCallback, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { isOneOf } from '~/lib/guards/commonGuards'
import Canvas from './Canvas'
import Toolbox, { Props as ToolboxProps } from './Toolbox'
import messages from './messages'

// TODO: Remove
type Tool =
  | 'pen'
  | 'bucket'

const isCanvasLineCap = isOneOf('butt', 'round', 'square')
const isTool = isOneOf('pen', 'bucket')

const WIDTH = 320
const HEIGHT = 320

const Paint: React.FC = () => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>()
  const [lineCap, setLineCap] = useState<CanvasLineCap>('round')
  const [tool, setTool] = useState<Tool>('pen')

  const canvas = useCallback<React.RefCallback<HTMLCanvasElement>>((node) => {
    setContext(node?.getContext('2d'))
  }, [])

  const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
    context?.clearRect(0, 0, WIDTH, HEIGHT)
  }, [context])

  const handleToolChange = useCallback<ToolboxProps['onChange']>((_event, value) => {
    if (!isTool(value)) {
      return
    }

    setTool(value)
  }, [])

  const handlePenCapRadioChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    if (isCanvasLineCap(event.target.value)) {
      setLineCap(event.target.value)
    }
  }, [])

  useEffect(() => {
    if (context == null) {
      return
    }

    // tslint:disable-next-line:no-object-mutation
    context.lineCap = lineCap
  }, [context, lineCap])

  return (
    <>
      <Canvas width={ WIDTH } height={ HEIGHT } lineWidth={ 10 } ref={ canvas } context={ context } tool={ tool } />
      <Button onClick={ handleClick }>
        <FormattedMessage { ...messages.clear } />
      </Button>
      <Toolbox value={ tool } onChange={ handleToolChange } />
      <FormControl disabled={ tool !== 'pen' }>
        <FormLabel>line cap</FormLabel>
        <RadioGroup name="lineCap" value={ lineCap } onChange={ handlePenCapRadioChange }>
          <FormControlLabel value="butt" label="butt" control={ <Radio /> } />
          <FormControlLabel value="round" label="round" control={ <Radio /> } />
          <FormControlLabel value="square" label="square" control={ <Radio /> } />
        </RadioGroup>
      </FormControl>
    </>
  )
}

export default Paint
