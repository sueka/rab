import React, { useCallback } from 'react'
import { Route as OriginalRoute, RouteComponentProps, RouteProps } from 'react-router'

import CircularProgress from '@material-ui/core/CircularProgress'

import ErrorBoundary from '~/lib/components/ErrorBoundary'
import typed from '~/lib/typed'

const withErrorBoundary: (Component: React.ComponentType<RouteComponentProps>) => React.ComponentType<RouteComponentProps> = (Component) => (props) => {
  const renderError = useCallback((error: unknown) => {
    if (error instanceof Error) {
      return typed<[string]>`${ String(error) }`
    }

    throw new TypeError(typed<[string]>`${ String(error) } is not an error.`)
  }, [])

  return (
    <ErrorBoundary renderError={ renderError }>
      <Component { ...props } />
    </ErrorBoundary>
  )
}

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
    return <OriginalRoute component={ withErrorBoundary(withSuspense(component)) } { ...restProps } />
  } else {
    return <OriginalRoute component={ withErrorBoundary(component) } { ...restProps } />
  }
}

export default Route
