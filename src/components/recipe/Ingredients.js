import React from 'react';
import classes from "../../main.module.css";
import IngredientsList from "./IngredientsList";
import _ from "lodash";
import {useRouteLoaderData} from "react-router-dom";
import IngredientInput from "../admin/IngredientInput";

const Ingredients = (props) => {
    const isAdmin = !_.isEmpty(useRouteLoaderData('root'));

    return (
        <section>
            <br/>
            <h2 className={classes.left_align}>Ingredients</h2>
            <hr/>
            <IngredientsList ingredients={props.ingredients} onRemove={props.onRemove}/>
            {isAdmin && <IngredientInput onAdd={props.onAdd}/>}
        </section>
    );
};

export default Ingredients;