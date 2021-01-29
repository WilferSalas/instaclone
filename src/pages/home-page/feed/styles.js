export default () => ({
  headerPublication: {
    alignItems: 'center',
    display: 'flex',
    padding: 10
  },
  headerPublicationName: {
    cursor: 'pointer',
    marginLeft: 20,
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  likeActions: {
    padding: '10px 15px'
  },
  publication: {
    marginBottom: 40
  },
  publicationImage: {
    height: 'auto',
    width: '100%'
  }
});
