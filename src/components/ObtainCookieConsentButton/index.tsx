import Button from '@material-ui/core/Button'
import React, { useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { useRecoilState } from 'recoil'

import bannerState from '~/atoms/bannerState'
import cookieConsentObtainedState from '~/atoms/cookieConsentObtainedState'
import ObtainCookieConsentBanner from '~/components/ObtainCookieConsentBanner'
import messages from './messages'

/**
 * クッキーダイアログを表示するボタンを表現する.
 *
 * NOTE: https://github.com/mdn/content/blob/f4556b8707dcdd6fec9c6f121a24e6988309f95c/files/en-us/web/api/notification/requestpermission/index.html#L87-L89 と同じような理由で、 Rap では、ユーザーの操作無しにクッキーダイアログを表示することはしない。
 */
const ObtainCookieConsentButton: React.FC = () => {
  const [, setBanner] = useRecoilState(bannerState)
  const [, setCookieConsentObtained] = useRecoilState(cookieConsentObtainedState)

  const handleAgree = useCallback(() => {
    setCookieConsentObtained(true)
    setBanner(null)
  }, [])

  const handleDismiss = useCallback(() => {
    setCookieConsentObtained(false)
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
