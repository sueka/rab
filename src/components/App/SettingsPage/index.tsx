import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Switch from '@material-ui/core/Switch'
import SecurityIcon from '@material-ui/icons/Security'
import { useInjection } from 'inversify-react'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Helmet from 'react-helmet'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRecoilCallback, useRecoilState, useSetRecoilState } from 'recoil'

import bannerState from '~/atoms/bannerState'
import cookieConsentObtainedState from '~/atoms/cookieConsentObtainedState'
import darkState from '~/atoms/darkState'
import obtainedCookieConsentBannerMessages from '~/components/ObtainCookieConsentBanner/messages' // TODO: Move
import { createPage } from '~/components/PageTemplate'
import ConfigRegistry from '~/config/ConfigRegistry'
import DefaultDarkContext from '~/contexts/DefaultDarkContext'
import { shouldBePresent } from '~/lib/asserters/commonAsserters'
import Banner from '~/lib/components/Banner'
import useGtm from '~/lib/hooks/useGtm'
import messages from './messages'

const SettingsPage: React.FC = () => {
  const { formatMessage } = useIntl()
  const config = useInjection<ConfigRegistry>('EnvVarConfig')
  const gtmContainerId = config.get('GTM_CONTAINER_ID')
  const gtm = useGtm()
  const setBanner = useSetRecoilState(bannerState)

  const [dark, setDark] = useRecoilState(darkState)
  const [cookieConsentObtained, setCookieConsentObtained] = useRecoilState(cookieConsentObtainedState)
  const { defaultDark } = useContext(DefaultDarkContext)
  const [cookieConsentChanged, setCookieConsentChanged] = useState(false)

  shouldBePresent(defaultDark)

  const handleDarkThemeChange = useCallback((_event, checked) => {
    setDark(checked)
  }, [])

  const handleAcceptCookiesChange = useCallback((_event, checked) => {
    setCookieConsentObtained(checked)
    setCookieConsentChanged(true)

    if (checked) {
      if (gtmContainerId !== undefined) {
        gtm.install(gtmContainerId)
      }
    }
  }, [gtm, gtmContainerId])

  const handleReload = useRecoilCallback(({ set }) => () => {
    location.reload()

    set(bannerState, null) // NOTE: Almost unreachable
  }, [])

  const handleDontReload = useRecoilCallback(({ set }) => () => {
    set(bannerState, null)
  }, [])

  useEffect(() => {
    if (cookieConsentChanged) {
      if (!cookieConsentObtained) {
        setBanner(<Banner
          leading={ <Avatar>
            <SecurityIcon />
          </Avatar> }
          text={ <FormattedMessage { ...messages.aPageReloadIsRequiredForTheConfigurationChangesToTakeEffectDoYouWantToReloadThePageNow } /> }
          actions={ <>
            <Button onClick={ handleReload }>
              <FormattedMessage { ...messages.reload } />
            </Button>
            <Button onClick={ handleDontReload }>
              <FormattedMessage { ...messages.dontReload } />
            </Button>
          </> }
        />)
      } else {
        setBanner(null)
      }
    }
  }, [cookieConsentChanged, cookieConsentObtained])

  return (
    <>
      <Helmet title={ formatMessage(messages.settings) } />
      <Grid container>
        <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 } xl={ 2 }>
          <List
            subheader={ <ListSubheader>
              <FormattedMessage { ...messages.appearance } />
            </ListSubheader> }
          >
            <ListItem>
              <ListItemText primary={ <FormattedMessage { ...messages.darkTheme } /> } />
              <ListItemSecondaryAction>
                <Switch checked={ dark ?? defaultDark } onChange={ handleDarkThemeChange } />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 } xl={ 2 }>
          <List
            subheader={ <ListSubheader>
              <FormattedMessage { ...messages.securityAndPrivacy } />
            </ListSubheader> }
          >
            <ListItem>
              <ListItemText
                primary={ <FormattedMessage { ...messages.acceptCookies } /> }
                secondary={ <FormattedMessage { ...obtainedCookieConsentBannerMessages.weUseCookiesToAnalyzeOurTraffic } /> }
              />
              <ListItemSecondaryAction>
                <Switch checked={ cookieConsentObtained } onChange={ handleAcceptCookiesChange } disabled={ gtmContainerId === undefined } />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  )
}

export default createPage(SettingsPage)
