import React, {useEffect, useState} from 'react';

import IngredientInput from "../../components/admin/IngredientInput";
import IngredientsList from "../../components/recipe/IngredientsList";
import MethodStepsList from "../../components/recipe/MethodStepsList";
import MethodStepInput from "../../components/admin/MethodStepInput";
import {useDispatch, useSelector} from "react-redux";
import {addRecipe} from "../../store/recipes-actions";


const AddRecipe = () => {
    const [ingredients, setIngredients] = useState([]);
    const [methodSteps, setMethodSteps] = useState([]);
    const [methodStepOrderingId, setMethodStepOrderingId] = useState(1);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [cookingTime, setCookingTime] = useState(0);
    const [selectedTags, setSelectedTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [image, setImage] = useState(null);

    const units = useSelector(state => state.meta.units);
    const metaTags = useSelector(state => state.meta.tags);
    const dispatch = useDispatch();

    useEffect(() => {
        setAvailableTags(metaTags);
    }, [metaTags]);

    const addRecipeHandler = (e) => {
        e.preventDefault();

        const recipe = {
            // Set to undef so that the backend will fail "NOT NULL" checks
            name: name.length !== 0 ? name : undefined,
            description: description.length !== 0 ? description : undefined,
            cookingTime: +cookingTime > 0 ? +cookingTime : undefined,
            ingredients: ingredients,
            methodSteps: methodSteps,
            tags: selectedTags
        };

        const formData = new FormData();
        formData.append('imageFile', image);
        formData.append('recipe', JSON.stringify(recipe));

        if (window.confirm(JSON.stringify(recipe, null, 2))) {
            dispatch(addRecipe(formData));
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

    const onAddTagHandler = (id) => {
        // Remove tag from available list
        const selectedTag = availableTags.filter(tag => tag.id === id)[0];
        setAvailableTags(availableTags.filter(tag => tag.id !== id));
        // add tag to recipe list
        const recipeList = selectedTags.slice();
        recipeList.push(selectedTag);
        setSelectedTags(recipeList);
    }

    const onRemoveTagHandler = (id) => {
        // Remove tag from available list
        const selectedTag = selectedTags.filter(tag => tag.id === id)[0];
        setSelectedTags(selectedTags.filter(tag => tag.id !== id));
        // add tag to recipe list
        const availableList = availableTags.slice();
        availableList.push(selectedTag);
        setAvailableTags(availableList);
    }

    const availableTagsContent = () => {
        let content;
        if (availableTags.length === 0) {
            content = 'No tags available';
        } else {
            content = availableTags.map(tag => <button key={tag.id} type="button"
                                                       onClick={() => onAddTagHandler(tag.id)}>{tag.name}</button>);
        }
        return content;
    }

    const selectedTagsContent = () => {
        let content;
        if (selectedTags.length === 0) {
            content = 'No tags selected';
        } else {
            content = selectedTags.map(tag => <button key={tag.id} type="button"
                                                      onClick={() => onRemoveTagHandler(tag.id)}>{tag.name}</button>);
        }
        return content;
    }

    return (
        <div>
            <h1>Add Recipe</h1>
            <form>
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
                    <label htmlFor="image">Choose an image:</label>
                    <input type="file" id="image" name="image" onChange={e => setImage(e.target.files[0])}/>
                </section>
                <section>
                    <h2>Tags</h2>
                    <h3>Available</h3>
                    {availableTagsContent()}
                    <h3>Selected</h3>
                    {selectedTagsContent()}
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
            </form>
            </div>
        );
    }
;

export default AddRecipe;