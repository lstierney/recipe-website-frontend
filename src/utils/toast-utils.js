import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const toastUtils = () => {
    let toastInstance;


    const showError = message => {
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

    const showLoading = message => {
        toastInstance = toast.loading(message,

            {});
    }

    const showSuccess = message => {
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
        showError,
        showLoading,
        showSuccess,
        dismiss
    }
}

