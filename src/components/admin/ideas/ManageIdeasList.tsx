import React from 'react';
import ManageIdea from "./ManageIdea";
import {useGetIdeasQuery} from "../../../store/api";
import _ from "lodash";
import {IdeaType} from "../../../types/ideaType";

const ManageIdeasList: React.FC = () => {
    const {data: ideas = []} = useGetIdeasQuery({});
    const hasIdeas = !_.isEmpty(ideas);

    return (
        <section>
            <h2>Existing Ideas</h2>
            <ul>
                {hasIdeas && ideas.map((idea: IdeaType) => <ManageIdea key={idea.id} mode="edit" idea={idea}/>)}
                {!hasIdeas && <p>No Ideas to display</p>}
            </ul>
        </section>
    );
};

export default ManageIdeasList;