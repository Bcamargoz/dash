import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';
import * as actions from './types';
import store from '../store';
import config from '../vars/config';
import { getHeaders, getHeadersBeta } from '../actions/baseActions';

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
                console.warn('Salesx hour', error);
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
                console.warn('Get warehouses', error);
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
                console.warn('InfoWarehouse', error);
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
        //await dispatch(showLoading());

        await axios.get(`${config.BASE_URL}/dashboard/most-selled-products/${data}`,{
                headers: getHeaders(),
            })
            .then(function ({ data, headers }) {
                dispatch({
                    type: actions.GET_MOST_SELLED_PRODUCTS,
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

export const getAverageAtention = data => async (dispatch) => {
    if (store.getState().network.isConnected) {
        //await dispatch(showLoading());

        await axios.get(`${config.BASE_URL}/dashboard/average-attention/${data}`,{
                headers: getHeaders(),
            })
            .then(function ({ data, headers }) {
                dispatch({
                    type: actions.GET_AVERAGE_ATENTION,
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
        //await dispatch(showLoading());

        await axios.get(`${config.BASE_URL}/dashboard/domicilies/${data}`,{
            headers: getHeaders(),
        })
            .then(function ({ data, headers }) {
                console.log('aqui', data);
                dispatch({
                    type: actions.GET_DELIVERIES,
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

export const getSalesHistory = data => async (dispatch) => {
    if (store.getState().network.isConnected) {
        //await dispatch(showLoading());s
        await axios.post(`${config.BASE_URL}/saleshistory`, data , {
                headers: await getHeaders(),
            })
            .then(function ({ data, headers }) {
                dispatch({
                    type: actions.GET_SALES_HISTORY,
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

export const setIntervalRequest = data => async (dispatch) => {
    dispatch({
        type: "SET_INTERVAL",
        payload: data
    })
};
