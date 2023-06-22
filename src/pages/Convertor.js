import React, {useState} from 'react';
import classes from '../main.module.css';

const Convertor = () => {
    const gramsPerOunce = 28.35;
    const [outputOunces, setOutputOunces] = useState(0);
    const [inputQuantity, setInputQuantity] = useState(0);
    const [inputServings, setInputServings] = useState(0);
    const [newQuantity, setNewQuantity] = useState(0);

    const handleGramsToOunces = (grams) => {
        setOutputOunces(Math.round(grams / gramsPerOunce * 2) / 2); // round to the nearest 0.5
    }

    const handleServingsChanges = (newServings) => {
        setNewQuantity((inputQuantity / inputServings) * newServings);
    }

    return (
        <div>
            <h1>Convertors</h1>
            <section>
                <h2 className={classes.left_align}>Grams to Ounces</h2>
                <div>
                    <label htmlFor="inputGrams">Grams</label>
                    <input type="number" id="inputGrams" name="inputGrams"
                           onChange={e => handleGramsToOunces(+e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="outputOunces">Ounces</label>
                    <input type="text" id="outputOunces" disabled={true} inputMode="numeric" name="outputOunces"
                           value={outputOunces}/>
                </div>
            </section>
            <section>
                <h2 className={classes.left_align}>Portions</h2>
                <div>
                    <div>
                        <label htmlFor="inputQuantity">Quantity</label>
                        <input type="number" id="inputQuantity" name="inputQuantity"
                               onChange={e => setInputQuantity(+e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="inputServings">Servings</label>
                        <input type="number" id="inputServings" name="inputServings"
                               onChange={e => setInputServings(+e.target.value)}/>
                    </div>

                    <div><label htmlFor="inputNewServings">New Servings</label>
                        <input type="number" id="inputNewServings" name="inputNewServings"
                               onChange={e => handleServingsChanges(+e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="newQuantity">New Quantity</label>
                        <input type="text" id="newQuantity" disabled={true} inputMode="numeric" name="newQuantity"
                               value={newQuantity}/>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Convertor;