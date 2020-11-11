import Switch from '@material-ui/core/Switch'
import React, { useCallback, useContext } from 'react'

import ThemeProviderContext from '~/contexts/ThemeProviderContext'

const DarkSwitch = () => {
  const { dark, setDark } = useContext(ThemeProviderContext)

  if (dark == null || setDark == null) {
    throw new Error //
  }

  const handleChange = useCallback((_event, checked) => {
    setDark(checked)
  }, [setDark])

  return (
    <Switch checked={ dark } onChange={ handleChange } />
  )
}

export default DarkSwitch
