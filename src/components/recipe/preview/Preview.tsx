import React from 'react';
import classes from './Preview.module.css';
import {useNavigate} from "react-router-dom";
import {RecipeType} from "../../../types/recipeType";

type Props = {
    recipe: RecipeType
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
            <img alt={recipe.name} src={imgSrc}/>
            <span className={classes['preview-name']}>{recipe.name}</span>
        </div>
    );
};

export default Preview;