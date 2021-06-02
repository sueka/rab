import assert from 'assert'

import { isUrl, seemsLikeGtmContainerId } from '~/guards/stringGuards'
import typed from '~/typed'
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

  throw new Error(typed<[string, number, number]>`${ inputAsString } is not between ${ lowerBound } and ${ upperBound } characters.`)
}

export function asUrl(input: unknown): string.Url {
  const inputAsString = asString(input)

  if (!isUrl(inputAsString)) {
    throw new Error(typed<[string]>`${ inputAsString } is not a URL.`)
  }

  return inputAsString
}

export function asGtmContainerIdLike(input: unknown): `GTM-${string}` {
  const inputAsString = asString(input)

  if (!seemsLikeGtmContainerId(inputAsString)) {
    throw new Error('It does not seem like a GTM container ID.')
  }

  return inputAsString
}
