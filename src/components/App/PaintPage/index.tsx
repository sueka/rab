import React, { useCallback, useState } from 'react'
import Helmet from 'react-helmet'
import { FormattedMessage, useIntl } from 'react-intl'

import Canvas from '~/components/Canvas'
import ClearCanvasButton from '~/components/ClearCanvasButton'
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
      <Canvas width={ 320 } height={ 320 } lineWidth={ 10 } ref={ canvas } context={ context } />
      <ClearCanvasButton width={ 320 } height={ 320 } context={ context }><FormattedMessage { ...messages.clear } /></ClearCanvasButton>
    </>
  )
}

export default createPage(PaintPage)
