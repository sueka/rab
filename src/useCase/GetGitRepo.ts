export interface GetGitRepoInput {
  owner: string
  repo: string
}

interface SuccessfulGetGitRepoOutput {
  successful: true
  response: {
    status: number
    body: GetRepoResponse
  }
}

interface UnsuccessfulGetGitRepoOutput {
  successful: false
  response: {
    status: number
    body: UnsuccessfulResponse
  }
}

export type GetGitRepoOutput = SuccessfulGetGitRepoOutput | UnsuccessfulGetGitRepoOutput

export default interface GetGitRepo {
  apply(input: GetGitRepoInput): Promise<GetGitRepoOutput>
}
