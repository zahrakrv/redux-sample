import { GET_ALL_USERS } from './Query';
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
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
export const Get_Data = (props) => {
  const { QUERY_STRING } = props;
  return client.query({
    query: QUERY_STRING,
    fetchPolicy: 'no-cache',
  });
};

const handleClick = () => {
  Get_Data({ QUERY_STRING: GET_ALL_USERS }).then(({ data }) => {
    console.log('DATA:', data);
  });
};

function AllUsers() {
  return (
    <div>
      <button onClick={() => handleClick()}>GetData</button>
    </div>
  );
}

export default AllUsers;
