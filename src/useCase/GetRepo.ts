import { Endpoints } from '@octokit/types' // tslint:disable-line:no-submodule-imports

export type GetRepoInput = Endpoints['GET /repos/{owner}/{repo}']['parameters']

interface SuccessfulGetRepoOutput {
  successful: true
  response: {
    status: number
    body: GitHubApi.GetRepoResponse
  }
}

interface UnsuccessfulGetRepoOutput {
  successful: false
  response: {
    status: number
    body: GitHubApi.UnsuccessfulResponse
  }
}

export type GetRepoOutput = SuccessfulGetRepoOutput | UnsuccessfulGetRepoOutput

export default interface GetRepo {
  apply(input: GetRepoInput): Promise<GetRepoOutput>
}
