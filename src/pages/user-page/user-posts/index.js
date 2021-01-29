// @packages
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import LoadingPage from '../../../components/loading-page';
import ModalDialog from '../../../components/modal-dialog';
import UserPostsComments from '../user-posts-comments';
import { GET_PUBLICATIONS } from '../../../gql/publications';

// @styles
import styles from './styles';

const UserPosts = ({ classes, userData, userName }) => {
  const [publication, setPublication] = useState({
    created: '',
    id: '',
    photo: ''
  });
  const [open, setOpen] = useState(false);
  const { data, loading, startPolling, stopPolling } = useQuery(GET_PUBLICATIONS, {
    variables: { userName }
  });

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    }
  }, [startPolling, stopPolling]);

  if (loading) return <LoadingPage id="user-publications" />;

  const handleOnClickPhoto = (file, id, created) => {
    setPublication({ created, id, photo: file });

    setOpen((prev) => !prev);
  };

  return (
    <Box>
      <ModalDialog
        id="header"
        maxWidth="lg"
        onClose={handleOnClickPhoto}
        open={open}
      >
        <UserPostsComments
          publication={publication}
          userData={userData}
          userName={userName}
        />
      </ModalDialog>
      <Divider className={classes.divider} />
      <GridList
        cellHeight={300}
        className={classes.gridList}
        cols={3}
      >
        {data.getPublications.map((tile) => (
          <GridListTile key={tile.id} cols={1}>
            <img
              alt={tile.id}
              className={classes.image}
              src={tile.file}
              onClick={() => handleOnClickPhoto(tile.file, tile.id, tile.created)}
            />
          </GridListTile>
        ))}
      </GridList>
    </Box>
  )
}

UserPosts.propTypes = {
  classes : PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  userName: PropTypes.string.isRequired
}

export default withStyles(styles)(UserPosts);
