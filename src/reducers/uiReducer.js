import initialState from "./initialState";
import {
  TOOGLE_BAR,
  FETCH_BANDAS,
  PENDING,
  SUCCESS,
  ERROR,
  FETCH_CAT_TIPO_METAL,
} from "../actions/actionTypes";

export default function uiReducer(state = initialState.ui, action) {
  switch (action.type) {
    case TOOGLE_BAR: {
      return {
        ...state,
        open: action.open,
      };
    }
    case PENDING: {
      return {
        ...state,
        pending: action.pending,
      };
    }

    case SUCCESS: {
      return {
        ...state,
        pending: action.pending,
      };
    }

    case ERROR: {
      return {
        ...state,
        error: action.error,
        log: action.log,
      };
    }

    case FETCH_CAT_TIPO_METAL: {
      return {
        ...state,
        cat_tipo_banda: action.cat_tipo_banda,
      };
    }
    case FETCH_BANDAS: {
      return {
        ...state,
        bandas: action.bandas,
      };
    }

    default:
      return state;
  }
}
