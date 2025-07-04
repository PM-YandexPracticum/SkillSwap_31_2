import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import errorImg from '../../assets/img/error 500.png';

import styles from './error-500.module.scss';

import { ButtonUI } from '@app/shared/ui/button';

export const Error500: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.error}>
        <img src={errorImg} alt="500 Internal Server Error" />
        <h2 className={styles.title}>На сервере произошла ошибка</h2>
        <p className={styles.text}>
          Попробуйте позже или вернитесь на главную страницу
        </p>
        <div className={styles.buttons}>
          <ButtonUI type="Secondary" classes={styles.button}>
            Сообщить об ошибке
          </ButtonUI>
          <ButtonUI
            type="Primary"
            onClick={() => navigate('/')}
            classes={styles.button}
          >
            На главную
          </ButtonUI>
        </div>
      </div>
    </div>
  );
};
