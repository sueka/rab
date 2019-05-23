import * as assert from 'assert'

import { UnreachableError } from './lib/errors'

type EnvVarName =
  | 'GITHUB_API_V3_ORIGIN'

class Config {
  constructor(private env: NodeJS.ProcessEnv) {}

  /**
   * @throws {AssertionError|UnreachableError}
   */
  public get(name: EnvVarName) {
    const value = this.env[name]

    assert(value !== undefined, `The ${ name } environment variable does not exist.`)

    if (value === undefined) {
      throw new UnreachableError() // for type guarding
    }

    return value
  }
}

export default new Config(process.env)
