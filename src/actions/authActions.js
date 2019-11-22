import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { hideLoading, showLoading } from './baseActions';
import { LOGIN, LOGOUT, LOADING } from './types';
import MixpanelService from '../services/MixpanelService';
import RouterService from '../services/RouterService';
import store from '../store';
import config from '../vars/config';
import firebase from "react-native-firebase";

const clearStorage = async () => {
    await AsyncStorage.clear();
}

export const getLogin = () => async (dispatch) => {
    try {
        let data = await AsyncStorage.getItem(`${config.KEY_STORAGE}login`);
        data = JSON.parse(data);

        if (data) {
            await dispatch(validateLogin(data));
        } else {
            await clearStorage();
        }

        await dispatch({
            type: LOADING,
            payload: false
        })
    } catch (e) {
        //
    }
}

export const getLoginData = () => async (dispatch) => {
    try {
        let data = await AsyncStorage.getItem(`${config.KEY_STORAGE}login`);
        return JSON.parse(data);
    } catch (e) {
        //
    }
}

export const getLoginBetaData = () => async (dispatch) => {
    try {
        let data = await AsyncStorage.getItem(`${config.KEY_STORAGE}loginBeta`);
        return JSON.parse(data);
    } catch (e) {
        //
    }
}

export const login = data => async (dispatch) => {
    if (store.getState().network.isConnected) {
        await dispatch(showLoading());

        await axios.post(`${config.BASE_URL}/login`, data)
            .then(function ({ data, headers }) {
                dispatch(validateLogin(data, headers.date));
            })
            .catch(function (error) {
                const { data, status } = error.response;
                const type = 'danger';
                let message = '';

                if (status === 401 || status === 422) {
                    message = (data.code === 'SUBSCRIPTION-EXPIRED')
                        ? 'Su suscripción ha vencido. Por favor renuévela desde nuestro sitio web'
                        : 'Correo electronico y/o contraseña incorrectas';
                } else {
                    message = 'Error al intentar iniciar sesión';
                }

                showMessage({
                    message,
                    type,
                });
            })
            .finally(function () {
                dispatch(hideLoading());
            });
    } else {
        showMessage({
            message: 'No hay conexion a internet',
            type: 'danger',
        });
    }
};

export const loginBeta = data => async (dispatch) => {
    if (store.getState().network.isConnected) {
        //await dispatch(showLoading());
        await axios.post(`${config.BASE_BETA_URL}/login`, data)
            .then(async function ({ data, headers }) {
                await AsyncStorage.setItem(`${config.KEY_STORAGE}loginBeta`, JSON.stringify(data));
            })
            .catch(function (error) {
               console.warn('error aqui',error)
            })
            .finally(function () {
                //dispatch(hideLoading());
            });
    } else {
        showMessage({
            message: 'No hay conexion a internet',
            type: 'danger',
        });
    }
};

export const logout = () => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: false
    })

    dispatch(showLoading());

    clearStorage();

    dispatch({
        type: LOGOUT,
    });

    dispatch(hideLoading());
};

const setLogin = async (data) => {
    try {
        await AsyncStorage.setItem(`${config.KEY_STORAGE}login`, JSON.stringify(data));
    } catch (e) {
        //
    }
}

const validateLicense = (expired_at, date) => {
    date = date ? new Date(date) : new Date(Date.now());
    expired_at = new Date(expired_at);

    const differenceInTime = expired_at.getTime() - date.getTime();
    const days = Math.floor(differenceInTime / (1000 * 3600 * 24));
    let license = true;
    let message;
    let type = 'warning';

    if (days < 0) {
        license = false;
        message = 'Su suscripción ha vencido. Por favor renuévela desde nuestro sitio web';
        type = 'danger';
    } else if (days === 0) {
        message = 'Su licencia vencera mañana';
    } else if (days === 1) {
        message = 'Su licencia vencera en 1 dia';
    } else if (days < 8) {
        message = `Su licencia vencera en ${days} dias`;
    }

    if (message) {
        showMessage({
            message,
            type,
        });
    }

    return license;
}

const validateLogin = (data, date) => async (dispatch) => {
    const { license } = data;

    if (validateLicense(license.expired_at, date)) {
        await setLogin(data);
        MixpanelService.track('Login');
        const initial = await firebase.notifications().getInitialNotification();
        dispatch({
            type: LOGIN,
            payload: data
        });
        
        if(initial) {
            RouterService.navigate('SalesHistory');
        } else {
            RouterService.navigate('Home');
        }  
    } else {
        clearStorage();
    }
}