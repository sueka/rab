export {}

declare global {
  interface Document {
    webkitExitFullscreen?: Document['exitFullscreen']
  }
}

const exitFullscreen: Document['exitFullscreen'] = async function (this: Document) {
  if ('webkitExitFullscreen' in this && this.webkitExitFullscreen !== undefined) {
    this.webkitExitFullscreen()
  } else {
    this.exitFullscreen()
  }
}

Object.defineProperty(Document.prototype, 'exitFullscreen', {
  value: exitFullscreen,
})
