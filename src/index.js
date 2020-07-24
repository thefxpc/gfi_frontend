import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./store/createStore";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

window.store = store;
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <App />
      </SnackbarProvider>
    </React.StrictMode>
  </Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
