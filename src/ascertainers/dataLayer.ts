export {}

declare global {
  interface Window {
    dataLayer: any[]
  }
}

declare const globalThis: Window

globalThis.dataLayer = globalThis.dataLayer ?? []
