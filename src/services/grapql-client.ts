import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

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
  const token = true; //store.getState().authentication.token;

  return {
    headers: {
      ...headers,
      ...(token && { authorization: `Bearer ${token}` }),
    },
  };
});

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_API_BASE_URL}/graphql`,
  fetchOptions: {
    mode: "cors",
  },
});

const link = ApolloLink.from([middleware, httpLink, errorLink]);

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
