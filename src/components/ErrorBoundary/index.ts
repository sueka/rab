import * as React from 'react'

interface LocalState {
  hasError: boolean
  error?: unknown
}

class ErrorBoundary extends React.Component<unknown, LocalState> {

  // NOTE: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/826ce0f1ce1d1887d199986283630d6f63075ad5/types/react/index.d.ts#L419 にも関わらず、初期化されていない state は null であるため、初期化を強制するためにプロパティ宣言を行う。
  public state: Readonly<LocalState> = {
    hasError: false,
  }

  public static getDerivedStateFromError = (error: unknown) => ({
    hasError: true,
    error,
  })

  public render() {
    const { children } = this.props
    const { hasError, error } = this.state

    if (hasError) {
      if (error instanceof Error) {
        return `${ error }`
      }

      throw new TypeError(`${ error } is not an error.`)
    }

    return children
  }
}

export default ErrorBoundary
