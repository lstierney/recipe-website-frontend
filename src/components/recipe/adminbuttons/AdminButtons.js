import React, {useEffect, useState} from 'react';
import {isAdminUser} from '../../../utils/auth';
import Button from "../../button/Button";
import {useLocation} from "react-router-dom";

const AdminButtons = props => {
    const [isEditMode, setIsEditMode] = useState(false);
    const isAdmin = isAdminUser();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/admin/addRecipe' && isAdmin) {
            handleEnterEditMode();
        }
        return () => {
            handleLeaveEditMode();
        }
    }, [isAdmin, location.pathname]);

    const handleEnterEditMode = () => {
        setIsEditMode(true);
        props.onEditModeChange(true);
    }
    const handleLeaveEditMode = () => {
        setIsEditMode(false);
        props.onEditModeChange(false);
    }

    const buttonContent = () => {
        return (
            <div>
                {isAdmin ? (
                    isEditMode ? (
                        <Button type="button" onClick={handleLeaveEditMode}>Read Only Mode</Button>
                    ) : (
                        <Button type="button" onClick={handleEnterEditMode}>Edit Mode</Button>
                    )
                ) : null}
                {isEditMode &&
                    <Button type="submit" onClick={props.addRecipeHandler}>Submit</Button>}
            </div>
        );
    }

    return (
        <>
            {buttonContent()}
            {props.children}
            {buttonContent()}
        </>
    );
};

export default AdminButtons;