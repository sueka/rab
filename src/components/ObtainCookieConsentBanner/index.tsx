import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import SecurityIcon from '@mui/icons-material/Security'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useRecoilCallback } from 'recoil'

import cookieConsentObtainedState from '~/atoms/cookieConsentObtainedState'
import Banner from '~/components/Banner'
import messages from './messages'

interface Props {
  onAgree?(): void
  onCancel?(): void
}

const ObtainCookieConsentBanner: React.FC<Props> = ({ onAgree, onCancel }) => {
  const handleAgree = useRecoilCallback(({ set }) => () => {
    set(cookieConsentObtainedState, true)

    onAgree?.()
  }, [onAgree])

  return (
    <Banner
      leading={ <Avatar>
        <SecurityIcon />
      </Avatar> }
      text={ <FormattedMessage { ...messages.weUseCookiesToAnalyzeOurTraffic } /> }
      actions={ <>
        <Button variant="text" color="primary" onClick={ handleAgree }>
          <FormattedMessage { ...messages.agree } />
        </Button>
        <Button variant="text" color="primary" onClick={ onCancel }>
          <FormattedMessage { ...messages.cancel } />
        </Button>
      </> }
    />
  )
}

export default ObtainCookieConsentBanner
