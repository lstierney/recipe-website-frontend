import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import classes from './DraggableList.module.css';
import {Reorder} from "framer-motion";
import {isInEditingMode} from "../../../utils/auth";
import Ingredient from "../ingredient/Ingredient";
import MethodStep from "../methodstep/MethodStep";
import Note from "../note/Note";
import Button from "../../button/Button";

const renderListItem = (type, index, item) => {
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

const DraggableList = (props) => {
    const isEditMode = isInEditingMode();
    const [items, setItems] = useState(props.items);
    const type = props.type; // methodStep, notes, ingredient

    useEffect(() => {
        setItems(props.items);
    }, [props.items]);

    if (_.isEmpty(items)) {
        return <p>None found</p>;
    } else if (isEditMode) {
        return (
            <Reorder.Group axis="y" values={items} onReorder={setItems}>
                {items.map((item, index) => (
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
                            {renderListItem(type, index, item)}
                            <Button type="button" onClick={() => {
                                props.onRemove(item.description);
                            }}>Remove
                            </Button>
                        </div>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        );
    } else {
        return (
            <>
                {items.map((item, index) => (
                    <div key={item.description} className={classes['draggable-list-item']}>
                        {renderListItem(type, index, item)}
                    </div>
                ))}
            </>
        );
    }
};

export default DraggableList;
