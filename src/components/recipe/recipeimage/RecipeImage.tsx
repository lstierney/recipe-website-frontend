import React from 'react';
import classes from './RecipeImage.module.css';

type Props = {
    alt: string,
    onClick: () => void,
    imageFileName: string
}

const RecipeImage = (props: Props) => {
    const imgSrc = process.env.REACT_APP_API_HOST + '/images/' + props.imageFileName;
    return (
        <div>
            <img className={classes.image} alt={props.alt} src={imgSrc} onClick={props.onClick}/>
        </div>
    );
};

export default RecipeImage;