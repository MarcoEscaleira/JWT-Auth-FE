import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { refreshUserAccessToken } from "./utils/userAccessToken";

const Routes: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshUserAccessToken(setLoading);
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <BrowserRouter>
      <Fragment>
        <Header setFullPageLoading={setLoading} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/registration" component={Register} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
};

export default Routes;
