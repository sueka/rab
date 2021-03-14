import React, { forwardRef, useCallback, useState } from 'react'

import { shouldBeNullable, shouldBePresent } from '~/lib/asserters/commonAsserters'
import floodFill from '~/utils/canvas/floodFill'
import classes from './classes.css'

interface InnerProps {
  width: number
  height: number
  lineWidth: number
  innerRef: React.Ref<HTMLCanvasElement>
  context: CanvasRenderingContext2D | null | undefined
  tool: Canvas.Tool
}

type Props = React.PropsWithRef<Alt.Omit<InnerProps, 'innerRef'>>

const Canvas: React.FC<InnerProps> = ({ width, height, lineWidth, innerRef, context, tool }) => {
  const [drawing, setDrawing] = useState(false)
  const [previousPoint, setPreviousPoint] = useState<Canvas.Point | null>(null)

  const handlePointerDown = useCallback<React.PointerEventHandler<HTMLCanvasElement>>((event) => {
    if (tool !== 'pen') {
      return
    }

    shouldBeNullable(previousPoint)

    setDrawing(true)

    setPreviousPoint({
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    })
  }, [tool, previousPoint])

  const handlePointerMove = useCallback<React.PointerEventHandler<HTMLCanvasElement>>((event) => {
    if (!drawing) {
      return
    }

    shouldBePresent(context)
    shouldBePresent(previousPoint)

    /* tslint:disable:no-object-mutation */
    context.lineWidth = lineWidth * event.pressure
    context.lineJoin = 'round'
    /* tslint:enable:no-object-mutation */

    context.beginPath()
    context.moveTo(previousPoint.x, previousPoint.y)
    context.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY)
    context.stroke()

    setPreviousPoint({
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    })
  }, [lineWidth, context, drawing, previousPoint])

  const handlePointerUp = useCallback(() => {
    setDrawing(false)
    setPreviousPoint(null)
  }, [])

  const handlePointerLeave = useCallback(() => {
    setDrawing(false)
    setPreviousPoint(null)
  }, [])

  const handleClick = useCallback<React.MouseEventHandler<HTMLCanvasElement>>((event) => {
    if (tool !== 'bucket') {
      return
    }

    shouldBePresent(context)

    floodFill({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY }, width, height, context)
  }, [width, height, context, tool])

  return (
    <canvas
      ref={ innerRef }
      className={ classes.Canvas }
      width={ width }
      height={ height }
      onPointerDown={ handlePointerDown }
      onPointerMove={ handlePointerMove }
      onPointerUp={ handlePointerUp }
      onPointerLeave={ handlePointerLeave }
      onClick={ handleClick }
    />
  )
}

export default forwardRef<HTMLCanvasElement, Props>((props, ref) => (
  <Canvas innerRef={ ref } { ...props } />
))
