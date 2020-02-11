export type ConfigKey =
  | 'BASE_URL'
  | 'GITHUB_API_URL'

export default interface ConfigRegistry {
  get(name: ConfigKey): string
}
