import * as React from 'react'
import { Route as OriginalRoute, RouteProps, RouteComponentProps } from 'react-router'

import CircularProgress from '@material-ui/core/CircularProgress'

import ErrorBoundary from '../ErrorBoundary'

const withErrorBoundary: (Component: React.ComponentType<RouteComponentProps> | React.ComponentType<unknown>) => React.FunctionComponent<RouteComponentProps> = (Component) => (props) => (
  <ErrorBoundary>
    <Component { ...props } />
  </ErrorBoundary>
)

const withSuspense: (Component: React.LazyExoticComponent<React.ComponentType<RouteComponentProps> | React.ComponentType<unknown>>) => React.FunctionComponent<RouteComponentProps> = (Component) => (props) => (
  <React.Suspense fallback={ <CircularProgress /> }>
    <Component { ...props } />
  </React.Suspense>
)

interface Props extends Omit<RouteProps, 'render' | 'component' | 'children'> {
  // TODO: ban mandatory props
  component?: Required<RouteProps>['component'] | React.LazyExoticComponent<Required<RouteProps>['component']>
}

const Route: React.FunctionComponent<Props> = ({ component, ...restProps }) => {
  if (component === undefined) {
    return <OriginalRoute { ...restProps } />
  }

  if ('_result' in component) { // FIXME: if LazyExoticComponent
    return <OriginalRoute component={ withErrorBoundary(withSuspense(component)) } { ...restProps } />
  } else {
    return <OriginalRoute component={ withErrorBoundary(component) } { ...restProps } />
  }
}

export default Route
