import React from 'react';
import ManageTag from "../../components/admin/tags/ManageTag";
import ManageTagsList from "../../components/admin/tags/ManageTagsList";

const ManageTags = () => {
   return (
       <>
           <h1>Manage Tags</h1>
           <ManageTag mode="add"/>
           <ManageTagsList/>
       </>
   );
};

export default ManageTags;