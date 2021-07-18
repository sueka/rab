export {}

declare global {
  interface Document {
    // fullscreenEnabled?: Document['fullscreenEnabled']
    webkitFullscreenEnabled?: Document['fullscreenEnabled']
  }
}

if (!('fullscreenEnabled' in Document.prototype)) {
  Object.defineProperty(Document.prototype, 'fullscreenEnabled', {
    value: document.webkitFullscreenEnabled,
  })
}
