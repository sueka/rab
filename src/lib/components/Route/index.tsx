import React, { useCallback } from 'react'
import { Route as OriginalRoute, RouteProps, RouteComponentProps } from 'react-router'
import Helmet, { HelmetProps } from 'react-helmet'

import CircularProgress from '@material-ui/core/CircularProgress'

import typed from '~/lib/typed'
import ErrorBoundary from '~/lib/components/ErrorBoundary'

const withErrorBoundary: (Component: React.ComponentType<RouteComponentProps> | React.ComponentType<unknown>) => React.ComponentType<RouteComponentProps> = (Component) => (props) => {
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

const withSuspense: (Component: React.LazyExoticComponent<React.ComponentType<RouteComponentProps> | React.ComponentType<unknown>>) => React.ComponentType<RouteComponentProps> = (Component) => (props) => (
  <React.Suspense fallback={ <CircularProgress /> }>
    <Component { ...props } />
  </React.Suspense>
)

const withHelmet: (Component: React.ComponentType<RouteComponentProps>, helmetProps: HelmetProps) => React.ComponentType<RouteComponentProps> = (Component, helmetProps) => (props) => (
  <>
    <Helmet { ...helmetProps } />
    <Component { ...props } />
  </>
)

interface Props extends Alt.Omit<RouteProps, 'render' | 'component' | 'children'> {
  // TODO: ban mandatory props
  component?: Required<RouteProps>['component'] | React.LazyExoticComponent<Required<RouteProps>['component']>

  helmetProps?: HelmetProps
}

const defaultProps: Pick<Props, 'exact' | 'strict' | 'sensitive'> = {
  exact: true,
  strict: true,
  sensitive: true,
}

const Route: React.FunctionComponent<Props> = ({ component, helmetProps, ...restProps }) => {
  if (component === undefined) {
    return <OriginalRoute { ...restProps } />
  }

  if ('_result' in component) { // FIXME: if LazyExoticComponent
    if (helmetProps !== undefined) {
      return <OriginalRoute component={ withErrorBoundary(withHelmet(withSuspense(component), helmetProps)) } { ...restProps } />
    } else {
      return <OriginalRoute component={ withErrorBoundary(withSuspense(component)) } { ...restProps } />
    }
  } else {
    if (helmetProps !== undefined) {
      return <OriginalRoute component={ withErrorBoundary(withHelmet(component, helmetProps)) } { ...restProps } />
    } else {
      return <OriginalRoute component={ withErrorBoundary(component) } { ...restProps } />
    }
  }
}

// tslint:disable-next-line:no-object-mutation
Route.defaultProps = defaultProps

export default Route
