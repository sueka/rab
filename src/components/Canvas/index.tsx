import React, { forwardRef, useCallback, useState } from 'react'

import classes from './classes.css'

interface InnerProps {
  width: number
  height: number
  innerRef: React.Ref<HTMLCanvasElement>
  context: CanvasRenderingContext2D | null | undefined
}

type Props = React.PropsWithRef<Alt.Omit<InnerProps, 'innerRef'>>

const Canvas: React.FunctionComponent<InnerProps> = ({ width, height, innerRef, context }) => {
  const [drawing, setDrawing] = useState(false)

  const handlePointerDown = useCallback<React.PointerEventHandler<HTMLCanvasElement>>((event) => {
    setDrawing(true)

    context?.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY)
  }, [context])

  const handlePointerMove = useCallback<React.PointerEventHandler<HTMLCanvasElement>>((event) => {
    if (!drawing) {
      return
    }

    context?.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY)
    context?.stroke()
  }, [drawing, context])

  const handlePointerUp = useCallback(() => {
    setDrawing(false)
  }, [])

  const handlePointerLeave = useCallback(() => {
    setDrawing(false)
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
