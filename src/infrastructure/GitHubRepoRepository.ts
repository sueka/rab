import { injectable } from 'inversify'

import container from '../container'
import GitRepoRepository from '../repositories/GitRepoRepository'
import GetGitRepo from '../useCase/GetGitRepo'

@injectable()
export default class GitHubRepoRepository implements GitRepoRepository {
  private getRepo: GetGitRepo = container.get('GetGitRepo')

  public findSelf(): Promise<Repository> {
    return this.find('sueka', 'react-app-prototype') // TODO: parameterize
  }

  public async find(owner: string, repo: string) {
    const output = await this.getRepo.apply({ owner, repo })

    if (output.successful) {
      return output.response.body
    } else {
      throw new Error()
    }
  }
}
