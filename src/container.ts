import 'reflect-metadata'

import { Container } from 'inversify'

import ConfigRegistry from './config/ConfigRegistry'
import EnvVarConfigRegistry from './infrastructure/EnvVarConfigRegistry'

import GetGitRepo from './useCase/GetGitRepo'
import GetGitHubRepo from './infrastructure/GetGitHubRepo'

import GitRepoRepository from './repositories/GitRepoRepository'
import GitHubRepoRepository from './infrastructure/GitHubRepoRepository'

const container = new Container()

container.bind<ConfigRegistry>('EnvVarConfig').to(EnvVarConfigRegistry)
container.bind<GetGitRepo>('GetGitRepo').to(GetGitHubRepo)
container.bind<GitRepoRepository>('GitRepoRepository').to(GitHubRepoRepository)

export default container
