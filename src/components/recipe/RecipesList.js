import React from 'react';
import classes from "../../main.module.css";
import {Link} from "react-router-dom";

const RecipesList = (props) => {
    return (
        <section>
            <ul>
                {props.recipes.length > 0 && props.recipes.map(recipe =>
                    <>
                        <li key={recipe.id} className={classes.description}>
                            <Link to={`/recipes/${recipe.id}`}>
                                {recipe.name}
                            </Link>
                        </li>
                    </>
                )}
                {!props.recipes.length > 0 && <p>No recipes found!</p>}
            </ul>
        </section>
    );
};

export default RecipesList;