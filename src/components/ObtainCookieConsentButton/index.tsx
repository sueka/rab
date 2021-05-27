import Button from '@material-ui/core/Button'
import { useInjection } from 'inversify-react'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useRecoilCallback } from 'recoil'

import bannerOpenState from '~/atoms/bannerOpenState'
import bannerState from '~/atoms/bannerState'
import ObtainCookieConsentBanner from '~/components/ObtainCookieConsentBanner'
import ConfigRegistry from '~/config/ConfigRegistry'
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

  const handleAgree = useRecoilCallback(({ set }) => () => {
    shouldBePresent(gtmContainerId)

    set(bannerOpenState, false)

    gtm.install(gtmContainerId)
  }, [gtm, gtmContainerId])

  const handleCancel = useRecoilCallback(({ set }) => () => {
    set(bannerOpenState, false)
  }, [])

  const handleClick = useRecoilCallback<
    Parameters<React.MouseEventHandler<HTMLButtonElement>>,
    ReturnType<React.MouseEventHandler<HTMLButtonElement>>
  >(({ set }) => () => {
    set(bannerState, <ObtainCookieConsentBanner
      onAgree={ handleAgree }
      onCancel={ handleCancel }
    />)
    set(bannerOpenState, true)
  }, [handleAgree, handleCancel])

  return (
    <Button onClick={ handleClick }>
      <FormattedMessage { ...messages.consentToUseCookies } />
    </Button>
  )
}

export default ObtainCookieConsentButton
