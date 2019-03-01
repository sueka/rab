import { Container } from 'inversify'
import getDecorators from 'inversify-inject-decorators'

import { GitHubApi } from './useCase'
import { GitHubApiImpl } from './infrastructure'

export const container = new Container()

container.bind<GitHubApi>('GHA').to(GitHubApiImpl)

const { lazyInject } = getDecorators(container, false)

export { lazyInject }
