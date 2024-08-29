import {
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAIL,
    ADMIN_LOGOUT,
    ADMIN_DETAIL_REQUEST,
    ADMIN_DETAIL_SUCCESS,
    ADMIN_DETAIL_FAIL,
    ADMIN_DETAIL_RESET,
    ADMIN_UPDATE_REQUEST,
    ADMIN_UPDATE_SUCCESS,
    ADMIN_UPDATE_FAIL,
} from './adminConstants';

export const adminLoginReducer = ( state = {}, action ) => {
    switch(action.type){
        case ADMIN_LOGIN_REQUEST:
            return { loading: true };
        case ADMIN_LOGIN_SUCCESS:
            return { loading: false, adminInfo: action.payload };
        case ADMIN_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case ADMIN_LOGOUT:
            return {};
        default:
            return state;
    }
};

export const adminDetailsReducer = ( state = { admin: {} }, action ) => {
    switch(action.type){
        case ADMIN_DETAIL_REQUEST:
            return { ...state, loading: true };
        case ADMIN_DETAIL_SUCCESS:
            return { loading: false, admin: action.payload };
        case ADMIN_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        case ADMIN_DETAIL_RESET:
            return { admin: {} };
        default:
            return state;
    }
};

export const adminUpdateReducer = ( state = {}, action ) => {
    switch(action.type){
        case ADMIN_UPDATE_REQUEST:
            return { loading: true };
        case ADMIN_UPDATE_SUCCESS:
            return { loading: false, success: true ,  admin: action.payload };
        case ADMIN_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};