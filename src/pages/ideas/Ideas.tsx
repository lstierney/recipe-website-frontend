import React from 'react';
import {useGetIdeasQuery} from "../../store/api";
import {IdeaType} from "../../types/ideaType";
import classes from './Ideas.module.css';

const Ideas = () => {
    const {data, error, isLoading} = useGetIdeasQuery({});
    return (
        <div className={classes.ideas}>
            {error ? (
                <>Oh no, there was an error</>
            ) : isLoading ? (
                <>Loading...</>
            ) : data ? (
                <>
                    <h1>Ideas</h1>
                    <ul>
                        {data.map((idea: IdeaType, index: number) =>
                            <li key={index}><a href={idea.url} title={idea.name}>{idea.name}</a></li>
                        )}
                    </ul>
                </>
            ) : null}
        </div>
    );
};

export default Ideas;