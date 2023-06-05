import indigo from '@mui/material/colors/indigo'
import teal from '@mui/material/colors/teal'
import { createTheme } from '@mui/material/styles'

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
