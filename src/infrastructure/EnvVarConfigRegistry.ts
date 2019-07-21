import { injectable } from 'inversify'

import { typed } from 'src/lib/commonFunctions'
import ConfigRegistry, { ConfigKey } from 'src/config/ConfigRegistry'

@injectable()
export default class EnvVarConfigRegistry implements ConfigRegistry {
  private env: Record<ConfigKey, string | undefined> = {
    GITHUB_API_V3_ORIGIN: process.env.GITHUB_API_V3_ORIGIN,
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
