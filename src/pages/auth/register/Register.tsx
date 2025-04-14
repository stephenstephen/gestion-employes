import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerRequest } from '@/services/auth.service';
import { getErrorMessage } from '@/lib/utils';
import RegisterForm from '@/pages/auth/register/RegisterForm';

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (data: {
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (data.password !== data.confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas");
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    try {
      await registerRequest(data);
      navigate('/login');
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div>
        <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
        {errorMessage && (
          <p className="mt-4 text-center text-sm text-red-600">
            {errorMessage}
          </p>
        )}
        <p className="mt-4 text-center text-sm text-gray-600">
          Vous avez déjà un compte ?{' '}
          <Link to="/login" className="text-blue-800 hover:underline">
            Connectez-vous ici
          </Link>
        </p>
      </div>
    </div>
  );
}
