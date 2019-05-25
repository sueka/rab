import { injectable } from 'inversify'

import container from '../container'
import { validateAsRepository } from '../lib/validators/gitHubResourceValidators'
import fetch from '../lib/fetch'
import ConfigRegistry from '../config/ConfigRegistry'
import GetGitRepo, { GetGitRepoInput, GetGitRepoOutput } from '../useCase/GetGitRepo'

@injectable()
export default class GetGitHubRepo implements GetGitRepo {
  private config: ConfigRegistry = container.get('EnvVarConfig')

  public async apply({ owner, repo }: GetGitRepoInput): Promise<GetGitRepoOutput> {
    const { response: { status }, body } = await fetch({
      method: 'GET',
      parameterizedEndpoint: `${ this.config.get('GITHUB_API_V3_ORIGIN') }/repos/:owner/:repo`,
      params: { owner, repo },
    })

    return {
      successful: status === 200,
      response: {
        status,
        body: validateAsRepository(body),
      },
    }
  }
}