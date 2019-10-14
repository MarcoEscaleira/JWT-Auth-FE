import React, { Fragment } from 'react';
import { get } from 'lodash';
import { Link } from "react-router-dom";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { setAccessToken } from "../accessToken";
import client from "../apolloSetup";

const Header: React.FC = () => {
  // This is redundant when redux is available
  const { data, loading } = useMeQuery();
  const [ logout ] = useLogoutMutation();
  let body: any = null;
  
  if (loading) {
    body = null;
  } else if (data && data.me) {
    body = (
      <div>
        You are logged in as:
        <b>{data.me.email}</b>
        -
        <span>{data.me.id}</span>
        <br />
        <button onClick={async () => {
          await logout();
          setAccessToken("");
          // TODO: reset the store here
          await client!.resetStore();
        }}>
          Logout
        </button>
      </div>
    );
  } else {
    body = <div>not logged in</div>
  }
  
  return (
    <header>
      <Link to="/">Home</Link>
      {!get(data, "me") && (
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

export default Header;
