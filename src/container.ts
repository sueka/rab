import 'reflect-metadata'

import { Container } from 'inversify'

import GitHubApi from './useCase/GitHubApi'
import GitHubApiImpl from './infrastructure/GitHubApiImpl'

const container = new Container()

container.bind<GitHubApi>('GitHubApi').to(GitHubApiImpl)

export default container
