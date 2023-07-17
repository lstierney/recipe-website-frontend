import RecipesList from "../../components/recipe/recipeslist/RecipesList";
import {useNavigate, useSearchParams} from "react-router-dom";
import classes from './Search.module.css';
import {useGetRecipesByTagQuery, useGetTagsQuery} from "../../store/api";
import Button from "../../components/button/Button";
import _ from 'lodash';

const Search = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const tagName = searchParams.get('tag');
    const {data: tags = []} = useGetTagsQuery();
    const {data: recipesByTag = []} = useGetRecipesByTagQuery(tagName, {skip: _.isEmpty(tagName)});

    const performSearchHandler = tagName => {
        navigate("/search?tag=" + tagName);
    };

    return (
        <>
            <h1>Search by Tag</h1>
            <section className={classes['tagList-search']}>
                {!tags.length > 0 && <h2>No tags found</h2>}
                {tags.map(tag =>
                    <Button type="button" onClick={() => performSearchHandler(tag.name)}
                            key={tag.id}>{tag.name}</Button>
                )}
            </section>
            {tagName &&
                <>
                    <h2>Recipes for Tag "{tagName}"</h2>
                    <RecipesList recipes={recipesByTag}/>
                </>
            }
        </>
    );
};

export default Search;