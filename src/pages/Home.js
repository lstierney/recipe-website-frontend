import {Link, useNavigate} from "react-router-dom";
import classes from '../main.module.css';
import config from "../config";

const HomePage = () => {
    let navigate = useNavigate();

    const navigateHandler = () => {
        navigate('/recipes');
    }

    return (
        <>
            <h1>{config.PAGE_TITLE}</h1>
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
        </>
    );
}

export default HomePage;