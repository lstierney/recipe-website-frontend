import React, {useCallback, useEffect, useState} from 'react';
import pinImage from "../../../../assets/images/pin.svg";
import unpinImage from "../../../../assets/images/unpin.svg";
import classes from '../InfoPanel.module.css';
import {RecipeType} from "../../../../types/recipeType";

type Props = {
    recipe: RecipeType;
}
const PinButton = ({recipe}: Props) => {
    const checkIsPinned = useCallback((): boolean => {
        if (recipe && recipe.name) {
            const item = localStorage.getItem('pinnedRecipes');
            const recipes: string[] = item ? JSON.parse(item) : [];
            return recipes.includes(recipe.name);
        }
        return false;
    }, [recipe]);

    const [isPinned, setIsPinned] = useState<boolean>(checkIsPinned());

    useEffect(() => {
        setIsPinned(checkIsPinned());
    }, [checkIsPinned, recipe]);

    const togglePinned = () => {
        if (isPinned) {
            unpinRecipe();
        } else {
            pinRecipe();
        }
        setIsPinned(!isPinned);
    }

    const pinRecipe = () => {
        const item = localStorage.getItem('pinnedRecipes');
        const recipes: string[] = item ? JSON.parse(item) : [];
        recipes.push(recipe.name!);
        localStorage.setItem('pinnedRecipes', JSON.stringify(recipes));
    }

    const unpinRecipe = () => {
        const item = localStorage.getItem('pinnedRecipes');
        const recipes: string[] = item ? JSON.parse(item) : [];
        const index = recipes.indexOf(recipe.name!);
        if (index > -1) {
            recipes.splice(index, 1);
        }
        localStorage.setItem('pinnedRecipes', JSON.stringify(recipes));
    }

    return (
        <div className={classes['icon-text-pair']}>
            <img
                className={classes.icon}
                src={isPinned ? unpinImage : pinImage}
                alt={isPinned ? 'Unpin' : 'Pin'}
            />
            <p>
                <button
                    type={"button"}
                    onClick={togglePinned}
                    className={classes['button-link']}
                    title={isPinned ? 'Unpin Recipe' : 'Pin Recipe'}
                >
                    {isPinned ? 'Unpin' : 'Pin'}
                </button>
            </p>
        </div>
    );
};

export default PinButton;