import {
  TOOGLE_BAR,
  PENDING,
  SUCCESS,
  ERROR,
  FETCH_CAT_TIPO_METAL,
  FETCH_BANDAS,
} from "./actionTypes";

export function toogle_bar(open) {
  return {
    type: TOOGLE_BAR,
    open: !open,
  };
}

export function pending() {
  return {
    type: PENDING,
    pending: true,
  };
}

export function success() {
  return {
    type: SUCCESS,
    pending: false,
  };
}

export function trriggerError(log) {
  return {
    type: ERROR,
    error: true,
    log: log,
  };
}

export function fetchCatTiposMetal(cat_tipo_banda) {
  return {
    type: FETCH_CAT_TIPO_METAL,
    cat_tipo_banda: cat_tipo_banda,
  };
}

export function fetchBandasAction(bandas) {
  return {
    type: FETCH_BANDAS,
    bandas: bandas,
  };
}
