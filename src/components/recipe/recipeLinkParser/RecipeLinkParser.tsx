import React from 'react';
import {Link} from "react-router-dom";
import {startCase} from "lodash";

type Props = {
    children: string,
    dataTestId?: string
};

export const RecipeLinkParser = (props: Props) => {
    const parsedContent = [];

    if (props.children.length > 0) {
        const regex = /(\[r].*?\[\/r])/g;
        const parts = props.children.split(regex);

        for (let i = 0; i < parts.length; i++) {
            if (parts[i].match(regex)) {
                const recipeId = parts[i].replace(/\[r](.*?)\[\/r]/g, '$1');
                parsedContent.push(
                    <Link key={i} to={`/recipes/${recipeId}`}>
                        {startCase(recipeId)}
                    </Link>
                );
            } else {
                parsedContent.push(parts[i]);
            }
        }
    }
    return <span data-testid={props.dataTestId}>{parsedContent}</span>;
}

export default RecipeLinkParser;
