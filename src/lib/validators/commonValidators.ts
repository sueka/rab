import { ValidationError } from '../errors'

// tslint:disable-next-line:no-any
const createRecordValidator = <T>(validate: (input: any) => T) => (input: any): Record<string, T> => {
  if (input == null) {
    throw new ValidationError(`${ input } is not an object.`)
  }

  try {
    return Object.entries(input).map<[string, T]>(([key, value]) => [key, validate(value)]).reduce<Record<string, T>>((output, [key, value]) => ({ ...output, [key]: value }), {})
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new ValidationError(`${ input } is not a Record.`)
    }

    throw error
  }
}

export const validateAsStringRecord = createRecordValidator(validateAsString)

// tslint:disable-next-line:no-any
export function validateAsString(input: any): string {
  if (typeof input !== 'string') {
    throw new ValidationError(`${ input } is not a string.`)
  }

  return input
}
