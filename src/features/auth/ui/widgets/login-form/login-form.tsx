import React from 'react';

import styles from './login-form.module.css';
import { LoginFormUIProps } from './types';

import appleIcon from '@assets/icons/apple.svg';
import googleIcon from '@assets/icons/google.svg';
import { ButtonUI } from '@ui/button';
import { Input } from '@ui/inputs/input/input';

export const LoginFormUI: React.FC<LoginFormUIProps> = ({
  email,
  setEmail,
  isEmailValid,
  emailError,
  password,
  setPassword,
  isPasswordValid,
  passwordError,
  helpPasswordText,
  googleSignIn,
  appleSignIn,
  onSubmit,
}) => (
  <form onSubmit={onSubmit}>
    <fieldset className={styles.formHolder}>
      <ButtonUI
        classes={styles.buttonSocial}
        type="Secondary"
        onClick={googleSignIn}
      >
        <img src={googleIcon} alt="Иконка для кнопки Продлжить с Google" />
        Продлжить с Google
      </ButtonUI>
      <ButtonUI
        classes={styles.buttonSocial}
        type="Secondary"
        onClick={appleSignIn}
      >
        <img src={appleIcon} alt="Иконка для кнопки Продлжить с Apple" />
        Продлжить с Apple
      </ButtonUI>
      <div className={styles.separator}>или</div>
      <Input
        key="email"
        label="Email"
        placeholder="Введите email"
        isValid={isEmailValid}
        errorText={emailError}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Input
        key="password"
        label="Пароль"
        placeholder="Придумайте надёжный пароль"
        isValid={isPasswordValid}
        value={password}
        errorText={passwordError}
        helpText={helpPasswordText}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <div className={styles.submitHolder}>
        <ButtonUI
          disabled={
            !email.length ||
            !password.length ||
            !isEmailValid ||
            !isPasswordValid
          }
          type="Primary"
        >
          Далее
        </ButtonUI>
      </div>
    </fieldset>
  </form>
);
