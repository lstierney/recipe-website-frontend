import React from 'react';
import classes from "../../main.module.css";
import {Link} from "react-router-dom";
import _ from 'lodash';

const RecipesList = (props) => {
    return (
        <section>
            <ul>
                {!_.isEmpty(props.recipes) && props.recipes.map(recipe =>
                    <>
                        <li key={recipe.id} className={classes.description}>
                            <Link to={`/recipes/${recipe.id}`}>
                                {recipe.name}
                            </Link>
                        </li>
                    </>
                )}
                {_.isEmpty(props.recipes) && <p>No recipes found!</p>}
            </ul>
        </section>
    );
};

export default RecipesList;