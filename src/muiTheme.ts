import createMuiTheme, { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'
import teal from '@material-ui/core/colors/teal'
import indigo from '@material-ui/core/colors/indigo'

const muiThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: 'sans-serif',
  },
  props: {
    MuiLink: {
      variant: 'body1',
    },
    MuiButton: {
      variant: 'outlined',
    },
    MuiFormControl: {
      variant: 'outlined',
    },
  },
  palette: {
    primary: teal,
    secondary: indigo,
  },
}

export default createMuiTheme(muiThemeOptions)
