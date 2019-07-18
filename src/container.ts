import { Container } from 'inversify'

import ConfigRegistry from './config/ConfigRegistry'
import EnvVarConfigRegistry from './infrastructure/EnvVarConfigRegistry'

import GetRepo from './useCase/GetRepo'
import GetRepoImpl from './infrastructure/GetRepoImpl'

const container = new Container()

container.bind<ConfigRegistry>('EnvVarConfig').to(EnvVarConfigRegistry)
container.bind<GetRepo>('GetRepo').to(GetRepoImpl)

export default container
