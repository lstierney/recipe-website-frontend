import React, {useState} from 'react';
import classes from './Convertor.module.css';

const Convertor = () => {
    const gramsPerOunce = 28.35;
    const [outputOunces, setOutputOunces] = useState(0);
    const [inputQuantity, setInputQuantity] = useState(0);
    const [inputServings, setInputServings] = useState(0);
    const [newQuantity, setNewQuantity] = useState(0);

    const handleGramsToOunces = grams => {
        setOutputOunces(Math.round(grams / gramsPerOunce * 2) / 2); // round to the nearest 0.5
    }

    const handleServingsChanges = newServings => {
        setNewQuantity((inputQuantity / inputServings) * newServings);
    }

    return (
        <>
            <h1>Convertors</h1>
            <section className={classes['convertor-content']}>
                <h2>Grams to Ounces</h2>

                <label htmlFor="inputGrams">Grams</label>
                <input type="number" id="inputGrams" name="inputGrams"
                       onChange={e => handleGramsToOunces(+e.target.value)}/>


                <label htmlFor="outputOunces">Ounces</label>
                <input type="text" id="outputOunces" disabled={true} inputMode="numeric" name="outputOunces"
                       value={outputOunces}/>

                <h2>Portions</h2>

                <label htmlFor="inputQuantity">Quantity</label>
                <input type="number" id="inputQuantity" name="inputQuantity"
                       onChange={e => setInputQuantity(+e.target.value)}/>

                <label htmlFor="inputServings">Servings</label>
                <input type="number" id="inputServings" name="inputServings"
                       onChange={e => setInputServings(+e.target.value)}/>
                <label htmlFor="inputNewServings">New Servings</label>
                <input type="number" id="inputNewServings" name="inputNewServings"
                       onChange={e => handleServingsChanges(+e.target.value)}/>

                <label htmlFor="newQuantity">New Quantity</label>
                <input type="text" id="newQuantity" disabled={true} inputMode="numeric" name="newQuantity"
                       value={newQuantity}/>

            </section>
        </>
    );
};

export default Convertor;