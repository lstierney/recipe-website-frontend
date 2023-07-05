import React, {useEffect, useState} from 'react';
import {toastUtils} from "../utils/toast-utils";
import {Link} from "react-router-dom";
import _ from 'lodash';
import classes from '../main.module.css';

const toast = toastUtils();

const LatestRecipe = () => {
    const [latestRecipe, setLatestRecipe] = useState(null);

    useEffect(() => {
        const fetchLatestRecipe = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/recipes/latest');
            if (!response.ok) {
                throw new Error('Could not get latest Recipe: ' + response.status);
            }
            return await response.json();
        };

        const fetchData = async () => {
            try {
                const recipe = await fetchLatestRecipe();
                if (!_.isEmpty(recipe)) {
                    setLatestRecipe(recipe);
                }
            } catch (error) {
                toast.error("Failed to fetch Latest Recipe: " + error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <section className={classes['recipe-search-results']}>
            <h2>Latest</h2>
            {latestRecipe && <Link to={`/recipes/${latestRecipe.id}`}>{latestRecipe.name}</Link>}
            {!latestRecipe && <p>No recipe found</p>}
        </section>
    );
};

export default LatestRecipe;