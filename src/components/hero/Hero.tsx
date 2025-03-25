import React, {useEffect, useState} from 'react';
import classes from './Hero.module.css';
import {useNavigate} from "react-router-dom";
import {useGetRandomDinnerQuery} from "../../store/api";
import {RecipeType} from "../../types/recipeType";
import {getRandomImageName} from "../../utils/image/image-utils";

const Hero = () => {
    const getRandomDinnerQuery = useGetRandomDinnerQuery({});
    const [randomRecipe, setRandomRecipe] = useState<RecipeType | null>(null);
    const imgHost = process.env.REACT_APP_STATIC_HOST;
    const navigate = useNavigate();

    const handleHeroClick = () => {
        if (randomRecipe !== null) {
            const name = randomRecipe.name.replace(/ /g, '-').toLowerCase();
            navigate(`/recipes/${name}`);
        }
    };

    useEffect(() => {
        if (getRandomDinnerQuery.isSuccess) {
            setRandomRecipe(getRandomDinnerQuery.data);
        }
        const timer = setInterval(() => {
            getRandomDinnerQuery.refetch();
        }, 10000);
        return () => clearInterval(timer);
    }, [getRandomDinnerQuery]);

    return (
        <div className={classes['hero-container']} data-testid={'hero-container'} onClick={handleHeroClick}>
            {randomRecipe &&
                <div className={classes['hero-image-container']}>
                    <img className={classes['hero-image']}
                         src={imgHost + randomRecipe.imageFolderPath + getRandomImageName(randomRecipe)}
                         alt={randomRecipe.name}/>
                </div>
            }
            {randomRecipe &&
                <div className={classes['hero-card']}>
                    <div className={classes['hero-card-inner']}>
                        <div className={classes['hero-card-name']}>{randomRecipe.name}</div>
                        <div className={classes['hero-card-description']}>{randomRecipe.description}</div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Hero;