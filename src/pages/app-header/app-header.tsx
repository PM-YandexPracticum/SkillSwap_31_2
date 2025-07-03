import { FC } from 'react';

import { useSelector } from '../../services/store';

import { AppHeaderUI } from '@ui/index';
import { getCurrentUser } from '@services/selectors';

export const AppHeader: FC = () => {
  const user = useSelector(getCurrentUser);

  return <AppHeaderUI user={user} />;
};
