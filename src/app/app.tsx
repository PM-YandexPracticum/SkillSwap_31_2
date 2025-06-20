import {
  MainPage,
  FavoritesPage,
  ProfilePage,
  SkillPage,
  NotFound404
} from '@pages';
import { Modal } from '../modal';

import '../index.css';
import styles from './app.module.css';
import { Routes, Route } from 'react-router-dom';

const App = () => (
  <div className={styles.app}>
    {/* Здесь должен быть header */}

    <Routes>
      {/* Основные роуты */}
      <Route path='/' element={<MainPage />} />
      <Route path='/favorites' element={<FavoritesPage />} />
      <Route path='/skill' element={<SkillPage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/login' element={<div>Здесь будет элемент login</div>} />

      {/* Роуты для модалок (рендерятся в основном outlet) */}
      <Route path='/skill/:id' element={<div>Здесь будет элемент skill</div>} />

      {/* 404 */}
      <Route path='*' element={<NotFound404 />} />
    </Routes>

    {/* Модальные окна */}
    <Routes>
      <Route
        path='/skill/:id'
        element={
          <Modal title='Детали навыка' onClose={() => {}}>
            <p>Здесь будет элемент skill</p>
          </Modal>
        }
      />
    </Routes>
  </div>
);

export default App;
