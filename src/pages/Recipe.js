import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {fetchRecipe, persistRecipe} from "../store/recipes-actions";
import {useParams, useRouteLoaderData} from "react-router-dom";
import differenceBy from 'lodash/differenceBy'
import Method from "../components/recipe/Method";
import Ingredients from "../components/recipe/Ingredients";
import Tags from "../components/recipe/Tags";
import _ from "lodash";
import InfoPanel from "../components/recipe/InfoPanel";

const Recipe = () => {
        const isAdmin = !_.isEmpty(useRouteLoaderData('root'));
        const [ingredients, setIngredients] = useState([]);
        const [methodSteps, setMethodSteps] = useState([]);
        const [methodStepOrderingId, setMethodStepOrderingId] = useState(1);
        const [name, setName] = useState('');
        const [description, setDescription] = useState('');
        const [cookingTime, setCookingTime] = useState(0);
        const [selectedTags, setSelectedTags] = useState([]);
        const [availableTags, setAvailableTags] = useState([]);
        const [image, setImage] = useState(null);
        const [imageFileName, setImageFileName] = useState('');


        const dispatch = useDispatch();

        const recipeId = useParams().recipeId;

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
                setSelectedTags(recipe.tags);
                setAvailableTags(differenceBy(metaTags, recipe.tags, 'id'));
                setImageFileName(recipe.imageFileName);
            } else {
                setAvailableTags(metaTags);
            }
        }, [recipe, metaTags]);


        useEffect(() => {
            if (recipeId !== undefined && recipe === undefined) {
                dispatch(fetchRecipe(recipeId));
            }
        }, [dispatch, recipe, recipeId]);

        const addRecipeHandler = (e) => {
            e.preventDefault();

            const recipe = {
                // Set to undef so that the backend will fail "NOT NULL" checks
                name: name.length !== 0 ? name : undefined,
                description: description.length !== 0 ? description : undefined,
                cookingTime: +cookingTime > 0 ? +cookingTime : undefined,
                ingredients: ingredients,
                methodSteps: methodSteps,
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
            newIngredients.push(ingredient);
            setIngredients(newIngredients);
        }
        const onRemoveIngredientHandler = description => {
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

                    <Ingredients
                        ingredients={ingredients}
                        onAdd={onAddIngredientHandler}
                        onRemove={onRemoveIngredientHandler}
                    />

                    <Method
                        methodSteps={methodSteps}
                        onAdd={onAddMethodStepHandler}
                    />

                    {isAdmin &&
                        <button type="submit" onClick={addRecipeHandler}>Submit</button>}

                </form>
            </div>
        );
    }
;

export default Recipe;