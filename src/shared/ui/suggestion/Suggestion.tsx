import { FC, useMemo } from "react";
import { TSuggestionProps } from "./type";
import { useSelector } from "@app/services/store";
import { getAllSubcategories, getCategories, getSkillById, getSkills, getUserById } from "@app/services/selectors";
import { TUserWithSkills } from "@app/entities/user";
import { getAgeSuffix, getSkillsWithUserData, getTheme } from "@app/shared/lib/helpers";

import styles from './suggestion.module.scss';
import { SkillTagUI } from "../skillTag";
import { TSubcategoryWithCategoryName } from "@app/entities/Categories/types";
import { ButtonUI } from "../button";
import { LikeButtonUI } from "../like-button";

export const Suggestion: FC<TSuggestionProps> = ({ skillId }) => {
    const skill = useSelector(getSkillById(skillId ? skillId : ''));
    const user = useSelector(getUserById(skill ? skill.owner_id : ''));
    const skills = useSelector(getSkills);
    const categories = useSelector(getCategories);
    const subcategories = useSelector(getAllSubcategories);

    let userWithSkills: TUserWithSkills[] = getSkillsWithUserData([user!], skills, subcategories);

    const userData = { ...userWithSkills };
    const wishes = userData[0].wishes;

    const categoriesMap = useMemo(() => {
        const map = new Map<string, string>();
        categories.forEach((category) => {
            map.set(category.id, category.name);
        });
        return map;
    }, [categories]);

    const wishTags = useMemo<TSubcategoryWithCategoryName[]>(
        () =>
            wishes.map((subcategory) => {
                // Получаем название категории по category_id
                const categoryName = categoriesMap.get(subcategory.category_id) || '';
                return {
                    ...subcategory,
                    theme: getTheme(categoryName),
                };
            }),
        [wishes, categoriesMap]
    );

    const visibleWishes = wishTags.slice(0, 2);
    const extraWishesCount = wishes.length > 2 ? wishes.length - 2 : undefined;

    console.log(userWithSkills);
    return (
        <div className={styles.container}>
            <div className={styles.suggestion}>
                <div className={styles.userInfo}>
                    <img src={user?.avatar_url} alt="аватар" className={styles.avatar} />
                    <div className={styles.text}>
                        <div className={styles.like}>
                            <LikeButtonUI initialLiked={false} />
                        </div>
                        <h3 className={styles.name}>{user?.name}</h3>
                        <p className={styles.info}>{user?.city}, {user?.age} {getAgeSuffix(user?.age!)}</p>
                    </div>
                </div>
                <div className={styles.tags}>
                    <div className={styles.skill}>
                        <h4 className={styles.skillTitle}>Может научить</h4>
                        <SkillTagUI name={skill!.name} theme={getTheme(skill!.category)} />
                    </div>
                    <div className={styles.wishes}>
                        <h4 className={styles.wishesTitle}>Хочет научиться</h4>
                        {wishes.length === 0 ? (
                            <p>Пока ничего</p>
                        ) : (
                            visibleWishes.map((wish) => {
                                return (
                                    <SkillTagUI key={wish.id} name={wish.name} theme={wish.theme} />
                                )
                            })
                        )
                        }
                        {extraWishesCount && (
                            <>
                                <SkillTagUI name={`+${extraWishesCount}`} theme="themeDefault" />
                            </>
                        )}
                    </div>
                </div>
                    <ButtonUI type="Primary" classes={styles.moreButton}>Подробнее</ButtonUI>
            </div>
        </div>
    )
}