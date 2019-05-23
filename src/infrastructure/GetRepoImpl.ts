import { injectable } from 'inversify'

import config from '../config'
import { validateAsRepository } from '../lib/validators/gitHubResourceValidators'
import fetch from '../lib/fetch'
import GetRepo, { GetRepoInput, GetRepoOutput } from '../useCase/GetRepo'

@injectable()
export default class GetRepoImpl implements GetRepo {
  public async apply({ owner, repo }: GetRepoInput): Promise<GetRepoOutput> {

    // TODO: no-process-env を有効にする。
    const { response: { status }, body } = await fetch({
      method: 'GET',
      parameterizedEndpoint: `${ config.get('GITHUB_API_V3_ORIGIN') }/repos/:owner/:repo`,
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
