import React from 'react';
import {Link} from "react-router-dom";

const AdminHomePage = () => {
    return (
        <>
            <h1>Admin</h1>
            <section>
                <ul>
                    <li><Link to="/admin/addRecipe">Add a Recipe</Link></li>
                    <li><Link to="/admin/manageTags">Manage Tags</Link></li>
                </ul>
            </section>
        </>
    );
};

export default AdminHomePage;