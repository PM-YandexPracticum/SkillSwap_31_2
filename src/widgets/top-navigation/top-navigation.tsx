import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';

import { TopNavigationUI } from '@ui/top-navigation';

interface TopNavigationProps {}
export const TopNavigation: React.FC<TopNavigationProps> = memo(() => {
  const location = useLocation();
  return <TopNavigationUI locationState={{ background: location }} />;
});
