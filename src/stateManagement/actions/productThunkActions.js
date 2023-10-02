import {
  FETCH_AGES_FAIELD,
  FETCH_AGES_START,
  FETCH_AGES_SUCC,
  ADD_AGE,
  EDIT_AGE,
  DEL_AGES,
} from './actionTypes';
import { ApolloClient, InMemoryCache } from '@apollo/client';
// import { createUploadLink } from 'apollo-upload-client';
import { gql } from '@apollo/client';

const client = new ApolloClient({
  // uri: process.env.REACT_APP_API_KEY,
  uri: 'https://api.staging.apexsuite.pro/graphql',
  onError: (error) => {
    if (error.graphQLErrors) {
      error.graphQLErrors.forEach((graphQLError) => {
        console.log(graphQLError.message);
      });
    }
  },
  cache: new InMemoryCache({
    addTypename: false,
  }),

  fetchOptions: {
    mode: 'same-origin',
  },
});

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
export const CREATE_AGE = gql`
  mutation ($data: AgeInput) {
    CreateAge(data: $data)
  }
`;
export const Delete_AGE = gql`
  mutation ($id: Int) {
    DeleteAge(id: $id)
  }
`;
export const UPDATE_AGE = gql`
  mutation ($id: Int, $data: AgeInput) {
    UpdateAge(id: $id, data: $data)
  }
`;
export const GetAllProducts = () => async (dispatch) => {
  try {
    dispatch(fetchAgesStart());
    const result = await client.query({
      query: GET_ALL_AGE,
    });
    dispatch(fetchAgesSucc(result.data));
  } catch (error) {
    dispatch(fetchAgesFailed(error));
  }
};

export const AddAge = (ageData) => async (dispatch) => {
  try {
    dispatch(fetchAgesStart());
    const result = await client.mutate({
      mutation: CREATE_AGE,
      variables: { data: ageData },
      type: ADD_AGE,
    });
    dispatch(fetchAgesSucc(result.data));
  } catch (error) {
    dispatch(fetchAgesFailed(error));
  }
};
// export const updateAgeSuccess = (updatedAgeData) => ({
//   type: UPDATE_AGE,
//   payload: updatedAgeData,
// });
export const updateAgeSuccess = (updatedAgeData) => async (dispatch) => {
  try {
    dispatch(fetchAgesStart());
    await client.mutate({
      mutation: UPDATE_AGE,
      variables: { updatedAgeData },
      type: EDIT_AGE,
    });
    dispatch(fetchAgesSucc());
    dispatch(GetAllProducts());
  } catch (error) {
    dispatch(fetchAgesFailed(error));
  }
};
// export const DeleteAge = (DelAge) => ({
//   type: DEL_AGES,
//   payload: DelAge,
// });
export const DeleteAge = (id) => async (dispatch) => {
  try {
    dispatch(fetchAgesStart());
    await client.mutate({
      mutation: Delete_AGE,
      variables: { id },
      type: DEL_AGES,
    });
    dispatch(fetchAgesSucc());
    dispatch(GetAllProducts());
  } catch (error) {
    dispatch(fetchAgesFailed(error));
  }
};

// export const GetAllProducts = () => async (dispatch) => {
//   try {
//     const apiUrl = 'https://api.staging.apexsuite.pro/graphql';
//     dispatch(fetchAgesStart());
//     await fetch(apiUrl)
//       .then((response) => response.json())
//       .then((data) => {
//         dispatch(fetchAgesSucc(data));
//       });
//   } catch (error) {
//     dispatch(fetchAgesFailed(error));
//   }
// };

export const fetchAgesStart = () => ({
  type: FETCH_AGES_START,
});

export const fetchAgesSucc = (data) => ({
  type: FETCH_AGES_SUCC,
  payload: data,
});

export const fetchAgesFailed = (errorMessage) => ({
  type: FETCH_AGES_FAIELD,
  payload: errorMessage,
});
