import { Container } from 'inversify'

import { GitHubApi } from './useCase'
import { GitHubApiImpl } from './infrastructure'

const container = new Container()

container.bind<GitHubApi>('GitHubApi').to(GitHubApiImpl)

export default container
