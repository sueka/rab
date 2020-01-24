import { inject, injectable } from 'inversify'

import ConfigRegistry from '~/config/ConfigRegistry'
import fetch from '~/lib/fetch'
import typed from '~/lib/typed'
import { asGetRepoResponse, asUnsuccessfulResponse } from '~/lib/validators/gitHubApiResourceValidators'
import GetRepo, { GetRepoInput, GetRepoOutput } from '~/useCase/GetRepo'

@injectable()
export default class GetRepoImpl implements GetRepo {
  @inject('EnvVarConfig') private config!: ConfigRegistry

  public async apply({ owner, repo }: GetRepoInput): Promise<GetRepoOutput> {
    const gitHubApiUrl = this.config.get('GITHUB_API_URL')

    const { response: { status }, body } = await fetch({
      method: 'GET',
      parameterizedEndpoint: typed<[string]>`${ gitHubApiUrl }/repos/:owner/:repo`,
      params: { owner, repo },
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    })

    if (status === 200) {
      return {
        successful: true,
        response: {
          status,
          body: asGetRepoResponse(body),
        },
      }
    } else {
      return {
        successful: false,
        response: {
          status,
          body: asUnsuccessfulResponse(body),
        },
      }
    }
  }
}
