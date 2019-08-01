import { injectable } from 'inversify'

import GetRepo, { GetRepoOutput } from 'src/useCase/GetRepo'

@injectable()
export default class GetRepoStubImpl implements GetRepo {
  public async apply(): Promise<GetRepoOutput> {
    return {
      successful: true,
      response: {
        status: 200,
        body: {
          name: 'foobar',
        },
      },
    }
  }
}
