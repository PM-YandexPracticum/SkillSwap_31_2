import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import styles from './skill.module.scss';

import {
  getSubCategories,
  getSkillById,
  getSkills,
  getSkillsIsLoading,
  getUserById,
  getUsers,
} from '@app/services/selectors';
import { Preloader } from '@app/shared/ui';
import { MiniProfile } from '@app/shared/ui/mini-profile/MiniProfile';
import { TUserWithSkills } from '@app/entities/user';
import { getSkillsWithUserData } from '@app/shared/lib/helpers';
import { SkillInfo } from '@app/shared/ui/skill-info/SkillInfo';
import { fetchSuggestions } from '@app/features/suggestions/suggestionsSlice';
import { useDispatch } from '@app/services/store';
import { PageButton } from '@app/shared/ui/page-button/PageButton';
import { SkillCard } from '@app/widgets';

export const Skill = React.memo(() => {
  // простая задача превращается в кашу из-за непродуманной модели данных
  const dispatch = useDispatch();
  const { id } = useParams();
  const skill = useSelector(getSkillById(id!.slice(1)));
  const isLoading = useSelector(getSkillsIsLoading);
  const user = useSelector(getUserById(skill ? skill.owner_id : ''));
  const users = useSelector(getUsers);
  const skills = useSelector(getSkills);
  const subcategories = useSelector(getSubCategories);

  // приходят с сервера 100+ предложений и ограничил до 3
  // не понятно зачем сервера возвращает такие же предложения как и сама карточка
  // скорее всего проблема на беке
  // возвращает не то, что нужно для переиспользования компонента карточки
  // const suggestions = useSelector(getIncomingSuggestions).slice(0, 5);

  useEffect(() => {
    if (user) {
      dispatch(fetchSuggestions({ userId: user?.id, type: 'incoming' }));
    }
  }, [user, dispatch]);

  // в рекомендациях есть id пользователей, которые не попадают в глобальный state
  const currentUserWithSkills: TUserWithSkills[] =
    user! && getSkillsWithUserData([user], skills, subcategories);

  const usersWithSkills: TUserWithSkills[] = getSkillsWithUserData(
    users,
    skills,
    subcategories
  );

  // можно было бы сделать кастоный хук
  // Состояние для текущей страницы
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  // Рассчитываем общее количество страниц
  const totalPages = Math.ceil(usersWithSkills.length / itemsPerPage);
  // Получаем карточки для текущей страницы
  const displayedSuggestions = usersWithSkills.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.container}>
      {isLoading && <Preloader />}
      {skill && user && (
        <div>
          <div className={styles.offer}>
            <MiniProfile
              user={user}
              skill={skill}
              userWithSkills={currentUserWithSkills}
            />
            <SkillInfo skill={skill} />
          </div>
          <div className={styles.suggestions}>
            <h2 className={styles.suggestionsTitle}>Похожие предложения</h2>
            <div className={styles.suggestionsCards}>
              {displayedSuggestions.map((suggest) => {
                return (
                  <SkillCard
                    key={suggest.id}
                    name={suggest.name ?? undefined}
                    city={suggest.city ?? undefined}
                    age={suggest.age ?? undefined}
                    avatar_url={suggest.avatar_url ?? undefined}
                    skills={suggest.skills}
                    wishes={suggest.wishes}
                  />
                );
              })}
              {totalPages > 1 && (
                <div className={styles.navigation}>
                  <PageButton
                    direction="left"
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                    extraClass={styles.pageButtonLeft}
                  />
                  <PageButton
                    direction="right"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages - 1}
                    extraClass={styles.pageButtonRight}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
