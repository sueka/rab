import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import React, { useCallback, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import DarkSwitch from '~/components/DarkSwitch'
import LocaleSelect from '~/components/LocaleSelect' // TODO
import ListItemLink from '~/lib/components/ListItemLink'
import classes from './classes.css'
import messages from './messages'

const Nav: React.FC = () => {
  const [open, setOpen] = useState(false)

  const openDrawer = useCallback<React.MouseEventHandler>(() => {
    setOpen(true)
  }, [])

  const closeDrawer = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={ openDrawer }>
            <MenuIcon />
          </IconButton>
          <div className={ classes.Spacer } />
          <DarkSwitch />
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
      {/* NOTE: anchor はページが RtL であることを検出すると水平反転するので、 dir から計算する必要は無い。 */}
      <Drawer anchor="left" open={ open } onClose={ closeDrawer }>
        <List>
          <ListItemLink to="/" onClick={ closeDrawer }>
            <FormattedMessage { ...messages.home } />
          </ListItemLink>
          <ListItemLink to="/chess" onClick={ closeDrawer }>
            <FormattedMessage { ...messages.chess } />
          </ListItemLink>
          <ListItemLink to="/clock" onClick={ closeDrawer }>
            <FormattedMessage { ...messages.clock } />
          </ListItemLink>
          <ListItemLink to="/counter" onClick={ closeDrawer }>
            <FormattedMessage { ...messages.counter } />
          </ListItemLink>
          <ListItemLink to="/info" onClick={ closeDrawer }>
            <FormattedMessage { ...messages.info } />
          </ListItemLink>
          <ListItemLink to="/paint" onClick={ closeDrawer }>
            <FormattedMessage { ...messages.paint } />
          </ListItemLink>
          <ListItemLink to="/reminder" onClick={ closeDrawer }>
            <FormattedMessage { ...messages.reminder } />
          </ListItemLink>
        </List>
      </Drawer>
    </>
  )
}

export default Nav
