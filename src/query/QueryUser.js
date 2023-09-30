import gql from 'graphql-tag';
export const GET_ALL_BRANDS = gql`
  query {
    allUser {
      data {
        id
        first_name
        last_name
        email
      }
    }
  }
`;
export const CREATE_USER = gql`
  mutation (
    $first_name: String
    $last_name: String
    $user_name: String
    $email: String
    $mobile: String
    $land_number: String
    $gender: String
    $password: String
  ) {
    CreateAge(
      data: {
        first_name: $first_name
        last_name: $last_name
        user_name: $user_name
        email: $email
        mobile: $mobile
        land_number: $land_number
        gender: $gender
        password: $password
      }
    )
  }
`;
