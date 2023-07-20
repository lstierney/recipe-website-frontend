import {useGetLatestRecipesQuery, useGetRecipeTitlesAndIdsQuery} from "../../store/api";
import RecipesList from "../../components/recipe/recipeslist/RecipesList";
import ImageRotator from "../../components/imagerotator/ImageRotator";
import classes from './Home.module.css';


const HomePage = () => {
    const {data: latestRecipes} = useGetLatestRecipesQuery();
    const {data: images} = useGetRecipeTitlesAndIdsQuery();

    return (
        <>
            <h1>{process.env.REACT_APP_PAGE_TITLE}</h1>
            <h2>An opinionated recipe website</h2>
            <section>
                <div>
                    <ImageRotator images={images ? images : []}/>
                </div>
                <h2 className={classes['left-align']}>Latest</h2>
                <RecipesList recipes={latestRecipes ? latestRecipes : []}/>
            </section>
        </>
    );
}

export default HomePage;