import { baseURL } from "./url";
import {
  pending,
  success,
  trriggerError,
  fetchCatTiposMetal,
} from "../actions/uiActions";

export function fetchCatTipoMetal() {
  return (dispatch) => {
    dispatch(pending());
    fetch(baseURL + "/catTipoMetal")
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchCatTiposMetal(res));
        dispatch(success());
        return res;
      })
      .catch((error) => {
        dispatch(trriggerError(error));
      });
  };
}
