import React, {useEffect, useRef, useState} from 'react';
import {useGetUnitsQuery} from "../../../store/api";
import {toastUtils} from "../../../utils/toast-utils";
import Button from "../../button/Button";
import {UnitType} from "../../../types/unitType";
import {IngredientType} from "../../../types/ingredientType";
import _ from "lodash";

const toast = toastUtils();

type Props = {
    onAdd: (ingredient: IngredientType) => void,
    ingredient?: IngredientType,
    onUpdate: (originalIngredient: IngredientType, newIngredient: IngredientType) => void
}

const IngredientInput: React.FC<Props> = props => {
    const {data: units = [], isError} = useGetUnitsQuery({});
    const numberInputRef = useRef<HTMLInputElement>(null);
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState<number | undefined>(0);
    const [unitId, setUnitId] = useState<number | undefined>(0);
    const [isUpdate, setIsUpdate] = useState(false);

    if (isError) {
        toast.error("An error occurred whilst loading Units");
    }

    useEffect(() => {
        if (props.ingredient !== undefined) { //  && !isUpdate
            setDescription(props.ingredient.description);
            setQuantity(props.ingredient.quantity);
            setUnitId(props.ingredient.unit?.id);
            setIsUpdate(true);
        }
    }, [props.ingredient]); // , isUpdate

    const onUpdate = () => {
        if (!_.isEmpty(props.ingredient)) {
            const newIngredient: IngredientType = {
                description: description,
                quantity: quantity
            };
            if (unitId !== undefined && unitId > 0) {
                newIngredient.unit = {
                    id: unitId
                }
            }
            props.onUpdate(props.ingredient, newIngredient);
        }
    }

    const handleAddIngredient = () => {
        const ingredient: IngredientType = {
            description: description,
            quantity: quantity
        };
        if (unitId !== undefined && unitId > 0) {
            ingredient.unit = {
                id: unitId
            };
        }
        setDescription('');
        setUnitId(0);
        setQuantity(0);

        props.onAdd(ingredient);

        if (numberInputRef.current !== null) {
            numberInputRef.current.focus();
        }
    }
    return (
        <div>
            <input name="quantity" type="number" ref={numberInputRef} step="0.25" value={quantity}
                   onChange={e => setQuantity(+e.target.value)}/>
            <select name="unit_id" onChange={e => setUnitId(+e.target.value)} value={unitId}>
                <option key="0" value="0"></option>
                {units.map((unit: UnitType) =>
                    <option key={unit.id} value={unit.id}>{unit.name}</option>
                )}
            </select>
            <input type="text" name="description" value={description} onChange={e => setDescription(e.target.value)}/>
            {!isUpdate && <Button type="button" onClick={handleAddIngredient}>Add</Button>}
            {isUpdate && <Button type="button" onClick={onUpdate}>Update</Button>}
        </div>
    );
};

export default IngredientInput;