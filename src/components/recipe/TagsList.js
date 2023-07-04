import React from 'react';
import _ from 'lodash';
import classes from '../../main.module.css';

const TagsList = (props) => {
    return (
        <div className={classes.tagList}>
            {_.isEmpty(props.tags) && 'No tags available'}
            {!_.isEmpty(props.tags) && props.tags.map(
                tag => <button key={tag.id} type="button"
                               onClick={() => props.onClickHandler(tag.id)}>{tag.name}</button>
            )}
        </div>
    );
};

export default TagsList;