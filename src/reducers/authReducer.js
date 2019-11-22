// types
import {
    LOGOUT,
    LOGIN,
    LOADING
} from '../actions/types';

const preloadedState = {
    data: {},
    isAuthenticated: false,
    loading: true
};

export default (state = preloadedState, { payload, type }) => {
    switch (type) {
        case LOGIN:
            return {
                data: payload,
                isAuthenticated: true
            };
        case LOGOUT:
            return preloadedState;
        case LOADING:
            return {
                ...state,
                loading: payload
            }

        default:
            return state;
    }
};