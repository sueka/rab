import { injectable } from 'inversify'

import GitHubApi, { GetRepoInput } from '../useCase/GitHubApi'

@injectable()
export default class GitHubApiImpl implements GitHubApi {
  public async getRepo({}: GetRepoInput) {
    return {} as any
    // TODO: implement
  }
}
