import * as React from 'react'
import { Route as OriginalRoute, RouteProps, RouteComponentProps } from 'react-router'

import ErrorBoundary from '../ErrorBoundary'

class Route extends React.Component<RouteProps> {
  private static withErrorBoundary: (Component: React.ComponentType<RouteComponentProps> | React.ComponentType<unknown>) => React.FunctionComponent<RouteComponentProps> = (Component) => (props) => (
    <ErrorBoundary>
      <Component { ...props } />
    </ErrorBoundary>
  )

  public render() {
    const { component, ...restProps } = this.props

    if (component === undefined) {
      return <OriginalRoute { ...restProps } />
    }

    return <OriginalRoute component={ Route.withErrorBoundary(component) } { ...restProps } />
  }
}

export default Route
