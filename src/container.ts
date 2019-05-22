import 'reflect-metadata'

import { Container } from 'inversify'

import GetRepo from './useCase/GetRepo'
import GetRepoImpl from './infrastructure/GetRepoImpl'

const container = new Container()

container.bind<GetRepo>('GetRepo').to(GetRepoImpl)

export default container
