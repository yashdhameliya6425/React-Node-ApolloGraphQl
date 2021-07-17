
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  split,
} from "@apollo/client";
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import { WebSocketLink } from "apollo-link-ws";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RetryLink } from "apollo-link-retry"
import { onError } from '@apollo/client/link/error'
import { getMainDefinition } from "apollo-utilities";
import { BrowserRouter } from 'react-router-dom';
import Router from './Router'


function App() {

  const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
      graphqlErrors.map(({ message, location, path }) => alert(`Graphql error ${message}`));
    }
  });

  const retry = new RetryLink({ attempts: { max: Infinity } });

  const httpLink = new HttpLink({
    uri: `http://localhost:8000/graphql`,
    credentials: "same-origin"
  });

  const wsLink = new WebSocketLink({
    uri: `ws://localhost:8000/graphql`,
    options: {
      reconnect: true,
    },
  });

  const terminatingLink = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === "OperationDefinition" && operation === "subscription";
    },
    wsLink,
    httpLink,
    retry
  );

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers = { ...headers, "authorization": token };
      }
      return { headers };
    });
    return forward(operation);
  });

  const link = ApolloLink.from([authLink, errorLink, terminatingLink]);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
  })


  return (
   // <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <BrowserRouter>
          <Router />
          <ToastContainer/>
        </BrowserRouter>
      </ApolloHooksProvider>
   // </ApolloProvider>
  );
}

export default App;
