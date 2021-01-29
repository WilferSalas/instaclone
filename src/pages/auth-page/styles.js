export default (theme) => ({
  button: {
    margin: '20px 0'
  },
  box: {
    WebkitTransform: 'translate(-50%, -50%)',
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400
  },
  input: {
    backgroundColor: '#FAFAFA',
    margin: '10px 0'
  },
  link: {
    marginLeft: 5,
    '&:hover': {
      textDecoration: 'none'
    }
  },
  linkForm: {
    color: theme.palette.common.black
  },
  logo: {
    margin: '5px 0 20px 0',
    width: 190
  },
  paper: {
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.common.black}33`,
    borderRadius: 1,
    margin: '20px 0',
    padding: '20px 50px',
    textAlign: 'center'
  }
});
