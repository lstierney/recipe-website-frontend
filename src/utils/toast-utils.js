import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const toastUtils = () => {
    let toastInstance;


    const error = message => {
        if (toastInstance) {
            toast.update(toastInstance, {
                    isLoading: false,
                    type: "error",
                    render: message,
                    autoClose: 5000
                }
            );
        } else {
            toast.error(message);
        }
    }

    const loading = message => {
        toastInstance = toast.loading(message, {});
    }

    const success = message => {
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
                type: "success"
            })
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

