import { ValidationError } from '../errors'

// tslint:disable-next-line:no-any
const createRecordValidator = <T>(validate: (input: any) => T) => (input: any): Record<Index, T> => {
  if (input == null) {
    throw new ValidationError(`${ input } is not an object.`)
  }

  return Object.entries(input).map<[Index, T]>(([key, value]) => [key, validate(value)]).reduce((output, [key, value]) => ({ ...output, [key]: value }), {})
}

export const validateAsStringRecord = createRecordValidator(validateAsString)

// tslint:disable-next-line:no-any
export function validateAsString(input: any): string {
  if (typeof input !== 'string') {
    throw new ValidationError(`${ input } is not a string.`)
  }

  return input
}
