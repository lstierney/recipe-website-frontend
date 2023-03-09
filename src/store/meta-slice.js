import {createSlice} from "@reduxjs/toolkit";

const metaSlice = createSlice({
    name: 'meta',
    initialState: {
        units: []
    },
    reducers: {
        storeUnits(state, action) {
            state.units = action.payload.units;
        }
    }
});


export const metaActions = metaSlice.actions;
export default metaSlice;