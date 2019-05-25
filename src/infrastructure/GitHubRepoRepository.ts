import { injectable } from 'inversify'

import container from '../container'
import GitRepoRepository from '../repositories/GitRepoRepository'
import GetGitRepo from '../useCase/GetGitRepo'

@injectable()
export default class GitHubRepoRepository implements GitRepoRepository {
  private getRepo: GetGitRepo = container.get('GetGitRepo')

  public async findSelf(): Promise<Repository> {
    return this.find('sueka', 'react-app-prototype') // TODO: parameterize
  }

  public async find(owner: string, repo: string) {
    const { successful, response: { body } } = await this.getRepo.apply({ owner, repo })

    if (successful) {
      return body
    }

    throw new Error()
  }
}
