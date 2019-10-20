import { setAccessToken } from "../accessToken";
import { UnaryFn } from "./functionsTypes";
import { refreshAccessToken } from "../requests/login";

export const refreshUserAccessToken = (
  setLoading: UnaryFn<boolean, void>
): void => {
  refreshAccessToken().then(async result => {
    const { accessToken, ok } = await result.json();
    try {
      if (ok && ok === true && accessToken) {
        setAccessToken(accessToken);
      }
    } catch (err) {
      console.error("Refreshing Token: ", err);
    }
    setLoading(false);
  });
};
