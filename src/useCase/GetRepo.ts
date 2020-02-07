import { Octokit } from '@octokit/rest'

export type GetRepoInput = Octokit.ReposGetParams

interface SuccessfulGetRepoOutput {
  successful: true
  response: {
    status: number
    body: GitHubApiResource.GetRepoResponse
  }
}

interface UnsuccessfulGetRepoOutput {
  successful: false
  response: {
    status: number
    body: GitHubApiResource.UnsuccessfulResponse
  }
}

export type GetRepoOutput = SuccessfulGetRepoOutput | UnsuccessfulGetRepoOutput

export default interface GetRepo {
  apply(input: GetRepoInput): Promise<GetRepoOutput>
}
