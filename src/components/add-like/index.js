// @packages
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useMutation } from '@apollo/client';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import { ADD_LIKE, DELETE_LIKE } from '../../gql/like';

// @styles
import styles from './styles';

const AddLike = ({
  classes,
  idPublication,
  isLike,
  likes,
  refetchCount,
  refetchLike
}) => {
  const [ addLike ] = useMutation(ADD_LIKE);
  const [ deleteLike ] = useMutation(DELETE_LIKE);

  const handleOnLike = async () => {
    try {
      await addLike({variables: { idPublication }});
      refetchCount();
      refetchLike();
    } catch (error) {
      toast.error('Error al dar like, intenta de nuevo por favor');
    };
  };

  const handleOnDislike = async () => {
    try {
      await deleteLike({variables: { idPublication }});
      refetchCount();
      refetchLike();
    } catch (error) {
      toast.error('Error al dar dislike, intenta de nuevo por favor');
    };
  };

  return (
    <React.Fragment>
      {isLike &&
        <FavoriteIcon
          className={`${classes.likeIcons} ${classes.liked}`}
          fontSize="large"
          onClick={handleOnDislike}
        />
      }
      {!isLike &&
        <FavoriteBorderIcon
          className={classes.likeIcons}
          fontSize="large"
          onClick={handleOnLike}
        />
      }
      <Typography gutterBottom>
        {likes} likes
      </Typography>
    </React.Fragment>
  )
}

AddLike.propTypes = {
  classes: PropTypes.object.isRequired,
  isLike: PropTypes.bool.isRequired,
  likes: PropTypes.number,
  refetchCount: PropTypes.func.isRequired,
  refetchLike: PropTypes.func.isRequired
}

AddLike.defaultProps = {
  likes: 0
}

export default withStyles(styles)(AddLike);