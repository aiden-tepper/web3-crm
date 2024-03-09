import { useUser, useAuth } from "@thirdweb-dev/react";
import { useCallback, useMemo } from "react";

export function useAuthFromThirdweb() {
  // const { isLoading, isAuthenticated, getToken } = useAuth();
  const { user, isLoggedIn, isLoading } = useUser();

  const auth = useAuth();

  const fetchAccessToken = useCallback(
    async () => {
      // Here you can do whatever transformation to get the ID Token
      // or null
      // Make sure to fetch a new token when `forceRefreshToken` is true
      // return await getToken({ ignoreCache: forceRefreshToken });
      return user;
    },
    // If `getToken` isn't correctly memoized
    // remove it from this dependency array
    [user]
  );
  return useMemo(
    () => ({
      // Whether the auth provider is in a loading state
      isLoading: isLoading,
      // Whether the auth provider has the user signed in
      isAuthenticated: isLoggedIn ?? false,
      // The async function to fetch the ID token
      fetchAccessToken,
    }),
    [isLoading, isAuthenticated, fetchAccessToken]
  );
}
