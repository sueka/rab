import { Repository } from '../types/gitHubResourceTypes'

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

export default interface GitHubApi {
  getRepo(input: GetRepoInput): Promise<GetRepoOutput>
}
