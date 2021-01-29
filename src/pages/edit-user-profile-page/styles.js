// @packages
import { fade } from '@material-ui/core/styles';

export default (theme) => ({
  list: {
    paddingTop: 0
  },
  listItem: {
    padding: '10px 10px 10px 15px',
    '&:hover': {
      borderLeft: `2px solid ${fade(theme.palette.common.black, 0.2)}`
    }
  },
  paper: {
    border: `1px solid ${fade(theme.palette.common.black, 0.1)}`,
    height: 'calc(100vh - 80px)'
  },
  selected: {
    borderLeft: `2px solid ${fade(theme.palette.common.black, 0.8)}`,
    '&.MuiListItem-root.Mui-selected': {
      backgroundColor: theme.palette.common.white
    },
    '&:hover': {
      borderLeft: `2px solid ${fade(theme.palette.common.black, 0.8)}`
    }
  }
});
