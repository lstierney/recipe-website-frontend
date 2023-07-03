import React from 'react';
import classes from "../../main.module.css";
import IngredientInput from "../admin/IngredientInput";
import {isAdminUser} from "../../utils/auth";
import DraggableList from "./DraggableList";

const Ingredients = (props) => {
    const isAdmin = isAdminUser();

    return (
        <section>
            <br/>
            <h2 className={classes.left_align}>Ingredients</h2>
            <hr/>
            <DraggableList items={props.ingredients} onRemove={props.onRemove} onReorder={props.onReorder}
                           type={'ingredients'}/>
            {isAdmin && <IngredientInput onAdd={props.onAdd}/>}
        </section>
    );
};

export default Ingredients;