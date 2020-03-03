import assert from 'assert'

import typed from '~/lib/typed'
import { isUrl } from '~/lib/guards/stringGuards'
import ValidationError from './ValidationError'
import { asString } from './commonValidators'

export const asBoundedLengthString = ({
  lowerBound = -Infinity,
  upperBound = Infinity,
}: {
  lowerBound?: number
  upperBound?: number
}) => (input: unknown) => {
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

export function asUrl(input: unknown): string.Url {
  const inputAsString = asString(input)

  if (!isUrl(inputAsString)) {
    throw new ValidationError(typed<[string]>`${ inputAsString } is not a URL.`)
  }

  return inputAsString
}
