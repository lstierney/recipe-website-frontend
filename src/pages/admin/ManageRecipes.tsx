import React from 'react';
import {
    useGetRecipesIgnoreDeletedQuery,
    useMarkRecipeAsDeletedMutation,
    useRestoreRecipeMutation
} from "../../store/api";
import _ from "lodash";
import {RecipeType} from "../../types/recipeType";

const ManageRecipes = () => {
    const {data: recipes = []} = useGetRecipesIgnoreDeletedQuery({});
    const hasRecipes = !_.isEmpty(recipes);
    const [deleteRecipe] = useMarkRecipeAsDeletedMutation();
    const [restoreRecipe] = useRestoreRecipeMutation();

    return (
        <section>
            <h2>Recipes</h2>
            <ul>
                {hasRecipes && recipes.map((recipe: RecipeType) => (
                    <li key={recipe.id}>
                        <p>{recipe.name}
                            {recipe.deleted ?
                                (<button onClick={() => restoreRecipe(recipe)}>Restore</button>) :
                                (<button onClick={() => deleteRecipe(recipe)}>Delete</button>)
                            }
                        </p>
                    </li>
                ))}
                {!hasRecipes && <p>No Recipes to display</p>}
            </ul>
        </section>
    );
};

export default ManageRecipes;