import React from 'react';
import classes from "../../main.module.css";
import IngredientsList from "./IngredientsList";
import IngredientInput from "../admin/IngredientInput";
import {isAdminUser} from "../../utils/auth";

const Ingredients = (props) => {
    const isAdmin = isAdminUser();

    return (
        <section>
            <br/>
            <h2 className={classes.left_align}>Ingredients</h2>
            <hr/>
            <IngredientsList ingredients={props.ingredients} onRemove={props.onRemove} onReorder={props.onReorder}/>
            {isAdmin && <IngredientInput onAdd={props.onAdd}/>}
        </section>
    );
};

export default Ingredients;