declare const FaviconNotification: {
  init(options: InitOptions): void
  add(): void
  remove(): void
}

interface InitOptions {
  url?: string
  color?: string
  lineColor?: string
}

export default FaviconNotification
