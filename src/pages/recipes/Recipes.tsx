import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import classes from "./Recipes.module.css";
import { useGetRecipesByTagQuery, useGetRecipeTitlesAndIdsQuery, useGetTagsQuery } from "../../store/api";
import Button from "../../components/button/Button";
import closeImage from "../../assets/images/close-circle.svg";
import { TagType } from "../../types/tagType";
import RecipesList from "../../components/recipe/recipeslist/RecipesList";

const Recipes = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const tagsQueryParam = searchParams.get("tags");
    const tagNames = tagsQueryParam ? tagsQueryParam.split(",") : [];
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const { data: tags = [] } = useGetTagsQuery({});
    const { data: recipesForTags = [] } = useGetRecipesByTagQuery(tagNames);
    const { data: allRecipes } = useGetRecipeTitlesAndIdsQuery({});

    const handleAddTag = (tagName: string) => {
        if (!selectedTags.includes(tagName)) {
            const updatedTags = [...selectedTags, tagName];
            setSelectedTags(updatedTags);
            performSearch(updatedTags);
        }
    };

    const removeSearchParam = (tagName: string) => {
        const updatedTags = selectedTags.filter((tag) => tag !== tagName);
        setSelectedTags(updatedTags);
        performSearch(updatedTags);
    };

    const performSearch = (updatedTags: string[]) => {
        const queryParams = updatedTags.length > 0 ? `?tags=${updatedTags.join(",")}` : "";
        navigate(`/recipes${queryParams}`);
    };

    return (
        <>
            <section className={classes["tagList-search"]}>
                {tags.length <= 0 && <h2>No tags found</h2>}
                {tags.map((tag: TagType) => (
                    <Button type="button" onClick={() => handleAddTag(tag.name)} key={tag.id}>
                        {tag.name}
                    </Button>
                ))}
            </section>

            {selectedTags.length > 0 && (
                <>
                    <div className={classes["recipes-for"]}>
                        {selectedTags.map((tag) => (
                            <div className={classes["selected-tags"]} key={tag}>
                                <h2>{tag}</h2>
                                <img src={closeImage} className={classes.close} alt="Clear Filter" aria-label="Clear Filter" onClick={() => removeSearchParam(tag)} />
                            </div>
                        ))}
                    </div>
                    <RecipesList recipes={recipesForTags} />
                </>
            )}

            {selectedTags.length === 0 && <RecipesList recipes={allRecipes} />}
        </>
    );
};

export default Recipes;
