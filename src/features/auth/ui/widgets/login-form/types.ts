import { SyntheticEvent } from 'react';

export type LoginFormUIProps = {
  email: string;
  setEmail: (value: string) => void;
  isEmailValid: boolean;
  emailError?: string;
  password: string;
  setPassword: (value: string) => void;
  isPasswordValid: boolean;
  passwordError?: string;
  helpPasswordText?: string;
  googleSignIn: () => void;
  appleSignIn: () => void;
  onSubmit: (e: SyntheticEvent) => void;
};
