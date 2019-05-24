export type ConfigKey =
  | 'GITHUB_API_V3_ORIGIN'

export default interface ConfigRegistry {
  get(name: ConfigKey): unknown
}
