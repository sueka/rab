import { isObject } from './commonGuards'
import { isBetween } from './numberGuards'

export const isCoordinates = isObject<Chess.EasyCoordinates, Chess.Coordinates>((input) => ({
  file: isBetween<Chess.EasyFile, Chess.File>(1, 8)(input.file),
  rank: isBetween<Chess.EasyRank, Chess.Rank>(1, 8)(input.rank),
}))
