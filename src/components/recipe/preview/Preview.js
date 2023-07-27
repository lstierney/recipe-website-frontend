import React from 'react';
import classes from './Preview.module.css';
import {useNavigate} from "react-router-dom";

const Preview = props => {
    const {recipe} = props;
    const imgSrc = process.env.REACT_APP_API_HOST + '/images/' + recipe.imageFileName;
    const navigate = useNavigate();

    const handleClick = id => {
        navigate(`/recipes/${id}`)
    }

    return (
        <div key={recipe.name} className={classes.preview} onClick={() => handleClick(recipe.id)}>
            <img alt={recipe.name} src={imgSrc}/>
            <span className={classes['preview-name']}>{recipe.name}</span>
        </div>
    );
};

export default Preview;