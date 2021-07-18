export {}

declare global {
  interface Document {
    // exitFullscreen?: Document['exitFullscreen']
    webkitExitFullscreen?: Document['exitFullscreen']
  }
}

if (!('exitFullscreen' in Document.prototype)) {
  Object.defineProperty(Document.prototype, 'exitFullscreen', {
    value: Document.prototype.webkitExitFullscreen,
  })
}
