import gql from 'graphql-tag';

export const CREATE_AGE = gql`
  mutation ($data: AgeInput) {
    CreateAge(data: $data)
  }
`;
export const UPDATE_AGE = gql`
  mutation ($id: Int, $data: AgeInput) {
    UpdateAge(id: $id, data: $data)
  }
`;
export const Delete_AGE = gql`
  mutation ($id: Int) {
    DeleteAge(id: $id)
  }
`;
export const GET_ALL_AGE = gql`
  query {
    AllAge {
      data {
        id
        name
        description
        from_age
        to_age
      }
    }
  }
`;
