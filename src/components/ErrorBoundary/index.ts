import React from 'react'

interface Props {
  /**
   * @param children that throws `error`
   */
  renderError(error: unknown, children: React.ReactNode): React.ReactNode
}

interface State {
  hasError: boolean
  error?: unknown
}

class ErrorBoundary extends React.Component<Props, State> {

  // NOTE: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/826ce0f1ce1d1887d199986283630d6f63075ad5/types/react/index.d.ts#L419 にも関わらず、初期化されていない state は null であるため、初期化を強制するためにプロパティ宣言を行う。
  public override state: Readonly<State> = {
    hasError: false,
  }

  public static getDerivedStateFromError = (error: unknown) => ({
    hasError: true,
    error,
  })

  public override render() {
    const { renderError, children } = this.props
    const { hasError, error } = this.state

    if (hasError) {
      return renderError(error, children)
    }

    return children
  }
}

export default ErrorBoundary
