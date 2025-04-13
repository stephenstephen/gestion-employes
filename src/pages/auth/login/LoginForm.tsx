import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/types/validations/login.schema';
import { Button } from '@/components/ui/button';


type LoginFormData = yup.InferType<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md"
    >
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Nom d'utilisateur
        </label>
        <input
          id="username"
          type="text"
          {...register('username')}
          className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        variant="blue"
        className="w-full"
      >
        {isLoading ? 'Connexion en cours…' : 'Se connecter'}
      </Button>

    </form>
  );
};

export default LoginForm;
