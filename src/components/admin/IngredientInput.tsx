import React, {useRef, useState} from 'react';
import {useGetUnitsQuery} from "../../store/api";
import {toastUtils} from "../../utils/toast-utils";
import Button from "../button/Button";
import {Unit} from "../../types/unit";
import {Ingredient} from "../../types/ingredient";

const toast = toastUtils();

type Props = {
    onAdd(ingredient: Ingredient): void
}

const IngredientInput: React.FC<Props> = props => {
    const {data: units = [], isError} = useGetUnitsQuery({});
    const numberInputRef = useRef<HTMLInputElement>(null);
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [unitId, setUnitId] = useState(0);

    if (isError) {
        toast.error("An error occurred whilst loading Units");
    }

    const handleAddIngredient = () => {
        const ingredient: Ingredient = {
            description: description,
            quantity: quantity
        };
        if (unitId > 0) {
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
            <input type="number" ref={numberInputRef} name="quantity" step="0.25" value={quantity}
                   onChange={e => setQuantity(+e.target.value)}/>
            <select name="unit_id" onChange={e => setUnitId(+e.target.value)} value={unitId}>
                <option key="0" value="0"></option>
                {units.map((unit: Unit) =>
                    <option key={unit.id} value={unit.id}>{unit.name}</option>
                )}
            </select>
            <input type="text" name="description" value={description} onChange={e => setDescription(e.target.value)}/>
            <Button type="button" onClick={handleAddIngredient}>Add</Button>
        </div>
    );
};

export default IngredientInput;