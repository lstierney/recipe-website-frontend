import React, {useEffect, useState} from 'react';

import {useLocation, useNavigate, useParams} from "react-router-dom";
import differenceBy from 'lodash/differenceBy'
import Method from "../../components/recipe/method/Method";
import Ingredients from "../../components/recipe/ingredients/Ingredients";
import Tags from "../../components/recipe/tags/Tags";
import _ from "lodash";
import InfoPanel from "../../components/recipe/infopanel/InfoPanel";
import {enterEditingMode, isAdminUser, isInEditingMode, leaveEditingMode} from "../../utils/auth";
import Notes from "../../components/recipe/notes/Notes";
import {useAddRecipeMutation, useGetRecipeQuery, useGetTagsQuery, useUpdateRecipeMutation} from "../../store/api";
import Button from "../../components/button/Button";

const Recipe = () => {
    const [id, setId] = useState(undefined);
    const [ingredients, setIngredients] = useState([]);
    const [methodSteps, setMethodSteps] = useState([]);
    const [notes, setNotes] = useState([]);
    const [methodStepOrderingId, setMethodStepOrderingId] = useState(1);
    const [ingredientOrderingId, setIngredientOrderingId] = useState(1);
    const [noteOrderingId, setNoteOrderingId] = useState(1);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [cookingTime, setCookingTime] = useState(0);
    const [basedOn, setBasedOn] = useState('');
    const [crockery, setCrockery] = useState(undefined);
    const [heated, setHeated] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [image, setImage] = useState(null);
    const [imageFileName, setImageFileName] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const recipeName = useParams().recipeName;
    const isAdmin = isAdminUser();
    const isUpdate = recipeName !== undefined && isAdmin;

    const {data: metaTags = []} = useGetTagsQuery();
    const {data: recipe} = useGetRecipeQuery(recipeName, {skip: recipeName === undefined});
    const [addRecipe] = useAddRecipeMutation();
    const [updateRecipe] = useUpdateRecipeMutation();

    const getHighestOrdering = items => {
        return _.orderBy(items, ['ordering'], ['desc'])[0].ordering + 1
    }

    useEffect(() => {
        if (location.pathname === '/admin/addRecipe') {
            if (isAdmin) {
                setIsEditMode(true);
                enterEditingMode();
            }
        }
        return () => {
            // This return function is the cleanup function.
            leaveEditingMode();
        };
    }, [isAdmin, location.pathname]);

    useEffect(() => {
        if (recipe !== undefined) {
            //alert(JSON.stringify(recipe, null, 2));
            setId(recipe.id);
            setName(recipe.name);
            setDescription(recipe.description);
            setCookingTime(recipe.cookingTime);
            setBasedOn(recipe.basedOn)
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
            if (!_.isEmpty(recipe.servedOn)) {
                setCrockery(recipe.servedOn.crockery.id);
                setHeated(recipe.servedOn.heated);
            }
        } else {
            setAvailableTags(metaTags);
        }
    }, [recipe, metaTags]);

    const handleEnterEditMode = () => {
        enterEditingMode();
        setIsEditMode(true);
    }
    const handleLeaveEditMode = () => {
        leaveEditingMode();
        setIsEditMode(false);
    }

    const addRecipeHandler = async e => {
        e.preventDefault();

        const recipe = {
            // Set to undef so that the backend will fail "NOT NULL" checks
            name: name.length !== 0 ? name : undefined,
            description: description.length !== 0 ? description : undefined,
            cookingTime: +cookingTime > 0 ? +cookingTime : undefined,
            basedOn: !_.isEmpty(basedOn) ? basedOn : '',
            ingredients: ingredients,
            methodSteps: methodSteps,
            notes: notes,
            imageFileName: imageFileName,
            tags: selectedTags
        };

        if (!_.isNil(crockery)) {
            recipe.servedOn = {
                crockery: {
                    id: crockery
                },
                heated: heated
            };
        }

        if (isUpdate) {
            recipe.id = id;
        }

        if (window.confirm(JSON.stringify(recipe, null, 2))) {
            recipe.image = image;
            isUpdate ? await updateRecipe(recipe).unwrap() : await addRecipe(recipe).unwrap();
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
    const onSearchTagHandler = tagId => {
        const tag = metaTags.find(tag => tag.id === tagId);
        navigate('/recipes?tag=' + tag.name);
    }

    return (
        <div>
            <form>
                {isAdmin ? (
                    isInEditingMode() ? (
                        <Button type="button" onClick={handleLeaveEditMode}>Read Only Mode</Button>
                    ) : (
                        <Button type="button" onClick={handleEnterEditMode}>Edit Mode</Button>
                    )
                ) : null}
                <InfoPanel
                    recipe={recipe}
                    setCookingTime={setCookingTime}
                    setDescription={setDescription}
                    setName={setName}
                    setImage={setImage}
                    setBasedOn={setBasedOn}
                    setCrockery={setCrockery}
                    setHeated={setHeated}
                />
                <Tags
                    onAdd={onAddTagHandler}
                    onRemove={onRemoveTagHandler}
                    availableTags={availableTags}
                    selectedTags={selectedTags}
                    onSearch={onSearchTagHandler}
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
                    items={methodSteps}
                    onAdd={onAddMethodStepHandler}
                    onReorder={onReorderMethodStepHandler}
                    onRemove={onRemoveMethodStepHandler}
                />
                {isEditMode &&
                    <Button type="submit" onClick={addRecipeHandler}>Submit</Button>}
            </form>
        </div>
    );
};

export default Recipe;