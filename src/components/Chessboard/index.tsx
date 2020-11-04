import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Coordinates from '~/domain/vo/Coordinates'
import { State } from '~/redux'
import { resetBoard } from '~/redux/modules/chess'
import Chessman from './Chessman'
import Square from './Square'
import classes from './classes.css'

interface StateProps {
  board: Chess.Chessboard
}

interface DispatchProps {
  resetBoard(): void
}

type Props =
  & StateProps
  & DispatchProps

const files: Chess.File[] = [1, 2, 3, 4, 5, 6, 7, 8]
const ranks: Chess.Rank[] = [8, 7, 6, 5, 4, 3, 2, 1]

const Chessboard: React.FC<Props> = ({ board, resetBoard }) => {
  useEffect(() => {
    resetBoard() // TODO: Skip when LOCATION_CHANGE is dispatched
  }, [resetBoard])

  return (
    <table className={ classes.ChessboardTable } dir="ltr">
      <tbody>
        { ranks.map((rank) => (
          <tr key={ rank }>
            { files.map((file) => {
              const coord = new Coordinates({ file, rank })
              const chessman = board.chessmen.get(coord)

              return (
                <td key={ file } className={ classes.ChessboardTd }>
                  <Square coord={ coord }>
                    { chessman !== undefined ? (
                      <Chessman chessman={ chessman } coord={ coord } />
                    ) : null }
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

const mapStateToProps = ({ chess: { board } }: State): StateProps => ({
  board,
})

const mapDispatchToProps: DispatchProps = {
  resetBoard,
}

export default connect(mapStateToProps, mapDispatchToProps)(Chessboard)
