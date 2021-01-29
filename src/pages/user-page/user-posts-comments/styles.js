export default (theme) => ({
  actions: {
    alignItems: 'center',
    backgroundColor: theme.palette.common.white,
    bottom: 70,
    position: 'absolute',
    zIndex: 9999,
  },
  boxComments: {
    height: 535,
    overflow: 'auto'
  },
  comments: {
    position: 'relative'
  },
  commentsAvatar: {
    alignItems: 'center',
    display: 'flex'
  },
  commentsHeader: {
    padding: '10px 20px'
  },
  commentsUserName: {
    cursor: 'pointer',
    fontWeight: 500,
    paddingRight: 5,
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  image: {
    height: '100%',
    width: '100%'
  },
  input: {
    padding: '10px 10px'
  },
  like: {
    padding: '20px 20px 0 10px'
  },
  postButton: {
    padding: '15px 0',
    '&:hover': {
      backgroundColor: 'inherit'
    }
  },
  postComment: {
    alignItems: 'center',
    bottom: 0,
    position: 'absolute'
  }
});