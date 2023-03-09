import {configureStore} from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import metaSlice from "./meta-slice";
import recipesSlice from "./recipes-slice";

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        meta: metaSlice.reducer,
        recipes: recipesSlice.reducer
    }
});

export default store;
