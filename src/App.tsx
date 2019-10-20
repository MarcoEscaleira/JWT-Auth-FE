import React from "react";
import { Provider } from "react-redux";
import "normalize.css";

import "./styles/reset.css";
import store from "./store";
import Routes from "./Routes";

const App: React.FC = () => (
  <Provider store={store()}>
    <Routes />
  </Provider>
);

export default App;
