import React, {useEffect, useState} from 'react';
import RecipesList from "../../components/recipe/recipeslist/RecipesList";
import {RecipeType} from "../../types/recipeType";
import Button from "../../components/button/Button";

const Pinned = () => {
    const [recipes, setRecipes] = useState<RecipeType[]>([]);
    const baseUrl = process.env.REACT_APP_API_URL;

    const unpinAll = () => {
        localStorage.removeItem('pinnedRecipes');
        setRecipes([]);
    }

    useEffect(() => {
        const pinnedRecipesString = localStorage.getItem('pinnedRecipes');
        const recipeNames: string[] = pinnedRecipesString ? JSON.parse(pinnedRecipesString) : [];

        const fetchPinnedRecipes = async () => {
            const fetchedRecipes: RecipeType[] = [];

            for (let recipeName of recipeNames) {
                const recipeNameForUrl = recipeName.toLowerCase().replace(/ /g, "-");
                try {
                    const response = await fetch(`${baseUrl}/recipes/${recipeNameForUrl}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const recipe: RecipeType = await response.json();
                    fetchedRecipes.push(recipe);
                } catch (e) {
                    console.error('Failed to fetch recipe: ', e);
                }
            }
            setRecipes(fetchedRecipes);
        }
        fetchPinnedRecipes();
    }, []);

    return (
        <div>
            <h1>Pinned Recipes</h1>
            {recipes && recipes.length > 0 &&
                <Button type={"button"} onClick={unpinAll}>Unpin All</Button>
            }
            <RecipesList recipes={recipes}/>
        </div>
    );
};

export default Pinned;