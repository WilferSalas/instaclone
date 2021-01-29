import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#FAFAFA',
    },
    common: {
      black: '#000000',
      white: '#FFFFFF'
    },
    error: {
      main: '#D32F2F'
    }
  },
});

export default theme;
