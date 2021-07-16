export {}

declare global {
  interface Document {
    // exitFullscreen?: Document['exitFullscreen']
    webkitExitFullscreen?: Document['exitFullscreen']
  }
}

if (!('exitFullscreen' in Document.prototype)) {
  const exitFullscreen: Document['exitFullscreen'] = async function (this: Document) {
    if ('webkitExitFullscreen' in this) {
      this.webkitExitFullscreen?.()
    }
  }

  Object.defineProperty(Document.prototype, 'exitFullscreen', {
    value: exitFullscreen,
  })
}
