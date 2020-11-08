export interface ConfigKeyValueMap {
  DEBUG: boolean
  BASE_NAME: string
  GITHUB_API_URL: string
  USER_AUTHN_API_URL: string
}

export type ConfigKey = keyof ConfigKeyValueMap

export default interface ConfigRegistry {
  get<T extends ConfigKey>(name: T): ConfigKeyValueMap[T]
}
