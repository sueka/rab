import { AvatarProps } from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import React, { useCallback } from 'react'
import { FormattedMessage } from 'react-intl'

import Banner from '~/components/Banner'
import useBanner from '~/hooks/useBanner'
import messages from './messages'

interface Props {
  leading?: React.ReactElement<AvatarProps, React.ComponentType<AvatarProps>>
  text?: React.ReactNode
}

const RefreshBanner: React.FC<Props> = ({ leading, text }) => {
  const banner = useBanner()

  const handleRefresh = useCallback(() => {
    location.reload()
  }, [])

  const handleDontRefresh = useCallback(() => {
    banner.hide()
  }, [banner])

  return <Banner
    leading={ leading }
    text={ text ?? <FormattedMessage { ...messages.wouldYouLikeToRefreshThePage } /> }
    actions={ <>
      <Button variant="text" color="primary" onClick={ handleRefresh }>
        <FormattedMessage { ...messages.refresh } />
      </Button>
      <Button variant="text" color="primary" onClick={ handleDontRefresh }>
        <FormattedMessage { ...messages.dontRefresh } />
      </Button>
    </> }
  />
}

export default RefreshBanner
