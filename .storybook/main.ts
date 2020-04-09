import { Configuration } from 'webpack'

import ourConfig from '../webpack.config'

module.exports = {
  addons: [
    '@storybook/addon-knobs/register',
  ],
  async webpackFinal(theirConfig: Configuration): Promise<Configuration> {
    theirConfig.resolve.extensions.push(...ourConfig.resolve.extensions)
    theirConfig.resolve.modules.push(...ourConfig.resolve.modules)
    Object.assign(theirConfig.resolve.alias, ourConfig.resolve.alias)
    theirConfig.module.rules = ourConfig.module.rules // NOTE: 同じローダーが複数回適用されると落ちることがある

    return theirConfig
  },
}
