import { Theme } from '@mui/material/styles'
import classnames from 'classnames'
import React, { useCallback, useContext, useMemo } from 'react'
import { useDrag } from 'react-dnd'
import { makeStyles } from 'tss-react/mui'

import ChessContext from '~/contexts/ChessContext'
import equalsChessCoordinates from '~/extensions/Eq/equalsChessCoordinates'
import equalsChessmen from '~/extensions/Eq/equalsChessmen'
import classes from './classes.css'

export interface Props {
  chessman: Chess.Chessman
  coord: Chess.Coordinates
}

interface CollectedProps {
  dragging: boolean
}

declare module '@mui/material/styles/createPalette' {
  interface PaletteColor {
    A700: string
  }
}

const useStyles = makeStyles()((theme: Theme) => ({
  Chessman: {
    '&$Picking:not($Dragging)': {
      color: theme.palette.primary.A700,
    },
  },
  Picking: {},
  Dragging: {},
}))

const Chessman: React.FC<Props> = ({ chessman, coord }) => {
  const { picking, pickChessman } = useContext(ChessContext)
  const { classes: jssClasses } = useStyles()

  const [{ dragging }, drag, preview] = useDrag<{}, unknown, CollectedProps>({
    type: 'Chessman',
    collect: (monitor) => ({
      dragging: monitor.isDragging(),
    }),
    item() {
      pickChessman?.(chessman, coord)

      return {} // NOTE: return 無しだと drag がキャンセルされる。
    },
  })

  const chessmanClassName = useMemo(() => classnames(jssClasses.Chessman, classes.Chessman, {
    [jssClasses.Dragging]: dragging,
    [jssClasses.Picking]: picking != null && equalsChessCoordinates(coord, picking.source) && equalsChessmen(chessman, picking.chessman), // NOTE: ChessInvariant ensures equalsChessCoordinates(coord, picking.source) → equalsChessmen(chessman, picking.chessman)
    [classes.Dragging]: dragging,
  }), [jssClasses.Chessman, jssClasses.Dragging, jssClasses.Picking, dragging, chessman, coord, picking])

  const chessmanPreviewClassName = useMemo(() => classnames(jssClasses.Chessman, classes.Chessman, classes.Preview), [jssClasses.Chessman])

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
