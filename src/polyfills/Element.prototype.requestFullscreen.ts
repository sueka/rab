export {}

declare global {
  interface Element {
    webkitRequestFullscreen?: Element['requestFullscreen']
  }
}

const requestFullscreen: Element['requestFullscreen'] = async function (this: Element, options) {
  if ('webkitRequestFullscreen' in this && this.webkitRequestFullscreen !== undefined) {
    this.webkitRequestFullscreen(options)
  } else {
    this.requestFullscreen(options)
  }
}

Object.defineProperty(Element.prototype, 'requestFullscreen', {
  value: requestFullscreen,
})
