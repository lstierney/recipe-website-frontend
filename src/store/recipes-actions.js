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

export const addRecipe = (recipe) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending Data',
            message: 'Sending Recipe Data'
        }));
        const postData = async () => {
            const response = await fetch("http://localhost:8080/recipes", {
                method: 'POST',
                body: JSON.stringify(recipe),
                headers: {
                    'Content-Type': 'application/json'
                }
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