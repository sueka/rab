export {}

declare global {
  interface Document {
    // fullscreenElement?: Document['fullscreenElement']
    webkitFullscreenElement?: Document['fullscreenElement']
  }
}

if (!('fullscreenElement' in Document.prototype)) {
  Object.defineProperty(Document.prototype, 'fullscreenElement', {
    get() {
      return document.webkitFullscreenElement
    },
  })
}
