import {createSlice} from "@reduxjs/toolkit";

const metaSlice = createSlice({
    name: 'meta',
    initialState: {
        units: [],
        tags: []
    },
    reducers: {
        storeUnits(state, action) {
            state.units = action.payload.units;
        },
        storeTags(state, action) {
            state.tags = action.payload.tags;
        },
        addTag(state, action) {
            state.tags.push(action.payload.tag);
        },
        updateTag(state, action) {
            const updatedTag = action.payload.tag;
            for (const tag of state.tags) {
                if (tag.id === updatedTag.id) {
                    tag.description = updatedTag.description;
                    tag.name = updatedTag.name;
                }
            }
        },
        deleteTag(state, action) {
            const id = action.payload.id;
            state.tags = state.tags.filter(tag => tag.id !== id);
        }
    }
});


export const metaActions = metaSlice.actions;
export default metaSlice;