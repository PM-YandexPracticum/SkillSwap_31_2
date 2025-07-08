import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './search.module.css';

import { SearchUI } from '@ui/search';
import { SearchUIProps } from '@ui/search/type';
import { setText } from '@features/filter/filterSlice';
import { getSkills } from '@services/selectors';

export const Search: FC<SearchUIProps> = ({ placeholder }) => {
  const [value, setValue] = useState('');

  const dispatch = useDispatch();
  const skills = useSelector(getSkills);

  const filteredSkills =
    value.trim() === ''
      ? []
      : skills.filter((skill) =>
          skill.name.toLowerCase().includes(value.toLowerCase())
        );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(setText(value));
    }
  };

  const handleClear = () => {
    setValue('');
    dispatch(setText(''));
  };

  const handleSelectSuggestion = (name: string) => {
    dispatch(setText(name));
  };

  return (
    <div className={styles.container}>
      <SearchUI
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onClear={handleClear}
        onKeyDown={handleKeyDown}
      />
      {filteredSkills.length > 0 && (
        <ul className={styles.suggestions}>
          {filteredSkills.map((skill) => (
            <li key={skill.id}>
              <button
                type="button"
                className={styles.suggestionItem}
                onClick={() => handleSelectSuggestion(skill.name)}
              >
                {skill.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
