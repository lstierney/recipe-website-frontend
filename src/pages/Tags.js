import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchRecipesForTagName} from "../store/recipes-actions";
import RecipesList from "../components/recipe/RecipesList";

const Tags = () => {
    const [recipes, setRecipes] = useState([]);
    const [tagName, setTagName] = useState(undefined);
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);
    const dispatch = useDispatch();
    const tags = useSelector(state => state.meta.tags);
    const recipesFromRedux = useSelector(state => state.recipes.by_tag);

    useEffect(() => {
        setRecipes(recipesFromRedux[tagName] || []);
    }, [recipesFromRedux, tagName]);

    const performSearchHandler = (newTagName) => {
        if (recipesFromRedux[newTagName] === undefined) {
            dispatch(fetchRecipesForTagName(newTagName));
            setRecipes(recipesFromRedux[newTagName] || []);
        }
        setIsSearchPerformed(true);
        setTagName(newTagName);
    }

    return (
        <>
            <h1>Search by Tag</h1>
            <section>
                {tags.map(tag =>
                    <button type="button" onClick={() => performSearchHandler(tag.name)}
                            key={tag.id}>{tag.name}</button>
                )}
            </section>
            {isSearchPerformed &&
                <>
                    <h2>Recipes for Tag "{tagName}"</h2>
                    <RecipesList recipes={recipes}/>
                </>
            }
        </>
    );
};

export default Tags;