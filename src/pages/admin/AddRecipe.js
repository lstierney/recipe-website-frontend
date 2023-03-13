import React, {useState} from 'react';

import IngredientInput from "../../components/admin/IngredientInput";
import IngredientsList from "../../components/recipe/IngredientsList";
import MethodStepsList from "../../components/recipe/MethodStepsList";
import MethodStepInput from "../../components/admin/MethodStepInput";
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../../store/ui-slice";


const AddRecipe = () => {
    const [ingredients, setIngredients] = useState([]);
    const [methodSteps, setMethodSteps] = useState([]);
    const [methodStepOrderingId, setMethodStepOrderingId] = useState(1);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [cookingTime, setCookingTime] = useState(0);

    const units = useSelector(state => state.meta.units);
    const dispatch = useDispatch();

    const addRecipeHandler = async () => {
        const recipe = {
            // Set to undef so that the backend will fail "NOT NULL" checks
            name: name.length !== 0 ? name : undefined,
            description: description.length !== 0 ? description : undefined,
            cookingTime: +cookingTime < 0 ? +cookingTime : undefined,
            ingredients: ingredients,
            methodSteps: methodSteps
        };
        if (window.confirm(JSON.stringify(recipe, null, 2))) {
            let response;
            try {
                response = await fetch("http://localhost:8080/recipes", {
                    method: 'POST',
                    body: JSON.stringify(recipe),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                    if (!response.ok) {
                        throw new Error('Sending Recipe data failed');
                    }
                } catch (Error) {
                    const errorMessage = response ? await response.text() : '';
                    dispatch(uiActions.showNotification({
                        status: 'error',
                        title: 'Error!',
                        message: "Could not POST Recipe data: " + errorMessage
                    }));
                }
                dispatch(uiActions.showNotification({
                    status: 'success',
                    title: 'Success!',
                    message: "Successfully added Recipe!"
                }));
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
            <div>
                <h1>Add Recipe</h1>
                <section>
                    <h2>General</h2>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" value={name} onChange={e => setName(e.target.value)}/><br/>
                    <label htmlFor="description">Description:</label><br/>
                    <textarea name="description" rows="10" cols="80" value={description}
                              onChange={e => setDescription(e.target.value)}/><br/>
                    <label htmlFor="cookingTime">Cooking Time:</label>
                    <input type="number" name="cookingTime" value={cookingTime}
                           onChange={e => setCookingTime(+e.target.value)}/>
                </section>
                <section>
                    <h2>Ingredients</h2>
                    <IngredientsList ingredients={ingredients} onRemoveIngredientHandler={onRemoveIngredientHandler}
                                     units={units}/>
                    <IngredientInput onAdd={onAddIngredientHandler} units={units}/>
                </section>
                <section>
                    <h2>Method Steps</h2>
                    <MethodStepsList methodSteps={methodSteps}/>
                    <MethodStepInput onAdd={onAddMethodStepHandler}/>
                </section>
                <button type="submit" onClick={addRecipeHandler}>Add Recipe</button>

            </div>
        );
    }
;

export default AddRecipe;