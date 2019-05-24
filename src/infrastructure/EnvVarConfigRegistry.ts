import * as assert from 'assert'
import { injectable } from 'inversify'

import { UnreachableError } from '../lib/errors'
import ConfigRegistry, { ConfigKey } from '../config/ConfigRegistry'

@injectable()
export default class EnvVarConfigRegistry implements ConfigRegistry {
  private env: Record<ConfigKey, unknown | undefined> = {
    GITHUB_API_V3_ORIGIN: process.env.GITHUB_API_V3_ORIGIN,
  }

  /**
   * @throws {AssertionError|UnreachableError}
   */
  public get(name: ConfigKey) {
    const value = this.env[name]

    assert(value !== undefined, `The ${ name } environment variable does not exist.`)

    if (value === undefined) {
      throw new UnreachableError() // for type guarding
    }

    return value
  }
}
