import {useGetLatestRecipesQuery, useGetRecipeTitlesAndIdsQuery} from "../../store/api";
import RecipesList from "../../components/recipe/recipeslist/RecipesList";
import ImageRotator from "../../components/imagerotator/ImageRotator";
import mainClasses from '../../main.module.css';


const HomePage = () => {
    const {data: latestRecipes} = useGetLatestRecipesQuery();
    const {data: images} = useGetRecipeTitlesAndIdsQuery();

    return (
        <>

            <div className={mainClasses.hero}>
                <ImageRotator images={images ? images : []}/>
            </div>
            <div className={mainClasses['home-previews']}>
                <RecipesList recipes={latestRecipes ? latestRecipes : []}/>
            </div>

        </>
    );
}

export default HomePage;