import Button from '@material-ui/core/Button'
import { useInjection } from 'inversify-react'
import React, { useCallback } from 'react'
import { FormattedMessage } from 'react-intl'

import ObtainCookieConsentBanner from '~/components/ObtainCookieConsentBanner'
import ConfigRegistry from '~/config/ConfigRegistry'
import useBanner from '~/hooks/useBanner'
import { shouldBePresent } from '~/lib/asserters/commonAsserters'
import useGtm from '~/lib/hooks/useGtm'
import messages from './messages'

/**
 * クッキーダイアログを表示するボタンを表現する.
 *
 * NOTE: https://github.com/mdn/content/blob/f4556b8707dcdd6fec9c6f121a24e6988309f95c/files/en-us/web/api/notification/requestpermission/index.html#L87-L89 と同じような理由で、 Rap では、ユーザーの操作無しにクッキーダイアログを表示することはしない。
 */
const ObtainCookieConsentButton: React.FC = () => {
  const config = useInjection<ConfigRegistry>('EnvVarConfig')
  const gtmContainerId = config.get('GTM_CONTAINER_ID')
  const gtm = useGtm()
  const banner = useBanner()

  const handleAgree = useCallback(() => {
    shouldBePresent(gtmContainerId)

    banner.hide()

    gtm.install(gtmContainerId)
  }, [banner, gtm, gtmContainerId])

  const handleCancel = useCallback(() => {
    banner.hide()
  }, [banner])

  const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
    banner.show(<ObtainCookieConsentBanner
      onAgree={ handleAgree }
      onCancel={ handleCancel }
    />)
  }, [banner, handleAgree, handleCancel])

  return (
    <Button onClick={ handleClick }>
      <FormattedMessage { ...messages.consentToUseCookies } />
    </Button>
  )
}

export default ObtainCookieConsentButton
