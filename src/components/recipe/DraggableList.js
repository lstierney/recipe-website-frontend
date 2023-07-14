import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import classes from '../../main.module.css';
import {Reorder} from "framer-motion";
import {isAdminUser} from "../../utils/auth";
import {toastUtils} from "../../utils/toast-utils";
import {useGetUnitsQuery} from "../../store/api";

const toast = toastUtils();

const DraggableList = (props) => {
    const {data: units = [], isError} = useGetUnitsQuery();
    const isAdmin = isAdminUser();
    const [items, setItems] = useState(props.items);
    const type = props.type; // methodSteps, notes etc

    useEffect(() => {
        setItems(props.items);
    }, [props.items]);

    // For a given Ingredient, returns the human-readable label for its Unit (if it has a Unit)
    const getUnitDescriptionForIngredient = (ingredient) => {
        if (!units) {
            return '';
        }
        const filteredUnits = units.filter(
            (unit) =>
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


    if (isError) {
        toast.error("An error occurred");
    } else {
        if (_.isEmpty(items)) {
            return <p>None found</p>;
        } else if (isAdmin) {
            return (
                <Reorder.Group axis="y" values={items} onReorder={setItems}>
                    {items.map((item, index) => (
                        <Reorder.Item key={item.id} value={item}>
                            <div
                                className={classes.draggable_list_item}
                                onMouseUp={() => {
                                    props.onReorder(items);
                                }}
                            >
                                {type === 'methodSteps' && (
                                    <>
                                        <span className={classes.step}>STEP {index + 1}</span>
                                        <br/>
                                    </>
                                )}
                                {type === 'ingredients' && (
                                    <>
                                        {item.quantity > 0 ? item.quantity : ''}
                                        {getUnitDescriptionForIngredient(item)}&nbsp;
                                    </>
                                )}
                                {item.description}&nbsp;
                                <button
                                    type="button"
                                    onClick={() => {
                                        props.onRemove(item.description);
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            );
        } else {
            return (
                <ul>
                    {items.map((item, index) => (
                        <li key={item.description}>
                            <div className={classes.draggable_list_item}>
                                {type === 'methodSteps' && (
                                    <>
                                        <span className={classes.step}>STEP {index + 1}</span>
                                        <br/>
                                    </>
                                )}
                                {type === 'ingredients' && (
                                    <>
                                        {item.quantity > 0 ? item.quantity : ''}
                                        {getUnitDescriptionForIngredient(item)}&nbsp;
                                    </>
                                )}
                                {item.description}
                            </div>
                        </li>
                    ))}
                </ul>
            );
        }
    }


};

export default DraggableList;
