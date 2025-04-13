import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { registerSchema } from '@/types/validations/register.schema';

type Props = {
  onSubmit: (data: {
    username: string;
    password: string;
    confirmPassword: string;
  }) => void;
  isLoading: boolean;
};

export default function RegisterForm({ onSubmit, isLoading }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-[300px]">
      <div>
        <Label htmlFor="username" className="text-sm text-gray-700">Nom d'utilisateur</Label>
        <Input {...register('username')} id="username" />
        {errors.username && (
          <p className="text-sm text-red-600 mt-1">
            {errors.username.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="password" className="text-sm text-gray-700">Mot de passe</Label>
        <Input
          type="password"
          {...register('password')}
          id="password"
        />
        {errors.password && (
          <p className="text-sm text-red-600 mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="confirmPassword" className="text-sm text-gray-700">Confirmer le mot de passe</Label>
        <Input
          type="password"
          {...register('confirmPassword')}
          id="confirmPassword"
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-600 mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button type="submit" variant={'blue'} className="w-full" disabled={isLoading}>
        {isLoading ? 'Inscription...' : "S'inscrire"}
      </Button>
    </form>
  );
}
