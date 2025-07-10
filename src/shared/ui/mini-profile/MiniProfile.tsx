import { FC, useMemo } from 'react';

import { MiniProfileProps } from "./types";

import styles from './mini-pforile.module.scss'
import { SkillTagUI } from '../skillTag';
import { getAgeSuffix, getTheme } from '@app/shared/lib/helpers';
import { useSelector } from '@app/services/store';
import { getCategories } from '@app/services/selectors';
import { TSubcategoryWithCategoryName } from '@app/entities/Categories/types';


export const MiniProfile: FC<MiniProfileProps> = ({ user, skill, userWithSkills }) => {
    // Необходим рефакторинг начиная с типов, методов сервера и skills-list 
    // Приходится вырывать и обрабатывать вот так данные
    const categories = useSelector(getCategories);
    const userData = { ...userWithSkills };
    const wishes = userData[0].wishes
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


    return (
        <div className={styles.container}>
            <div className={styles.userInfo}>
                <div className={styles.user}>
                    <img src={user.avatar_url} alt="аватар" className={styles.avatar} />
                    <div className={styles.text}>
                        <h2 className={styles.name}>{user.name}</h2>
                        <p className={styles.info}>{user.city}, {user.age} {getAgeSuffix(user.age!)}</p>
                    </div>
                </div>
                <div className={styles.about}>
                    <p className={styles.aboutText}>{user.about}</p>
                </div>
                <div className={styles.skill}>
                    <h4 className={styles.skillTitle}>Может научить</h4>
                    <SkillTagUI name={skill.name} theme={getTheme(skill.category)} />
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
        </div>
    )
}