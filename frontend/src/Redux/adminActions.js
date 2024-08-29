// src/redux/actions/authActions.js
import axios from 'axios';
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


export const adminlogin = (email, password) => async(dispatch) => {
    try {
        dispatch({ type: ADMIN_LOGIN_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const {data} = await axios.post('http://localhost:4000/api/admin/signin', 
            { email,password },
            config
        );
        dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });
        localStorage.setItem('adminInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: ADMIN_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('adminInfo');
    dispatch({ type: ADMIN_LOGOUT });
    dispatch({ type: ADMIN_DETAIL_RESET });
    window.location.href = "http://localhost:3000/admin/login";
};

export const adminDetails = () => async(dispatch, getState) => {
    try {
        dispatch({ type: ADMIN_DETAIL_REQUEST });
        const{ adminLogin : { adminInfo }, } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${adminInfo.token}`,
            },
        };

        const {data} = await axios.get('http://localhost:4000/api/admin/profile',
            config
        );
        dispatch({ type: ADMIN_DETAIL_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: ADMIN_DETAIL_FAIL,
            payload: message,
        });
    }
};

export const adminUpdate = (admin) => async(dispatch, getState) => {
    try {
        dispatch({ type: ADMIN_UPDATE_REQUEST });
        const{ adminLogin : {adminInfo}, } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`,
            },
        };

        const {data} = await axios.put('http://localhost:4000/api/admin/profile',
            admin, config
        );
        dispatch({ type: ADMIN_UPDATE_SUCCESS, payload: data });
        localStorage.setItem('adminInfo', JSON.stringify(data));
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: ADMIN_UPDATE_FAIL,
            payload: message,
        });
    }
};