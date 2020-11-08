import { injectable } from 'inversify'

import ConfigRegistry, { ConfigKey, ConfigKeyValueMap } from '~/config/ConfigRegistry'
import { isOneOf, optional } from '~/lib/guards/commonGuards'
import { asRequired } from '~/lib/validators/commonValidators'

@injectable()
export default class EnvVarConfigRegistry implements ConfigRegistry {
  private configMap: ConfigKeyValueMap = {
    DEBUG: optional(isOneOf('1', 'TRUE', 'True', 'true'))(process.env.DEBUG) ?? false,
    BASE_NAME: asRequired(process.env.BASE_NAME),
    GITHUB_API_URL: asRequired(process.env.GITHUB_API_URL),
    USER_AUTHN_API_URL: asRequired(process.env.USER_AUTHN_API_URL),
  }

  /**
   * @throws {Error} if not found.
   */
  public get<T extends ConfigKey>(name: T) {
    return this.configMap[name]
  }
}
