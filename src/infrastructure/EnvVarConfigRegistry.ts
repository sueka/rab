import { injectable } from 'inversify'

import ConfigRegistry, { ConfigKey } from '../config/ConfigRegistry'

@injectable()
export default class EnvVarConfigRegistry implements ConfigRegistry {
  private env: Record<ConfigKey, string | undefined> = {
    GITHUB_API_V3_ORIGIN: process.env.GITHUB_API_V3_ORIGIN,
  }

  public get(name: ConfigKey) {
    return this.env[name]
  }
}
