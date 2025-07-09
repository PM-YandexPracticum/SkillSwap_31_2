import { getAllSubcategories, getSkillById, getSkills, getSkillsIsLoading, getSubCategories, getUserById } from "@app/services/selectors";
import { Preloader } from "@app/shared/ui";
import { MiniProfile } from "@app/shared/ui/mini-profile/MiniProfile";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styles from './skill.module.scss';
import { TUserWithSkills } from "@app/entities/user";
import { getSkillsWithUserData } from "@app/shared/lib/helpers";

export const Skill = () => {
  const id = useParams().id; 
  const skill = useSelector(getSkillById(id!.slice(1)));
  const isLoading = useSelector(getSkillsIsLoading);
  const user = useSelector(getUserById(skill ? skill.owner_id : ''));
  const skills = useSelector(getSkills);
  const subcategories = useSelector(getAllSubcategories);

  let userWithSkills: TUserWithSkills[] = getSkillsWithUserData([user!], skills, subcategories);

  return (
    <div className={styles.container}>
      {isLoading && <Preloader />}
      {skill && user && (
        <div>
          <MiniProfile user={user} skill={skill} userWithSkills={userWithSkills} />
        </div>
        

      )}
    </div>
  );
};
