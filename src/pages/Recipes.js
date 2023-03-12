import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {uiActions} from "../store/ui-slice";
import {useDispatch} from "react-redux";
import classes from '../main.module.css';

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
            <section>
                <ul>
                    {recipesList.map(recipe =>
                        <li key={recipe.id} className={classes.description}>
                            <Link to={`/recipes/${recipe.id}`}>
                                {recipe.name}
                            </Link>
                        </li>
                    )}
                </ul>
            </section>
        </>
    );
}
export default Recipes;