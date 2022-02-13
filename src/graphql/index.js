import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { SERVER_ERRORS } from "../common/serverErrors";
import { setUserSessionExpiredError } from "../store/actions/notifications";
import store from "../store/store";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  const errorMessage = networkError?.result?.error;
  if (SERVER_ERRORS[errorMessage]) {
    store.dispatch(setUserSessionExpiredError());
  } else {
    console.log("Uncaught server error");
  }

  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
