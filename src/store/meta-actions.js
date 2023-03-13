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
export const fetchTagsData = () => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Getting Data',
            message: 'Loading Tag Data'
        }));
        const fetchData = async () => {
            const response = await fetch('http://localhost:8080/api/tags');

            if (!response.ok) {
                throw new Error('Could not fetch Tags data');
            }

            return await response.json();
        };

        try {
            const tagsData = await fetchData();
            dispatch(metaActions.storeTags({
                tags: tagsData || []
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

export const addTag = (tag) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending Data',
            message: 'Sending Tag Data'
        }));
        const postData = async () => {
            const response = await fetch("http://localhost:8080/api/tags", {
                method: 'POST',
                body: JSON.stringify(tag),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Sending Tag data failed');
            }
            return await response.json();
        };

        try {
            const newTag = await postData();
            dispatch(metaActions.addTag({
                tag: newTag || {}
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

export const updateTag = (tag) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending Data',
            message: 'Sending Updated Tag Data'
        }));
        const putData = async () => {
            const response = await fetch("http://localhost:8080/api/tags/" + tag.id, {
                method: 'PUT',
                body: JSON.stringify(tag),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Sending updated Tag data failed');
            }
            return await response.json();
        };

        try {
            const updatedTag = await putData();
            dispatch(metaActions.updateTag({
                tag: updatedTag || {}
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

export const deleteTag = (id) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending Data',
            message: 'Deleting Tag'
        }));
        const deleteData = async () => {
            const response = await fetch("http://localhost:8080/api/tags/" + id, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Deleting Tag failed');
            }
        };

        try {
            await deleteData()
            dispatch(metaActions.deleteTag({
                id: id || 0
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