import React, { memo } from 'react';

import { CategoriesListUI } from '@ui/categories-list';
import { useSelector } from '@services/store.ts';
import { getCategories } from '@services/selectors.tsx';

export const CategoriesList: React.FC = memo(() => {
  const caegories = useSelector(getCategories);
  return <CategoriesListUI categories={caegories} />;
});
