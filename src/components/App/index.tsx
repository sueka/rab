import { useInjection } from 'inversify-react'
import React, { useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import { Redirect, Switch, useLocation } from 'react-router'
import { useRecoilCallback } from 'recoil'
import { shouldBePresent } from '~/asserters/commonAsserters'

import canGtmInstalledState from '~/atoms/canGtmInstalledState'
import gtmConsentsState from '~/atoms/gtmConsentsState'
import ObtainCookieConsentBanner from '~/components/ObtainCookieConsentBanner'
import Route from '~/components/Route'
import ConfigRegistry from '~/config/ConfigRegistry'
import { cookieDialogKey } from '~/bannerKeys'
import gtag from '~/helpers/google/gtag'
import useBanner from '~/hooks/useBanner'
import useGtm from '~/hooks/useGtm'

export const HomePage = React.lazy(() => import(/* webpackChunkName: "home" */ './HomePage'))
export const FormControlsPage = React.lazy(() => import(/* webpackChunkName: "formControls" */ './FormControlsPage'))
export const TablePage = React.lazy(() => import(/* webpackChunkName: "table" */ './TablePage'))
export const ChessPage = React.lazy(() => import(/* webpackChunkName: "chess" */ './ChessPage'))
export const ClockPage = React.lazy(() => import(/* webpackChunkName: "clock" */ './ClockPage'))
export const CounterPage = React.lazy(() => import(/* webpackChunkName: "counter" */ './CounterPage'))
export const ImageDataUrlEnDecoderPage = React.lazy(() => import(/* webpackChunkName: "imageDataUrlEnDecoder" */ './ImageDataUrlEnDecoderPage'))
export const InfoPage = React.lazy(() => import(/* webpackChunkName: "info" */ './InfoPage'))
export const PaintPage = React.lazy(() => import(/* webpackChunkName: "paint" */ './PaintPage'))
export const QrCodeToolsPage = React.lazy(() => import(/* webpackChunkName: "qrCodeTools" */ './QrCodeToolsPage'))
export const ReminderPage = React.lazy(() => import(/* webpackChunkName: "reminder" */ './ReminderPage'))
export const SettingsPage = React.lazy(() => import(/* webpackChunkName: "settings" */ './SettingsPage'))
export const NoMatch = React.lazy(() => import(/* webpackChunkName: "noMatch" */ './NoMatch'))

declare const globalThis: Window

const App: React.FC = () => {
  const config = useInjection<ConfigRegistry>('EnvVarConfig')
  const gtmContainerId = config.get('GTM_CONTAINER_ID')
  const location = useLocation()
  const gtm = useGtm()
  const banner = useBanner()

  // TODO: Remove?
  const installGtmLegally = useRecoilCallback(({ snapshot, set }) => async () => {
    if (gtmContainerId === undefined) {
      return
    }

    shouldBePresent(globalThis.cookieStore)

    const gaCookies = await globalThis.cookieStore.getAll('_ga')
    const noGaCookies = gaCookies.length === 0
    const canGtmInstalled = await snapshot.getPromise(canGtmInstalledState)

    // Withdrawal or cookie expired
    if (noGaCookies && canGtmInstalled) {
      // Semi-complete withdrawal
      set(gtmConsentsState, {})

      // TODO: Improve messages.
      banner.show(<ObtainCookieConsentBanner />, {
        key: cookieDialogKey,
      })

      return
    }

    // Consent obtained
    if (!noGaCookies && canGtmInstalled) {
      const consents = await snapshot.getPromise(gtmConsentsState)

      // Send default consents
      gtag('consent', 'default', {
        ad_storage: 'denied',
        analytics_storage: 'denied',
      })

      globalThis.dataLayer.push({ event: 'default_consent' })

      set(gtmConsentsState, consents)

      await gtm.install(gtmContainerId)

      return
    }

    // Initial state or withdrawal
    // if (!canGtmInstalled) {
    // Complete withdrawal
    // set(canGtmInstalledState, false)
    set(gtmConsentsState, {})
  }, [gtm, gtmContainerId, banner])

  useEffect(() => {
    installGtmLegally()
  }, [installGtmLegally])

  // Rewrites /foo using react-router
  if (location.pathname === '/' && location.hash !== '') {
    const pathname = /^#(.*)$/.exec(location.hash)?.[1]

    // TODO: Shape-check

    return <Redirect to={ { pathname } } />
  }

  return (
    <Switch>
      <Route exact strict sensitive path="/" component={ HomePage } />
      <Route exact strict sensitive path="/form-controls" component={ FormControlsPage } />
      <Route exact strict sensitive path="/table" component={ TablePage } />
      <Route exact strict sensitive path="/chess" component={ ChessPage } />
      <Route exact strict sensitive path="/clock" component={ ClockPage } />
      <Route exact strict sensitive path="/counter" component={ CounterPage } />
      <Route exact strict sensitive path="/image-data-url-en-decoder" component={ ImageDataUrlEnDecoderPage } />
      <Route exact strict sensitive path="/info" component={ InfoPage } />
      <Route exact strict sensitive path="/paint" component={ PaintPage } />
      <Route exact strict sensitive path="/qr-code-tools" component={ QrCodeToolsPage } />
      <Route exact strict sensitive path="/reminder" component={ ReminderPage } />
      <Route exact strict sensitive path="/settings" component={ SettingsPage } />
      <Route path="*" component={ NoMatch } />
    </Switch>
  )
}

export default hot(App)
