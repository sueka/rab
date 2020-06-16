export type ConfigKey =
  | 'BASE_NAME'
  | 'GITHUB_API_URL'

export default interface ConfigRegistry {
  get(name: ConfigKey): string
}
