import { isObject } from './commonGuards'
import { isBetween } from './numberGuards'

const isFile = (input: Chess.EasyFile): input is Chess.File => Number.isInteger(input) && isBetween(1, 8)(input)
const isRank = (input: Chess.EasyRank): input is Chess.Rank => Number.isInteger(input) && isBetween(1, 8)(input)

export const isCoordinates = isObject<Chess.EasyCoordinates, Chess.Coordinates>((input) => ({
  file: isFile(input.file),
  rank: isRank(input.rank),
}))
