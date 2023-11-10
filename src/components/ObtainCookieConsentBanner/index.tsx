import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import SecurityIcon from '@material-ui/icons/Security'
import { useInjection } from 'inversify-react'
import { useSnackbar } from 'notistack'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useRecoilCallback } from 'recoil'

import { shouldBePresent } from '~/asserters/commonAsserters'
import canGtmInstalledState from '~/atoms/canGtmInstalledState'
import gtmConsentsState from '~/atoms/gtmConsentsState'
import Banner from '~/components/Banner'
import ConfigRegistry from '~/config/ConfigRegistry'
import { cookieDialogKey, refreshNotToAcceptCookiesBannerKey } from '~/bannerKeys'
import gtag from '~/helpers/google/gtag'
import useBanner from '~/hooks/useBanner'
import useGtm from '~/hooks/useGtm'
import messages from './messages'

interface Props {
  onAgree?(): void
  onCancel?(): void
}

declare const globalThis: Window

const ObtainCookieConsentBanner: React.FC<Props> = ({ onAgree, onCancel }) => {
  const config = useInjection<ConfigRegistry>('EnvVarConfig')
  const gtmContainerId = config.get('GTM_CONTAINER_ID')
  const gtm = useGtm()
  const banner = useBanner()
  const { enqueueSnackbar } = useSnackbar()

  const handleAgree = useRecoilCallback(({ set }) => async () => {
    shouldBePresent(gtmContainerId)

    // Send default consents
    gtag('consent', 'default', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
    })

    globalThis.dataLayer.push({ event: 'default_consent' })

    set(gtmConsentsState, {
      analytics_storage: 'granted',
    })

    const installed = await gtm.install(gtmContainerId)

    if (!installed) {
      enqueueSnackbar(
        <FormattedMessage { ...messages.tagManagerInstallationFailed } />
      )

      return
    }

    // NOTE: 画面のちらつきを減らすために、裏にある方を先に隠す。
    banner.hide({
      key: refreshNotToAcceptCookiesBannerKey,
      safe: true,
    })

    banner.hide({ key: cookieDialogKey })

    set(canGtmInstalledState, true)

    onAgree?.()
  }, [onAgree, gtm, gtmContainerId, banner])

  const handleCancel = useRecoilCallback(({ set }) => () => {
    banner.hide({ key: cookieDialogKey })

    // Ensure you withdraw consent.
    set(canGtmInstalledState, false)
    set(gtmConsentsState, {
      analytics_storage: 'denied',
    })

    onCancel?.()
  }, [onCancel, banner])

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
        <Button variant="text" color="primary" onClick={ handleCancel }>
          <FormattedMessage { ...messages.cancel } />
        </Button>
      </> }
    />
  )
}

export default ObtainCookieConsentBanner
