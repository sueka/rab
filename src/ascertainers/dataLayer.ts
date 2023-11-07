export {}

declare global {
  interface Window {
    readonly dataLayer: (IArguments | DataEvent)[]
  }
}

interface DataEvent {
  event: string
  'gtm.uniqueEventId'?: number
}

declare const globalThis: Window

// @ts-expect-error TS2540
globalThis.dataLayer = globalThis.dataLayer ?? []
