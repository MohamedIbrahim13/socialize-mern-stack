import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/root";
import thunk from "redux-thunk";

const configStore = () => {
  const middleware = [thunk.withExtraArgument()];
  const createStoreWithMiddleware = composeWithDevTools(
    applyMiddleware(...middleware)
  );
  const store = createStore(rootReducer, createStoreWithMiddleware);
  return store;
};
const store = configStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
