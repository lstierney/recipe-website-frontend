import React, {useEffect, useState} from 'react';
import mainClasses from '../../../main.module.css';
import classes from './InfoPanel.module.css';
import RecipeImage from "../recipeimage/RecipeImage";
import clockImage from "../../../assets/images/clock.svg";
import plateImage from "../../../assets/images/plate.svg";
import bulbImage from "../../../assets/images/light-bulb.svg";
import cookedImage from "../../../assets/images/cooked.svg";
import _ from "lodash";
import {isInEditingMode} from "../../../utils/auth";
import FullScreenImageModal from "../fullscreenimagemodal/FullScreenImageModal";
import {useGetCrockeryQuery} from "../../../store/api";
import {CrockeryType} from "../../../types/crockeryType";
import {RecipeType} from "../../../types/recipeType";
import RecipeLinkParser from "../recipeLinkParser/RecipeLinkParser";
import PinButton from "./pinbutton/PinButton";

type Props = {
    recipe: RecipeType,
    setName: (name: string) => void,
    setDescription: (description: string) => void,
    setCookingTime: (cookingTime: number) => void,
    setCrockery: (crockery: number) => void,
    setBasedOn: (basedOn: string) => void,
    setHeated: (isHeated: boolean) => void,
    setImage: (imageFile: File | undefined) => void
}

