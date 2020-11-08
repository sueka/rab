export type ConfigKey =
  | 'DEBUG'
  | 'BASE_NAME'
  | 'GITHUB_API_URL'
  | 'USER_AUTHN_API_URL'

export default interface ConfigRegistry {
  get(name: ConfigKey): string
}
