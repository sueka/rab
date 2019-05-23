import * as assert from 'assert'
import { injectable } from 'inversify'

import { validateAsRepository } from '../lib/validators/gitHubResourceValidators'
import fetch from '../lib/fetch'
import GetRepo, { GetRepoInput, GetRepoOutput } from '../useCase/GetRepo'

@injectable()
export default class GetRepoImpl implements GetRepo {

  /**
   * @throws AssertionError
   */
  private checkInvariant() {

    // TODO: 環境変数を検査するメカニズムを導入する。
    assert(process.env.GITHUB_API_V3_ORIGIN !== undefined, 'The GITHUB_API_V3_ORIGIN environment variable does not exist.')
  }

  constructor() {
    this.checkInvariant()
  }

  public async apply({ owner, repo }: GetRepoInput): Promise<GetRepoOutput> {

    // TODO: no-process-env を有効にする。
    const { response: { status }, body } = await fetch({
      method: 'GET',
      parameterizedEndpoint: `${ process.env.GITHUB_API_V3_ORIGIN }/repos/:owner/:repo`,
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
