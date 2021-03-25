import Checkbox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import React, { useCallback, useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import { useRecoilState } from 'recoil'

import darkState from '~/atoms/darkState'
import DefaultDarkContext from '~/contexts/DefaultDarkContext'
import { shouldBePresent } from '~/lib/asserters/commonAsserters'
import classes from './classes.css'
import messages from './messages'

const ToggleDarkButton = () => {
  const [dark, setDark] = useRecoilState(darkState)
  const { defaultDark } = useContext(DefaultDarkContext)

  shouldBePresent(defaultDark)

  const handleChange = useCallback((_event, checked) => {
    setDark(checked)
  }, [setDark])

  return (
    <Tooltip title={ <FormattedMessage { ...messages.toggleLightDarkTheme } /> }>
      <Checkbox
        icon={ <Brightness4Icon /> }
        checkedIcon={ <Brightness7Icon /> }
        color="default" // To change the focus ripple color
        classes={ {
          root: classes.Checkbox,
          checked: classes.Checked,
        } }
        checked={ dark ?? defaultDark }
        onChange={ handleChange }
      />
    </Tooltip>
  )
}

export default ToggleDarkButton
