import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { store } from "src/redux/store";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map((error) => {
      console.error(
        `[GraphQL error]: Message: ${error.message}, Location: ${JSON.stringify(
          error.locations
        )}, Path: ${error.path}`
      );
    });
  }

  if (networkError) {
    `[Network error]: Message: ${networkError.message}, Stack: ${networkError.stack}`;
  }
});

const middleware = setContext(async (_, { headers }) => {
  const token = store.getState().authentication.token;

  return {
    headers: {
      ...headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:8800/graphql",
  fetchOptions: {
    mode: "cors",
  },
});


const link = ApolloLink.from([errorLink, middleware, httpLink]);

const cache = new InMemoryCache({});

export const client = new ApolloClient({
  link,
  cache,
  connectToDevTools: true,
  defaultOptions: {
    query: {
      errorPolicy: "all",
      notifyOnNetworkStatusChange: true,
    },
  },
});
