import {useGetLatestRecipesQuery} from "../../store/api";
import RecipesList from "../../components/recipe/recipeslist/RecipesList";
import mainClasses from '../../main.module.css';
import Hero from "../../components/hero/Hero";


const HomePage = () => {
    const {data: latestRecipes} = useGetLatestRecipesQuery({});

    return (
        <>
            <Hero/>
            <div className={mainClasses['home-previews']}>
                <RecipesList recipes={latestRecipes ? latestRecipes : []}/>
            </div>

        </>
    );
}

export default HomePage;