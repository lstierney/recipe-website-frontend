import {useEffect, useState} from "react";
import {uiActions} from "../store/ui-slice";
import {useDispatch} from "react-redux";
import RecipesList from "../components/recipe/RecipesList";

const Recipes = () => {
    const [recipesList, setRecipesList] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:8080/recipes/list")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to fetch data");
                }
            })
            .then((data) => {
                setRecipesList(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: error.message
                }));
            });
    }, [dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!recipesList) {
        return null;
    }


    return (
        <>
            <h1>The big list of Recipes</h1>
            <RecipesList recipes={recipesList}/>
        </>
    );
}
export default Recipes;