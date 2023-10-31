import {useGetRandomRecipesQuery} from "../../store/api";
import RecipesList from "../../components/recipe/recipeslist/RecipesList";
import mainClasses from '../../main.module.css';
import Hero from "../../components/hero/Hero";


const HomePage = () => {
    const {data: randomRecipes} = useGetRandomRecipesQuery({});

    return (
        <>
            <Hero/>
            <div className={mainClasses['home-previews']}>
                <RecipesList recipes={randomRecipes ? randomRecipes : []}/>
            </div>

        </>
    );
}

export default HomePage;