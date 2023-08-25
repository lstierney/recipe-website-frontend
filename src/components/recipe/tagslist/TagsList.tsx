import React from 'react';
import _ from 'lodash';
import classes from './TagsList.module.css';
import Button from "../../button/Button";
import {TagType} from "../../../types/tagType";

type Props = {
    tags: TagType[],
    onClickHandler: (tagId: number) => void
}

const TagsList = (props: Props) => {
    return (
        <div className={classes['tags-list']}>
            {_.isEmpty(props.tags) && 'No tags available'}
            {!_.isEmpty(props.tags) && props.tags.map(
                tag => <Button key={tag.name} type="button" ariaLabel={`${tag.name} button`}
                               onClick={() => props.onClickHandler(tag.id)}>{tag.name}</Button>
            )}
        </div>
    );
};

export default TagsList;