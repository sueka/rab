import { Theme, makeStyles } from '@material-ui/core/styles'
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

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteColor {
    '100': string
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  Square: {
    '&$Square$Target': { // NOTE: 詳細度を CSS の .White.Square より大きくするためにセレクターを冗長にしている。
      backgroundColor: theme.palette.primary['100'],
    },
  },
  Target: {},
}))

const Square: React.FC<Props> = ({ children, coord }: Props) => {
  const { picking, targets, halfMove, releaseChessman } = useContext(ChessContext)
  const jssClasses = useStyles()

  const attacked = useMemo(() => targets?.some((target) => equalsChessCoordinates(coord, target)) ?? false, [coord, targets])

  const [, drop] = useDrop<DragObjectWithType, unknown, unknown>({
    accept: 'Chessman',
    drop() {
      if (picking != null) {
        if (attacked) {
          halfMove?.(picking.chessman, picking.source, coord)
        } else {
          releaseChessman?.()
        }
      }
    },
  })

  const color = useMemo(() => getColorFromCoordinates(coord), [coord])

  const squareClassName = useMemo(() => classnames(jssClasses.Square, classes.Square, {
    [classes.White]: color === 'white',
    [classes.Black]: color === 'black',
    [jssClasses.Target]: attacked,
  }), [jssClasses.Square, jssClasses.Target, color, attacked])

  const handleSquareClick = useCallback(() => {
    if (picking != null) {
      if (attacked) {
        halfMove?.(picking.chessman, picking.source, coord)
      } else {
        releaseChessman?.()
      }
    }
  }, [halfMove, picking, coord, releaseChessman, attacked])

  return (
    <div ref={ drop } className={ squareClassName } onClick={ handleSquareClick }>
      { children }
    </div>
  )
}

export default Square
