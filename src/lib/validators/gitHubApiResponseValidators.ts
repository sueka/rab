import { optional, asObject, asString } from './commonValidators'

export function asGetRepoResponse(input: Json): GitHubApiResponse.GetRepoResponse {
  return asRepository(input)
}

const asRepository = asObject<GitHubApiResponse.Repository>('a Repository', (input) => ({
  name: asString(input.name),
}))

export const asUnsuccessfulResponse = asObject<GitHubApiResponse.UnsuccessfulResponse>('an UnsuccessfulResponse', (input) => ({
  message: asString(input.message),
  documentation_url: optional(asString)(input.documentation_url),
}))
