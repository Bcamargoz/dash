import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';
import * as actions from './types';
import MixpanelService from '../services/MixpanelService';
import RouterService from '../services/RouterService';
import store from '../store';
import config from '../vars/config';
import { getHeaders } from '../actions/baseActions';

const clearStorage = async () => {
    await AsyncStorage.clear();
}

export const getAllData = data => async (dispatch) => {
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

export const getSalesXhour = data => async (dispatch) => {
    if (store.getState().network.isConnected) {
        //await dispatch(showLoading());

        await axios.get(`${config.BASE_URL}/dashboard/sales-per-hour/${data}`,{
                headers: getHeaders(),
            })
            .then(function ({ data, headers }) {
                dispatch({
                    type: actions.GET_SALES_X_HOUR,
                    payload: data
                });

            })
            .catch(function (error) {
                console.warn(error);
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
                //dispatch(hideLoading());
            });
    } else {
        showMessage({
            message: 'No hay conexion a internet',
            type: 'danger',
        });
    }
};

export const getWarehouses = data => async (dispatch) => {
    if (store.getState().network.isConnected) {
        //await dispatch(showLoading());

        await axios.get(`${config.BASE_URL}/warehouses`,{
                headers: getHeaders(),
            })
            .then(function ({ data, headers }) {
                dispatch({
                    type: actions.GET_WAREHOUSES,
                    payload: data.data
                });

            })
            .catch(function (error) {
                console.warn(error);
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
                //dispatch(hideLoading());
            });
    } else {
        showMessage({
            message: 'No hay conexion a internet',
            type: 'danger',
        });
    }
};

export const getInfoWarehouses = (data, day = 7) => async (dispatch) => {
    if (store.getState().network.isConnected) {
        //await dispatch(showLoading());

        await axios.get(`${config.BASE_URL}/dashboard/info/warehouse/${data}/${day}`,{
                headers: getHeaders(),
            })
            .then(function ({ data, headers }) {
                dispatch({
                    type: actions.GET_INFO_WAREHOUSE,
                    payload: data
                });

            })
            .catch(function (error) {
                console.warn(error);
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
                //dispatch(hideLoading());
            });
    } else {
        showMessage({
            message: 'No hay conexion a internet',
            type: 'danger',
        });
    }
};

export const getPaymentsMethodsOfday = data => async (dispatch) => {
    if (store.getState().network.isConnected) {
        //await dispatch(showLoading());

        await axios.get(`${config.BASE_URL}/dashboard/payment-methods-of-day/${data}`,{
                headers: getHeaders(),
            })
            .then(function ({ data, headers }) {
                dispatch({
                    type: actions.GET_PAYMENTS_METHODS_OF_DAY,
                    payload: data
                });
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
               // dispatch(hideLoading());
            });
    } else {
        showMessage({
            message: 'No hay conexion a internet',
            type: 'danger',
        });
    }
};

export const getWeeklyTrends = data => async (dispatch) => {
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

export const getMostSoldCategories = data => async (dispatch) => {
    if (store.getState().network.isConnected) {
        //await dispatch(showLoading());

        await axios.get(`${config.BASE_URL}/dashboard/most-sold-categories/${data}`,{
                headers: getHeaders(),
            })
            .then(function ({ data, headers }) {
                dispatch({
                    type: actions.GET_MOST_SOLD_CATEGORIES,
                    payload: data
                });

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
               // dispatch(hideLoading());
            });
    } else {
        showMessage({
            message: 'No hay conexion a internet',
            type: 'danger',
        });
    }
};

export const getMostSelledProducts = data => async (dispatch) => {
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

export const getAverageAtention = data => async (dispatch) => {
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

export const getDishesSoldPerday = data => async (dispatch) => {
    if (store.getState().network.isConnected) {
        //await dispatch(showLoading());

        await axios.get(`${config.BASE_URL}/dashboard/dishes-sold-per-day/${data}`,{
                headers: getHeaders(),
            })
            .then(function ({ data, headers }) {
                dispatch({
                    type: actions.GET_DISHES_X_DAY,
                    payload: data
                });
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
                //dispatch(hideLoading());
            });
    } else {
        showMessage({
            message: 'No hay conexion a internet',
            type: 'danger',
        });
    }
};

export const getLastSevenDays = data => async (dispatch) => {
    if (store.getState().network.isConnected) {
        //await dispatch(showLoading());

        await axios.get(`${config.BASE_URL}/dashboard/last-seven-days/${data}`,{
                headers: getHeaders(),
            })
            .then(function ({ data, headers }) {
                dispatch({
                    type: actions.GET_LAST_SEVEN_DAYS,
                    payload: data
                });
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
                //dispatch(hideLoading());
            });
    } else {
        showMessage({
            message: 'No hay conexion a internet',
            type: 'danger',
        });
    }
};

export const getDeliveries = data => async (dispatch) => {
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

export const getWarehouse = data => async (dispatch) => {
    if (store.getState().network.isConnected) {
        //await dispatch(showLoading());

        await axios.get(`${config.BASE_URL}/dashboard/info/warehouse/${data}`,{
                headers: getHeaders(),
            })
            .then(function ({ data, headers }) {
                dispatch({
                    type: actions.GET_WAREHOUSE,
                    payload: data
                });
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
                //dispatch(hideLoading());
            });
    } else {
        showMessage({
            message: 'No hay conexion a internet',
            type: 'danger',
        });
    }
};



const logout = () => async (dispatch) => {
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
        setLogin(data);

        dispatch({
            type: LOGIN,
            payload: data
        });

        MixpanelService.track('Login');

        RouterService.navigate('Home');
    } else {
        clearStorage();
    }
}