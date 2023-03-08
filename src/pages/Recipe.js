import React from 'react';
import {Link, useParams} from "react-router-dom";

const Recipe = () => {
    const params = useParams();

    return (
        <>
            <h1>Recipe</h1>
            <p>{params.recipeId}</p>
            <p><Link to=".." relative="path">Back</Link></p>
        </>
    );
};

export default Recipe;