import React from 'react';
import classes from '../../main.module.css';
import _ from "lodash";
import {useRouteLoaderData} from "react-router-dom";
import {useSelector} from "react-redux";

const IngredientsList = (props) => {
    const units = useSelector(state => state.meta.units);
    const isAdmin = !_.isEmpty(useRouteLoaderData('root'));

    // For a given Ingredient will return the human readable label for it's Unit (if it has a Unit)
    const getUnitDescriptionForIngredient = (ingredient) => {
        const filteredUnits = units.filter(unit => ingredient.unit && ingredient.unit.id && ingredient.unit.id === unit.id);
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

                                {isAdmin &&
                                    <button
                                        onClick={() => {
                                            props.onRemove(ingredient.description)
                                        }}>Remove</button>}
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