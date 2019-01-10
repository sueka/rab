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
    const { component, ...rest } = this.props

    if (component === undefined) {
      return <OriginalRoute { ...rest } />
    }

    return <OriginalRoute component={ Route.withErrorBoundary(component) } { ...rest } />
  }
}

export default Route
