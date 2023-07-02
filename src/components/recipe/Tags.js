import React from 'react';
import TagsList from "./TagsList";
import classes from '../../main.module.css';
import {isAdminUser} from "../../utils/auth";

const Tags = (props) => {
    const isAdmin = isAdminUser();
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