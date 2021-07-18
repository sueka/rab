export {}

declare global {
  interface Element {
    // requestFullscreen?: Element['requestFullscreen']
    webkitRequestFullscreen?: Element['requestFullscreen']
  }
}

if (!('requestFullscreen' in Element.prototype)) {
  Object.defineProperty(Element.prototype, 'requestFullscreen', {
    value: Element.prototype.webkitRequestFullscreen,
  })
}
