import * as React from 'react'
import { Route as OriginalRoute, RouteProps, RouteComponentProps } from 'react-router'
import Helmet, { HelmetProps } from 'react-helmet'

import CircularProgress from '@material-ui/core/CircularProgress'

import ErrorBoundary from 'src/components/ErrorBoundary'

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

const withHelmet: (Component: React.ComponentType<RouteComponentProps>, helmetProps?: HelmetProps) => React.ComponentType<RouteComponentProps> = (Component, helmetProps) => (props) => (
  <>
    <Helmet { ...helmetProps } />
    <Component { ...props } />
  </>
)

interface Props extends Omit<RouteProps, 'render' | 'component' | 'children'> {
  // TODO: ban mandatory props
  component?: Required<RouteProps>['component'] | React.LazyExoticComponent<Required<RouteProps>['component']>

  helmetProps?: HelmetProps
}

export default class Route extends React.Component<Props> {
  public static defaultProps: Pick<Props, 'exact' | 'strict' | 'sensitive'> = {
    exact: true,
    strict: true,
    sensitive: true,
  }

  public render() {
    const { component, helmetProps, ...restProps } = this.props

    if (component === undefined) {
      return <OriginalRoute { ...restProps } />
    }

    if ('_result' in component) { // FIXME: if LazyExoticComponent
      return <OriginalRoute component={ withErrorBoundary(withHelmet(withSuspense(component), helmetProps)) } { ...restProps } />
    } else {
      return <OriginalRoute component={ withErrorBoundary(withHelmet(component, helmetProps)) } { ...restProps } />
    }
  }
}