const InfoPanel = (props: Props) => {
    const recipe = props.recipe;
    const {data: crockeryList = []} = useGetCrockeryQuery({});
    const isEditMode = isInEditingMode();
    const [showFilePicker, setShowFilePicker] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [cookingTime, setCookingTime] = useState(0);
    const [cooked, setCooked] = useState(0);
    const [crockery, setCrockery] = useState(0);
    const [heated, setHeated] = useState(false);
    const [basedOn, setBasedOn] = useState<string | undefined>('');
    const [imageFileNames, setImageFileNames] = useState<string[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [imgSrc, setImgSrc] = useState('');


    const handleImageClick = () => {
        if (isEditMode) {
            setShowFilePicker(true);
        } else {
            setModalIsOpen(true)
        }
    }
    const closeModal = () => {
        setModalIsOpen(false);
    };
    const handleNameChange = (value: string) => {
        props.setName(value);
        setName(value);
    }
    const handleDescriptionChange = (value: string) => {
        props.setDescription(value);
        setDescription(value);
    }
    const handleCookingTimeChange = (value: number) => {
        props.setCookingTime(value);
        setCookingTime(value);
    }
    const handleBasedOnChange = (value: string) => {
        props.setBasedOn(value);
        setBasedOn(value);
    }
    const handleCrockeryChange = (value: number) => {
        props.setCrockery(value);
        setCrockery(value);
    }
    const handleHeatedChange = (value: boolean) => {
        props.setHeated(value);
        setHeated(value);
    }
    const getCrockeryName = () => {
        const chosen = crockeryList.find((item: CrockeryType) => item.id === crockery);
        return chosen ? chosen.description : '';
    }
    const getHeatedString = () => {
        return heated ? 'Heated' : 'Unheated';
    }

    const formatTime = (timeInMinutes: number): string => {
        if (timeInMinutes < 60) {
            return `${timeInMinutes} mins`;
        } else {
            const hours = Math.floor(timeInMinutes / 60);
            const minutes = timeInMinutes % 60;

            if (minutes === 0) {
                return `${hours} hr${hours > 1 ? 's' : ''}`;
            } else {
                return `${hours} hr${hours > 1 ? 's' : ''} ${minutes} mins`;
            }
        }
    };


    useEffect(() => {
        if (!_.isEmpty(recipe)) {
            setName(recipe.name);
            setDescription(recipe.description);
            setCookingTime(recipe.cookingTime);
            setCooked(recipe.cooked);
            setBasedOn(recipe.basedOn);
            if (!_.isEmpty(recipe.servedOn)) {
                setCrockery(recipe.servedOn.crockery.id);
                setHeated(recipe.servedOn.heated);
            }
            setImageFileNames(recipe.imageFileNames);
            setImgSrc(process.env.REACT_APP_API_HOST + recipe.imageFolderPath + recipe.imageFileNames[0]);
        }
    }, [recipe]);

    useEffect(() => {
        const show: boolean = isEditMode && _.isEmpty(imageFileNames);
        setShowFilePicker(show);
    }, [isEditMode, imageFileNames]);

    return (
        <>
            <section className={mainClasses.information}>
                <FullScreenImageModal imageUrl={imgSrc} isOpen={modalIsOpen} closeModal={closeModal}/>

                <div className={classes['info-panel']}>
                    {!showFilePicker && !_.isEmpty(imageFileNames) &&
                        <RecipeImage imageFolderPath={recipe.imageFolderPath} imageFileName={imageFileNames[0]}
                                     alt={name} onClick={handleImageClick}/>
                    }
                    {showFilePicker && (
                        <>
                            <label htmlFor="image">Choose an image:</label>
                            <input type="file" id="image" name="image" aria-label="Image Chooser Input"
                                   onChange={e => {
                                       const uploadedFile = e.target.files ? e.target.files[0] : undefined;
                                       props.setImage(uploadedFile);
                                   }}
                            />
                        </>
                    )}

                    <div className={classes['info-panel-right']}>
                        {!isEditMode &&
                            <>
                                <div className={classes.name}>
                                    <h1>{name}</h1>
                                </div>
                                <div className={classes.description}>
                                    <p className={mainClasses.description}>
                                        <RecipeLinkParser>{description}</RecipeLinkParser></p>
                                </div>
                            </>
                        }
                        {isEditMode &&
                            <>
                                <label htmlFor="name">Name:</label>
                                <input type="text" aria-label="name" name="name" value={name}
                                       onChange={e => handleNameChange(e.target.value)}/><br/>
                                <label htmlFor="description">Description:</label><br/>
                                <textarea name="description" aria-label="description" rows={10} cols={60}
                                          value={description}
                                          onChange={e => handleDescriptionChange(e.target.value)}/>
                            </>
                        }
                        <div className={classes['icon-strip']}>
                            {!isEditMode && (
                                <>
                                    <div className={classes['icon-text-pair']}>
                                        <img className={classes.icon} src={clockImage} alt="Clock"/>
                                        <p>{formatTime(cookingTime)}</p>
                                    </div>
                                    <div className={classes['icon-text-pair']}>
                                        <img className={classes.icon} src={cookedImage} alt="Cooked"/>
                                        <p>x {cooked}</p>
                                    </div>
                                    {basedOn && (
                                        <div className={classes['icon-text-pair']}>
                                            <img className={classes.icon} src={bulbImage} alt="Light Bulb"/>
                                            <p><a href={basedOn} target="_blank" rel="noreferrer">Inspiration</a></p>
                                        </div>
                                    )}
                                    {crockery > 0 && (
                                        <div className={classes['icon-text-pair']}>
                                            <img className={classes.icon} src={plateImage} alt="Serving Plate"/>
                                            <p>{getHeatedString()} {getCrockeryName()}</p>
                                        </div>
                                    )}
                                    <PinButton recipe={recipe}/>
                                </>
                            )}

                            {isEditMode &&
                                <div className={classes['edit-meta-data']}>
                                    <div>
                                        <label htmlFor="cookingTime">Cooking Time:</label>
                                        <input type="number" aria-label="cookingTime" name="cookingTime"
                                               value={cookingTime}
                                               onChange={e => handleCookingTimeChange(+e.target.value)}/>
                                    </div>
                                    <div>
                                        <label htmlFor="basedOn">Based On:</label>
                                        <input type="text" aria-label="basedOn" name="basedOn" value={basedOn}
                                               onChange={e => handleBasedOnChange(e.target.value)}/>
                                    </div>
                                    <div>
                                        <label htmlFor="crockery">Crockery:</label>
                                        <select id="crockery" defaultValue={crockery} name="crockery"
                                                onChange={e => handleCrockeryChange(+e.target.value)}>
                                            <option key={'pleaseChoose'} value={0}>Please Choose</option>
                                            {crockeryList.map((item: CrockeryType) => <option key={item.id}
                                                                                              value={item.id}>{item.description}</option>)}
                                        </select>
                                        <label htmlFor="heated">Heated:</label>

                                        <input type="radio" aria-label="Heated radio" name="heated"
                                               checked={heated} value={1}
                                               onChange={e => handleHeatedChange(true)}/><label
                                        htmlFor="heated">Yes</label>
                                        <input type="radio" aria-label="Heated radio" name="heated"
                                               checked={!heated} value={0}
                                               onChange={e => handleHeatedChange(false)}/><label
                                        htmlFor="heated">No</label>

                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default InfoPanel;