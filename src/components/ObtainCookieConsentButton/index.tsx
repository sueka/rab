import Button from '@material-ui/core/Button'
import React, { useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { useRecoilState } from 'recoil'

import bannerState from '~/atoms/bannerState'
import cookieConsentObtainedState from '~/atoms/cookieConsentObtainedState'
import ObtainCookieConsentBanner from '~/components/ObtainCookieConsentBanner'
import messages from './messages'

const ObtainCookieConsentButton: React.FC = () => {
  const [, setBanner] = useRecoilState(bannerState)
  const [, setCookieConsentObtained] = useRecoilState(cookieConsentObtainedState)

  const handleAgree = useCallback(() => {
    setCookieConsentObtained(true)
    setBanner(null)
  }, [])

  const handleDismiss = useCallback(() => {
    setBanner(null)
  }, [])

  const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
    setBanner(<ObtainCookieConsentBanner
      onAgree={ handleAgree }
      onDismiss={ handleDismiss }
    />)
  }, [setBanner, handleAgree, handleDismiss])

  return (
    <Button onClick={ handleClick }>
      <FormattedMessage { ...messages.consentToUseCookies } />
    </Button>
  )
}

export default ObtainCookieConsentButton
