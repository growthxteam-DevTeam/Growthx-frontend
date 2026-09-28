import { toast } from "sonner";

export interface ToastNotificationProps {
  title?: string;
  description: React.ReactNode;
  type?: "success" | "error" | "info";
}

const ToastNotification = ({
  title,
  description,
  type = "success",
}: ToastNotificationProps) => {
  const toastFn =
    type === "success" ? toast.success : type === "error" ? toast.error : toast.info;

  toastFn(title, {
    description: <span className="text-xs font-light">{description}</span>,
  });

  return null;
};

export default ToastNotification;