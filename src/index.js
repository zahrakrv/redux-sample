import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import AllUsers from './query/UsersList';
import Ages from './query/AgeList';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import ShowTable from './query/ShowTable';
import ShowTable2 from './query/ShowTable2';
import ImagePaint from './konva/ImagePaint';
import ZindexChanger from './konva/indexChanger';
import PaintApp from './konva/draw';
import URLImage from './konva/LoadImage';
import DrawingApp from './konva/DrawingApp';
import { Provider } from 'react-redux';
// import ReduxApp from './redux/ReduxApp';
import { store, persistor } from './stateManagement/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

const client = new ApolloClient({
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

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ApolloProvider client={client}>
        <React.StrictMode>
          <ShowTable2 />
          {/* <PaintApp /> */}
        </React.StrictMode>
      </ApolloProvider>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
