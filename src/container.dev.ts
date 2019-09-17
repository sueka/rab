import { Container } from 'inversify'

import ConfigRegistry from './config/ConfigRegistry'
import EnvVarConfigRegistry from './infrastructure/EnvVarConfigRegistry'
import { Service } from './redux'
import { CounterService } from './redux/modules/counter'
import { LocaleSelectorService } from './redux/modules/localeSelector'
import { ReminderService } from './redux/modules/reminder'

import GetRepo from './useCase/GetRepo'
import GetRepoStubImpl from './infrastructure/double/GetRepoStubImpl'

import TaskRepository from './domain/repository/TaskRepository'
import TaskRepositoryFakeImpl from './infrastructure/persistence/double/TaskRepositoryFakeImpl'

const container = new Container

container.bind<ConfigRegistry>('EnvVarConfig').to(EnvVarConfigRegistry)
container.bind<GetRepo>('GetRepo').to(GetRepoStubImpl)
container.bind<TaskRepository>('TaskRepository').to(TaskRepositoryFakeImpl)
container.bind<Service>('Service').to(Service)
container.bind<CounterService>(CounterService).toSelf()
container.bind<LocaleSelectorService>(LocaleSelectorService).toSelf()
container.bind<ReminderService>(ReminderService).toSelf()

export default container
