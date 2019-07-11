export interface GetRepoInput {
  owner: string
  repo: string
}

interface SuccessfulGetRepoOutput {
  successful: true
  response: {
    status: number
    body: GetRepoResponse
  }
}

interface UnsuccessfulGetRepoOutput {
  successful: false
  response?: {
    status: number
    body: UnsuccessfulResponse
  }
}

export type GetRepoOutput = SuccessfulGetRepoOutput | UnsuccessfulGetRepoOutput

export default interface GetRepo {
  apply(input: GetRepoInput): Promise<GetRepoOutput>
}
