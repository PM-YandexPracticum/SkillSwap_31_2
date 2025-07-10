import { FC } from "react";
import { TSkillInfoProps } from "./type";

import styles from './skill-info.module.scss';
import { LikeButtonUI } from "../like-button";

import share from '../../../assets/icons/share.svg';
import more from '../../../assets/icons/more-square.svg';
import { ButtonUI } from "../button";
import { v4 as uuidv4 } from 'uuid';
import clsx from "clsx";

export const SkillInfo: FC<TSkillInfoProps> = ({ skill }) => {
    const visibleImages = skill.images.slice(0, 3);
    const extraImages = skill.images.length > 3 ? skill.images.length - 3 : 0;

    return (
        <div className={styles.container}>
            <div className={styles.action}>
                <LikeButtonUI initialLiked={false} />
                <button className={styles.button}>
                    <img src={share} alt="кнопка поделиться" />
                </button>
                <button className={styles.button}>
                    <img src={more} alt="кнопка подробно" />
                </button>
            </div>

            <div className={styles.cardUser}>
                <div className={styles.content}>
                    <div className={styles.cardInfo}>
                        <h1 className={styles.title}>{skill.name}</h1>
                        <span className={styles.category}>{skill.category} / {skill.subcategory}</span>
                        <p className={styles.description}>{skill.description}</p>
                    </div>
                    <ButtonUI type="Primary" classes={styles.offerButton}>Предложить обмен</ButtonUI>
                </div>

                <div className={styles.images}>
                    <img src={skill.images[0]} alt="изображение" className={styles.image} />
                    <div className={styles.previews}>
                        {visibleImages.map((image, index) => {
                            if (index === 2 && extraImages) {
                                return (
                                    <div className={styles.extendImage}>
                                        <label htmlFor="count" className={styles.label}>
                                            <img key={uuidv4()} src={image} alt="превью" className={clsx([styles.preview, styles.blur])} />
                                            <button id="count" className={styles.count}>+{extraImages}</button>
                                        </label>
                                    </div>
                                )
                            }
                            return (
                                <img key={uuidv4()} src={image} alt="превью" className={styles.preview} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}