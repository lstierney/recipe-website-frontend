import React, {useState} from 'react';
import {useSelector} from "react-redux";

const IngredientInput = (props) => {
    const units = useSelector(state => state.meta.units);
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [unitId, setUnitId] = useState(0);

    const handleAddIngredient = () => {
        const ingredient = {
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
    }
    return (
        <div>
            <input type="number" name="quantity" step="0.25" value={quantity}
                   onChange={e => setQuantity(+e.target.value)}/>
            <select name="unit_id" onChange={e => setUnitId(+e.target.value)} value={unitId}>
                <option key="0" value="0"></option>
                {units.map(unit =>
                    <option key={unit.id} value={unit.id}>{unit.name}</option>
                )}
            </select>
            <input type="text" name="description" value={description} onChange={e => setDescription(e.target.value)}/>
            <button type="button" onClick={handleAddIngredient}>Add</button>
        </div>
    );
};

export default IngredientInput;