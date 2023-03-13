import React from 'react';
import {useSelector} from "react-redux";
import AddTag from "./AddTag";

const TagsList = () => {
    const tags = useSelector(state => state.meta.tags);
    const hasTags = tags !== undefined && tags.length > 0;

    return (
        <section>
            <h2>Existing Tags</h2>
            <ul>
                {hasTags && tags.map(tag => <AddTag key={tag.id} mode="edit" tag={tag}/>)}
                {!hasTags && <p>No tags to display</p>}
            </ul>
        </section>
    );
};

export default TagsList;