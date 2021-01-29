// @packages
import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation register($input: UserInput) {
    register(input: $input) {
        created
        email
        id
        name
        password
        userName
      }
    }
`;

export const LOGIN = gql`
  mutation login($input: LoginInput) {
    login(input: $input) {
      token
    }
  }
`;

export const GET_USER = gql`
  query getUser($id: ID, $userName: String) {
    getUser(id: $id, userName: $userName) {
      avatar
      description
      email
      id
      name
      site
      userName
    }
  }
`;

export const UPDATE_AVATAR = gql`
  mutation updateAvatar($file: Upload) {
    updateAvatar(file: $file) {
      status
      url
    }
  }
`;

export const DELETE_AVATAR = gql`
  mutation deleteAvatar {
    deleteAvatar
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($input: UserUpdateInput) {
    updateUser(input: $input)
  }
`;

export const SEARCH = gql`
  query search($search: String) {
    search(search: $search) {
      name
      userName
      id
      avatar
    }
  }
`;