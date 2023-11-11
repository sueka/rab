import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Switch, { SwitchProps } from '@material-ui/core/Switch'
import Tooltip from '@material-ui/core/Tooltip'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import BrightnessAutoIcon from '@material-ui/icons/BrightnessAuto'
import SecurityIcon from '@material-ui/icons/Security'
import { useInjection } from 'inversify-react'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import Helmet from 'react-helmet'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRecoilCallback, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { v4 } from 'uuid'

import { shouldBePresent } from '~/asserters/commonAsserters'
import appearanceThemeState from '~/atoms/appearanceThemeState'
import availableOfflineState from '~/atoms/availableOfflineState'
import canGtmInstalledState from '~/atoms/canGtmInstalledState'
import fullScreenState from '~/atoms/fullScreenState'
import gtmConsentsState from '~/atoms/gtmConsentsState'
import { cookieDialogKey, refreshNotToAcceptCookiesBannerKey } from '~/bannerKeys'
import LocaleSelect from '~/components/LocaleSelect'
import ObtainCookieConsentBanner from '~/components/ObtainCookieConsentBanner'
import obtainedCookieConsentBannerMessages from '~/components/ObtainCookieConsentBanner/messages' // TODO: Move
import { createPage } from '~/components/PageTemplate'
import RefreshBanner from '~/components/RefreshBanner'
import ConfigRegistry from '~/config/ConfigRegistry'
import DefaultDarkContext from '~/contexts/DefaultDarkContext'
import useBanner from '~/hooks/useBanner'
import currentBannerState from '~/selectors/currentBannerState'
import classes from './classes.css'
import messages from './messages'

type SwitchEventHandler = NonNullable<SwitchProps['onChange']>

const languageSettingId = v4()
const availableOfflineId = v4()
const themeSettingId = v4()
const fullscreenSettingId = v4()
const acceptCookiesSettingId = v4()

const SettingsPage: React.FC = () => {
  const { formatMessage } = useIntl()
  const config = useInjection<ConfigRegistry>('EnvVarConfig')
  const gtmContainerId = config.get('GTM_CONTAINER_ID')
  const banner = useBanner()

  const availableOffline = useRecoilValue(availableOfflineState)
  const [appearanceTheme, setAppearanceTheme] = useRecoilState(appearanceThemeState)
  const [fullScreen, setFullScreen] = useRecoilState(fullScreenState)
  const currentBanner = useRecoilValue(currentBannerState)
  const [canGtmInstalled, setCanGtmInstalled] = useRecoilState(canGtmInstalledState)
  const setGtmConsents = useSetRecoilState(gtmConsentsState)
  const { defaultDark } = useContext(DefaultDarkContext)
  const [swDeactivationBannerKey, setSwDeactivationBannerKey] = useState<string>()

  shouldBePresent(defaultDark)

  const handleAvailableOfflineChange = useRecoilCallback(({ set }): SwitchEventHandler => (_event, checked) => {
    set(availableOfflineState, checked)

    if (checked) {
      if (swDeactivationBannerKey !== undefined) {
        banner.hide({ key: swDeactivationBannerKey, safe: true })
      }
    } else {
      const key = banner.show(<RefreshBanner
        text={ <FormattedMessage { ...messages.refreshThePageToDeactivateTheServiceWorker } /> }
      />)

      setSwDeactivationBannerKey(key)
    }
  }, [banner, swDeactivationBannerKey])

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

      banner.show(
        <RefreshBanner
          leading={ <Avatar>
            <SecurityIcon />
          </Avatar> }
          text={ <FormattedMessage { ...messages.refreshThePageToCompleteTheTagManagerUninstallation } /> }
        />,
        {
          key: refreshNotToAcceptCookiesBannerKey,
        }
      )
    }
  }, [banner, setCanGtmInstalled, setGtmConsents])

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
            <ListItem>
              <ListItemText
                primary={ <FormattedMessage { ...messages.availableOffline } /> }
                id={ availableOfflineId }
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={ availableOffline }
                  onChange={ handleAvailableOfflineChange }
                  disabled={ !('serviceWorker' in navigator) }
                  aria-labelledby={ availableOfflineId }
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
