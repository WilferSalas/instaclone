import { gql } from '@apollo/client';

export const IS_FOLLOW = gql`
  query isFollow($userName: String!) {
    isFollow(userName: $userName)
  }
`;

export const FOLLOW = gql`
  mutation follow($userName: String!) {
    follow(userName: $userName)
  }
`;

export const UNFOLLOW = gql`
  mutation unFollow($userName: String!) {
    unFollow(userName: $userName)
  }
`;

export const GET_FOLLOWERS = gql`
  query getFollowers($userName: String!) {
    getFollowers(userName: $userName) {
      avatar
      id
      name
      userName
    }
  }
`;

export const GET_FOLLOWING = gql`
  query getFollowing($userName: String!) {
    getFollowing(userName: $userName) {
      avatar
      id
      name
      userName
    }
  }
`;

export const GET_NOT_FOLLOWING = gql`
  query getNotFollowing {
    getNotFollowing {
      avatar
      id
      name
      userName
    }
  }
`;
