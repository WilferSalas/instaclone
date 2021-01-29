// @scripts
import { Paper } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

export default () => ({
  deletePhotoOption: {
    color: red[600],
    fontWeight: 500,
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    padding: '17px 0',
    textAlign: 'center'
  },
  options: {
    cursor: 'pointer',
    padding: '15px 100px'
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 500,
    margin: '10px 0',
    padding: '20px 0'
  },
  uploadPhotoOption: {
    color: blue[500],
    fontWeight: 500,
  }
});
