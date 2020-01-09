import assert from 'assert'

import typed from '~/lib/typed'
import ValidationError from './ValidationError'
import { asNumber } from './commonValidators'

export const asBoundedNumber = ({
  lowerBound = -Infinity,
  upperBound = Infinity,
}: {
  lowerBound?: number,
  upperBound?: number
}) => (input: Json) => {
  assert(lowerBound <= upperBound)

  const inputAsNumber = asNumber(input)

  if (lowerBound <= inputAsNumber && inputAsNumber <= upperBound) {
    return inputAsNumber
  }

  throw new ValidationError(
    typed<[number, number, number]>`${ inputAsNumber } is not between ${ lowerBound } and ${ upperBound }.`,
    'asBoundedNumberErrorMessage',
    {
      input: inputAsNumber,
      lowerBound,
      upperBound,
    }
  )
}
