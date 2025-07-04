import { FC } from "react";

import { ButtonUI } from "@app/shared/ui/button";
import { useNavigate } from "react-router-dom";

import errorImg from '../../assets/img/error 404.png'
import styles from './not-found-404.module.scss';

export const NotFound404: FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.error}>
                <img src={errorImg} alt="404 Not Found" />
                <h2 className={styles.title}>Страница не найдена</h2>
                <p className={styles.text}>К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже</p>
                <div className={styles.buttons}>
                    <ButtonUI type="Secondary" classes={styles.button}>Сообщить об ошибке</ButtonUI>
                    <ButtonUI type="Primary" onClick={() => navigate("/")} classes={styles.button}>На главную</ButtonUI>
                </div>
            </div>
        </div>
    );
};