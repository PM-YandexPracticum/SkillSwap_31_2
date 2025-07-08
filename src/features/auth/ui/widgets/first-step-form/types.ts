import { SyntheticEvent } from 'react';

export type FirstStepFormUIProps = {
  email: string;
  setEmail: (value: string) => void;
  isEmailValid: boolean;
  emailError?: string;
  password: string;
  setPassword: (value: string) => void;
  isPasswordValid: boolean;
  passwordError?: string;
  googleSignIn: () => void;
  appleSignIn: () => void;
  onSubmit: (e: SyntheticEvent) => void;
};
