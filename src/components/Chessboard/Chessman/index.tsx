import classnames from 'classnames'
import React, { useMemo } from 'react'
import { DragObjectWithType, useDrag } from 'react-dnd'

import classes from './classes.css'

export interface Props {
  piece: Chess.Piece
}

interface CollectedProps {
  dragging: boolean
}

export interface DragObject extends DragObjectWithType {
  piece: Chess.Piece
}

const Chessman: React.FunctionComponent<Props> = ({ piece }) => {
  const [{ dragging }, drag] = useDrag<DragObject, unknown, CollectedProps>({
    item: {
      type: 'Chessman',
      piece,
    },
    collect: (monitor) => ({
      dragging: monitor.isDragging(),
    }),
  })

  const chessmanClassName = useMemo(() => classnames(classes.Chessman, {
    [classes.Dragging]: dragging,
  }), [dragging])

  return (
    <span ref={ drag } className={ chessmanClassName }>
      { piece }
    </span>
  )
}

export default Chessman
