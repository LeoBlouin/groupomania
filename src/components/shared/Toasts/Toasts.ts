import { createToast } from "mosha-vue-toastify";
import type { ToastType } from "mosha-vue-toastify";

const defaultToast = (text: string, type: ToastType | undefined) => {
  const formattedText = text.charAt(0).toUpperCase() + text.slice(1);
  createToast(formattedText, {
    type,
    showIcon: true,
    hideProgressBar: false,
    showCloseButton: true,
    swipeClose: true,
    timeout: 4000,
    position: "top-right",
    transition: "zoom",
  });
};

export const successToast = (text: string) => defaultToast(text, "success");

export const errorToast = (text: string) => defaultToast(text, "danger");
