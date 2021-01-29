// @packages
import { gql } from '@apollo/client';

// Querys
export const IS_LIKE = gql`
  query isLike($idPublication: ID!) {
    isLike(idPublication: $idPublication)
  }
`;

export const COUNT_LIKES = gql`
  query countLikes($idPublication: ID!) {
    countLikes(idPublication: $idPublication)
  }
`;

// Mutations
export const ADD_LIKE = gql`
  mutation addLike($idPublication: ID!) {
    addLike(idPublication: $idPublication)
  }
`;

export const DELETE_LIKE = gql`
  mutation deleteLike($idPublication: ID!) {
    deleteLike(idPublication: $idPublication)
  }
`;
