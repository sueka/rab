import { ValidationError } from '../errors'

// tslint:disable-next-line:no-any
export function validateAsString(input: any): string {
  if (typeof input !== 'string') {
    throw new ValidationError(`${ input } is not a string.`)
  }

  return input
}
