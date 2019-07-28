import { optional, asObject, asString } from './commonValidators'

export function asGetRepoResponse(input: Json): GetRepoResponse {
  return asRepository(input)
}

const asRepository = asObject<Repository>('a Repository', (input) => ({
  name: asString(input.name),
}))

export const asUnsuccessfulResponse = asObject<UnsuccessfulResponse>('an UnsuccessfulResponse', (input) => ({
  message: asString(input.message),
  documentation_url: optional(asString)(input.documentation_url),
}))
