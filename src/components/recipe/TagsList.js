import React from 'react';
import _ from 'lodash';

const TagsList = (props) => {
    return (
        <div>
            {_.isEmpty(props.tags) && 'No tags available'}
            {!_.isEmpty(props.tags) && props.tags.map(
                tag => <button key={tag.id} type="button"
                               onClick={() => props.onClickHandler(tag.id)}>{tag.name}</button>
            )}
        </div>
    );
};

export default TagsList;