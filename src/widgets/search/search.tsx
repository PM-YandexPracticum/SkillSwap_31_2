import { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './search.module.css';

import { SearchUI } from '@app/shared/ui/search';
import { SearchUIProps } from '@app/shared/ui/search/type';
import {
  setSearchQuery,
  setSearchCommitted,
} from '@features/skills/skillsSlice';
import { RootState } from '@services/store';

export const Search: FC<SearchUIProps> = ({ placeholder }) => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(
    (state: RootState) => state.skills.searchQuery
  );
  const skills = useSelector((state: RootState) => state.skills.skills);

  const [filteredSkills, setFilteredSkills] = useState(skills);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSkills([]);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = skills.filter((skill) =>
        skill.name.toLowerCase().includes(query)
      );
      setFilteredSkills(filtered);
    }
  }, [searchQuery, skills]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
    dispatch(setSearchCommitted(false));
  };

  const handleClear = () => {
    dispatch(setSearchQuery(''));
    dispatch(setSearchCommitted(false));
  };

  return (
    <div className={styles.container}>
      <SearchUI
        value={searchQuery}
        placeholder={placeholder}
        onChange={handleChange}
        onClear={handleClear}
      />
      {filteredSkills.length > 0 && (
        <ul className={styles.suggestions}>
          {filteredSkills.map((skill) => (
            <li key={skill.id}>
              <button
                type="button"
                className={styles.suggestionItem}
                onClick={() => {
                  dispatch(setSearchQuery(skill.name));
                  dispatch(setSearchCommitted(true));
                }}
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
