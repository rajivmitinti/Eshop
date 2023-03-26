import {
  SET_PRODUCT,
  SET_USER,
  SET_CONFIRMED_PRODUCT,
  SET_PRODUCT_FOR_EDITING,
  SET_SEARCH_TEXT,
} from "../constants";

export const setUser = (data) => ({
  type: SET_USER,
  payload: data,
});

export const setProduct = (data) => ({
  type: SET_PRODUCT,
  payload: data,
});

export const setConfirmedProduct = (data) => ({
  type: SET_CONFIRMED_PRODUCT,
  payload: data,
});

export const setProductForEditing = (data) => ({
  type: SET_PRODUCT_FOR_EDITING,
  payload: data,
});

export const setSearchText = (data) => ({
  type: SET_SEARCH_TEXT,
  payload: data,
});
