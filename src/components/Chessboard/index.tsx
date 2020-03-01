import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import ChessContext from '~/contexts/ChessContext'
import Coordinates from '~/domain/vo/Coordinates'
import { State } from '~/redux'
import { halfMove, pickChessman, releaseChessman, resetBoard } from '~/redux/modules/chess'
import Chessman from './Chessman'
import Square from './Square'
import classes from './classes.css'

interface StateProps {
  board: Chess.Chessboard
  picking: {
    chessman: Chess.Chessman
    source: Chess.Coordinates
  } | undefined | null
  targets: Chess.Coordinates[] | undefined | null
}

interface DispatchProps {
  resetBoard(): void
  halfMove(chessman: Chess.Chessman, source: Chess.Coordinates, target: Chess.Coordinates): void
  pickChessman(chessman: Chess.Chessman, source: Chess.Coordinates): void
  releaseChessman(): void
}

type Props =
  & StateProps
  & DispatchProps

const files: Chess.File[] = [1, 2, 3, 4, 5, 6, 7, 8]
const ranks: Chess.Rank[] = [8, 7, 6, 5, 4, 3, 2, 1]

const Chessboard: React.FunctionComponent<Props> = ({ board, picking, targets, resetBoard, halfMove, pickChessman, releaseChessman }) => {
  useEffect(() => {
    resetBoard()
  }, [])

  return (
    <ChessContext.Provider
      value={ {
        picking,
        targets,
        pickChessman,
        releaseChessman,
      } }
    >
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
    </ChessContext.Provider>
  )
}

// connect

const mapStateToProps = ({ chess: { board, picking, targets } }: State): StateProps => ({
  board,
  picking,
  targets,
})

const mapDispatchToProps: DispatchProps = {
  resetBoard,
  halfMove,
  pickChessman,
  releaseChessman,
}

export default connect(mapStateToProps, mapDispatchToProps)(Chessboard)
