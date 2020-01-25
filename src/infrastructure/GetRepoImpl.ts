import Octokit from '@octokit/rest'
import { inject, injectable } from 'inversify'

import ConfigRegistry from '~/config/ConfigRegistry'
import { asGetRepoResponse, asUnsuccessfulResponse } from '~/lib/validators/gitHubApiResourceValidators'
import GetRepo, { GetRepoInput, GetRepoOutput } from '~/useCase/GetRepo'

@injectable()
export default class GetRepoImpl implements GetRepo {
  private octokit: Octokit

  constructor(
    @inject('EnvVarConfig') private config: ConfigRegistry
  ) {
    this.octokit = new Octokit({
      baseUrl: this.config.get('GITHUB_API_URL'),
    })
  }

  public async apply({ owner, repo }: GetRepoInput): Promise<GetRepoOutput> {
    const { status, data } = await this.octokit.repos.get({ owner, repo })

    if (status === 200) {
      return {
        successful: true,
        response: {
          status,
          body: asGetRepoResponse(data),
        },
      }
    } else {
      return {
        successful: false,
        response: {
          status,
          body: asUnsuccessfulResponse(data), // FIXME: レスポンス間違ってるかも
        },
      }
    }
  }
}
