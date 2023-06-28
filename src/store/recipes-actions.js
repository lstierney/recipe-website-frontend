import {recipesActions} from "./recipes-slice";
import {toastUtils} from "../utils/toast-utils";
import {getAuthToken} from "../utils/auth";

export const fetchRecipe = (recipeId) => {
    return async (dispatch) => {
        const toast = toastUtils();
        toast.loading("Loading Recipe...");

        const fetchRecipe = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/recipes/' + recipeId);

            if (!response.ok) {
                throw new Error('Could not fetch Recipe: ' + recipeId);
            }
            return await response.json();
        };

        try {
            const recipe = await fetchRecipe();
            toast.dismiss();
            dispatch(recipesActions.putRecipe({
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
        toast.loading("Getting Recipes for Tag " + tagName + "... ");

        const fetchRecipes = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/recipes?' + new URLSearchParams({tagName}));

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
            toast.error(error.message)
        }
    }
};

export const persistRecipe = (formData, isUpdate) => {
    return async (dispatch) => {
        const toast = toastUtils();
        toast.loading("Sending Recipe...");

        const method = !isUpdate ? 'POST' : 'PUT';

        const data = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/recipes', {
                method: method,
                body: formData,
                headers: {
                    'Authorization': 'Bearer ' + getAuthToken()
                }
            });
            if (!response.ok) {
                throw new Error('Sending Recipe data failed');
            }
            return await response.json();
        };

        try {
            const recipe = await data();
            toast.success("Recipe Sent")
            dispatch(recipesActions.putRecipe({
                recipe: recipe || {}
            }));
        } catch (error) {
            toast.error(error.message);
        }
    }
}


export const fetchRecipeTitlesAndIds = () => {
    return async (dispatch) => {
        const toast = toastUtils();
        toast.loading("Fetching Recipe List...");

        const fetchData = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/recipes/list');

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
            toast.error(error.message);
        }
    }
};