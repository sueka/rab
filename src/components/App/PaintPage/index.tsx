import React, { useCallback, useState } from 'react'
import Helmet from 'react-helmet'
import { useIntl } from 'react-intl'

import Canvas from '~/components/Canvas'
import { createPage } from '~/templates/PageTemplate'
import messages from './messages'

const PaintPage: React.FunctionComponent = () => {
  const { formatMessage } = useIntl()

  const [context, setContext] = useState<CanvasRenderingContext2D | null>()

  const canvas = useCallback((node: HTMLCanvasElement | null) => {
    setContext(node?.getContext('2d'))
  }, [])

  return (
    <>
      <Helmet title={ formatMessage(messages.paint) } />
      <Canvas width={ 320 } height={ 320 } ref={ canvas } context={ context } />
    </>
  )
}

export default createPage(PaintPage)
