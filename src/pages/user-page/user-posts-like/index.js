// @packages
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { useQuery } from '@apollo/client';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import AddLike from '../../../components/add-like';
import { COUNT_LIKES, IS_LIKE } from '../../../gql/like';

require('moment/locale/es');

// @styles
import styles from './styles';

const UserPostsLike = ({ classes, created, idPublication }) => {
  const {
    data: isLikeData,
    loading: isLikeLoading,
    refetch: refetchLike
  } = useQuery(IS_LIKE, {
    variables: {
      idPublication
    }
  });

  const {
    data: countLikeData,
    loading: countLikeLoading,
    refetch: refetchCount
  } = useQuery(COUNT_LIKES, {
    variables: {
      idPublication
    }
  });

  if (isLikeLoading || countLikeLoading) return null;

  const { isLike } = isLikeData;
  const { countLikes } = countLikeData;

  return (
    <Box className={classes.like}>
      <AddLike
        idPublication={idPublication}
        isLike={isLike}
        likes={countLikes}
        refetchCount={refetchCount}
        refetchLike={refetchLike}
      />
      <Typography variant="caption">
        {moment.unix(created / 1000).format('LL')}
      </Typography>
    </Box>
  )
}

UserPostsLike.propTypes = {
  classes: PropTypes.object.isRequired,
  created: PropTypes.string,
  idPublication: PropTypes.string.isRequired
}

UserPostsLike.defaultProps = {
  created: ''
}

export default withStyles(styles)(UserPostsLike);