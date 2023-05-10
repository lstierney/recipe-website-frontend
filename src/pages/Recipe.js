import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchRecipe} from "../store/recipes-actions";
import IngredientsList from "../components/recipe/IngredientsList";
import MethodStepsList from "../components/recipe/MethodStepsList";
import classes from '../main.module.css';

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
        // TODO - hostname should be in a conf file
        const imgSrc = "http://localhost:8080/images/" + recipe.imageFileName;
        return <>
            <div className={classes.information}>
                <h1>{recipe.name}</h1>
                <section>
                    <p className={classes.description}>{recipe.description}</p>
                    <dl>
                        <dt>Cooking Time</dt>
                        <dd>{recipe.cookingTime} mins</dd>
                    </dl>
                </section>
            </div>
            <section>
                <img alt={recipe.name} width="200" height="200" src={imgSrc}/>
            </section>
            <section>
                <h2>Ingredients</h2>
                <IngredientsList ingredients={recipe.ingredients} units={units} isReadOnly={true}/>
            </section>
            <section>
                <h2>Method</h2>
                <MethodStepsList methodSteps={recipe.methodSteps}/>
            </section>
            <p><Link to=".." relative="path">Back</Link></p>
        </>;
    }
};

export default Recipe;