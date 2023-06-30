import {configureStore} from "@reduxjs/toolkit";
import auth from "./auth/authSlice";
import place from "./place/place.slice";

import {api} from "./api.js";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth,
        place
    },
    middleware:
            getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}).concat(api.middleware),
})
