import React, { memo } from 'react';

import { TopNavigationUI } from '@ui/top-navigation';

interface TopNavigationProps {
  children?: React.ReactNode;
}
export const TopNavigation: FC<TopNavigationProps> = memo(({ children }) => {
  React.useEffect(() => {
    document.title = 'Top Navigation';
  }, []);
  return <TopNavigationUI>{children}</TopNavigationUI>;
});
