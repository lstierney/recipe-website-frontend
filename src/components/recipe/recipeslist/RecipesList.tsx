import React from 'react';
import classes from './RecipeList.module.css';
import _ from 'lodash';
import Preview from "../preview/Preview";
import {RecipePreviewType} from "../../../types/recipePreviewType";

type Props = {
    recipes: RecipePreviewType[]
}

const RecipesList = (props: Props) => {
    return (
        <div className={classes['recipes-list']}>
            {!_.isEmpty(props.recipes) && props.recipes.map(recipe =>
                <Preview key={recipe.name} recipe={recipe}/>
            )}
            {_.isEmpty(props.recipes) && <h2>No recipes found</h2>}
        </div>
    );
};

export default RecipesList;