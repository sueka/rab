import { inject, injectable } from 'inversify'
import { generatePath } from 'react-router'

import ConfigRegistry from '~/config/ConfigRegistry'
import fetch from '~/fetch'
import typed from '~/typed'
import GetRepo, { GetRepoInput, GetRepoOutput } from '~/useCase/GetRepo'
import { asGetRepoResponse, asUnsuccessfulResponse } from '~/validators/gitHubApiResourceValidators'

@injectable()
export default class GetRepoImpl implements GetRepo {
  constructor(
    @inject('EnvVarConfig') private config: ConfigRegistry
  ) {}

  public async apply({ owner, repo }: GetRepoInput): Promise<GetRepoOutput> {
    const gitHubApiUrl = this.config.get('GITHUB_API_URL')

    const response = await fetch(generatePath(typed<[string]>`${ gitHubApiUrl }/repos/:owner/:repo`, { owner, repo }), {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    })

    if (response.status === 200) {
      return {
        successful: true,
        response: {
          status: response.status,
          body: asGetRepoResponse(await response.json()),
        },
      }
    } else {
      return {
        successful: false,
        response: {
          status: response.status,
          body: asUnsuccessfulResponse(await response.json()),
        },
      }
    }
  }
}
