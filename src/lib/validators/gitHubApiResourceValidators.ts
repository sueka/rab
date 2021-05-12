import { asObject, asString, optional } from './commonValidators'
import { asUrl } from './stringValidators'

export function asGetRepoResponse(input: unknown): GitHubApi.GetRepoResponse {
  return asRepository(input)
}

const asRepository = asObject<GitHubApi.Repository>((input) => ({
  full_name: asString(input.full_name),
  html_url: asUrl(input.html_url),
}))

export const asUnsuccessfulResponse = asObject<GitHubApi.UnsuccessfulResponse>((input) => ({
  message: asString(input.message),
  documentation_url: optional(asString)(input.documentation_url),
}))
