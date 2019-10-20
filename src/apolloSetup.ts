import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, Observable } from "apollo-link";
import { ApolloClient } from "apollo-client";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";

import { GRAPHQL_URL } from "./constants/hosts";
import { getAccessToken, setAccessToken } from "./accessToken";
import { refreshAccessToken } from "./requests/login";

const cache = new InMemoryCache();

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle: any;
      Promise.resolve(operation)
        .then(operation => {
          const accessToken = getAccessToken();
          if (accessToken) {
            operation.setContext({
              headers: {
                authorization: `bearer ${accessToken}`
              }
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: "accessToken",
      isTokenValidOrUndefined: () => {
        const token = getAccessToken();
        if (!token) {
          return true;
        }
        try {
          const { exp } = jwtDecode(token);
          return Date.now() >= exp * 1000 ? false : true;
        } catch (err) {
          return false;
        }
      },
      fetchAccessToken: () => refreshAccessToken(),
      handleFetch: accessToken => {
        setAccessToken(accessToken);
      },
      handleError: err => {
        /* NOTE:
         * The code will enter here whenever the refreshAccessToken request fails.
         * Another thing is that on our server the endpoint to refresh user token
         *   is not throwing an actual error besides an empty accessToken.
         * So the code will only get here if for example the server is down
         */
        console.warn("Your refresh token is invalid. Try to relogin");
        console.error(err);
      }
    }),
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        // sendToLoggingService(graphQLErrors);
        // TODO: Send user to do login
      }
      if (networkError) {
        // logoutUser();
        // TODO: Logout the user
      }
      console.log(graphQLErrors);
      console.log(networkError);
    }),
    requestLink,
    new HttpLink({
      uri: GRAPHQL_URL,
      credentials: "include"
    })
  ]),
  cache
});

export default client;
