import React, { useCallback, useRef, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import Nav from '~/components/Nav'
import ErrorBoundary from '~/lib/components/ErrorBoundary'
import typed from '~/lib/typed'

interface PageTemplateProps {
  children: React.ReactElement<BodyProps, React.ComponentType<BodyProps>>
}

type BodyProps = PageProps

type PageProps =
  & RouteComponentProps

const PageTemplate: React.FC<PageTemplateProps> = ({ children }) => {
  const renderError = useCallback((error: unknown) => {
    if (error instanceof Error) {
      return typed<[string]>`${ String(error) }`
    }

    throw new TypeError(typed<[string]>`${ String(error) } is not an error.`)
  }, [])

  const [drawerOpen, setDrawerOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  const openDrawer = useCallback<React.MouseEventHandler>(() => {
    setDrawerOpen(true)
  }, [])

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false)
  }, [])

  return (
    <>
      <Nav
        drawerRef={ drawerRef }
        drawerOpen={ drawerOpen }
        onMenuIconButtonClick={ openDrawer }
        onDrawerClose={ closeDrawer }
      />
      <ErrorBoundary renderError={ renderError }>
        { children }
      </ErrorBoundary>
    </>
  )
}

export const createPage: (Body: React.FC<BodyProps>) => React.FC<PageProps> = (Body) => (props) => (
  <PageTemplate>
    <Body { ...props } />
  </PageTemplate>
)

export default PageTemplate
