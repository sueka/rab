import { injectable } from 'inversify'

import ConfigRegistry, { ConfigKey, ConfigKeyValueMap } from '~/config/ConfigRegistry'
import { isOneOf, optional as guardOptional } from '~/guards/commonGuards'
import { asConstant, asRequired, ignore, optional as validatorOptional, unionOf } from '~/validators/commonValidators'
import { asGtmContainerIdLike } from '~/validators/stringValidators'

@injectable()
export default class EnvVarConfigRegistry implements ConfigRegistry {
  private configMap: ConfigKeyValueMap = {
    DEBUG: guardOptional(isOneOf('1', 'TRUE', 'True', 'true'))(process.env.DEBUG) ?? false,
    BASE_NAME: asRequired(process.env.BASE_NAME),
    GITHUB_API_URL: asRequired(process.env.GITHUB_API_URL),
    USER_SERVICE_URL: asRequired(process.env.USER_SERVICE_URL),
    GTM_URL: process.env.GTM_URL,
    GTM_CONTAINER_ID: validatorOptional(unionOf(asGtmContainerIdLike, ignore(asConstant(''))))(process.env.GTM_CONTAINER_ID),
  }

  /**
   * @throws `Error` if not found.
   */
  public get<T extends ConfigKey>(name: T) {
    return this.configMap[name]
  }
}
