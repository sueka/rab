import Button from '@material-ui/core/Button'
import { useSnackbar } from 'notistack'
import React, { useCallback, useMemo } from 'react'
import { FormattedMessage } from 'react-intl'
import { useRecoilValue } from 'recoil'

import cookieConsentObtainedState from '~/atoms/cookieConsentObtainedState'
import ObtainCookieConsentBanner from '~/components/ObtainCookieConsentBanner'
import cookieDialogKey from '~/globalVariables/cookieDialogKey'
import useBanner from '~/hooks/useBanner'
import currentBannerState from '~/selectors/currentBannerState'
import messages from './messages'

// NOTE: このコンポーネントがアンマウント、再マウントされても dismiss がうまく動くように、グローバルな `cookieDialogKey` を使っている。これを解消するには、 `cookieDialogKey` を prop にするか、 <RecoilRoot> を分割する。
/**
 * クッキーダイアログを表示するボタンを表現する.
 *
 * NOTE: https://github.com/mdn/content/blob/f4556b8707dcdd6fec9c6f121a24e6988309f95c/files/en-us/web/api/notification/requestpermission/index.html#L87-L89 と同じような理由で、 Rap では、ユーザーの操作無しにクッキーダイアログを表示することはしない。
 */
const ObtainCookieConsentButton: React.FC = () => {
  const banner = useBanner()
  const { enqueueSnackbar } = useSnackbar()
  const cookieConsentObtained = useRecoilValue(cookieConsentObtainedState)
  const currentBanner = useRecoilValue(currentBannerState)

  const whileConsentObtained = useMemo(() => {
    return currentBanner?.key === cookieDialogKey
  }, [currentBanner])

  // NOTE: すでに表示されているバナーに `handleAgree` や `handleCancel` の変更を反映させるには、 useEffect 等を使って、 `handleAgree` や `handleCancel` が変更されるたびに、現在のバナーの `key` が `cookieDialogKey` と一致するかどうかを調べ、一致する場合は同じ `key` を使って `banner.show()` する。
  const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
    if (!cookieConsentObtained) {
      banner.show(<ObtainCookieConsentBanner />, {
        key: cookieDialogKey,
        replaceable: true,
      })
    } else {
      enqueueSnackbar(<FormattedMessage { ...messages.youHaveAlreadyConsentedToUseCookies } />)
    }
  }, [cookieConsentObtained, banner, enqueueSnackbar])

  return (
    <Button onClick={ handleClick } disabled={ whileConsentObtained }>
      <FormattedMessage { ...messages.consentToUseCookies } />
    </Button>
  )
}

export default ObtainCookieConsentButton
