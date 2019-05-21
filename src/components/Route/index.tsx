import * as React from 'react'
import { Route as OriginalRoute, RouteProps as Props, RouteComponentProps } from 'react-router'

import ErrorBoundary from '../ErrorBoundary'

// TODO: ban mandatory props
const withErrorBoundary: (Component: React.ComponentType<RouteComponentProps> | React.ComponentType<unknown>) => React.FunctionComponent<RouteComponentProps> = (Component) => (props) => (
  <ErrorBoundary>
    <React.Suspense fallback={ <div>loading..</div> }>
      <Component { ...props } />
    </React.Suspense>
  </ErrorBoundary>
)

class Route extends React.Component<Props> {
  public render() {
    const { component, ...restProps } = this.props

    if (component === undefined) {
      return <OriginalRoute { ...restProps } />
    }

    return <OriginalRoute component={ withErrorBoundary(component) } { ...restProps } />
  }
}

export default Route
