import Button from '@material-ui/core/Button'
import React, { useCallback } from 'react'

interface Props {
  width: number
  height: number
  context: CanvasRenderingContext2D | null | undefined
}

const ClearCanvasButton: React.FC<Props> = ({ children, width, height, context }) => {
  const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
    context?.clearRect(0, 0, width, height)
  }, [context, width, height])

  return (
    <Button onClick={ handleClick }>
      { children }
    </Button>
  )
}

export default ClearCanvasButton
