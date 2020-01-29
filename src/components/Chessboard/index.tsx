import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import equalsChessCoordinates from '~/lib/extensions/Eq/equalsChessCoordinates'
import { State } from '~/redux'
import { resetBoard } from '~/redux/modules/chess'
import Chessman from './Chessman'
import Square from './Square'
import classes from './classes.css'

interface StateProps {
  pieces: Chess.CoordinatedPiece[]
}

interface DispatchProps {
  resetBoard(): void
}

type Props =
  & StateProps
  & DispatchProps

const files: Chess.File[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const ranks: Chess.Rank[] = ['8', '7', '6', '5', '4', '3', '2', '1']

const Chessboard: React.FunctionComponent<Props> = ({ pieces, resetBoard }) => {
  useEffect(() => {
    resetBoard()
  }, [])

  return (
    <table className={ classes.ChessboardTable }>
      <tbody>
        { ranks.map((rank) => (
          <tr key={ rank }>
            { files.map((file) => {
              const piece = pieces.find(({ coord }) => equalsChessCoordinates(coord, { file, rank }))

              return (
                <td key={ file }>
                  <Square>
                    { piece !== undefined && (
                      <Chessman piece={ piece.piece } />
                    ) }
                  </Square>
                </td>
              )
            }) }
          </tr>
        )) }
      </tbody>
    </table>
  )
}

// connect

const mapStateToProps = ({ chess: { board: { pieces } } }: State): StateProps => ({
  pieces,
})

const mapDispatchToProps: DispatchProps = {
  resetBoard,
}

export default connect(mapStateToProps, mapDispatchToProps)(Chessboard)
