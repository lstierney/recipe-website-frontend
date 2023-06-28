import React from 'react';

const RecipeImage = (props) => {
    const imgSrc = process.env.REACT_APP_API_HOST + '/images/' + props.imageFileName;
    return (
        <div>
            <img alt={props.alt} width="200" height="200" src={imgSrc} onClick={props.onClick}/>
        </div>
    );
};

export default RecipeImage;