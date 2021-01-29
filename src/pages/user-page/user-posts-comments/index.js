// @packages
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import AddComment from '../../../components/add-comment';
import LoadingPage from '../../../components/loading-page';
import UserPostsLike from '../user-posts-like';
import { ADD_COMENT, GET_COMMENTS } from '../../../gql/comment';

// @styles
import styles from './styles';

const UserPostsComments = ({ classes, publication, userData }) => {
  const history = useHistory();
  const [input, setInput] = useState('');
  const [ addComment ] = useMutation(ADD_COMENT);
  const { data, loading, refetch } = useQuery(GET_COMMENTS, {
    variables: {
      idPublication: publication.id
    }
  });

  if (loading) return <LoadingPage id="user-publications-comments" />;

  const handleOnChange = ({ target: { value }}) => {
    setInput(value);
  };

  const handleOnPostComment = async () => {
    try {
      const { data } = await addComment({
        variables: {
          input: { comment: input, idPublication: publication.id }
        }
      });

      if (data) {
        toast.success('Comentario publicado');
        refetch();
      }
      setInput('');
    } catch (error) {
      toast.error('Error al intentar publicar el comentario, intenta de nuevo');
    }
  };

  const handleOnRedirect = (username) => {
    history.push(`/${username}`)
  };

  const { getUser: { avatar, name, userName } } = userData;

  return (
    <Grid container>
      <Grid item xs={8}>
        <img className={classes.image} alt={publication.id} src={publication.photo} />
      </Grid>
      <Grid className={classes.comments} item xs={4}>
        <Grid className={classes.commentsHeader} container item xs={12}>
          <Grid item xs={2}>
            <Avatar
              alt={name}
              className={classes.commentsHeaderAvatar}
              src={avatar}
            />
          </Grid>
          <Grid item xs={10}>
            <Typography className={classes.commentsUserName}>
              {userName}
            </Typography>
            <Typography variant="body2">
              {name}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Box className={classes.boxComments}>
          {data?.getComments.map((comment, index) => (
            <Grid
              className={classes.commentsHeader}
              container
              item
              key={index}
              xs={12}
            >
              <Grid item xs={2}>
                <Avatar
                  alt={comment.idUser.name}
                  className={classes.commentsAvatar}
                  src={comment.idUser.avatar}
                />
              </Grid>
              <Grid item xs={10}>
                <Typography
                  className={classes.commentsUserName}
                  display="inline"
                  onClick={() => handleOnRedirect(comment.idUser.userName)}
                >
                  {comment.idUser.userName}
                </Typography>
                <Typography display="inline" variant="body2">
                  {comment.comment}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Box>
        <Grid className={classes.actions} container item xs={12}>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid className={classes.like} item xs={12}>
            <UserPostsLike
              created={publication.created}
              idPublication={publication.id}
            />
          </Grid>
        </Grid>
        <AddComment
          onChange={handleOnChange}
          onClick={handleOnPostComment}
          value={input}
        />
      </Grid>
    </Grid>
  )
}

UserPostsComments.propTypes = {
  classes : PropTypes.object.isRequired,
  publication: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]).isRequired,
  userData: PropTypes.object.isRequired
}

export default withStyles(styles)(UserPostsComments);
