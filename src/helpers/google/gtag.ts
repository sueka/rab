import '~/ascertainers/dataLayer'

type Command =
  | 'config'
  | 'get'
  | 'set'
  | 'event'
  | 'consent'

type ConsentArg = 'default' | 'update'

interface ConsentParams {
  ad_storage?: 'granted' | 'denied'
  analytics_storage?: 'granted' | 'denied'
  wait_for_update?: number // natural
}

declare const globalThis: Window

// NOTE: Tag Manager does not distinguish whether Google Tag (gtag.js) is global or not, as long as it `push`es `arguments`.
export default function gtag(command: 'consent', arg: ConsentArg, params: ConsentParams): void
export default function gtag(_command: Command, ..._commandParams: any[]) {
  globalThis.dataLayer.push(arguments)
}
