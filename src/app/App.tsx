import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import {
  Favorites,
  Home,
  Profile,
  Skill,
  AppHeader,
  AppFooter,
  NotFound404,
  Error500,
} from '@app/pages';
import { useDispatch } from '@services/store';
import {
  loginUserThunk,
  getUsersThunk,
  getCitiesThunk,
  getGendersThunk,
} from '@features/auth/authSlice';
import { getSkillsThunk } from '@app/features/skills/skillsSlice';
import { Modal } from '@widgets/modal';
import { getCategoriesThunk } from '@app/features/categories/categoriesSlice';
import { CategoriesList } from '@widgets/categories-list';

export const App = () => {
  const location = useLocation();
  const background = location.state?.background;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // временное решение, чтобы грузил пользователя перед тем как
    // будет получать список пользователей. Это для проставления
    // у всех скилов is_liked.

    dispatch(loginUserThunk({ email: 'ivan@mail.ru', password: '123' }))
      .unwrap()
      .then(() => {
        dispatch(getSkillsThunk());
      })
      .then(() => {
        dispatch(getUsersThunk());
      })
      .then(() => {
        dispatch(getCitiesThunk());
      })
      .then(() => {
        dispatch(getCitiesThunk());
      })
      .then(() => {
        dispatch(getCategoriesThunk());
      })
      .then(() => {
        dispatch(getGendersThunk());
      })
      .catch(() => {
        navigate('/error-500');
      });
  }, [dispatch, navigate]);

  const onCLose = () => {
    navigate(-1);
  };

  return (
    <div className="app" data-cy="app">
      <AppHeader />

      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/skill:id" element={<Skill />} />
        <Route path="*" element={<NotFound404 />} />
        <Route path="/error-500" element={<Error500 />} />
        <Route path="/menu/skills" element={<Home />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/skill:id" element={<Skill />} />
          <Route
            path="/menu/skills"
            element={
              <Modal onClose={onCLose} isSubMenu>
                <CategoriesList />
              </Modal>
            }
          />
        </Routes>
      )}

      <AppFooter />
    </div>
  );
};
