import classnames from 'classnames'
import React, { useCallback, useContext, useMemo } from 'react'
import { DragObjectWithType, useDrag } from 'react-dnd'

import ChessContext from '~/contexts/ChessContext'
import equalsChessCoordinates from '~/lib/extensions/Eq/equalsChessCoordinates'
import equalsChessmen from '~/lib/extensions/Eq/equalsChessmen'
import classes from './classes.css'

export interface Props {
  chessman: Chess.Chessman
  coord: Chess.Coordinates
}

interface CollectedProps {
  dragging: boolean
}

const Chessman: React.FunctionComponent<Props> = ({ chessman, coord }) => {
  const { picking, pickChessman } = useContext(ChessContext)

  const [{ dragging }, drag, preview] = useDrag<DragObjectWithType, unknown, CollectedProps>({
    item: {
      type: 'Chessman',
    },
    collect: (monitor) => ({
      dragging: monitor.isDragging(),
    }),
    begin() {
      pickChessman?.(chessman, coord)
    },
  })

  const chessmanClassName = useMemo(() => classnames(classes.Chessman, {
    [classes.Dragging]: dragging,
    [classes.Picking]: picking != null && equalsChessCoordinates(coord, picking.source) && equalsChessmen(chessman, picking.chessman), // NOTE: chessInvariant ensures $ coord = picking.source → chessman = picking.chessman $
  }), [dragging, coord, picking?.source])

  const chessmanPreviewClassName = useMemo(() => classnames(classes.Chessman, classes.Preview), [])

  const handleChessmanClick = useCallback(() => {
    if (picking == null) { // FIXME
      pickChessman?.(chessman, coord)
    }
  }, [picking, pickChessman, chessman, coord])

  return (
    <>
      <span ref={ preview } className={ chessmanPreviewClassName }>
        { chessman.symbol }
      </span>
      <span ref={ drag } className={ chessmanClassName } onClick={ handleChessmanClick }>
        { chessman.symbol }
      </span>
    </>
  )
}

export default Chessman
