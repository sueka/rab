import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import { Theme, makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import React, { useCallback, useState } from 'react'

import LocaleSelect from '~/components/LocaleSelect' // TODO
import ToggleDarkButton from '~/components/ToggleDarkButton'
import useScreen from '~/lib/hooks/useScreen'
import mergeRefs from '~/lib/mergeRefs'
import classes from './classes.css'

interface Props {
  onMenuIconButtonClick: React.MouseEventHandler<HTMLButtonElement>
}

interface StyleProps {
  topAppbarHeight?: number
}

const useStyles = makeStyles<Theme, StyleProps, 'Offset'>({
  Offset: {
    height: ({ topAppbarHeight }) => topAppbarHeight,
  },
})

const TopAppbar = React.forwardRef<HTMLDivElement, Props>(({ onMenuIconButtonClick }, forwardedRef) => {
  const { width: screenWidth } = useScreen()
  const [height, setHeight] = useState<number | null>(null)

  const ownRef = useCallback<React.RefCallback<HTMLDivElement>>((node) => {
    // To silence the ESLint rule react-hooks/exhaustive-deps
    if (screenWidth === null) {
      return
    }

    const rect = node?.getBoundingClientRect()

    if (rect === undefined) {
      return
    }

    setHeight(rect.height)
  }, [screenWidth])

  const ref = mergeRefs(forwardedRef, ownRef)

  const jssClasses = useStyles({ topAppbarHeight: height ?? undefined })

  return (
    <>
      <AppBar position="fixed" ref={ ref }>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={ onMenuIconButtonClick }>
            <MenuIcon />
          </IconButton>
          <div className={ classes.Spacer } />
          <Box mx={ 1 }>
            <ToggleDarkButton />
          </Box>
          <LocaleSelect
            classes={ {
              label: classes.LocaleSelectLabel,
              input: classes.LocaleSelectInput,
              selectIcon: classes.LocaleSelectSelectIcon,
              inputUnderline: classes.LocaleSelectInputUnderline,
            } }
            FormControlProps={ {
              variant: 'filled',
            } }
          />
        </Toolbar>
      </AppBar>
      <div className={ jssClasses.Offset } />
    </>
  )
})

export default TopAppbar
