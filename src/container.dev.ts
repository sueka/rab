import { Container } from 'inversify'

import ConfigRegistry from './config/ConfigRegistry'
import TaskRepository from './domain/repository/TaskRepository'
import EnvVarConfigRegistry from './infrastructure/EnvVarConfigRegistry'
import GetRepoStubImpl from './infrastructure/double/GetRepoStubImpl'
import TaskRepositoryFakeImpl from './infrastructure/persistence/double/TaskRepositoryFakeImpl'
import Service from './redux'
import { ChessService } from './redux/modules/chess'
import { CounterService } from './redux/modules/counter'
import { IoService } from './redux/modules/io'
import LocaleSelectorService from './redux/modules/localeSelector'
import ReminderService from './redux/modules/reminder'
import GetRepo from './useCase/GetRepo'

const container = new Container

container.bind<ConfigRegistry>('EnvVarConfig').to(EnvVarConfigRegistry)
container.bind<GetRepo>('GetRepo').to(GetRepoStubImpl)
container.bind<TaskRepository>('TaskRepository').to(TaskRepositoryFakeImpl)
container.bind<Service>('Service').to(Service)
container.bind<ChessService>('ChessService').to(ChessService)
container.bind<CounterService>('CounterService').to(CounterService)
container.bind<IoService>('IoService').to(IoService)
container.bind<LocaleSelectorService>('LocaleSelectorService').to(LocaleSelectorService)
container.bind<ReminderService>('ReminderService').to(ReminderService)

export default container
