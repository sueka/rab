import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Switch from '@material-ui/core/Switch'
import Tooltip from '@material-ui/core/Tooltip'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import BrightnessAutoIcon from '@material-ui/icons/BrightnessAuto'
import SecurityIcon from '@material-ui/icons/Security'
import { useInjection } from 'inversify-react'
import React, { useCallback, useContext, useEffect, useMemo } from 'react'
import Helmet from 'react-helmet'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { v4 } from 'uuid'

import { shouldBePresent } from '~/asserters/commonAsserters'
import appearanceThemeState from '~/atoms/appearanceThemeState'
import canGtmInstalledState from '~/atoms/canGtmInstalledState'
import fullScreenState from '~/atoms/fullScreenState'
import gtmConsentsState from '~/atoms/gtmConsentsState'
import Banner from '~/components/Banner'
import LocaleSelect from '~/components/LocaleSelect'
import ObtainCookieConsentBanner from '~/components/ObtainCookieConsentBanner'
import obtainedCookieConsentBannerMessages from '~/components/ObtainCookieConsentBanner/messages' // TODO: Move
import { createPage } from '~/components/PageTemplate'
import ConfigRegistry from '~/config/ConfigRegistry'
import DefaultDarkContext from '~/contexts/DefaultDarkContext'
import cookieDialogKey from '~/globalVariables/cookieDialogKey'
import reloadNotToAcceptCookiesBannerKey from '~/globalVariables/reloadNotToAcceptCookiesBannerKey'
import useBanner from '~/hooks/useBanner'
import currentBannerState from '~/selectors/currentBannerState'
import classes from './classes.css'
import messages from './messages'

const languageSettingId = v4()
const themeSettingId = v4()
const fullscreenSettingId = v4()
const acceptCookiesSettingId = v4()

