import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginUserThunk } from '@features/auth/services/authSlice';
import { FirstStepFormUI } from '@features/auth/ui/widgets/first-step-form';
import { useDispatch } from '@services/store.ts';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [helpPasswordText, setHelpPasswordText] = useState<string>('');
  const [passwordError, setPpasswordError] = useState<string>('');
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const googleSignIn = () => {};
  const appleSignIn = () => {};
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (email.length === 0) {
      setEmailError('Обязательное поле');
    }
    if (password.length === 0) {
      setPpasswordError('Обязательное поле');
    }
    if (
      !emailError.length &&
      !passwordError.length &&
      email.length > 0 &&
      password.length > 0
    ) {
      dispatch(loginUserThunk({ email, password })).then(() => {
        navigate('/');
      });
    }
  };

  useEffect(() => {
    const re = /\S+@\S+\.\S+/;
    if (email.length > 0 && !re.test(email)) {
      setEmailError('Не корректный формат email');
    } else {
      setEmailError('');
    }
  }, [email]);

  useEffect(() => {
    if (password.length > 0 && password.length < 8) {
      setPpasswordError('Не надёжный пароль');
    } else if (password.length >= 8) {
      setPpasswordError('');
      setHelpPasswordText('Надёжный');
    } else {
      setPpasswordError('');
      setHelpPasswordText('Пароль должен содержать не менее 8 знаков');
    }
  }, [password]);

  return (
    <FirstStepFormUI
      email={email}
      setEmail={setEmail}
      isEmailValid={emailError.length === 0}
      emailError={emailError}
      password={password}
      setPassword={setPassword}
      isPasswordValid={passwordError.length === 0}
      passwordError={passwordError}
      helpPasswordText={helpPasswordText}
      googleSignIn={googleSignIn}
      appleSignIn={appleSignIn}
      onSubmit={onSubmit}
    />
  );
};
