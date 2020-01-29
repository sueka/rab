import React from 'react'

import { Props as ChessmanProps } from '~/components/Chessboard/Chessman'
import classes from './classes.css'

interface Props extends React.PropsWithChildren<{}> {
  children?: React.ReactElement<ChessmanProps, React.ComponentType<ChessmanProps>> | false | null
}

const Square: React.FunctionComponent<Props> = ({ children }: Props) => {
  return (
    <div className={ classes.Square }>
      { children }
    </div>
  )
}

export default Square
