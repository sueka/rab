import assert from 'assert'

import { ValidationError } from '~/lib/errors'
import typed from '~/lib/typed'
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

  throw new ValidationError(typed<[number, number, number]>`${ inputAsNumber } is not between ${ lowerBound } and ${ upperBound }.`)
}
