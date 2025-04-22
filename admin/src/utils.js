import { ToastContainer, toast } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";  

export const handleSuccess = (msg) => {
    alert(msg); // or use a toast library
  };
  
  export const handleError = (msg) => {
    alert(`Error: ${msg}`); // or toast.error(msg)
  };
  