import { baseURL } from "./url";
import {
  pending,
  success,
  trriggerError,
  fetchBandasAction,
} from "../actions/uiActions";

export function fetchBandas() {
  return (dispatch) => {
    dispatch(pending());
    fetch(baseURL + "/banda")
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchBandasAction(res));
        dispatch(success());
        return res;
      })
      .catch((error) => {
        dispatch(trriggerError(error));
      });
  };
}
