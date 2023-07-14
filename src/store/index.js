import {combineReducers, configureStore} from "@reduxjs/toolkit";
import api from "./api";
import {setupListeners} from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
});

export const setupStore = (preloadedState) => {
    const store = configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware),
    });

    // Set up listeners for automatic refetching and cache invalidation
    setupListeners(store.dispatch);

    return store;
};

export default api;
