import { get } from "lodash";
import { State } from "./types";

export const getUser = (state: State) => get(state, "user", "");
export const getUserDetails = (state: State) =>
  get(state, "user.userDetails", "");
export const isLogged = (state: State) => get(state, "user.isLogged", "");
