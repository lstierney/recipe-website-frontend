import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Id} from "react-toastify/dist/types";

export const toastUtils = () => {
    let toastInstance: Id;

    const error = (message: string) => {
        if (toastInstance) {
            toast.update(toastInstance, {
                    isLoading: false,
                    type: "error",
                    render: message,
                    autoClose: 5000,
                    closeButton: true
                }
            );
        } else {
            toast.error(message);
        }
    }

    const loading = (message: string) => {
        toastInstance = toast.loading(message, {});
    }

    const success = (message: string) => {
        if (toastInstance) {
            toast.update(toastInstance, {
                isLoading: false,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                render: message,
                type: "success",
                closeButton: true
            })
        } else {
            toast.success(message);
        }
    }

    const dismiss = () => {
        if (toastInstance) {
            toast.dismiss(toastInstance);
        }
    }

    return {
        error,
        loading,
        success,
        dismiss
    }
}

