import { useState } from 'react';
import { CREATE_AGE, UPDATE_AGE, Delete_AGE } from './QueryAge';
import { ApolloClient, InMemoryCache, useMutation } from '@apollo/client';

// export const client = new ApolloClient({
//   uri: process.env.REACT_APP_API_KEY,
//   onError: (error) => {
//     if (error.graphQLErrors) {
//       error.graphQLErrors.forEach((graphQLError) => {
//         console.log(graphQLError.message);
//       });
//     }
//   },
//   cache: new InMemoryCache({
//     addTypename: false,
//   }),

//   fetchOptions: {
//     mode: 'same-origin',
//   },
// });
// export const SAVE = (props) => {
//   const { QUERY_STRING } = props;

//   return client.query({
//     query: QUERY_STRING,
//     fetchPolicy: 'no-cache',
//   });
// };

// const handleClick = () => {
//   Get_Data({ QUERY_STRING: CREATE_AGE }).then(({ data }) => {
//     console.log('DATA:', data);
//   });
// };

function Ages() {
  const [create] = useMutation(CREATE_AGE);
  const [update] = useMutation(UPDATE_AGE);
  const [Delete] = useMutation(Delete_AGE);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const DATA = {
    name: name,
    description: description,
    from_age: parseInt(from),
    to_age: parseInt(to),
  };
  // console.log(DATA);
  const handleSave = () => {
    create({
      variables: {
        data: DATA,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleUpdate = () => {
    update({
      variables: {
        data: DATA,
        id: 7,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const hanleDelete = (id) => {
    Delete({
      variables: {
        id: 7,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="description"
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <input
        type="number"
        placeholder="from age"
        onChange={(e) => setFrom(e.target.value)}
      ></input>
      <input
        type="number"
        placeholder="to age"
        onChange={(e) => setTo(e.target.value)}
      ></input>
      <button onClick={() => handleSave()}>Save</button>
      <button onClick={() => handleUpdate()}>Update</button>
      <button onClick={() => hanleDelete()}>Delete</button>
    </div>
  );
}

export default Ages;
