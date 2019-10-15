import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./rootReducer";

const reduxStore = (initialState?: {}) => {
  const enhancers = [applyMiddleware()];
  const composeEnhancers =
    process.env.NODE_ENV === "production"
      ? compose
      : (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(rootReducer, initialState, composeEnhancers(...enhancers));
};

export default reduxStore;
