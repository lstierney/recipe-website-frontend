import React from 'react';
import classes from "../../../main.module.css";
import IngredientInput from "../../admin/IngredientInput";
import {isInEditingMode} from "../../../utils/auth";
import DraggableList from "../draggablelist/DraggableList";
import {IngredientType} from "../../../types/ingredientType";
import {OrderableType} from "../../../types/orderableType";

type Props = {
    ingredients: OrderableType[],
    onRemove: (ingredientDescription: string) => void,
    onReorder: (ingredients: IngredientType[]) => void,
    onAdd: (ingredient: IngredientType) => void
}

const Ingredients = (props: Props) => {
    const isEditMode = isInEditingMode();

    return (
        <section>
            <br/>
            <h2 className={classes.left_align}>Ingredients</h2>
            <DraggableList items={props.ingredients} onRemove={props.onRemove} onReorder={props.onReorder}
                           type={'ingredients'}/>
            {isEditMode && <IngredientInput onAdd={props.onAdd}/>}
        </section>
    );
};

export default Ingredients;