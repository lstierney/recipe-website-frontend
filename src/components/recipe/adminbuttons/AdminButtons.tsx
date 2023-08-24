import React, {useCallback, useEffect, useState} from 'react';
import {isAdminUser, isInEditingMode} from '../../../utils/auth';
import Button from "../../button/Button";
import {useLocation} from "react-router-dom";

type Props = {
    onEditModeChange(isEditMode: boolean): void,
    addRecipeHandler(): void,
    children: React.ReactNode
}

const AdminButtons: React.FC<Props> = props => {
    const [isEditMode, setIsEditMode] = useState(false);
    const isAdmin = isAdminUser();
    const location = useLocation();
    const onEditModeChange = props.onEditModeChange;

    const enterEditMode = useCallback(() => {
        setIsEditMode(true);
        onEditModeChange(true);
    }, [onEditModeChange]);

    const leaveEditMode = useCallback(() => {
        setIsEditMode(false);
        onEditModeChange(false);
    }, [onEditModeChange]);

    useEffect(() => {
        if (location.pathname === '/admin/addRecipe' && isAdmin) {
            enterEditMode();
        }
        if (isInEditingMode()) {
            setIsEditMode(true);
        }
    }, [isAdmin, location.pathname, enterEditMode]);

    const buttonContent = () => {
        return (
            <div>
                {isAdmin ? (
                    isEditMode ? (
                        <Button type="button" onClick={leaveEditMode}>Read Only Mode</Button>
                    ) : (
                        <Button type="button" onClick={enterEditMode}>Edit Mode</Button>
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