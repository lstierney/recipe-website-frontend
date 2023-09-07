import React from 'react';

import {useGetUnitsQuery} from "../../../store/api";
import _ from "lodash";
import {IngredientType} from "../../../types/ingredientType";
import {UnitType} from "../../../types/unitType";

const getQuantityString = (ingredient: IngredientType) => {
    if (ingredient.quantity !== undefined && ingredient.quantity > 0) {
        const integerPortion = Math.floor(ingredient.quantity);
        const decimalPortion = ingredient.quantity - integerPortion;
        const fractions: Record<number, string> = {
            0.25: "1/4",
            0.5: "1/2",
            0.75: "3/4",
        };

        let quantityDesc = integerPortion.toString();
        if (fractions[decimalPortion] !== undefined) {
            quantityDesc = integerPortion > 0
                ? `${integerPortion} ${fractions[decimalPortion]}`
                : fractions[decimalPortion];
        }

        return quantityDesc;
    }
    return '';
}

// For a given Ingredient, returns the human-readable label for its Unit (if it has a Unit)
const getUnitDescriptionForIngredient = (ingredient: IngredientType, units: UnitType[]) => {
    if (!units) {
        return '';
    }
    const filteredUnits = units.filter(
        (unit: UnitType) =>
            ingredient.unit &&
            ingredient.unit.id &&
            ingredient.unit.id === unit.id
    );
    let unitDescription = '';
    if (filteredUnits.length === 1) {
        let unitName = filteredUnits[0].name;
        if (ingredient.quantity !== undefined && ingredient.quantity > 1) {
            unitName += 's'
        }
        unitDescription = unitName + ' of';
    }
    if (ingredient.quantity === 0) {
        unitDescription = _.capitalize(unitDescription);
    }
    return unitDescription;
};

const Ingredient = (props: { ingredient: IngredientType }) => {
    const {data: units = []} = useGetUnitsQuery({});
    const {ingredient} = props;

    return (
        <span>{getQuantityString(ingredient)} {getUnitDescriptionForIngredient(ingredient, units)} {ingredient.description}</span>
    );
};

export default Ingredient;