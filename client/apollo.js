import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      console.error(`Graphql error ${message}`);
    });
  }
  if (networkError) {
    console.error(`Network error ${networkError}`);
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: `http://10.0.0.195:3002/graphql` }),
]);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

export default apolloClient;
