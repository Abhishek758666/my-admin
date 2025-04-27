import { toast } from "react-hot-toast";
const config: any = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const successToast = (message: string) => {
  toast.success(message, config);
};

export const errorToast = (message: string) => {
  toast.error(message, config);
};

export const dismissToast = () => {
  toast.dismiss();
};
