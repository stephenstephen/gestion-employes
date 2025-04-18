import { toast } from 'sonner';

export const useAlert = () => {
  const showSuccess = (title: string, description?: string) => {

    toast.success(title, {
      description,
    });
  };

  const showError = (title: string, description?: string) => {
    toast.error(title, {
      description,
    });
  };

  return { showSuccess, showError };
};