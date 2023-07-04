import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchRecipesForTagName} from "../store/recipes-actions";
import RecipesList from "../components/recipe/RecipesList";
import {useSearchParams} from "react-router-dom";
import classes from '../main.module.css';

const Search = () => {
    const [recipes, setRecipes] = useState([]);
    const [tagName, setTagName] = useState(undefined);
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const tags = useSelector(state => state.meta.tags);
    const recipesFromRedux = useSelector(state => state.recipes.by_tag);

    const performSearchHandler = useCallback(tagName => {
        if (recipesFromRedux[tagName] === undefined) {
            dispatch(fetchRecipesForTagName(tagName));
        }
        setRecipes(recipesFromRedux[tagName] || []);
        setIsSearchPerformed(true);
        setTagName(tagName);
    }, [dispatch, recipesFromRedux, setRecipes, setIsSearchPerformed, setTagName]);

    useEffect(() => {
        setRecipes(recipesFromRedux[tagName] || []);
    }, [recipesFromRedux, tagName]);

    useEffect(() => {
        if (searchParams.get('tagId')) {
            const tagId = +searchParams.get('tagId');
            const tag = tags.find(tag => tag.id === tagId);
            if (tag) {
                setSearchParams({});
                performSearchHandler(tag.name);
            }
        }
    }, [searchParams, tags, performSearchHandler, isSearchPerformed, setSearchParams]);

    return (
        <>
            <h1>Search by Tag</h1>
            <section className={classes['tagList-search']}>
                {!tags.length > 0 && <h2>No tags found</h2>}
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

export default Search;