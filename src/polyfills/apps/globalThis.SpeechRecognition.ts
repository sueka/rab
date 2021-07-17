export {}

declare global {
  interface Window { // TODO: Prefer globalThis
    webkitSpeechRecognition?: typeof SpeechRecognition
  }
}

declare const globalThis: Window

if (!('SpeechRecognition' in globalThis) && globalThis.webkitSpeechRecognition !== undefined) {
  Object.defineProperty(globalThis, 'SpeechRecognition', {
    value: globalThis.webkitSpeechRecognition,
  })
}
