// types
import {
    LOGOUT,
    LOGIN
} from '../actions/types';

const preloadedState = {
    data: {},
    isAuthenticated: false
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

        default:
            return state;
    }
};