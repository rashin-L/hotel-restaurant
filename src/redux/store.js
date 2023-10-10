import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'

import { galleryAPI } from "./services/hotel/galleryAPI";
import { registerAPI } from "./services/auth/registerAPI";
import { verifyAPI } from "./services/auth/verifyAPI";
import { loginAPI } from "./services/auth/loginAPI";
import { logoutAPI } from "./services/auth/logoutAPI";
import { roomAPI } from "./services/rooms/roomAPI";
import { foodAPI } from "./services/foods/foodAPI ";
import { foodTypesAPI } from "./services/foods/foodTypesAPI";
import { orderAPI } from "./services/foods/orderAPI";
import { reservationAPI } from "./services/rooms/reservationAPI";
import { userPnaelAPI } from "./services/userPnael/userPnaelAPI";

const store = configureStore({
    reducer:{
        [galleryAPI.reducerPath]: galleryAPI.reducer,
        [registerAPI.reducerPath]: registerAPI.reducer,
        [roomAPI.reducerPath]: roomAPI.reducer,
        [foodAPI.reducerPath]: foodAPI.reducer,
        [foodTypesAPI.reducerPath]: foodTypesAPI.reducer,
        [orderAPI.reducerPath]: orderAPI.reducer,
        [reservationAPI.reducerPath]: reservationAPI.reducer,
        [verifyAPI.reducerPath]: verifyAPI.reducer,
        [loginAPI.reducerPath]: loginAPI.reducer,
        [logoutAPI.reducerPath]: logoutAPI.reducer,
        [userPnaelAPI.reducerPath]: userPnaelAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        // getDefaultMiddleware().concat(listsAPI.middleware),
        getDefaultMiddleware()
        .concat(galleryAPI.middleware)
        .concat(registerAPI.middleware)
        .concat(roomAPI.middleware)
        .concat(foodAPI.middleware)
        .concat(foodTypesAPI.middleware)
        .concat(orderAPI.middleware)
        .concat(reservationAPI.middleware)
        .concat(verifyAPI.middleware)
        .concat(loginAPI.middleware)
        .concat(logoutAPI.middleware)
        .concat(userPnaelAPI.middleware)
})
setupListeners(store.dispatch)

export default store;