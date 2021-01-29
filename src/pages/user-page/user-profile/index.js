// @packages
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { useQuery } from '@apollo/client';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import ModalDialog from '../../../components/modal-dialog';
import UploadPhoto from '../upload-photo';
import UserProfileFollowers from '../user-profile-followers';
import UserProfileOptions from '../user-profile-options';
import useAuth from '../../../hooks/useAuth';
import { GET_FOLLOWERS, GET_FOLLOWING } from '../../../gql/follow';
import { GET_PUBLICATIONS } from '../../../gql/publications';

// @images
import ProfileImage from '../../../styles/assets/avatar.png';

// @styles
import styles from './styles';

const UserProfile = ({ classes, data, userName }) => {
  const [open, setOpen] = useState(false);
  const { auth } = useAuth();

  const {
    data: dataFollowers,
    loading: loadingFollowers,
    refetch: followersRefetch
  } = useQuery(GET_FOLLOWERS, { variables: { userName }});
  const {
    data: dataFollowing,
    loading: loadingFollowing,
    refetch: followingRefetch
  } = useQuery(GET_FOLLOWING, { variables: { userName }});
  const {
    data: dataPublications,
    loading: loadingPublications
  } = useQuery(GET_PUBLICATIONS, { variables: { userName } });

  const handleOnModal = () => {
    setOpen((prev) => !prev);
  };

  const { getUser: { avatar, name, site, description } } = data;

  return (
    <Box className={classes.user} id="home-page">
      <ModalDialog id="user-profile" onClose={handleOnModal} open={open}>
        <UploadPhoto onCancel={handleOnModal} onClose={handleOnModal} />
      </ModalDialog>
      <Grid container>
        <Grid container item xs={4} justify="center">
          <Avatar
            alt={userName}
            className={classes.avatar}
            src={avatar ? avatar : ProfileImage }
            onClick={auth.userName === userName ? handleOnModal : null }
          />
        </Grid>
        <Grid container item xs={8} spacing={0}>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h5" display="inline">
              {userName}
            </Typography>
            <UserProfileOptions
              auth={auth}
              followersRefetch={followersRefetch}
              followingRefetch={followingRefetch}
              userName={userName}
            />
          </Grid>
          <UserProfileFollowers
            dataFollowers={dataFollowers}
            dataFollowing={dataFollowing}
            dataPublications={dataPublications}
            loadingFollowers={loadingFollowers}
            loadingFollowing={loadingFollowing}
            loadingPublications={loadingPublications}
          />
          <Grid item xs={12}>
            <Typography className={classes.name}>
              {name}
            </Typography>
            <Typography>
              {description}
            </Typography>
            <Link target="_blank" href={`https://${site}/`}>
              <Typography>
                {site}
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

UserProfile.propTypes = {
  classes : PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  error: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired
}

UserProfile.defaultProps = {
  error: {}
}

export default withStyles(styles)(UserProfile);
