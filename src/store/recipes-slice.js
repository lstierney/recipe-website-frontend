import {createSlice} from "@reduxjs/toolkit";

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: {},
        by_tag: {},
        id_to_title: []
    },
    reducers: {
        // TODO could these be named better?
        addRecipe(state, action) {
            state.recipes[action.payload.recipe.id] = action.payload.recipe;
        },
        addRecipesForTagName(state, action) {
            state.by_tag[action.payload.tagName] = action.payload.recipes;
        },
        storeTitlesAndIds(state, action) {
            state.id_to_title = action.payload.titleData;
        }
    }
});


export const recipesActions = recipesSlice.actions;
export default recipesSlice;