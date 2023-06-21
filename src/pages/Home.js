import {Link} from "react-router-dom";
import classes from '../main.module.css';

const HomePage = () => {
    return (
        <>
            <h1>{process.env.REACT_APP_PAGE_TITLE}</h1>
            <h2>An opinionated recipe website</h2>
            <section>
                <p className={`${classes.description} ${classes.information}`}>
                    My recipes.<br/>
                    Cooked my way.<br/>
                    Using my measurements.<br/>
                    Using my ingredients.<br/>
                    The way I like them<br/>
                </p>
                <Link to="/recipes"><h3>the list of recipes</h3></Link>
            </section>
        </>
    );
}

export default HomePage;