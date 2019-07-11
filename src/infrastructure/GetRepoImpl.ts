import { injectable, inject } from 'inversify'

import { typed } from '../lib/commonFunctions'
import {
  validateAsGetRepoResponse,
  validateAsUnsuccessfulResponse,
} from '../lib/validators/gitHubApiResponseValidators'
import fetch from '../lib/fetch'
import ConfigRegistry from '../config/ConfigRegistry'
import GetRepo, { GetRepoInput, GetRepoOutput } from '../useCase/GetRepo'

@injectable()
export default class GetRepoImpl implements GetRepo {
  @inject('EnvVarConfig') private config!: ConfigRegistry

  public async apply({ owner, repo }: GetRepoInput): Promise<GetRepoOutput> {
    const origin = this.config.get('GITHUB_API_V3_ORIGIN')

    if (origin == null) {
      return {
        successful: false,
      }
    }

    const { response: { status }, body } = await fetch({
      method: 'GET',
      parameterizedEndpoint: typed<string>`${ origin }/repos/:owner/:repo`,
      params: { owner, repo },
    })

    if (status === 200) {
      return {
        successful: true,
        response: {
          status,
          body: validateAsGetRepoResponse(body),
        },
      }
    } else {
      return {
        successful: false,
        response: {
          status,
          body: validateAsUnsuccessfulResponse(body),
        },
      }
    }
  }
}
