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

const Chessman: React.FunctionComponent<Props> = ({ chessman, coord }) => {
  const [{ dragging }, drag] = useDrag<DragObjectWithType, unknown, CollectedProps>({
    item: {
      type: 'Chessman',
    },
    collect: (monitor) => ({
      dragging: monitor.isDragging(),
    }),
    begin() {
      pickChessman(chessman, coord)
    },
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
