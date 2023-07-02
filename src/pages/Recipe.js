import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {fetchRecipe, persistRecipe} from "../store/recipes-actions";
import {useParams} from "react-router-dom";
import differenceBy from 'lodash/differenceBy'
import Method from "../components/recipe/Method";
import Ingredients from "../components/recipe/Ingredients";
import Tags from "../components/recipe/Tags";
import _ from "lodash";
import InfoPanel from "../components/recipe/InfoPanel";
import {isAdminUser} from "../utils/auth";
import Notes from "../components/recipe/Notes";

const Recipe = () => {
    const [ingredients, setIngredients] = useState([]);
    const [methodSteps, setMethodSteps] = useState([]);
    const [notes, setNotes] = useState([]);
    const [methodStepOrderingId, setMethodStepOrderingId] = useState(1);
    const [ingredientOrderingId, setIngredientOrderingId] = useState(1);
    const [noteOrderingId, setNoteOrderingId] = useState(1);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [cookingTime, setCookingTime] = useState(0);
    const [selectedTags, setSelectedTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [image, setImage] = useState(null);
    const [imageFileName, setImageFileName] = useState('');

    const dispatch = useDispatch();

    const recipeId = useParams().recipeId;

    const isAdmin = isAdminUser();
    const isUpdate = recipeId !== undefined && isAdmin;

    const metaTags = useSelector(state => state.meta.tags);
    const recipe = useSelector(state => state.recipes.recipes[recipeId]);

    useEffect(() => {
        if (recipe !== undefined) {
            setName(recipe.name);
            setDescription(recipe.description);
            setCookingTime(recipe.cookingTime);
            setIngredients(recipe.ingredients);
            setMethodSteps(recipe.methodSteps);
            setNotes(recipe.notes);
            setSelectedTags(recipe.tags);
            setAvailableTags(differenceBy(metaTags, recipe.tags, 'id'));
            setImageFileName(recipe.imageFileName);

            if (!_.isEmpty(recipe.methodSteps)) {
                setMethodStepOrderingId(getHighestOrdering(recipe.methodSteps));
            }
            if (!_.isEmpty(recipe.ingredients)) {
                setIngredientOrderingId(getHighestOrdering(recipe.ingredients));
            }
            if (!_.isEmpty(recipe.notes)) {
                setNoteOrderingId(getHighestOrdering(recipe.notes));
            }
        } else {
            setAvailableTags(metaTags);
        }
    }, [recipe, metaTags]);


    useEffect(() => {
        if (recipeId !== undefined && recipe === undefined) {
            dispatch(fetchRecipe(recipeId));
        }
    }, [dispatch, recipe, recipeId]);

    const getHighestOrdering = items => {
        return _.orderBy(items, ['ordering'], ['desc'])[0].ordering + 1
    }

    const addRecipeHandler = e => {
        e.preventDefault();

        const recipe = {
            // Set to undef so that the backend will fail "NOT NULL" checks
            name: name.length !== 0 ? name : undefined,
            description: description.length !== 0 ? description : undefined,
            cookingTime: +cookingTime > 0 ? +cookingTime : undefined,
            ingredients: ingredients,
            methodSteps: methodSteps,
            notes: notes,
            imageFileName: imageFileName,
            tags: selectedTags
        };

            if (isUpdate) {
                recipe.id = +recipeId;
            }

            const formData = new FormData();
            formData.append('imageFile', image);
            formData.append('recipe', JSON.stringify(recipe));

            if (window.confirm(JSON.stringify(recipe, null, 2))) {
                dispatch(persistRecipe(formData, isUpdate));
            }
        }

    const onAddIngredientHandler = ingredient => {
        const newIngredients = ingredients.slice();
        newIngredients.push({...ingredient, ordering: ingredientOrderingId});
        setIngredients(newIngredients);
        setIngredientOrderingId(ingredientOrderingId + 1);
    }
    const onRemoveIngredientHandler = description => {
        const filteredIngredients = ingredients.filter(ingredient => ingredient.description !== description);
        setIngredients(filteredIngredients)
    }
    const onReorderIngredientsHandler = ingredients => {
        const updatedIngredients = ingredients.map((ingredient, index) => ({...ingredient, ordering: index + 1}));
        setIngredients(updatedIngredients);
    }
    const onAddMethodStepHandler = description => {
        const newMethodSteps = methodSteps.slice();
        newMethodSteps.push({description, ordering: methodStepOrderingId});
        setMethodSteps(newMethodSteps);
        setMethodStepOrderingId(methodStepOrderingId + 1);
    }
    const onRemoveMethodStepHandler = description => {
        const filteredMethodSteps = methodSteps.filter(methodStep => methodStep.description !== description);
        setMethodSteps(filteredMethodSteps)
    }
    const onReorderMethodStepHandler = methodSteps => {
        const updatedSteps = methodSteps.map((step, index) => ({...step, ordering: index + 1}));
        setMethodSteps(updatedSteps);
    }
    const onAddNoteHandler = description => {
        const newNotes = notes.slice();
        newNotes.push({description, ordering: noteOrderingId});
        setNotes(newNotes);
        setNoteOrderingId(noteOrderingId + 1);
    }
    const onRemoveNoteHandler = description => {
        const filteredNotes = notes.filter(note => note.description !== description);
        setNotes(filteredNotes)
    }
    const onReorderNoteHandler = notes => {
        const updatedNotes = notes.map((step, index) => ({...step, ordering: index + 1}));
        setNotes(updatedNotes);
    }
    const onAddTagHandler = id => {
        // Remove tag from available list
        const selectedTag = availableTags.filter(tag => tag.id === id)[0];
        setAvailableTags(availableTags.filter(tag => tag.id !== id));
        // add tag to recipe list
        const recipeList = selectedTags.slice();
        recipeList.push(selectedTag);
        setSelectedTags(recipeList);
    }
    const onRemoveTagHandler = id => {
        // Remove tag from available list
        const selectedTag = selectedTags.filter(tag => tag.id === id)[0];
        setSelectedTags(selectedTags.filter(tag => tag.id !== id));
        // add tag to recipe list
        const availableList = availableTags.slice();
        availableList.push(selectedTag);
        setAvailableTags(availableList);
    }

    return (
        <div>
            <form>
                <InfoPanel
                    recipe={recipe}
                    setCookingTime={setCookingTime}
                    setDescription={setDescription}
                    setName={setName}
                    setImage={setImage}
                />
                <Tags
                    onAdd={onAddTagHandler}
                    onRemove={onRemoveTagHandler}
                    availableTags={availableTags}
                    selectedTags={selectedTags}
                />
                <Notes
                    notes={notes}
                    onAdd={onAddNoteHandler}
                    onReorder={onReorderNoteHandler}
                    onRemove={onRemoveNoteHandler}
                />
                <Ingredients
                    ingredients={ingredients}
                    onAdd={onAddIngredientHandler}
                    onRemove={onRemoveIngredientHandler}
                    onReorder={onReorderIngredientsHandler}
                />
                <Method
                    methodSteps={methodSteps}
                    onAdd={onAddMethodStepHandler}
                    onReorder={onReorderMethodStepHandler}
                    onRemove={onRemoveMethodStepHandler}
                />
                {isAdmin &&
                    <button type="submit" onClick={addRecipeHandler}>Submit</button>}
            </form>
        </div>
        );
    }
;

export default Recipe;