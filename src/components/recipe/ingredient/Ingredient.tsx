import React from 'react';

import {useGetUnitsQuery} from "../../../store/api";
import _ from "lodash";
import {IngredientType} from "../../../types/ingredientType";
import {UnitType} from "../../../types/unitType";

type Props = {
    ingredient: IngredientType
}

const Ingredient = (props: Props) => {
    const {data: units = []} = useGetUnitsQuery({});
    const {ingredient} = props;

    // For a given Ingredient, returns the human-readable label for its Unit (if it has a Unit)
    const getUnitDescriptionForIngredient = (ingredient: IngredientType) => {
        if (!units) {
            return '';
        }
        const filteredUnits = units.filter(
            (unit: UnitType) =>
                ingredient.unit &&
                ingredient.unit.id &&
                ingredient.unit.id === unit.id
        );
        let filteredUnitDescription = '';
        if (filteredUnits.length === 1) {
            filteredUnitDescription = filteredUnits[0].name;
        }
        if (ingredient.quantity === 0) {
            filteredUnitDescription = _.capitalize(filteredUnitDescription);
        }
        return filteredUnitDescription;
    };

    return (
        <span>{(ingredient.quantity !== undefined && ingredient.quantity > 0) ? ingredient.quantity : ''} {getUnitDescriptionForIngredient(ingredient)} {ingredient.description}</span>
    );
};

export default Ingredient;