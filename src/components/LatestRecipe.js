import React from 'react';
import {Link} from "react-router-dom";
import classes from '../main.module.css';
import {useGetLatestRecipesQuery} from "../store/api";
import _ from "lodash";

const LatestRecipe = () => {
    const {data: latestRecipe} = useGetLatestRecipesQuery();

    return (
        <section className={classes['recipe-search-results']}>
            <h2>Latest</h2>
            {!_.isEmpty(latestRecipe) && <Link to={`/recipes/${latestRecipe.id}`}>{latestRecipe.name}</Link>}
            {_.isEmpty(latestRecipe) && <p>No recipe found</p>}
        </section>
    );
};

export default LatestRecipe;