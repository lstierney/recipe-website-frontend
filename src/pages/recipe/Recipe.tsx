import React, {useEffect, useState} from 'react';

import {useNavigate, useParams} from "react-router-dom";
import Method from "../../components/recipe/method/Method";
import Ingredients from "../../components/recipe/ingredients/Ingredients";
import Tags from "../../components/recipe/tags/Tags";
import _ from "lodash";
import InfoPanel from "../../components/recipe/infopanel/InfoPanel";
import {enterEditingMode, isAdminUser, leaveEditingMode} from "../../utils/auth";
import Notes from "../../components/recipe/notes/Notes";
import {
    useAddRecipeMutation,
    useGetRecipeQuery,
    useGetTagsQuery,
    useMarkRecipeAsCookedMutation,
    useUpdateRecipeMutation
} from "../../store/api";
import AdminButtons from "../../components/recipe/adminbuttons/AdminButtons";
import {IngredientType} from "../../types/ingredientType";
import {NoteType} from "../../types/noteType";
import {MethodStepType} from "../../types/methodStepType";
import {RecipeType} from "../../types/recipeType";
import {TagType} from "../../types/tagType";
import {OrderableType} from "../../types/orderableType";

const Recipe = () => {
    const [id, setId] = useState(undefined);
    const [ingredients, setIngredients] = useState<IngredientType[]>([]);
    const [methodSteps, setMethodSteps] = useState<MethodStepType[]>([]);
    const [isRecipeInEditMode, setIsRecipeInEditMode] = useState(false);
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [methodStepOrderingId, setMethodStepOrderingId] = useState(1);
    const [ingredientOrderingId, setIngredientOrderingId] = useState(1);
    const [noteOrderingId, setNoteOrderingId] = useState(1);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [cookingTime, setCookingTime] = useState(0);
    const [cooked, setCooked] = useState(0);
    const [basedOn, setBasedOn] = useState('');
    const [crockery, setCrockery] = useState(0);
    const [heated, setHeated] = useState(false);
    const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
    const [availableTags, setAvailableTags] = useState<TagType[]>([]);
    const [image, setImage] = useState<File | undefined>(undefined);
    const [imageFileName, setImageFileName] = useState('');
    const navigate = useNavigate();
    const recipeName = useParams().recipeName;
    const isAdmin = isAdminUser();
    const isUpdate = recipeName !== undefined && isAdmin;

    const {data: metaTags = []} = useGetTagsQuery({});
    const {data: recipe} = useGetRecipeQuery(recipeName, {skip: recipeName === undefined});
    const [addRecipe] = useAddRecipeMutation();
    const [updateRecipe] = useUpdateRecipeMutation();
    const [markRecipeAsCooked] = useMarkRecipeAsCookedMutation();

    const getHighestOrdering = (items: OrderableType[]): number => {
        const ordered: OrderableType[] = _.orderBy(items, ['ordering'], ['desc']);

        return ordered[0].ordering !== undefined ? ordered[0].ordering + 1 : 1;
    }


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
            setAvailableTags(_.difference(metaTags, recipe.tags));
            setImageFileName(recipe.imageFileName);
            setCooked(recipe.cooked);

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

    useEffect(() => {
        return () => {
            leaveEditingMode();
        }
    }, []);

    const addRecipeHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const recipe: RecipeType = {
            // Set to undef so that the backend will fail "NOT NULL" checks
            name: name,
            description: description,
            cookingTime: +cookingTime,
            cooked: cooked,
            basedOn: !_.isEmpty(basedOn) ? basedOn : '',
            ingredients: ingredients,
            methodSteps: methodSteps,
            notes: notes,
            imageFileName: imageFileName,
            tags: selectedTags
        };

        if (crockery > 0) {
            recipe.servedOn = {
                crockery: {
                    id: crockery
                },
                heated: heated
            };
        }

        if (isUpdate && id !== undefined) {
            recipe.id = id;
        }

        if (window.confirm(JSON.stringify(recipe, null, 2))) {
            recipe.image = image;
            isUpdate ? await updateRecipe(recipe).unwrap() : await addRecipe(recipe).unwrap();
        }
    }

    const handleEditModeChange = (editMode: boolean) => {
        setIsRecipeInEditMode(editMode);
        editMode ? enterEditingMode() : leaveEditingMode();
        console.log(isRecipeInEditMode);
    };

    const onMarkRecipeAsCookedHandler = async () => {
        await markRecipeAsCooked(recipe).unwrap();
    }

    const onAddIngredientHandler = (ingredient: IngredientType) => {
        const newIngredients = ingredients.slice();
        newIngredients.push({...ingredient, ordering: ingredientOrderingId});
        setIngredients(newIngredients);
        setIngredientOrderingId(ingredientOrderingId + 1);
    }
    const onRemoveIngredientHandler = (description: string) => {
        const filteredIngredients = ingredients.filter(ingredient => ingredient.description !== description);
        setIngredients(filteredIngredients)
    }
    const onReorderIngredientsHandler = (ingredients: IngredientType[]) => {
        const updatedIngredients = ingredients.map((ingredient: IngredientType, index: number) => ({...ingredient, ordering: index + 1}));
        setIngredients(updatedIngredients);
    }
    const onAddMethodStepHandler = (description: string) => {
        const newMethodSteps = methodSteps.slice();
        newMethodSteps.push({description, ordering: methodStepOrderingId});
        setMethodSteps(newMethodSteps);
        setMethodStepOrderingId(methodStepOrderingId + 1);
    }
    const onRemoveMethodStepHandler = (description: string) => {
        const filteredMethodSteps = methodSteps.filter(methodStep => methodStep.description !== description);
        setMethodSteps(filteredMethodSteps)
    }
    const onUpdateMethodStepHandler = (originalDescription: string, newDescription: string) => {
        const newMethodSteps = methodSteps.map(step => {
            if (step.description === originalDescription) {
                step.description = newDescription;
            }
            return step;
        });
        setMethodSteps(newMethodSteps);
    }
    const onUpdateNotesHandler = (originalDescription: string, newDescription: string) => {
        const newNotes = notes.map(note => {
            if (note.description === originalDescription) {
                note.description = newDescription;
            }
            return note;
        });
        setNotes(newNotes);
    }
    const onUpdateIngredientHandler = (originalIngredient: IngredientType, updatedIngredient: IngredientType) => {
        alert("Original: " + JSON.stringify(originalIngredient) + " Updated: " + JSON.stringify(updatedIngredient));
        const newIngredients = ingredients.map(ingredient => {
            if (ingredient.description === originalIngredient.description) {
                ingredient.description = updatedIngredient.description;
                ingredient.quantity = updatedIngredient.quantity;
                ingredient.unit = updatedIngredient.unit;
            }
            return ingredient;
        });
        setIngredients(newIngredients);
    }
    const onReorderMethodStepHandler = (methodSteps: MethodStepType[]) => {
        const updatedSteps = methodSteps.map((step, index) => ({...step, ordering: index + 1}));
        setMethodSteps(updatedSteps);
    }

    const onAddNoteHandler = (description: string) => {
        const newNotes = notes.slice();
        newNotes.push({description, ordering: noteOrderingId});
        setNotes(newNotes);
        setNoteOrderingId(noteOrderingId + 1);
    }
    const onRemoveNoteHandler = (description: string) => {
        const filteredNotes: NoteType[] = notes.filter((note: NoteType) => note.description !== description);
        setNotes(filteredNotes)
    }
    const onReorderNoteHandler = (notes: NoteType[]) => {
        const updatedNotes = notes.map((step, index) => ({...step, ordering: index + 1}));
        setNotes(updatedNotes);
    }
    const onAddTagHandler = (id: number) => {
        // Remove tag from available list
        const selectedTag = availableTags.filter(tag => tag.id === id)[0];
        setAvailableTags(availableTags.filter(tag => tag.id !== id));
        // add tag to recipe list
        const recipeList = selectedTags.slice();
        recipeList.push(selectedTag);
        setSelectedTags(recipeList);
    }
    const onRemoveTagHandler = (id: number) => {
        // Remove tag from available list
        const selectedTag = selectedTags.filter(tag => tag.id === id)[0];
        setSelectedTags(selectedTags.filter(tag => tag.id !== id));
        // add tag to recipe list
        const availableList = availableTags.slice();
        availableList.push(selectedTag);
        setAvailableTags(availableList);
    }
    const onSearchTagHandler = (tagId: number) => {
        const tag = metaTags.find((tag: TagType) => tag.id === tagId);
        navigate('/recipes?tags=' + tag.name);
    }

    return (
        <div>
            <form>
                <AdminButtons addRecipeHandler={addRecipeHandler} onEditModeChange={handleEditModeChange}
                              onMarkRecipeAsCooked={onMarkRecipeAsCookedHandler}>
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
                    items={notes}
                    onAdd={onAddNoteHandler}
                    onReorder={onReorderNoteHandler}
                    onRemove={onRemoveNoteHandler}
                    onUpdate={onUpdateNotesHandler}
                />
                <Ingredients
                    ingredients={ingredients}
                    onAdd={onAddIngredientHandler}
                    onRemove={onRemoveIngredientHandler}
                    onReorder={onReorderIngredientsHandler}
                    onUpdate={onUpdateIngredientHandler}
                />
                <Method
                    items={methodSteps}
                    onAdd={onAddMethodStepHandler}
                    onReorder={onReorderMethodStepHandler}
                    onRemove={onRemoveMethodStepHandler}
                    onUpdate={onUpdateMethodStepHandler}
                />
                </AdminButtons>
            </form>
        </div>
    );
};

export default Recipe;