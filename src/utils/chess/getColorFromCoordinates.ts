export default function getColorFromCoordinates({ file, rank }: Chess.Coordinates): Chess.Color {
  return file % 2 === rank % 2 ? 'black' : 'white'
}
