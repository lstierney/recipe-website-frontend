import React from 'react';
import TagsList from "./TagsList";
import _ from "lodash";
import {useRouteLoaderData} from "react-router-dom";
import classes from '../../main.module.css';

const Tags = (props) => {
    const isAdmin = !_.isEmpty(useRouteLoaderData('root'));
    const onRemove = isAdmin ? props.onRemove : undefined;

    return (
        <section>
            {isAdmin && <>
                <h2 className={classes.left_align}>Tags</h2>
                <h3 className={classes.left_align}>Available</h3>
                <TagsList tags={props.availableTags} onClickHandler={props.onAdd}/>
                <h3 className={classes.left_align}>Selected</h3>
            </>
            }
            <TagsList tags={props.selectedTags} onClickHandler={onRemove}/>
        </section>
    );
};

export default Tags;