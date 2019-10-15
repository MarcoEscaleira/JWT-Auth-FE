import { State, Action } from "./types";

export const defaultUserReducer: State = {
  userDetails: {
    id: null,
    email: "",
    username: ""
  },
  isLogged: false
};

export const userReducer = (
  state: State = defaultUserReducer,
  action: Action
) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          ...action.payload!.userDetails
        },
        isLogged: true
      };
    case "LOAD_USER":
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          ...action.payload!.userDetails
        },
        isLogged: true
      };
    case "LOGOUT_USER":
      return defaultUserReducer;
    default:
      return state;
  }
};

export default userReducer;
