import React from 'react'

import classes from './classes.css'

export interface Props {
  piece: Chess.Piece
}

const Chessman: React.FunctionComponent<Props> = ({ piece }) => (
  <span className={ classes.Chessman }>
    { piece }
  </span>
)

export default Chessman
