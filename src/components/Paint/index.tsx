import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import React, { useCallback, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { isOneOf } from '~/guards/commonGuards'
import useScreen from '~/hooks/useScreen'
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
  const [lineWidth, setLineWidth] = useState<number>(10)
  const [tool, setTool] = useState<Tool>('pen')
  const { dpr } = useScreen()

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

  const handleLineWidthSliderChange = useCallback<Required<React.PropsOf<typeof Slider>>['onChange']>((_event, value) => {
    if (Array.isArray(value)) {
      throw new Error
    }

    setLineWidth(value)
  }, [])

  useEffect(() => {
    if (context == null) {
      return
    }

    context.lineCap = lineCap
  }, [context, lineCap])

  return (
    <>
      <Canvas width={ WIDTH } height={ HEIGHT } lineWidth={ lineWidth } ref={ canvas } context={ context } tool={ tool } />
      <Button onClick={ handleClick }>
        <FormattedMessage { ...messages.clear } />
      </Button>
      <Toolbox value={ tool } onChange={ handleToolChange } />
      <FormControl variant="standard" disabled={ tool !== 'pen' }>
        <FormLabel>line cap</FormLabel>
        <RadioGroup name="lineCap" value={ lineCap } onChange={ handlePenCapRadioChange }>
          <FormControlLabel value="butt" label="butt" control={ <Radio /> } />
          <FormControlLabel value="round" label="round" control={ <Radio /> } />
          <FormControlLabel value="square" label="square" control={ <Radio /> } />
        </RadioGroup>
      </FormControl>
      <Box m={ 1 }>
        <List>
          <ListItem>
            <ListItemText>
              <Typography gutterBottom><FormattedMessage { ...messages.brushSize } /></Typography>
              <Slider min={ 1 / (dpr ?? 1) } value={ lineWidth } onChange={ handleLineWidthSliderChange } />
            </ListItemText>
          </ListItem>
        </List>
      </Box>
    </>
  )
}

export default Paint
