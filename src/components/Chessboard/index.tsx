import { Map } from 'immutable'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Coordinates from '~/domain/vo/Coordinates'
import { State } from '~/redux'
import { halfMove, resetBoard } from '~/redux/modules/chess'
import Chessman from './Chessman'
import Square from './Square'
import classes from './classes.css'

interface StateProps {
  board: {
    chessmen: Map<Coordinates, Chess.Chessman>
  }
}

interface DispatchProps {
  resetBoard(): void
  halfMove(chessman: Chess.Chessman, source: Chess.Coordinates, target: Chess.Coordinates): void
}

type Props =
  & StateProps
  & DispatchProps

const files: Chess.File[] = [1, 2, 3, 4, 5, 6, 7, 8]
const ranks: Chess.Rank[] = [8, 7, 6, 5, 4, 3, 2, 1]

const Chessboard: React.FunctionComponent<Props> = ({ board, resetBoard, halfMove }) => {
  useEffect(() => {
    resetBoard()
  }, [])

  return (
    <table className={ classes.ChessboardTable }>
      <tbody>
        { ranks.map((rank) => (
          <tr key={ rank }>
            { files.map((file) => {
              const coord = new Coordinates({ file, rank })
              const chessman = board.chessmen.get(coord)

              return (
                <td key={ file } className={ classes.ChessboardTd }>
                  <Square coord={ coord } halfMove={ halfMove }>
                    { chessman !== undefined && (
                      <Chessman chessman={ chessman } coord={ coord } />
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

const mapStateToProps = ({ chess: { board } }: State): StateProps => ({
  board,
})

const mapDispatchToProps: DispatchProps = {
  resetBoard,
  halfMove,
}

export default connect(mapStateToProps, mapDispatchToProps)(Chessboard)
