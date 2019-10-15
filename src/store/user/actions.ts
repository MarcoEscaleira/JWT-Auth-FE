import { User } from "../../generated/graphql";

export const loginUserAction = (user: User) => ({
  type: "LOGIN_USER",
  payload: {
    userDetails: user
  }
});

export const loadUserAction = (user: User) => ({
  type: "LOAD_USER",
  payload: {
    userDetails: user
  }
});

export const logoutUserAction = () => ({
  type: "LOGOUT_USER"
});
