import { Container } from 'inversify'

import ConfigRegistry from './config/ConfigRegistry'
import EnvVarConfigRegistry from './infrastructure/EnvVarConfigRegistry'

import GetRepo from './useCase/GetRepo'
import GetRepoStubImpl from './infrastructure/double/GetRepoStubImpl'

const container = new Container()

container.bind<ConfigRegistry>('EnvVarConfig').to(EnvVarConfigRegistry)
container.bind<GetRepo>('GetRepo').to(GetRepoStubImpl)

export default container
