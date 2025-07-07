import React from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthButtonsUI } from '@features/auth';

export const AuthButtons: React.FC = () => {
  const navigate = useNavigate();
  const onRegister = () => {
    navigate('/register');
  };
  const onLogin = () => {
    navigate('/login');
  };
  return <AuthButtonsUI onLoginClick={onLogin} onRegisterClick={onRegister} />;
};
