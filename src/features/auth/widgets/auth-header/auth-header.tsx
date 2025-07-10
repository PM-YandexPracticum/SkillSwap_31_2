import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthHeaderUI } from '@features/auth/ui/widgets';

export const AuthHeader: FC = () => {
  const navigate = useNavigate();
  const onClose = () => {
    navigate(-1);
  };
  return <AuthHeaderUI onClose={onClose} />;
};
