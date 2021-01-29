// @packages
import { fade } from '@material-ui/core/styles';

export default (theme) => ({
  addContent: {
    alignItems: 'center',
    display: 'flex',
    height: 500,
    justifyContent: 'center',
    textAlign: 'center',
    width: 500
  },
  button: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    bottom: 0,
    left: 0,
    position: 'absolute'
  },
  content: {
    border: '2px dashed black',
    borderRadius: 5,
    cursor: 'pointer',
    margin: 5,
    padding: '187px 0',
    width: 500
  },
  icon: {
    color: fade(theme.palette.common.black, 0.3),
    fontSize: '5rem'
  },
  previewImage: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%'
  }
});
