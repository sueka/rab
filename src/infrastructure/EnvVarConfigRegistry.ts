import { injectable } from 'inversify'

import ConfigRegistry, { ConfigKey } from '~/config/ConfigRegistry'
import typed from '~/lib/typed'

@injectable()
export default class EnvVarConfigRegistry implements ConfigRegistry {
  private env: Record<ConfigKey, string | undefined> = {
    BASE_NAME: process.env.BASE_NAME,
    GITHUB_API_URL: process.env.GITHUB_API_URL,
    USER_AUTHN_API_URL: process.env.USER_AUTHN_API_URL,
  }

  /**
   * @throws {Error} if not found.
   */
  public get(name: ConfigKey) {
    const value = this.env[name]

    if (value === undefined) {
      throw new Error(typed<[string]>`The ${ name } environment variable does not exist.`) // TODO:
    }

    return value
  }
}
