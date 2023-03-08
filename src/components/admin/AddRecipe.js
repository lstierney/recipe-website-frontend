import React, {useCallback, useEffect, useState} from 'react';

import classes from './AddRecipe.module.css';
import IngredientInput from "./IngredientInput";
import IngredientsList from "./IngredientsList";
import MethodStepsList from "./MethodStepsList";
import MethodStepInput from "./MethodStepInput";

const AddRecipe = () => {
        const [ingredients, setIngredients] = useState([]);
        const [methodSteps, setMethodSteps] = useState([]);
        const [units, setUnits] = useState([]);
        const [methodStepOrderingId, setMethodStepOrderingId] = useState(1);
        const [name, setName] = useState('');
        const [description, setDescription] = useState('');
        const [cookingTime, setCookingTime] = useState(0);

        const fetchUnitsHandler = useCallback(async () => {
            try {
                const response = await fetch("http://localhost:8080/units");
                if (!response.ok) {
                    throw new Error("Something went wrong!");
                }
                const data = await response.json();
                setUnits(data);
            } catch (error) {
                alert("Error! Something went wrong: " + JSON.stringify(error, null, 2));
            }
        }, []);

        useEffect(() => {
            fetchUnitsHandler();
        }, [fetchUnitsHandler]);

        const addRecipeHandler = async () => {
            const recipe = {
                name: name,
                description: description,
                cookingTime: +cookingTime,
                ingredients: ingredients,
                methodSteps: methodSteps
            };
            if (window.confirm(JSON.stringify(recipe, null, 2))) {
                const response = await fetch("http://localhost:8080/recipes", {
                    method: 'POST',
                    body: JSON.stringify(recipe),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                console.log(data);
            }
        }
        const onAddIngredientHandler = (ingredient) => {
            const newIngredients = ingredients.slice();
            newIngredients.push(ingredient);
            setIngredients(newIngredients);
        }
        const onRemoveIngredientHandler = (description) => {
            const filteredIngredients = ingredients.filter(ingredient => ingredient.description !== description);
            setIngredients(filteredIngredients)
        }

        const onAddMethodStepHandler = (description) => {
            const newMethodSteps = methodSteps.slice();
            newMethodSteps.push({
                ordering: methodStepOrderingId,
                description: description
            });
            setMethodSteps(newMethodSteps);
            setMethodStepOrderingId(methodStepOrderingId + 1);
        }

        return (
            <div className={classes["add-recipe"]}>
                <h1>Add Recipe</h1>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" value={name} onChange={e => setName(e.target.value)}/>
                <label htmlFor="description">Description:</label>
                <textarea name="description" value={description} onChange={e => setDescription(e.target.value)}/>
                <label htmlFor="cookingTime">Cooking Time:</label>
                <input type="number" name="cookingTime" value={cookingTime}
                       onChange={e => setCookingTime(+e.target.value)}/>

                <h2>Ingredients</h2>
                <IngredientsList ingredients={ingredients} onRemoveIngredientHandler={onRemoveIngredientHandler}
                                 units={units}/>
                <IngredientInput onAdd={onAddIngredientHandler} units={units}/>

                <h2>Method Steps</h2>
                <MethodStepsList methodSteps={methodSteps}/>
                <MethodStepInput onAdd={onAddMethodStepHandler}/>

                <button className={classes.button} type="submit" onClick={addRecipeHandler}>Add Recipe</button>

            </div>
        );
    }
;

export default AddRecipe;