import { injectable } from 'inversify'

import ConfigRegistry, { ConfigKey, ConfigKeyValueMap } from '~/config/ConfigRegistry'
import { isOneOf } from '~/lib/guards/commonGuards'
import typed from '~/lib/typed'

@injectable()
export default class EnvVarConfigRegistry implements ConfigRegistry {
  private env: Partial<ConfigKeyValueMap> = {
    DEBUG: isOneOf('1', 'TRUE', 'True', 'true')(process.env.DEBUG),
    BASE_NAME: process.env.BASE_NAME,
    GITHUB_API_URL: process.env.GITHUB_API_URL,
    USER_AUTHN_API_URL: process.env.USER_AUTHN_API_URL,
  }

  /**
   * @throws {Error} if not found.
   */
  public get<T extends ConfigKey>(name: T) {
    const value = this.env[name]

    if (value === undefined) {
      throw new Error(typed<[string]>`The ${ name } environment variable does not exist.`) // TODO:
    }

    return value as ConfigKeyValueMap[T] // FIXME
  }
}
