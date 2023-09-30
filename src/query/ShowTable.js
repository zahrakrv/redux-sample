import { useEffect, useState } from 'react';
import { CREATE_AGE, UPDATE_AGE, Delete_AGE, GET_ALL_AGE } from './QueryAge';
import {
  ApolloClient,
  InMemoryCache,
  useMutation,
  useQuery,
} from '@apollo/client';

const ShowTable = () => {
  const [ageData, setAgeData] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [create] = useMutation(CREATE_AGE);
  const [update] = useMutation(UPDATE_AGE);
  const [Delete] = useMutation(Delete_AGE);
  const [updateId, setUpdateId] = useState(null);
  const DATA = {
    name: name,
    description: description,
    from_age: parseInt(from),
    to_age: parseInt(to),
  };

  // const client = new ApolloClient({
  //   // uri: process.env.REACT_APP_API_KEY,
  //   uri: 'https://api.staging.apexsuite.pro/graphql',
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
  // const GET_AGES = () => {
  //   return client.query({
  //     query: GET_ALL_AGE,
  //     fetchPolicy: 'no-cache',
  //   });
  // };
  // const getAllAges = () => {
  //   GET_AGES().then(({ data }) => {
  //     // console.log('DATA:', data);
  //     setAgeData(data);
  //   });
  // };
  // useEffect(() => {
  //   getAllAges();
  // }, []);

  // const { loading, error, data, refetch } = useQuery(GET_ALL_AGE);
  // useEffect(() => {
  //   if (!loading && data) {
  //     setAgeData(data);
  //   }
  // }, [loading, data]);

  const handleUpdate = (id) => {
    const updatedData = ageData?.AllAge?.data?.find((age) => age?.id === id);
    if (updatedData) {
      setName(updatedData.name);
      setDescription(updatedData.description);
      setFrom(updatedData.from_age);
      setTo(updatedData.to_age);
      setUpdateId(updatedData.id);
    }
  };

  ///create and update
  const submitForm = (e) => {
    e.preventDefault();
    if (updateId) {
      update({
        variables: {
          data: DATA,
          id: updateId,
        },
      })
        .then((res) => {
          console.log(res);
          // refetch();
          // getAllAges();
        })
        .catch((error) => {
          console.log(error);
        });
      setName('');
      setDescription('');
      setFrom('');
      setTo('');
      setUpdateId(null);
    } else {
      create({
        variables: {
          data: DATA,
        },
      })
        .then((res) => {
          console.log(res);
          // refetch();
          // getAllAges();
        })
        .catch((error) => {
          console.log(error);
        });
      // refetch();
      // getAllAges();
      setName('');
      setDescription('');
      setFrom(0);
      setTo(0);
    }
  };

  ///delete
  const handleDelete = (id) => {
    Delete({
      variables: {
        id: id,
      },
    })
      .then((res) => {
        console.log(res);
        // refetch();
        // getAllAges();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(ageData);
  if (ageData) {
    return (
      <>
        <h1 className="font-bold text-center text-3xl m-6">Age Form</h1>
        <form
          onSubmit={submitForm}
          className="flex flex-col items-center justify-center gap-8 mb-10"
        >
          <div className="flex gap-3">
            <div className="flex gap-3 items-center ml-4">
              <label>Enter your name:</label>
              <input
                className="p-2 border border-gray-500 rounded outline-none"
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="flex gap-3 items-center">
              <label>Enter description:</label>
              <input
                className="p-2 border border-gray-500 rounded outline-none"
                type="text"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex gap-3 items-center">
              <label>Enter your age from:</label>
              <input
                className="p-2 border border-gray-500 rounded outline-none"
                type="number"
                placeholder="from age"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              ></input>
            </div>
            <div className="flex gap-3 items-center">
              <label>Enter your age to:</label>
              <input
                className="p-2 border border-gray-500 rounded outline-none"
                type="number"
                placeholder="to age"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              ></input>
            </div>
          </div>
          <button
            className="bg-green-500 text-white rounded p-2 cursor-pointer hover:bg-green-800"
            type="submit"
          >
            Save
          </button>
        </form>

        <div className="flex justify-center">
          <table className="border table-fixed m-3 p-2 w-4/5">
            <thead>
              <tr className="border">
                <th className="shadow py-2">ID</th>
                <th className="shadow py-2">Name</th>
                <th className="shadow py-2">Description</th>
                <th className="shadow py-2">From</th>
                <th className="shadow py-2">To</th>
                <th className="shadow py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {ageData?.AllAge?.data?.map((age, index) => {
                return (
                  <tr
                    className="border p-2 items-center text-center"
                    key={index}
                  >
                    <td className="shadow">{age?.id}</td>
                    <td className="shadow">{age?.name}</td>
                    <td className="shadow">{age?.description}</td>
                    <td className="shadow">{age?.from_age}</td>
                    <td className="shadow">{age?.to_age}</td>
                    <td className="shadow">
                      <div className="flex justify-around">
                        <button onClick={() => handleUpdate(age?.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1.2em"
                            viewBox="0 0 512 512"
                            fill="blue"
                          >
                            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                          </svg>
                        </button>
                        <button onClick={() => handleDelete(age?.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1.2em"
                            viewBox="0 0 448 512"
                            fill="red"
                          >
                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
};

export default ShowTable;
