import React from 'react';
import TagsList from "../tagslist/TagsList";
import classes from '../../../main.module.css';
import {isInEditingMode} from "../../../utils/auth";
import {TagType} from "../../../types/tagType";

type Props = {
    availableTags: TagType[],
    selectedTags: TagType[],
    onAdd: (id: number) => void,
    onRemove: (id: number) => void,
    onSearch: (id: number) => void
}

const Tags = (props: Props) => {
    const isEditMode = isInEditingMode();
    const onClickSelectedTag = isEditMode ? props.onRemove : props.onSearch;

    return (
        <section>
            {isEditMode && <>
                <h2 className={classes.left_align}>Tags</h2>
                <h3 className={classes.left_align}>Available</h3>
                <TagsList tags={props.availableTags} onClickHandler={props.onAdd}/>
                <h3 className={classes.left_align}>Selected</h3>
            </>
            }
            <TagsList tags={props.selectedTags} onClickHandler={onClickSelectedTag}/>
        </section>
    );
};

export default Tags;