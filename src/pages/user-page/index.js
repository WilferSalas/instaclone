// @packages
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import LoadingPage from '../../components/loading-page';
import UserNotFound from '../../components/user-not-found';
import UserProfile from './user-profile';
import UserPosts from './user-posts';
import { GET_USER } from '../../gql/user';

// @styles
import styles from './styles';

const UserPage = ({ classes }) => {
  const { username } = useParams();
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { userName: username }
  });

  if (loading) return <LoadingPage id="user-page-loading" />;

  if (error) return <UserNotFound id="user-page-not-found" />;

  return (
    <Container className={classes.user} id="user-page">
      <UserProfile
        data={data}
        error={error}
        loading={loading}
        userName={username}
      />
      <UserPosts
        userData={data}
        userName={username}
      />
    </Container>
  )
}

UserPage.propTypes = {
  classes : PropTypes.object.isRequired
}

export default withStyles(styles)(UserPage);
