import { getAllSubcategories, getIncomingSuggestions, getSkillById, getSkills, getSkillsIsLoading, getSubCategories, getUserById } from "@app/services/selectors";
import { Preloader } from "@app/shared/ui";
import { MiniProfile } from "@app/shared/ui/mini-profile/MiniProfile";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import styles from './skill.module.scss';
import { TUserWithSkills } from "@app/entities/user";
import { getSkillsWithUserData } from "@app/shared/lib/helpers";
import { SkillInfo } from "@app/shared/ui/skill-info/SkillInfo";
import { fetchSuggestions } from "@app/features/suggestions/suggestionsSlice";
import { useDispatch } from "@app/services/store";
import { useEffect } from "react";
import { Suggestion } from "@app/shared/ui/suggestion/Suggestion";

export const Skill = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const skill = useSelector(getSkillById(id!.slice(1)));
  const isLoading = useSelector(getSkillsIsLoading);
  const user = useSelector(getUserById(skill ? skill.owner_id : ''));
  const skills = useSelector(getSkills);
  const subcategories = useSelector(getAllSubcategories);

  //приходят с сервера 100+ предложений и ограничил до 3
  // не понятно зачем сервера возвращает такие же предложения как и сама карточка
  // скорее всего проблема на беке
  const suggestions = useSelector(getIncomingSuggestions).slice(0, 4);

  useEffect(() => {
    user ? dispatch(fetchSuggestions({ userId: user?.id, type: 'incoming' })) : undefined;
  }, [user]);

  //в рекомендациях есть id пользователей, которые не попадают в глобальный state
  let userWithSkills: TUserWithSkills[] = getSkillsWithUserData([user!], skills, subcategories);

  return (
    <div className={styles.container}>
      {isLoading && <Preloader />}
      {skill && user && (
        <div>
          <div className={styles.offer}>
            <MiniProfile user={user} skill={skill} userWithSkills={userWithSkills} />
            <SkillInfo skill={skill} />
          </div>
          <div>
            <h2 className={styles.suggestionsTitle}>Похожие предложения</h2>
            <div className={styles.suggestionsCards}>
              {suggestions.map((suggest) => {
                return (
                  <Suggestion key={uuidv4()} skillId={suggest.skill} />
                )
              })}
            </div>
          </div>
        </div>


      )}
    </div>
  );
};
