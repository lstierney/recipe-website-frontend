import RecipesList from "../components/recipe/RecipesList";
import {useGetRecipeTitlesAndIdsQuery} from "../store/api";

const Recipes = () => {
    const {data: recipesList} = useGetRecipeTitlesAndIdsQuery();

    return <>
        <h1>Recipes</h1>
        <RecipesList recipes={recipesList}/>
    </>;
}
export default Recipes;