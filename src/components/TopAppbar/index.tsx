import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'

import DarkSwitch from '~/components/DarkSwitch'
import LocaleSelect from '~/components/LocaleSelect' // TODO
import classes from './classes.css'

interface Props {
  onMenuIconButtonClick: React.MouseEventHandler<HTMLButtonElement>
}

const useStyles = makeStyles(theme => ({
  Offset: theme.mixins.toolbar,
}))

const TopAppbar: React.FC<Props> = ({ onMenuIconButtonClick }) => {
  const jssClasses = useStyles()

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={ onMenuIconButtonClick }>
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
      <div className={ jssClasses.Offset } />
    </>
  )
}

export default TopAppbar
