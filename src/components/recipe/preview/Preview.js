import React from 'react';
import classes from './Preview.module.css';
import mainClasses from '../../../main.module.css';
import {useNavigate} from "react-router-dom";

const Preview = props => {
    const {recipe} = props;
    const imgSrc = process.env.REACT_APP_API_HOST + '/images/' + recipe.imageFileName;
    const navigate = useNavigate();

    const handleClick = id => {
        navigate(`/recipes/${id}`)
    }

    return (
        <div className={`${classes.preview} ${mainClasses.information}`} onClick={() => handleClick(recipe.id)}>
            <div>
                <img alt={recipe.name} width="100" height="100" border="0" src={imgSrc}/>
            </div>
            <div className={`${classes['preview-text']} ${mainClasses.description}`}>
                <div className={`${mainClasses.curly_text} ${classes['preview-name']}`}>{recipe.name}</div>
                <div className={classes['preview-description']}>{recipe.description}</div>
            </div>
        </div>
    );
};

export default Preview;