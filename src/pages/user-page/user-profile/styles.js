export default (theme) => ({
  avatar: {
    cursor: 'pointer',
    height: theme.spacing(20),
    width: theme.spacing(20)
  },
  name: {
    fontWeight: 600,
    marginTop: 11
  },
  progress: {
    left: '50%',
    position: 'absolute',
    textAlign: 'center',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
  textValue: {
    fontWeight: 600,
    marginRight: 5
  }
});