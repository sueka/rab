import React, { useCallback, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'

import Canvas from '~/components/Canvas'
import ClearCanvasButton from '~/components/ClearCanvasButton'
import Toolbox, { Props as ToolboxProps } from '~/components/Toolbox'
import { isOneOf } from '~/lib/guards/commonGuards'
import messages from './messages'

// TODO: remove
type Tool =
  | 'pen'

const isCanvasLineCap = isOneOf('butt', 'round', 'square')
const isTool = isOneOf('pen')

const Paint: React.FunctionComponent = () => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>()
  const [lineCap, setLineCap] = useState<CanvasLineCap>('round')
  const [tool, setTool] = useState<Tool>('pen')

  const canvas = useCallback((node: HTMLCanvasElement | null) => {
    setContext(node?.getContext('2d'))
  }, [])

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
      <Canvas width={ 320 } height={ 320 } lineWidth={ 10 } ref={ canvas } context={ context } tool={ tool } />
      <ClearCanvasButton width={ 320 } height={ 320 } context={ context }><FormattedMessage { ...messages.clear } /></ClearCanvasButton>
      <Toolbox value={ tool } onChange={ handleToolChange } />
      <FormControl>
        <FormLabel>line cap</FormLabel>
        <RadioGroup value={ lineCap } onChange={ handlePenCapRadioChange }>
          <FormControlLabel value="butt" label="butt" control={ <Radio /> } />
          <FormControlLabel value="round" label="round" control={ <Radio /> } />
          <FormControlLabel value="square" label="square" control={ <Radio /> } />
        </RadioGroup>
      </FormControl>
    </>
  )
}

export default Paint
