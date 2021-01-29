// @packages
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import Feed from './feed';
import { ADD_COMENT } from '../../gql/comment';
import { GET_NOT_FOLLOWING } from '../../gql/follow';
import { GET_PUBLICATIONS_FOLLOWERS } from '../../gql/publications';

// @images
import ProfileImage from '../../styles/assets/avatar.png';

// @styles
import styles from './styles';

const HomePage = ({ classes }) => {
  const [ addComment ] = useMutation(ADD_COMENT);
  const [input, setInput] = useState('');
  const history = useHistory();
  const { data, loading } = useQuery(GET_PUBLICATIONS_FOLLOWERS);
  const { data: dataNotFollowig, loading: loadingNotFollowing } = useQuery(GET_NOT_FOLLOWING);

  if (loading || loadingNotFollowing) return null;

  const handleOnChange = ({ target: { value }}) => {
    setInput(value);
  };

  const handleOnPostComment = async (idPublication) => {
    try {
      const { data } = await addComment({
        variables: {
          input: { comment: input, idPublication }
        }
      });

      if (data) toast.success('Comentario publicado');
      setInput('');
    } catch (error) {
      toast.error('Error al intentar publicar el comentario, intenta de nuevo');
    }
  };

  const handleOnRedirect = (userName) => {
    history.push(`/${userName}`)
  };

  return (
    <Container className={classes.home} id="home-page">
      <Grid container spacing={3}>
        <Grid item xs={9}>
          {data.getPublicationsFollowers.map(item => (
            <Feed
              avatar={item.idUser.avatar}
              file={item.file}
              id={item.id}
              idPublication={item.id}
              input={input}
              key={item.id}
              loading={loading}
              onChange={handleOnChange}
              onPostComment={handleOnPostComment}
              onRedirect={handleOnRedirect}
              userName={item.idUser.userName}
            />
          ))}
        </Grid>
        <Grid item xs={3}>
          <Typography className={classes.userNotFollowing}>
            Usuarios que no sigues
          </Typography>
          <List>
            {dataNotFollowig.getNotFollowing.map(item => (
              <ListItem
                button
                key={item.id}
                onClick={() => handleOnRedirect(item.userName)}
              >
                <ListItemAvatar>
                  <Avatar src={item.avatar ? item.avatar : ProfileImage} />
                </ListItemAvatar>
                <ListItemText primary={item.userName} secondary={item.name} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  )
}

HomePage.propTypes = {
  classes : PropTypes.object.isRequired
}

export default withStyles(styles)(HomePage);
