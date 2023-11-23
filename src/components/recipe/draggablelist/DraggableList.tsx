import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import classes from './DraggableList.module.css';
import {Reorder} from "framer-motion";
import {isInEditingMode} from "../../../utils/auth";
import Ingredient from "../ingredient/Ingredient";
import MethodStep from "../methodstep/MethodStep";
import Note from "../note/Note";
import Button from "../../button/Button";
import {OrderableType} from "../../../types/orderableType";
import MethodStepAndNoteInput from "../../admin/inputs/MethodStepAndNoteInput";
import IngredientInput from "../../admin/inputs/IngredientInput";
import {IngredientType} from "../../../types/ingredientType";

type Props = {
    type: string,
    items: OrderableType[],
    onRemove: (itemDescription: string) => void,
    onReorder: (items: OrderableType[]) => void,
    onUpdate: (oldDescription: string, newDescription: string) => void,
    onIngredientUpdate: (oldIngredient: IngredientType, newIngredient: IngredientType) => void
}

const renderListItem = (type: string, index: number, item: OrderableType) => {
    return <>
        {type === 'methodSteps' && (
            <>
                <hr/>
                <MethodStep number={index + 1} methodStep={item}/>
            </>
        )}
        {type === 'ingredients' && (
            <>
                <hr/>
                <Ingredient ingredient={item}/>
            </>
        )}
        {type === 'notes' && (
            <>
                <hr/>
                <Note note={item}/>
            </>
        )}
    </>;
}
const renderEditInput = (
    type: string,
    item: OrderableType,
    onUpdate: (oldDescription: string, newDescription: string) => void,
    onIngredientUpdate: (oldIngredient: IngredientType, newIngredient: IngredientType) => void
) => {
    return <>
        {type === 'methodSteps' && (
            <>
                <hr/>
                <MethodStepAndNoteInput type={type} value={item.description} onUpdate={onUpdate} onAdd={() => {
                }}/>
            </>
        )}
        {type === 'ingredients' && (
            <>
                <hr/>
                <IngredientInput ingredient={item} onAdd={() => {
                }} onUpdate={onIngredientUpdate}/>
            </>
        )}
        {type === 'notes' && (
            <>
                <hr/>
                <MethodStepAndNoteInput type={type} value={item.description} onUpdate={onUpdate} onAdd={() => {
                }}/>
            </>
        )}
    </>;
}

const DraggableList = (props: Props) => {
    const isEditMode = isInEditingMode();
    const [items, setItems] = useState(props.items);
    const [editingItem, setEditingItem] = useState('');
    const type = props.type; // "methodStep", "notes", "ingredient"

    useEffect(() => {
        setItems(props.items);
    }, [props.items]);

    if (_.isEmpty(items)) {
        return <p>None found</p>;
    } else if (isEditMode) {
        return (
            <Reorder.Group axis="y" values={items} onReorder={setItems}>
                {items.map((item, index: number) => (
                    <Reorder.Item key={item.id} value={item}>
                        <div
                            className={classes['draggable-list-item']}
                            onMouseUp={() => {
                                props.onReorder(items)
                            }}
                            onTouchEnd={() => {
                                props.onReorder(items)
                            }}
                        >
                            {editingItem !== item.description && (
                                <>
                                    {renderListItem(type, index, item)}
                                    <Button type="button" onClick={() => {
                                        props.onRemove(item.description);
                                    }}>Remove
                                    </Button>
                                    <Button type="button" onClick={() => {
                                        setEditingItem(item.description);
                                    }}>Edit
                                    </Button>
                                </>
                            )}
                            {editingItem === item.description && renderEditInput(type, item, props.onUpdate, props.onIngredientUpdate)}
                        </div>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        );
    } else {
        return (
            <>
                {items.map((item, index: number) => (
                    <div key={item.description} className={classes['draggable-list-item']}>
                        {renderListItem(type, index, item)}
                    </div>
                ))}
            </>
        );
    }
};

export default DraggableList;
