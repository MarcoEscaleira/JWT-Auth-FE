import { User } from "../../generated/graphql";
import { Action } from "./types";

export const loginUserAction = (user: User): Action => ({
  type: "LOGIN_USER",
  payload: {
    userDetails: user
  }
});

export const loadUserAction = (user: User): Action => ({
  type: "LOAD_USER",
  payload: {
    userDetails: user
  }
});

export const logoutUserAction = (): Action => ({
  type: "LOGOUT_USER"
});
