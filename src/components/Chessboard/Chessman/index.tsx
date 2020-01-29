import React from 'react'

export interface Props {
  piece: Chess.Piece
}

const Chessman: React.FunctionComponent<Props> = ({ piece }) => (
  <span>
    { piece }
  </span>
)

export default Chessman
