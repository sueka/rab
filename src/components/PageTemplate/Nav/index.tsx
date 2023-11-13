import chat from '@iconify/icons-mdi/chat'
import chessPawn from '@iconify/icons-mdi/chess-pawn'
import clock from '@iconify/icons-mdi/clock'
import counter from '@iconify/icons-mdi/counter'
import qrcode from '@iconify/icons-mdi/qrcode'
import table from '@iconify/icons-mdi/table'
import { Icon } from '@iconify/react'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import { Theme, makeStyles } from '@material-ui/core/styles'
import BrushIcon from '@material-ui/icons/Brush'
import HomeIcon from '@material-ui/icons/Home'
import ImageIcon from '@material-ui/icons/Image'
import InfoIcon from '@material-ui/icons/Info'
import ListIcon from '@material-ui/icons/List'
import MenuIcon from '@material-ui/icons/Menu'
import SettingsIcon from '@material-ui/icons/Settings'
import TextFieldsIcon from '@material-ui/icons/TextFields'
import React, { useContext, useMemo } from 'react'
import { FormattedMessage } from 'react-intl'

import { shouldBePresent } from '~/asserters/commonAsserters'
import ListItemLink from '~/components/ListItemLink'
import IntlProviderContext from '~/contexts/IntlProviderContext'
import typed from '~/typed'
import classes from './classes.css'
import messages from './messages'

interface Props {
  open: boolean
  onClose(): void
  topAppbarHeight?: number
}

interface StyleProps {
  topAppbarHeight?: number
}

const useStyles = makeStyles<Theme, StyleProps, 'DrawerHeader'>((theme) => ({
  DrawerHeader: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    height: ({ topAppbarHeight }) => topAppbarHeight !== undefined ? typed<[number]>`${ topAppbarHeight }px` : undefined,
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'start',
  },
}), { name: 'Nav' })

const FlippedListIcon: React.FC<React.PropsOf<typeof ListIcon>> = ({ style, ...restProps }) => {
  if (style === undefined) {
    return <ListIcon style={ { transform: 'scaleX(-1)' } } { ...restProps } />
  }

  const { transform, ...restStyle } = style

  if (transform !== undefined) {
    throw new Error
  }

  return <ListIcon style={ { transform: 'scaleX(-1)', ...restStyle } } { ...restProps } />
}

const Nav = React.forwardRef<HTMLDivElement, Props>(({ open, onClose, topAppbarHeight }, ref) => {
  const { dir } = useContext(IntlProviderContext)

  const RtlFriendlyListIcon = useMemo(() => {
    shouldBePresent(dir)

    switch (dir) {
      case 'ltr': return ListIcon
      case 'rtl': return FlippedListIcon
    }
  }, [dir])

  const jssClasses = useStyles({ topAppbarHeight })

  // NOTE: anchor はページが RtL であることを検出すると水平反転するので、 dir から計算する必要は無い。
  return (
    <Drawer anchor="left" open={ open } onClose={ onClose } PaperProps={ { ref } }>
      <div className={ jssClasses.DrawerHeader }>
        <IconButton edge="start" color="inherit" onClick={ onClose }>
          <MenuIcon />
        </IconButton>
      </div>
      <Divider />
      <List className={ classes.List }>
        <ListItemLink to="/" onClick={ onClose }>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>
            <FormattedMessage { ...messages.home } />
          </ListItemText>
        </ListItemLink>
        <ListSubheader disableSticky>
          <FormattedMessage { ...messages.components } />
        </ListSubheader>
        <ListItemLink to="/form-controls" onClick={ onClose }>
          <ListItemIcon>
            <TextFieldsIcon />
          </ListItemIcon>
          <ListItemText>
            <FormattedMessage { ...messages.formControls } />
          </ListItemText>
        </ListItemLink>
        <ListItemLink to="/table" onClick={ onClose }>
          <ListItemIcon>
            <Icon icon={ table } width="24" height="24" />
          </ListItemIcon>
          <ListItemText>
            <FormattedMessage { ...messages.table } />
          </ListItemText>
        </ListItemLink>
        <ListSubheader disableSticky>
          <FormattedMessage { ...messages.apps } />
        </ListSubheader>
        {/* <ListItemLink to="/chat" onClick={ onClose }>
          <ListItemIcon>
            <Icon icon={ chat } width="24" height="24" />
          </ListItemIcon>
          <ListItemText>
            <FormattedMessage { ...messages.chat } />
          </ListItemText>
        </ListItemLink> */}
        <ListItemLink to="/chess" onClick={ onClose }>
          <ListItemIcon>
            <Icon icon={ chessPawn } width="24" height="24" />
          </ListItemIcon>
          <ListItemText>
            <FormattedMessage { ...messages.chess } />
          </ListItemText>
        </ListItemLink>
        <ListItemLink to="/clock" onClick={ onClose }>
          <ListItemIcon>
            <Icon icon={ clock } width="24" height="24" />
          </ListItemIcon>
          <ListItemText>
            <FormattedMessage { ...messages.clock } />
          </ListItemText>
        </ListItemLink>
        <ListItemLink to="/counter" onClick={ onClose }>
          <ListItemIcon>
            <Icon icon={ counter } width="24" height="24" />
          </ListItemIcon>
          <ListItemText>
            <FormattedMessage { ...messages.counter } />
          </ListItemText>
        </ListItemLink>
        <ListItemLink to="/image-data-url-en-decoder" onClick={ onClose }>
          <ListItemIcon>
            <ImageIcon />
          </ListItemIcon>
          <ListItemText>
            <FormattedMessage { ...messages.imageDataUrlEnDecoder } />
          </ListItemText>
        </ListItemLink>
        <ListItemLink to="/info" onClick={ onClose }>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText>
            <FormattedMessage { ...messages.info } />
          </ListItemText>
        </ListItemLink>
        <ListItemLink to="/paint" onClick={ onClose }>
          <ListItemIcon>
            <BrushIcon />
          </ListItemIcon>
          <ListItemText>
            <FormattedMessage { ...messages.paint } />
          </ListItemText>
        </ListItemLink>
        <ListItemLink to="/qr-code-tools" onClick={ onClose }>
          <ListItemIcon>
            <Icon icon={ qrcode } width="24" height="24" />
          </ListItemIcon>
          <ListItemText>
            <FormattedMessage { ...messages.qrCodeTools } />
          </ListItemText>
        </ListItemLink>
        <ListItemLink to="/reminder" onClick={ onClose }>
          <ListItemIcon>
            <RtlFriendlyListIcon />
          </ListItemIcon>
          <ListItemText>
            <FormattedMessage { ...messages.reminder } />
          </ListItemText>
        </ListItemLink>
        <ListItemLink to="/settings" onClick={ onClose }>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText>
            <FormattedMessage { ...messages.settings } />
          </ListItemText>
        </ListItemLink>
      </List>
    </Drawer>
  )
})

export default Nav
