import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const notifier = (msg, type) => {

    if (type == 'success') {
        toast.success(`${msg}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }
}

