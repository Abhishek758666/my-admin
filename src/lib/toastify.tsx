import { Check, X } from "lucide-react";
import { toast } from "sonner";

const config: any = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

export const successToast = (message: string) => {
  toast.success(message, {
    ...config,
    icon: <Check className="text-green-500" />,
  });
};

export const errorToast = (message: string) => {
  toast.error(message, { ...config, icon: <X className="text-red-500" /> });
};

export const dismissToast = () => {
  toast.dismiss();
};
