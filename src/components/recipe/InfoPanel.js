import React, {useState} from 'react';
import classes from '../../main.module.css';
import RecipeImage from "./RecipeImage";
import clockImage from "../../assets/images/clock.png";
import _ from "lodash";
import {useRouteLoaderData} from "react-router-dom";

const InfoPanel = (props) => {
    const recipe = props.recipe;
    const isAdmin = !_.isEmpty(useRouteLoaderData('root'));
    const [showFilePicker, setShowFilePicker] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [cookingTime, setCookingTime] = useState(0);
    const [imageFileName, setImageFileName] = useState('');

    const handleImageClick = () => {
        if (isAdmin) {
            setShowFilePicker(true);
        }
    }

    const handleNameChange = value => {
        props.setName(value);
        setName(value);
    }
    const handleDescriptionChange = value => {
        props.setDescription(value);
        setDescription(value);
    }
    const handleCookingTimeChange = value => {
        props.setCookingTime(value);
        setCookingTime(value);
    }


    if (!_.isEmpty(recipe)) {
        if (name === '') {
            setName(recipe.name);
        }
        if (description === '') {
            setDescription(recipe.description);
        }
        if (cookingTime === 0) {
            setCookingTime(recipe.cookingTime);
        }
        if (imageFileName === '') {
            setImageFileName(recipe.imageFileName);
        }
    }

    return (
        <>
            <section className={classes.information}>
                <div className={classes.recipe_panel}>
                    {!showFilePicker &&
                        <RecipeImage imageFileName={imageFileName} alt={name} onClick={handleImageClick}/>
                    }
                    {showFilePicker &&
                        <>
                            <label htmlFor="image">Choose an image:</label>
                            <input type="file" id="image" name="image"
                                   onChange={e => props.setImage(e.target.files[0])}/>
                        </>
                    }
                    <div>
                        {!isAdmin &&
                            <>
                                <h1>{name}</h1>
                                <p className={classes.description}>{description}</p>
                            </>
                        }
                        {isAdmin &&
                            <>
                                <label htmlFor="name">Name:</label>
                                <input type="text" name="name" value={name}
                                       onChange={e => handleNameChange(e.target.value)}/><br/>
                                <label htmlFor="description">Description:</label><br/>
                                <textarea name="description" rows="10" cols="60" value={description}
                                          onChange={e => handleDescriptionChange(e.target.value)}/>
                            </>
                        }
                    </div>
                </div>
                <div className={classes.cooking_time}>
                    {!isAdmin &&
                        <>
                            <img src={clockImage} alt="Clock"/>
                            <p>Cook: {cookingTime} mins</p>
                        </>
                    }
                    {isAdmin &&
                        <>
                            <label htmlFor="cookingTime">Cooking Time:</label>
                            <input type="number" name="cookingTime" value={cookingTime}
                                   onChange={e => handleCookingTimeChange(+e.target.value)}/>
                        </>
                    }
                </div>
            </section>
        </>
    );
};

export default InfoPanel;