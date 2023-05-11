import {metaActions} from "./meta-slice";
import {toastUtils} from "../utils/toast-utils";

export const fetchUnitsData = () => {
    return async (dispatch) => {
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
            toastUtils().showError("Failed to fetch Units: " + error.message);
        }
    }
};
export const fetchTagsData = () => {
    return async (dispatch) => {
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
            toastUtils().showError("Failed to fetch Tags: " + error.message);
        }
    }
};

export const addTag = (tag) => {
    return async (dispatch) => {
        const toast = toastUtils();
        toast.showLoading("Adding Tag...");

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

            toast.showSuccess("Tag Added");

            dispatch(metaActions.addTag({
                tag: newTag || {}
            }));
        } catch (error) {
            toast.showError(error.message);
        }
    }
};

export const updateTag = (tag) => {
    return async (dispatch) => {
        const toast = toastUtils();
        toast.showLoading("Updating Tag...");

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
            toast.showSuccess("Tag Updated");

            dispatch(metaActions.updateTag({
                tag: updatedTag || {}
            }));
        } catch (error) {
            toast.showError(error.message);
        }
    }
};

export const deleteTag = (id) => {
    return async (dispatch) => {
        const toast = toastUtils();
        toast.showLoading("Deleting Tag...");

        const deleteData = async () => {
            const response = await fetch("http://localhost:8080/api/tags/" + id, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Deleting Tag failed');
            }
        };

        try {
            await deleteData();
            toast.showSuccess("Tag Deleted");

            dispatch(metaActions.deleteTag({
                id: id || 0
            }));
        } catch (error) {
            toast.showError(error.message);
        }
    }
};