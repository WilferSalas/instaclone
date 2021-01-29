// @packages
import { gql } from '@apollo/client';

export const ADD_COMENT = gql`
  mutation addComment($input: CommentInput) {
    addComment(input: $input) {
      comment
      created
      idPublication
      idUser {
        name
      }
    }
  }
`;

export const GET_COMMENTS = gql`
  query getComments($idPublication: ID!) {
    getComments(idPublication: $idPublication) {
      comment
      created
      idUser {
        userName
        avatar
      }
    }
  }
`;