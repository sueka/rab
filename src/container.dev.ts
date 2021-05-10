import { Container } from 'inversify'

import TaskRepository from '~/domain/repository/TaskRepository'
import GetRepoStubImpl from '~/infrastructure/double/GetRepoStubImpl'
import TaskRepositoryFakeImpl from '~/infrastructure/persistence/double/TaskRepositoryFakeImpl'
import Service from '~/redux'
import { ChessService } from '~/redux/modules/chess'
import { CounterService } from '~/redux/modules/counter'
import { IoService } from '~/redux/modules/io'
import LocaleSelectorService from '~/redux/modules/localeSelector'
import ReminderService from '~/redux/modules/reminder'
import UserAuthnService from '~/redux/modules/userAuthn'
import GetRepo from '~/useCase/GetRepo'

const container = new Container

container.bind<GetRepo>('GetRepo').to(GetRepoStubImpl)
container.bind<TaskRepository>('TaskRepository').to(TaskRepositoryFakeImpl)
container.bind(Service).toSelf()
container.bind(ChessService).toSelf()
container.bind(CounterService).toSelf()
container.bind(IoService).toSelf()
container.bind(LocaleSelectorService).toSelf()
container.bind(ReminderService).toSelf()
container.bind(UserAuthnService).toSelf()

export default container
