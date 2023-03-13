import React from 'react';
import AddTag from "../../components/admin/AddTag";
import TagsList from "../../components/admin/TagsList";

const ManageTags = () => {
    return (
        <>
            <h1>Manage Tags</h1>
            <AddTag mode="add"/>
            <TagsList/>
        </>
    );
};

export default ManageTags;