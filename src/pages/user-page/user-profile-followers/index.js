// @packages
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { size } from 'lodash';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import ModalDialog from '../../../components/modal-dialog';

// @styles
import styles from './styles';

const UserProfileFollowers = ({
  classes,
  dataFollowers,
  dataFollowing,
  dataPublications,
  loadingFollowers,
  loadingFollowing,
  loadingPublications
}) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [isFollowers, setIsFollowers] = useState(true);

  if (loadingFollowers || loadingFollowing || loadingPublications) return null;

  const { getFollowers } = dataFollowers;
  const { getFollowing } = dataFollowing;

  const getDataMap = () => {
    if (isFollowers) return getFollowers

    return getFollowing
  }

  const handleOnOpenFollowers = () => {
    setIsFollowers(true);
    handleOnModal();
  };

  const handleOnOpenFollowing = () => {
    setIsFollowers(false);
    handleOnModal();
  };

  const handleOnModal = () => {
    setOpen((prev) => !prev);
  };

  const handleOnRedirect = (userName) => {
    history.push(`/${userName}`);
    setOpen(false);
  };

  const TextInfo = ({ value, description, onClick }) => (
    <Grid item xs={3}>
      <Box className={classes.options} onClick={onClick ? onClick : Function.prototype}>
        <Typography gutterBottom className={classes.textValue} display="inline">
          {value}
        </Typography>
        <Typography gutterBottom display="inline">
          {description}
        </Typography>
      </Box>
    </Grid>
  );

  return (
    <React.Fragment>
      <ModalDialog id="user-profile" onClose={handleOnModal} open={open}>
        <Typography className={classes.title} align="center" variant="h6">
          {isFollowers ? 'Seguidores' : 'Seguidos'}
        </Typography>
        <Divider />
        <List className={classes.list}>
          {getDataMap().map(item => [
            <ListItem
              button
              key={item.id}
              onClick={() => handleOnRedirect(item.userName)}
            >
              <ListItemAvatar>
                <Avatar alt={item.username} src={item.avatar} />
              </ListItemAvatar>
              <ListItemText primary={item.userName} secondary={item.name} />
            </ListItem>,
            <Divider key={`${item.id}-divider`} />
          ])}
        </List>
      </ModalDialog>
      <TextInfo
        description="publicaciones"
        value={size(dataPublications.getPublications)}
      />
      <TextInfo
        description="seguidores"
        onClick={handleOnOpenFollowers}
        value={size(dataFollowers.getFollowers)}
      />
      <TextInfo
        description="seguidos"
        onClick={handleOnOpenFollowing}
        value={size(dataFollowing.getFollowing)}
      />
    </React.Fragment>
  )
}

UserProfileFollowers.propTypes = {
  classes : PropTypes.object.isRequired,
  dataFollowers: PropTypes.object,
  dataFollowing: PropTypes.object,
  dataPublications: PropTypes.object,
  loadingFollowers: PropTypes.bool.isRequired,
  loadingFollowing: PropTypes.bool.isRequired,
  loadingPublications: PropTypes.bool.isRequired
}

UserProfileFollowers.defaultProps = {
  dataFollowers: null,
  dataFollowing: null,
  dataPublications: null
}

export default withStyles(styles)(UserProfileFollowers);
