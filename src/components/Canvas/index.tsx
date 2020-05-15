import React, { forwardRef, useCallback, useState } from 'react'

import Color from '~/domain/vo/Color'
import { shouldBeNullable, shouldBePresent } from '~/lib/asserters/commonAsserters'
import classes from './classes.css'

// TODO: remove
type Tool =
  | 'pen'
  | 'bucket'

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
  tool: Tool
}

type Props = React.PropsWithRef<Alt.Omit<InnerProps, 'innerRef'>>

// TODO: remove
export /* for testing */ function getColor({ x, y }: Point, context: CanvasRenderingContext2D): Color {
  const { data: [red, green, blue, alpha] } = context.getImageData(x, y, 1, 1)

  return new Color({
    red,
    green,
    blue,
    alpha,
  })
}

// TODO: remove
function floodFill(targetPoint: Point, width: number, height: number, context: CanvasRenderingContext2D) {
  shouldBePresent(context)

  const queue: Point[] = [] // TODO
  const targetColor = getColor(targetPoint, context)

  // tslint:disable-next-line:no-array-mutation
  queue.push(targetPoint)

  // tslint:disable-next-line:no-loop-statement
  while (queue.length !== 0) {
    const currentPoint = queue.shift() // tslint:disable-line:no-array-mutation

    shouldBePresent(currentPoint)

    const currentColor = getColor(currentPoint, context)

    if (!targetColor.equals(currentColor)) {
      continue
    }

    context.fillRect(currentPoint.x, currentPoint.y, 1, 1)

    if (currentPoint.x > 0) {
      // tslint:disable-next-line:no-array-mutation
      queue.push({ x: currentPoint.x - 1, y: currentPoint.y })
    }

    if (currentPoint.y > 0) {
      // tslint:disable-next-line:no-array-mutation
      queue.push({ x: currentPoint.x, y: currentPoint.y - 1 })
    }

    if (currentPoint.x < width - 1) {
      // tslint:disable-next-line:no-array-mutation
      queue.push({ x: currentPoint.x + 1, y: currentPoint.y })
    }

    if (currentPoint.y < height - 1) {
      // tslint:disable-next-line:no-array-mutation
      queue.push({ x: currentPoint.x, y: currentPoint.y + 1 })
    }
  }
}

const Canvas: React.FunctionComponent<InnerProps> = ({ width, height, lineWidth, innerRef, context, tool }) => {
  const [drawing, setDrawing] = useState(false)
  const [previousPoint, setPreviousPoint] = useState<Point | null>(null)

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
