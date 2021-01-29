// @scripts
import { gql } from '@apollo/client';

export const PUBLISH = gql`
  mutation publish($file: Upload) {
    publish(file: $file) {
      status
      url
    }
  }
`;

export const GET_PUBLICATIONS = gql`
  query getPublications($userName: String!) {
    getPublications(userName: $userName) {
      created
      file
      id
    }
  }
`;

export const GET_PUBLICATIONS_FOLLOWERS = gql`
  query getPublicationsFollowers {
    getPublicationsFollowers {
      created
      file
      id
      idUser {
        name
        userName
        avatar
      }
      typeFile
    }
  }
`;