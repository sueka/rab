import { Container } from 'inversify'

import ConfigRegistry from './config/ConfigRegistry'
import TaskRepository from './domain/repository/TaskRepository'
import EnvVarConfigRegistry from './infrastructure/EnvVarConfigRegistry'
import GetRepoStubImpl from './infrastructure/double/GetRepoStubImpl'
import TaskRepositoryFakeImpl from './infrastructure/persistence/double/TaskRepositoryFakeImpl'
import Service from './redux'
import { CounterService } from './redux/modules/counter'
import { IoService } from './redux/modules/io'
import { LocaleSelectorService } from './redux/modules/localeSelector'
import ReminderService from './redux/modules/reminder'
import GetRepo from './useCase/GetRepo'

const container = new Container

container.bind<ConfigRegistry>('EnvVarConfig').to(EnvVarConfigRegistry)
container.bind<GetRepo>('GetRepo').to(GetRepoStubImpl)
container.bind<TaskRepository>('TaskRepository').to(TaskRepositoryFakeImpl)
container.bind<Service>('Service').to(Service)
container.bind<CounterService>(CounterService).toSelf()
container.bind<IoService>(IoService).toSelf()
container.bind<LocaleSelectorService>(LocaleSelectorService).toSelf()
container.bind<ReminderService>(ReminderService).toSelf()

export default container
