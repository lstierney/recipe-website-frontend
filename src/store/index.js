import {configureStore} from "@reduxjs/toolkit";
import metaSlice from "./meta-slice";
import recipesSlice from "./recipes-slice";

const store = configureStore({
    reducer: {
        meta: metaSlice.reducer,
        recipes: recipesSlice.reducer
    }
});

export default store;
