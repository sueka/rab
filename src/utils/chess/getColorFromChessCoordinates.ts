export default function getColorFromChessCoordinates({ file, rank }: Chess.Coordinates): Chess.Color {
  const fileOdd = (() => {
    switch (file) {
      case 'a':
      case 'c':
      case 'e':
      case 'g': return true
    }

    return false
  })()

  const rankOdd = (() => {
    switch (rank) {
      case '1':
      case '3':
      case '5':
      case '7': return true
    }

    return false
  })()

  return fileOdd === rankOdd ? 'black' : 'white'
}
