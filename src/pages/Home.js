import {Fragment} from "react";
import {Link, useNavigate} from "react-router-dom";
import classes from '../main.module.css';

const HomePage = () => {
    let navigate = useNavigate();

    const navigateHandler = () => {
        navigate('/recipes');
    }

    return (
        <Fragment>
            <h1>My Veggie Recipes</h1>
            <h2>An opinionated recipe website</h2>
            <section>
                <p className={`${classes.description} ${classes.information}`}>
                    My recipes.<br/>
                    Cooked my way.<br/>
                    Using my measurements.<br/>
                    Referencing my ingredients.<br/>
                    The way I like them<br/>
                </p>
                <p>
                    <br/>Go to <Link to="/recipes">the the list of recipes</Link>
                </p>
                <p>
                    <br/>
                    <button onClick={navigateHandler}>Navigate</button>
                </p>
            </section>
        </Fragment>
    );
}

export default HomePage;