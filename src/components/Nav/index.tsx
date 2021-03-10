import chessPawn from '@iconify-icons/mdi/chess-pawn'
import clock from '@iconify-icons/mdi/clock'
import counter from '@iconify-icons/mdi/counter'
import { Icon } from '@iconify/react'
import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Toolbar from '@material-ui/core/Toolbar'
import BrushIcon from '@material-ui/icons/Brush'
import HomeIcon from '@material-ui/icons/Home'
import InfoIcon from '@material-ui/icons/Info'
import ListIcon from '@material-ui/icons/List'
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
      { /* NOTE: anchor はページが RtL であることを検出すると水平反転するので、 dir から計算する必要は無い。 */ }
      <Drawer anchor="left" open={ open } onClose={ closeDrawer }>
        <List>
          <ListItemLink to="/" onClick={ closeDrawer }>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>
              <FormattedMessage { ...messages.home } />
            </ListItemText>
          </ListItemLink>
          <ListItemLink to="/chess" onClick={ closeDrawer }>
            <ListItemIcon>
              <Icon icon={ chessPawn } width="24" height="24" />
            </ListItemIcon>
            <ListItemText>
              <FormattedMessage { ...messages.chess } />
            </ListItemText>
          </ListItemLink>
          <ListItemLink to="/clock" onClick={ closeDrawer }>
            <ListItemIcon>
              <Icon icon={ clock } width="24" height="24" />
            </ListItemIcon>
            <ListItemText>
              <FormattedMessage { ...messages.clock } />
            </ListItemText>
          </ListItemLink>
          <ListItemLink to="/counter" onClick={ closeDrawer }>
            <ListItemIcon>
              <Icon icon={ counter } width="24" height="24" />
            </ListItemIcon>
            <ListItemText>
              <FormattedMessage { ...messages.counter } />
            </ListItemText>
          </ListItemLink>
          <ListItemLink to="/info" onClick={ closeDrawer }>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText>
              <FormattedMessage { ...messages.info } />
            </ListItemText>
          </ListItemLink>
          <ListItemLink to="/paint" onClick={ closeDrawer }>
            <ListItemIcon>
              <BrushIcon />
            </ListItemIcon>
            <ListItemText>
              <FormattedMessage { ...messages.paint } />
            </ListItemText>
          </ListItemLink>
          <ListItemLink to="/reminder" onClick={ closeDrawer }>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText>
              <FormattedMessage { ...messages.reminder } />
            </ListItemText>
          </ListItemLink>
        </List>
      </Drawer>
    </>
  )
}

export default Nav
