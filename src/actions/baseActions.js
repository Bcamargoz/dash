import {
  SHOW_LOADING,
  HIDE_LOADING,
} from './types';
import store from '../store';
import config from '../vars/config';
import AsyncStorage from '@react-native-community/async-storage';

export const getHeaders = () => ({
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${store.getState().auth.data.token}`
});

export const getHeadersBeta = async () => {
  let data = await AsyncStorage.getItem(`${config.KEY_STORAGE}loginBeta`);
  const api_auth = JSON.parse(data);
  return {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${api_auth.token}`
  }
};

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