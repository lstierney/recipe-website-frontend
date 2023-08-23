import React from 'react';
import AddTag from "./Add";
import {useGetTagsQuery} from "../../../store/api";
import _ from "lodash";
import {Tag} from "../../../types/tag";

const List: React.FC = () => {
    const {data: tags = []} = useGetTagsQuery({});
    const hasTags = !_.isEmpty(tags);

    return (
        <section>
            <h2>Existing Tags</h2>
            <ul>
                {hasTags && tags.map((tag: Tag) => <AddTag key={tag.id} mode="edit" tag={tag}/>)}
                {!hasTags && <p>No tags to display</p>}
            </ul>
        </section>
    );
};

export default List;