import {Link} from "react-router-dom";

const RECIPES = [
    {id: '1', title: 'Recipe 1'},
    {id: '2', title: 'Recipe 2'},
    {id: '6', title: 'Recipe 6'},
];

const Recipes = () => {
    return (
        <>
            <h1>The recipes page!</h1>
            <ul>
                {RECIPES.map(recipe =>
                    <li key={recipe.id}>
                        <Link to={`/recipes/${recipe.id}`}>
                            {recipe.title}
                        </Link>
                    </li>
                )}
            </ul>
        </>
    );
}
export default Recipes;