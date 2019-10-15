import React, { Fragment, useEffect } from "react";
import { get } from "lodash";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { useLogoutMutation, useMeQuery, User } from "../generated/graphql";
import { NullaryFn, UnaryFn } from "../utils/functionsTypes";
import { setAccessToken } from "../accessToken";
import {
  selectors as userSelectors,
  actions as userActions
} from "../store/user";
import { UserDetails } from "../store/user/types";

interface Props {
  setFullPageLoading: UnaryFn<boolean, void>;
  userDetails: UserDetails;
  isUserLogged: boolean;
  loadUser: UnaryFn<User, void>;
  logoutUser: NullaryFn<void>;
}

let body: any = null;

const handleLogoutUser = async (
  logout: NullaryFn<void>,
  logoutUser: NullaryFn<void>,
  setFullPageLoading: UnaryFn<boolean, void>
) => {
  setFullPageLoading(true); // TODO: This can be changed when a proper loading component is available
  await logout();
  setAccessToken("");
  logoutUser();
  setFullPageLoading(false);
};

const Header: React.FC<Props> = ({
  logoutUser,
  setFullPageLoading,
  loadUser,
  userDetails,
  isUserLogged
}) => {
  const [logout] = useLogoutMutation();
  const { data, loading } = useMeQuery();

  useEffect(() => {
    if (get(data, "me")) {
      loadUser(data!.me as User);
    }
  }, [data, loading, logout, loadUser]);

  if (loading) {
    body = <div>loading user details</div>;
  } else if (isUserLogged) {
    body = (
      <div>
        You are logged in as:
        <b>{get(userDetails, "email")}</b>-<span>{get(userDetails, "id")}</span>
        <br />
        <button
          onClick={() =>
            handleLogoutUser(logout, logoutUser, setFullPageLoading)
          }
        >
          Logout
        </button>
      </div>
    );
  } else {
    body = <div>You are logged out</div>;
  }

  return (
    <header>
      <Link to="/">Home</Link>
      {!isUserLogged && (
        <Fragment>
          &nbsp;
          <Link to="/login">Login</Link>
          &nbsp;
          <Link to="/registration">Register</Link>
        </Fragment>
      )}
      {body}
    </header>
  );
};

const mapStateToProps = (store: any) => ({
  userDetails: userSelectors.getUserDetails(store),
  isUserLogged: userSelectors.isLogged(store)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadUser: (user: User) => {
    dispatch(userActions.loadUserAction(user));
  },
  logoutUser: () => {
    dispatch(userActions.logoutUserAction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
