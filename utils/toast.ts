import { toast } from 'sonner';

const notifySuccess = (message: string) => {
  toast.success(message);
};

const notifyError = (message: string = 'Internal Server Error') => {
  toast.error(message);
};

export { notifySuccess, notifyError };
