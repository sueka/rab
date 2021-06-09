import Button from '@material-ui/core/Button'
import { useInjection } from 'inversify-react'
import React, { useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { v4 } from 'uuid'

import { shouldBePresent } from '~/asserters/commonAsserters'
import ObtainCookieConsentBanner from '~/components/ObtainCookieConsentBanner'
import ConfigRegistry from '~/config/ConfigRegistry'
import useBanner from '~/hooks/useBanner'
import useGtm from '~/hooks/useGtm'
import messages from './messages'

const cookieDialogKey = v4()

// NOTE: このコンポーネントがアンマウント、再マウントされても dismiss がうまく動くように、 `cookieDialogKey` をレンダリング間で共有している。これを解消するには `cookieDialogKey` を prop にする。
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

    banner.hide({ key: cookieDialogKey })

    gtm.install(gtmContainerId)
  }, [banner, gtm, gtmContainerId])

  const handleCancel = useCallback(() => {
    banner.hide({ key: cookieDialogKey })
  }, [banner])

  // NOTE: すでに表示されているバナーに `handleAgree` や `handleCancel` の変更を反映させるには、 useEffect 等を使って、 `handleAgree` や `handleCancel` が変更されるたびに、現在のバナーの `key` が `cookieDialogKey` と一致するかどうかを調べ、一致する場合は同じ `key` を使って `banner.show()` する。
  const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
    banner.show(<ObtainCookieConsentBanner
      onAgree={ handleAgree }
      onCancel={ handleCancel }
    />, {
      key: cookieDialogKey,
    })
  }, [banner, handleAgree, handleCancel])

  return (
    <Button onClick={ handleClick }>
      <FormattedMessage { ...messages.consentToUseCookies } />
    </Button>
  )
}

export default ObtainCookieConsentButton
