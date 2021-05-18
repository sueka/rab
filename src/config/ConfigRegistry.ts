export interface ConfigKeyValueMap {
  DEBUG: boolean
  BASE_NAME: string
  GITHUB_API_URL: string
  USER_SERVICE_URL: string
  GTM_CONTAINER_ID: `GTM-${string}` | undefined
}

export type ConfigKey = keyof ConfigKeyValueMap

export default interface ConfigRegistry {
  get<T extends ConfigKey>(name: T): ConfigKeyValueMap[T]
}
