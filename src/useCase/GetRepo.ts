export interface GetRepoInput {
  owner: string
  repo: string
}

interface SuccessfulGetRepoOutput {
  successful: true
  response: {
    status: number
    body: GitHubApiResponse.GetRepoResponse
  }
}

interface UnsuccessfulGetRepoOutput {
  successful: false
  response: {
    status: number
    body: GitHubApiResponse.UnsuccessfulResponse
  }
}

export type GetRepoOutput = SuccessfulGetRepoOutput | UnsuccessfulGetRepoOutput

export default interface GetRepo {
  apply(input: GetRepoInput): Promise<GetRepoOutput>
}
