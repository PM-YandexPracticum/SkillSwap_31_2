import React, { SyntheticEvent, useEffect, useState } from 'react';

import { nextRegistrationStep } from '@features/auth/services/authSlice';
import { FirstStepFormUI } from '@features/auth/ui/widgets/first-step-form';
import { useDispatch, useSelector } from '@services/store.ts';
import { getRegistrationData, getUsersbyEmail } from '@services/selectors.tsx';
import { TRegistrationState } from '@entities/user';

export const FirstStepForm: React.FC = () => {
  const { user } = useSelector<TRegistrationState>(getRegistrationData);
  const [email, setEmail] = useState<string>(user.email || '');
  const [emailError, setEmailError] = useState<string>('');
  const [password, setPassword] = useState<string>(user.password || '');
  const [helpPasswordText, setHelpPasswordText] = useState<string>('');
  const [passwordError, setPpasswordError] = useState<string>('');

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
      dispatch(nextRegistrationStep({ email, password }));
    }
  };

  const lookingUser = useSelector((state) => getUsersbyEmail(state, email));

  useEffect(() => {
    const re = /\S+@\S+\.\S+/;
    if (email.length > 0 && !re.test(email)) {
      setEmailError('Не корректный формат email');
    } else if (lookingUser) {
      setEmailError('Email уже используется');
    } else {
      setEmailError('');
    }
  }, [email, lookingUser]);

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
