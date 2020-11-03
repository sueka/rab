import indigo from '@material-ui/core/colors/indigo'
import teal from '@material-ui/core/colors/teal'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

interface Props {
  direction?: 'rtl' | 'ltr'
  dark: boolean
}

const configureTheme = ({ direction, dark }: Props) => createMuiTheme({
  direction,
  typography: {
    fontFamily: 'sans-serif',
    button: {
      textTransform: 'capitalize',
    },
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
    MuiTextField: {
      variant: 'outlined',
    },
    MuiCheckbox: {
      color: 'primary',
    },
  },
  palette: {
    primary: teal,
    secondary: indigo,
    type: dark ? 'dark' : 'light',
  },
})

export default configureTheme
