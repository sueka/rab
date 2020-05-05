import React, { forwardRef, useCallback, useState } from 'react'

import { shouldBeNullable, shouldBePresent } from '~/lib/asserters/commonAsserters'
import classes from './classes.css'

// TODO: remove
interface Point {
  x: number
  y: number
}

interface InnerProps {
  width: number
  height: number
  lineWidth: number
  innerRef: React.Ref<HTMLCanvasElement>
  context: CanvasRenderingContext2D | null | undefined
}

type Props = React.PropsWithRef<Alt.Omit<InnerProps, 'innerRef'>>

const Canvas: React.FunctionComponent<InnerProps> = ({ width, height, lineWidth, innerRef, context }) => {
  const [drawing, setDrawing] = useState(false)
  const [previousPoint, setPreviousPoint] = useState<Point | null>(null)

  const handlePointerDown = useCallback<React.PointerEventHandler<HTMLCanvasElement>>((event) => {
    shouldBeNullable(previousPoint)

    setDrawing(true)

    setPreviousPoint({
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    })
  }, [context, previousPoint])

  const handlePointerMove = useCallback<React.PointerEventHandler<HTMLCanvasElement>>((event) => {
    if (!drawing) {
      return
    }

    shouldBePresent(context)
    shouldBePresent(previousPoint)

    /* tslint:disable:no-object-mutation */
    context.lineCap = 'round'
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
  }, [context, drawing, previousPoint])

  const handlePointerUp = useCallback(() => {
    setDrawing(false)
    setPreviousPoint(null)
  }, [])

  const handlePointerLeave = useCallback(() => {
    setDrawing(false)
    setPreviousPoint(null)
  }, [])

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
    />
  )
}

export default forwardRef<HTMLCanvasElement, Props>((props, ref) => (
  <Canvas innerRef={ ref } { ...props } />
))
