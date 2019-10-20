import React, { Fragment, useEffect } from "react";
import { get, noop } from "lodash";
import { NavLink } from "react-router-dom";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { useLogoutMutation, useMeQuery, User } from "../../generated/graphql";
import { NullaryFn, UnaryFn } from "../../utils/functionsTypes";
import { setAccessToken } from "../../accessToken";
import {
  selectors as userSelectors,
  actions as userActions
} from "../../store/user";
import { UserDetails } from "../../store/user/types";
import {
  activeNavLink,
  Container,
  LogoWrapper,
  MenuContainer,
  MenuWrapper,
  UserContainer
} from "./styled-components";
import logo from "../../assets/icon.png";

interface Props {
  userDetails: UserDetails;
  isUserLogged: boolean;
  loadUser: UnaryFn<User, void>;
  logoutUser: NullaryFn<void>;
}

let body: any = null;

const handleLogoutUser = async (
  logout: NullaryFn<void>,
  logoutUser: NullaryFn<void>
) => {
  // TODO: Add a loading here
  await logout();
  setAccessToken("");
  logoutUser();
};

const Header: React.FC<Props> = ({
  logoutUser,
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
  }, [data, loading, loadUser]);

  if (loading) {
    body = <div>loading user details</div>;
  } else if (isUserLogged) {
    body = (
      <div>
        Hello:
        <b>{get(userDetails, "email")}</b>-<span>{get(userDetails, "id")}</span>
        <button onClick={() => handleLogoutUser(logout, logoutUser)}>
          Logout
        </button>
      </div>
    );
  } else {
    body = <div>Hello stranger...</div>;
  }

  return (
    <Container>
      <MenuContainer>
        <LogoWrapper>
          <img src={logo} alt="logo" width="100%" />
        </LogoWrapper>
        <MenuWrapper>
          <NavLink exact to="/" activeStyle={activeNavLink}>
            Home
          </NavLink>
          {!isUserLogged && (
            <Fragment>
              &nbsp;
              <NavLink to="/login" activeStyle={activeNavLink}>
                Login
              </NavLink>
              &nbsp;
              <NavLink to="/registration" activeStyle={activeNavLink}>
                Register
              </NavLink>
            </Fragment>
          )}
        </MenuWrapper>
      </MenuContainer>
      <UserContainer>{body}</UserContainer>
    </Container>
  );
};

Header.defaultProps = {
  userDetails: {
    id: null,
    email: "",
    username: ""
  },
  isUserLogged: false,
  loadUser: noop,
  logoutUser: noop
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
