import React from 'react';
import _ from 'lodash';
import classes from '../../main.module.css';
import Button from "../button/Button";

const TagsList = (props) => {
    return (
        <div className={classes.tagList}>
            {_.isEmpty(props.tags) && 'No tags available'}
            {!_.isEmpty(props.tags) && props.tags.map(
                tag => <Button key={tag.name} type="button"
                               onClick={() => props.onClickHandler(tag.id)}>{tag.name}</Button>
            )}
        </div>
    );
};

export default TagsList;