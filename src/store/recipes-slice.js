import {createSlice} from "@reduxjs/toolkit";

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: {}
    },
    reducers: {
        addRecipe(state, action) {
            state.recipes[action.payload.recipe.id] = action.payload.recipe;
        }
    }
});


export const recipesActions = recipesSlice.actions;
export default recipesSlice;