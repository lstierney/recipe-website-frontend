import {Fragment} from "react";
import {Link, useNavigate} from "react-router-dom";

const HomePage = () => {
    let navigate = useNavigate();

    const navigateHandler = () => {
        navigate('/recipes');
    }

    return (
        <Fragment>
            <h1>My Veggie Recipes</h1>
            <p>
                Go to <Link to="/recipes">the the list of recipes</Link>
            </p>
            <p>
                <button onClick={navigateHandler}>Navigate</button>
            </p>
        </Fragment>
    );
}

export default HomePage;