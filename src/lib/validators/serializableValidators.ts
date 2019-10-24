import { ValidationError } from '~/lib/errors'
import typed from '~/lib/typed'
import Id from '~/domain/vo/Id'
import { TaskRequest } from '~/domain/entity/Task'
import { optional, asObject, asBoolean, asString } from './commonValidators'

function asId(input: unknown): Id {
  if (!(input instanceof Id)) {
    throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not an Id.`)
  }

  return input
}

export const asTaskRequest = asObject<TaskRequest>('a Task', (input) => ({
  id: asId(input.id),
  content: optional(asString)(input.content),
  done: optional(asBoolean)(input.done),
}))