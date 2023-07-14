import React from 'react';
import AddTag from "../../components/admin/tags/Add";
import List from "../../components/admin/tags/List";

const ManageTags = () => {
   return (
       <>
           <h1>Manage Tags</h1>
           <AddTag mode="add"/>
           <List/>
       </>
   );
};

export default ManageTags;