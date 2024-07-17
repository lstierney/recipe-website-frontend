import {useGetLatestRecipesQuery, useGetRandomDinnersQuery} from "../../store/api";
import RecipesList from "../../components/recipe/recipeslist/RecipesList";
import mainClasses from '../../main.module.css';
import Hero from "../../components/hero/Hero";
import React, {useEffect, useState} from "react";
import {RecipePreviewType} from "../../types/recipePreviewType";
import Switcher from "./switcher/Switcher";


const HomePage = () => {
    const {data: randomDinners} = useGetRandomDinnersQuery({});
    const {data: latestRecipes} = useGetLatestRecipesQuery({});
    const [dinners, setDinners] = useState<RecipePreviewType[]>([]);

    useEffect(() => {
        setDinners(randomDinners);
    }, [randomDinners]);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === 'random') {
            setDinners(randomDinners);
        } else {
            setDinners(latestRecipes);
        }
    };

    return (
        <>
            <Hero/>
            <div className={mainClasses['home-previews']}>
                <Switcher handleRadioChange={handleRadioChange} selectedOption={'random'}/>
                <RecipesList recipes={dinners ? dinners : []}/>
            </div>

        </>
    );
}

export default HomePage;