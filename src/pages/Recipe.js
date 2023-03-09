import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchRecipe} from "../store/recipes-actions";
import IngredientsList from "../components/admin/IngredientsList";
import MethodStepsList from "../components/admin/MethodStepsList";
import classes from '../components/admin/AddRecipe.module.css'

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
        return <div className={classes["add-recipe"]}>
            <section>
                <h2>{recipe.name}</h2>
                <p>{recipe.description}</p>
                <dl>
                    <dt>Cooking Time</dt>
                    <dd>{recipe.cookingTime} mins</dd>
                </dl>
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
        </div>;
    }
};

export default Recipe;