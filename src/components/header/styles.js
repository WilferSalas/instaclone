// @packages
import { fade } from '@material-ui/core/styles';

export default (theme) => ({
  appbar: {
    marginBottom: 20
  },
  avatar: {
    cursor: 'pointer',
    height: theme.spacing(4),
    marginLeft: 6,
    width: theme.spacing(4)
  },
  image: {
    cursor: 'pointer',
    width: 150
  },
  link: {
    '&:hover': {
      textDecoration: 'none'
    }
  },
  option: {
    cursor: 'pointer',
    margin: '0 3px'
  },
  options: {
    alignItems: 'center',
    display: 'flex'
  },
  toolbar: {
    justifyContent: 'space-between',
    padding: 0
  },
  typography: {
    fontSize: '0.9rem'
  }
});
