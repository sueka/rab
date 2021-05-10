import { injectable } from 'inversify'
import { generatePath } from 'react-router'

import { shouldBePresent } from '~/lib/asserters/commonAsserters'
import fetch from '~/lib/fetch'
import typed from '~/lib/typed'
import { asGetRepoResponse, asUnsuccessfulResponse } from '~/lib/validators/gitHubApiResourceValidators'
import GetRepo, { GetRepoInput, GetRepoOutput } from '~/useCase/GetRepo'

@injectable()
export default class GetRepoImpl implements GetRepo {
  public async apply({ owner, repo }: GetRepoInput): Promise<GetRepoOutput> {
    shouldBePresent(process.env.GITHUB_API_URL)

    const response = await fetch(generatePath(typed<[string]>`${ process.env.GITHUB_API_URL }/repos/:owner/:repo`, { owner, repo }), {
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
