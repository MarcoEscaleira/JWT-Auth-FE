export const LOGIN_USER = "LOGIN_USER";
export const LOAD_USER = "LOAD_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export type ActionTypes = "LOGIN_USER" | "LOAD_USER" | "LOGOUT_USER";

export interface UserDetails {
  id: number | null;
  email: string;
  username: string;
}

export interface State {
  userDetails: UserDetails;
  isLogged: boolean;
}

export interface Action {
  type: ActionTypes;
  payload?: {
    userDetails?: {};
    isLogged?: boolean;
  };
}
