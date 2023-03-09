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
            dispatch(recipesActions.setRecipe({
                recipe: recipe || {}
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: error.message
            }));
        }
    }
};