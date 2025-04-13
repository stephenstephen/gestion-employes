import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginRequest } from '@/services/auth.service';
import { useAuth } from '@/hooks/useAuth';
import { getErrorMessage } from '@/lib/utils';
import LoginForm from './LoginForm';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (credentials: { username: string; password: string }) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const { data } = await loginRequest(credentials);
      login(data.token as string);
      navigate('/dashboard');
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div>
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        {errorMessage && (
          <p className="mt-4 text-center text-sm text-red-600">{errorMessage}</p>
        )}
      <p className="mt-4 text-center text-sm text-gray-600">
        Pas encore de compte ?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Créez-en un ici
        </Link>
      </p>
      </div>
    </div>
  );
};

export default Login;
