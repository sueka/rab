import Button from '@material-ui/core/Button'
import { useInjection } from 'inversify-react'
import React, { useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { useRecoilValue } from 'recoil'
import { v4 } from 'uuid'

import { shouldBePresent } from '~/asserters/commonAsserters'
import reloadNotToAcceptCookiesBannerKeyState from '~/atoms/reloadNotToAcceptCookiesBannerKeyState'
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
  const reloadNotToAcceptCookiesBannerKey = useRecoilValue(reloadNotToAcceptCookiesBannerKeyState)

  const handleAgree = useCallback(() => {
    shouldBePresent(gtmContainerId)

    // NOTE: 画面のちらつきを減らすために、裏にある方を先に隠す。
    banner.hide({ key: reloadNotToAcceptCookiesBannerKey })

    banner.hide({ key: cookieDialogKey })

    gtm.install(gtmContainerId)
  }, [banner, reloadNotToAcceptCookiesBannerKey, gtm, gtmContainerId])

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
      replaceable: true,
    })
  }, [banner, handleAgree, handleCancel])

  return (
    <Button onClick={ handleClick }>
      <FormattedMessage { ...messages.consentToUseCookies } />
    </Button>
  )
}

export default ObtainCookieConsentButton
