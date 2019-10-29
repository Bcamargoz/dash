import {
  SHOW_LOADING,
  HIDE_LOADING,
} from './types';
import store from '../store';

export const getHeaders = () => ({
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${store.getState().auth.data.token}`
});

export const showLoading = () => async (dispatch) => {
  await dispatch({
    type: SHOW_LOADING,
  });
};

export const hideLoading = () => async (dispatch) => {
  await dispatch({
    type: HIDE_LOADING,
  });
};