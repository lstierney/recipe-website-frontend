import React from 'react';
import classes from './Switcher.module.css';

type Props = {
    handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectedOption: string
}

const Switcher = (props: Props) => {
    return (
        <div className={classes.switch}>
            <div>
                <input
                    type="radio"
                    id="random"
                    name="recipeListType"
                    value="random"
                    onChange={props.handleRadioChange}
                    defaultChecked={props.selectedOption === 'random'}
                />
                <label htmlFor="random">random</label>
            </div>
            <div>
                <input
                    type="radio"
                    id="latest"
                    name="recipeListType"
                    value="latest"
                    onChange={props.handleRadioChange}
                    defaultChecked={props.selectedOption === 'latest'}
                />
                <label htmlFor="latest">latest</label>
            </div>
        </div>
    );
};

export default Switcher;