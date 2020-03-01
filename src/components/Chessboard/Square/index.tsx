import classnames from 'classnames'
import React, { useCallback, useContext, useMemo } from 'react'
import { DragObjectWithType, useDrop } from 'react-dnd'

import { Props as ChessmanProps } from '~/components/Chessboard/Chessman'
import ChessContext from '~/contexts/ChessContext'
import getColorFromCoordinates from '~/utils/chess/getColorFromCoordinates'
import classes from './classes.css'

interface Props extends React.PropsWithChildren<{}> {
  children?: React.ReactElement<ChessmanProps, React.ComponentType<ChessmanProps>> | null
  coord: Chess.Coordinates

  halfMove(chessman: Chess.Chessman, source: Chess.Coordinates, target: Chess.Coordinates): void
}

const Square: React.FunctionComponent<Props> = ({ children, coord, halfMove }: Props) => {
  const { picking } = useContext(ChessContext)

  const [, drop] = useDrop<DragObjectWithType, unknown, unknown>({
    accept: 'Chessman',
    drop() {
      if (picking !== undefined) {
        halfMove(picking.chessman, picking.source, coord)
      }
    },
  })

  const color = useMemo(() => getColorFromCoordinates(coord), [coord])

  const squareClassName = useMemo(() => classnames(classes.Square, {
    [classes.White]: color === 'white',
    [classes.Black]: color === 'black',
  }), [])

  const handleSquareClick = useCallback(() => {
    if (picking !== undefined) {
      halfMove(picking.chessman, picking.source, coord)
    }
  }, [halfMove, picking, coord])

  return (
    <div ref={ drop } className={ squareClassName } onClick={ handleSquareClick }>
      { children }
    </div>
  )
}

export default Square
