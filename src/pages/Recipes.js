import {fetchRecipeTitlesAndIds} from "../store/recipes-actions";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import RecipesList from "../components/recipe/RecipesList";

const Recipes = () => {
    const recipesList = useSelector(state => state.recipes.id_to_title);
    const dispatch = useDispatch();

    useEffect(() => {
        if (recipesList.length === 0) {
            dispatch(fetchRecipeTitlesAndIds());
        }
    }, [recipesList.length, dispatch]);

    return <>
        <h1>The Big List of Recipes</h1>
        <RecipesList recipes={recipesList}/>
    </>;
}
export default Recipes;