import classes from '../main.module.css';
import LatestRecipe from "../components/LatestRecipe";

const HomePage = () => {
    return (
        <>
            <h1>{process.env.REACT_APP_PAGE_TITLE}</h1>
            <h2>An opinionated recipe website</h2>
            <section>
                <p className={`${classes.description} ${classes.information} ${classes.curly_text}`}>
                    My recipes.<br/>
                    Cooked my way.<br/>
                    Using my measurements.<br/>
                    Using my ingredients.<br/>
                    The way I like them<br/>
                </p>
                <LatestRecipe/>
            </section>
        </>
    );
}

export default HomePage;