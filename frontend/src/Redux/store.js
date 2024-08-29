// import { userDetailsReducer, userLoginReducer, userUpdateReducer } from "./userReducer";
import { userLoginReducer } from "./userReducer";
import { adminDetailsReducer, adminLoginReducer, adminUpdateReducer } from "./adminReducer";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

export const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    // userDetails: userDetailsReducer,
    // userUpdateProfile: userUpdateReducer,
    adminLogin: adminLoginReducer,
    adminDetails: adminDetailsReducer,
    adminUpdateProfile: adminUpdateReducer,
})

// const persistConfig = {
//     key: "root",
//     storage,
//     whitelist: ['userLogin'],
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const userinfoFromlocalStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')) 
    :null;

const admininfoFromlocalStorage = localStorage.getItem('admin')
    ? JSON.parse(localStorage.getItem('admin')) 
    :null;

const initialState = {
    userLogin:{user: userinfoFromlocalStorage},
    adminLogin:{admin: admininfoFromlocalStorage}
}

const store = configureStore({
    reducer:{
        // reducer: persistedReducer,
        userLogin: userLoginReducer,
        // userDetails: userDetailsReducer,
        // userUpdateProfile: userUpdateReducer,
        adminLogin: adminLoginReducer,
        adminDetails: adminDetailsReducer,
        adminUpdateProfile: adminUpdateReducer,
    },
    preloadedState:  initialState ,
});

export default store;

// src/store/userStore.js

// import create from 'zustand';
// import axios from 'axios';

// const Store = create((set) => ({
//     userInfo: null,
//     errorMessage: '',
//     successMessage: '',
    
//     // Action to set user info
//     setUserInfo: (userInfo) => set({ userInfo }),
    
//     // Action to login user
//     login: async (email, password, loginUsingGmail = null) => {
//         try {
//         const response = await axios.post('http://localhost:4000/api/signin', {
//             email,
//             password,
//             loginUsingGmail
//         });
//         set({ userInfo: response.data, errorMessage: '', successMessage: 'Logged in successfully' });
//         localStorage.setItem('userInfo', JSON.stringify(response.data));
//         } catch (error) {
//         const errorMsg = error.response && error.response.data.error
//             ? error.response.data.error
//             : 'Error logging in';
//         set({ errorMessage: errorMsg, successMessage: '' });
//         }
//     },
    
//     // Action to logout user
//     logout: () => {
//         axios.post('http://localhost:4000/api/logout', {})
//         .then(() => {
//             set({ userInfo: null, errorMessage: '', successMessage: 'Logged out successfully' });
//             localStorage.removeItem('userInfo');
//         })
//         .catch((error) => {
//             set({ errorMessage: 'Error logging out', successMessage: '' });
//         });
//     },

//   // Action to check user session
//     checkUserSession: async () => {
//         try {
//         const { data } = await axios.get('http://localhost:4000/api/user');
//         set({ userInfo: data });
//         localStorage.setItem('userInfo', JSON.stringify(data));
//         } catch (error) {
//         console.error('Error restoring user session:', error);
//         set({ userInfo: null });
//         localStorage.removeItem('userInfo');
//         }
//     }
// }));

// export default Store;
