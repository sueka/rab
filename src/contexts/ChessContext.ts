import { createContext } from 'react'

interface ChessContext {
  picking?: {
    chessman: Chess.Chessman
    coord: Chess.Coordinates
  }

  pickChessman(chessman: Chess.Chessman, source: Chess.Coordinates): void
}

export default createContext<ChessContext>({
  pickChessman() {
    throw new Error // TODO
  }
})
