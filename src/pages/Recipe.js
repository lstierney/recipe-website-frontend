import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchRecipe} from "../store/recipes-actions";
import IngredientsList from "../components/recipe/IngredientsList";
import MethodStepsList from "../components/recipe/MethodStepsList";
import classes from '../main.module.css';
import clockImage from '../assets/images/clock.png';

const Recipe = () => {
    console.log("Component Rendering");
    const recipeId = useParams().recipeId;
    const dispatch = useDispatch();
    const recipe = useSelector(state => state.recipes.recipes[recipeId]);
    const units = useSelector(state => state.meta.units);

    //console.log("Recipe here:" + JSON.stringify(reduxRecipe, null, 2));

    useEffect(() => {
        if (recipe === undefined) {
            console.log("Fetching Recipe");
            dispatch(fetchRecipe(recipeId));
        }
    }, [dispatch, recipeId, recipe]);

    if (recipe === undefined) {

    } else {
        const imgSrc = process.env.REACT_APP_API_HOST + '/images/' + recipe.imageFileName;
        return <>
            <section className={classes.information}>
                <div className={classes.recipe_panel}>
                    <img alt={recipe.name} width="200" height="200" src={imgSrc}/>
                    <div>
                        <h1>{recipe.name}</h1>
                        <p className={classes.description}>{recipe.description}</p>
                    </div>
                </div>
                <div className={classes.cooking_time}>
                    <img src={clockImage} alt="Clock"/>
                    <p>Cook: {recipe.cookingTime} mins</p>
                </div>
            </section>
            <section>
                <br/>
                <h2 className={classes.left_align}>Ingredients</h2>
                <hr/>
                <IngredientsList ingredients={recipe.ingredients} units={units} isReadOnly={true}/>
            </section>
            <section>
                <br/>
                <h2 className={classes.left_align}>Method</h2>
                <MethodStepsList methodSteps={recipe.methodSteps}/>
            </section>
            <p><Link to=".." relative="path">Back</Link></p>
        </>;
    }
};

export default Recipe;