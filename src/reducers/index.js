import { combineReducers } from 'redux';
import { reducer as networkReducer } from 'react-native-offline';
import authReducer from './authReducer';
import baseReducer from './baseReducer';
import chartReducer from './chartsReducer';

export default combineReducers({
  auth: authReducer,
  base: baseReducer,
  chart: chartReducer,
  network: networkReducer
});