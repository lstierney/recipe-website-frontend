import {useGetLatestRecipesQuery, useGetRecipeTitlesAndIdsQuery} from "../../store/api";
import RecipesList from "../../components/recipe/recipeslist/RecipesList";
import mainClasses from '../../main.module.css';
import {useEffect, useState} from "react";
import _ from 'lodash';
import {useNavigate} from "react-router-dom";


const HomePage = () => {
    const {data: latestRecipes} = useGetLatestRecipesQuery();
    const {data: images, isSuccess} = useGetRecipeTitlesAndIdsQuery();
    const [randomRecipe, setRandomRecipe] = useState(undefined);
    const imgHost = process.env.REACT_APP_API_HOST;
    const navigate = useNavigate()

    const handleImageClick = id => {
        navigate(`/recipes/${id}`);
    };

    useEffect(() => {
        if (isSuccess) {
            setRandomRecipe(_.sample(images))
        }
        const timer = setInterval(() => {
            setRandomRecipe(_.sample(images));
        }, 10000); // Change image every 10 seconds

        return () => clearInterval(timer); // Clean up timer on unmount
    }, [images, isSuccess]);

    return (
        <>
            <div className={mainClasses['hero-image-container']}>
                {randomRecipe &&
                    <img className={mainClasses['hero-image']} src={imgHost + '/images/' + randomRecipe.imageFileName}
                         alt={randomRecipe.name} onClick={() => handleImageClick(randomRecipe.id)}/>
                }
            </div>
            <div className={mainClasses['hero-card']}>
                {randomRecipe &&
                    <div onClick={() => handleImageClick(randomRecipe.id)} className={mainClasses['hero-card-inner']}>
                        <div className={mainClasses['hero-card-name']}>{randomRecipe.name}</div>
                        <div className={mainClasses['hero-card-description']}>{randomRecipe.description}</div>
                    </div>
                }
            </div>
            <div className={mainClasses['home-previews']}>
                <RecipesList recipes={latestRecipes ? latestRecipes : []}/>
            </div>

        </>
    );
}

export default HomePage;