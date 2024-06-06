import {configureStore} from "@reduxjs/toolkit";
import registerApi from "./registerApi.js";

const store = configureStore({
    reducer:{
        [registerApi.reducerPath]:registerApi.reducer
    },
    middleware:getDefaultMiddleware => 
        getDefaultMiddleware().concat(
            registerApi.middleware
        )
});

export default store;