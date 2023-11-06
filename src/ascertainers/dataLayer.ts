export {}

declare global {
  interface Window {
    dataLayer: (IArguments | DataEvent)[]
  }
}

interface DataEvent {
  event: string
  'gtm.uniqueEventId'?: number
}

declare const globalThis: Window

globalThis.dataLayer = globalThis.dataLayer ?? []
