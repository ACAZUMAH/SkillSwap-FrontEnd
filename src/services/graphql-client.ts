import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { store } from "src/redux/store";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

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
  uri: `${import.meta.env.VITE_API_BASE_URL}/graphql`,
  fetchOptions: {
    mode: "cors",
  },
}); 

console.log("GraphQL HTTP URL:", import.meta.env.VITE_API_BASE_URL);
console.log("GraphQL Subscription URL:", import.meta.env.VITE_API_GRAPHQLWS_URL);

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${import.meta.env.VITE_API_GRAPHQLWS_URL}/graphql`,
    connectionParams: () => {
      const token = store.getState().authentication.token;
      return {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      };
    },
    on: {
      connected: () => {
        console.log("WebSocket connection established");
      },
      closed: () => {
        console.log("WebSocket connection closed");
      },
      error: (error) => {
        console.error("WebSocket error:", error);
      },
    }
  })
)

const link = ApolloLink.from([errorLink, middleware, httpLink]);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  link
);

const cache = new InMemoryCache({});

export const client = new ApolloClient({
  link: splitLink,
  cache,
  connectToDevTools: true,
  defaultOptions: {
    query: {
      errorPolicy: "all",
      notifyOnNetworkStatusChange: true,
    },
  },
});
