export default function equalsChessCoordinates(x: Chess.Coordinates, y: Chess.Coordinates): boolean {
  return x.file === y.file && x.rank === y.rank
}
