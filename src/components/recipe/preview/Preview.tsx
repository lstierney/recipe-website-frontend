import React from 'react';
import classes from './Preview.module.css';
import {useNavigate} from "react-router-dom";
import {RecipePreviewType} from "../../../types/recipePreviewType";
import cookedImage from "../../../assets/images/cooked.svg";

type Props = {
    recipe: RecipePreviewType
}

const Preview = (props: Props) => {
    const {recipe} = props;
    const imgSrc = process.env.REACT_APP_API_HOST + '/images/' + recipe.imageFileName;
    const navigate = useNavigate();

    const handleClick = (name: string) => {
        name = name.replace(/ /g, '-').toLowerCase();
        navigate(`/recipes/${name}`);
    }

    return (
        <div key={recipe.name} className={classes.preview} onClick={() => handleClick(recipe.name)}>
            <div className={classes['image-container']}>
                <img className={classes['preview-img']} alt={recipe.name} src={imgSrc}/>
                <span className={classes['overlay-digits']}>
                    <img className={classes.icon} src={cookedImage} alt="Number of times cooked"/>
                    {recipe.cooked}
                </span>
            </div>
            <span className={classes['preview-name']}>{recipe.name}</span>
        </div>

    );
};

export default Preview;