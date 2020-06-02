import { ReposGetParams } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/types' // tslint:disable-line:no-submodule-imports

export type GetRepoInput = ReposGetParams

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
