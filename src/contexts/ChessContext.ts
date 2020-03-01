import { createContext } from 'react'

interface ChessContext {
  picking: {
    chessman: Chess.Chessman
    source: Chess.Coordinates
  } | undefined | null
  targets: Chess.Coordinates[] | undefined | null

  halfMove(chessman: Chess.Chessman, source: Chess.Coordinates, target: Chess.Coordinates): void
  pickChessman(chessman: Chess.Chessman, source: Chess.Coordinates): void
  releaseChessman(): void
}

export default createContext<ChessContext>({
  picking: null,
  targets: null,

  halfMove() {
    throw new Error // TODO
  },
  pickChessman() {
    throw new Error // TODO
  },
  releaseChessman() {
    throw new Error // TODO
  },
})
