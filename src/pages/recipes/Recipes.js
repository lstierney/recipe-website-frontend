import RecipesList from "../../components/recipe/recipeslist/RecipesList";
import {useNavigate, useSearchParams} from "react-router-dom";
import classes from './Recipes.module.css';
import {useGetRecipesByTagQuery, useGetRecipeTitlesAndIdsQuery, useGetTagsQuery} from "../../store/api";
import Button from "../../components/button/Button";
import _ from 'lodash';
import closeImage from "../../assets/images/close-circle.svg";

import React from "react";

const Recipes = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const tagName = searchParams.get('tag');
    const {data: tags = []} = useGetTagsQuery();
    const {data: recipes = []} = useGetRecipesByTagQuery(tagName, {skip: _.isEmpty(tagName)});
    const {data: allRecipes} = useGetRecipeTitlesAndIdsQuery({skip: !_.isEmpty(tagName)});

    const performSearchHandler = tagName => {
        navigate("/recipes?tag=" + tagName);
    };
    const clearSearchParams = () => {
        navigate("/recipes");
    };

    return (
        <>
            <section className={classes['tagList-search']}>
                {!tags.length > 0 && <h2>No tags found</h2>}
                {tags.map(tag =>
                    <Button type="button" onClick={() => performSearchHandler(tag.name)}
                            key={tag.id}>{tag.name}</Button>
                )}
            </section>
            {tagName &&
                <>
                    <div className={classes['recipes-for']}>
                        <h2>Recipes for Tag "{tagName}"</h2>
                        <img src={closeImage} className={classes.close} alt="Clear Filter" aria-label="Clear Filter"
                             onClick={clearSearchParams}/>
                    </div>
                    <RecipesList recipes={recipes}/>
                </>
            }
            {!tagName &&
                <>
                    <RecipesList recipes={allRecipes}/>
                </>
            }
        </>
    );
};

export default Recipes;