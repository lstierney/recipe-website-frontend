import React, {useCallback, useEffect, useState} from 'react';
import {isAdminUser, isInEditingMode} from '../../../utils/auth';
import Button from "../../button/Button";
import {useLocation} from "react-router-dom";
// TS2322: Type '(e: any) => Promise<void>' is not assignable to type '() => void'.
type Props = {
    onEditModeChange(isEditMode: boolean): void,
    addRecipeHandler(e: any): Promise<void>,
    onMarkRecipeAsCooked: () => void,
    children: React.ReactNode
}

const AdminButtons = (props: Props) => {
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
                        <>
                            <Button type="button" onClick={leaveEditMode}>Read Only Mode</Button>
                            <Button type="button" onClick={props.onMarkRecipeAsCooked}>Mark as Cooked</Button>
                        </>

                    ) : (
                        <>
                            <Button type="button" onClick={enterEditMode}>Edit Mode</Button>
                            <Button type="button" onClick={props.onMarkRecipeAsCooked}>Mark as Cooked</Button>
                        </>
                    )
                ) : null}
                {isEditMode && (
                    <>
                        <Button type="submit" onClick={props.addRecipeHandler}>Submit</Button>
                    </>
                )}
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