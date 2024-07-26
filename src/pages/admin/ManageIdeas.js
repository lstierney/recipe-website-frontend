import React from 'react';
import ManageIdea from "../../components/admin/ideas/ManageIdea";
import ManageIdeasList from "../../components/admin/ideas/ManageIdeasList";

const ManageIdeas = () => {
    return (
        <>
            <h1>Manage Ideas</h1>
            <ManageIdea mode="add"/>
            <ManageIdeasList/>
        </>
    );
};

export default ManageIdeas;