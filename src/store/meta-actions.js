import {uiActions} from "./ui-slice";
import {metaActions} from "./meta-slice";

export const fetchUnitsData = () => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Getting data',
            message: 'Loading Unit Data'
        }));
        const fetchData = async () => {
            const response = await fetch('http://localhost:8080/units');

            if (!response.ok) {
                throw new Error('Could not fetch Units data');
            }

            return await response.json();
        };

        try {
            const unitsData = await fetchData();
            dispatch(metaActions.storeUnits({
                units: unitsData || []
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: error.message
            }));
        }
        dispatch(uiActions.hideNotification());
    }
};