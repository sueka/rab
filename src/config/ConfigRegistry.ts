export interface ConfigKeyValueMap {
  DEBUG: boolean
  BASE_NAME: string
  GITHUB_API_URL: string
  USER_SERVICE_URL: string
  GTM_URL: string | undefined
  GTM_CONTAINER_ID: `GTM-${string}` | undefined
  SHEETS_API_URL: string
  GOOGLE_CLOUD_APIS_GOOGLE_SHEETS_API_KEY: string
  GOOGLE_SHEETS_FOSS_COMPARISON_TABLE_SHEET_ID: string
  GOOGLE_SHEETS_FOSS_COMPARISON_TABLE_SHEET_SHEET_NAME: string
}

export type ConfigKey = keyof ConfigKeyValueMap

export default interface ConfigRegistry {
  get<T extends ConfigKey>(name: T): ConfigKeyValueMap[T]
}
