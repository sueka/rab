import * as React from 'react'
import { Omit } from 'react-redux'
import { Route as OriginalRoute, RouteProps, RouteComponentProps } from 'react-router'

import ErrorBoundary from '../ErrorBoundary'

const withErrorBoundary: (Component: React.ComponentType<RouteComponentProps> | React.ComponentType<unknown>) => React.FunctionComponent<RouteComponentProps> = (Component) => (props) => (
  <ErrorBoundary>
    <Component { ...props } />
  </ErrorBoundary>
)

const withSuspense: (Component: React.LazyExoticComponent<React.ComponentType<RouteComponentProps> | React.ComponentType<unknown>>) => React.FunctionComponent<RouteComponentProps> = (Component) => (props) => (
  <React.Suspense fallback={ <div>loading..</div> }>
    <Component { ...props } />
  </React.Suspense>
)

interface Props extends Omit<RouteProps, 'render' | 'component' | 'children'> {
  // TODO: ban mandatory props
  component?: Required<RouteProps>['component'] | React.LazyExoticComponent<Required<RouteProps>['component']>
}

class Route extends React.Component<Props> {
  public render() {
    const { component, ...restProps } = this.props

    if (component === undefined) {
      return <OriginalRoute { ...restProps } />
    }

    if ('_result' in component) { // FIXME: if LazyExoticComponent
      return <OriginalRoute component={ withErrorBoundary(withSuspense(component)) } { ...restProps } />
    } else {
      return <OriginalRoute component={ withErrorBoundary(component) } { ...restProps } />
    }

  }
}

export default Route
