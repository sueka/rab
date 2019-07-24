import { ValidationError } from 'src/lib/errors'
import { typed } from 'src/lib/commonFunctions'

const createOptionalValidator = <T>(validate: (input: Json) => T) => (input: Json | undefined): T | undefined => {
  if (input !== undefined) {
    return validate(input)
  }

  return
}

const createRecordValidator = <T>(validate: (input: Json) => T) => (input: Json): Record<string, T> => {
  if (input === null || typeof input === 'boolean' || typeof input === 'number' || typeof input === 'string' || Array.isArray(input)) {
    throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not an object.`)
  }

  try {
    return Object.entries(input).map<[string, T]>(([key, value]) => [key, validate(value)]).reduce<Record<string, T>>((output, [key, value]) => ({ ...output, [key]: value }), {})
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not a Record.`)
    }

    throw error
  }
}

export const validateAsOptionalString = createOptionalValidator(validateAsString)
export const validateAsStringRecord = createRecordValidator(validateAsString)

export function validateAsString(input: Json): string {
  if (typeof input !== 'string') {
    throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not a string.`)
  }

  return input
}
