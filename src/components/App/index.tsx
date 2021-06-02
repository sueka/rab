import { useInjection } from 'inversify-react'
import React, { useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import { Redirect, Switch, useLocation } from 'react-router'
import { useRecoilCallback } from 'recoil'

import cookieConsentObtainedState from '~/atoms/cookieConsentObtainedState'
import Route from '~/components/Route'
import ConfigRegistry from '~/config/ConfigRegistry'
import useGtm from '~/hooks/useGtm'

export const HomePage = React.lazy(() => import(/* webpackChunkName: "home" */ './HomePage'))
export const ChessPage = React.lazy(() => import(/* webpackChunkName: "chess" */ './ChessPage'))
export const ClockPage = React.lazy(() => import(/* webpackChunkName: "clock" */ './ClockPage'))
export const CounterPage = React.lazy(() => import(/* webpackChunkName: "counter" */ './CounterPage'))
export const FormControlsPage = React.lazy(() => import(/* webpackChunkName: "formControls" */ './FormControlsPage'))
export const InfoPage = React.lazy(() => import(/* webpackChunkName: "info" */ './InfoPage'))
export const PaintPage = React.lazy(() => import(/* webpackChunkName: "paint" */ './PaintPage'))
export const ReminderPage = React.lazy(() => import(/* webpackChunkName: "reminder" */ './ReminderPage'))
export const SettingsPage = React.lazy(() => import(/* webpackChunkName: "settings" */ './SettingsPage'))
export const NoMatch = React.lazy(() => import(/* webpackChunkName: "noMatch" */ './NoMatch'))

const App: React.FC = () => {
  const config = useInjection<ConfigRegistry>('EnvVarConfig')
  const gtmContainerId = config.get('GTM_CONTAINER_ID')
  const location = useLocation()
  const gtm = useGtm()

  const installGtmLegally = useRecoilCallback(({ snapshot }) => async () => {
    const cookieConsentObtained = await snapshot.getPromise(cookieConsentObtainedState)

    if (cookieConsentObtained && gtmContainerId !== undefined) {
      await gtm.install(gtmContainerId)
    }
  }, [gtm, gtmContainerId])

  useEffect(() => {
    installGtmLegally()
  }, [installGtmLegally])

  if (location.pathname === '/' && location.hash !== '') {
    const pathname = /^#(.*)$/.exec(location.hash)?.[1]

    // TODO: Shape-check

    return <Redirect to={ { pathname } } />
  }

  return (
    <Switch>
      <Route exact strict sensitive path="/" component={ HomePage } />
      <Route exact strict sensitive path="/chess" component={ ChessPage } />
      <Route exact strict sensitive path="/clock" component={ ClockPage } />
      <Route exact strict sensitive path="/counter" component={ CounterPage } />
      <Route exact strict sensitive path="/form-controls" component={ FormControlsPage } />
      <Route exact strict sensitive path="/info" component={ InfoPage } />
      <Route exact strict sensitive path="/paint" component={ PaintPage } />
      <Route exact strict sensitive path="/reminder" component={ ReminderPage } />
      <Route exact strict sensitive path="/settings" component={ SettingsPage } />
      <Route path="*" component={ NoMatch } />
    </Switch>
  )
}

export default hot(App)
