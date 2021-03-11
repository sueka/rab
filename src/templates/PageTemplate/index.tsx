import React, { useCallback, useRef, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import Nav from '~/components/Nav'
import TopAppbar from '~/components/TopAppbar'
import ErrorBoundary from '~/lib/components/ErrorBoundary'
import useScreenSize from '~/lib/hooks/useScreenSize'
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

  const { width } = useScreenSize()
  const [topAppbarHeight, setTopAppbarHeight] = useState<number | null>(null)

  const topAppbarRef = useCallback<React.RefCallback<HTMLDivElement>>((node) => {
    // To silence the ESLint rule react-hooks/exhaustive-deps
    if (width === null) {
      return
    }

    const topAppbarRect = node?.getBoundingClientRect()

    if (topAppbarRect === undefined) {
      return
    }

    setTopAppbarHeight(topAppbarRect.height)
  }, [width])

  const openDrawer = useCallback<React.MouseEventHandler>(() => {
    setDrawerOpen(true)
  }, [])

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false)
  }, [])

  return (
    <>
      <TopAppbar ref={ topAppbarRef } onMenuIconButtonClick={ openDrawer } />
      <Nav
        ref={ drawerRef }
        open={ drawerOpen }
        onClose={ closeDrawer }
        topAppbarHeight={ topAppbarHeight ?? undefined }
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
