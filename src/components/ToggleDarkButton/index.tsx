import Checkbox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import React, { useCallback, useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import ThemeProviderContext from '~/contexts/ThemeProviderContext'
import classes from './classes.css'
import messages from './messages'

const ToggleDarkButton = () => {
  const { dark, setDark } = useContext(ThemeProviderContext)

  if (dark == null || setDark == null) {
    throw new Error //
  }

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
        checked={ dark }
        onChange={ handleChange }
      />
    </Tooltip>
  )
}

export default ToggleDarkButton
