import { Repository } from '../gitHubResourceTypes'

export interface GetRepoInput {
  owner: string
  repo: string
}

export interface GetRepoOutput {
  response: {
    status: number
  }
  body: Repository
}

export default interface GitHubApi {
  getRepo(input: GetRepoInput): Promise<GetRepoOutput>
}
