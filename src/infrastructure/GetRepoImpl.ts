import { injectable, inject } from 'inversify'

import typed from 'src/lib/typed'
import {
  asGetRepoResponse,
  asUnsuccessfulResponse,
} from 'src/lib/validators/gitHubApiResponseValidators'
import fetch from 'src/lib/fetch'
import ConfigRegistry from 'src/config/ConfigRegistry'
import GetRepo, { GetRepoInput, GetRepoOutput } from 'src/useCase/GetRepo'

@injectable()
export default class GetRepoImpl implements GetRepo {
  @inject('EnvVarConfig') private config!: ConfigRegistry

  public async apply({ owner, repo }: GetRepoInput): Promise<GetRepoOutput> {
    const origin = this.config.get('GITHUB_API_V3_ORIGIN')

    const { response: { status }, body } = await fetch({
      method: 'GET',
      parameterizedEndpoint: typed<[string]>`${ origin }/repos/:owner/:repo`,
      params: { owner, repo },
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
