import { ValidationError } from '../errors'

// tslint:disable-next-line:no-any
export function validateAsRepository(input: any): Repository {
  if (input == null) {
    throw new ValidationError(`${ input } is not an object`)
  }

  try {
    return {
      name: validateAsString(input.name),
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new ValidationError(`${ input } is not a Repository.`)
    }

    throw error
  }
}

// tslint:disable-next-line:no-any
function validateAsString(input: any): string {
  if (typeof input !== 'string') {
    throw new ValidationError(`${ input } is not a string.`)
  }

  return input
}
