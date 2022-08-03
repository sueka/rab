import CircularProgress from '@material-ui/core/CircularProgress'
import React from 'react'
import { Route as OriginalRoute, RouteComponentProps, RouteProps } from 'react-router'

const withSuspense: (Component: React.LazyExoticComponent<React.ComponentType<RouteComponentProps>>) => React.ComponentType<RouteComponentProps> = (Component) => (props) => (
  <React.Suspense fallback={ <CircularProgress /> }>
    <Component { ...props } />
  </React.Suspense>
)

interface Props extends Alt.Omit<RouteProps, 'render' | 'component' | 'children'> {
  // TODO: Ban mandatory props
  component?: Required<RouteProps>['component'] | React.LazyExoticComponent<Required<RouteProps>['component']>
}

// FIXME: React の実装 (https://github.com/facebook/react/blob/v17.0.1/packages/react/src/ReactLazy.js, https://github.com/facebook/react/blob/v17.0.1/packages/shared/ReactSymbols.js) に依存しないようにする。
function isLazyExoticComponent<T extends React.ComponentType<any>>(component: T | React.LazyExoticComponent<T>): component is React.LazyExoticComponent<T> {
  return '$$typeof' in component && component.$$typeof === Symbol.for('react.lazy')
}

const Route: React.FC<Props> = ({ component, ...restProps }) => {
  if (component === undefined) {
    return <OriginalRoute { ...restProps } />
  }

  if (isLazyExoticComponent(component)) { // FIXME: if (component instanceof LazyExoticComponent) {
    return <OriginalRoute component={ withSuspense(component) } { ...restProps } />
  } else {
    return <OriginalRoute component={ component } { ...restProps } />
  }
}

export default Route
