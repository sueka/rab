import indigo from '@material-ui/core/colors/indigo'
import teal from '@material-ui/core/colors/teal'
import { createTheme } from '@material-ui/core/styles'

interface Props {
  direction?: Direction
  dark: boolean
}

const configureTheme = ({ direction, dark }: Props) => createTheme({
  direction,
  typography: {
    fontFamily: 'sans-serif',
    button: {
      textTransform: 'none',
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
  },
  palette: {
    primary: teal,
    secondary: indigo,
    type: dark ? 'dark' : 'light',
  },
})

export default configureTheme
