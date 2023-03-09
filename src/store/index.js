import {configureStore} from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import metaSlice from "./meta-slice";

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        meta: metaSlice.reducer
    }
});

export default store;
