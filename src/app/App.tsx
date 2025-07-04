import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import {
  Favorites,
  Home,
  Profile,
  Skill,
  AppHeader,
  AppFooter,
} from '@app/pages';
import { useDispatch } from '@services/store';
import { loginUserThunk, getUsersThunk } from '@features/auth/authSlice';
import { getSkillsThunk } from '@app/features/skills/skillsSlice';

export const App = () => {
  const location = useLocation();
  const background = location.state?.background;
  const dispatch = useDispatch();

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
      });
  }, [dispatch]);

  return (
    <div className="app" data-cy="app">
      <AppHeader />

      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/skill:id" element={<Skill />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/skill:id" element={<Skill />} />
        </Routes>
      )}

      <AppFooter />
    </div>
  );
};
