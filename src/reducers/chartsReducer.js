import * as actions from '../actions/types';

const preloadedState = {
    salesXhour: [],
    paymentsMethodsOfday: [],
    weeklyTrends: [],
    mostSoldCategories: [],
    mostSelledProducts: [],
    averageAtention: [],
    dishesSoldPerday: [],
    lastSevenDays: [],
    deliveries: [],
    warehouse: {
        amount: 0,
        cost: 0,
        daily_goal: 0,
        invoices: 0,
        profits: 0,
    },
    warehouses: [],
    infoWarehouse: {},
    salesHistory: []
};

export default (state = preloadedState, { type, payload }) => {
    switch (type) {
        case actions.GET_ALL_DATA:
            return {
                ...state,
                salesXhour: payload.salesXhour,
                paymentsMethodsOfday: payload.paymentsMethodsOfday,
                weeklyTrends: payload.weeklyTrends,
                mostSoldCategories: payload.mostSoldCategories,
                mostSelledProducts: payload.mostSelledProducts,
                averageAtention: payload.averageAtention,
                dishesSoldPerday: payload.dishesSoldPerday,
                lastSevenDays: payload.lastSevenDays,
                deliveries: payload.deliveries,
                warehouse: payload.warehouse,
                warehouses: payload.warehouses,
                infoWarehouse: payload.infoWarehouse
            };
        case actions.GET_AVERAGE_ATENTION:
            return {
                ...state,
                averageAtention: payload,
            };
        case actions.GET_DELIVERIES:
            return {
                ...state,
                deliveries: payload,
            };
        case actions.GET_DISHES_X_DAY:
            return {
                ...state,
                dishesSoldPerday: payload,
            };
        case actions.GET_LAST_SEVEN_DAYS:
            return {
                ...state,
                lastSevenDays: payload,
            };
        case actions.GET_MOST_SELLED_PRODUCTS:
            return {
                ...state,
                mostSelledProducts: payload,
            };
        case actions.GET_MOST_SOLD_CATEGORIES:
            return {
                ...state,
                mostSoldCategories: payload,
            };
        case actions.GET_PAYMENTS_METHODS_OF_DAY:
            return {
                ...state,
                paymentsMethodsOfday: payload,
            };
        case actions.GET_SALES_X_HOUR:
            return {
                ...state,
                salesXhour: payload,
            };
        case actions.GET_WAREHOUSE:
            return {
                ...state,
                warehouse: payload,
            };
        case actions.GET_WEEKLY_TRENDS:
            return {
                ...state,
                weeklyTrends: payload,
            };
        case actions.GET_WAREHOUSES:
            return {
                ...state,
                warehouses: payload,
            };
        case actions.GET_INFO_WAREHOUSE:
            return {
                ...state,
                infoWarehouse: payload,
            };
        case actions.GET_SALES_HISTORY:
            return {
                ...state,
                salesHistory: payload,
            }
        default:
            return state;
    }
};