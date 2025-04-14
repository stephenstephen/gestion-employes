import { toast } from 'sonner';

export const useAlert = () => {
  const showSuccess = (title: string, description?: string) => {

    console.log('====================================');
    console.log('OKOKOK');
    console.log('====================================');

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