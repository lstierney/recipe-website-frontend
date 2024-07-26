import React from 'react';
import ManageTag from "./ManageTag";
import {useGetTagsQuery} from "../../../store/api";
import _ from "lodash";
import {TagType} from "../../../types/tagType";

const ManageTagsList: React.FC = () => {
    const {data: tags = []} = useGetTagsQuery({});
    const hasTags = !_.isEmpty(tags);

    return (
        <section>
            <h2>Existing Tags</h2>
            <ul>
                {hasTags && tags.map((tag: TagType) => <ManageTag key={tag.id} mode="edit" tag={tag}/>)}
                {!hasTags && <p>No tags to display</p>}
            </ul>
        </section>
    );
};

export default ManageTagsList;