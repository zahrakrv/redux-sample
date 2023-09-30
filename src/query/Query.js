import gql from 'graphql-tag';

export const GET_ALL_USERS = gql`
  query {
    allUser {
      data {
        id
        first_name
        last_name
        email
        mobile
      }
    }
  }
`;
