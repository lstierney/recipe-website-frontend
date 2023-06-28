import React from 'react';
import classes from "../../main.module.css";
import {Link} from "react-router-dom";
import _ from 'lodash';

const RecipesList = (props) => {
    return (
        <section>
            <ul>
                {!_.isEmpty(props.recipes) && props.recipes.map(recipe =>
                    <li key={recipe.id} className={classes.description}>
                        <Link to={`/recipes/${recipe.id}`}>
                            {recipe.name}
                        </Link>&nbsp;
                    </li>
                )}
                {_.isEmpty(props.recipes) && <h2>No recipes found</h2>}
            </ul>
        </section>
    );
};

export default RecipesList;