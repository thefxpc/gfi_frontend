import React from "react";
import { baseURL } from "./url";
import {
  enqueueSnackbar as enqueueSnackbarAction,
  closeSnackbar as closeSnackbarAction,
} from "../actions/notificationActions";
import Button from "@material-ui/core/Button";
import { fetchBandas } from "./fetchBandas";

function deleteBanda(data) {
  return (dispatch) => {
    const enqueueSnackbar = (...args) =>
      dispatch(enqueueSnackbarAction(...args));
    const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));
    console.log(data);
    fetch(baseURL + "/banda/" + data, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchBandas());
        enqueueSnackbar({
          message: res.message,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success",
            action: (key) => (
              <Button onClick={() => closeSnackbar(key)}>X</Button>
            ),
          },
        });
      })
      .catch((error) => {
        enqueueSnackbar({
          message: error,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "error",
            action: (key) => (
              <Button onClick={() => closeSnackbar(key)}>X</Button>
            ),
          },
        });
      });
  };
}
export default deleteBanda;
