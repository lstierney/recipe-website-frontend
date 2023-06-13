import {combineReducers, configureStore} from "@reduxjs/toolkit";
import metaSlice from "./meta-slice";
import recipesSlice from "./recipes-slice";

const rootReducer = combineReducers({
    meta: metaSlice.reducer,
    recipes: recipesSlice.reducer
})

export const setupStore = preloadedState => {
    return configureStore({
        reducer: rootReducer,
        preloadedState

    });
}
