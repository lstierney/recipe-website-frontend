import {uiActions} from "./ui-slice";
import {recipesActions} from "./recipes-slice";

export const fetchRecipe = (recipeId) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Getting..',
            message: 'Getting Recipe...'
        }));
        const fetchRecipe = async () => {
            const response = await fetch('http://localhost:8080/recipes/' + recipeId);

            if (!response.ok) {
                throw new Error('Could not fetch Recipe: ' + recipeId);
            }
            return await response.json();
        };

        try {
            const recipe = await fetchRecipe();
            dispatch(recipesActions.addRecipe({
                recipe: recipe || {}
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: error.message
            }));
        }
        dispatch(uiActions.hideNotification());
    }
};

export const fetchRecipesForTagName = (tagName) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Getting..',
            message: 'Getting Recipes for tag ' + tagName
        }));
        const fetchRecipes = async () => {
            const response = await fetch('http://localhost:8080/recipes?' + new URLSearchParams({tagName}));

            if (!response.ok) {
                throw new Error('Could not fetch Recipes for Tag ' + tagName);
            }
            return await response.json();
        };

        try {
            const recipes = await fetchRecipes();
            dispatch(recipesActions.addRecipesForTagName({
                recipes: recipes || {},
                tagName
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: error.message
            }));
        }
        dispatch(uiActions.hideNotification());
    }
};

export const addRecipe = (formData) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending Data',
            message: 'Sending Recipe Data'
        }));
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
            dispatch(recipesActions.addRecipe({
                recipe: newRecipe || {}
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: error.message
            }));
        }
        dispatch(uiActions.hideNotification());
    }
};

export const fetchRecipeTitlesAndIds = () => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Getting Data',
            message: 'Loading Recipe Title Data'
        }));
        const fetchData = async () => {
            const response = await fetch('http://localhost:8080/recipes/list');

            if (!response.ok) {
                throw new Error('Could not fetch Recipe title data');
            }
            return await response.json();
        };

        try {
            const titleData = await fetchData();
            dispatch(recipesActions.storeTitlesAndIds({
                titleData: titleData || []
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: error.message
            }));
        }
        dispatch(uiActions.hideNotification());
    }
};