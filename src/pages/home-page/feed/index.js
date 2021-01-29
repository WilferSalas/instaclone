// @packages
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useQuery } from '@apollo/client';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import AddComment from '../../../components/add-comment';
import AddLike from '../../../components/add-like';
import LoadingPage from '../../../components/loading-page'
import { IS_LIKE, COUNT_LIKES } from '../../../gql/like';

// @images
import ProfileImage from '../../../styles/assets/avatar.png';

// @styles
import styles from './styles';

const Feed = ({
  avatar,
  classes,
  file,
  id,
  idPublication,
  input,
  loading,
  onChange,
  onPostComment,
  onRedirect,
  userName
}) => {
  const {
    data: isLikeData,
    loading: isLikeLoading,
    refetch: refetchLike
  } = useQuery(IS_LIKE, {
    variables: { idPublication }
  });

  const {
    data: countLikeData,
    loading: countLikeLoading,
    refetch: refetchCount
  } = useQuery(COUNT_LIKES, {
    variables: { idPublication }
  });

  if (loading) return <LoadingPage id="home" />;
  if (isLikeLoading || countLikeLoading) return null;

  return (
    <Paper
      className={classes.publication}
      key={id}
      square
      variant="outlined"
    >
      <Box className={classes.headerPublication}>
        <Avatar
          alt={`avatar${id}`}
          src={avatar ? avatar : ProfileImage}
        />
        <Typography
          className={classes.headerPublicationName}
          display="inline"
          onClick={() => onRedirect(userName)}
        >
          {userName}
        </Typography>
      </Box>
      <img
        alt={`publication${id}`}
        className={classes.publicationImage}
        src={file}
      />
      <Box className={classes.likeActions}>
        <AddLike
          idPublication={idPublication}
          isLike={isLikeData.isLike}
          likes={countLikeData.countLikes}
          refetchCount={refetchCount}
          refetchLike={refetchLike}
        />
      </Box>
      <AddComment
        onChange={onChange}
        onClick={() => onPostComment(idPublication)}
        value={input}
      />
    </Paper>
  )
}

Feed.propTypes = {
  avatar: PropTypes.string,
  classes: PropTypes.object.isRequired,
  file: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  idPublication: PropTypes.string.isRequired,
  input: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onPostComment: PropTypes.func.isRequired,
  onRedirect: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired
}

Feed.defaultProps = {
  avatar: ''
}

export default withStyles(styles)(Feed);
