import classnames from 'classnames'
import React, { useCallback, useContext, useMemo } from 'react'
import { DragObjectWithType, useDrop } from 'react-dnd'

import { Props as ChessmanProps } from '~/components/Chessboard/Chessman'
import ChessContext from '~/contexts/ChessContext'
import equalsChessCoordinates from '~/lib/extensions/Eq/equalsChessCoordinates'
import getColorFromCoordinates from '~/utils/chess/getColorFromCoordinates'
import classes from './classes.css'

interface Props extends React.PropsWithChildren<{}> {
  children?: React.ReactElement<ChessmanProps, React.ComponentType<ChessmanProps>> | null
  coord: Chess.Coordinates
}

const Square: React.FunctionComponent<Props> = ({ children, coord }: Props) => {
  const { picking, targets, halfMove, releaseChessman } = useContext(ChessContext)

  const attacked = useMemo(() => targets?.some((target) => equalsChessCoordinates(coord, target)) ?? false, [targets])

  const [, drop] = useDrop<DragObjectWithType, unknown, unknown>({
    accept: 'Chessman',
    drop() {
      if (picking != null && attacked) {
        halfMove(picking.chessman, picking.source, coord)
      } else {
        releaseChessman()
      }
    },
  })

  const color = useMemo(() => getColorFromCoordinates(coord), [coord])

  const squareClassName = useMemo(() => classnames(classes.Square, {
    [classes.White]: color === 'white',
    [classes.Black]: color === 'black',
    [classes.Target]: attacked,
  }), [attacked])

  const handleSquareClick = useCallback(() => {
    if (picking != null && attacked) {
      halfMove(picking.chessman, picking.source, coord)
    } else {
      releaseChessman()
    }
  }, [halfMove, picking, coord, releaseChessman])

  return (
    <div ref={ drop } className={ squareClassName } onClick={ handleSquareClick }>
      { children }
    </div>
  )
}

export default Square
