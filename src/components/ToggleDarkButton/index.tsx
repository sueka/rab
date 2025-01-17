import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import React, { useCallback, useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import { useRecoilState } from 'recoil'

import { shouldBePresent } from '~/asserters/commonAsserters'
import DefaultDarkContext from '~/contexts/DefaultDarkContext'
import darkState from '~/selectors/darkState'
import classes from './classes.css'
import messages from './messages'

const ToggleDarkButton = () => {
  const [dark, setDark] = useRecoilState(darkState)
  const { defaultDark } = useContext(DefaultDarkContext)

  shouldBePresent(defaultDark)

  const handleOn = useCallback(() => {
    setDark(true)
  }, [setDark])

  const handleOff = useCallback(() => {
    setDark(false)
  }, [setDark])

  return (
    <Tooltip title={ <FormattedMessage { ...messages.toggleLightDarkTheme } /> }>
      <span className={ classes.TooltipWrapper }>
        { dark ?? defaultDark ? (
          <IconButton onClick={ handleOff }>
            <Brightness7Icon />
          </IconButton>
        ) : (
          <IconButton onClick={ handleOn } color="inherit">
            <Brightness4Icon />
          </IconButton>
        ) }
      </span>
    </Tooltip>
  )
}

export default ToggleDarkButton
