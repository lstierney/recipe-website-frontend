import classes from '../../main.module.css';
import {useGetLatestRecipesQuery, useGetRandomRecipesQuery} from "../../store/api";
import RecipesList from "../../components/recipe/recipeslist/RecipesList";

const HomePage = () => {
    const {data: latestRecipe} = useGetLatestRecipesQuery();
    const {data: randomRecipe} = useGetRandomRecipesQuery();

    return (
        <>
            <h1>{process.env.REACT_APP_PAGE_TITLE}</h1>
            <h2>An opinionated recipe website</h2>
            <section>
                <p className={`${classes.description} ${classes.information} ${classes.curly_text}`}>
                    My recipes.<br/>
                    Cooked my way.<br/>
                    Using my measurements.<br/>
                    Using my ingredients.<br/>
                    The way I like them<br/>
                </p>
                <h2>Latest</h2>
                <RecipesList recipes={latestRecipe ? [latestRecipe] : []}/>
                <h2>Random</h2>
                <RecipesList recipes={randomRecipe ? [randomRecipe] : []}/>
            </section>
        </>
    );
}

export default HomePage;