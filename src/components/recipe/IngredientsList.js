import React, {useEffect, useState} from 'react';
import classes from '../../main.module.css';
import _ from "lodash";
import {useSelector} from "react-redux";
import {Reorder} from "framer-motion";
import {isAdminUser} from "../../utils/auth";

const IngredientsList = (props) => {
    const units = useSelector(state => state.meta.units);
    const isAdmin = isAdminUser();
    const [ingredients, setIngredients] = useState(props.ingredients);

    useEffect(() => {
        setIngredients(props.ingredients);
    }, [props.ingredients]);

    // For a given Ingredient will return the human readable label for it's Unit (if it has a Unit)
    const getUnitDescriptionForIngredient = ingredient => {
        const filteredUnits = units.filter(unit => ingredient.unit && ingredient.unit.id && ingredient.unit.id === unit.id);
        let filteredUnitDescription = '';
        if (filteredUnits.length === 1) {
            filteredUnitDescription = filteredUnits[0].name;
        }
        if (ingredient.quantity === 0) {
            filteredUnitDescription = _.capitalize(filteredUnitDescription);
        }
        return filteredUnitDescription;
    }

    return (
        <Reorder.Group axis="y" values={ingredients}
                       onReorder={setIngredients}>
            {!_.isEmpty(ingredients) && ingredients.map(ingredient => (
                <Reorder.Item key={ingredient.id} value={ingredient}>
                    <div className={classes.ingredient} key={ingredient.description} onMouseUp={() => {
                        props.onReorder(ingredients)
                    }}>
                        {ingredient.quantity > 0 ? ingredient.quantity : ''} {getUnitDescriptionForIngredient(ingredient)} {ingredient.description}&nbsp;

                        {isAdmin &&
                            <button type="button"
                                    onClick={() => {
                                        props.onRemove(ingredient.description)
                                    }}>Remove</button>}
                    </div>
                </Reorder.Item>))}
            {_.isEmpty(props.ingredients) && <p>No Ingredients found</p>}
        </Reorder.Group>
    );
};

export default IngredientsList;