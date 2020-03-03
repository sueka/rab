import { injectable } from 'inversify'

import { asUrl } from '~/lib/validators/stringValidators'
import GetRepo, { GetRepoOutput } from '~/useCase/GetRepo'

@injectable()
export default class GetRepoStubImpl implements GetRepo {
  public async apply(): Promise<GetRepoOutput> {
    return {
      successful: true,
      response: {
        status: 200,
        body: {
          fullName: 'anonymous/foobar',
          htmlUrl: asUrl('https://github.com/anonymous/foobar.git'),
        },
      },
    }
  }
}
