// @packages
import { fade } from '@material-ui/core/styles';

export default (theme) => ({
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  },
  list: {
    padding: 0
  },
  notFound: {
    padding: '25px 5px'
  },
  search: {
    backgroundColor: fade(theme.palette.common.black, 0.03),
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    marginRight: theme.spacing(2),
    position: 'relative',
    position: 'relative',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searches: {
    backgroundColor: theme.palette.common.white,
    margin: '0 25px',
    position: 'absolute',
    width: '85%',
    zIndex: 9999
  },
  searchIcon: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    padding: theme.spacing(0, 2),
    pointerEvents: 'none',
    position: 'absolute'
  },
  searchPage: {
    position: 'relative'
  }
});
