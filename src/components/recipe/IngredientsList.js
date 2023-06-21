import React from 'react';
import classes from '../../main.module.css';

const IngredientsList = (props) => {
    // For a given Ingredient will return the human readable label for it's Unit (if it has a Unit)
    const getUnitDescriptionForIngredient = (ingredient) => {
        const filteredUnits = props.units.filter(unit => ingredient.unit && ingredient.unit.id && ingredient.unit.id === unit.id);
        let filteredUnitDescription = '';
        if (filteredUnits.length === 1) {
            filteredUnitDescription = filteredUnits[0].name;
        }
        return filteredUnitDescription;
    }

    return (
        <div>
            <ul>
                {props.ingredients.map(ingredient => {
                    return (
                        <>
                            <li className={classes.ingredient} key={ingredient.description}>
                                {ingredient.quantity} {getUnitDescriptionForIngredient(ingredient)} {ingredient.description}&nbsp;

                                {!props.isReadOnly &&
                                    <button
                                        onClick={() => props.onRemoveIngredientHandler(ingredient.description)}>Remove</button>}
                            </li>
                            <hr/>
                        </>);
                })
                }
            </ul>
        </div>
    );
};

export default IngredientsList;