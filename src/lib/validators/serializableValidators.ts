import { TaskRequest } from '~/domain/entity/Task'
import Id from '~/domain/vo/Id'
import typed from '~/lib/typed'
import ValidationError from './ValidationError'
import { asBoolean, asObject, asString, optional } from './commonValidators'

function asId(input: unknown): Id {
  if (!(input instanceof Id)) {
    throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not an Id.`)
  }

  return input
}

export const asTaskRequest = asObject<TaskRequest>('a TaskRequest', (input) => ({
  id: asId(input.id),
  content: optional(asString)(input.content),
  done: optional(asBoolean)(input.done),
}))
