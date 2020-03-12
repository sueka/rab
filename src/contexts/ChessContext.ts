import { createContext } from 'react'

interface ChessContext {
  picking: {
    chessman: Chess.Chessman
    source: Chess.Coordinates
  } | undefined | null
  targets: Chess.Coordinates[] | undefined | null
  halfMove: ((chessman: Chess.Chessman, source: Chess.Coordinates, target: Chess.Coordinates) => void) | undefined | null
  pickChessman: ((chessman: Chess.Chessman, source: Chess.Coordinates) => void) | undefined | null
  releaseChessman: (() => void) | undefined | null
}

export default createContext<ChessContext>({
  picking: null,
  targets: null,
  halfMove: null,
  pickChessman: null,
  releaseChessman: null,
})