const SettingsPage: React.FC = () => {
  const { formatMessage } = useIntl()
  const config = useInjection<ConfigRegistry>('EnvVarConfig')
  const gtmContainerId = config.get('GTM_CONTAINER_ID')
  const banner = useBanner()

  const [appearanceTheme, setAppearanceTheme] = useRecoilState(appearanceThemeState)
  const [fullScreen, setFullScreen] = useRecoilState(fullScreenState)
  const currentBanner = useRecoilValue(currentBannerState)
  const [canGtmInstalled, setCanGtmInstalled] = useRecoilState(canGtmInstalledState)
  const setGtmConsents = useSetRecoilState(gtmConsentsState)
  const { defaultDark } = useContext(DefaultDarkContext)

  shouldBePresent(defaultDark)

  const handleFullscreenchange = useCallback(() => {
    setFullScreen(document.fullscreenElement !== null)
  }, [setFullScreen])

  useEffect(() => {
    document.addEventListener('webkitfullscreenchange', handleFullscreenchange)
    document.addEventListener('fullscreenchange', handleFullscreenchange)

    return () => {
      document.removeEventListener('webkitfullscreenchange', handleFullscreenchange)
      document.removeEventListener('fullscreenchange', handleFullscreenchange)
    }
  }, [handleFullscreenchange])

  const handleAppearanceThemeChange = useCallback((_event, theme: string) => {
    if (theme === 'light' || theme === 'dark' || theme === 'device') {
      setAppearanceTheme(theme)
    }
  }, [setAppearanceTheme])

  const handleFullScreenChange = useCallback((_event, checked) => {
    setFullScreen(checked)
  }, [setFullScreen])

  const whileConsentObtained = useMemo(() => {
    return currentBanner?.key === cookieDialogKey
  }, [currentBanner])

  const handleReload = useCallback(() => {
    location.reload()
  }, [])

  const handleDontReload = useCallback(() => {
    banner.hide({ key: reloadNotToAcceptCookiesBannerKey })
  }, [banner])

  const handleAcceptCookiesChange = useCallback((_event, checked) => {
    if (checked) {
      // NOTE: Switch の切り替えはせず（保留し）、<ObtainCookieConsentBanner> の handleAgree で、canGtmInstalledState 経由で切り替える。

      banner.show(<ObtainCookieConsentBanner />, {
        key: cookieDialogKey,
        replaceable: true,
      })
    } else {
      setCanGtmInstalled(false)
      setGtmConsents({
        analytics_storage: 'denied',
      })

      banner.show(<Banner
        leading={ <Avatar>
          <SecurityIcon />
        </Avatar> }
        text={ <FormattedMessage { ...messages.aPageReloadIsRequiredForTheConfigurationChangesToTakeEffect } /> }
        actions={ <>
          <Button variant="text" color="primary" onClick={ handleReload }>
            <FormattedMessage { ...messages.reload } />
          </Button>
          <Button variant="text" color="primary" onClick={ handleDontReload }>
            <FormattedMessage { ...messages.dontReload } />
          </Button>
        </> }
      />, {
        key: reloadNotToAcceptCookiesBannerKey,
      })
    }
  }, [banner, handleReload, handleDontReload, setCanGtmInstalled, setGtmConsents])

  return (
    <>
      <Helmet title={ formatMessage(messages.settings) } />
      <Grid container>
        <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 } xl={ 2 }>
          <List
            subheader={ <ListSubheader>
              <FormattedMessage { ...messages.general } />
            </ListSubheader> }
          >
            <ListItem
              classes={ {
                secondaryAction: classes.ListItemSecondaryActionIsLocaleSelect,
              } }
            >
              <ListItemText
                primary={ <FormattedMessage { ...messages.language } /> }
                id={ languageSettingId }
              />
              <ListItemSecondaryAction>
                <LocaleSelect
                  hiddenLabel
                  FormControlProps={ {
                    variant: 'standard',
                    color: 'secondary',
                    'aria-labelledby': languageSettingId,
                  } }
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 } xl={ 2 }>
          <List
            subheader={ <ListSubheader>
              <FormattedMessage { ...messages.appearance } />
            </ListSubheader> }
          >
            <ListItem
              classes={ {
                secondaryAction: classes.ListItemSecondaryActionIsRadioGroup3,
              } }
            >
              <ListItemText
                primary={ <FormattedMessage { ...messages.theme } /> }
                id={ themeSettingId }
              />
              <ListItemSecondaryAction>
                <RadioGroup
                  row
                  name="theme"
                  value={ appearanceTheme }
                  onChange={ handleAppearanceThemeChange }
                  aria-labelledby={ themeSettingId }
                >
                  <Tooltip arrow title={ <FormattedMessage { ...messages.useLightTheme } /> }>
                    <Radio
                      icon={ <Brightness7Icon /> }
                      checkedIcon={ <Brightness7Icon /> }
                      value="light"
                    />
                  </Tooltip>
                  <Tooltip arrow title={ <FormattedMessage { ...messages.useDarkTheme } /> }>
                    <Radio
                      icon={ <Brightness4Icon /> }
                      checkedIcon={ <Brightness4Icon /> }
                      value="dark"
                    />
                  </Tooltip>
                  <Tooltip arrow title={ <FormattedMessage { ...messages.useDeviceTheme } /> }>
                    <Radio
                      icon={ <BrightnessAutoIcon /> }
                      checkedIcon={ <BrightnessAutoIcon /> }
                      value="device"
                    />
                  </Tooltip>
                </RadioGroup>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem
              disabled={ !document.fullscreenEnabled }
              classes={ {
                secondaryAction: classes.ListItemSecondaryActionIsSwitch,
              } }
            >
              <ListItemText
                primary={ <FormattedMessage { ...messages.fullScreen } /> }
                id={ fullscreenSettingId }
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={ fullScreen }
                  onChange={ handleFullScreenChange }
                  disabled={ !document.fullscreenEnabled }
                  aria-labelledby={ fullscreenSettingId }
                />
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
            <ListItem
              classes={ {
                secondaryAction: classes.ListItemSecondaryActionIsSwitch,
              } }
            >
              <ListItemText
                primary={ <FormattedMessage { ...messages.acceptCookies } /> }
                secondary={ <FormattedMessage { ...obtainedCookieConsentBannerMessages.weUseCookiesToAnalyzeOurTraffic } /> }
                id={ acceptCookiesSettingId }
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={ canGtmInstalled }
                  onChange={ handleAcceptCookiesChange }
                  disabled={ gtmContainerId === undefined || whileConsentObtained }
                  aria-labelledby={ acceptCookiesSettingId }
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  )
}

export default createPage(SettingsPage)
