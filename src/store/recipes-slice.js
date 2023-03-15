import {createSlice} from "@reduxjs/toolkit";

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: {},
        by_tag: {}
    },
    reducers: {
        addRecipe(state, action) {
            state.recipes[action.payload.recipe.id] = action.payload.recipe;
        },
        addRecipesForTagName(state, action) {
            state.by_tag[action.payload.tagName] = action.payload.recipes;
        }
    }
});


export const recipesActions = recipesSlice.actions;
export default recipesSlice;