import React from 'react';
import classes from './RecipeImage.module.css';

const RecipeImage = props => {
    const imgSrc = process.env.REACT_APP_API_HOST + '/images/' + props.imageFileName;
    return (
        <div>
            <img className={classes.image} alt={props.alt} src={imgSrc} onClick={props.onClick}/>
        </div>
    );
};

export default RecipeImage;