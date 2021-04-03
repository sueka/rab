import AppBar from '@material-ui/core/AppBar'
import Badge from '@material-ui/core/Badge'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Popover from '@material-ui/core/Popover'
import Toolbar from '@material-ui/core/Toolbar'
import { Theme, makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import React, { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import notificationsState from '~/atoms/notificationsState'
import LocaleSelect from '~/components/LocaleSelect' // TODO
import NotificationList from '~/components/NotificationList'
import ToggleDarkButton from '~/components/ToggleDarkButton'
import useRefsMerged from '~/lib/hooks/useRefsMerged'
import useScreen from '~/lib/hooks/useScreen'
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

  const ref = useRefsMerged(forwardedRef, ownRef)

  const jssClasses = useStyles({ topAppbarHeight: height ?? undefined })

  const [notifications] = useRecoilState(notificationsState)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const anchor = React.useRef<HTMLButtonElement | null>(null)

  const handleNotificationsShow = useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
    if (notifications.length !== 0) {
      setNotificationsOpen(true)
    }
  }, [notifications])

  const handleNotificationsClose = useCallback(() => {
    setNotificationsOpen(false)
  }, [])

  useEffect(() => {
    if (notifications.length === 0) {
      setNotificationsOpen(false)
    }
  }, [notifications])

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
            <IconButton color="inherit" onClick={ handleNotificationsShow } ref={ anchor }>
              <Badge color="secondary" badgeContent={ notifications.length }>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            { notifications.length !== 0 && <Popover
              open={ notificationsOpen }
              onClose={ handleNotificationsClose }
              anchorEl={ anchor.current }
              anchorOrigin={ {
                horizontal: 'right',
                vertical: 'bottom',
              } }
              transformOrigin={ {
                horizontal: 'right',
                vertical: 'top',
              } }
            >
              <NotificationList />
            </Popover> }
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
