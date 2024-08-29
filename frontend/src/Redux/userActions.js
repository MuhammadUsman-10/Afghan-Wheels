// src/redux/actions/authActions.js
import axios from 'axios';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    // USER_DETAIL_REQUEST,
    // USER_DETAIL_SUCCESS,
    // USER_DETAIL_FAIL,
    // USER_DETAIL_RESET,
    // USER_UPDATE_REQUEST,
    // USER_UPDATE_SUCCESS,
    // USER_UPDATE_FAIL,
} from './userConstants';



export const login = (email, password, loginUsingGmail = null) => async(dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const {data} = await axios.post('http://localhost:4000/api/signin', 
            { email,password, loginUsingGmail },
            config
        );
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
        // setuserInfo(data);
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem("isloggedIn");
    dispatch({ type: USER_LOGOUT });
    // dispatch({ type: USER_DETAIL_RESET });
    document.location.href = "/login";
};

// export const userDetails = () => async(dispatch, getState) => {
//     try {
//         dispatch({ type: USER_DETAIL_REQUEST });
//         const{ userLogin : { userInfo }, } = getState();

//         const config = {
//             headers: {
//                 Authorization: `Bearer ${userInfo.token}`,
//             },
//         };

//         const {data} = await axios.get('http://localhost:4000/api/users/profile',
//             config
//         );
//         dispatch({ type: USER_DETAIL_SUCCESS, payload: data });
//     } catch (error) {
//         const message =
//             error.response && error.response.data.message
//                 ? error.response.data.message
//                 : error.message;
//         if (message === 'Not authorized, token failed') {
//             dispatch(logout());
//         }
//         dispatch({
//             type: USER_DETAIL_FAIL,
//             payload: message,
//         });
//     }
// };

// export const userUpdate = (user) => async(dispatch, getState) => {
//     try {
//         dispatch({ type: USER_UPDATE_REQUEST });
//         const{ userInfo : {userInfo}, } = getState();

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${userInfo.token}`,
//             },
//         };

//         const {data} = await axios.put('http://localhost:4000/api/users/profile',
//             user, config
//         );
//         dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
//         localStorage.setItem('userInfo', JSON.stringify(data));
//     } catch (error) {
//         const message =
//             error.response && error.response.data.message
//                 ? error.response.data.message
//                 : error.message;
//         if (message === 'Not authorized, token failed') {
//             dispatch(logout());
//         }
//         dispatch({
//             type: USER_UPDATE_FAIL,
//             payload: message,
//         });
//     }
// };