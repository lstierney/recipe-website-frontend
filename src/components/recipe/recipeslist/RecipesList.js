import React from 'react';
import classes from './RecipeList.module.css';
import _ from 'lodash';
import Preview from "../preview/Preview";

const RecipesList = props => {
    return (
        <div className={classes['recipes-list']}>
            <ul>
                {!_.isEmpty(props.recipes) && props.recipes.map(recipe =>
                    <li key={recipe.id}>
                        <Preview recipe={recipe}/>
                    </li>
                )}
                {_.isEmpty(props.recipes) && <h2>No recipes found</h2>}
            </ul>
        </div>
    );
};

export default RecipesList;