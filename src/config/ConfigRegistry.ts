export type ConfigKey =
  | 'BASE'
  | 'GITHUB_API_URL'

export default interface ConfigRegistry {
  get(name: ConfigKey): string
}
