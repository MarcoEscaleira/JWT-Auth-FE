import { NullaryFn } from "./functionsTypes";
import { setAccessToken } from "../accessToken";

export const handleLogoutUser = async (
  logout: NullaryFn<void>,
  logoutUser?: NullaryFn<void>
) => {
  // TODO: Add a loading here
  try {
    await logout();
    setAccessToken("");
    if (logoutUser) {
      logoutUser();
    }
  } catch (e) {
    console.log("Failed to logout user");
  }
};
