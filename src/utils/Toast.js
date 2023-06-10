import { toast } from "react-toastify";

export default function Toast(text) {
  toast(text, {
    position: "top-right",
    autoClose: 4500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
}
