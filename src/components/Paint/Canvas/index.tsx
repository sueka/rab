import classnames from 'classnames'
import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { makeStyles } from 'tss-react/mui'

import { shouldBeNullish, shouldBePresent } from '~/asserters/commonAsserters'
import useRefsMerged from '~/hooks/useRefsMerged'
import useScreen from '~/hooks/useScreen'
import floodFill from '~/utils/canvas/floodFill'
import classes from './classes.css'

interface Props {
  width: number
  height: number
  lineWidth: number
  context: CanvasRenderingContext2D | null | undefined
  tool: Canvas.Tool
}

interface StyleProps {
  width: number
  height: number
}

const useStyles = makeStyles<StyleProps>()<'Canvas'>((_theme, { width, height }) => ({
  Canvas: {
    width,
    height,
  },
}))

const Canvas = forwardRef<HTMLCanvasElement, Props>(({ width, height, lineWidth, context, tool }, forwardedRef) => {
  const [drawing, setDrawing] = useState(false)
  const [previousPoint, setPreviousPoint] = useState<Canvas.Point | null>(null)

  const ownRef = useRef<HTMLCanvasElement>(null)
  const ref = useRefsMerged(forwardedRef, ownRef)

  const { classes: jssClasses } = useStyles({ width,  height })
  const canvasClassName = useMemo(() => classnames(jssClasses.Canvas, classes.Canvas), [jssClasses.Canvas])

  const { dpr } = useScreen()

  useEffect(() => {
    if (context == null || ownRef.current === null || dpr === null) {
      return
    }

    ownRef.current.width = dpr * width
    ownRef.current.height = dpr * height

    context.resetTransform()
    context.scale(dpr, dpr)
  }, [width, height, context, ownRef, dpr])

  const handlePointerDown = useCallback<React.PointerEventHandler<HTMLCanvasElement>>((event) => {
    if (tool !== 'pen') {
      return
    }

    shouldBeNullish(previousPoint)

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

    context.lineWidth = lineWidth * (event.pressure !== 0 ? event.pressure : 1)
    context.lineJoin = 'round'

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

  const handleClick = useCallback<React.MouseEventHandler<HTMLCanvasElement>>(async (event) => {
    if (tool !== 'bucket') {
      return
    }

    shouldBePresent(context)

    await floodFill({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY }, width, height, context)
  }, [width, height, context, tool])

  return (
    <canvas
      ref={ ref }
      className={ canvasClassName }
      width={ width }
      height={ height }
      onPointerDown={ handlePointerDown }
      onPointerMove={ handlePointerMove }
      onPointerUp={ handlePointerUp }
      onPointerLeave={ handlePointerLeave }
      onClick={ handleClick }
    />
  )
})

export default Canvas
