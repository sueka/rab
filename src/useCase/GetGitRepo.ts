export interface GetGitRepoInput {
  owner: string
  repo: string
}

export interface GetGitRepoOutput {
  successful: boolean
  response: {
    status: number
    body: Repository
  }
}

export default interface GetGitRepo {
  apply(input: GetGitRepoInput): Promise<GetGitRepoOutput>
}
