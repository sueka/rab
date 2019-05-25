import 'reflect-metadata'

import { Container } from 'inversify'

import ConfigRegistry from './config/ConfigRegistry'
import EnvVarConfigRegistry from './infrastructure/EnvVarConfigRegistry'

import GetGitRepo from './useCase/GetGitRepo'
import GetGitHubRepo from './infrastructure/GetGitHubRepo'

const container = new Container()

container.bind<ConfigRegistry>('EnvVarConfig').to(EnvVarConfigRegistry)
container.bind<GetGitRepo>('GetGitRepo').to(GetGitHubRepo)

export default container
