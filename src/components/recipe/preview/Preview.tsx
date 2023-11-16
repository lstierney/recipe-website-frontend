import React, {useState} from 'react';
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
    const [isCookedClicked, setIsCookedClicked] = useState(false);

    const handleClick = (name: string) => {
        name = name.replace(/ /g, '-').toLowerCase();
        navigate(`/recipes/${name}`);
    }
    const handleCookedClick = (e: React.MouseEvent<HTMLSpanElement>, name: string | undefined) => {
        e.stopPropagation();
        setIsCookedClicked(!isCookedClicked);
    };

    const formatLastCookedDate = (dateString: string | undefined) => {
        if (dateString !== null && dateString !== undefined) {
            const date = new Date(dateString);

            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear().toString().slice(-2);

            return `${day}/${month}/${year}`;
        } else {
            return 'No date';
        }
    }

    return (
        <div key={recipe.name} className={classes.preview} onClick={() => handleClick(recipe.name)}>
            <div className={classes['image-container']}>
                <img className={classes['preview-img']} alt={recipe.name} src={imgSrc}/>
                <span className={classes['overlay-digits']} onClick={(e) => handleCookedClick(e, recipe.lastCooked)}>
                    <img className={classes.icon} src={cookedImage} alt="Number of times cooked"/>
                    {!isCookedClicked && recipe.cooked}
                    {isCookedClicked && formatLastCookedDate(recipe.lastCooked)}
                </span>
            </div>
            <span className={classes['preview-name']}>{recipe.name}</span>
        </div>

    );
};

export default Preview;