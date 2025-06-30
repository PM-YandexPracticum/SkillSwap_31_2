import { FC, useState } from 'react';

import { SearchUI } from '@app/shared/ui/search';
import { SearchUIProps } from '@app/shared/ui/search/type';

export const Search: FC<SearchUIProps> = ({ placeholder }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // логика поиска....
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <SearchUI
      value={searchQuery}
      placeholder={placeholder}
      onChange={handleChange}
      onClear={handleClear}
    />
  );
};
