import { Container } from 'inversify'

import ConfigRegistry from './config/ConfigRegistry'
import EnvVarConfigRegistry from './infrastructure/EnvVarConfigRegistry'
import { Service } from './redux'
import { CounterService } from './redux/modules/counter'
import { LocaleSelectorService } from './redux/modules/localeSelector'

import GetRepo from './useCase/GetRepo'
import GetRepoImpl from './infrastructure/GetRepoImpl'

const container = new Container()

container.bind<ConfigRegistry>('EnvVarConfig').to(EnvVarConfigRegistry)
container.bind<GetRepo>('GetRepo').to(GetRepoImpl)
container.bind<Service>('Service').to(Service)
container.bind<CounterService>(CounterService).toSelf()
container.bind<LocaleSelectorService>(LocaleSelectorService).toSelf()

export default container
