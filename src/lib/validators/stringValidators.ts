import assert from 'assert'

import typed from '~/lib/typed'
import ValidationError from './ValidationError'
import { asString } from './commonValidators'

export const asBoundedLengthString = <T>({
  lowerBound = -Infinity,
  upperBound = Infinity,
}: {
  lowerBound?: number
  upperBound?: number
}) => (input: T) => {
  assert(lowerBound <= upperBound)

  const inputAsString = asString(input)

  if (lowerBound <= inputAsString.length && inputAsString.length <= upperBound) {
    return inputAsString
  }

  throw new ValidationError(
    typed<[string, number, number]>`${ inputAsString } is not between ${ lowerBound } and ${ upperBound } characters.`,
    'asBoundedLengthStringErrorMessage',
    {
      input: inputAsString.length,
      lowerBound,
      upperBound,
    }
  )
}
