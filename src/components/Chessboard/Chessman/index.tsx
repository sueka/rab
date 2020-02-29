import classnames from 'classnames'
import React, { useCallback, useContext, useMemo } from 'react'
import { DragObjectWithType, useDrag } from 'react-dnd'

import ChessContext from '~/contexts/ChessContext'
import classes from './classes.css'

export interface Props {
  chessman: Chess.Chessman
  coord: Chess.Coordinates
}

interface CollectedProps {
  dragging: boolean
}

export interface DragObject extends DragObjectWithType {
  chessman: Chess.Chessman
  coord: Chess.Coordinates
}

const Chessman: React.FunctionComponent<Props> = ({ chessman, coord }) => {
  const [{ dragging }, drag] = useDrag<DragObject, unknown, CollectedProps>({
    item: {
      type: 'Chessman',
      chessman,
      coord,
    },
    collect: (monitor) => ({
      dragging: monitor.isDragging(),
    }),
  })

  const chessmanClassName = useMemo(() => classnames(classes.Chessman, {
    [classes.Dragging]: dragging,
  }), [dragging])

  const { pickChessman } = useContext(ChessContext)

  const handleChessmanClick = useCallback(() => {
    pickChessman(chessman, coord) // bug
  }, [])

  return (
    <span ref={ drag } className={ chessmanClassName } onClick={ handleChessmanClick }>
      { chessman.symbol }
    </span>
  )
}

export default Chessman
