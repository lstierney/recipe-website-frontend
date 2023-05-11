import {recipesActions} from "./recipes-slice";
import {toastUtils} from "../utils/toast-utils";

export const fetchRecipe = (recipeId) => {
    return async (dispatch) => {
        const toast = toastUtils();
        toast.showLoading("Loading Recipe...");

        const fetchRecipe = async () => {
            const response = await fetch('http://localhost:8080/recipes/' + recipeId);

            if (!response.ok) {
                throw new Error('Could not fetch Recipe: ' + recipeId);
            }
            return await response.json();
        };

        try {
            const recipe = await fetchRecipe();
            toast.dismiss();
            dispatch(recipesActions.addRecipe({
                recipe: recipe || {}
            }));
        } catch (error) {
            toast.error(error.message);
        }
    }
};

export const fetchRecipesForTagName = (tagName) => {
    return async (dispatch) => {
        const toast = toastUtils();
        toast.showLoading("Getting Recipes for Tag " + tagName + "... ");

        const fetchRecipes = async () => {
            const response = await fetch('http://localhost:8080/recipes?' + new URLSearchParams({tagName}));

            if (!response.ok) {
                throw new Error('Could not fetch Recipes for Tag ' + tagName);
            }
            return await response.json();
        };

        try {
            const recipes = await fetchRecipes();
            toast.dismiss();
            dispatch(recipesActions.addRecipesForTagName({
                recipes: recipes || {},
                tagName
            }));
        } catch (error) {
            toast.showError(error.message)
        }
    }
};

export const addRecipe = (formData) => {
    return async (dispatch) => {
        const toast = toastUtils();
        toast.showLoading("Adding Recipe...");

        const postData = async () => {
            const response = await fetch("http://localhost:8080/recipes", {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error('Sending Recipe data failed');
            }
            return await response.json();
        };

        try {
            const newRecipe = await postData();
            toast.showSuccess("Recipe Added")
            dispatch(recipesActions.addRecipe({
                recipe: newRecipe || {}
            }));
        } catch (error) {
            toast.showError(error.message);
        }
    }
};

export const fetchRecipeTitlesAndIds = () => {
    return async (dispatch) => {
        const toast = toastUtils();
        toast.showLoading("Fetching Recipe List...");

        const fetchData = async () => {
            const response = await fetch('http://localhost:8080/recipes/list');

            if (!response.ok) {
                throw new Error('Could not fetch Recipe title data');
            }
            return await response.json();
        };

        try {
            const titleData = await fetchData();
            toast.dismiss();
            dispatch(recipesActions.storeTitlesAndIds({
                titleData: titleData || []
            }));
        } catch (error) {
            toast.showError(error.message);
        }
    }
};