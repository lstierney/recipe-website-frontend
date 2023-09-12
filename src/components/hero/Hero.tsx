import React, {useEffect, useState} from 'react';
import classes from './Hero.module.css';
import {useNavigate} from "react-router-dom";
import _ from "lodash";
import {useGetRecipeTitlesAndIdsQuery} from "../../store/api";
import {RecipeType} from "../../types/recipeType";

const Hero = () => {
    const {data: images, isSuccess} = useGetRecipeTitlesAndIdsQuery({});
    const [randomRecipe, setRandomRecipe] = useState<RecipeType | null>(null);
    const imgHost = process.env.REACT_APP_API_HOST;
    const navigate = useNavigate();

    const handleImageClick = (name: string) => {
        name = name.replace(/ /g, '-').toLowerCase();
        navigate(`/recipes/${name}`);
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
        <div className={classes['hero-container']}>
            {randomRecipe &&
                <div data-testid={'hero-image-container'} onClick={() => handleImageClick(randomRecipe.name)}
                     className={classes['hero-image-container']}>

                    <img className={classes['hero-image']} src={imgHost + '/images/' + randomRecipe.imageFileName}
                         alt={randomRecipe.name}/>

                </div>
            }
            {randomRecipe &&
                <div onClick={() => handleImageClick(randomRecipe.name)} className={classes['hero-card']}>

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