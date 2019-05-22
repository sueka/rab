export interface GetRepoInput {
  owner: string
  repo: string
}

export interface GetRepoOutput {
  successful: boolean
  response: {
    status: number
    body: Repository
  }
}

export default interface GetRepo {
  apply(input: GetRepoInput): Promise<GetRepoOutput>
}
