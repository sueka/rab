export {}

declare global {
  interface Element {
    // requestFullscreen?: Element['requestFullscreen']
    webkitRequestFullscreen?: Element['requestFullscreen']
  }
}

if (!('requestFullscreen' in Element.prototype)) {
  const requestFullscreen: Element['requestFullscreen'] = async function (this: Element, options) {
    if ('webkitRequestFullscreen' in this) {
      this.webkitRequestFullscreen?.(options)
    }
  }

  Object.defineProperty(Element.prototype, 'requestFullscreen', {
    value: requestFullscreen,
  })
}
