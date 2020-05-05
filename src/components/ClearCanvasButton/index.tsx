import React, { useCallback } from 'react'

import Button from '@material-ui/core/Button'

interface Props {
  width: number
  height: number
  context: CanvasRenderingContext2D | null | undefined
}

const ClearCanvasButton: React.FunctionComponent<Props> = ({ children, width, height, context }) => {
  const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
    context?.clearRect(0, 0, width, height)
  }, [context])

  return (
    <Button onClick={ handleClick }>
      { children }
    </Button>
  )
}

export default ClearCanvasButton
