import React, { SyntheticEvent, useState } from 'react';

import { FirstStepFormUI } from '@features/auth/ui/widgets/first-step-form';

export const FirstStepForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [pasword, setPasword] = useState('');
  const googleSignIn = () => {};
  const appleSignIn = () => {};
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <FirstStepFormUI
      email={email}
      setEmail={setEmail}
      password={pasword}
      setPassword={setPasword}
      googleSignIn={googleSignIn}
      appleSignIn={appleSignIn}
      onSubmit={onSubmit}
    />
  );
};
