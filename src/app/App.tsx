import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { Favorites, Home, Profile, Skill } from '@app/pages';
import { useDispatch } from '@services/store';
import { getUsersThunk, loginUserThunk } from '@features/authSlice';

export const App = () => {
  const location = useLocation();
  const background = location.state?.background;
  const dispatch = useDispatch();

  useEffect(() => {
    // временное решение, чтобы грузил пользователя перед тем как
    // будет получать список пользователей. Это для проставления
    // у всех пользователей is_liked.

    dispatch(loginUserThunk({ email: 'ivan@mail.ru', password: '123' }))
      .unwrap()
      .then(() => {
        dispatch(getUsersThunk());
      });
  }, [dispatch]);

  return (
    <div className="app" data-cy="app">
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
    </div>
  );
};
