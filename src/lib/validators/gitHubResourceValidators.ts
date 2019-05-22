import { ValidationError } from '../errors'
import { validateAsString } from './commonValidators'

// tslint:disable-next-line:no-any
export function validateAsRepository(input: any): Repository {
  if (input == null) {
    throw new ValidationError(`${ input } is not an object.`)
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
