import { userDetailsReducer, userLoginReducer, userUpdateReducer } from "./userReducer";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

export const reducer = combineReducers({
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateReducer,
})

const userinfoFromlocalStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')) 
    :null;

const initialState = {
    userLogin:{user: userinfoFromlocalStorage},
}

const store = configureStore({
    reducer:{
        userLogin: userLoginReducer,
        userDetails: userDetailsReducer,
        userUpdateProfile: userUpdateReducer
    },
    preloadedState:  initialState ,
});

export default store;