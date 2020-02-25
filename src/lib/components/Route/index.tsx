import React from 'react'
import { Route as OriginalRoute, RouteComponentProps, RouteProps } from 'react-router'

import CircularProgress from '@material-ui/core/CircularProgress'

const withSuspense: (Component: React.LazyExoticComponent<React.ComponentType<RouteComponentProps>>) => React.ComponentType<RouteComponentProps> = (Component) => (props) => (
  <React.Suspense fallback={ <CircularProgress /> }>
    <Component { ...props } />
  </React.Suspense>
)

interface Props extends Alt.Omit<RouteProps, 'render' | 'component' | 'children'> {
  // TODO: ban mandatory props
  component?: Required<RouteProps>['component'] | React.LazyExoticComponent<Required<RouteProps>['component']>
}

const Route: React.FunctionComponent<Props> = ({ component, ...restProps }) => {
  if (component === undefined) {
    return <OriginalRoute { ...restProps } />
  }

  if ('_result' in component) { // FIXME: if LazyExoticComponent
    return <OriginalRoute component={ withSuspense(component) } { ...restProps } />
  } else {
    return <OriginalRoute component={ component } { ...restProps } />
  }
}

export default Route
